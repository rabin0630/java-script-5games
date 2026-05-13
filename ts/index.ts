import * as Todo from "./modules/todo";
import * as typingApp from "./modules/typingApp";
import * as slide from "./modules/slide";
import * as memory from "./modules/memory"
const nav = document.querySelector("nav") as HTMLElement;
const cover = document.getElementById("cover") as HTMLElement;
const appElements = document.querySelectorAll(".app") as NodeListOf<Element>;
const appNames: string[] = [
  "todo",
  "typing",
  "slide-puzzle",
  "memory-card",
  "life",
];

appNames.forEach((appName) => {
  const navMenu = document.createElement("p");
  navMenu.classList.add("nav-menu");
  navMenu.textContent = appName.toUpperCase();

  navMenu.addEventListener("click", () => {
    cover.classList.remove("active");
    appElements.forEach((app) => {
      app.classList.remove("active");
    });

    const appElement = document.getElementById(appName) as HTMLElement; // 選択したアプリをを変数に代入
    appElement.classList.add("active"); // 選択したアプリを表示
    typingApp.resetState();
    /// ----- 選択したメニューのナビゲーションバー背景を白にする設定 ----- ///
    const navMenus = document.querySelectorAll(".nav-menu");
    navMenus.forEach((navMenu) => {
      navMenu.classList.remove("active");
    }); // 全て非表示にする
    // --- 2.選択したメニューの背景を白にする --- //
    navMenu.classList.add("active");
  });
  nav.appendChild(navMenu);
});
