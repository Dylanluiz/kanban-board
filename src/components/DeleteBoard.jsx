import React, { useContext } from "react";
import { DataContext } from "../App";

export default function DeleteBoard({id, modalName}) {
    const {setBoards, themeState, boards} = useContext(DataContext)

    const modifiedName = modalName.split(' ').filter(l => l !== '').join('')

    function removeBoard() {
        setBoards(prevBoard => {
            return prevBoard.filter(board => {
                if (board.id === id && modalName == board.name) {
                    return
                } else return board
            })
        })
        document.querySelector(`.${modifiedName}-board`).close()

        setBoards(prevBoard => {
            const hasOpenBoard = prevBoard.some(board => board.isOpen)

            if (hasOpenBoard) {
                return prevBoard
            } else {
                return prevBoard.map((board, index) => {
                    if (index === 0) {
                        return {
                            ...board,
                            isOpen: true
                        }
                    } return board
                })
            }
        })

    }

    function closeDeleteBoard() {
        document.querySelector(`.${modifiedName}-board`).close()
    }

    return (
        <dialog className={`delete-board-dialog ${modifiedName}-board ${themeState ? 'light-mode': 'dark-mode'}`}>
            <h4>Delete this board?</h4>
            <p>Are you sure you want to delete the <span style={{fontWeight: "700", color: "#635FC7"}}>‘{modalName}’</span> board? This action will remove all columns and tasks and cannot be reversed.</p>
            <div className="delete-board-btn-container">
                <button onClick={() => removeBoard()} className="board-btn--delete">Delete</button>
                <button onClick={() => closeDeleteBoard()} className={`board-btn-cancel ${themeState ? 'light-mode-form-btn' : 'dark-mode-form-btn'}`}>Cancel</button>
            </div>
        </dialog>
    )
}