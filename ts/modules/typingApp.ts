// 型を適切に指定（select要素を想定）
const timesElement = document.querySelector("#times") as HTMLSelectElement;
const startPage = document.querySelector("#ty-start-page") as HTMLElement;
const typingGame = document.querySelector("#ty-game") as HTMLElement;
const summary = document.querySelector("#ty-result-container");
const select = document.querySelector(".ty-time-select");
console.log(startPage,typingGame,summary)

console.log(select);
select.addEventListener("change",event =>{
  console.log(event.target.value);
})

const times: number[] = [10, 20, 30, 45, 60];
const mktime = (SelectTimes: number[]) => {
  // 1. 最初に「選択してください」を追加
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "選択してください";
  defaultOption.selected = true;
  timesElement.appendChild(defaultOption);

  // 2. ループの中で毎回新しいoption要素を作成する
  SelectTimes.forEach((time) => {
    const optionElements = document.createElement("option"); // ここで毎回生成
    optionElements.id = "selecttimes";
    optionElements.value = String(time);
    optionElements.textContent = `${String(time)}second`;
    timesElement.appendChild(optionElements);
  });
};

const selecttimes = document.getElementsByClassName

const start=():void => {
  // startPage.classList.remove("show");
  // typingGame.classList.add("show");
  
}

window.addEventListener("keypress",(event) =>{
  if(event.key ==="Enter"){
    start();
  }
})

mktime(times);