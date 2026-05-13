const gamePageEl = document.querySelector(".mc-deck");
const summaryEl = document.querySelector(".mc-congrats");

/** 定数 => */

const faces = [
  "bug",
  "upload",
  "configuration",
  "connection",
  "database",
  "www",
  "mobile",
  "keyboard",
];

const facespath: { [key: string]: string } = {
  bug: "./src/images/memory_card/bug.svg",
  upload: "./src/images/memory_card/upload.svg",
  configuration: "./src/images/memory_card/configuration.svg",
  connection: "./src/images/memory_card/connection.svg",
  database: "./src/images/memory_card/database.svg",
  www: "./src/images/memory_card/www.svg",
  mobile: "./src/images/memory_card/mobile.svg",
  keyboard: "./src/images/memory_card/keyboard.svg",
};

/** <= 定数 */

/** 関数 => */

const createDeck = () => {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("mc-card");

  const frontDiv = document.createElement("div");
  frontDiv.classList.add("mc-front");
  const frontImg = document.createElement("img");
  frontDiv.appendChild(frontImg);

  const backDiv = document.createElement("div");
  backDiv.classList.add("mc-back");
  const backImg = document.createElement("img");
  backImg.setAttribute("src", "./src/images/memory_card/hand.svg");
  backDiv.appendChild(backImg);

  cardDiv.appendChild(frontDiv);
  cardDiv.appendChild(backDiv);

  return cardDiv
};

/** <= 関数 */
export {};
