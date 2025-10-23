window.addEventListener('error', function(e) {
  if (String(e.message).includes('A listener indicated an asynchronous response')) {
    e.preventDefault();
    e.stopPropagation();
  }
}, true);

class TattooGallery {
    constructor() {
        this.init();
    }

    init() {
        this.initFancybox();
        this.initFilter();
        this.addAnimations();
    }

    initFancybox() {
        // Инициализация Fancybox
        Fancybox.bind("[data-fancybox]", {
            Thumbs: {
                autoStart: true,
            },
            Toolbar: {
                display: {
                    left: ["infobar"],
                    middle: [],
                    right: ["zoom", "slideshow", "fullscreen", "close"],
                },
            },
            Images: {
                zoom: true,
                protected: true
            }
        });
    }

    initFilter() {
        // Выбираем только кнопки внутри галереи (раскомментируйте блок фильтров)
        const filterBtns = document.querySelectorAll('.gallery-filter .filter-btn');
        const galleryItems = document.querySelectorAll('[data-fancybox]');

        // Если нет кнопок фильтров, выходим
        if (filterBtns.length === 0) return;

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Обновляем активную кнопку ТОЛЬКО среди кнопок фильтров
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.dataset.filter;
                
                // Фильтрация элементов
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 400);
                    }
                });
            });
        });
    }

    addAnimations() {
        const items = document.querySelectorAll('[data-fancybox]');
        
        // Анимация появления элементов при загрузке
        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100 * index);
        });

        // Параллакс эффект при наведении (на чистом CSS через transition)
        items.forEach(item => {
            const img = item.querySelector('img');
            
            item.addEventListener('mousemove', (e) => {
                const { left, top, width, height } = item.getBoundingClientRect();
                const x = (e.clientX - left) / width - 0.5;
                const y = (e.clientY - top) / height - 0.5;
                
                img.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
            });

            item.addEventListener('mouseleave', () => {
                img.style.transform = 'translate(0, 0)';
            });
        });
    }
}

// Инициализация галереи
document.addEventListener('DOMContentLoaded', () => {
    new TattooGallery();
});