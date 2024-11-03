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
  const [error, setError] = useState('');
  const [numerror, setNumerror] = useState('');
  
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
    let success = true;
    
    if (state === '' || number === '' || email === '') {
      setError("Please fill all the fields");
      success = false;
    } else if (number.length !== 10) {
      setNumerror("Please enter a 10-digit number");
      success = false;
    } else {
      success = true;
    }
    
    if (!success) return;

    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    if (!res) {
      alert('Payment failed. Are you online?');
      return;
    }

    const result = await fetch('https://cloth-ecom-site.onrender.com/create-order', {
      method: 'POST',
      body: JSON.stringify({ amount: shirt.price * 100 }),
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
        name: state,
        email: email,
        contact: number,
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
      {/* Your navigation and other components */}
      <div className="address">
        <input type="text" placeholder="Enter your name" value={state} onChange={(e) => setState(e.target.value)} />
        <div className="error"><p>{error}</p></div>

        <input type="number" placeholder="Enter your phone number" value=`+91 ${number}` onChange={(e) => setNumber(e.target.value)} />
        <div className="error"><p>{numerror}</p></div>

        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <div className="error"><p>{error}</p></div>
        
        <input type="text" placeholder="Enter your pincode (optional)" maxLength={6} />
      </div>
      <button onClick={displayRazorpay}>Proceed to Pay</button>
    </div>
  );
}

export default Pay;

  const[state,setState]=useState("");
  const[number,setNumber]=useState("");
  const[email,setEmail]=useState("");
  const[error,setError]=useState('');
   const[numerror,setNumerror]=useState('');
  
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
let success =true;
    if(state==='' || number==='' || email==='');
    {
      setError("please fill the field");
      success=false;
    }
    else if(number.length!=10)
    {
      setNumerror("please enter 10 digit number");
      success=false;
    }
    else{
      success=true;
    }
    
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
        name: `${state}`,
        email: `${email}`,
        contact: `${number}`,
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
      <nav className="nav">
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
        <h1>details</h1>
        <p>Address: {address}</p>
        <p>Color: {selectedColor}</p>
        <p>Size: {selectedSize}</p>
      </div></div>
     <center>
        <div className="address">
        <div className="add-con1">
            <input type="text" placeholder='  Enter your name '  value={state} onChange={(e)=>setState(e.target.value)}/>
            <div className="error" align="left"> <p>{error}</p></div>  
      <input type="number" placeholder='  Enter your phone number' value=`+91 ${number}` onChange={(e)=>setNumber(e.target.value)}/>
   <div className="error" align="left"> <p>{numerror}</p></div> </div>
   <div className="add-con2">
   <input type="email" placeholder='enter your email' value={email} onChange={(e)=>setEmail(e.target.value)}  required/>
   <div className="error" align="left"> <p>{error}</p></div>  
        <input type="text" placeholder='  Enter your pincode  (optional)'  maxLength={6} required/>
         <div className="error" align="left"> <p>{error}</p></div>  
        
        </div> </div>
       <div className="buys"> <button  onClick={displayRazorpay}> procced to pay</button></div></center>
    </div>
  );
}

export default Pay;
