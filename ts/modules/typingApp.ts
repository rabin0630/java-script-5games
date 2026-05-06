// 型を適切に指定（select要素を想定）
const timesElement = document.querySelector("#times") as HTMLSelectElement;
const startPageEl = document.querySelector("#ty-start-page") as HTMLElement;
const typingGameEl = document.querySelector("#ty-game") as HTMLElement;
const summaryEl = document.querySelector("#ty-result-container");
const selectTimeEl = document.querySelector(
  ".ty-time-select",
) as HTMLSelectElement;
const timesGroupEl = document.querySelector("#times") as HTMLOptGroupElement;
const tittleTimeEl = document.querySelector("#ty-title-time") as HTMLElement;
const remainingTimeEl = document.querySelector("#ty-timer") as HTMLElement;
const toastMessage = document.querySelector(".toast-message") as HTMLElement;

const times: number[] = [10, 20, 30, 45, 60];
/**制限時間選択用のselect要素内にoption要素を生成して挿入する
 * @param {number[]} times - 選択肢として表示する秒数の配列
 * @returns {void}
 */
const renderTimeSelectOptions = (times: number[]): void => {
  // デフォルト
  const defaultOption = document.createElement("option");

  defaultOption.value = "";
  defaultOption.selected = true;
  defaultOption.textContent = "選択してください";

  timesElement.appendChild(defaultOption);

  // 時間選択技
  times.forEach((time) => {
    const optionElements = document.createElement("option");

    optionElements.value = String(time);
    optionElements.className = "selecttimes";
    optionElements.textContent = `${String(time)}second`;

    timesGroupEl.appendChild(optionElements);
  });
};

//** 選択した時間を取得する */
let timeLimit: string = "";
let remainingTime;
selectTimeEl?.addEventListener("change", () => {
  timeLimit = selectTimeEl.value;

});

let toastTimeout: ReturnType<typeof setTimeout>;

/** --エラーメッセージを表示する関数である--
 * 第一引数はテキストの挿入
 */
const showStatus = (text: string, isError = true) => {

  // 画面中央のトーストにも表示して5秒で消す（3秒後から2秒かけてフェードアウト）
  toastMessage.textContent = text;
  toastMessage.style.display = 'block';
  toastMessage.style.transition = 'none'; // パッと表示させる
  toastMessage.style.opacity = '1';

  if (toastTimeout) clearTimeout(toastTimeout); // エラーが連続して起きた場合のバグ処理
  toastTimeout = setTimeout(() => {
    toastMessage.style.transition = 'opacity 2s ease-out'; // 2秒かけて透明にする
    toastMessage.style.opacity = '0';
    setTimeout(() => {
      if (toastMessage.style.opacity === '0') toastMessage.style.display = 'none';
    }, 2000);
  }, 3000);
};
/** タイトル画面からゲーム画面に遷移する関数である
 * Enterキーを押すときに使用する
 */
const start = (): void => {
  const currentTimeLimit = selectTimeEl.value;

  if(!currentTimeLimit){
    showStatus("Select time limit!!");
    return;
  }

  timeLimit = currentTimeLimit;

  startPageEl.classList.remove("show");
  typingGameEl.classList.add("show");
  tittleTimeEl.textContent = timeLimit;
  remainingTime = timeLimit;
  remainingTimeEl.textContent = remainingTime;
};

/** Enterキーを押したときのイベントリスナー */
window.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    start(); // タイトル画面からゲーム画面に遷移
    console.log(selectTimeEl);
    if (!selectTimeEl.value) {
      console.log("shit");
    }
  }
});

//-------//
renderTimeSelectOptions(times);
