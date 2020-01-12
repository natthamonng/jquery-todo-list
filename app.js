import { loadData, createTodoData, toggleTodo, deleteTodo, clearCompletedTodos } from "./dataService.js";
import { updateView, getTodoElementId } from "./viewController.js";

$(function() {
    /**
     * Variable declaration
     */
    const $addTodo = $('#addTodo');
    const $clearCompleted = $('.clearCompleted');

    /**
     * App entry point
     */
    loadData();
    updateView();

    /**
     * Event Listeners
     */
    $addTodo.on('submit', function (event) {
        event.preventDefault();
        
        let title = $('input:text').val();

        if(title !== "") {
            createTodoData(title);
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