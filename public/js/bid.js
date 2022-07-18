let users;
window.onload = async () => {
  const users = await getCurrentUser();
  console.log("2", users);

  document.querySelector("#bid-column").addEventListener("submit", async (e) => {
    // console.log("bid")
    // let htmlStr = "";
    // if (users) {
      e.preventDefault();
      const searchParams = new URLSearchParams(window.location.search);
      const id = parseInt(searchParams.get("id"));
      window.location.href = `/transaction.html?id=${id}`;
    //   const form = e.target;
    //   let date = new Date();
    //   let today = date.toISOString().split("T")[0];
    //   let formObject = {};
    //   formObject["user_id"] = users.id;
    //   formObject["upload_date"] = today;
    //   formObject["bid_price"] = form.bidprice.value;
    //   formObject["condition"] = form.condition.value;
    //   formObject["product_id"] = id;
    //   console.log("bid.js")
    //   console.log(formObject)
    //   const resp = await fetch("/bid", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(formObject),
    //   });
    //   const result = await resp.json();
    //   if (resp){
    //     console.log("HIHIHIqwer")
    //   } else {
    //     console.log("no resp")

    //   }
    //   alert("Bid is placed successfully.");
    //   window.location.href = `/item.html?id=${id}`;
    // } else {
    //   console.log("there is no user")
    // } 
    // document.querySelector("#is-login").innerText = htmlStr;
  });
};

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
  return user;
}

async function logout() {
  document.querySelector("#sign-out").addEventListener("click", async () => {
    const resp = await fetch("/logout");
    const result = await resp.json();

    getCurrentUser();
    alert("Logout Success!");
    window.location.href = `/index.html`;
  });
}

document.querySelector("#cancel").addEventListener("click", () => {
  window.location.href = `/index.html`;
});
