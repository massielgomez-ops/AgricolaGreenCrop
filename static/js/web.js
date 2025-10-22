// ======================================================
// 🎞️ SLIDER AUTOMÁTICO
// ======================================================
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById("slider");
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const indicators = document.querySelectorAll('.indicator');

  if (!slider || slides.length === 0) return;

  let currentIndex = 0;
  let autoSlideInterval;

  const updateSlider = () => {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;

    indicators.forEach((indicator, i) =>
      indicator.classList.toggle('active', i === currentIndex)
    );

    slides.forEach((slide, i) =>
      slide.classList.toggle('active', i === currentIndex)
    );
  };

  const startAutoSlide = () => {
    autoSlideInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlider();
    }, 8000);
  };

  const stopAutoSlide = () => clearInterval(autoSlideInterval);

  // --- Botones ---
  nextBtn?.addEventListener("click", () => {
    stopAutoSlide();
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
    startAutoSlide();
  });

  prevBtn?.addEventListener("click", () => {
    stopAutoSlide();
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
    startAutoSlide();
  });

  // --- Indicadores ---
  indicators.forEach((indicator, i) =>
    indicator.addEventListener('click', () => {
      stopAutoSlide();
      currentIndex = i;
      updateSlider();
      startAutoSlide();
    })
  );

  // --- Swipe táctil / mouse ---
  let startX = 0, endX = 0;

  const handleSwipe = () => {
    const minSwipeDistance = 50;
    const difference = startX - endX;
    if (Math.abs(difference) > minSwipeDistance) {
      currentIndex = difference > 0
        ? (currentIndex + 1) % slides.length
        : (currentIndex - 1 + slides.length) % slides.length;
      updateSlider();
    }
  };

  // Touch (móvil)
  slider.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    stopAutoSlide();
  });

  slider.addEventListener('touchmove', e => endX = e.touches[0].clientX);
  slider.addEventListener('touchend', () => {
    handleSwipe();
    startAutoSlide();
  });

  // Drag (PC)
  slider.addEventListener('mousedown', e => {
    startX = e.clientX;
    stopAutoSlide();
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

  const mouseMoveHandler = e => endX = e.clientX;
  const mouseUpHandler = () => {
    handleSwipe();
    startAutoSlide();
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  };

  // --- Hover pausa ---
  slider.addEventListener('mouseenter', stopAutoSlide);
  slider.addEventListener('mouseleave', startAutoSlide);

  updateSlider();
  startAutoSlide();
});


// ======================================================
// 📱 MENÚ MÓVIL
// ======================================================
document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.getElementById('mobile-menu-button');
  const menu = document.getElementById('mobile-menu');

  if (!menuButton || !menu) return;

  menuButton.addEventListener('click', () => {
    menu.classList.toggle('active');
  });

  document.addEventListener('click', e => {
    if (!menu.contains(e.target) && !menuButton.contains(e.target)) {
      menu.classList.remove('active');
    }
  });
});


// ======================================================
// 🌱 ANIMACIONES AL HACER SCROLL (Sección “Por qué elegirnos”)
// ======================================================
document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.why-us-section');
  const cards = document.querySelectorAll('.feature-card');
  if (!section) return;

  const checkScroll = () => {
    const sectionPosition = section.getBoundingClientRect();
    const screenPosition = window.innerHeight / 1.3;

    if (sectionPosition.top < screenPosition) {
      cards.forEach(card => card.classList.add('animated'));
      window.removeEventListener('scroll', checkScroll);
    }
  };

  window.addEventListener('scroll', checkScroll);
  checkScroll();
});


// ======================================================
// 💡 EFECTOS HOVER EN TARJETAS
// ======================================================
document.querySelectorAll('.why-choose-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px) scale(1.02)';
    card.style.boxShadow = '0 25px 50px rgba(0,0,0,0.15)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) scale(1)';
    card.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
  });
});


// ======================================================
// 📦 MENÚ DESPLEGABLE PRODUCTOS (Versión móvil)
// ======================================================
document.addEventListener('DOMContentLoaded', () => {
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const dropdownMenu = document.querySelector('.dropdown-menu');

  if (window.innerWidth <= 768 && dropdownToggle && dropdownMenu) {
    dropdownToggle.addEventListener('click', e => {
      e.preventDefault();
      dropdownMenu.classList.toggle('active');
    });

    document.addEventListener('click', e => {
      if (!e.target.closest('.dropdown')) dropdownMenu.classList.remove('active');
    });
  }
});


// ======================================================
// 📖 EFECTO “LEER MÁS / LEER MENOS” EN BLOG
// ======================================================
document.addEventListener('DOMContentLoaded', () => {
  const botones = document.querySelectorAll('.leer-mas-btn');

  botones.forEach(boton => {
    boton.innerHTML = 'Leer más <span class="arrow">↓</span>';

    boton.addEventListener('click', () => {
      const card = boton.closest('.blog-card');
      const textoExtra = card.querySelector('.more-text');
      const arrow = boton.querySelector('.arrow');

      textoExtra.classList.toggle('mostrar');
      boton.classList.toggle('abierto');

      if (textoExtra.classList.contains('mostrar')) {
        boton.innerHTML = 'Leer menos <span class="arrow">↑</span>';
      } else {
        boton.innerHTML = 'Leer más <span class="arrow">↓</span>';
      }
    });
  });
});


// ======================================================
// 📨 VALIDACIÓN DE FORMULARIO DE CONTACTO
// ======================================================
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    let valid = true;
    document.querySelectorAll('.error-message').forEach(msg => msg.textContent = '');

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    if (name.value.trim().length < 2) {
      document.getElementById('nameError').textContent = 'El nombre debe tener al menos 2 caracteres.';
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      document.getElementById('emailError').textContent = 'Por favor ingresa un email válido.';
      valid = false;
    }

    if (message.value.trim().length < 10) {
      document.getElementById('messageError').textContent = 'El mensaje debe tener al menos 10 caracteres.';
      valid = false;
    }

    if (!valid) {
      e.preventDefault();
    } else {
      const submitBtn = document.getElementById('submitBtn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
      }
    }
  });
});


// ======================================================
// ✨ ANIMACIÓN FADE-UP (Intersection Observer)
// ======================================================
document.addEventListener("DOMContentLoaded", () => {
  const fadeElements = document.querySelectorAll(".fade-up");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });

  fadeElements.forEach(el => observer.observe(el));
});
