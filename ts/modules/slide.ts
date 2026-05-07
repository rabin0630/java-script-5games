const menuPageEl = document.querySelector(".sp-cover") as HTMLElement;
const backToMenuEl = document.querySelector(".sp-back-to-menu") as HTMLElement;
const gamePageEl = document.querySelector(".sp-container") as HTMLElement;

const levelOptions = document.querySelectorAll(
  ".sp-menu > li",
) as NodeListOf<HTMLLIElement>;

let selectedLevel;

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
  });
});

backToMenuEl.addEventListener("click", () => {
  showMenuPage();
  selectedLevel = "";
});
