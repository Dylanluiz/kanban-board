import React, { useContext, useState } from "react";
import AdditionalInfo from "./AdditionalInfo";
import { DataContext } from "../App";
import { nanoid } from "nanoid";

export default function KanbanBoard() {
    const {boards, themeState, setBoards} = useContext(DataContext)
    const [screenWidth, setScreenWidth] = useState()
    const draggables = document.querySelectorAll('.draggable')
    const containers = document.querySelectorAll('.kanban-board-tasks')

    draggables.forEach(draggable => {
      draggable.addEventListener('dragstart', (e) => {
        const dataset = e.target.dataset
        draggable.classList.add('dragging')
        const currentObj = boards.map(board => {
            if (board.isOpen) {
              return board.columns.map(column => {
                return column.tasks.find(task => {
                  if (task.id == dataset.id) {
                    return task
                  }
                })
              }).filter(item => item !== undefined)[0]
            }
          })[0]
          console.log(currentObj)
        })
      
      draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging')
      })
    })

    containers.forEach(container => {
      container.addEventListener('dragover', e => {
        e.preventDefault()
        const draggable = document.querySelector('.dragging')


        container.appendChild(draggable)
      })
    })




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

    function addNewColumn() {
      const newColumn =  {
        name: "",
        id: nanoid(),
        color: '#FFFFFF',
        isDelete: false,
        tasks: []
      }
      setBoards(prevBoards => {
       return prevBoards.map(board => {
          if (board.isOpen) {
            return {
              ...board,
              columns: [...board.columns, newColumn]
            }
          } return board
        })
      
    })}
      
    window.addEventListener('resize', () => setScreenWidth(window.innerWidth))

    const kanbanBoardEl = boards.map(board => {
        if (board.isOpen) {
          return (
            board.columns.map(coloumn => {
                return (
                    <section 
                        className={`kanban-board-section ${themeState ? 'light-mode-background' : 'dark-mode-background'}`} 
                        key={coloumn.id}>
                        <div className="title-container">
                            <div className="coloumn-circle" style={{backgroundColor: coloumn.color}}></div>
                            <h3 className="coloumn-name">{coloumn.name} ({coloumn.tasks.length})</h3>
                        </div>
                        <div className="kanban-board-tasks">
                            {coloumn.tasks.map((task, index) => {
                                let count = 0
                                return (
                                    <div 
                                        key={task.id} 
                                        className={`kanban-subtask-container draggable ${themeState ? 'light-mode' : 'dark-mode'}`}
                                        style={{animation: `ease-up ${0.3 + index / 10}s ease-in`}}
                                        onClick={() => isCurrentMainTask(task.id)}
                                        data-id={task.id}
                                        draggable={true}
                                        >
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

    return (
        <>
        <main 
            className={`kanban-board-main-container ${themeState ? 'light-mode-background' : 'dark-mode-background'}`}>
            {kanbanBoardEl}
            {screenWidth >= 760 ? 
              <section className={`add-new-column ${themeState ? 'light-mode-column' : 'dark-mode-column'}`}>
                <h2 onClick={() => addNewColumn()}>+ Add New Column</h2>
              </section> : ''}
        </main>
        </>
    )
}

