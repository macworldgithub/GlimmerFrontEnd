'use client';

import { FloatButton } from 'antd';
import { MessageOutlined } from '@ant-design/icons'; // or use any other icon

const FloatingChatbot = () => {
  return (
    <FloatButton
      icon={<MessageOutlined />}
      style={{ right: 90, bottom: 24, backgroundColor: '#4A90E2', color: '#fff' }}
      tooltip={<div>Chat with AI</div>}
      onClick={() => {
        // Replace with your chatbot modal logic or route
        alert('Open AI Chatbot');
      }}
    />
  );
};

export default FloatingChatbot;
