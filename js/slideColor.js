const colors = {
  gray: '#898886',
  blue: '#00aef6',
  green: '#09b500',
  greenLimon: '#ccff00',
  orange: '#ff8400',
  pink: '#e9abbc',
  purple: '#8400ff',
  red: '#ff2323',
  yellow: '#fad403',
};

const chameleons = document.querySelectorAll('.slide li');

export const chameleonColorSlide = () => {
  chameleons.forEach((chameleon) => {
    if (chameleon.classList.value === 'active') {
      const chameleonImg = chameleon.querySelector('img').attributes.src.value;
      const chameleonColor = chameleonImg
        .replace('img/camaleos/', '')
        .replace('.png', '');

      changeColor(chameleonColor);
    }
  });
};

export const changeColor = (color) => {
  const slide = document.querySelector('.slide-wrapper');
  slide.style.backgroundColor = colors[color];
};
