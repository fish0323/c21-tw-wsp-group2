window.onload = () => {
  getProduct(); // 13-22
  getBrandNewWtbList(); // 25-64
  getBrandNewWtsList(); // 67-114
  selectConditionWTB(); // 117-162
  selectConditionWTS(); // 165-216
  getCurrentUser(); // 219-250
  selectLocationWTS();
  getRecentTransaction();
};
const searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get("id");

// Get product information from SQL, fetch (/item with id)
async function getProduct() {
  const resp = await fetch(`/item?id=${id}`);
  const product = await resp.json();
  console.log(product["product_detail"]);
  document.querySelector(".product-name").innerHTML = product["name"];
  let htmlStr = "";
  htmlStr += `<img src="./photos/${product["image_url"]}">`;
  document.querySelector(".product-photo").innerHTML = htmlStr;
  document.querySelector(".details").innerText = `${product["product_detail"]}`;
}

// Get product WTB default "Brand New", fetch (/wtblist with id)
async function getBrandNewWtbList() {
  const resp = await fetch(`/wtblist?id=${id}`);
  const product = await resp.json();
  if (product.length < 5) {
    let i = product.length;
    do {
      product.push({ depreciation_rate: "-", input_price_buy: "-" });
      i++;
    } while (i < 5);
  }
  let htmlStr = "";
  htmlStr += `
    <tr>
      <th>Condition</th>
      <th>Price</th>
    </tr>
    <tr>
      <td>${product[0]["depreciation_rate"]}</td>
      <td>${product[0]["input_price_buy"]}</td>
    </tr>
    <tr>
      <td>${product[1]["depreciation_rate"]}</td>
      <td>${product[1]["input_price_buy"]}</td>
    </tr>
    <tr>
      <td>${product[2]["depreciation_rate"]}</td>
      <td>${product[2]["input_price_buy"]}</td>
    </tr>
    <tr>
      <td>${product[3]["depreciation_rate"]}</td>
      <td>${product[3]["input_price_buy"]}</td>
    </tr>
    <tr>
      <td>${product[4]["depreciation_rate"]}</td>
      <td>${product[4]["input_price_buy"]}</td>
    </tr>
    `;
  document.querySelector(".bids-bar").innerHTML = htmlStr;
  document.querySelector(
    ".sell-now"
  ).innerText = `Sell for HK$ ${product[0]["input_price_buy"]} or Above`;
}

// Get product WTS default "Brand New", fetch (/wtslist with id)
async function getBrandNewWtsList() {
  const resp = await fetch(`/wtslist?id=${id}`);
  const product = await resp.json();
  if (product.length < 5) {
    let i = product.length;
    do {
      product.push({ depreciation_rate: "-", input_price_sell: "-", location: "-" });
      i++;
    } while (i < 5);
  }
  console.log("getProductWTS");
  console.log(product);
  let htmlStr = "";
  htmlStr += `
    <tr>
      <th>Condition</th>
      <th>Price</th>
      <th>Location</th>
    </tr>
    <tr>
      <td>${product[0]["depreciation_rate"]}</td>
      <td>${product[0]["input_price_sell"]}</td>
      <td>${product[0]["location"]}</td>
    </tr>
    <tr>
      <td>${product[1]["depreciation_rate"]}</td>
      <td>${product[1]["input_price_sell"]}</td>
      <td>${product[1]["location"]}</td>
    </tr>
    <tr>
      <td>${product[2]["depreciation_rate"]}</td>
      <td>${product[2]["input_price_sell"]}</td>
      <td>${product[2]["location"]}</td>
    </tr>
    <tr>
      <td>${product[3]["depreciation_rate"]}</td>
      <td>${product[3]["input_price_sell"]}</td>
      <td>${product[3]["location"]}</td>
    </tr>
    <tr>
      <td>${product[4]["depreciation_rate"]}</td>
      <td>${product[4]["input_price_sell"]}</td>
      <td>${product[4]["location"]}</td>
    </tr>
    `;
  document.querySelector(".asks-bar").innerHTML = htmlStr;
  document.querySelector("#buy-button").innerText = `Buy for HK$ ${product[0]["input_price_sell"]}`;
}

// Get product WTB by selected condition, fetch (/wtblist with id & condition)
function selectConditionWTB() {
  let condDropDown = document.querySelector("#condition");
  let condition = "Brand New";
  condDropDown.addEventListener("change", async () => {
    condition = condDropDown.value;
    const resp = await fetch(`/wtblist?id=${id}&condition=${condition}`);
    const product = await resp.json();

    if (product.length < 5) {
      let i = product.length;
      do {
        product.push({ depreciation_rate: "-", input_price_buy: "-" });
        i++;
      } while (i < 5);
    }
    let htmlStr = "";
    htmlStr += `
    <tr>
      <th>Condition</th>
      <th>Price</th>
    </tr>
    <tr>
      <td>${product[0]["depreciation_rate"]}</td>
      <td>${product[0]["input_price_buy"]}</td>
    </tr>
    <tr>
      <td>${product[1]["depreciation_rate"]}</td>
      <td>${product[1]["input_price_buy"]}</td>
    </tr>
    <tr>
      <td>${product[2]["depreciation_rate"]}</td>
      <td>${product[2]["input_price_buy"]}</td>
    </tr>
    <tr>
      <td>${product[3]["depreciation_rate"]}</td>
      <td>${product[3]["input_price_buy"]}</td>
    </tr>
    <tr>
      <td>${product[4]["depreciation_rate"]}</td>
      <td>${product[4]["input_price_buy"]}</td>
    </tr>
    `;
    document.querySelector(".bids-bar").innerHTML = htmlStr;
    document.querySelector(
      ".sell-now"
    ).innerText = `Sell for HK$ ${product[0]["input_price_buy"]} or Above`;
  });
}

function selectLocationWTS() {
  let locationDropDown = document.querySelector("#location");
  let location = "";
  locationDropDown.addEventListener("change", async () => {
    location = locationDropDown.value;
    console.log(location)
    condition = document.querySelector('#condition').value
    const resp = await fetch(`/wtslist?id=${id}&location=${location}&condition=${condition}`);
    const product = await resp.json();

    if (product.length < 5) {
      let i = product.length;
      do {
        product.push({ depreciation_rate: "-", input_price_sell: "-", location: "-" });
        i++;
      } while (i < 5);
    }
    let htmlStr = "";
    htmlStr += `
    <tr>
      <th>Condition</th>
      <th>Price</th>
      <th>Location</th>
    </tr>
    <tr>
      <td>${product[0]["depreciation_rate"]}</td>
      <td>${product[0]["input_price_sell"]}</td>
      <td>${product[0]["location"]}</td>
    </tr>
    <tr>
      <td>${product[1]["depreciation_rate"]}</td>
      <td>${product[1]["input_price_sell"]}</td>
      <td>${product[1]["location"]}</td>
    </tr>
    <tr>
      <td>${product[2]["depreciation_rate"]}</td>
      <td>${product[2]["input_price_sell"]}</td>
      <td>${product[2]["location"]}</td>
    </tr>
    <tr>
      <td>${product[3]["depreciation_rate"]}</td>
      <td>${product[3]["input_price_sell"]}</td>
      <td>${product[3]["location"]}</td>
    </tr>
    <tr>
      <td>${product[4]["depreciation_rate"]}</td>
      <td>${product[4]["input_price_sell"]}</td>
      <td>${product[4]["location"]}</td>
    </tr>
    `;
    document.querySelector(".asks-bar").innerHTML = htmlStr;
    document.querySelector(
      "#buy-button"
    ).innerText = `Buy for HK$ ${product[0]["input_price_sell"]}`;
  });
}

// Get product WTS by selected condition, fetch (/wtslist with id & condition)
function selectConditionWTS() {
  let condDropDown = document.querySelector("#condition");
  let condition = "Brand New";
  // console.log(location)
  condDropDown.addEventListener("change", async () => {
    condition = condDropDown.value;
    // location = document.querySelector("#location").value;
    const resp = await fetch(`/wtslist?id=${id}&condition=${condition}`);
    // const resp = await fetch(`/wtslist?id=${id}&location=${location}&condition=${condition}`);
    const product = await resp.json();

    if (product.length < 5) {
      let i = product.length;
      do {
        product.push({ depreciation_rate: "-", input_price_sell: "-", location: "-" });
        i++;
      } while (i < 5);
    }
    let htmlStr = "";
    htmlStr += `
    <tr>
      <th>Condition</th>
      <th>Price</th>
      <th>Location</th>
    </tr>
    <tr>
      <td>${product[0]["depreciation_rate"]}</td>
      <td>${product[0]["input_price_sell"]}</td>
      <td>${product[0]["location"]}</td>
    </tr>
    <tr>
      <td>${product[1]["depreciation_rate"]}</td>
      <td>${product[1]["input_price_sell"]}</td>
      <td>${product[1]["location"]}</td>
    </tr>
    <tr>
      <td>${product[2]["depreciation_rate"]}</td>
      <td>${product[2]["input_price_sell"]}</td>
      <td>${product[2]["location"]}</td>
    </tr>
    <tr>
      <td>${product[3]["depreciation_rate"]}</td>
      <td>${product[3]["input_price_sell"]}</td>
      <td>${product[3]["location"]}</td>
    </tr>
    <tr>
      <td>${product[4]["depreciation_rate"]}</td>
      <td>${product[4]["input_price_sell"]}</td>
      <td>${product[4]["location"]}</td>
    </tr>
    `;
    document.querySelector(".asks-bar").innerHTML = htmlStr;
    document.querySelector(
      "#buy-button"
    ).innerText = `Buy for HK$ ${product[0]["input_price_sell"]}`;
  });
}

// get current user for item page
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

// get into bid page
document.querySelector("#bid-button").addEventListener("click", () => {
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get("id");
  window.location.href = `/bid.html?id=${id}`;
});

// get into sell page
document.querySelector(".sell-now").addEventListener("click", () => {
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get("id");
  window.location.href = `/transaction.html?id=${id}`;
});

async function logout() {
  document.querySelector("#sign-out").addEventListener("click", async () => {
    const resp = await fetch("/logout");
    const result = await resp.json();

    getCurrentUser();
    alert("Logout Success!");
    window.location.href = `/index.html`;
  });
}

document.querySelector("#sign-up").addEventListener("click", (e) => {
  e.target.closest("div.login-button");
  window.location.href = `/new-login.html`;
});

async function getRecentTransaction() {
  // const searchParams = new URLSearchParams(window.location.search);
  // const id = searchParams.get("id");
  const resp = await fetch(`/transaCtionList`);
  const product = await resp.json();

  if (product.length < 5) {
    let i = product.length;
    do {
      product.push({ depreciation_rate: "-", input_price_buy: "-" });
      i++;
    } while (i < 5);
  }

  let htmlStr = "";
  htmlStr += `
  <tr>
  <th>Date</th>
  <th>Condition</th>
  <th>Price</th>
  <th>Shipped / Delivery In Person</th>
</tr>
    <tr>
      <td>${product[0]["date"]}</td>
      <td>${product[0]["condition"]}</td>
      <td>${product[0]["price"]}</td>
      <td>${product[0]["delivery"]}</td>
    </tr>
    <tr>
      <td>${product[1]["date"]}</td>
      <td>${product[1]["condition"]}</td>
      <td>${product[1]["price"]}</td>
      <td>${product[1]["delivery"]}</td>
    </tr>
    <tr>
      <td>${product[2]["date"]}</td>
      <td>${product[2]["condition"]}</td>
      <td>${product[2]["price"]}</td>
      <td>${product[2]["delivery"]}</td>
    </tr>
    <tr>
      <td>${product[3]["date"]}</td>
      <td>${product[3]["condition"]}</td>
      <td>${product[3]["price"]}</td>
      <td>${product[3]["delivery"]}</td>
    </tr>
    <tr>
      <td>${product[4]["date"]}</td>
      <td>${product[4]["condition"]}</td>
      <td>${product[4]["price"]}</td>
      <td>${product[4]["delivery"]}</td>
    </tr>
    `;
  document.querySelector(".recent-bar").innerHTML = htmlStr;
}

// get into transaction page
document.querySelector("#buy-button").addEventListener("click", () => {
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get("id");
  window.location.href = `/transaction.html`;
});
