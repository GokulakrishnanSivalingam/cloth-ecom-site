import React, { useState } from 'react'
import App from './App.jsx'
import Buy from './Buy.jsx'
import Pay from "./Pay.jsx"
import {BrowserRouter,Routes,Route} from 'react-router-dom'




function Index() {
  const [count, setCount] = useState(0)
  

  return (
  
        <BrowserRouter>
      <Routes>
        
<Route path='/' element={<App/>}/>
<Route path='/buy/:id' element={<Buy/>}/>
<Route path='/pay/:id' element={<Pay/>}/>


      </Routes>
      </BrowserRouter>
      
  )
}

export default Index
