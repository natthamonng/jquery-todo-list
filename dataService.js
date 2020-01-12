/**
* Variable declaration
*/
let todosData = [];
const LOCAL_STORAGE_KEY = 'jquery-todo-list'

export function getData(){
    return todosData;
}

/**
 * Data
 */
export function loadData() {
    // Chargement des données
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if(storedData != null) {
        todosData = JSON.parse(storedData);
    }
}

export function saveData(){
    // Save
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todosData));
}

export function createTodoData(title){
    const todoData = {
        id: createID(),
        title,
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

    //call _createID function while index of newID that passed in is higher than -1 which means it's already exist.
    do {
        newID = _createID();
    } while (usedIDs.indexOf(newID) > -1);

    return newID;
}

function _createID(){
    return Math.floor(Math.random() * 1000);
}