import { loadData, createTodoData, toggleTodo, deleteTodo, clearCompletedTodos } from "./dataSvc.js";
import { updateView, getTodoElementId } from "./view.js";

$(function() {
    /**
     * Variable declaration
     */
    let $addTodo = $('#addTodo');
    const $clearCompleted = $('.clearCompleted');

    /**
     * App entrypoint
     */
    loadData();
    updateView();

    /**
     * Event Listeners
     */
    $addTodo.on('submit', function (e) {
        e.preventDefault();
        
        let text = $('input:text').val();

        if(text !== "") {
            createTodoData(text);
            updateView();
        }
        
        $('input:text').val('');
    });
    
    $(document).on('click', '.deleteTodo', function() {
        const id = getTodoElementId(this);
        deleteTodo(id);
        updateView();
    });

    $(document).on('change', '.toggleTodo', function() {
        const id = getTodoElementId(this);
        toggleTodo(id);
        updateView();
    });

    $clearCompleted.on('click', () => {
        clearCompletedTodos();
        updateView();
    });

});