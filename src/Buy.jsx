import React, { useState, useEffect } from 'react';
import './App.css';
import Data from './Data.jsx'
import { HiOutlinePlusSm } from "react-icons/hi";
import {useParams} from 'react-router-dom';

function Buy() {
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const shirt = Data.find(shirt => shirt.id === parseInt(id));

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
  
    document.body.style.width = '95vw';

   
    return () => {
      document.body.style.width = '';
    };
  }, []);


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
        <div className="buy-con">
        <img src={shirt.image}alt="" />
        </div>
        
            
              <div className="buy-price"><p>{shirt.name}</p><h3>&#8377;{shirt.price}</h3></div>
        <div className="color">
            <h2>color</h2>
            <button >red</button>
            <button>blue</button>
            <button>green</button>
            <button>white</button>
        </div>
        <div className="size" >
        <h2>size</h2>
            <button >S</button>
            <button>M</button>
            <button>L</button>
        
            <button>XL</button>
            <button>XXL</button>
        </div>
        <div className="addr">
          <input type="text" placeholder='enter address'/>
          <button><HiOutlinePlusSm/></button>
        </div>
      <div className="buy">
        <button>buy</button>
        <button>add to cart</button>
      </div>
    </div>
  );
}

export default Buy;