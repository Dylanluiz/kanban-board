import './index.css'
import React, {createContext, useEffect, useState} from 'react'
import Home from './Home'
import { data } from '../data'

const DataContext = createContext()

export default function App() {
  const [boards, setBoards] = useState(data.boards)
  const kanbanBoards = document.querySelector('.kanban-boards')
  const [themeState, setThemeState] = useState(false)

  function switchTheme() {
      setThemeState(prevState => !prevState) 
  }

  const value = {boards, themeState, switchTheme, setBoards}

  return (
    <DataContext.Provider value={value}>
      <Home/>
    </DataContext.Provider>
  )
}

export {DataContext}