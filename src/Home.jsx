import React, { useContext } from "react";
import Header from "./components/Header";
import KanbanBoard from "./components/KanbanBoard";
import NewTask from "./components/NewTask";
import AdditionalInfo from "./components/AdditionalInfo";
import { DataContext } from "./App";
import EditTask from "./components/EditTask";


export default function Home() {
    const {boards, themeState} = useContext(DataContext)
    return (
        <>
        <Header />
        { boards.find(boards => boards.isOpen) ?
        <>
        <KanbanBoard/>
        <NewTask/>
        <AdditionalInfo/>
        <EditTask/>
        </> 
        : 
        <main className={`no-open-board-container ${themeState ? 'light-mode-background' : 'dark-mode-background'}`}>
            <section className={`no-open-boards ${themeState ? 'light-mode' : 'dark-mode'}`}>
            <h2 className="open-board">No Board Selected</h2>
            </section>
        </main>
        }
        </>
    )
}