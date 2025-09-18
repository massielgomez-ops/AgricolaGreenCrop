document.addEventListener('DOMContentLoaded', function() {
    // --- Lógica para el Slider ---
    const slider = document.getElementById("slider");
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const indicators = document.querySelectorAll('.indicator');
    
    let currentIndex = 0;
    let autoSlideInterval;
    
    function updateSlider() {
        const slideWidth = slides[0].clientWidth; // Obtener el ancho de la primera diapositiva
        slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        
        indicators.forEach((indicator, i) => {
            indicator.classList.remove('bg-white');
            indicator.classList.add('bg-white/50');
            if (i === currentIndex) {
                indicator.classList.remove('bg-white/50');
                indicator.classList.add('bg-white');
            }
        });
        
        slides.forEach((slide, i) => {
            if (i === currentIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
        }, 8000);
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Event Listeners para el Slider
    nextBtn.addEventListener("click", () => {
        stopAutoSlide();
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
        startAutoSlide();
    });
    
    prevBtn.addEventListener("click", () => {
        stopAutoSlide();
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
        startAutoSlide();
    });
    
    indicators.forEach((indicator, i) => {
        indicator.addEventListener('click', () => {
            stopAutoSlide();
            currentIndex = i;
            updateSlider();
            startAutoSlide();
        });
    });

    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);

    let startX = 0;
    let endX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        stopAutoSlide();
    });
    
    slider.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX;
    });
    
    slider.addEventListener('touchend', () => {
        handleSwipe();
        startAutoSlide();
    });
    
    slider.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        stopAutoSlide();
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    });
    
    function mouseMoveHandler(e) {
        endX = e.clientX;
    }
    
    function mouseUpHandler() {
        handleSwipe();
        startAutoSlide();
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    }
    
    function handleSwipe() {
        const minSwipeDistance = 50;
        const difference = startX - endX;
        
        if (Math.abs(difference) > minSwipeDistance) {
            if (difference > 0) {
                currentIndex = (currentIndex + 1) % slides.length;
            } else {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            }
            updateSlider();
        }
    }
    
    updateSlider();
    startAutoSlide();

    // --- Lógica para el Menú Móvil ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- Lógica para Animación al Hacer Scroll ---
    const whyChooseSection = document.getElementById('why-choose-section');
    const cards = document.querySelectorAll('.why-choose-card');
    
    function checkScroll() {
        if (!whyChooseSection) return;
        const sectionPosition = whyChooseSection.getBoundingClientRect();
        const screenPosition = window.innerHeight / 1.3;
        
        if (sectionPosition.top < screenPosition) {
            cards.forEach(card => {
                card.classList.add('animated');
            });
            window.removeEventListener('scroll', checkScroll);
        }
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll();
});

// --- Lógica para Efectos de Hover ---
document.querySelectorAll('.why-choose-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
        this.style.boxShadow = '0 25px 50px rgba(0,0,0,0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
    });
});