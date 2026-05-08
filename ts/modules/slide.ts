const menuPageEl = document.querySelector(".sp-cover") as HTMLElement;
const backToMenuEl = document.querySelector(".sp-back-to-menu") as HTMLElement;
const gamePageEl = document.querySelector(".sp-container") as HTMLElement;
const originalImageEl = document.querySelector(
  "#sp-original-image",
) as HTMLElement;
const showOriginalBtnEl = document.querySelector("#sp-show-original-btn");
const levelOptions = document.querySelectorAll(
  ".sp-menu > li",
) as NodeListOf<HTMLLIElement>;
let selectedLevel;
let selectedImage;
const images = ["space", "veges"];

const showGamePage = (): void => {
  menuPageEl.classList.add("hide");
  gamePageEl.classList.add("show");
};

const showMenuPage = (): void => {
  menuPageEl.classList.remove("hide");
  gamePageEl.classList.remove("show");
};

levelOptions.forEach((option) => {
  option.addEventListener("click", () => {
    showGamePage();
    selectedLevel = option.dataset.level;
    setOriginalImage();
  });
});

backToMenuEl.addEventListener("click", () => {
  showMenuPage();
  selectedLevel = "";
});

const setOriginalImage = () => {
  selectedImage = images[Math.floor(Math.random() * images.length)];
  originalImageEl?.setAttribute(
    "src",
    `./src/images/slide_puzzle/${selectedImage}/${selectedImage}.png`,
  );
};

showOriginalBtnEl?.addEventListener("mouseover", () => {
  originalImageEl.classList.add("show");
});

showOriginalBtnEl?.addEventListener("mouseleave", () => {
  originalImageEl.classList.remove("show");
});
