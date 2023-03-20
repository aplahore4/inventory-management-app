import React, { useState } from 'react';
import './Sidebar.scss';
import { HiMenuAlt3 } from 'react-icons/hi';
import { RiProductHuntLine } from 'react-icons/ri';
import sidebarMenu from '../../data/sidebarMenu';
import SideBarItem from './SidebarItem';
import { useNavigate } from 'react-router-dom';

const Sidebar = (props) => {
  const { children } = props;
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const goHome = () => {
    navigate('/');
  };

  return (
    <div className='layout'>
      <div className='sidebar' style={{ width: isOpen ? '230px' : '60px' }}>
        <div className='top_section'>
          <div className='logo' style={{ display: isOpen ? 'block' : 'none' }}>
            <RiProductHuntLine
              size={35}
              style={{ cursor: 'pointer' }}
              onClick={goHome}
            />
          </div>
          <div
            className='bars'
            style={{ marginLeft: isOpen ? '100px' : '0px' }}
          >
            <HiMenuAlt3 onClick={toggle} />
          </div>
        </div>
        {sidebarMenu.map((item, index) => {
          return <SideBarItem key={index} item={item} isOpen={isOpen} />;
        })}
      </div>
      <main
        style={{
          paddingLeft: isOpen ? '230px' : '60px',
          transition: 'all .5s',
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
