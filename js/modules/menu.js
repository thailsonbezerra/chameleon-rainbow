export const menu = (Particles) => {
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".menu-bg");
  const home = document.querySelector(".home");
  const slide = document.querySelector(".slide-wrapper");
  const options = [...document.querySelectorAll(".menu > nav > ul > li")];
  const header = document.querySelector("header");
  const iconsSociais = [
    ...document.querySelectorAll(".menu > .contato >  a > img"),
  ];

  const pagsArray = [home, slide];
  const handleClickMenu = () => {
    header.style.background = "rgba(0, 0, 0, 0.375)";
    hamburger.classList.toggle("is-active");
    hamburger.classList.toggle("color-change-7x");

    if (hamburger.classList.contains("is-active")) {
      header.style.backgroundColor = "#000";
      menu.style.display = "block";
      menu.classList.add("slide-in-blurred-tr");
      pagsArray.map((el) => {
        if (el) {
          Particles && Particles.pauseAnimation();
          el.style.display = "none";
        }
      });
    } else {
      menu.style.display = "none";
      pagsArray.map((el) => {
        if (el) {
          el.style.display = "block";
          Particles && Particles.resumeAnimation();
        }
      });
    }
  };

  const optionBg = document.querySelector(".option-bg");
  const infoOptions = [...document.querySelectorAll(".info-options")];

  const handleHoverOptions = (event) => {
    const optionValue = event.target.innerText;
    const optionText = optionValue.split(" ");
    optionBg.innerText = optionText[0].replace(".", "");

    const optionAtual = event.currentTarget;
    const optionAtualIndex = options.indexOf(optionAtual);

    infoOptions.map((el, index) => {
      el.style.display = "none";
      if (index === optionAtualIndex) {
        el.style.display = "block";
      }
    });
  };

  //EVENTOS
  hamburger.addEventListener("click", handleClickMenu);
  options.map((option) =>
    option.addEventListener("mouseover", handleHoverOptions)
  );
  optionBg.addEventListener("mouseover", () => {
    optionBg.innerText = "";
    infoOptions.map((el) => (el.style.display = "none"));
  });

  iconsSociais.map((icon) => {
    icon.addEventListener("mouseover", () => {
      icon.src = icon.src.replace(".png", "White.png");
    });

    icon.addEventListener("mouseout", () => {
      icon.src = icon.src.replace("White.png", ".png");
    });
  });
};
