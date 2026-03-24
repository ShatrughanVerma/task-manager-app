const API_URL = 'http://localhost:8000/backend-php/api/tasks.php';
const UPDATE_URL = 'http://localhost:8000/backend-php/api/update-status.php';

document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    setInterval(loadTasks, 1000);
});

async function addTask() {
    const taskName = document.getElementById('taskName').value.trim();
    if (!taskName) {
        alert('Please enter a task name');
        return;
    }
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task_name: taskName })
        });
        
        if (response.ok) {
            document.getElementById('taskName').value = '';
            loadTasks();
            showNotification('Task added successfully!', 'success');
        } else {
            showNotification('Failed to add task', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error adding task', 'error');
    }
}

async function loadTasks() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        const tasksList = document.getElementById('tasksList');
        
        if (data.records && data.records.length > 0) {
            tasksList.innerHTML = data.records.map(task => `
                <div class="task-card" data-status="${task.status}" data-id="${task.id}">
                    <div class="task-info">
                        <div class="task-name">${escapeHtml(task.task_name)}</div>
                        <div class="task-meta">
                            <span>📅 ${formatDate(task.created_at)}</span>
                            <span class="task-status status-badge-${task.status}">
                                ${task.status}
                            </span>
                        </div>
                    </div>
                    <div class="task-actions">
                        <button class="btn btn-status" onclick="updateStatus(${task.id}, '${task.status}')">
                            Change Status
                        </button>
                    </div>
                </div>
            `).join('');
        } else {
            tasksList.innerHTML = `
                <div class="empty-state">
                    <p>✨ No tasks yet!</p>
                    <p>Add your first task above ✨</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('tasksList').innerHTML = '<div class="empty-state">Error loading tasks</div>';
    }
}

async function updateStatus(taskId, currentStatus) {
    let newStatus;
    if (currentStatus === 'Created') newStatus = 'WIP';
    else if (currentStatus === 'WIP') newStatus = 'Completed';
    else {
        showNotification('Task already completed!', 'info');
        return;
    }
    
    try {
        const response = await fetch(UPDATE_URL, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: taskId, status: newStatus })
        });
        
        if (response.ok) {
            showNotification(`Status updated to ${newStatus}!`, 'success');
            await loadTasks();
        } else {
            showNotification('Failed to update status', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error updating status', 'error');
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.textContent = message;
    const bgColor = type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        background: ${bgColor};
        color: white;
        border-radius: 8px;
        font-size: 14px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}
