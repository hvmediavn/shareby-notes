import { MenuFoldOutlined } from '@ant-design/icons';
import { Drawer } from 'antd';
import { useState } from 'react';
import { MenulistMob } from './MenulistMob';

const HeaderMob = () => {
  const [isMenuOpen, setMenu] = useState(false);

  const handleCloseMenu = () => {
    setMenu(!isMenuOpen);
  };
  return (
    <div>
      <MenuFoldOutlined style={{ fontSize: '20px' }} onClick={handleCloseMenu} />
      <Drawer
        className="nav__drawer"
        placement="right"
        closable={false}
        onClose={handleCloseMenu}
        visible={isMenuOpen}
      >
        <MenulistMob />
      </Drawer>
    </div>
  );
};

export default HeaderMob;
