import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../App";
import { nanoid } from "nanoid";
import {IoIosClose} from 'react-icons/io'
import { useTransition, animated } from "@react-spring/web";
 
export default function EditTask() {
    const {boards, setBoards, themeState} = useContext(DataContext)
    const [currentTasks, setCurrentTasks] = useState()
    const [isChangeSaved, setIsChangeSaved] = useState(false)
    const [confirmCloseOut, setConfirmCloseOut] = useState(false)
    const confirmCloseStyle = useTransition(confirmCloseOut, 
        {
            from: {opacity: 0},
            enter: {opacity: 1},
            leave: {opacity: 0}
        })


    useEffect(() => {
        setCurrentTasks(boards.map(board => {
            if (board.isOpen) {
                return board.columns.flatMap(column => {
                    return column.tasks.filter(task => task.isCurrentTask)
                })[0]
            }
        }).filter(el => el !== undefined)[0])
    }, [boards])


    function handelChange(e) {
        const {value, name} = e.target
        setCurrentTasks(prevTask => {
            return {...prevTask, [name] : value}
        })
        setIsChangeSaved(prevChange => false)
    }

    function handelSubtaskChange(e, id) {
        const {value, name} = e.target
        setCurrentTasks(prevTask => {
        const updatedSubtask = prevTask.subtasks.map(subtask => {
                if (subtask.id === id) {
                    return {...subtask, [name] : value}
                } else {
                    return subtask
                }
            })
            return {...prevTask, subtasks : updatedSubtask}
        })
        setIsChangeSaved(prevSave => false)
    }


    function addSubtask() {
        const newSubtask = {title: '', id: nanoid(), isComplete: false}
        setCurrentTasks(prevTask => ({...prevTask, subtasks: [...prevTask.subtasks, newSubtask]}))
    }

    function handelSubmit(e) {
        e.preventDefault()

        setBoards(prevBoard => {
            return prevBoard.map(board => {
                if (board.isOpen) {
                    return {
                        ...board,
                        columns : board.columns.map(column => {                          
                            if (column.name === currentTasks.status) {
                                const taskExists = column.tasks.some(task => task.id === currentTasks.id)
                                if (!taskExists) {
                                    return {
                                        ...column,
                                        tasks: [...column.tasks, currentTasks]
                                    }
                                } else {
                                    const taskIndex = column.tasks.findIndex(task => task.id === currentTasks.id)
                                    const updatedTask = [...column.tasks]
                                    updatedTask[taskIndex] = currentTasks
                                    return {
                                        ...column,
                                        tasks: updatedTask 
                                    }
                                }
                            } else if (column.name !== currentTasks.status){
                                return {
                                    ...column,
                                    tasks: column.tasks.filter(task => task.id !== currentTasks.id)
                                }
                            }
                            return column
                        })
                    }
                } else return board
            })
        })

        setIsChangeSaved(prev => true)
        setConfirmCloseOut(prev => false)
    }

    function closeModals() {
        if (isChangeSaved) {
            document.querySelector('.edit-current-task-container').close()
            setConfirmCloseOut(prevClose => false)
            setIsChangeSaved(prevSaved => false)
        } else {
            setConfirmCloseOut(prevClose => true)
            setIsChangeSaved(prevSave => false)
            return
        } 
    }

    function forceClose() {
        setConfirmCloseOut(prevClose => false)
        setIsChangeSaved(prev => false)
        document.querySelector('.edit-current-task-container').close()
    }

    function removeSubtask(id) {
        setBoards(prevBoard => {
            return prevBoard.map(board => {
                if (board.isOpen) {
                    return {
                        ...board,
                        columns: board.columns.map(column => {
                            return {
                                ...column,
                                tasks: column.tasks.map(task => {
                                    if (task.isCurrentTask){
                                        return {
                                            ...task,
                                            subtasks: task.subtasks.filter(subtask => subtask.id !== id)
                                        }
                                    } return task
                                })
                            }
                        })
                    }
                } return board
            })
        })
    }

    return (
       <dialog className={`edit-current-task-container ${themeState ? 'light-mode' : 'dark-mode'}`}>
            <button
                className="edit-current-task-close-btn" 
                onClick={() => closeModals()}>
            <IoIosClose />
            </button>
            
           
                {currentTasks && 
                <form
                    onSubmit={handelSubmit}
                    className="edit-current-task--form">
                        
                    
                    <div className="edit-current-task--title">
                        <label 
                            htmlFor="current-task--title"
                            className={`current-task--title-label ${themeState ? 'light-mode' : 'dark-mode'}`}>Title</label>
                        <input 
                            type="text"
                            id='current-task--title'
                            value={currentTasks.title}
                            onChange={handelChange}
                            name='title'
                            className={`current-task--title-input ${themeState ? 'light-mode' : 'dark-mode'}`}
                            />
                    </div>

                    <div className="animated-div--edit-task">
                    {confirmCloseStyle((style, item) => {
                        return item ? 
                            <animated.div
                                style={style}
                                className={`confirm-close-not-saved ${themeState ? 'light-mode-background' : 'dark-mode-background' }`}>                   
                                    <p>Changes have not been saved!</p>
                                    <button type='button' className="close-edit" onClick={() => forceClose()}>Close Anyway</button>
                                    <button type='submit' className={`save-edit ${themeState ? 'light-mode-form-btn' : 'dark-mode-form-btn' }`}>Save Changes</button>
                                </animated.div> : ''
                    })}
                    </div>


                    <div className="edit-current-task--description">
                        <label 
                            htmlFor="current-task-description"
                            className="current-task--description-label"
                            >Description</label>
                        <textarea 
                            type="text"
                            id='current-task-description'
                            value={currentTasks.description}
                            onChange={handelChange}
                            name='description'
                            placeholder="No description"
                            className={`current-task--description-input ${themeState ? 'light-mode' : 'dark-mode'}`}
                            />
                    </div>

                    <div className="edit-current-task--subtasks">
                        <label className="edit-current-task--subtask-label">Subtasks</label>
                        {currentTasks.subtasks.length > 0 ? currentTasks.subtasks.map(subtask => {
                          return (
                            <div className="edit-task--subtask-inner-wrapper" key={subtask.id}>
                                <input 
                                    type='text' 
                                    value={subtask.title} 
                                    onChange={() => handelSubtaskChange(event, subtask.id)}
                                    name='title'
                                    className={`current-task--subtask-input ${themeState ? 'light-mode' : 'dark-mode'}`}
                                    />
                                <div onClick={() => removeSubtask(subtask.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                        <rect x="12.7279" width="3" height="18" transform="rotate(45 12.7279 0)" fill="#828FA3"></rect>
                                        <rect y="2.12109" width="3" height="18" transform="rotate(-45 0 2.12109)" fill="#828FA3"></rect>
                                    </svg>
                                </div>
                            </div>
                            )
                    }) : <div className="no-subtasks"><p>No subtasks</p></div>}
                    <button 
                        type='button'
                        onClick={() => addSubtask()}
                        className={`edit-task-subtask-btn ${themeState ? 'light-mode-form-btn' : 'dark-mode-form-btn' }`}
                        >+ Add New Subtask</button>
                    </div>

                    <div className="edit-current-task--status">
                        <label htmlFor="" className="edit-current-task--status-label">Status</label>
                        <select 
                            value={currentTasks.status}
                            name="status" id="" 
                            className={`edit-current-task--status-select ${themeState ? 'light-mode' : 'dark-mode' }`}
                            onChange={handelChange}>
                            {boards.map(board => board.isOpen ? board.columns.map(column => 
                                <option 
                                    key={column.id}
                                    value={column.name}>{column.name}</option>
                                ) : '')}
                        </select>
                    </div>

                    <button type='submit' className="edit-task-save-changes-btn">
                        {isChangeSaved ? "Changes saved" : "Save Changes"}
                    </button>

                </form>}
                
        </dialog>
    )
}