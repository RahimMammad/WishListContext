import React from 'react'
import Home from './pages/Home'
import "./App.scss"
import { WishListProvider } from './context/WishListContext'

const App = () => {
  return (
    <WishListProvider>
      <Home />
    </WishListProvider>
  )
}

export default App