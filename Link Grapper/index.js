const save = document.querySelector("#inputBtn");
const inputs = document.getElementById("inputText");
const list = document.getElementById("list");
const deleteAll = document.querySelector("#deleteBtn");
const saveTab = document.querySelector("#saveTab");
const d = document.getElementsByClassName("fa-scissors");
// const download = document.querySelector("#downloadBtn");

const url =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
let bookmarks = [];
//let count = bookmarks.length;

const locallist = window.localStorage.getItem("bookmarks");
if (locallist) {
  bookmarks = JSON.parse(locallist);
  render(bookmarks);
}

function render(array) {
  let listItems = "";
  for (let i = 0; i < array.length; i++) {
    listItems += `
    <li id="${i + "A"}">
        <a  href = "${array[i]}" target="_blank">
            ${array[i]}
        </a>
        <button onclick ="deleteLink(this.id)" class="fa fa-scissors" id="${i}"></button>
    </li>`;
  }
  console.log(d);
  console.log(window);
  list.innerHTML = listItems;
}

// d.forEach((el) => {
//   el.addEventListener("click", deleteLink(el.getAttribute("id")));
// });

function deleteLink(id) {
  bookmarks.splice(parseInt(id), 1);
  window.localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  render(bookmarks);
}

save.addEventListener("click", function () {
  if (inputs.value.match(url)) {
    //count++;
    bookmarks.push(inputs.value);
    inputs.value = "";
    window.localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    render(bookmarks);
  }
});

saveTab.addEventListener("click", function () {
  //count++;
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    bookmarks.push(tabs[0].url);
    window.localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    render(bookmarks);
  });
});

deleteAll.addEventListener("dblclick", function () {
  localStorage.clear();
  bookmarks = [];
  //count = bookmarks.length;
  render(bookmarks);
});
