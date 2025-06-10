'use client';

import { FloatButton } from 'antd';
import { MessageOutlined, WhatsAppOutlined } from '@ant-design/icons';

const FloatingChatbot = () => {
  return (
    <div style={{ position: 'fixed', right: 24, bottom: 24, display: 'flex', flexDirection: 'column', gap: 16, zIndex: 1000 }}>
      {/* ChatGPT Button */}
      <FloatButton
        icon={<MessageOutlined />}
        style={{ backgroundColor: '#4A90E2', color: '#fff' }}
        tooltip={<div>Chat with AI</div>}
        onClick={() => window.open('https://chat.openai.com', '_blank')}
      />

      WhatsApp Button
      <FloatButton
        icon={<WhatsAppOutlined />}
        style={{ backgroundColor: '#25D366', color: '#fff' }}
        tooltip={<div>WhatsApp Us</div>}
        onClick={() =>
          window.open('https://wa.me/your-number', '_blank')
        }
      />
    </div>
  );
};

export default FloatingChatbot;
