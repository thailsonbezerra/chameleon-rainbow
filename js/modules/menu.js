export const menu = () => {
  const home = document.querySelector(".home");
  const slide = document.querySelector("slide-wrapper");
  const pagsArray = [home, slide];
  const handleClickMenu = () => {
    hamburger.classList.toggle("is-active");
    if (hamburger.classList.contains("is-active")) {
      pagsArray.map((el) => {
        if (el) {
          el.style.display = "none";
        }
      });
    } else {
      pagsArray.map((el) => {
        if (el) {
          el.style.display = "block";
        }
      });
    }
  };

  const hamburger = document.querySelector(".hamburger");
  hamburger.addEventListener("click", handleClickMenu);
};
