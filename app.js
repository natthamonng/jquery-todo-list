$(function() {
    // Valeur par défaut
    let todosData = [
        // {
        //     id: 0,
        //     text: "eat",
        //     completed: false
        // }
    ];

    let $todoList = $('.todoList');//.html(localStorage.getItem('todoList'));
    let $addTodo = $('#addTodo');

    loadData();
    updateView();
  
    $addTodo.on('submit', function (e) {
        e.preventDefault();
        
        let text = $('input:text').val();

        if(text !== "") {
            createTodoData(text);
            updateView();
        }
        
        // La même sans variables
        // $todoList.append(
        //     $('<li>' + text + '</li>').addClass('todoItem')
        // );

        // Par texte directement
        // $todoList.append('<li class="todoItem">' + text + '</li>').addClass('todoItem');

        // Donne classe à la liste (ul)
        // $todoList.append('<li>' + text + '</li>').addClass('todoItem');

        $('input:text').val('');
    });
    
    function createTodoElement(todoData){
        // On créé, puis on append
        const $todo = $(`
        <li class="todoItem" data-todo-id="${todoData.id}"> 
            <input class="toggleTodo ${todoData.completed ? 'checked' : ''}" type="checkbox" ${todoData.completed ? 'checked="checked"' : ''}"/> 
            <span>${todoData.text}</span> 
            <button class="deleteTodo">X</button>
        </li>`);
        $todoList.append($todo);
    }

    function createTodoData(text){
        const todoData = {
            id: createID(),
            text,
            completed: false
        };
        todosData.push(todoData);

        saveData();

        return todoData;
    }

    // Fonction responsable de synchroniser la page html avec le tableau todoData
    function updateView(){
        $todoList.html('');

        for(let todoData of todosData){
            createTodoElement(todoData);
        }
    }

    function saveData(){
        // Save
        localStorage.setItem('todoData', JSON.stringify(todosData));
    }

    function loadData(){
        // Chargement des données
        const maybeSavedData = localStorage.getItem('todoData');
        if(maybeSavedData != null){
            todosData = JSON.parse(maybeSavedData);
        }
    }

    function createID(){
        let newID = -1;
        const usedIDs = todosData.map(data => data.id);

        do {
            newID = _createID();
        } while (usedIDs.indexOf(newID) > -1);

        return newID;
    }
    function _createID(){
        return Math.floor(Math.random() * 1000);
    }

    $(document).on('click', '.deleteTodo', function() {
        const $todo = $(this).parents('.todoItem');
        const id = $todo.attr('data-todo-id');
        // $this.remove();
        deleteTodo(id)
        // localStorage.setItem('todoList', $('.todoList').html());
    });

    function deleteTodo(id) {
        todosData = todosData.filter(todoData.id !== id);
        saveData();
        updateView();
    }

    $(document).on('change', '.toggleTodo', function() {
        if ($(this).attr('checked')) {
            $(this).removeAttr('checked').removeClass('checked');
        } else {
            $(this).attr('checked', 'checked').addClass('checked');
        }
        $(this).parent().toggleClass('completed');
        localStorage.setItem('todoList', $('.todoList').html());
    });
});