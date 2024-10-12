import React, { useState } from 'react'
import App from './App.jsx'
import Buy from './Buy.jsx'

import {BrowserRouter,Routes,Route} from 'react-router-dom'




function Index() {
  const [count, setCount] = useState(0)
  

  return (
  
        <BrowserRouter>
      <Routes>
        
<Route path='/' element={<App/>}/>
<Route path='/buy/:id' element={<Buy/>}/>


      </Routes>
      </BrowserRouter>
      
  )
}

export default Index
