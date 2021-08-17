'use strict';

const todoControl = document.querySelector('.todo-control'),
      headerInput = document.querySelector('.header-input'),
      todoList = document.querySelector('.todo-list'),
      todoCompleted = document.querySelector('.todo-completed');

//Заполнение данных при загрузке страницы
let todoData = JSON.parse(localStorage.getItem('data')) || [];

const render = function() {
  todoList.textContent = '';
  todoCompleted.textContent = '';

  todoData.forEach(function(item, i){
    if (item.value !== '') {
      const li = document.createElement('li');
      li.classList.add('todo-item');
      li.innerHTML = '<span class="text-todo">' + item.value + '</span>' + 
      '<div class="todo-buttons">' +
        '<button class="todo-remove"></button>' + 
        '<button class="todo-complete"></button>' + 
      '</div>';

      headerInput.value = '';

      if (item.completed) {
        todoCompleted.append(li);
      } else {
        todoList.append(li);
      }

      const btnTodoComplete = li.querySelector('.todo-complete');
      btnTodoComplete.addEventListener('click', function(){
        item.completed = !item.completed;
        //Обновление данных
      localStorage.data = JSON.stringify(todoData);
        render();
      });

      const btnTodoRemove = li.querySelector('.todo-remove');
      btnTodoRemove.addEventListener('click', function(){
        todoData.splice(i, 1);
        //Обновление данных
        localStorage.data = JSON.stringify(todoData);
        render();
      }); 
    }
  });
};

todoControl.addEventListener('submit', function(event){
  event.preventDefault();

  const newTodo = {
    value: headerInput.value,
    completed: false,
  };
  if (newTodo.value !== '') {
    todoData.push(newTodo);
  }
  //Обновление данных
  localStorage.data = JSON.stringify(todoData);

  render();
});

render();