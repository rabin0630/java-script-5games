const movesEl = document.querySelector(".sp-counter") as HTMLElement;
const menuPageEl = document.querySelector(".sp-cover") as HTMLElement;
const gamePageEl = document.querySelector(".sp-container") as HTMLElement;
const gameScreenEl = document.querySelector(".sp-screen") as HTMLElement;
const backToMenuEl = document.querySelector(".sp-back-to-menu") as HTMLElement;
const showOriginalBtnEl = document.querySelector(
  "#sp-show-original-btn",
) as HTMLElement;

const originalImageEl = document.querySelector(
  "#sp-original-image",
) as HTMLImageElement;
const levelOptionsEl = document.querySelectorAll(
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

let size: number;
let tilesEl: NodeListOf<HTMLElement>;
let tilesArray: string[] = [];
let orderedArray: string[] = [];
let selectedLevel: string;
let hiddenTileIndex: number;
let tileMoveCounter: number = 0;
let randomSelectedImage: string;

/* <= 変数 */

/* 定数 => */

const images: string[] = ["space", "veges"];

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
  gameScreenEl.classList.remove("zoom");
};

const setOriginalImage = (): void => {
  randomSelectedImage = images[Math.floor(Math.random() * images.length)]; // 写真をランダムで決める
  originalImageEl?.setAttribute(
    "src",
    `./src/images/slide_puzzle/${randomSelectedImage}/${randomSelectedImage}.png`,
  );
};

/** ゲーム画面のタイルサイズを指定する
 * 
 */
originalImageEl.onload = () => {
  const naturalWidth = originalImageEl.naturalWidth;
  const naturalHeight = originalImageEl.naturalHeight;
  const ratio = Math.floor((naturalHeight / naturalWidth) * 1000) / 1000;

  gameScreenEl.style.width = "480px";
  gameScreenEl.style.height = `${Math.floor(480 * ratio)}px`;
};

const renderTiles = (tiles: string[]): void => {
  gameScreenEl.innerHTML = "";

  tiles.forEach((tile, index) => {
    const tileEl = document.createElement("div") as HTMLDivElement;

    tileEl.classList.add("sp-tile");

    if (index === hiddenTileIndex) {
      tileEl.classList.add("hidden");
    }
    tileEl.style.backgroundImage = `url(./src/images/slide_puzzle/${randomSelectedImage}/${selectedLevel}/tile${tile}.png)`;
    gameScreenEl.appendChild(tileEl);
  });
};

const start = (): void => {
  tileMoveCounter = 0;
  movesEl.innerHTML = String(tileMoveCounter);
  setOriginalImage();
  tilesArray = generateShuffledArray(orderedArray);
  renderTiles(tilesArray);
  updateScreen();
};

const generateShuffledArray = (arr: string[]): string[] => {
  let shuffledArray = arr.slice();
  for (let i = shuffledArray.length - 1; i > -1; i--) {
    let randomIndex = Math.floor(Math.random() * shuffledArray.length);
    let tempValue = shuffledArray[i];
    shuffledArray[i] = shuffledArray[randomIndex];
    shuffledArray[randomIndex] = tempValue;
  }
  return shuffledArray;
};

const updateScreen = (): void => {
  tilesEl = document.querySelectorAll(".sp-tile") as NodeListOf<HTMLElement>;
  const hiddenTileRow = Math.floor(hiddenTileIndex / size);
  const hiddenTileCol = hiddenTileIndex % size;

  const generateNewArray = (
    arr: string[],
    index: number,
    hiddenTileIndex: number,
  ): string[] => {
    const tempArr = arr[index];
    arr[index] = arr[hiddenTileIndex];
    arr[hiddenTileIndex] = tempArr;
    return arr;
  };

  const updateTiles = (index: number): void => {
    tilesArray = generateNewArray(tilesArray, index, hiddenTileIndex);
    hiddenTileIndex = index;
    renderTiles(tilesArray);
    updateMoveCount();
    setTimeout(() => {
      if (JSON.stringify(tilesArray) === JSON.stringify(orderedArray)) {
        complete();
      }
    }, 500);
    updateScreen(); // ここで呼べば増殖しない
  };

  const updateMoveCount = (): void => {
    movesEl.innerHTML = "";
    tileMoveCounter += 1;
    movesEl.innerHTML = String(tileMoveCounter);
  };

  tilesEl.forEach((tile, index) => {
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

const complete = (): void => {
  tilesEl[hiddenTileIndex].classList.remove("hidden");
  gameScreenEl.classList.add("zoom");
  tilesEl.forEach((tile) => {
    tile.classList.add("complete");
  });
};
/** <= 関数 */

/** イベントリスナー => */

backToMenuEl.addEventListener("click", () => {
  showMenuPage();
  selectedLevel = "";
});

levelOptionsEl.forEach((option) => {
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
    gameScreenEl.style.gridTemplateColumns = levelMap[selectedLevel].grid;

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
