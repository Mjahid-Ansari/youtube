import React, { useState } from 'react';
import './Navbar.css';
import menu_icon from '../../assets/menu.png';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search.png';
import upload_icon from '../../assets/upload.png';
import more_icon from '../../assets/more.png';
import notification_icon from '../../assets/notification.png';
import profile_icon from '../../assets/jack.png';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ setSidebar }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim() === '') return;
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <nav className='flex-div'>
      <div className='nav-left flex-div'>
        <img
          className='menu-icon'
          onClick={() => setSidebar((prev) => (prev === false ? true : false))}
          src={menu_icon}
          alt=''
        />
        <Link to='/'><img className='logo' src={logo} alt='' /></Link>
      </div>
      <div className="nav-middle flex_div">
        <div className="search-box flex-div">
          <input
            type="text"
            placeholder='Search'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <img src={search_icon} alt="" onClick={handleSearch} />
        </div>
      </div>

      <div className="nav-right flex-div">
        <img src={upload_icon} alt='' />
        <img src={more_icon} alt='' />
        <img src={notification_icon} alt='' />
        <img src={profile_icon} className='user-icon' alt='' />
      </div>
    </nav>
  );
};

export default Navbar;
