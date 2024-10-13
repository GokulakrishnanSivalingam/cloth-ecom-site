import React, { useState, useEffect } from 'react';
import './Pay.css';
import Data from './Data.jsx';
import { HiOutlinePlusSm } from "react-icons/hi";
import { useParams, useLocation } from 'react-router-dom';

function Pay() {
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams(); 
  const location = useLocation(); 
  const shirt = Data.find(shirt => shirt.id === parseInt(id));


  const { address, selectedColor, selectedSize } = location.state || {};

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    document.body.style.width = '95vw';
    return () => {
      document.body.style.width = '';
    };
  }, []);
  const  handlesubmit =(e)=>{
    e.preventdefault();

}
  return (
    <div>
      <nav className="navbar">
        <div className="logo"> Zee-Shirts</div> 
        <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
          <li><a href="/">home</a></li>  
          <li><a href="#">contact</a></li>
          <li><a href="#">feedback</a></li>
        </ul>
        <div className="hamburger" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div> 
      </nav>

      <div className="pay-con">
        <div className="pay-img">
          <img src={shirt.image} alt={shirt.name} />
        </div>  
        <div className="pay-info">
          <p>{shirt.name}</p>
          <h3>&#8377;{shirt.price}</h3>
        </div>
      </div>

      <div className="pay-details">
        <h1>details</h1>
        <p>Address: {address}</p>
        <p>Color: {selectedColor}</p>
        <p>Size: {selectedSize}</p>
      </div>
     
        <div className="address">
            <input type="text" placeholder='  Enter your state ' required/>
         
      <input type="text" placeholder='  Enter your pincode' required/>
      
        <input type="text" placeholder='  Enter your pincode'  maxLength={6} required/>
        
        </div> 
       <div className="buys"> <a href="https://razorpay.me/@gokulakrishnan620"><button  onClick={handlesubmit}> procced to pay</button></a></div>
    </div>
  );
}

export default Pay;
