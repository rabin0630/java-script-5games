const menuPageEl = document.querySelector(".sp-cover") as HTMLElement;
const backToMenuEl = document.querySelector(".sp-back-to-menu") as HTMLElement;
const gamePageEl = document.querySelector(".sp-container") as HTMLElement;
const showOriginalBtnEl = document.querySelector("#sp-show-original-btn");
const gameScreen = document.querySelector(".sp-screen") as HTMLElement;
const originalImageEl = document.querySelector(
  "#sp-original-image",
) as HTMLElement;
const levelOptions = document.querySelectorAll(
  ".sp-menu > li",
) as NodeListOf<HTMLLIElement>;

// 定数
let selectedLevel: string;
let selectedImage: string;
let size: number;
let orderedArray = [];

const images = ["space", "veges"];
const levelMap = {
  easy: { grid: "auto auto", size: 2 },
  medium: { grid: "auto auto auto", size: 3 },
  difficult: { grid: "auto auto auto auto", size: 4 },
};

// 関数
const showGamePage = (): void => {
  menuPageEl.classList.add("hide");
  gamePageEl.classList.add("show");
};

const showMenuPage = (): void => {
  menuPageEl.classList.remove("hide");
  gamePageEl.classList.remove("show");
};

const setOriginalImage = () => {
  selectedImage = images[Math.floor(Math.random() * images.length)];
  originalImageEl?.setAttribute(
    "src",
    `./src/images/slide_puzzle/${selectedImage}/${selectedImage}.png`,
  );
};

const renderTiles = (arr) :void=> {
  gameScreen.innerHTML="";
  arr.forEach((tile) => {
    const div = document.createElement("div");
    div.classList.add("sp-tile");
    div.style.backgroundImage = `url(./src/images/slide_puzzle/${selectedImage}/${selectedLevel}/tile${tile}.png)`;
    gameScreen.appendChild(div);
  });
};

const start = () =>{
  setOriginalImage();
  renderTiles(orderedArray);
}

// イベントリスナー
backToMenuEl.addEventListener("click", () => {
  showMenuPage();
  selectedLevel = "";
});

levelOptions.forEach((option) => {
  option.addEventListener("click", () => {
    orderedArray = [];
    selectedLevel = option.dataset.level as keyof typeof levelMap;
    size = levelMap[selectedLevel].size;
    for (let x: number = 0; x < size; x++) {
      for (let y: number = 0; y < size; y++) {
        let tileXY = "" + x + y;
        orderedArray.push(tileXY);
      }
    }
    gameScreen.style.gridTemplateColumns = levelMap[selectedLevel].grid;
    
    showGamePage();
    start();
    
  });
});

showOriginalBtnEl?.addEventListener("mouseover", () => {
  originalImageEl.classList.add("show");
});

showOriginalBtnEl?.addEventListener("mouseleave", () => {
  originalImageEl.classList.remove("show");
});
