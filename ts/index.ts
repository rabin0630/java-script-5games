import * as Todo from "./modules/todo"
import * as typingApp from "./modules/typingApp"
const nav = document.querySelector("nav");
const cover = document.getElementById("cover");
const appElements = document.querySelectorAll(".app"); //
const appNames: string[] = ["todo","typing","slide-puzzle","memory-card","life"];

/** --- 各アプリ名をnavbarに挿入する処理 ---
 * 1. forEachで配列 appNames の各要素を appName として取り出す
 * 2. createElement で <p> 要素を作成し、変数 navmenu に代入する
 * 3. navmenu にクラス名 "nav-menu" を追加する
 * 4. navmenu のテキストに変数 appName の値を設定する
 * 5. 親要素 nav の末尾に、作成した navmenu を子要素として追加する
 */
appNames.forEach(appName =>{
const navmenu = document.createElement("p");
navmenu.classList.add("nav-menu");
navmenu.textContent = appName.toUpperCase();


// ---選択したメニューを表示する---
navmenu.addEventListener("click",()=>{
  cover.classList.remove("active");
  appElements.forEach((app)=>{app.classList.remove("active");})
  // --- 2.選択したアプリを表示する --- //
  const appElement = document.getElementById(appName); // 選択したアプリをを変数に代入
  appElement.classList.add("active"); // 選択したアプリを表示

  /// ----- 選択したメニューのナビゲーションバー背景を白にする設定 ----- ///
  // --- 1.初期化する--- //
  const navmenus =document.querySelectorAll(".nav-menu");
  navmenus.forEach((navmenu)=>{navmenu.classList.remove("active");}) // 全て非表示にする
  // --- 2.選択したメニューの背景を白にする --- //
  navmenu.classList.add("active");
})
nav.appendChild(navmenu);
})
