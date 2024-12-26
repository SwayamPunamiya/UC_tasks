import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

function MovieWatchList() {
    
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [""];
    });

    const [statuses, setStatuses] = useState(() => {
        const savedStatuses = localStorage.getItem('statuses');
        return savedStatuses ? JSON.parse(savedStatuses) : Array(tasks.length).fill('Unwatched');
    });

    const [newTask, setNewTask] = useState("");

    
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        localStorage.setItem('statuses', JSON.stringify(statuses));
    }, [tasks, statuses]);


    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    
    function addTask() {
        if (newTask.trim() !== "") {
            setTasks(prevTasks => [...prevTasks, newTask]);
            setStatuses(prevStatuses => [...prevStatuses, 'Unwatched']);
            setNewTask("");
        }
    }

    
    function deleteTask(index) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                
                const updatedTasks = tasks.filter((_, i) => i !== index);
                const updatedStatuses = statuses.filter((_, i) => i !== index);
                setTasks(updatedTasks);
                setStatuses(updatedStatuses);

                Swal.fire(
                    'Deleted!',
                    'Your task has been deleted.',
                    'success'
                );
            }
        });
    }

    
    function watchedTask(index) {
        setStatuses(prevStatuses =>
            prevStatuses.map((status, i) =>
                i === index ? (status === 'Unwatched' ? 'Watched' : 'Unwatched') : status
            )
        );
    }

    return (
        <div className="to-do-list">
            <h1>Movie Watchlist</h1>

            <div>
                <input
                    type="text"
                    placeholder="Enter a movie..."
                    value={newTask}
                    onChange={handleInputChange}
                />
                <button className="add-button" onClick={addTask}>
                    Add
                </button>
            </div>

            <ol>
                {tasks.map((task, index) => (
                    <li key={index}>
                        <span className="text">{task}</span>
                        <button className="delete-button" onClick={() => deleteTask(index)}>
                            Delete
                        </button>

                        <button className="watched-button" onClick={() => watchedTask(index)}>
                            {statuses[index] === 'Unwatched' ? 'Watched' : 'Unwatched'}
                        </button>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default MovieWatchList;
