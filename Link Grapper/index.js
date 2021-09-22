const save = document.querySelector("#inputBtn");
const inputs = document.getElementById("inputText");
const list = document.getElementById("list");
const deleteAll = document.querySelector("#deleteBtn");
const saveTab = document.querySelector("#saveTab");
// var d = document.getElementsByClassName("fa-scissors");
// const download = document.getElementById("downloadBtn");

//URL FOR REGEX CHECKING
const url =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
// const url =
//   /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
// const url =
//   /\b(https?|ftp|file):\/\/[\-A-Za-z0-9+&@#\/%?=~_|!:,.;]*[\-A-Za-z0-9+&@#\/%=~_|]/;

let bookmarks = [];

// TO GET BACK ELEMENTS FROM LOCAL STORAGE AND RENDER THEM ON DOC
const locallist = window.localStorage.getItem("bookmarks");
if (locallist) {
  bookmarks = JSON.parse(locallist);
  render(bookmarks);
}

//RENDERING BOOKMARKS ARRAY TO HTML AS LIST ITEMS
function render(array) {
  let listItems = "";
  for (let i = 0; i < array.length; i++) {
    listItems += `
    <li id="${i + "A"}">
        <a  href = "${array[i]}" target="_blank">
            ${array[i]}
        </a>
        <button onclick = "deleteLink(this.id) " class="fa fa-scissors" id="${i}"></button>
    </li>`;
  }
  list.innerHTML = listItems;
  // d = document.getElementsByClassName("fa-scissors");
  // console.log(d);
  // console.log(d.length);
}

// document.addEventListener("DOMContentLoaded", function () {
//   for (let i = 0; i < bookmarks.length; i++) {
//     document
//       .getElementById(`${i}`)
//       .addEventListener("click", deleteLink(`${i}`));
//   }
// });

// for (let i = 0; i < d.length; i++) {
//   d[i].onclick = deleteLink;
// }

//TO DELETE INDIVIDUAL LINKS
function deleteLink(id) {
  console.log("ggfhgfhfgfh");
  bookmarks.splice(parseInt(id), 1);
  window.localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  render(bookmarks);
}

//SAVE LINK BUTTON EVENT LISTENER
save.addEventListener("click", function () {
  if (inputs.value.match(url)) {
    bookmarks.push(inputs.value);
    inputs.value = "";
    window.localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    render(bookmarks);
  }
  createfile();
});

//SAVE TAB BUTTON EVENT LISTENER
saveTab.addEventListener("click", function () {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    bookmarks.push(tabs[0].url);
    window.localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    render(bookmarks);
  });
});

//DELETE ALL BUTTON EVENT LISTENER
deleteAll.addEventListener("dblclick", function () {
  localStorage.clear();
  bookmarks = [];
  render(bookmarks);
});

// function createfile() {
//   const fs = require("fs");
//   const writeStream = fs.createWriteStream("YourLinks.txt");
//   //const pathName = writeStream.path;
//   bookmarks.forEach((value) => writeStream.write(`${value}\n`));
//   writeStream.end();
// }

// console.log(bookmarks);
