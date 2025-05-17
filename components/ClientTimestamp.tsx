"use client"

import { useState, useEffect } from 'react';

interface ClientTimestampProps {
  timestamp: Date;
}

const ClientTimestamp: React.FC<ClientTimestampProps> = ({ timestamp }) => {
  const [formattedTime, setFormattedTime] = useState('');

  useEffect(() => {
    // Ensure this runs only on the client
    setFormattedTime(
      new Date(timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    );
  }, [timestamp]);

  if (!formattedTime) {
    // You can return a placeholder or null until the client-side render
    return null; 
  }

  return <p className="text-xs opacity-70">{formattedTime}</p>;
};

export default ClientTimestamp; 