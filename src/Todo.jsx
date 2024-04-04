import React, { useState, useEffect } from "react";

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [editValue, setEditValue] = useState('');

    // Load tasks from local storage when component mounts
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem("todos"));
        if (storedTodos) {
            setTodos(storedTodos);
        }
    }, []);

    // Save tasks to local storage whenever todos state changes
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleAddTodo = () => {
        if (inputValue.trim() !== "") {
            setTodos([...todos, { task: inputValue, completed: false }]);
            setInputValue('');
        }
    };

    const handleChange = (index) => {
        setTodos(todos.map((todo, i) => (i === index ? { ...todo, completed: !todo.completed } : todo)));
    };

    const handleDeleteTodo = (index) => {
        setTodos(todos.filter((_, i) => i !== index));
    };

    const handleEditTodo = (index) => {
        setEditIndex(index);
        setEditValue(todos[index].task);
    };

    const handleSaveEdit = (index) => {
        setTodos(todos.map((todo, i) => (i === index ? { ...todo, task: editValue } : todo)));
        setEditIndex(null);
    };

    return (
        <div className="wrapper">
            <h1>TODO</h1>
            <div className="input">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="What do you need to do?"
                />
                <button onClick={handleAddTodo}>Add</button>
            </div>
            <ul className="tasks">
                {todos.map((todo, index) => (
                    <li key={index}>
                        <div>
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => handleChange(index)}
                            />
                            <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>{todo.task}</span>
                        </div>
                        {editIndex === index ? (
                            <div>
                                <input
                                    type="text"
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                />
                                <button onClick={() => handleSaveEdit(index)}>Save</button>
                            </div>
                        ) : (
                            <div className="btns">
                                <button className="btn" onClick={() => handleDeleteTodo(index)}>Delete</button>
                                <button className="btn" onClick={() => handleEditTodo(index)}>Edit</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            <div className="task-controls">
                <button onClick={() => setTodos([])}>Delete All</button>
            </div>
        </div>
    );
};

export default Todo;
