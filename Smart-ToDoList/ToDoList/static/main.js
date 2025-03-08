document.getElementById('task-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const task = {
        name: document.getElementById('task-name').value,
        description: document.getElementById('task-desc').value,
        priority: parseInt(document.getElementById('task-priority').value),
        due_date: document.getElementById('task-due-date').value,
        recurring: document.getElementById('task-recurring').checked,
        completed: false
    };
    fetch('/add_task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    }).then(response => response.json()).then(data => {
        console.log(data);
        loadTasks();
        document.getElementById('task-form').reset();
    });
});

document.getElementById('undo-btn').addEventListener('click', function() {
    fetch('/undo', { method: 'POST' }).then(response => response.json()).then(data => {
        console.log(data);
        loadAllTasks();
    });
});

document.getElementById('redo-btn').addEventListener('click', function() {
    fetch('/redo', { method: 'POST' }).then(response => response.json()).then(data => {
        console.log(data);
        loadAllTasks();
    });
});


document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));

        this.classList.add('active');
        
        document.querySelectorAll('.tab-content').forEach(content => {
            content.style.display = 'none';
        });
        
        const tabName = this.getAttribute('data-tab');
        document.getElementById(`${tabName}-tab`).style.display = 'block';
    });
});

function loadAllTasks() {
    loadTasks();
    loadCompletedTasks();
    loadRecurringTasks();
}

function loadTasks() {
    fetch('/get_tasks').then(response => response.json()).then(tasks => {
        console.log('Tasks:', tasks);
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            
            const taskDetails = document.createElement('div');
            taskDetails.className = 'task-details';
            taskDetails.textContent = `${task.name} - ${task.description} - Priority: ${task.priority} - Due: ${task.due_date} - Recurring: ${task.recurring ? 'Yes' : 'No'}`;
            
            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'task-buttons';
            
            const completeBtn = document.createElement('button');
            completeBtn.textContent = 'Complete';
            completeBtn.className = 'complete-btn';
            completeBtn.addEventListener('click', function() {
                completeTask(task);
            });
            
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.className = 'remove-btn';
            removeBtn.addEventListener('click', function() {
                removeTask(task);
            });
            
            buttonContainer.appendChild(completeBtn);
            buttonContainer.appendChild(removeBtn);
            
            li.appendChild(taskDetails);
            li.appendChild(buttonContainer);
            
            li.className = task.priority <= 3 ? 'high-priority' : task.priority <= 7 ? 'normal-priority' : 'low-priority';
            taskList.appendChild(li);
        });
        
        document.getElementById('active-count').textContent = tasks.length;
        
        const highPriorityCount = tasks.filter(task => task.priority <= 3).length;
        document.getElementById('high-priority-count').textContent = highPriorityCount;
    });
}

function loadCompletedTasks() {
    fetch('/get_completed_tasks').then(response => response.json()).then(tasks => {
        console.log('Completed Tasks:', tasks);
        const completedTaskList = document.getElementById('completed-task-list');
        completedTaskList.innerHTML = '';
        
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = 'completed-task';
            
            const taskDetails = document.createElement('div');
            taskDetails.className = 'task-details';
            taskDetails.textContent = `${task.name} - ${task.description} - Priority: ${task.priority} - Due: ${task.due_date} - Recurring: ${task.recurring ? 'Yes' : 'No'}`;
            
            li.appendChild(taskDetails);
            completedTaskList.appendChild(li);
        });
        
        document.getElementById('completed-count').textContent = tasks.length;
    });
}

function loadRecurringTasks() {
    fetch('/get_recurring_tasks').then(response => response.json()).then(tasks => {
        console.log('Recurring Tasks:', tasks);
        const recurringTaskList = document.getElementById('recurring-task-list');
        recurringTaskList.innerHTML = '';
        
        tasks.forEach(task => {
            const li = document.createElement('li');
            
            const taskDetails = document.createElement('div');
            taskDetails.className = 'task-details';
            taskDetails.textContent = `${task.name} - ${task.description} - Priority: ${task.priority} - Due: ${task.due_date}`;
            
            li.appendChild(taskDetails);
            recurringTaskList.appendChild(li);
        });
        
        document.getElementById('recurring-count').textContent = tasks.length;
    });
}

function completeTask(task) {
    fetch('/complete_task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    }).then(response => response.json()).then(data => {
        console.log(data);
        loadAllTasks();
    });
}

function removeTask(task) {
    fetch('/remove_task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    }).then(response => response.json()).then(data => {
        console.log(data);
        loadAllTasks();
    });
}

loadAllTasks();