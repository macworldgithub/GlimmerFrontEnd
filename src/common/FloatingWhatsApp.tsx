'use client';

import { WhatsAppOutlined } from '@ant-design/icons';

const FloatingWhatsApp = () => {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 26,
        right: 24,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: '#25D366',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          cursor: 'pointer',
        }}
        onClick={() => window.open('https://wa.me/923312062376', '_blank')}
      >
        {/* WhatsApp Icon */}
        <WhatsAppOutlined style={{ fontSize: '26px', color: '#fff' }} />

        {/* Red Dot */}
        <span
          style={{
            position: 'absolute',
            top: 4,
            right: 4,
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: 'red',
          }}
        />
      </div>
    </div>
  );
};

export default FloatingWhatsApp;
