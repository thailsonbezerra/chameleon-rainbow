export const menu = () => {
  const hamburger = document.querySelector('.hamburger');
  const menu = document.querySelector('.menu-bg');
  const home = document.querySelector('.home');
  const slide = document.querySelector('.slide-wrapper');
  const hamburguerInner = document.querySelector('.hamburger-inner');

  const pagsArray = [home, slide];
  const handleClickMenu = () => {
    hamburger.classList.toggle('is-active');
    hamburger.classList.toggle('color-change-7x');
    hamburger.style.background = '#000';

    if (hamburger.classList.contains('is-active')) {
      menu.style.display = 'block';
      menu.classList.add('slide-in-blurred-tr');
      pagsArray.map((el) => {
        if (el) {
          el.style.display = 'none';
        }
      });
    } else {
      menu.style.display = 'none';
      menu.classList.remove('slide-in-blurred-tr');
      pagsArray.map((el) => {
        if (el) {
          el.style.display = 'block';
        }
      });
    }
  };

  hamburger.addEventListener('click', handleClickMenu);
};
