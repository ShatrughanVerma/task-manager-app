-- Create tasks table with PostgreSQL syntax
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    task_name VARCHAR(255) NOT NULL,
    status VARCHAR(20) DEFAULT 'Created' CHECK (status IN ('Created', 'WIP', 'Completed')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for better performance
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_created_at ON tasks(created_at);

-- Insert sample data (optional)
INSERT INTO tasks (task_name, status) VALUES 
('Sample Task 1', 'Created'),
('Sample Task 2', 'WIP'),
('Sample Task 3', 'Completed');

-- Verify data
SELECT * FROM tasks;
