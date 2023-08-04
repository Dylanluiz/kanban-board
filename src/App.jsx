import './index.css'
import React, {createContext, useEffect, useState} from 'react'
import Home from './Home'
import {data} from '../data'

const DataContext = createContext()

export default function App() {
  const [themeState, setThemeState] = useState(false)
  const [boards, setBoards] = useState([])

  useEffect(() => {
    const storedData = localStorage.getItem('boards')
    
    if (storedData) {
      const parsedData = JSON.parse(storedData)
      
      if (parsedData.length > 0) {
        setBoards(parsedData)
      } 
    } else {
      setBoards(data.boards)
    }

  }, [])

  useEffect(() => {
    if (boards) {
      localStorage.setItem('boards', JSON.stringify(boards))
    }

  }, [boards])


  useEffect(() => {
    const themeData = localStorage.getItem('theme')

    if (themeData) {
      const parsedTheme = JSON.parse(themeData)

      if (parsedTheme) {
        setThemeState(parsedTheme)
      } 
    } else {
      setThemeState(false)
    }
  }, [])

  useEffect(() => {
    if (!themeState) {
      localStorage.setItem('theme', JSON.stringify(themeState))
    } else {
      localStorage.setItem('theme', JSON.stringify(themeState))
    }
  }, [themeState])


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