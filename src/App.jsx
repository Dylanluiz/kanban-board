import './index.css'
import React, {createContext, useEffect, useState} from 'react'
import Home from './Home'
import { data } from '../data'

const DataContext = createContext()

export default function App() {
  const [boards, setBoards] = useState(data.boards)
  const kanbanBoards = document.querySelector('.kanban-boards')
  const [themeState, setThemeState] = useState(false)

  const updateOpenBoard = (id) => {
    setBoards(prevBoard => {
     return prevBoard.map(board => {
        if (board.id === id) {
          return {
            ...board,
            isOpen: true
          }
        } else {
          return {
            ...board, 
            isOpen: board.isOpen = false}
        }
      })
    })
   setTimeout(() => {
    kanbanBoards.close()
   }, 100);
  }

  function switchTheme() {
      setThemeState(prevState => !prevState) 
  }

  useEffect(() => {
    setBoards(prevBoard => {
      return prevBoard.map((board, index) => {
        return {...board, id: index + 1}})
    })

  }, [])

  const value = {boards, updateOpenBoard, themeState, switchTheme, setBoards}

  return (
    <DataContext.Provider value={value}>
      <Home/>
    </DataContext.Provider>
  )
}

export {DataContext}