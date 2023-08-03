import './index.css'
import React, {createContext, useEffect, useState} from 'react'
import Home from './Home'
import {data} from '../data'

const DataContext = createContext()

export default function App(props) {
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


  function switchTheme() {
      setThemeState(prevState => !prevState) 
  }

  function moveElements(id) {

  }


  const value = {boards, themeState, switchTheme, setBoards}

  return (
    <DataContext.Provider value={value}>
      <Home/>
    </DataContext.Provider>
  )
}

export {DataContext}