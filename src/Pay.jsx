import React, { useState, useEffect } from 'react';
import './Pay.css';
import Data from './Data.jsx';
import { useParams, useLocation } from 'react-router-dom';

function Pay() {
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams(); 
  const [state, setState] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState('');
  const [pinError, setPinError] = useState('');
  const [nameError, setNameError] = useState('');
  const [pin, setPin] = useState('');
  const [numberError, setNumberError] = useState("");
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
  
  const validateForm = () => {
    let isValid = true;

    if (state === '') {
      setNameError("Please fill the field");
      isValid = false;
    } else {
      setNameError('');
    }

    if (number === '') {
      setNumberError("Please fill the field");
      isValid = false;
    } else if (number.length !== 10) {
      setNumberError("Please enter a 10-digit number");
      isValid = false;
    } else {
      setNumberError('');
    }

    if (email === '') {
      setEmailError("Please fill the field");
      isValid = false;
    } else {
      setEmailError('');
    }

    if (pin === '') {
      setPinError("Please fill the field");
      isValid = false;
    } else {
      setPinError('');
    }

    return isValid;
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    if (!res) {
      alert('Payment failed, are you online?');
      return;
    }

    const result = await fetch('https://cloth-ecom-site.onrender.com/create-order', {
      method: 'POST',
      body: JSON.stringify({ amount: shirt.price * 100 }),
      headers: { 'Content-Type': 'application/json' },
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
      prefill: { name: `${state}`, email: `${email}`, contact: `${number}` },
      theme: { color: '#3399cc' },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div>
      <nav className="nav">
        <div className="logo">Zee-Shirts</div>
        <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
          <li><a href="/">Home</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">Feedback</a></li>
        </ul>
        <div className="hamburger" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </nav>

      <div className="pay-container">
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
          <h1>Details</h1>
          <p>Address: {address}</p>
          <p>Color: {selectedColor}</p>
          <p>Size: {selectedSize}</p>
        </div>
      </div>

      <form onSubmit={displayRazorpay}>
        <center>
          <div className="address">
            <div className="add-con1">
              <input type="text" placeholder="Enter your name" value={state} onChange={(e) => setState(e.target.value)} />
              <div className="error" align="left"><p>{nameError}</p></div>  
              <input type="number" placeholder="Enter your number" value={number} onChange={(e) => setNumber(e.target.value)} />
              <div className="error" align="left"><p>{numberError}</p></div>
            </div>
            <div className="add-con2">
              <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <div className="error" align="left"><p>{emailError}</p></div>
              <input type="text" placeholder="Enter your pincode (optional)" maxLength={6} value={pin} onChange={(e) => setPin(e.target.value)} />
              <div className="error" align="left"><p>{pinError}</p></div>
            </div>
          </div>
          <div className="buys">
            <button type="submit">Proceed to Pay</button>
          </div>
        </center>
      </form>
    </div>
  );
}

export default Pay;
