import React, { useContext, useState } from "react";
import AdditionalInfo from "./AdditionalInfo";
import { DataContext } from "../App";

export default function KanbanBoard() {
    const {boards, themeState, setBoards} = useContext(DataContext)
    

    function isCurrentMainTask(id) {
        setBoards(prevBoard => {
          return prevBoard.map(board => {
            return {
              ...board,
              columns: board.columns.map(column => {
                return {
                  ...column,
                  tasks: column.tasks.map(task => {
                    if (id === task.id) {
                      return {...task, isCurrentTask: true}
                    } else {
                      return {...task, isCurrentTask: false}
                    }
                  })
                }
              })
            }
          })
        })
        document.querySelector('.more-info-dialog').showModal()
      }
      
    const kanbanBoardEl = boards.map(board => {
        if (board.isOpen) {
          return (
            board.columns.map(coloumn => {
                return (
                    <section 
                        className={`kanban-board-section ${themeState ? 'light-mode-background' : 'dark-mode-background'}`} 
                        key={coloumn.name}>
                        <div className="title-container">
                            <div className="coloumn-circle"></div>
                            <h3 className="coloumn-name">{coloumn.name} ({coloumn.tasks.length})</h3>
                        </div>
                        <div className="kanban-board-tasks">
                            {coloumn.tasks.map((task, index) => {
                                let count = 0
                                return (
                                    <div 
                                        key={task.id} 
                                        className={`kanban-subtask-container ${themeState ? 'light-mode' : 'dark-mode'}`}
                                        style={{animation: `ease-up ${0.3 + index / 10}s ease-in`}}
                                        onClick={() => isCurrentMainTask(task.id)}>
                                    <h4 className={`task-title ${themeState ? 'light-mode' : 'dark-mode'}`}>{task.title}</h4>  
                                    {task.subtasks.length > 0 ? 
                                    <p className="tasks-subtasks">{
                                    task.subtasks.map(subtask => { 
                                        if (subtask.isCompleted) {
                                            count++
                                    }
                                    })}{count} of {task.subtasks.length} subtasks</p> : <p className="no-subtask-text">- No subtasks</p>}
                                    </div> 
                                )
                            })}  
                        </div>   
                    </section>
                )
            }))
        }
    })
    console.log(boards)
    return (
        <>
        <main 
            className={`kanban-board-main-container ${themeState ? 'light-mode-background' : 'dark-mode-background'}`}>
            {kanbanBoardEl}
        </main>
        </>
    )
}