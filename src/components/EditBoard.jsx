import React from "react";

export default function EditBoard() {
    return (
        <dialog >
            <form>
                <h2 className="edit-board">Edit Board</h2>
                <label htmlFor="boardName">Board Name</label>
                <input 
                    type="text"
                    name='boardName'
                     />
            </form>     
        </dialog>
    )
}