import React, { useContext, useState } from "react";
import { DataContext } from "../App";
import {IoIosClose} from 'react-icons/io'


export default function AdditionalInfo() {
    const {boards, themeState, setBoards} = useContext(DataContext)

    function closeMainTask(id) {
    setBoards(prevBoard => {
      return prevBoard.map(board => {
        return {
          ...board,
          columns: board.columns.map(column => {
            return {
              ...column,
              tasks: column.tasks.map(task => {
                if (id === task.id) {
                  return {...task, isCurrentTask: false}
                } else {
                  return task
                }
              })
            }
          })
        }
      })
    })
    document.querySelector('.more-info-dialog').close()
  }

  function finishedTask(id) {
    setBoards(prevBoard => {
      return prevBoard.map(board => {
        return {
          ...board,
          columns: board.columns.map(column => {
            return {
              ...column,
              tasks: column.tasks.map(task => {
                return {
                  ...task,
                  subtasks: task.subtasks.map(subtask => {
                    if (subtask.id === id) {
                      return { ...subtask, isCompleted: !subtask.isCompleted };
                    } else {
                      return subtask;
                    }
                  })
                };
              })
            };
          })
        };
      });
    });
  }

  function openEditTask() {
    document.querySelector('.edit-current-task-container').showModal()
    document.querySelector('.more-info-dialog').close()
  }

    const isCurrentTask = boards.map(board => {
         return board.columns.map(coloumn => {
            return coloumn.tasks.map(task => {
                let count = 0
                if (task.isCurrentTask) {
                    return (
                        <div className={`additional-info ${themeState ? 'light-mode' : "dark-mode" }`} open>
                                <section className="additional-info--heading">
                                    <h1>{task.title}</h1>
                                    <div className="additional-info--buttons" >
                                        <button className="settings" onClick={() => openEditTask()}>
                                            <div className="setting-layer"></div>
                                            <div className="setting-layer"></div>
                                            <div className="setting-layer"></div>
                                        </button>
                                        <button className="close-modal" onClick={() => closeMainTask(task.id)}>
                                          <IoIosClose />
                                        </button>
                                    </div>
                                </section>
                                <section className="addtional-info--description-container"> 
                                    <p className="additional-info--description">{task.description}</p>
                                </section>
                                <section className="additional-info--subtasks-container">
                                    <h5 className="additional-info-subtasks">{
                                    task.subtasks.map(subtask => {
                                        if (subtask.isCompleted) {
                                            count++
                                        }
                                    })
                                    }Subtasks ({count} of {task.subtasks.length})</h5>
                                    <div className="subtask-container">
                                    {task.subtasks.map(subtask => {
                                        return (
                                            <div 
                                                className={`subtask-list ${themeState ? 'light-mode-background' : "dark-mode-background" }`} 
                                                key={subtask.id}
                                                
                                                >
                                                <input 
                                                    key={subtask.id} 
                                                    type="checkbox" 
                                                    className="custom-check" 
                                                    id={subtask.id}
                                                    onChange={() => finishedTask(subtask.id)}
                                                    checked={subtask.isCompleted}
                                                    />
                                                <label 
                                                    htmlFor={subtask.id} 
                                                    style={subtask.isCompleted ? 
                                                        {
                                                            textDecoration: "line-through",
                                                            opacity: '0.5'
                                                        } : null}>{subtask.title}</label>
                                            </div>
                                        )
                                    })}
                                    </div>
                                    <div className="board-options">
                                        <label htmlFor="board-options" className="board-option-drop">Current Status</label>
                                        <select 
                                          id={`board-options`} 
                                          value={task.status}
                                          className={`board-options-select ${themeState ? 'light-mode-background' : 'dark-mode-background'}`}>
                                            {board.columns.map(coloumn => {
                                                return <option className={`boards-drop ${themeState ? 'light-mode-background' : 'dark-mode-background'}`} value={coloumn.name}>{coloumn.name}</option>
                                            })}
                                        </select>
                                    </div>
                                </section>
                            </div> 
                    )
                }
            })
         })
    })
    


    return (
        <>
        <dialog className="more-info-dialog">
        {isCurrentTask}
        </dialog>
        </>
        
    )
}