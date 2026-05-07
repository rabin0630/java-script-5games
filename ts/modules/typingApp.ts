// 型を適切に指定（select要素を想定）
const typingGameParent = document.getElementById("typing") as HTMLElement;
const timesElement = document.querySelector("#times") as HTMLSelectElement;
const startPageEl = document.querySelector("#ty-start-page") as HTMLElement;
const typingGameEl = document.querySelector("#ty-game") as HTMLElement;
const summaryEl = document.querySelector("#ty-result-container");
const selectTimeEl = document.querySelector(
  ".ty-time-select",
) as HTMLSelectElement;
const textarea = document.getElementById("ty-textarea") as HTMLTextAreaElement;
const backToStart = document.getElementById("ty-back-to-start");
const resultPageEl = document.getElementById("ty-result-container");
const timesGroupEl = document.querySelector("#times") as HTMLOptGroupElement;
const tittleTimeEl = document.querySelector("#ty-title-time") as HTMLElement;
const remainingTimeEl = document.querySelector("#ty-timer") as HTMLElement;
const toastMessage = document.querySelector(".toast-message") as HTMLElement;
const quote = document.querySelector("#ty-quote") as HTMLElement;
const author = document.querySelector("#ty-author-name") as HTMLElement;
const LPMEl = document.querySelector("#ty-LPM") as HTMLElement;
const quoteReviewEl = document.querySelector("#ty-qoute-review") as HTMLElement;

let TimeLimit: string = "";
let remainingTimeNumber: number;
let isActive: boolean = false;
let isPlaying: boolean = false;
let toastTimeout: ReturnType<typeof setTimeout>;
let intervalId: ReturnType<typeof setInterval>;
let quotes: {
  quote: string;
  author: string;
};
let typedCount: number;
let LPMCount: number;

const times: number[] = [3, 20, 30, 45, 60];
/**制限時間選択用のselect要素内にoption要素を生成して挿入する
 * @param {number[]} times - 選択肢として表示する秒数の配列
 * @returns {void}
 */
const renderTimeSelectOptions = (times: number[]): void => {
  timesGroupEl.innerHTML = "";
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
    optionElements.className = "select-times";
    optionElements.textContent = `${String(time)}second`;

    timesGroupEl.appendChild(optionElements);
  });
};

//** 選択した時間を取得する */
selectTimeEl?.addEventListener("change", () => {
  TimeLimit = selectTimeEl.value;
});

/** --エラーメッセージを表示する関数である--
 * 第一引数はテキストの挿入
 */
const showStatus = (text: string, isError = true) => {
  // 画面中央のトーストにも表示して5秒で消す（3秒後から2秒かけてフェードアウト）
  toastMessage.textContent = text;
  toastMessage.style.display = "block";
  toastMessage.style.transition = "none"; // パッと表示させる
  toastMessage.style.opacity = "1";

  if (toastTimeout) clearTimeout(toastTimeout); // エラーが連続して起きた場合のバグ処理
  toastTimeout = setTimeout(() => {
    toastMessage.style.transition = "opacity 2s ease-out"; // 2秒かけて透明にする
    toastMessage.style.opacity = "0";
    setTimeout(() => {
      if (toastMessage.style.opacity === "0")
        toastMessage.style.display = "none";
    }, 2000);
  }, 3000);
};

/** タイトル画面からゲーム画面に遷移する関数である
 * Enterキーを押すときに使用する
 */
const start = async (): Promise<void> => {
  const currentTimeLimit: string = selectTimeEl.value;

  if (!currentTimeLimit) {
    showStatus("Select time limit!!");
    isPlaying = false;
    return;
  }

  TimeLimit = currentTimeLimit;
  remainingTimeNumber = Number(currentTimeLimit);

  startPageEl.classList.remove("show");
  typingGameEl.classList.add("show");
  tittleTimeEl.textContent = TimeLimit;
  remainingTimeEl.textContent = String(remainingTimeNumber);
  quote.innerHTML = "";
  author.innerHTML = "";
  typedCount = 0;

  textarea.value = "";
  textarea.disabled = false;
  textarea?.focus();
  await fetchAndRenderQuotes();

  intervalId = setInterval(() => {
    remainingTimeNumber -= 1;
    remainingTimeEl.textContent = String(remainingTimeNumber);

    if (remainingTimeNumber <= 0) {
      showResult();
      renderTimeSelectOptions(times);
    }
  }, 1000);
};

function showResult() {
  textarea.disabled = true;

  clearInterval(intervalId);
  LPMCount =
    remainingTimeNumber === 0
      ? Math.floor((typedCount * 60) / Number(TimeLimit))
      : Math.floor(
          (typedCount * 60) / (Number(TimeLimit) - remainingTimeNumber),
        );
  quoteReviewEl.innerHTML = `${quotes.quote}<br>---${quotes.author}`;
  let count: number = 0;
  setTimeout(() => {
    resultPageEl?.classList.add("show");
    const countup = setInterval(() => {
      LPMEl.textContent = String(count);
      count += 1;
      if (count >= LPMCount) {
        clearInterval(countup);
      }
    }, 20);
  }, 1000);
}

backToStart?.addEventListener("click", () => {
  startPageEl.classList.add("show");
  typingGameEl.classList.remove("show");
  resultPageEl?.classList.remove("show");
  isPlaying = false;
});
/** Enterキーを押したときのイベントリスナー */
window.addEventListener("keypress", (event) => {
  isActive = typingGameParent.classList.contains("active");
  if (event.key === "Enter" && isActive && !isPlaying) {
    isActive = false;
    isPlaying = true;
    start(); // タイトル画面からゲーム画面に遷移
  }
  return;
});

async function fetchAndRenderQuotes() {
  const RANDOM_QUOTE_API_URL = "http://api.quotable.io/random";
  const response = await fetch(RANDOM_QUOTE_API_URL);
  const data = await response.json();

  quotes = {
    quote: data.content,
    author: data.author,
  };

  quotes.quote.split("").forEach((letter) => {
    const span = document.createElement("span");
    span.textContent = letter;
    quote.appendChild(span);
  });
  author.textContent = quotes.author;
}

textarea.addEventListener("input", () => {
  let inputArray = textarea.value.split("");
  let spans = quote.querySelectorAll("span");
  spans.forEach((span) => {
    span.className = "";
  });
  typedCount = 0;
  inputArray.forEach((letter, index) => {
    if (letter === spans[index].textContent) {
      spans[index].classList.add("correct");
      if (spans[index].textContent !== "") {
        typedCount += 1;
      }
    } else {
      spans[index].classList.add("wrong");
      if (spans[index].textContent === "") {
        spans[index].classList.add("bar");
      }
    }
  });
  if (
    spans.length === inputArray.length &&
    [...spans].every((span) => span.classList.contains("correct"))
  ) {
    showResult();
  }
});

//-------//
renderTimeSelectOptions(times);

export const resetState = (): void => {
  startPageEl.classList.add("show");
  typingGameEl.classList.remove("show");
  resultPageEl?.classList.remove("show");
  isActive = false;
  isPlaying = false;
  renderTimeSelectOptions(times);
  clearInterval(intervalId);
};
