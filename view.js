import { getData, getIncompleteTodos } from "./dataSvc.js";

let $todoList = $('.todoList');

/**
 * View
 */
// Fonction responsable de synchroniser la page html avec le tableau todosData
export function updateView(){
    $todoList.html('');

    const todosData = getData();

    for(let todoData of todosData){
        createTodoElement(todoData);
    }

    const leftTodo = getIncompleteTodos().length;
    $('.leftTodo span').html(leftTodo);

    if (todosData.length == 0) {
        $('.container-leftTodo').addClass('hidden');
    } else {
        $('.container-leftTodo').removeClass('hidden');
    }
}

export function createTodoElement(todoData){
    // On créé, puis on append
    const $todo = $(`
    <li class="todoItem ${todoData.completed ? 'completed' : ''}" data-todo-id="${todoData.id}"> 
        <input id="checkbox-${todoData.id}" class="toggleTodo ${todoData.completed ? 'checked' : ''}" type="checkbox" ${todoData.completed ? 'checked="checked"' : ''}"/> 
        <label for="checkbox-${todoData.id}" class="todo-title">${todoData.text}</label> 
        <button class="deleteTodo btn-del"><i class="far fa-trash-alt"></i></button>
    </li>`);
    $todoList.append($todo);
}

export function getTodoElementId(todoElement) {
    const $todo = $(todoElement).parents('.todoItem');
    return Number($todo.attr('data-todo-id'));
}