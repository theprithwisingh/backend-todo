// const mainPage = document.getElementById("main-page");
// const toggleButton = document.getElementById("click");
// const loginForm = document.getElementById("login-form");

// let isLogin = true;
// let isLoggedIn = false;

// const getFormTemplate = () => {
//   return isLogin
//     ? `
//       <h2 class="login-heading">Login</h2>
//       <input type="text" id="username" placeholder="Enter username..." />
//       <input type="password" id="password" placeholder="Enter password..." />
//       <button id="login-btn">Login</button>
//       <p>Don't have an account? 
//         <span class="toggle-mode" data-mode="signup" style="cursor: pointer; color: blue;">Sign up</span>
//       </p>
//     `
//     : `
//       <h2 class="login-heading">Sign Up</h2>
//       <input type="text" id="email" placeholder="Enter your email..." />
//       <input type="text" id="username" placeholder="Enter username..." />
//       <input type="password" id="password" placeholder="Enter password..." />
//       <button id="signup-btn">Sign Up</button>
//       <p>Already have an account? 
//         <span class="toggle-mode" data-mode="login" style="cursor: pointer; color: blue;">Login</span>
//       </p>
//     `;
// };

// // Show login/signup form
// const renderForm = () => {
//   loginForm.innerHTML = getFormTemplate();
//   loginForm.style.backgroundColor = "#cee26b";
//   toggleButton.textContent = isLogin ? "Sign Up" : "Login";
  
// };

// // Show task board after login
// const showTaskBoard = () => {
//   document.querySelector(".main-heading").style.display = "none";
//   loginForm.style.display = "none";
//   document.querySelector(".task-board").style.display = "block";
// };

// // Handle login/signup click
// toggleButton.addEventListener("click", () => {
//   renderForm();
// });

// // Handle login/signup actions
// loginForm.addEventListener("click", (e) => {
//   const target = e.target;

//   if (target.classList.contains("toggle-mode")) {
//     isLogin = target.dataset.mode === "login";
//     renderForm();
//   }

//   if (target.id === "login-btn" || target.id === "signup-btn") {
//     // You can add validation/auth logic here
//     isLoggedIn = true;
//     showTaskBoard();
//   }
// });

// // Show task board by default as hidden
// document.querySelector(".task-board").style.display = "none";

// // Task handling
// const addButton = document.querySelector(".inputs button");
// const taskCol = document.querySelector(".task-col");

// addButton.addEventListener("click", () => {
//   const title = document.getElementById("title").value;
//   const category = document.getElementById("category").value;
//   const priority = document.getElementById("selectionPriority").value;

//   if (!title || !category) return alert("Please fill all fields");

//   const newTask = document.createElement("div");
//   newTask.className = "task";
//   newTask.setAttribute("draggable", "true");
//   newTask.innerText = `${title} (${category}) - ${priority}`;

//   newTask.addEventListener("dragstart", dragStart);

//   taskCol.children[0].appendChild(newTask);
// });

// // Drag and drop logic
// let draggedTask = null;

// function dragStart(e) {
//   draggedTask = this;
// }

// document.querySelectorAll(".task-col > div").forEach((col) => {
//   col.addEventListener("dragover", (e) => {
//     e.preventDefault();
//   });

//   col.addEventListener("drop", function (e) {
//     if (draggedTask) {
//       this.appendChild(draggedTask);
//       draggedTask = null;
//     }
//   });
// });

const toggleButton = document.getElementById("click");
const welcomeSection = document.getElementById("welcome-section");
const loginForm = document.getElementById("login-form");
const taskBoard = document.getElementById("task-board");

let isLogin = true;

const getFormTemplate = () => {
  return isLogin
    ? `
      <h2>Login</h2>
      <input type="text" id="username" placeholder="Enter username" /><br /><br />
      <input type="password" id="password" placeholder="Enter password" /><br /><br />
      <button id="submitLogin">Login</button>
      <p>Don't have an account?
        <span class="toggle-mode" data-mode="signup" style="color: blue; cursor: pointer;">Sign up</span>
      </p>
    `
    : `
      <h2>Sign Up</h2>
      <input type="text" id="email" placeholder="Enter email" /><br /><br />
      <input type="text" id="username" placeholder="Enter username" /><br /><br />
      <input type="password" id="password" placeholder="Enter password" /><br /><br />
      <button id="submitSignup">Sign Up</button>
      <p>Already have an account?
        <span class="toggle-mode" data-mode="login" style="color: blue; cursor: pointer;">Login</span>
      </p>
    `;
};

const renderForm = () => {
  welcomeSection.style.display = "none";
  loginForm.style.display = "block";
  loginForm.innerHTML = getFormTemplate();
};

toggleButton.addEventListener("click", renderForm);

// Handle form actions
loginForm.addEventListener("click", (e) => {
  if (e.target.classList.contains("toggle-mode")) {
    const mode = e.target.dataset.mode;
    isLogin = mode === "login";
    renderForm();
  }

  if (e.target.id === "submitLogin" || e.target.id === "submitSignup") {
    loginForm.style.display = "none";
    taskBoard.style.display = "block";
  }
});

// Task adding
document.getElementById("add-task-btn").addEventListener("click", () => {
  const title = document.getElementById("title").value;
  const priority = document.getElementById("selectionPriority").value;

  if (!title) return;

  const task = document.createElement("div");
  task.className = "task";
  task.draggable = true;
  task.textContent = `${title} (${priority})`;
  task.ondragstart = drag;

  document.getElementById("task-todo").appendChild(task);
  document.getElementById("title").value = "";
});

// Drag and Drop Logic
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
  ev.dataTransfer.setData("element", ev.target.outerHTML);
  ev.target.remove(); // remove from old location
}

function drop(ev) {
  ev.preventDefault();
  const elementHTML = ev.dataTransfer.getData("element");
  ev.target.insertAdjacentHTML("beforeend", elementHTML);
  const tasks = ev.target.querySelectorAll(".task");
  tasks.forEach((t) => (t.ondragstart = drag));
}
