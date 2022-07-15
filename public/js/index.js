window.onload = () => {
  getAllProducts(); // OK
  // logout();
  getCurrentUser();
  // getAllProductsPrice();
  document.querySelector("#sign-up").addEventListener("click", (e) => {
    e.target.closest("div.login-button");
    window.location.href = `/new-login.html`;
  });
};

async function logout() {
  document.querySelector("#sign-out").addEventListener("click", async () => {
    const resp = await fetch("/logout");
    const result = await resp.json();

    getCurrentUser();
    alert("Logout Success!");
    window.location.href = `/index.html`;
  });
}

async function getCurrentUser() {
  const resp = await fetch("/currentUser");
  const user = await resp.json();
  console.log("index.js getCurrentUser():", user);
  // console.log("Boolean", user.success == false);
  let htmlStr;
  if (user.success != false) {
    // console.log("index.js check if resp and YES");
    // login change to Hello user
    htmlStr = `<div>Hello, ${user["username"]}<div>`;

    // create sign out button
    let loginDiv = document.querySelector(".login-div");
    let signUpDiv = document.querySelector("#sign-up");
    let newDiv = document.createElement("div");
    let newContent = document.createTextNode("SIGN-OUT");
    loginDiv.appendChild(newDiv);
    newDiv.setAttribute("id", "sign-out");
    newDiv.appendChild(newContent);
    loginDiv.insertBefore(newDiv, signUpDiv);
    signUpDiv.setAttribute("style", "display: none");
    logout();

    // .innerHTML = /*html*/`
    //   <div id="sign-up" style="display: none;">SIGN UP</div>
    //   <div id="sign-out">SIGN OUT</div>`
  } else {
    console.log("index.js check if req session is not correct.");
    htmlStr = `<a href="/new-login.html">Login</a>`;
  }
  document.querySelector(".login-button").innerHTML = htmlStr;
}

async function getAllProducts() {
  const resp = await fetch("/products");
  const products = await resp.json();
  let htmlStr = "";
  for (const product of products) {
    const resp = await fetch(`/wtslist?id=${product.id}`);
    const price = await resp.json();
    htmlStr += `
        <div class="product-box" id="${product.id}">
        <div class="product-photo">
            <img src="./photos/${product.image_url}">
        </div>
        <div>${product.name}</div>
        <div class="lowest">Lowest at &nbsp;<h3>HK$${price[0]["input_price_sell"]}</h3></div>
        </div>`;
  }
  document.querySelector(".product-list").innerHTML = htmlStr;
}

// async function getAllProductsPrice(){
//   const resp = await fetch('/wtslist');
//   const products = await resp.json();
//   console.log(products)
// }

// click div go to product page
document.querySelector(".product-list").addEventListener("click", (e) => {
  let id = e.target.closest("div.product-box").id;
  window.location.href = `/item.html?id=${id}`;
});

// remove value from array (for sorting use)
function arrayRemove(arr, value) {
  return arr.filter((e) => e != value);
}

// sorting video game data (/sort)
let checkboxes = document.querySelectorAll('input[type="checkbox"]:not(.all)');
let formObject = { arr: [] };

let all1 = document.querySelector("#all1")
let ps5 = document.querySelector("#ps5")
let ps4 = document.querySelector("#ps4")
let xbox = document.querySelector("#xbox")
let nswitch = document.querySelector("#nswitch")
let gameconsole = document.querySelector("#gameconsole")
let videogames = document.querySelector("#videogames")
let low = document.querySelector("#low")
let secondlow = document.querySelector("#secondlow")
let normal = document.querySelector("#normal")
let high = document.querySelector("#high")
let arr = formObject['arr']

// if (all1.checked == true) {
//   ps5.checked = false
//   ps4.checked = false
//   xbox.checked = false
//   nswitch.checked = false
// }

for (let i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener("change", async (e) => {
    e.preventDefault();
    if (e.target.checked) {
      // console.log(e.target.name, "checked")
      formObject["arr"].push(e.target.name);
      e.target.closest("div").querySelector(".all").checked = false;
    } else {
      // console.log(e.target.name, "unchecked")
      formObject["arr"] = arrayRemove(formObject["arr"], e.target.name);
      // delete formObject[e.target.name];
    }
    
    // if 4 console types are selected, clear 4 checkboxes and checked "all"
    if (arr.includes("ps5") && arr.includes("ps4") && arr.includes("xbox") && arr.includes("nswitch")) {
      arr = arrayRemove(arr, "ps5");
      arr = arrayRemove(arr, "ps4");
      arr = arrayRemove(arr, "xbox");
      arr = arrayRemove(arr, "nswitch");
      ps5.checked = false;
      ps4.checked = false;
      xbox.checked = false;
      nswitch.checked = false;
      getAllProducts();
    }
    if (ps5.checked == false && ps4.checked == false && xbox.checked == false && nswitch.checked == false) {
      all1.checked = true;
    }

    // if 2 product types are selected, clear 2 checkboxes and checked "all"

    if (arr.includes("gameconsole") && arr.includes("videogames")) {
      arr = arrayRemove(arr, "gameconsole");
      arr = arrayRemove(arr, "videogames");
      gameconsole.checked = false;
      videogames.checked = false;
      getAllProducts();
    }

    if (gameconsole.checked == false && videogames.checked == false) {
      document.querySelector("#all2").checked = true;
    }


    // if 4 prices are selected, clear 4 checkboxes and checked "all"
    if (arr.includes("low") && arr.includes("secondlow") && arr.includes("normal") && arr.includes("high")) {
      arr = arrayRemove(arr, "low");
      arr = arrayRemove(arr, "secondlow");
      arr = arrayRemove(arr, "normal");
      arr = arrayRemove(arr, "high");
      low.checked = false;
      secondlow.checked = false;
      normal.checked = false;
      high.checked = false;
      getAllProducts();
    }

    if ( low.checked == false && secondlow.checked == false && normal.checked == false && high.checked == false ) {
      document.querySelector("#all3").checked = true;
    }

    console.log(arr);
    console.log(formObject["arr"]);
    if (formObject == { arr: [] }) {
      console.log("index.js -- formObject == { arr: [] }");
    }
    const resp = await fetch("/sort", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formObject),
    });

    const products = await resp.json();
    let htmlStr = "";
    for (const product of products) {
      const resp = await fetch(`/wtslist?id=${product.id}`);
      const price = await resp.json();
      htmlStr += `
        <div class="product-box" id="${product.id}">
        <div class="product-photo">
            <img src="./photos/${product.image_url}">
        </div>
        <div>${product.name}</div>
        <div class="lowest">Lowest at &nbsp;<h3>HK$${price[0]["input_price_sell"]}</h3></div>
        </div>`;
      document.querySelector(".product-list").innerHTML = htmlStr;
    }
  });
}
