// On créé, puis on append
    const $todo = $(`
    <li class="todoItem" data-todo-id="${todoData.id}"> 
        <input class="toggleTodo ${todoData.completed ? 'checked' : ''}" type="checkbox" ${todoData.completed ? 'checked="checked"' : ''}"/> 
        <span>${todoData.text}</span> 
        <button class="deleteTodo">X</button>
    </li>`);
    $todoList.append($todo);
    
// La même sans variables
    $todoList.append(
        $('<li>' + text + '</li>').addClass('todoItem')
    );

// Par texte directement
    $todoList.append('<li class="todoItem">' + text + '</li>').addClass('todoItem');

// Donne classe à la liste (ul)
    $todoList.append('<li>' + text + '</li>').addClass('todoItem');