window.addEventListener('load', () => {
	todos = JSON.parse(localStorage.getItem('todos')) || [];
	const newForm = document.querySelector('#new-todo-form');

	newForm.addEventListener('submit', e => {
		e.preventDefault();

		const todo = {
			content: e.target.elements.content.value,
			done: false,
		}

		if (!todo.content) {
            alert("Fill Out Task!");
            return;
        }
		else{
			todos.push(todo);
		}
		
		localStorage.setItem('todos', JSON.stringify(todos));

		e.target.reset();

		DisplayTodos();
	})


	DisplayTodos();
})

function DisplayTodos () {

	const todoList = document.querySelector('#todo-list');
	todoList.innerHTML = "";

	todos.forEach(todo => {
		const todoItem = document.createElement('div');
		todoItem.classList.add('todo-item');


		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');
		const space = document.createElement('h4');

		content.classList.add('todo-content');
		actions.classList.add('actions');
		edit.classList.add('edit');
		deleteButton.classList.add('delete');

		content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
		edit.innerHTML = 'Edit';
		deleteButton.innerHTML = 'Delete';

		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		todoItem.appendChild(content);
		todoItem.appendChild(actions);
		todoItem.appendChild(space);

		todoList.appendChild(todoItem);

		if (todo.done) {
			todoItem.classList.add('done');
		}

		edit.addEventListener('click', (e) => {
			const input = content.querySelector('input');
			input.removeAttribute('readonly');
			edit.innerText = "Save";
			input.focus();
			input.addEventListener('blur', (e) => {
				input.setAttribute('readonly', true);
				edit.innerText = "Edit";
				todo.content = e.target.value;
				localStorage.setItem('todos', JSON.stringify(todos));
				DisplayTodos();

			})
		})

		deleteButton.addEventListener('click', (e) => {
			todos = todos.filter(t => t != todo);
			localStorage.setItem('todos', JSON.stringify(todos));
			DisplayTodos();
		})

	})
}