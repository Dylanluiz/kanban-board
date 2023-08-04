import React, { useContext } from "react";
import { DataContext } from "../App";

export default function DeleteTask({id}) {
    const {setBoards, themeState, boards} = useContext(DataContext)

    function removeBoard() {
        setBoards(prevBoard => {
           return prevBoard.map(board => {
                    return {
                        ...board,
                        columns: board.columns.map(column => {
                            return {
                                ...column,
                                tasks: column.tasks.filter(task => task.id !== id)
                            }
                        })
                    }
                })
        })
        document.querySelector('.delete-task-dialog').close()
        document.querySelector('.more-info-dialog').close()
    }

    function closeDeleteTask() {
        document.querySelector('.delete-task-dialog').close()
    }

    const taskName = boards.map(board => {
        if (board.isOpen) {
            return board.columns.map(column => {
                return column.tasks.map(task => {
                    if (task.isCurrentTask) {
                        return task.title
                    }
                }).filter(item => item !== undefined)[0]
            }).filter(item => item !== undefined)[0]
        }
    }).filter(item => item !== undefined)[0]

    console.log(taskName)


    return (
        <dialog className={`delete-task-dialog ${themeState ? 'light-mode': 'dark-mode'}`}>
            <h4>Delete this task?</h4>
            <p>Are you sure you want to delete the <span style={{fontWeight: '700', color: "#FFF"}}>‘{taskName}’</span> task and its subtasks? This action cannot be reversed.</p>
            <div className="delete-board-btn-container">
                <button onClick={() => removeBoard()} className="board-btn--delete">Delete</button>
                <button onClick={() => closeDeleteTask()} className={`board-btn-cancel ${themeState ? 'light-mode-form-btn' : 'dark-mode-form-btn'}`}>Cancel</button>
            </div>
        </dialog>
    )
}