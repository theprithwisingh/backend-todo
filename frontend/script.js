const mainPage = document.getElementById("main-page");
const toggleButton = document.getElementById("click");

let isLogin = true;

// HTML template function
const getFormTemplate = () => {
  return isLogin
    ? `
      <h2 class="login-heading">Login</h2>
      <input type="text" id="username" placeholder="Enter username..." />
      <input type="password" id="password" placeholder="Enter password..." />
      <button>Login</button>
      <p>Don't have an account? 
        <span class="toggle-mode" data-mode="signup" style="cursor: pointer; color: blue;">Sign up</span>
      </p>
      `
    
    : `
      <h2 class="login-heading">Sign Up</h2>
      <input type="text" id="email" placeholder="Enter your email..." />
      <input type="text" id="username" placeholder="Enter username..." />
      <input type="password" id="password" placeholder="Enter password..." />
      <button>Sign Up</button>
      <p>Already have an account? 
        <span class="toggle-mode" data-mode="login" style="cursor: pointer; color: blue;">Login</span>
      </p>
      `
    ;
};

// Render function
const renderForm = () => {
  mainPage.innerHTML = ""; // Clear existing content
  const formContainer = document.createElement("div");
  formContainer.className = "login-form";
  formContainer.style.backgroundColor = "#cee26b";
  formContainer.innerHTML = getFormTemplate();

 
  mainPage.appendChild(formContainer);

  toggleButton.textContent = isLogin ? "Sign Up" : "Login";
};

// Event listeners
toggleButton.addEventListener("click", renderForm);

//Delegated event handler inside mainPage
mainPage.addEventListener("click", (e) => {
  const target = e.target;
  console.log(target.classList.contains("toggle-mode"))
  if (target.classList.contains("toggle-mode")) {
    const mode = target.dataset.mode;
    console.log(mode)
    isLogin = mode === "login";
    console.log("isLogin",isLogin)
    renderForm();
  }
});

//CRUDE
const taskTitle = document.getElementById("title")
const category = document.getElementById("category")
const description = document.getElementById("description")
const selectionPriority = document.getElementById("selectionPriority")
const submitBtn = document.getElementById("submitBtn")
const taskList = document.getElementById("taskList")
const modalBox = document.getElementById("modalBox")

let taskArr =JSON.parse(localStorage.getItem("tasks"))||[];
console.log(taskArr)
let editIndex = -1;

const styleForRender = {


  taskItem: {
    border: "1px solid #ddd",
    padding: "15px",
    marginBottom: "10px",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    backgroundColor: "#f9f9f9",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
    fontFamily: "Arial, sans-serif",
  },
  taskBtn: {
    padding: "6px 10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    backgroundColor: "#4CAF50",
    color: "#fff",
  },
  taskTitle: {
    cursor: "pointer",
    flex: "1",
    margin: "0",
  },
};

// function renderTask(){
//   taskList.innerHTML="";
//   taskArr.forEach((item,index)=>{
//   const taskItem = document.createElement("div");
//   taskItem.classList.add("taskItem")

  
//   taskItem.innerHTML= `
//   <p onclick="modalFun(${index})"><strong>Title:</strong> ${item.title}</p>
//   <button onclick="deleteBtn(${index})">Delete</button>
//   <button onclick="editBtn(${index})">Edit</button>
//  `
//   taskList.appendChild(taskItem)
//   })
// }

function renderTask() {
  taskList.innerHTML = "";

  taskArr.forEach((item, index) => {
    const taskItem = document.createElement("div");
    taskItem.classList.add("taskItem");
    Object.assign(taskItem.style, styleForRender.taskItem); // ← Style task container

    const taskTitle = document.createElement("p");
    taskTitle.innerHTML = `<strong>Title:</strong> ${item.title}`;
    taskTitle.onclick = () => modalFun(index);
    Object.assign(taskTitle.style, styleForRender.taskTitle); // ← Style title

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteBtn(index);
    Object.assign(deleteButton.style, styleForRender.taskBtn); // ← Style button

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.onclick = () => editBtn(index);
    Object.assign(editButton.style, styleForRender.taskBtn); // ← Style button

    taskItem.appendChild(taskTitle);
    taskItem.appendChild(deleteButton);
    taskItem.appendChild(editButton);

    taskList.appendChild(taskItem);
  });
}

function addTaskBtn() {
  const title = taskTitle.value.trim();
  const taskCategory = category.value.trim();
  const taskdescription = description.value.trim()
  const priority = selectionPriority.value;

  if (!title || !taskCategory || !priority) {
    alert("Please fill out all fields.");
    return;
  }

  const newTask = {
    title: title,
    taskdescription:taskdescription,
    category: taskCategory,
    priority: priority
  };

  if (editIndex === -1) {
    taskArr.push(newTask);
  } else {
    taskArr[editIndex] = newTask;
    editIndex = -1;
  }

  //taskArr = [...taskArr,newTask]// Add new task
  localStorage.setItem("tasks" ,JSON.stringify(taskArr));
  renderTask(); // Re-render list
 
  // Clear inputs
  taskTitle.value = "";
  description.value=""
  category.value = "";
  selectionPriority.value = "";
}

function deleteBtn(idx) {
  taskArr = taskArr.filter((_, i) => i !== idx);
  localStorage.setItem("tasks", JSON.stringify(taskArr));
  renderTask();
}

function editBtn(idx){
 const task = taskArr[idx];
  taskTitle.value=task.title;
  description.value=task.taskdescription
  category.value=task.category;
  selectionPriority.value=task.priority;
  editIndex = idx;
}

//css object
const styles = {
  modalBox: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
    width: "300px",
    margin: "100px auto",
    fontFamily: "Arial, sans-serif",
    zIndex: 1000,
    position: "relative",
  },
  closeBtn: {
    backgroundColor: "#f44336",
    color: "#fff",
    padding: "8px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "15px",
  },
  btnsDiv: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-between",
  },
  actionBtn: {
    padding: "8px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    backgroundColor: "#2196F3",
    color: "#fff",
  },
};

function modalFun(idx) {
  const task = taskArr[idx];
  const taskTitle = task.title;
  const description = task.taskdescription;
  const category = task.category;
  const selectionPriority = task.priority;

  modalBox.innerHTML = ""; // Clear previous modal

  const openModal = document.createElement("div");
  openModal.classList.add("modalBox");
  Object.assign(openModal.style, styles.modalBox); // ← Apply modal styles

  const title = document.createElement("h3");
  title.innerHTML = `<strong>Title:</strong> ${taskTitle}`;

  const desc = document.createElement("p");
  title.innerHTML = `<strong>desc:</strong> ${description}`;

  const taskCategory = document.createElement("p");
  taskCategory.innerHTML = `<strong>Category:</strong> ${category}`;

  const taskPriority = document.createElement("p");
  taskPriority.innerHTML = `<strong>Priority:</strong> ${selectionPriority}`;

  const closeBtn = document.createElement("button");
  closeBtn.textContent = "Close";
  closeBtn.classList.add("close-btn");
  Object.assign(closeBtn.style, styles.closeBtn); // ← Style close button
  closeBtn.addEventListener("click", () => {
    modalBox.innerHTML = "";
  });

  const btnsDiv = document.createElement("div");
  btnsDiv.innerHTML = `
    <button onclick="deleteBtn(${idx})">Delete</button>
    <button onclick="editBtn(${idx})">Edit</button>
  `;
  Object.assign(btnsDiv.style, styles.btnsDiv); // ← Style button container

  // Wait for buttons to be created, then style them
  setTimeout(() => {
    const actionButtons = btnsDiv.querySelectorAll("button");
    actionButtons.forEach(btn => {
      Object.assign(btn.style, styles.actionBtn); // ← Style each action button
    });
  }, 0);

  openModal.appendChild(title);
  openModal.appendChild(desc);
  openModal.appendChild(taskCategory);
  openModal.appendChild(taskPriority);
  openModal.appendChild(closeBtn);
  openModal.appendChild(btnsDiv);
  modalBox.appendChild(openModal);
}

renderTask();
submitBtn.addEventListener("click",addTaskBtn)