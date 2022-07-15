window.onload = async() => {
  const users = await getCurrentUser();
  console.log("sellpage", users)
  
  document.querySelector("#sell-column").addEventListener("submit", async (e) => {
    let htmlStr = "";
    if (users){
      e.preventDefault();
      const searchParams = new URLSearchParams(window.location.search);
      const id = searchParams.get("id");
      const form = e.target;
      let date = new Date();
      let today = date.toISOString().split("T")[0];
      let formObject = {};
      formObject["user_id"] = users;
      formObject["upload_date"] = today;
      formObject["sell_price"] = form.sellprice.value;
      formObject["condition"] = form.condition.value;
      formObject["product_id"] = id;
      console.log(formObject)
      const resp = await fetch("/sell", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formObject),
      });
      const result = await resp.json();
      alert("Target selling price is set successfully.")
      window.location.href = `/item.html?id=${id}`;
    } 
    document.querySelector("#is-login").innerText = htmlStr;
    }
  );
}

// async function getCurrentUser() {
//   const resp = await fetch("/currentUser");
//   const users = await resp.json();
//   if(users){
//     console.log("4", users)
//   } else {
//     console.log("not logged in yet.")
//   }
//   return users['id'];
// }

// document.querySelector('#cancel').addEventListener('click',()=>{
//   window.history.back();
// })
//   window.location.href = `/item.html?id=${id}`;
// });

document.querySelector("#sign-up").addEventListener("click", () => {
  window.location.href = `/sign.html`;
});

async function getCurrentUser() {
  const resp = await fetch("/currentUser");
  const users = await resp.json();
  const userName = users.username;
  let htmlStr = "";
  if (users) {
    htmlStr += `
    <div class="header">
    <h1 class="title">
        <a href="/index.html">Clickfast</a>
    </h1>
    <form>
        <i class="fa-solid fa-magnifying-glass"></i><input type="search" class="search-bar" placeholder="Search for brand, model, etc.">
    </form>
    <a href="/helpCenter.html">Help</a>
    <a >Hello, ${userName}</a>
    <div id="sign-up">SIGN UP</div>
</div>`;
  }
  document.querySelector(".header-bar").innerHTML = htmlStr;
}
