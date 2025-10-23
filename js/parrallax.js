window.addEventListener('error', function(e) {
  if (String(e.message).includes('A listener indicated an asynchronous response')) {
    e.preventDefault();
    e.stopPropagation();
  }
}, true);


(function() {
  var parallax, speed;

  parallax = document.querySelectorAll('.parallax-image');

  speed = 0.5;

  window.onscroll = function() {
    return [].slice.call(parallax).forEach(function(el, i) {
      var dist;
      dist = $(window).scrollTop() - $(el).offset().top;
      return $(el).css('top', dist * speed + 'px');
    });
  };

}).call(this);

(function(){
  const sections = document.querySelectorAll('.booking-section.modern');
  if(!sections.length) return;

  // Настрой скорость: 0.2 = медленнее, 0.5 = сильнее
  const speed = 0.22;

  let ticking = false;
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateParallax();
        ticking = false;
      });
      ticking = true;
    }
  }

  function updateParallax() {
    const scrollY = window.scrollY || window.pageYOffset;
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const top = rect.top + scrollY; // абсолютная позиция секции
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      // смещение относительно центра видимой области
      // когда секция полностью вне экрана, можно не применять
      const offset = (scrollY + windowHeight - top) / (windowHeight + sectionHeight);
      // offset в диапазоне примерно 0..1 (приблизительно)
      const translateY = (scrollY - top) * speed;

      const bg = section.querySelector('.parallax-bg');
      if (bg) {
        // ограничим смещение, чтобы не было "провалов"
        bg.style.transform = `translate3d(-50%, ${translateY}px, 0)`;
      }
    });
  }

  // обновим при загрузке и при скролле/resize
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => requestAnimationFrame(updateParallax));
  // начальный вызов
  requestAnimationFrame(updateParallax);
})();