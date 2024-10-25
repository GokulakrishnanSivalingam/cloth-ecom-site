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
    document.body.style.backgroundColor = 'rgb(220, 216, 216)';
    return () => {
      document.body.style.width = '';
    };
  }, []);
 

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    if (!res) {
      alert('payment failed, Are you online?');
      return;
    }

    
    const result = await fetch('https://cloth-ecom-site.onrender.com/create-order', {
      method: 'POST',
      body: JSON.stringify({ amount: shirt.price *100 }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await result.json();
    if (!data) {
      alert('Server error. Are you online?');
      return;
    }

    const options = {
      key: process.env.key_id,
      amount: data.amount, 
      currency: data.currency,
      name: shirt.name,
      description: 'Test Transaction',
      order_id: data.id, 
      handler: function (response) {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        alert(`Order ID: ${response.razorpay_order_id}`);
        alert(`Signature: ${response.razorpay_signature}`);
      },
      prefill: {
        name: 'Customer Name',
        email: 'customer@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

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
     <center>
        <div className="address">
            <input type="text" placeholder='  Enter your state ' value="Tamil nadu" required/>
         
      <input type="text" placeholder='  Enter your city  (optional)' required/>
      
        <input type="text" placeholder='  Enter your pincode  (optional)'  maxLength={6} required/>
        
        </div> 
       <div className="buys"> <button  onClick={displayRazorpay}> procced to pay</button></div></center>
    </div>
  );
}

export default Pay;
