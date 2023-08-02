import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../App";
import { nanoid } from "nanoid";
import { useTransition, animated } from "@react-spring/web";
import {IoIosClose} from 'react-icons/io'

export default function EditBoard() {
    const {themeState, setBoards, boards} = useContext(DataContext)
    const [currentBoard, setCurrentBoard] = useState()
    const [isColumnError, setIsColumnError] = useState(false)
    const [confirmDeleteColumn, setConfirmDeleteColumn] = useState(false)
    const [isShowing, setIsShowing] = useState(false)
    const transitionColumnError = useTransition(isColumnError, {
        from: {opacity: 0},
        enter: {opacity: 1},
        leave: {opacity: 0}
    })
    const transitionColumnDelete = useTransition(isShowing, {
        from: {opacity: 0},
        enter: {opacity: 1},
        leave: {opacity: 0}
    })

    useEffect(() => {
        const openBoard = boards.find(board => board.isOpen)

        setCurrentBoard(openBoard)
    }, [boards])

    function handelChange(e) {
        const {value, name} = e.target

        setCurrentBoard(prevBoard => {
            return {
                ...prevBoard,
                [name] : value
            }
        })
    }

    function handelColumnChange(e, id) {
        const {name, value} = e.target

        setCurrentBoard(prevBoard => {
            const updatedColumn = prevBoard.columns.map(column => {
                if (column.id === id) {
                    return {
                        ...column,
                        [name] : value
                    }
                } return column
            })
            return {...prevBoard, columns: updatedColumn}
        })
    }

    function handelSubmit(id, e) {
        e.preventDefault()
        
        if (currentBoard.columns.length === 0) {
            setIsColumnError(prev => true)
            setTimeout(() => {
                setIsColumnError(prev => false)
            }, 2000);
            return
        }

        setBoards(prevBoard => {
            const updatedBoards = prevBoard.map(board => {
                if (board.id === id) {
                    return {
                       ...currentBoard 
                    }
                } else return board
            })
            return [...updatedBoards]
        })
        document.querySelector('.edit-current-board-modal').close()
    }

    function removeColumn(id) {
        setCurrentBoard(prevBoard => {
            const changedBoards = prevBoard.columns.map(column => {
                if (column.id === id) {
                    return
                } return column
            }).filter(column => column !== undefined)
            return {...prevBoard, columns: changedBoards}
        })
    }

    function confirmDelete(id) {
        if (confirmDeleteColumn) {
            removeColumn(id)
            setIsShowing(prev => false)
        } else if (!confirmDeleteColumn) {
            let hasTasks = false
            currentBoard.columns.map(col => {
                if (col.id === id && col.tasks.length > 0) {
                    setIsShowing(prev => true)
                    setCurrentBoard(prevBoard => {
                        const update = prevBoard.columns.map(column => {
                                if (column.id === id) {
                                    return {
                                        ...column,
                                        isDelete : true
                                    }
                                } else {
                                    return {
                                        ...column,
                                        isDelete : false
                                    }
                                }
                            })
                            return {...prevBoard, columns : update}
                    })
                    hasTasks = true
                    return true
                } else {
                    return false
                }
            })
                if (!hasTasks) {
                    removeColumn(id)
                }
        } 
    }

    function closeEditBoard() {
        document.querySelector('.edit-current-board-modal').close()
    }

    function addColumn() {
        const newColumn =  {
            name: "",
            id: nanoid(),
            color: '#FFFFFF',
            isDelete: false,
            tasks: []
          }
        setCurrentBoard(prevBoard => {
            const addedColumn = [...prevBoard.columns, newColumn]
            return {...prevBoard, columns: addedColumn}
        })
    }

    return (
        <dialog className={`edit-current-board-modal ${themeState ? 'light-mode' : 'dark-mode'}`}>
            <button type="button" onClick={() => closeEditBoard()} className="close-add-new-task-modal-btn">
                <IoIosClose />
            </button>
          { currentBoard && 
            <form 
                onSubmit={() => handelSubmit(currentBoard.id, event)} 
                className={`edit-current-board--form`}
                >

                <h2 className="edit-board">Edit Board</h2>
                <label htmlFor="board-name" className="edit-board-name-label">Board Name</label>
                <input 
                    type="text"
                    name='name'
                    value={currentBoard.name}
                    onChange={handelChange}
                    className={`board-name-input ${themeState ? 'light-mode' : 'dark-mode'}`}
                    id="board-name"
                     />

                <label htmlFor="column" className="edit-baord-column-label">Board Columns</label>
                <div className="animated-div">
                    {transitionColumnError((style, item) => {
                        return item ? 
                            <animated.div
                                style={style}
                                className={`new-board--error-no-column ${themeState ? 'light-mode-background' : 'dark-mode-background'}`}
                            >
                                <p>there needs to be atleast on column</p>
                            </animated.div> : ''})
                    }
                </div>
                {
                   currentBoard.columns.map(column => {
                    return (
                        <section className="board-column-edit-wrapper" key={column.id}>          
                        <input 
                            type="text"
                            value={column.name}
                            name="name"
                            id='column'
                            className={`board-column-edit-input ${themeState ? 'light-mode' : 'dark-mode'}`}
                            onChange={() => handelColumnChange(event, column.id)}
                        />
                        <input 
                            type="color" 
                            value={column.color}
                            name='color'
                            onChange={() => handelColumnChange(event, column.id)}    
                        />
                       {column.isDelete && column.tasks.length > 0 ? <div className="animated-div-edit-board">
                            {transitionColumnDelete((style, item) => {
                                return item ?
                                <animated.div
                                    style={style}
                                    className={`new-board--error-has-tasks ${themeState ? 'light-mode-background' : 'dark-mode-background'}`}
                                >
                                    <p>Are you sure you want to delete this column by deleting this column you will loose all tasks associated with it.</p>
                                    <div className="new-board-has-tasks-error">
                                        <button type="button" className="close-edit" onClick={() => removeColumn(column.id)}>Delete Column</button>
                                        <button type='button' onClick={() => setIsShowing(prev => !prev)} className={`save-edit ${themeState ? 'light-mode-form-btn' : 'dark-mode-form-btn'}`}>Take me back</button>
                                    </div>
                                </animated.div> : ''
                            })}
                        </div> : ''}
                        <button type='button' className="remove-column-btn" onClick={() => confirmDelete(column.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                <rect x="12.7279" width="3" height="18" transform="rotate(45 12.7279 0)" fill="#828FA3"></rect>
                                <rect y="2.12109" width="3" height="18" transform="rotate(-45 0 2.12109)" fill="#828FA3"></rect>
                            </svg>
                        </button>
                        </section>
                    )
                   })
                }
                <button 
                    type='button' 
                    className={`add-column-btn 
                                ${themeState ? 'light-mode-form-btn' : 'dark-mode-form-btn'}`}
                    onClick={() => addColumn()}>
                        + Add New Column</button>
                <button type='submit' className="create-board-btn">Save Changes</button>
            </form>}   
        </dialog>
    )
}