//display news on page load
document.getElementsByClassName(
  "card-deck"
)[0].innerHTML = `<h2 class="welcome-msg">POP Search : Movies & T.V.</h2>`;
window.addEventListener("load", load_func);
let search_text = ``;

async function load_func() {
  if (!search_text) {
    document.getElementsByClassName(
      "card-deck"
    )[0].innerHTML = `<h2 class="welcome-msg">POP Search : Movies & T.V.</h2>`;
    document.getElementById("display").innerHTML = ``;
  } else {
    document.getElementsByClassName(
      "card-deck"
    )[0].innerHTML = `<div id="loader"></div>`;

    let response = await fetch(
      `http://www.omdbapi.com/?apikey=ed7bb566&s=${search_text}`
    );

    let data = await response.json();
    let output = ``;

    if (data.Response == "False") {
      output = `Nothing found..Please try a precise search.`;
      document.getElementById("display").innerHTML = output;
      document.getElementsByClassName("card-deck")[0].innerHTML = ``;
    } else {
      data.Search.forEach((item, i) => {
        output += `<li class="card shadow article" id="news_card">`;
        output += `<a href="https://www.imdb.com/title/${data.Search[i].imdbID}/" class="link" target="_blank">`;
        output += `<div class="image_back">`;
        output += `<img src=${data.Search[i].Poster} class="article-img card-img-top" alt="news_image"/>`;
        output += `</div>`;
        output += `</a>`;
        // output += `<div class="card-body" id="card_main">`;
        output += `<a href="https://www.imdb.com/title/${data.Search[i].imdbID}/" class="article-link" target="_blank">`;

        output += `<h2 class="card-title article-title">${data.Search[i].Title}</h2>`;
        output += `</a>`;

        // output += `<p class="card-text article-description">${data.articles[i].description}</p>`;
        // output += `<p class="card-text" id="text_author"><span class="article-author"> - ${data.articles[i].author}</span></p>`;
        // output += `</div>`;

        output += `</li>`;
      });

      document.getElementsByClassName("card-deck")[0].innerHTML = output;
    }
  }
}

document.getElementById("search").addEventListener("keyup", search_func); //display on enter key press

function search_func(keyletter) {
  let val = keyletter.target.value;

  if (keyletter.which == 13) {
    document.title = `${val}`; // change the doc title according to search
    if (val === "") {
      load_func();
    } else {
      search_text = `${val}`;
      load_func();
      search_text = ``;
      document.getElementById(
        "display"
      ).innerHTML = `-- Search results for : ${val} --`;
    }
  }
}

document.getElementById("check").addEventListener("click", theme_func); //dark mode
function theme_func(val) {
  if (val.target.checked) {
    let link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = "./styles/dark.css";
    document.head.appendChild(link);
  } else {
    let sheet = document.querySelector(`link[href="./styles/dark.css"]`);
    if (sheet) {
      // if sheet exists
      sheet.disabled = true;
      sheet.parentNode.removeChild(sheet);
    }
  }
}
document
  .getElementsByClassName("head_logo")[0]
  .addEventListener("click", logo_func); //display on logo click
function logo_func() {
  search_text = "";
  load_func();
  document.title = "POP Search";
}
