Smart To-Do List

A feature-rich task management application built with Flask and JavaScript that helps you organize and track your tasks efficiently.

Overview

Smart To-Do List is a web application that allows users to create, manage, and track tasks with various priority levels. The application provides features like task categorization, recurring tasks, undo/redo functionality, and task completion tracking.

Features

- Priority-based Task Management: Organize tasks with custom priority levels (1-10)
- Visual Priority Indicators: Tasks are color-coded based on priority (high, normal, low)
- Task Categories: View tasks in different tabs (Active, Completed, Recurring)
- Undo/Redo Functionality: Revert or restore task actions
- Task Stats Dashboard: Real-time statistics showing active, completed, recurring, and high-priority task counts
- Recurring Tasks: Mark tasks as recurring for repeated activities
- Responsive Design: Works well on desktop and mobile devices

Technology Stack

- Backend: Flask (Python)
- Frontend: HTML, CSS, JavaScript
- Data Structures: Priority Queue (Heap), Stack, Queue

Project Structure

```
smart-todo-list/
├── app.py                # Flask application with backend routes
├── templates/
│   └── index.html        # Main HTML template
├── static/
│   ├── main.js           # Frontend JavaScript logic
│   └── styles.css        # CSS styling
```

Data Structures Used

- Heap (Priority Queue): For organizing tasks based on priority
- Stack: For implementing undo/redo functionality
- Queue: For managing recurring tasks

Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/smart-todo-list.git
   cd smart-todo-list
   ```

2. Set up a virtual environment (optional but recommended):
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```
   pip install flask
   ```

4. Run the application:
   ```
   python app.py
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:5000
   ```

How to Use

Adding a Task
1. Fill in the task name, description, priority (1-10), and due date.
2. Check the "Recurring" box if it's a recurring task.
3. Click "Add Task" to add it to your list.

Managing Tasks
- Complete Task: Mark a task as completed using the "Complete" button.
- Remove Task: Delete a task using the "Remove" button.
- Undo/Redo: Use the dedicated buttons to undo or redo your recent actions.

Viewing Tasks
- Switch between "Active Tasks," "Completed Tasks," and "Recurring Tasks" using the tabs.
- Tasks are color-coded based on priority:
  - Red: High priority (1-3)
  - Blue: Normal priority (4-7)
  - Yellow: Low priority (8-10)
