import React, { useContext } from "react";
import { DataContext } from "../App";

export default function DeleteBoard({id, modalName}) {
    const {setBoards, themeState} = useContext(DataContext)

    function removeBoard() {
        setBoards(prevBoard => {
            return prevBoard.filter(board => {
                if (board.id === id && modalName == board.name) {
                    return
                } else return board
            })
        })
        document.querySelector(`.${modalName}-board`).close()
    }

    function closeDeleteBoard() {
        document.querySelector(`.${modalName}-board`).close()
    }
    console.log(id)
    return (
        <dialog className={`delete-board-dialog ${modalName}-board ${themeState ? 'light-mode': 'dark-mode'}`}>
            <h4>Delete this board?</h4>
            <p>Are you sure you want to delete the ‘Platform Launch’ board? This action will remove all columns and tasks and cannot be reversed.</p>
            <div className="delete-board-btn-container">
                <button onClick={() => removeBoard()} className="board-btn--delete">Delete</button>
                <button onClick={() => closeDeleteBoard()} className={`board-btn-cancel ${themeState ? 'light-mode-form-btn' : 'dark-mode-form-btn'}`}>Cancel</button>
            </div>
        </dialog>
    )
}