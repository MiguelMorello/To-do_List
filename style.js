// Carregar tarefas do localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task));
}

// Adicionar tarefa ao DOM
function addTaskToDOM(task) {
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.className = "flex justify-between items-center mb-2";
    li.innerHTML = `
        <span>${task.text}</span>
        <div>
            <button class="bg-yellow-500 text-white p-1 mx-1" onclick="editTask('${task.id}')">Editar</button>
            <button class="bg-red-500 text-white p-1" onclick="deleteTask('${task.id}')">Excluir</button>
        </div>
    `;
    taskList.appendChild(li);
}

// Adicionar nova tarefa
document.getElementById('addTaskBtn').addEventListener('click', () => {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value;
    if (taskText) {
        const task = {
            id: Date.now(),
            text: taskText
        };
        addTaskToDOM(task);
        saveTaskToLocalStorage(task);
        taskInput.value = '';
    }
});

// Salvar tarefa no localStorage
function saveTaskToLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Editar tarefa
function editTask(taskId) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const task = tasks.find(t => t.id === parseInt(taskId));
    const newTaskText = prompt("Editar tarefa:", task.text);
    if (newTaskText) {
        task.text = newTaskText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        document.getElementById('taskList').innerHTML = '';
        loadTasks();
    }
}

// Excluir tarefa
function deleteTask(taskId) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = tasks.filter(t => t.id !== parseInt(taskId));
    localStorage.setItem('tasks', JSON.stringify(tasks));
    document.getElementById('taskList').innerHTML = '';
    loadTasks();
}

// Carregar tarefas ao iniciar
loadTasks();
