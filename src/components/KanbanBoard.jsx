import React, { useContext, useRef, useState } from "react";
import AdditionalInfo from "./AdditionalInfo";
import { DataContext } from "../App";
import { nanoid } from "nanoid";
import { useEffect } from "react";

export default function KanbanBoard() {
    const {boards, themeState, setBoards} = useContext(DataContext)
    const [screenWidth, setScreenWidth] = useState()
    const draggables = useRef([])
    const containers = useRef([])
    const dargedObj = useRef({})
    const currentContainer = useRef('')
    const ids = boards.map(board => {
      if (board.isOpen) {
        return board.columns.map((column, index) => column.id)
      }
    })[0]
    const [movingObj, setMovingObj] = useState(null)
    const [clientMove, setClientMove] = useState()

  useEffect(() => {
    draggables.current = document.querySelectorAll('.draggable')
    containers.current = document.querySelectorAll('.kanban-board-tasks')
    
    const handelDragStart = e => {
      e.stopPropagation()
      const elDataId = e.target.dataset.id
      const currentElementDragged = boards.map(board => {
        if (board.isOpen) {
          return board.columns.map(column => {
            return column.tasks.find(task => task.id === elDataId)
          }).filter(el => el !== undefined)[0]
        }
      })[0]
      
      dargedObj.current = currentElementDragged
    }

    const handelDragEnd = e => {
      e.stopPropagation()
      if (dargedObj.current.id === e.target.dataset.id) {
        document.querySelector('.is-moving').classList.remove('is-moving')
      setBoards(prevBoards => {
        return prevBoards.map(board => {
          if (board.isOpen) {
            return {
              ...board,
              columns: board.columns.map(column => {
                return {
                  ...column,
                  tasks: column.tasks.filter(task => task !== dargedObj.current)
                }
              })
            }
          } return board
        })
      })

      setBoards(prevBoard => {
        return prevBoard.map(board => {
          if (board.isOpen) {
            return {
              ...board,
              columns: board.columns.map(column => {
                if (column.id === currentContainer.current) {
                  return {
                    ...column,
                    tasks: [...column.tasks, {...dargedObj.current, status: column.name}]
                  }
                }  return column
              })
            }
          }  return board
        })
      })
    }
    setMovingObj(null)
    }

    draggables.current.forEach(draggable => {
      draggable.addEventListener('dragstart', handelDragStart)
      draggable.addEventListener('dragend', handelDragEnd)
      draggable.addEventListener('touchstart', e => {
        if (e.target === draggable) {
          const elDataId = e.target.dataset.id
          draggable.classList.add('is-moving')
          const currentElementDragged = boards.map(board => {
            if (board.isOpen) {
              return board.columns.map(column => {
                return column.tasks.find(task => task.id === elDataId)
              }).filter(el => el !== undefined)[0]
            } else return
          })[0]
          setMovingObj(currentElementDragged)
          dargedObj.current = currentElementDragged
          } else return 
      })

      draggable.addEventListener('touchend', handelDragEnd)
      draggable.addEventListener('touchmove', e => {
        const rect = e.target.getBoundingClientRect()
        e.preventDefault()
        setClientMove(
          {
            left: `${e.targetTouches[0].clientX - rect.y}px`, 
            top: `${e.targetTouches[0].clientY - rect.y}px`,
            position: 'absolute'
          })

        if (e.target === draggable) {
          let filterID = []
        for (let i = 0; i < ids.length; i++) {
          if (e.touches[0].clientX > (i * 330)) {
            filterID = []
            filterID.push(ids[i])
            
          } 
        }
        currentContainer.current = filterID[0]
        } else return 
      })
    })

    containers.current.forEach(container =>{
      container.addEventListener('dragover', e => {
        e.preventDefault()
        const elData = container.dataset.id
        currentContainer.current = elData
      })

    })

    return () => {
      draggables.current.forEach(draggable => {
        draggable.removeEventListener('dragstart', handelDragStart)
        draggable.removeEventListener('dragend', handelDragEnd)
        draggable.removeEventListener('touchstart', e => {
          if (e.target === draggable) {
            const elDataId = e.target.dataset.id
            const currentElementDragged = boards.map(board => {
              if (board.isOpen) {
                return board.columns.map(column => {
                  return column.tasks.find(task => task.id === elDataId)
                }).filter(el => el !== undefined)[0]
              } else return
          })[0]
          setMovingObj(currentElementDragged)
          dargedObj.current = currentElementDragged
          } 
        })

        draggable.removeEventListener('touchend', handelDragEnd)
      })
    }

  }, [boards, setBoards])

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
        name: "next",
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
                        <div className="kanban-board-tasks" data-id={coloumn.id}>
                            {coloumn.tasks.map((task, index) => {
                                let count = 0
                                return (
                                  <>
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
                                  </>
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
            {movingObj ? 
              <div style={{...clientMove}}>
                <div 
                      className={`kanban-subtask-container draggable ${themeState ? 'light-mode' : 'dark-mode'}`}
                      draggable={true}
                      >
                  <h4 className={`task-title ${themeState ? 'light-mode' : 'dark-mode'}`}>{movingObj.title}</h4>  
                  {movingObj.subtasks.length > 0 ? 
                  <p className="tasks-subtasks">{
                  movingObj.subtasks.map(subtask => { 
                    let count = 0
                      if (subtask.isCompleted) {
                         
                  }
                  })}{} of {movingObj.subtasks.length} subtasks</p> : <p className="no-subtask-text">- No subtasks</p>}
                  </div> 
              </div> 
              : ''}
            {screenWidth >= 760 ? 
              <section className={`add-new-column`}>
                <div className={`inner-new-column ${themeState ? 'light-mode-column' : 'dark-mode-column'}`}>
                  <h2 onClick={() => addNewColumn()}>+ Add New Column</h2>
                </div>
              </section> : ''}
        </main>
        </>
    )
}

