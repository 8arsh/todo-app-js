// Load tasks when page opens
window.onload = function() {
    loadTasks();
};

function addTask() {
    let input = document.getElementById("taskInput");
    let task = input.value;

    if (task === "") {
        alert("Enter a task!");
        return;
    }

    saveTask(task);
    input.value = "";
    loadTasks();
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: task, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task, index) => {
        let li = document.createElement("li");

        li.textContent = task.text;
        if (task.completed) {
            li.classList.add("completed");
        }

        // Mark complete
        li.onclick = function() {
            toggleComplete(index);
        };

        // Delete button
        let delBtn = document.createElement("button");
        delBtn.textContent = "X";
        delBtn.onclick = function(e) {
            e.stopPropagation();
            deleteTask(index);
        };

        li.appendChild(delBtn);
        taskList.appendChild(li);
    });
}

function toggleComplete(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}
function toggleDarkMode() {
    document.body.classList.toggle("dark");
}
document.getElementById("taskInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});