import React, { useState, useEffect } from 'react';
import './Buy.css';
import Data from './Data.jsx';
import { HiOutlinePlusSm } from "react-icons/hi";
import { useParams, useNavigate } from 'react-router-dom';

function Buy() {
  const [isOpen, setIsOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState(""); 
  const [error, setError] = useState("");
  const [color ,setColor]=useState('green');

  const { id } = useParams();
  const shirt = Data.find(shirt => shirt.id === parseInt(id));
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    document.body.style.width = '95vw';
    return () => {
      document.body.style.width = '';
    };
  }, []);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const validateAndNavigate = () => {
    if (!address) {
      setError('Address is required');
    } else {
      setError('');
      navigate(`/pay/${shirt.id}`, { state: { address, selectedColor, selectedSize } });
    }
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
      <div className="maincon">
<div className="con1">
      <div className="buy-con">
        <img src={shirt.image} alt={shirt.name} />
      </div>
      </div>
      <div className="con2">
      <div className="buy-price">
        <p>{shirt.name}</p>
        <h3>&#8377;{shirt.price}</h3>
      </div>
      

      <div className="color">
        <h2>Color</h2>
        <button
          className={selectedColor === 'Red' ? 'selected' : ''}
          onClick={() => handleColorSelect('Red')}
        >
          Red
        </button>
        <button
          className={selectedColor === 'Blue' ? 'selected' : ''}
          onClick={() => handleColorSelect('Blue')}
        >
          Blue
        </button>
        <button
          className={selectedColor === 'Green' ? 'selected' : ''}
          onClick={() => handleColorSelect('Green')}
        >
          Green
        </button>
        <button
          className={selectedColor === 'White' ? 'selected' : ''}
          onClick={() => handleColorSelect('White')}
        >
          White
        </button>
      </div>

      <div className="size">
        <h2>Size</h2>
        <button
          className={selectedSize === 'S' ? 'selected' : ''}
          onClick={() => handleSizeSelect('S')}
        >
          S
        </button>
        <button
          className={selectedSize === 'M' ? 'selected' : ''}
          onClick={() => handleSizeSelect('M')}
        >
          M
        </button>
        <button
          className={selectedSize === 'L' ? 'selected' : ''}
          onClick={() => handleSizeSelect('L')}
        >
          L
        </button>
        <button
          className={selectedSize === 'XL' ? 'selected' : ''}
          onClick={() => handleSizeSelect('XL')}
        >
          XL
        </button>
        <button
          className={selectedSize === 'XXL' ? 'selected' : ''}
          onClick={() => handleSizeSelect('XXL')}
        >
          XXL
        </button>
      </div>

      <div className="addr">
        <input 
          type="text" 
          placeholder="Enter address" 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
          required
        />
       
        <button     onClick={(e) => e.target.style.backgroundColor = ' rgb(87, 85, 85)'}><HiOutlinePlusSm /></button>
      </div>
      {error && <p className="error-text">{error}</p>}
      <div className="buy">
        <button type="submit" disabled={!selectedColor || !selectedSize} onClick={validateAndNavigate}>
          Buy
        </button>
        <button>Add to Cart</button>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Buy;
