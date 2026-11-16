(function () {
  // Мобильное меню
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');

  burger.addEventListener('click', function () {
    var isOpen = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', isOpen);
  });

  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      nav.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });

  // Форма заявки (пока без отправки на сервер — только проверка телефона)
  var form = document.getElementById('request');
  var tel = document.getElementById('tel');
  var ok = document.getElementById('ok');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var digits = tel.value.replace(/\D/g, '');
    if (digits.length < 10) {
      tel.style.borderColor = '#D93A1E';
      tel.focus();
      return;
    }
    tel.style.borderColor = '';
    ok.style.display = 'block';
  });
})();

// Просмотр лицензий крупно
  var viewer = document.getElementById('viewer');
  var viewerImg = document.getElementById('viewerImg');

  document.querySelectorAll('.doc').forEach(function (btn) {
    btn.addEventListener('click', function () {
      viewerImg.src = btn.getAttribute('data-full');
      viewer.showModal();
    });
  });

  document.getElementById('viewerClose').addEventListener('click', function () {
    viewer.close();
  });

  // Закрытие по клику на тёмный фон
  viewer.addEventListener('click', function (e) {
    if (e.target === viewer) viewer.close();
  });

  // Если фото услуги не загрузилось — убираем его, карточка остаётся аккуратной
  document.querySelectorAll('.svc-card img').forEach(function (img) {
    img.addEventListener('error', function () { img.remove(); });
  });
  // Бегущая лента клиентов: дублируем логотипы для бесшовной прокрутки
  var track = document.getElementById('marqueeTrack');
  if (track) {
    Array.prototype.slice.call(track.children).forEach(function (item) {
      var clone = item.cloneNode(true);
      clone.classList.add('is-clone');
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });

    // Если логотип не загрузился — показываем название текстом
    track.querySelectorAll('img').forEach(function (img) {
      img.addEventListener('error', function () {
        var span = document.createElement('span');
        span.className = 'logo-text';
        span.textContent = img.alt;
        img.replaceWith(span);
      });
    });
  }