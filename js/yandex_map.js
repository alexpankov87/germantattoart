// Функция инициализации карты
function initYandexMap() {
    if (typeof ymaps === 'undefined') {
        console.error('Yandex Maps API не загружен');
        showMapFallback();
        return;
    }
    
    ymaps.ready(function() {
        try {
                var myMap = new ymaps.Map("map", {
                    center: [49.789985, 73.10209], // координаты центра
                    zoom: 15 // уровень масштабирования
                }, {
                    suppressMapOpenBlock: true, // убираем стандартные элементы
                    suppressObsoleteBrowserNotifier: true // убираем уведомления
                });


            var myPlacemark = new ymaps.Placemark([49.789985, 73.102095], {
                balloonContent: `
                    <div class="map-popup">
                        <p style="font-size: 16px; color: black;">
                            <strong style="text-decoration:underline;">Бухар-Жырау 84/1, ТЦ "Громада"</strong><br/>
                            <strong>вход в офисную часть со двора, 4 этаж, 404 кабинет,</strong><br/><b>как ориентир на двери табличка<br/> с нашим логотипом</strong><br/>
                            <strong style="text-decoration:underline;">Телефон:</strong><strong> +7 771 194 18 82</strong>
                        </p>
                    </div>
                `
            }, {
                preset: 'islands#redDotIcon'
            });

            myMap.geoObjects.add(myPlacemark);
            myPlacemark.balloon.open();
            
        } catch (error) {
            console.error('Ошибка при создании карты:', error);
            showMapFallback();
        }
    });
}

// Заглушка если карта не загрузилась
function showMapFallback() {
    var mapContainer = document.getElementById('map');
    if (mapContainer) {
        mapContainer.innerHTML = `
            <div style="width:100%; height:400px; background:#f5f5f5; display:flex; align-items:center; justify-content:center; border:1px solid #ddd;">
                <div style="text-align:center;">
                    <p style="font-size: 16px; color: black;">
                        <strong style="text-decoration:underline;>Бухар-Жырау 84/1, ТЦ "Громада"</strong><br/>
                        <strong>вход в офисную часть со двора, 4 этаж, 404 кабинет,</strong><br/><b>как ориентир на двери табличка<br/> с нашим логотипом</strong><br/>
                        <strong style="text-decoration:underline;">Телефон:</strong><strong> +7 771 194 18 82</strong>
                    </p>
                </div>
            </div>
        `;
    }
}

// Запускаем инициализацию
initYandexMap();