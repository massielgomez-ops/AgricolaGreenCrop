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
            f'Encrypt=no;'
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

# Crear tabla si no existe
def create_table():
    conn = get_db_connection()
    if conn:
        try:
            cursor = conn.cursor()
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

# --- NUEVA LÓGICA DEL CHATBOT ---
@app.route("/chat", methods=['POST'])
def chat():
    user_message = request.json.get('message', '').lower()

    # --- MENSAJE DE INICIO / MENÚ PRINCIPAL ---
    if user_message in ["hola", "menu", "inicio", "ayuda"]:
        return jsonify({
            "response": "👋 ¡Hola! Soy el chatbot de <b>Agrícola Green Crop</b> 🌱<br>"
                        "Estoy aquí para ayudarte con todo lo que necesites sobre nuestros productos y servicios.<br><br>"
                        "Ofrecemos <b>delivery rápido</b>, <b>asesoramiento personalizado</b> y todo lo que tu cultivo necesita "
                        "para crecer fuerte y sano. 🚜✨<br><br>💬 ¿En qué puedo ayudarte hoy?",
            "options": ["Fertilizantes", "Qué ofrecemos", "Precios", "Asesoramiento"]
        })

    # --- FERTILIZANTES ---
    elif "fertilizantes" in user_message:
        return jsonify({
            "response": "🌾 En <b>Agrícola Green Crop</b> contamos con una amplia variedad de <b>fertilizantes</b> "
                        "para que tus cultivos crezcan sanos y fuertes.<br><br>"
                        "Pueden ser <b>orgánicos</b> o <b>químicos</b>, según las necesidades de tu tierra. 🌱",
            "options": ["Orgánicos", "Químicos"]
        })

    # --- FERTILIZANTES ORGÁNICOS ---
    elif "orgánicos" in user_message:
        return jsonify({
            "response": "🌿 Nuestros <b>fertilizantes orgánicos</b> son 100% naturales y ayudan a mejorar la calidad del suelo.<br><br>"
                        "Contamos con <b>compost</b>, <b>humus de lombriz</b> y <b>biofertilizantes líquidos</b> ideales para todo tipo de cultivo. ♻",
            "options": ["Ver precios", "Qué ofrecemos", "Asesoramiento"]
        })

    # --- FERTILIZANTES QUÍMICOS ---
    elif "químicos" in user_message:
        return jsonify({
            "response": "💧 Los <b>fertilizantes químicos</b> de <b>Agrícola Green Crop</b> brindan una nutrición rápida y efectiva a tus cultivos.<br><br>"
                        "Disponemos de <b>nitrato de amonio</b>, <b>urea</b> y <b>fosfato diamónico</b>, productos de alta pureza y rendimiento. ⚗",
            "options": ["Ver precios", "Qué ofrecemos", "Asesoramiento"]
        })

    # --- QUÉ OFRECEMOS ---
    elif "qué ofrecemos" in user_message or "ofrecemos" in user_message:
        return jsonify({
            "response": "📦 En <b>Agrícola Green Crop</b> te ofrecemos soluciones completas para el campo:<br><br>"
                        "✅ <b>Fertilizantes de alta calidad</b><br>"
                        "✅ <b>Asesoramiento técnico personalizado</b><br>"
                        "✅ <b>Delivery rápido</b> a todo el país<br>"
                        "✅ <b>Promociones especiales</b> por temporada 🌾<br><br>"
                        "Todo lo que tu cultivo necesita, en un solo lugar.",
            "options": ["Fertilizantes", "Precios", "Asesoramiento"]
        })

    # --- PRECIOS ---
    elif "precio" in user_message or "precios" in user_message:
        return jsonify({
            "response": "💲 Nuestros precios varían según el tipo de producto y la cantidad que necesites.<br><br>"
                        "Cuéntame qué cultivo tienes y te ayudaremos a cotizar el fertilizante más adecuado. 🌽☕🥔",
            "options": ["Papa", "Maíz", "Café"]
        })

    # --- PRECIOS POR CULTIVO ---
    elif "papa" in user_message:
        return jsonify({
            "response": "🥔 Para el cultivo de <b>papa</b>, recomendamos fertilizantes ricos en nitrógeno y potasio.<br><br>"
                        "💲 Precio aproximado: desde <b>S/ 45 por saco</b> (según tipo y presentación).",
            "options": ["Fertilizantes", "Asesoramiento"]
        })

    elif "maíz" in user_message:
        return jsonify({
            "response": "🌽 Para el <b>maíz</b>, sugerimos fertilizantes con fósforo y zinc para un mejor crecimiento y producción.<br><br>"
                        "💲 Precio aproximado: desde <b>S/ 50 por saco</b>.",
            "options": ["Fertilizantes", "Asesoramiento"]
        })

    elif "café" in user_message:
        return jsonify({
            "response": "☕ En el caso del <b>café</b>, usamos fertilizantes equilibrados que mejoran la floración y el grano.<br><br>"
                        "💲 Precio aproximado: desde <b>S/ 55 por saco</b>.",
            "options": ["Fertilizantes", "Asesoramiento"]
        })

    # --- ASESORAMIENTO ---
    elif "asesoramiento" in user_message or "asesor" in user_message:
        return jsonify({
            "response": "📞 En <b>Agrícola Green Crop</b> contamos con expertos listos para asesorarte.<br><br>"
                        "Recibirás <b>recomendaciones personalizadas</b> según tu tipo de cultivo y el estado del suelo. 🌱<br><br>"
                        "Puedes contactarnos por:<br>📧 <b>info@agricolagreencrop.com</b><br>📱 <b>WhatsApp: +51 999 888 777</b>",
            "options": ["Fertilizantes", "Qué ofrecemos", "Precios"]
        })

    # --- SI NO ENTIENDE ---
    else:
        return jsonify({
            "response": "🤔 No entendí tu mensaje. Por favor elige una de estas opciones 👇",
            "options": ["Fertilizantes", "Qué ofrecemos", "Precios", "Asesoramiento"]
        })

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
            nombre = request.form.get('name', '').strip()
            email = request.form.get('email', '').strip()
            mensaje = request.form.get('message', '').strip()
            ip_cliente = request.remote_addr  
            
            print(f"📨 Datos recibidos: {nombre}, {email}, {mensaje}")
            
            if not nombre or not email or not mensaje:
                flash('Por favor, completa todos los campos.', 'error')
                return render_template('contact.html')
            
            if len(nombre) < 2:
                flash('El nombre debe tener al menos 2 caracteres.', 'error')
                return render_template('contact.html')
            
            if len(mensaje) < 10:
                flash('El mensaje debe tener al menos 10 caracteres.', 'error')
                return render_template('contact.html')
            
            conn = get_db_connection()
            if conn:
                try:
                    cursor = conn.cursor()
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
