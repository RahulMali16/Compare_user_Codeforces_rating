
import React from 'react'
import Input from './components/Input.jsx'
import { Route,Routes } from 'react-router-dom'
import Compare from './components/Compare/Compare.jsx'
import Search from './components/Compare/Search.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const App = () => {
  return (
    <div>
     <ToastContainer></ToastContainer>
      <Routes>
        <Route path='/'  element={<Input></Input>}></Route>
        <Route path='/Compare'  element = {<Compare/>}></Route>
        <Route path='/Search'  element = {<Search/>}></Route>

      </Routes>


    </div>
  )
}

export default App
