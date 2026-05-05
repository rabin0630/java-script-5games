export const addForm = document.querySelector(".td-add-form") as HTMLFormElement;
const addInput = document.querySelector(".td-add-input") as HTMLInputElement;
const todoUI = document.querySelector(".todos") as HTMLBodyElement;
const DoneUI = document.querySelector(".dones") as HTMLBodyElement;
const searchForm = document.querySelector(".td-search-form") as HTMLElement;
const searchInput = document.querySelector(".td-search-input") as HTMLFormElement;
// 型の定義
interface Todo {
  content: string;
  isDone: boolean;
}

/** 新しいtodoをリストに追加し、ローカルストレージを送信する */
let todoDatas: Todo[] = [];
addForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputValue: string = addInput.value.trim();
  // 空文字の場合はリセットして終了
  if (!inputValue) {
    addInput.value = ``;
    return;
  }

  const newTodo: Todo = {
    content: inputValue,
    isDone: false,
  };
  todoDatas.push(newTodo);
  updateLS(todoDatas);
  updateTodo();
  addInput.value = ``;
});

/** ローカルストレージを更新する */
function updateLS(data: Todo[]) {
  localStorage.setItem("myTodo", JSON.stringify(data));
}

/** ローカルストレージからTodoDataを取得する*/
function getTodoDataFromLS() {
  return JSON.parse(localStorage.getItem("myTodo")!)||[];
}

/** 画像を使用したボタンの生成 */
function makeBtnImg(className:string,imagePath:string){
  const btn = document.createElement("img") ;
  btn.classList.add("td-btn");
  btn.classList.add(className);
  btn.setAttribute("src",imagePath)
  return btn
  }


/** 要素を生成する関数 */
function createTodoElement(todo: Todo) {
  // --- 1.要素の生成 ---
  const todoList = document.createElement("li");
  todoList.classList.add("td-item");
  
  const todoListP = document.createElement("p");
  todoListP.classList.add("td-content");
  todoListP.textContent = todo.content;
  
  todoList.appendChild(todoListP);

  // --- ボタンの生成 ---
  // const btn = document.createElement("img") as HTMLImageElement;
  // btn.classList.add("td-btn");

  // const upBtn = btn.cloneNode(false) as HTMLImageElement;
  // upBtn.setAttribute("src", "/src/images/todo_button/up.png");

  let upBtn;
  let btn;
  // --- 2.状態による使用画像の選択
  if (!todo.isDone) {
    btn = makeBtnImg("isDone-btn","/src/images/todo_button/ok.png")
    upBtn = makeBtnImg("edit-btn","/src/images/todo_button/up.png");
    // upBtn.classList.add("edit-btn");
    // const isDoneBtn = makeBtnImg("isDone-btn");
    // btn.classList.add("isDone-btn");
    // btn.setAttribute("src", );
  } else {
    upBtn = makeBtnImg("undo-btn","/src/images/todo_button/up.png")
    btn = makeBtnImg("delete-btn","/src/images/todo_button/cancel.png")
    // upBtn.classList.add("undo-btn");
    // btn.classList.add("delete-btn");
    // btn.setAttribute("src", "/src/images/todo_button/cancel.png");
  }
  // 共通の組み立て処理
  const btnContainer = document.createElement("div");
  btnContainer.classList.add("td-btn-container");

  btnContainer.appendChild(upBtn);
  btnContainer.appendChild(btn);
  todoList.appendChild(btnContainer);

  todoList.addEventListener("click", (event: Event) => {
    const target = event.target as HTMLElement;
    if (!target || !target.classList) return;

    if (target.classList.contains("isDone-btn")) {
      todo.isDone = true;
    }
    if (target.classList.contains("undo-btn")) {
      todo.isDone = false;
    }
    if (target.classList.contains("edit-btn")) {
      addInput.value = target.parentElement.previousElementSibling.textContent;
      todoDatas = todoDatas.filter((data) => data !== todo);
      addInput.focus();
    }
    if (target.classList.contains("delete-btn")) {
      todoDatas = todoDatas.filter((data) => data !== todo);
    }
    updateLS(todoDatas);
    updateTodo();
  });
  return todoList;
}

// UIにtodoをレンダリングする関数
function renderTodo(todo: Todo) {
  // 要素の生成を依頼
  const todoElement = createTodoElement(todo);

  // 状態に応じてDOMに追加
  if (!todo.isDone) {
    todoUI.appendChild(todoElement);
  } else {
    DoneUI.appendChild(todoElement);
  }
}

function updateTodo() {
  todoUI.innerHTML = "";
  DoneUI.innerHTML = "";
  todoDatas = getTodoDataFromLS();
  todoDatas.forEach((todo) => {
    renderTodo(todo);
  });}


updateTodo();

searchForm.addEventListener("submit",(event)=>{
  event.preventDefault();
})

searchInput.addEventListener("keyup",()=>{
  const searchWord = searchInput.value.trim().toLowerCase();
  const todoItems = document.querySelectorAll(".td-item");
  todoItems.forEach(todoItem => {
    todoItem.classList.remove("hide");
    if(!todoItem.textContent.toLowerCase().includes(searchWord)){
      todoItem.classList.add("hide");
    }
  })
})