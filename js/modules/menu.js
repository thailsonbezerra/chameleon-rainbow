export const menu = () => {
  const hamburger = document.querySelector('.hamburger');
  const menu = document.querySelector('.menu-bg');
  const home = document.querySelector('.home');
  const slide = document.querySelector('.slide-wrapper');
  const options = [...document.querySelectorAll('.menu > nav > ul > li')];

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

  const optionBg = document.querySelector('.option-bg');
  const infoOptions = [...document.querySelectorAll('.info-options')];

  const handleHoverOptions = (event) => {
    const optionValue = event.target.innerText;
    const optionText = optionValue.split(' ');
    optionBg.innerText = optionText[0].replace('.', '');

    const optionAtual = event.currentTarget;
    const optionAtualIndex = options.indexOf(optionAtual);

    infoOptions.map((el, index) => {
      el.style.display = 'none';
      if (index === optionAtualIndex) {
        el.style.display = 'block';
      }
    });
  };

  const handleClickOptions = (event) => {
    event.preventDefault();
  };

  hamburger.addEventListener('click', handleClickMenu);
  options.map((option) =>
    option.addEventListener('mouseover', handleHoverOptions),
  );
  options.map((option) => option.addEventListener('click', handleClickOptions));
  optionBg.addEventListener('mouseover', () => {
    optionBg.innerText = '';
    infoOptions.map((el) => (el.style.display = 'none'));
  });
};
