import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../App";

export default function EditBoard() {
    const {themeState, setBoards, boards} = useContext(DataContext)
    const [currentBoard, setCurrentBoard] = useState()

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

    function handelSubmit(id) {
        setBoards(prevBoard => {
            const updatedBoards = prevBoard.map(board => {
                if (board.id === id) {
                    return {
                        currentBoard
                    }
                } return board
            })
            return [updatedBoards]
        })
    }

    return (
        <dialog className="edit-current-board-modal">
          { currentBoard && <form onSubmit={() => handelSubmit(currentBoard.id)}>
                <h2 className="edit-board">Edit Board</h2>
                <label htmlFor="boardName">Board Name</label>
                <input 
                    type="text"
                    name='name'
                    value={currentBoard.name}
                    onChange={handelChange}
                     />

                <label htmlFor="">Board Columns</label>
                
                {
                   currentBoard.columns.map(column => {
                    return (
                        <>          
                        <input 
                            type="text"
                            value={column.name}
                            name="name"
                            onChange={() => handelColumnChange(event, column.id)}
                        />
                        <input 
                            type="color" 
                            value={column.color}
                            name='color'
                            onChange={() => handelColumnChange(event, column.id)}    
                        />
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                <rect x="12.7279" width="3" height="18" transform="rotate(45 12.7279 0)" fill="#828FA3"></rect>
                                <rect y="2.12109" width="3" height="18" transform="rotate(-45 0 2.12109)" fill="#828FA3"></rect>
                            </svg>
                        </div>
                        </>
                    )
                   })
                }
                <button type='button'>+ Add New Column</button>
                <button type='submit'>Save Changes</button>
            </form>}   
        </dialog>
    )
}