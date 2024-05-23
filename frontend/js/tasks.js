async function loadTasks() {
    const user = await fetchUID();
    fetch(`http://localhost:3000/tasks/getTasks/${user}`)
        .then(response => response.json())
        .then(tasks => {
            const tableBody = document.getElementById('task-table').getElementsByTagName('tbody')[0];
            tasks.forEach(task => {
                let newRow = tableBody.insertRow();
                let cell1 = newRow.insertCell(0);
                let cell2 = newRow.insertCell(1);
                let cell3 = newRow.insertCell(2);
                let cell4 = newRow.insertCell(3);
                let cell5 = newRow.insertCell(4);

                cell1.innerHTML = `<i class="bi bi-trash text-danger" onclick="deleteTask('${task.id}')"></i>`;
                cell2.innerHTML = task.name;
                cell3.innerHTML = task.desc;
                cell4.innerHTML = new Date(task.createdOn).toLocaleString();
                cell5.innerHTML = new Date(task.dueAt).toLocaleString();
                let cell6 = newRow.insertCell(5);
                cell6.innerHTML = `
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" ${task.completed ? 'checked' : ''} onclick="updateCompletion('${task.id}', this.checked)">
                </div>
                `;
            });
        });
}

async function addTask(event) {
    event.preventDefault();
    let user = await fetchUID();
    let name = document.getElementById('name').value;
    let description = document.getElementById('description').value;
    let dueAt = new Date(document.getElementById('due-at').value).toISOString();
    let createdOn = new Date().toISOString();

    let task = {
        user: user,
        name: name,
        desc: description,
        dueAt: dueAt,
        createdOn: createdOn,
        completed: false
    };

    fetch('http://localhost:3000/tasks/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        window.location.href = '../index.html';
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function updateCompletion(id, completed) {
    fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed }),
    })
    .then(response => {
        if (response.ok) {
            return response.text().then(text => text ? JSON.parse(text) : {})
        } else {
            throw new Error('Network response was not ok.');
        }
    })
    .then(data => {
        console.log('Success:', data);
        window.location.reload();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function deleteTask(id) {
    alert('Are you sure you want to delete this task?');
    fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
    })
    .then(() => {
        console.log('Success: Task deleted');
        window.location.reload();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}