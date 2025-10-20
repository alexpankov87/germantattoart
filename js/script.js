window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    const tattooMachine = document.querySelector('.pulsing-machine');
    const gears = document.querySelectorAll('.gear');
    const smallGears = document.querySelectorAll('.gear-small');
    const loadingBar = document.querySelector('.loading-bar');
    
    // Анимация полоски загрузки
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += 1;
        loadingBar.style.width = progress + '%';
        
        // Добавляем небольшую случайность для эффекта "фломастера"
        if (Math.random() > 0.7) {
            loadingBar.style.transform = `scaleY(${0.9 + Math.random() * 0.2})`;
        }
        
        if (progress >= 100) {
            clearInterval(loadingInterval);
        }
    }, 15); // Скорость заполнения полоски

    // Анимация прелоадера
    setTimeout(() => {
        tattooMachine.style.transform = 'scale(0.8)';
        tattooMachine.style.opacity = '0.5';
        
        // Основные шестеренки
        gears.forEach(gear => {
            gear.style.opacity = '0.3';
        });
        
        // Маленькие шестеренки
        smallGears.forEach(gear => {
            gear.style.opacity = '0.3';
        });
        
        // Затем скрываем весь прелоадер
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.transform = 'scale(1.1)';
            
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 600);
        }, 300);
    }, 3000);
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
});

// Smooth Scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Пропускаем ссылки только с # 
        if (href === '#' || href === '#!') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Таймер обратного отсчета
function updateCountdown() {
    const targetDate = new Date('December 31, 2025 23:59:59').getTime();
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

    if (distance < 0) {
        clearInterval(countdownTimer);
        document.querySelector('.timer-text').textContent = 'Акция завершена!';
    }
}

const countdownTimer = setInterval(updateCountdown, 1000);
updateCountdown();

// Обработчики для CTA кнопок
document.getElementById('getSketch').addEventListener('click', function() {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});

// Анимация появления элементов при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Наблюдаем за всеми секциями
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});



// Плавное появление таймера при загрузке
document.addEventListener('DOMContentLoaded', function() {
    const promoTimer = document.querySelector('.promo-timer');
    if (promoTimer) {
        setTimeout(() => {
            promoTimer.style.opacity = '1';
            promoTimer.style.transform = 'translateY(0)';
        }, 500);
    }
});

// Обработка видеофона
document.addEventListener('DOMContentLoaded', function() {
    const heroVideo = document.querySelector('.hero-video');
    
    if (heroVideo) {
        // Попытка автоматического воспроизведения
        heroVideo.play().catch(function(error) {
            console.log('Автовоспроизведение видео запрещено:', error);
            // Можно показать кнопку для ручного запуска
        });

        // Обработка загрузки видео
        heroVideo.addEventListener('loadeddata', function() {
            console.log('Видеофон загружен');
        });

        // Обработка ошибок видео
        heroVideo.addEventListener('error', function() {
            console.log('Ошибка загрузки видео');
            // Fallback: можно установить фоновое изображение
            document.querySelector('.video-background').style.backgroundImage = 'url("images/hero-bg.jpg")';
            document.querySelector('.video-background').innerHTML = '';
        });
    }
});

// Контроль громкости (если нужно)
function setVideoVolume(volume) {
    const video = document.querySelector('.hero-video');
    if (video) {
        video.volume = volume; // от 0.0 до 1.0
    }
}

// Пауза/воспроизведение по необходимости
function toggleVideoPlayback() {
    const video = document.querySelector('.hero-video');
    if (video) {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const videoOverlay = document.querySelector('.video-overlay');
    let preloaderActive = true;

    // Функция для завершения прелоадера
    function finishPreloader() {
        preloaderActive = false;
        initWhatsAppButton(); // Инициализируем кнопку после завершения прелоадера
    }

    // Анимация прелоадера
    if (videoOverlay) {
        setInterval(() => {
            if (preloaderActive) {
                videoOverlay.style.opacity = '2';
                setTimeout(() => {
                    videoOverlay.style.opacity = '1';
                }, 1000);
            }
        }, 5000);

       // Пример с загрузкой видео
        const video = document.querySelector('video');
        if (video) {
        video.addEventListener('loadeddata', finishPreloader);
        video.addEventListener('error', finishPreloader); // На случай ошибки
        }

        // Или комбинация событий
        window.addEventListener('load', finishPreloader);
        setTimeout(finishPreloader, 10000); // Фолбэк на 10 секунд
    }

    // Инициализация WhatsApp кнопки
    function initWhatsAppButton() {
        let whatsappButton = document.querySelector(".whatsapp-button");
        
        if (!whatsappButton) return;

        // Показываем кнопку только если прелоадер завершен
        window.addEventListener("scroll", function () {
            if (!preloaderActive && window.scrollY > 100) {
                whatsappButton.style.right = "0px";
                whatsappButton.style.bottom = "120px";
            } else {
                whatsappButton.style.right = "-220px";
                whatsappButton.style.bottom = "-220px";
            }
        });
    }
});



