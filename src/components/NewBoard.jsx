import React, { useContext, useState } from "react";
import { nanoid } from "nanoid";
import { DataContext } from "../App";
import { animated, useTransition } from "@react-spring/web";
import {IoIosClose} from 'react-icons/io'

export default function NewBoard() {
    const {themeState, setBoards, boards} = useContext(DataContext)
    const [isNoName, setIsNoName] = useState(false)
    const [isNoColumn, setIsNoColumn] = useState(false)
    const [newBoard, setNewBoard] = useState({name: "", id: nanoid(), isOpen: true, columns: [{name: "Now", id: nanoid(), color: '#FFFFFF', isDelete: false, tasks: []}, {name: "Next", id: nanoid(), color: '#FFFFFF', isDelete: false, tasks: []}]})
    const isNoNameTransition = useTransition(isNoName, 
        {
            from: {opacity: 0},
            enter: {opacity: 1},
            leave: {opacity: 0}
        })
    const isNoColumnTransition = useTransition(isNoColumn, 
        {
            from: {opacity: 0},
            enter: {opacity: 1},
            leave: {opacity: 0}
        })

    function handelSubmit(e) {
        e.preventDefault()

        if (newBoard.name === '') {
            setIsNoName(prevState => true)
            setTimeout(() => {
                setIsNoName(prevState => false)
            }, 2000)
            return
        } 
        else if (newBoard.columns.length === 0) {
            setIsNoColumn(prevState => true)
            setTimeout(() => {
                setIsNoColumn(prevState => false)
            }, 2000)
            return 
        }

        setBoards(prevBoard => {
            const updatedIsOpen = prevBoard.map(board => {
                return {...board, isOpen: false}
            })
            return [...updatedIsOpen, newBoard]
        })
        document.querySelector('.new-board-modal').close()
        setNewBoard(prevBoard => ({
            name: "",
            id: nanoid(),
            isOpen: true,
            columns: [
              {
                name: "Now",
                id: nanoid(),
                color: '#FFFFFF',
                isDelete: false,
                tasks: []
              }, 
              {
                name: "Next",
                id: nanoid(),
                color: '#FFFFFF',
                isDelete: false,
                tasks: []
              }
            ]
          }))

    }

    function handelChange(e) {
        const {name, value} = e.target
        setNewBoard(prevBoard => {
            return {
                ...prevBoard,
                [name] : value
            }
        })
    }

    function handelColumns(e, id) {
        const {name, value} = e.target
        setNewBoard(prevBoard => {
            const updateColumn = prevBoard.columns.map(column => {
                if (column.id === id) {
                    return {
                        ...column,
                        [name] : value
                    }
                } return column
            })
            return {...prevBoard, columns: updateColumn}
        })
    }

    function handelChangeColor(e, id) {
        const {value} = e.target 
        setNewBoard(prevBoards => {
            const updatedColumnColor = prevBoards.columns.map(column => {
                if (column.id === id) {
                    return {
                        ...column,
                        color: value
                    }
                } return column
            }) 
            return {...prevBoards, columns: updatedColumnColor}
        })
    }

    function removeColumn(id) {
        setNewBoard(prevBoard => {
            const updatedColumns = prevBoard.columns.map(column => {
               if (column.id === id) {
                return 
               } return column
            }).filter(el => el !== undefined)
            return {...prevBoard, columns : updatedColumns}
        })
    }

    function addColumn() {
        const newColumn = {
            name: "Next",
            id: nanoid(),
            color: '#FFFFFF',
            isDelete: false,
            tasks: []
          }
        setNewBoard(prevBoard => {
            const updatedColumns = [...prevBoard.columns, newColumn]
            return {...prevBoard, columns: updatedColumns}
        })
    }

    function closeCreateNewBoard() {
        document.querySelector('.new-board-modal').close()
    }

    return (
        <dialog className={`new-board-modal ${themeState ? "light-mode" : "dark-mode"}`}>
            <button type="button" onClick={() => closeCreateNewBoard()} className="close-add-new-task-modal-btn">
                <IoIosClose />
            </button>
            <form action="" className="new-board-form" onSubmit={handelSubmit}>
                <h2 className="new-board--header">Add New Board</h2>

                <label htmlFor="new-board-title" className="new-board--title-label">Board Name</label>
                <div>
                    {isNoNameTransition((style, item) => 
                    {
                        return item ? 
                            <animated.div style={style} className={`new-board--error-no-name ${themeState ? 'light-mode-background' : 'dark-mode-background'}`}>
                                <p>please enter name</p>
                            </animated.div> 
                            : '' 
                        
                    })}
                </div>
                <input 
                    id="new-board-title"
                    type="text" 
                    placeholder="e.g  Web design"
                    className={`new-board--title-input ${themeState ? 'light-mode' : 'dark-mode'}`}
                    name='name'
                    value={newBoard.name}
                    onChange={handelChange}
                    />
                    
                <div className="new-board-column-container">
                    <label htmlFor="" className="new-board--column-label">Board Columns</label>
                    <div>
                        {isNoColumnTransition((style, item) => 
                        {
                            return item ? 
                                <animated.div style={style} className={`new-board--error-no-column ${themeState ? 'light-mode-background' : 'dark-mode-background'}`}>
                                    <p>There needs to be atleast one column</p>
                                </animated.div> 
                                : '' 
                            
                        })}
                    </div>
                    { 
                        newBoard.columns.map(column => {
                            return (
                                <div className="new-board-column-inner-container" key={column.id}>
                                    <input
                                    value={column.name}
                                    name='name'
                                    onChange={() => handelColumns(event, column.id)}
                                    className={`new-board--column-input ${themeState ? 'light-mode' : 'dark-mode'}`}
                                    />
                                    <input 
                                        type="color" 
                                        className='column-color-select' 
                                        name="color" 
                                        value={column.color}
                                        onChange={() => handelChangeColor(event, column.id)} />
                                    <button type='button' onClick={() => removeColumn(column.id)} className='remove-subtask'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                        <rect x="12.7279" width="3" height="18" transform="rotate(45 12.7279 0)" fill="#828FA3"/>
                                        <rect y="2.12109" width="3" height="18" transform="rotate(-45 0 2.12109)" fill="#828FA3"/>
                                        </svg>
                                    </button>
                                </div>
                            )
                        })
                    } 
                    <button type='button' onClick={() => addColumn()} className={`add-column-btn ${themeState ? 'light-mode-form-btn' : 'dark-mode-form-btn'}`}>+ Add New Column</button> 
                </div>
                
                <button type='submit' className="create-board-btn">Create New Board</button>
            </form>
        </dialog>
    )
}