import React, { createElement, useContext, useState } from "react";
import { useTransition, animated } from "@react-spring/web";
import {IoIosClose} from 'react-icons/io'
import { DataContext } from "../App";
import { nanoid } from "nanoid";

export default function NewTask() {
    const {themeState, boards, setBoards} = useContext(DataContext)
    const [isError, setIsError] = useState(false)
    const transitions = useTransition(isError, 
        {
            from: {opacity: 0},
            enter: {opacity: 1},
            leave: {opacity: 0}
        })
    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        id: nanoid(),
        isCurrentTask: false,
        status: '',
        subtasks: [{title: '', isComplete: false, id: nanoid()}]
      })

    function handelChange(event) {
        const {name, value} = event.target
        setNewTask(prevTask => {
            return {...prevTask, [name] : value}
        })
    }

    function handelChangeSubtask(event, id) {
        const {name, value} = event.target
        setNewTask(prevTask => {
           const updatedTask = prevTask.subtasks.map(subtask => {
                if (id === subtask.id) {
                    return {...subtask, [name] : value}
                } else {
                  return subtask
                }
            })
            return {...prevTask, subtasks : updatedTask}
        })
    }

    function addNewSubtask() {
        setNewTask(prevTask => {
            const newSubTask = {title: '', isComplete: false, id: nanoid()}
            const updatedSubTasks = [...prevTask.subtasks, newSubTask]
            return {...prevTask, subtasks: updatedSubTasks}
        })
    }

    function handelSubmit(event) {
        event.preventDefault()

        const TaskStatuskInput = document.querySelector('.board-options-select').value
        const TaskStatuskContainer = document.querySelector('.add-new-task--status-container')
        if (TaskStatuskInput === '') {
            setIsError(prevError => true)
            setTimeout(() => {
                setIsError(prevError => !prevError)
            }, 2000);
            return  
        }

        setBoards(prevBoard => {
            return prevBoard.map(board => {
                if (board.isOpen) {
                    return {
                        ...board,
                        columns: board.columns.map(column => {
                            if (column.name === newTask.status) {
                                return {
                                    ...column,
                                    tasks: [...column.tasks, newTask]
                                }
                            }
                            return column
                        })
                    }
                }
                return board
                
            })
           
        })

        setNewTask(prevTask => {
            const newTaskItem = {
            title: "",
            description: "",
            id: nanoid(),
            isCurrentTask: false,
            status: prevTask.status,
            subtasks: [{title: '', isComplete: false, id: nanoid()}]
          }
          return newTaskItem
        })

    }

    function closeNewTask() {
        document.querySelector('.add-new-task-container').close()
    }

    function removeSubtask(id) {
        let newSubtaskArray = []
        newTask.subtasks.map(subtask => {
            if (subtask.id === id) {
                return
            } else {
                newSubtaskArray.push(subtask)
            }
        })
        
        setNewTask(prevTask => {
            const updatedSubtaskList = newSubtaskArray
            return {...prevTask, subtasks: updatedSubtaskList}
        })
    }

    return (
        <dialog 
            className={`add-new-task-container ${themeState ? 'light-mode' : 'dark-mode'}`}>
            <form action="" className="add-new-task-form" onSubmit={handelSubmit}>
            <button type="button" onClick={() => closeNewTask()} className="close-add-new-task-modal-btn">
                <IoIosClose />
            </button>
            <div className="add-new-task--title-container">
                <label htmlFor="add-new-task--title" className="add-new-task--title-label">Title</label>
                <input 
                    type="text" 
                    placeholder="e.g. Take coffee break" 
                    id='add-new-task--title'
                    name='title'
                    onChange={handelChange}
                    value={newTask.title}
                    className={`add-task--title ${themeState ? 'light-mode' : 'dark-mode'}`}/>
            </div>

            <div className="add-new-task--description-container">   
                <label htmlFor="add-new-task--description" className="add-new-task--description-label">Description</label>
                <textarea 
                    type="text" 
                    id='add-new-task--description'
                    name='description'
                    onChange={handelChange}
                    value={newTask.description}
                    className={`add-task--description ${themeState ? 'light-mode' : 'dark-mode'}`}
                    placeholder="e.g. It’s always good to take a break. This 15 minute break will  recharge the batteries a little." 
                    />
            </div>

            <div className="add-new-task--subtask-container">
                <label htmlFor="add-new-task--subtask" className="add-new-task--subtask-label">Subtasks</label>
                
                    {newTask.subtasks.length > 0 ? newTask.subtasks.map(subtask => {
                        return (
                        <div className="subtask-inner-wrapper">      
                            <input 
                            type="text" 
                            id='add-new-task--subtask'
                            name='title'
                            onChange={() => handelChangeSubtask(event, subtask.id)}
                            value={subtask.title}
                            className={`add-task--subtask ${themeState ? 'light-mode' : 'dark-mode'}`}
                            placeholder="e.g. Make coffee"/>
                            
                            <div onClick={() => removeSubtask(subtask.id)} className='remove-subtask'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                <rect x="12.7279" width="3" height="18" transform="rotate(45 12.7279 0)" fill="#828FA3"/>
                                <rect y="2.12109" width="3" height="18" transform="rotate(-45 0 2.12109)" fill="#828FA3"/>
                                </svg>
                            </div>
                        </div>
                        )
                    }) : <div className="no-subtasks"><p>There are no Subtasks</p></div>}
                    
                <button 
                    type="button"
                    onClick={() => addNewSubtask()}
                    className={`add-task--subtask-btn ${themeState ? 'light-mode-form-btn' : 'dark-mode-form-btn'}`}
                    >+ Add New Subtask</button>
            </div>

            <div className="add-new-task--status-container">
                <label htmlFor="add-new-task--status" className="add-new-task--status-label">Status</label>
                <div class='animated-container'>
                {transitions((style, item) => { 
                   return item ? 
                        <animated.div 
                            style={style} 
                            className={`pick-status-error ${
                                themeState ? 
                                'light-mode-background' : 
                                'dark-mode-background'}`}><p>Please Select a Status</p></animated.div> 
                                :''
                    })}
                    </div>
                <select 
                    name="status" 
                    onChange={handelChange}
                    id="add-new-task--status"
                    className={`board-options-select ${themeState ? 'light-mode-background' : 'dark-mode-background'}`}>
                        <option value=''>-- select an option --</option>
                    {boards.map(board => {
                        if (board.isOpen) {
                          return board.columns.map(coloumn => {
                               return (
                               <option 
                                    value={coloumn.name}
                                    className={`boards-drop ${themeState ? 'light-mode-background' : 'dark-mode-background'}`}
                                    >{coloumn.name}</option>)
                            })
                        }
                    })}
                </select>
            </div>

            <button 
                type='submit' 
                className="create-task-btn"
                >Create Task</button>
            </form>
        </dialog>
    )
}