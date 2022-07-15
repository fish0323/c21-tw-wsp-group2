window.onload = () => {
  const signUpButton = document.getElementById("signUp");
  const signInButton = document.getElementById("signIn");
  const container = document.getElementById("container");

  signUpButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
  });

  signInButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
  });
  login();
};

function login() {
  const form = document.querySelector(".sign-in-container");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("login-test.js - submit button clicked");

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    // ROUTE method:post fetch("/login")
    // async function login() {
    const res = await fetch("/login", {
      method: "POST", // Specify your HTTP method
      headers: {
        // Specify any HTTP Headers Here
        "Content-Type": "application/json; charset=utf-8",
      },
      // body: { name: "email", password: "password" }, // Specify the Request Body
      body: JSON.stringify({ email, password }),
    });
    const content = await res.text();

    console.log("login-test.js", content);
    // }
    // login();
    if (res.status == 200) {
      // error handling
      // window.location.href = "/";
      alert("Login Success! Welcome to Clickfast.");
      // window.location.href = "/index.html";
      window.location.href = document.referrer;
    } else {
      alert("Incorrect email or password, please try again");
      window.location.href = "/new-login.html";
    }
  });
}

const form2 = document.querySelector(".sign-up-container");
form2.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("submit");

  const form = e.target;
  const email = form.email.value;
  const name = form.name.value;
  const password = form.password.value;

  // ROUTE method:post fetch("/login")
  const res = await fetch("/signup", {
    method: "POST", // Specify your HTTP method
    headers: {
      // Specify any HTTP Headers Here
      "Content-Type": "application/json; charset=utf-8",
    },

    body: JSON.stringify({ email, name, password }),
  });
  const content = await res.text();

  console.log(content);
  console.log(name);

  if (res.status == 200) {
    alert("Create Success! Welcome to Clickfast!");
    const res = await fetch("/login", {
      method: "POST", // Specify your HTTP method
      headers: {
        // Specify any HTTP Headers Here
        "Content-Type": "application/json; charset=utf-8",
      },
      // body: { name: "email", password: "password" }, // Specify the Request Body
      body: JSON.stringify({ email, password }),
    });
    window.location.href = document.referrer;
    getCurrentUser();
  } else {
    alert("Email or username already exist, please try again");
  }
});
