from flask import Flask, render_template, request, redirect, url_for, jsonify, flash
import pyodbc
import os
from datetime import datetime

app = Flask(__name__)
app.secret_key = 'tu_clave_secreta_aqui'  # Cambia esto por una clave segura

# Configuración de la base de datos RDS
def get_db_connection():
    try:
        # CONFIGURACIÓN CON TUS DATOS REALES
        server = 'mi-bd-sqlserver1.c9kaeqiwud9r.us-east-1.rds.amazonaws.com'
        database = 'FormularioWeb'
        username = 'admin'  # El usuario maestro que configuraste al crear el RDS
        password = '12345678'  # La contraseña que configuraste
        port = 1433
        driver = '{SQL Server}' # Asegúrate de tener este driver instalado
        
        connection_string = (
            f'DRIVER={driver};'
            f'SERVER={server},{port};'
            f'DATABASE={database};'
            f'UID={username};'
            f'PWD={password};'
            f'Encrypt=no;'  # Para desarrollo sin SSL
            f'TrustServerCertificate=no;'
            f'Connection Timeout=30;'
        )
        
        print(f"🔗 Intentando conectar a: {server}")
        conn = pyodbc.connect(connection_string)
        print("✅ Conexión exitosa a RDS")
        return conn
    except Exception as e:
        print(f"❌ Error de conexión a RDS: {str(e)}")
        return None

# Crear tabla si no existe (SOLO CREACIÓN, SIN INSERCIÓN)
def create_table():
    conn = get_db_connection()
    if conn:
        try:
            cursor = conn.cursor()
            # Solo crear la tabla si no existe
            cursor.execute('''
                IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='contactos' AND xtype='U')
                CREATE TABLE contactos (
                    id INT IDENTITY(1,1) PRIMARY KEY,
                    nombre NVARCHAR(100) NOT NULL,
                    email NVARCHAR(100) NOT NULL,
                    mensaje NVARCHAR(MAX) NOT NULL,
                    fecha_creacion DATETIME DEFAULT GETDATE(),
                    ip_cliente NVARCHAR(45) NULL
                )
            ''')
            conn.commit()
            cursor.close()
            conn.close()
            print("✅ Tabla verificada/creada correctamente")
        except Exception as e:
            print(f"❌ Error creando tabla: {e}")

# Llamar a create_table al iniciar la aplicación
create_table()

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/chatbot")
def chatbot():
    return render_template("chatbot.html")

# --- Lógica del chatbot ---
def chatbot_response(user_input):
    respuestas = {
        "hola": "¡Hola! ¿Cómo estás?",
        "adios": "¡Hasta luego!",
        "productos": "Tenemos frutas, verduras y más 🥑🍎.",
        "contacto": "Puedes escribirnos en la sección de contacto 📩."
    }
    return respuestas.get(user_input.lower(), "Lo siento, no entendí tu mensaje.")

@app.route("/productos")
def productos():
    return render_template("productos.html")

@app.route("/servicio")
def servicio():
    return render_template("servicio.html")

@app.route("/contact", methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        try:
            # Obtener datos del formulario
            nombre = request.form.get('name', '').strip()
            email = request.form.get('email', '').strip()
            mensaje = request.form.get('message', '').strip()
            ip_cliente = request.remote_addr  # Obtener IP del cliente
            
            print(f"📨 Datos recibidos: {nombre}, {email}, {mensaje}")  # Debug
            
            # Validar que los campos no estén vacíos
            if not nombre or not email or not mensaje:
                flash('Por favor, completa todos los campos.', 'error')
                return render_template('contact.html')
            
            # Validaciones adicionales
            if len(nombre) < 2:
                flash('El nombre debe tener al menos 2 caracteres.', 'error')
                return render_template('contact.html')
            
            if len(mensaje) < 10:
                flash('El mensaje debe tener al menos 10 caracteres.', 'error')
                return render_template('contact.html')
            
            # Guardar en la base de datos
            conn = get_db_connection()
            if conn:
                try:
                    cursor = conn.cursor()
                    # Usar la tabla 'contactos' que ya existe
                    cursor.execute(
                        'INSERT INTO contactos (nombre, email, mensaje, ip_cliente) VALUES (?, ?, ?, ?)',
                        (nombre, email, mensaje, ip_cliente)
                    )
                    conn.commit()
                    cursor.close()
                    conn.close()
                    flash('¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.', 'success')
                    print("✅ Mensaje guardado en la base de datos")
                except Exception as e:
                    print(f"❌ Error insertando en la base de datos: {e}")
                    flash('Error al enviar el mensaje. Por favor, intenta nuevamente.', 'error')
            else:
                print("❌ No se pudo conectar a la base de datos")
                flash('Error de conexión con la base de datos. Por favor, intenta más tarde.', 'error')
            
            return redirect(url_for('contact'))
            
        except Exception as e:
            print(f"❌ Error general en el formulario: {e}")
            flash('Error inesperado. Por favor, intenta nuevamente.', 'error')
            return redirect(url_for('contact'))
    
    return render_template("contact.html")

@app.route("/blog")
def blog():
    return render_template("blog.html")

@app.route("/nosotros")
def nosotros():
    return render_template("nosotros.html")

@app.route("/formulario_compra")
def formulario_compra():
    return render_template("formulario_compra.html")

@app.route("/compra_productos")
def compra_productos():
    categoria = request.args.get('categoria', 'magnesicos')
    return render_template("compra_productos.html", categoria=categoria)

# Ruta para probar la conexión a la base de datos
@app.route("/test-db")
def test_db():
    conn = get_db_connection()
    if conn:
        try:
            cursor = conn.cursor()
            cursor.execute("SELECT COUNT(*) FROM contactos")
            count = cursor.fetchone()[0]
            cursor.execute("SELECT TOP 1 * FROM contactos ORDER BY id DESC")
            last_message = cursor.fetchone()
            
            cursor.close()
            conn.close()
            
            result = f"✅ Conexión exitosa. Hay {count} mensajes en la base de datos."
            if last_message:
                result += f"<br>Último mensaje: {last_message[1]} - {last_message[2]}"
            return result
        except Exception as e:
            return f"❌ Error en la consulta: {e}"
    else:
        return "❌ No se pudo conectar a la base de datos"

if __name__ == '__main__':
    app.run(debug=True)