import React, { useState, useEffect } from 'react';
import './App.css';
import { FaStar } from "react-icons/fa";
import Data from './Data.jsx'
import AOS from 'aos';
import 'aos/dist/aos.css';


function App() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 ,once:true});
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <nav className="navbar">
     <div className="logo"> Zee-Shirts</div> 
        <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
     <li><a href="/">home</a></li>  
 <li><a href="">contact</a></li>
 <li><a href="">feedback</a></li>
        </ul>
      
        <div className="hamburger" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </nav>
      <div className="container">

    
   {Data.map((shirt) => (
            <div key={shirt.id}className='shirt-con' data-aos="fade-down">
              <img src={shirt.image} alt={shirt.name} />
              <p>{shirt.name}</p>
            
              <h3>Price: &#8377;{shirt.price}</h3>
                <span><FaStar/> {shirt.rating}</span>
            </div>
          ))}
 </div>
   </div>
  
  );
}

export default App;