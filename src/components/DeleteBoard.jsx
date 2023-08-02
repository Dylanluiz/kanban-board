import React, { useContext } from "react";
import { DataContext } from "../App";



export default function DeleteBoard({id}) {
    const {setBoards, themeState} = useContext(DataContext)

    function removeBoard() {
        setBoards(prevBoard => {
            return prevBoard.filter(board => {
                if (board.id === id) {
                    return
                } else return board
            })
        })
        document.querySelector('.delete-board-dialog').close()
    }

    function closeDeleteBoard() {
        document.querySelector('.delete-board-dialog').close()
    }

    return (
        <dialog className={`delete-board-dialog ${themeState ? 'light-mode': 'dark-mode'}`}>
            <h4>Delete this board?</h4>
            <p>Are you sure you want to delete the ‘Platform Launch’ board? This action will remove all columns and tasks and cannot be reversed.</p>
            <div className="delete-board-btn-container">
                <button onClick={() => removeBoard()} className="board-btn--delete">Delete</button>
                <button onClick={() => closeDeleteBoard()} className={`board-btn-cancel ${themeState ? 'light-mode-form-btn' : 'dark-mode-form-btn'}`}>Cancel</button>
            </div>
        </dialog>
    )
}