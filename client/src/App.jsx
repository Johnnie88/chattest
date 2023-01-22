import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import"./App.css"
import Welcome from './components/Welcome';
import Navbar from './components/Navbar';
import { useContext } from 'react';
import { ChatContext } from './components/ChatContext';


function App() {

  const {
    loading,
    loadingCustomization,
    open,
    setOpen,
    setCustomizedPrompt,
    customizedInput,
    setCustomizedInput,
    handleCustomization
  } = useContext(ChatContext)


  return (
    <div className='bg-gray-400 min-h-screen'>
      <Navbar/>
      <Welcome/>
    </div>
  
  )
}

export default App;