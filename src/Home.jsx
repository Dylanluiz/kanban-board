import React, { useContext, useState } from "react";
import Header from "./components/Header";
import KanbanBoard from "./components/KanbanBoard";
import NewTask from "./components/NewTask";
import AdditionalInfo from "./components/AdditionalInfo";
import { DataContext } from "./App";
import EditTask from "./components/EditTask";
import NewBoard from "./components/NewBoard";
import EditBoard from "./components/EditBoard";
import DeleteBoard from "./components/DeleteBoard";

export default function Home() {
    const {boards, themeState} = useContext(DataContext)
    const [areBoards, setAreBoards] = useState(boards.length > 0 ? true : false)

    function openCreateBoard() {
        document.querySelector('.new-board-modal').showModal()
    }

    return (
        <>
        <Header />
        <NewBoard/>
        { boards.find(boards => boards.isOpen) ?
        <>
        <KanbanBoard/>
        <NewTask/>
        <AdditionalInfo/>
        <EditTask/>
        <EditBoard/>
        </> 
        : 
        <main className={`no-open-board-container ${themeState ? 'light-mode-background' : 'dark-mode-background'}`}>
            <div className="inner-board-container">
                <p>There are currently no boards, Create one to get started.</p>
                <section className={`no-open-boards`}>
                    <h2 className="open-board" onClick={() => openCreateBoard()}>Create a Board</h2>
                </section>
            </div>
        </main>
        }
        </>
    )
}