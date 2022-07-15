window.onload = () => {
    getAllProducts(); // OK
    // logout();
    getCurrentUser();
  
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
    console.log("Boolean", user.success == false);
    let htmlStr;
    if (user.success != false) {
      console.log("index.js check if resp and YES");
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
      htmlStr += `
          <div class="product-box" id="${product.id}">
          <div class="product-photo">
              <img src="./photos/${product.image_url}">
          </div>
          <div>${product.name}</div>
          <div class="lowest">Lowest at &nbsp;<h3>HK$${product.suggest_price}</h3></div>
          </div>`;
    }
    document.querySelector(".product-list").innerHTML = htmlStr;
  }
  
  click div go to product page
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
  
      if (
        formObject["arr"].includes("ps5") &&
        formObject["arr"].includes("ps4") &&
        formObject["arr"].includes("xbox") &&
        formObject["arr"].includes("nswitch")
      ) {
        formObject["arr"] = arrayRemove(formObject["arr"], "ps5");
        formObject["arr"] = arrayRemove(formObject["arr"], "ps4");
        formObject["arr"] = arrayRemove(formObject["arr"], "xbox");
        formObject["arr"] = arrayRemove(formObject["arr"], "nswitch");
        document.querySelector("#ps5").checked = false;
        document.querySelector("#ps4").checked = false;
        document.querySelector("#xbox").checked = false;
        document.querySelector("#nswitch").checked = false;
        getAllProducts();
      }
      if (
        document.querySelector("#ps5").checked == false &&
        document.querySelector("#ps4").checked == false &&
        document.querySelector("#xbox").checked == false &&
        document.querySelector("#nswitch").checked == false
      ) {
        document.querySelector("#all1").checked = true;
      }
  
      if (formObject["arr"].includes("gameconsole") && formObject["arr"].includes("videogames")) {
        formObject["arr"] = arrayRemove(formObject["arr"], "gameconsole");
        formObject["arr"] = arrayRemove(formObject["arr"], "videogames");
        document.querySelector("#gameconsole").checked = false;
        document.querySelector("#videogames").checked = false;
        getAllProducts();
      }
  
      if (
        document.querySelector("#gameconsole").checked == false &&
        document.querySelector("#videogames").checked == false
      ) {
        document.querySelector("#all2").checked = true;
      }
  
      if (
        formObject["arr"].includes("low") &&
        formObject["arr"].includes("secondlow") &&
        formObject["arr"].includes("normal") &&
        formObject["arr"].includes("high")
      ) {
        formObject["arr"] = arrayRemove(formObject["arr"], "low");
        formObject["arr"] = arrayRemove(formObject["arr"], "secondlow");
        formObject["arr"] = arrayRemove(formObject["arr"], "normal");
        formObject["arr"] = arrayRemove(formObject["arr"], "high");
        document.querySelector("#low").checked = false;
        document.querySelector("#secondlow").checked = false;
        document.querySelector("#normal").checked = false;
        document.querySelector("#high").checked = false;
        getAllProducts();
      }
  
      if (
        document.querySelector("#low").checked == false &&
        document.querySelector("#secondlow").checked == false &&
        document.querySelector("#normal").checked == false &&
        document.querySelector("#high").checked == false
      ) {
        document.querySelector("#all3").checked = true;
      }
  
      console.log(formObject["arr"]);
      if (formObject == { arr: [] }) {
        console.log("Oh my god");
      }
      const resp = await fetch("/sort", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formObject),
      });
  
      const products = await resp.json();
      let htmlStr = "";
      for (const product of products) {
        htmlStr += `
              <div class="product-box" id="${product.id}">
              <div class="product-photo">
              <img src="./photos/${product.image_url}">
              </div>
              <div>${product.name}</div>
              <div class="lowest">Lowest at &nbsp;<h3>HK$${product.suggest_price}</h3></div>
              </div>`;
        document.querySelector(".product-list").innerHTML = htmlStr;
      }
    });
  }
  