import React, { useState, useRef, useEffect } from 'react';
import './Dropdown.scss';
import Down from '../assets/down.png';
import Up from '../assets/up.png';
import Tick from '../assets/tick.png';

const options = [
  { value: "Burger", label: "Burger 🍔" },
  { value: "Pizza", label: "Pizza 🍕", disabled: true }, 
  { value: "Fries", label: "Fries 🍟" },
  { value: "Tacos", label: "Tacos 🌮" },
  { value: "Sandwich", label: "Sandwich 🥪" }
];

const Dropdown = ({ 
  upward = false, 
  showTick = true, 
  enableSearch = true 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    if (!option.disabled) { 
      setSelectedOption(option);
      setSearchTerm('');
      setIsOpen(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    option.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false); 
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="body">
        <div className="title">
        <h1>menu.</h1>
        </div>
        
      <div className={`dropdown ${upward ? 'upward' : ''}`} ref={dropdownRef}>
        <div className="label" onClick={toggleDropdown}>
          {isOpen && enableSearch ? (
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              autoFocus
              placeholder={selectedOption ? selectedOption.label : 'Search'}
              className="searchbuton"
            />
          ) : (
            <>
              {selectedOption ? selectedOption.label : "pick your food"}
              <img
                src={isOpen ? Up : Down}
                alt={isOpen ? 'Collapse' : 'Expand'}
                className="arrow"
              />
            </>
          )}
        </div>
        {isOpen && (
          <div className="list">
            {filteredOptions.map((option) => (
           <div
           key={option.value}
           className={`item ${option.disabled ? 'disabled' : ''}`} 
           onClick={() => handleSelect(option)}
         >
           {option.label}
           {showTick && selectedOption && selectedOption.value === option.value && (
             <img src={Tick} alt="Selected" className="tick" />
           )}
         </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
