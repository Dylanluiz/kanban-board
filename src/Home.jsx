import React, { useContext, useState } from "react";
import Header from "./components/Header";
import KanbanBoard from "./components/KanbanBoard";
import NewTask from "./components/NewTask";
import AdditionalInfo from "./components/AdditionalInfo";
import { DataContext } from "./App";
import EditTask from "./components/EditTask";
import NewBoard from "./components/NewBoard";
import EditBoard from "./components/EditBoard";
import Sidebar from "./components/Sidebar";
import {useTransition, animated, config, useSpring} from '@react-spring/web'
import SidePopUp from "./components/SidePopUp";
import useMeasure from "react-use-measure";



export default function Home() {
    const {boards, themeState} = useContext(DataContext)
    const [areBoards, setAreBoards] = useState(boards.length > 0 ? true : false)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const [isSidebar, setIsSidebar] = useState(false)
    const sidebarTransition = useTransition(isSidebar, {
        from: {opacity: 0, x: -200},
        enter: {opacity: 1, x: 0},
        leave: {opacity: 1, x: -400},
        config: {duration: 400}
    })
    const [ref, {width}] = useMeasure()
    const props = useSpring({width: isSidebar ? 250 : 0})
    const sidebarPopupTransition = useTransition(isSidebar, {
        from: {opacity: 0, x: -300},
        enter: {opacity: 1, x: -200},
        leave: {opacity: 1, x: -200},
        config: {duration: 200}
    })

    function openCreateBoard() {
        document.querySelector('.new-board-modal').showModal()
    }

    window.addEventListener('resize', () => setScreenWidth(window.innerWidth))

    return (
        <div className={`main-container ${themeState ? "light-mode-background": "dark-mode-background"}`}>
        <div className="header-newboard">
        <Header />
        <NewBoard/>
        </div>
        { boards.find(boards => boards.isOpen) ?      
        <>
        {screenWidth >= 768 ? 
        <div className="side-bar" ref={ref}>
            <animated.div style={props} className='width-changing-sidebar-div'>
            {sidebarTransition((style, item) => {
                return item ? <animated.div
                        style={style}
                        className='animated-sidebar'
                    >
                    <Sidebar
                        isSidebar={isSidebar}
                        setIsSidebar={setIsSidebar}
                    />
                </animated.div> : ''
            })}
            </animated.div>
            <KanbanBoard/>
            {sidebarPopupTransition((style, item) => {
                return item ? '' 
                : 
                <animated.div style={style} className='animated-popup'>
                    <SidePopUp
                    setIsSidebar={setIsSidebar}
                    isSidebar={isSidebar}
                />
                </animated.div>
            })}
        </div> 
        : 
        <>
           
            <KanbanBoard/> 
        </>}
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
        </div>
    )
}