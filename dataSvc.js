// Valeur par défaut
let todosData = [];

export function getData(){
    return todosData;
}

/**
 * Data
 */
export function loadData() {
    // Chargement des données
    const storedData = localStorage.getItem('todoData');
    if(storedData != null) {
        todosData = JSON.parse(storedData);
    }
}

export function saveData(){
    // Save
    localStorage.setItem('todoData', JSON.stringify(todosData));
}

export function createTodoData(text){
    const todoData = {
        id: createID(),
        text,
        completed: false
    };

    todosData.push(todoData);

    saveData();

    return todoData;
}

export function getIncompleteTodos() {
    return todosData.filter(todoData => !todoData.completed);
}

export function deleteTodo(id) {
    todosData = todosData.filter(todoData => todoData.id !== id);
    saveData();
    // updateView();
}

export function toggleTodo(id) {
    const todoData = todosData.find(todoData => todoData.id === id)
    todoData.completed = !todoData.completed
    
    saveData();
    // updateView();
}

export function clearCompletedTodos() {
    todosData = getIncompleteTodos();
    saveData();
    // updateView();
}

export function createID(){
    let newID = -1;
    const usedIDs = todosData.map(todoData => todoData.id);

    do {
        newID = _createID();
    } while (usedIDs.indexOf(newID) > -1);

    return newID;
}

function _createID(){
    return Math.floor(Math.random() * 1000);
}