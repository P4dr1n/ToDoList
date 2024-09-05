const button = document.querySelector('.botao-tarefa')
const input = document.querySelector('.texto-tarefa')
const completeList = document.querySelector('.lista-tarefa')

let taskList = []

function addTask(){
    taskList.push({
        tarefa: input.value,
        concluida: false
    })

    input.value = ''

    showTasks()
}

function showTasks(){
    let newLi = ''

    taskList.forEach((task, index) => {
        newLi = newLi + `
        <li class="tarefa ${task.concluida && "done"}">
                <img src="../img/verificar_icon.png" alt="tarefa-concluida" onclick="completeTask(${index})">
                <p>${task.tarefa}</p>
                <img src="../img/lixo_icon.png" alt="excluir-tarefa" onclick="deleteTask(${index})">
            </li>
            `
    });

    completeList.innerHTML = newLi

    localStorage.setItem('lista', JSON.stringify(taskList))
}

function deleteTask(index){
    taskList.splice(index, 1)

    showTasks()
}

function completeTask(index){
    taskList[index].concluida = !taskList[index].concluida 

    showTasks()
}

function recarregarTarefa(){
    const tarefaDoLocalStorge = localStorage.getItem('lista')

    if(tarefaDoLocalStorge){
        taskList = JSON.parse(tarefaDoLocalStorge)
    }
    showTasks()
}

recarregarTarefa()
button.addEventListener('click', addTask)