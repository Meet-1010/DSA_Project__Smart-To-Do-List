from flask import Flask, render_template, request, jsonify
import heapq
from collections import deque

app = Flask(__name__)

tasks = []
completed_tasks = []  
undo_stack = []
redo_stack = []
recurring_tasks = deque()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/add_task', methods=['POST'])
def add_task():
    task = request.json
    heapq.heappush(tasks, (task['priority'], task))
    undo_stack.append(('add', task))
    return jsonify({'status': 'Task added'})

@app.route('/undo', methods=['POST'])
def undo():
    if undo_stack:
        action, task = undo_stack.pop()
        if action == 'add':
            tasks.remove((task['priority'], task))
            heapq.heapify(tasks)
        elif action == 'remove':
            heapq.heappush(tasks, (task['priority'], task))
        elif action == 'complete':
            completed_tasks.remove(task)
            heapq.heappush(tasks, (task['priority'], task))
        redo_stack.append((action, task))
        return jsonify({'status': 'Undo successful'})
    return jsonify({'status': 'Nothing to undo'})

@app.route('/redo', methods=['POST'])
def redo():
    if redo_stack:
        action, task = redo_stack.pop()
        if action == 'add':
            heapq.heappush(tasks, (task['priority'], task))
        elif action == 'remove':
            tasks.remove((task['priority'], task))
            heapq.heapify(tasks)
        elif action == 'complete':
            tasks.remove((task['priority'], task))
            heapq.heapify(tasks)
            completed_tasks.append(task)
        undo_stack.append((action, task))
        return jsonify({'status': 'Redo successful'})
    return jsonify({'status': 'Nothing to redo'})

@app.route('/remove_task', methods=['POST'])
def remove_task():
    task = request.json
    tasks.remove((task['priority'], task))
    heapq.heapify(tasks)
    undo_stack.append(('remove', task))
    return jsonify({'status': 'Task removed'})

@app.route('/complete_task', methods=['POST'])
def complete_task():
    task = request.json
    tasks.remove((task['priority'], task))
    heapq.heapify(tasks)
    
    completed_tasks.append(task)
    undo_stack.append(('complete', task))
    
    if task['recurring']:
        recurring_tasks.append(task)
    print('Recurring Tasks after completion:', list(recurring_tasks))
    print('Completed Tasks:', completed_tasks)  
    return jsonify({'status': 'Task completed'})

@app.route('/get_tasks', methods=['GET'])
def get_tasks():
    print('Tasks:', tasks) 
    return jsonify([task for priority, task in tasks])

@app.route('/get_recurring_tasks', methods=['GET'])
def get_recurring_tasks():
    print('Recurring Tasks:', list(recurring_tasks)) 
    return jsonify(list(recurring_tasks))

@app.route('/get_completed_tasks', methods=['GET'])
def get_completed_tasks():
    print('Completed Tasks:', completed_tasks)
    return jsonify(completed_tasks)

if __name__ == '__main__':
    app.run(debug=True)