const menuPageEl = document.querySelector(".sp-cover") as HTMLElement;
const backToMenuEl = document.querySelector(".sp-back-to-menu") as HTMLElement;
const gamePageEl = document.querySelector(".sp-container") as HTMLElement;
const showOriginalBtnEl = document.querySelector("#sp-show-original-btn");
const gameScreen = document.querySelector(".sp-screen") as HTMLElement;
const movesEl = document.querySelector(".sp-counter");
const originalImageEl = document.querySelector(
  "#sp-original-image",
) as HTMLImageElement;
const levelOptions = document.querySelectorAll(
  ".sp-menu > li",
) as NodeListOf<HTMLLIElement>;

/* 型定義 => */

interface LevelMap {
  [key: string]: {
    grid: string;
    size: number;
  };
}

/** <= 型定義 */

/** 変数 => */

let selectedLevel: string;
let selectedImage: string;
let size: number;
let orderedArray: string[] = [];
let hiddenTileIndex;
let tilesArray = [];
let tiles;
let tileMoveCounter: number = 0;
/* <= 変数 */

/* 定数 => */

const images = ["space", "veges"];
const levelMap: LevelMap = {
  easy: { grid: "auto auto", size: 2 },
  medium: { grid: "auto auto auto", size: 3 },
  difficult: { grid: "auto auto auto auto", size: 4 },
};

/* <= 定数 */

/* 関数 => */

const showGamePage = (): void => {
  menuPageEl.classList.add("hide");
  gamePageEl.classList.add("show");
};

const showMenuPage = (): void => {
  menuPageEl.classList.remove("hide");
  gamePageEl.classList.remove("show");
  gameScreen.classList.remove("zoom");
};

const setOriginalImage = () => {
  selectedImage = images[Math.floor(Math.random() * images.length)];
  originalImageEl?.setAttribute(
    "src",
    `./src/images/slide_puzzle/${selectedImage}/${selectedImage}.png`,
  );
};

originalImageEl.onload = () => {
  const naturalWidth = originalImageEl.naturalWidth;
  const naturalHeight = originalImageEl.naturalHeight;
  const ratio = Math.floor((naturalHeight / naturalWidth) * 1000) / 1000;
  gameScreen.style.width = "480px";
  gameScreen.style.height = `${Math.floor(480 * ratio)}px`;
};

const renderTiles = (arr: string[]): void => {
  gameScreen.innerHTML = "";
  arr.forEach((tile, index) => {
    const div = document.createElement("div");
    div.classList.add("sp-tile");
    if (index === hiddenTileIndex) {
      div.classList.add("hidden");
    }
    div.style.backgroundImage = `url(./src/images/slide_puzzle/${selectedImage}/${selectedLevel}/tile${tile}.png)`;
    gameScreen.appendChild(div);
  });
};

const start = () => {
  tileMoveCounter = 0;
  movesEl.innerHTML = tileMoveCounter;
  setOriginalImage();
  tilesArray = generateShuffledArray(orderedArray);
  renderTiles(tilesArray);
  updateScreen();
};

const generateShuffledArray = (arr) => {
  let shuffledArray = arr.slice();
  for (let i = shuffledArray.length - 1; i > -1; i--) {
    let randomIndex = Math.floor(Math.random() * shuffledArray.length);
    let tempValue = shuffledArray[i];
    shuffledArray[i] = shuffledArray[randomIndex];
    shuffledArray[randomIndex] = tempValue;
  }
  return shuffledArray;
};

const updateScreen = () => {
  tiles = document.querySelectorAll(".sp-tile");
  const hiddenTileRow = Math.floor(hiddenTileIndex / size);
  const hiddenTileCol = hiddenTileIndex % size;

  const generateNewArray = (arr, index, hiddenTileIndex) => {
    const tempArr = arr[index];
    arr[index] = arr[hiddenTileIndex];
    arr[hiddenTileIndex] = tempArr;
    return arr;
  };

  const updateTiles = (index) => {
    tilesArray = generateNewArray(tilesArray, index, hiddenTileIndex);
    hiddenTileIndex = index;
    renderTiles(tilesArray);
    updateMoveCount();
    setTimeout(()=>{
      if(JSON.stringify(tilesArray) === JSON.stringify(orderedArray)){
        complete();
      }
    },500)
    updateScreen(); // ここで呼べば増殖しない
  };

  const updateMoveCount = () => {
    movesEl.innerHTML = "";
    tileMoveCounter += 1;
    movesEl.innerHTML = String(tileMoveCounter);
  };

  tiles.forEach((tile, index) => {
    tile.addEventListener("click", () => {
      const row = Math.floor(index / size);
      const col = index % size;
      if (selectedLevel === "easy") {
        updateTiles(index);
      } else {
        if (
          (row === hiddenTileRow && Math.abs(col - hiddenTileCol) === 1) ||
          (col === hiddenTileCol && Math.abs(row - hiddenTileRow) === 1)
        ) {
          updateTiles(index);
        }
      }
    });
  });
};

const complete = () => {
  tiles[hiddenTileIndex].classList.remove("hidden");
  gameScreen.classList.add("zoom");
  tiles.forEach((tile)=>{
    tile.classList.add("complete");

  })
}
/** <= 関数 */

/** イベントリスナー => */

backToMenuEl.addEventListener("click", () => {
  showMenuPage();
  selectedLevel = "";
});

levelOptions.forEach((option) => {
  option.addEventListener("click", () => {
    orderedArray = [];
    selectedLevel = option.dataset.level as string;
    size = levelMap[selectedLevel].size;
    for (let x: number = 0; x < size; x++) {
      for (let y: number = 0; y < size; y++) {
        let tileXY = "" + x + y;
        orderedArray.push(tileXY);
      }
    }
    hiddenTileIndex = Math.floor(Math.random() * size ** 2);
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

/** <= イベントリスナー */

export {};
