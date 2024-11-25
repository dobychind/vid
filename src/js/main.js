import './libs/locomotive-scroll.min.js'
import './_functions.js';
import './_components.js';
import { disableScroll } from './functions/disable-scroll.js';
import { enableScroll } from './functions/enable-scroll.js';
import { getHeaderHeight } from './functions/header-height.js';

import AOS from 'aos';
import Swiper from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';

// Инициализация слайдера
Swiper.use([Navigation, Autoplay])

const customSlider = new Swiper('.custom-slider', {
  slidesPerView: 1,
  spaceBetween: 40,
  loop: true,
  autoplay: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    320: {
      spaceBetween: 8
    },
    720: {
      spaceBetween: 40
    }
  }
});


getHeaderHeight();

(function () {
  const burger = document?.querySelector('[data-burger]');
  const menu = document?.querySelector('[data-menu]');
  const menuItems = document?.querySelectorAll('[data-menu-item]');
  const overlay = document?.querySelector('[data-menu-overlay]');

  burger?.addEventListener('click', (e) => {
    burger?.classList.toggle('burger--active');
    menu?.classList.toggle('menu--active');
    console.log(123);


    if (menu?.classList.contains('menu--active')) {
      burger?.setAttribute('aria-expanded', 'true');
      burger?.setAttribute('aria-label', 'Закрыть меню');
      disableScroll();
    } else {
      burger?.setAttribute('aria-expanded', 'false');
      burger?.setAttribute('aria-label', 'Открыть меню');
      enableScroll();
    }
  });

  overlay?.addEventListener('click', () => {
    burger?.setAttribute('aria-expanded', 'false');
    burger?.setAttribute('aria-label', 'Открыть меню');
    burger.classList.remove('burger--active');
    menu.classList.remove('menu--active');
    enableScroll();
  });

  menuItems?.forEach(el => {
    el.addEventListener('click', () => {
      burger?.setAttribute('aria-expanded', 'false');
      burger?.setAttribute('aria-label', 'Открыть меню');
      burger.classList.remove('burger--active');
      menu.classList.remove('menu--active');
      enableScroll();
    });
  });
})();

const buttons = document.querySelectorAll('.button');

buttons.forEach(button => {
  button.addEventListener('click', function () {
    buttons.forEach(btn => btn.classList.remove('active'));

    this.classList.add('active');
  });
});


// Инициализация Locomotive Scroll
const locomotiveScroll = new LocomotiveScroll();

// Прокрутка к блоку по нажатию на кнопку
const scrollContainer = document.querySelector('[data-scroll-container]');

if (scrollContainer) {
  // Прокрутка к блоку по нажатию на кнопку
  const scrollButton = document.querySelector('.hero__bottom');

  if (scrollButton) {
    scrollButton.addEventListener('click', function () {
      // Скролл до следующей секции без указания easing
      locomotiveScroll.scrollTo('.desc', {
        offset: -100, // Смещение (при необходимости)
        duration: 3 // Длительность скролла в миллисекундах
      });
    });
  }
}

const arrowUp = document.querySelector('.arrow-up');
let lastScrollTop = 0;

if (arrowUp) {
  // Изначально скрываем кнопку
  arrowUp.classList.remove('show');

  // Отслеживаем событие прокрутки
  window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Проверяем, не находимся ли мы в самом верху страницы
    if (scrollTop === 0) {
      arrowUp.classList.remove('show');
    } else if (scrollTop < lastScrollTop) {
      arrowUp.classList.add('show');
    } else {
      arrowUp.classList.remove('show');
    }

    lastScrollTop = scrollTop;
  });

  arrowUp.addEventListener('click', function () {
    locomotiveScroll.scrollTo(0, {
      duration: 1,
    });
  });
}

AOS.init();

document.querySelectorAll('.animate-on-load').forEach(function (element) {
  element.classList.add('aos-animate');
});

document.addEventListener("scroll", function() {
  const sectionHeaders = document.querySelectorAll('.section__header');

  sectionHeaders.forEach((sectionHeader) => {
    if (sectionHeader.getBoundingClientRect().top <= 0) {
      sectionHeader.classList.add('fixed');
    } else {
      sectionHeader.classList.remove('fixed');
    }
  });
});

// const scrollButton = document.querySelector('.hero__bottom');

// if (scrollButton) {
//   const scrollingBlock = document.querySelector('.hero');

//   scrollButton.addEventListener('click', function () {
//     scroll.scrollTo(scrollingBlock.scrollHeight);
//   });
// }

// import './libs/bvi.min.js'

// new isvek.Bvi({
//   fontSize: 24, // Размер шрифта
//   theme: 'black' // Цветовая тема сайта
// });

document.addEventListener('DOMContentLoaded', () => {
  const photoCards = document.querySelectorAll('.photo-card'); // Все карточки
  const popup = document.getElementById('photoPopup'); // Попап
  const popupImage = document.getElementById('popupImage'); // Изображение внутри попапа
  const popupCaption = document.getElementById('popupCaption'); // Блок для текста
  const closeButton = document.getElementById('popupClose'); // Крестик для закрытия

  // Открытие попапа
  photoCards.forEach(card => {
      card.addEventListener('click', () => {
          const img = card.querySelector('img'); // Находим изображение внутри карточки
          const caption = card.getAttribute('data-caption'); // Получаем текст из атрибута data-caption

          popupImage.src = img.src; // Устанавливаем изображение в попап
          popupCaption.textContent = caption; // Устанавливаем текст в попап
          popup.classList.add('active'); // Показываем попап
      });
  });

  // Закрытие попапа при нажатии на крестик
  closeButton.addEventListener('click', () => {
      popup.classList.remove('active');
  });

  // Закрытие попапа при нажатии на свободное место
  popup.addEventListener('click', (event) => {
      if (event.target === popup) {
          popup.classList.remove('active');
      }
  });

  // Закрытие попапа при нажатии на ESC
  document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
          popup.classList.remove('active');
      }
  });
});
