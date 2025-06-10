'use client'; 

import { FloatButton } from 'antd';
import { WhatsAppOutlined } from '@ant-design/icons';

const FloatingWhatsApp = () => {
  return (
    <FloatButton
      icon={<WhatsAppOutlined />}
      style={{ right: 24, bottom: 26, backgroundColor: '#25D366', color: '#fff' }}
      tooltip={<div>Chat on WhatsApp</div>}
      onClick={() => {
        window.open('https://wa.me/923312062376', '_blank'); 
      }}
    />
  );
};

export default FloatingWhatsApp;
