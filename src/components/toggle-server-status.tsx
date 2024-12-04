'use client';

import { useState } from 'react';
import { toggleServer } from '@/data/projects/toggle-server';

type ToggleServerProps = {
  server: {
    name: string;
    status: string;
    projectId: string;
  };
  statusClass: string;
};

export default function ToggleServerStatus({
  server,
  statusClass,
}: ToggleServerProps) {
  const [serverStatus, setServerStatus] = useState(server.status);

  const handleToggleServer = async () => {
    try {
      const action = serverStatus === 'Running' ? 'stop' : 'start';
      await toggleServer(server.projectId, server.name, action);

      setServerStatus(action === 'start' ? 'Running' : 'Stopped');
    } catch (error) {
      console.error('Failed to toggle server state:', error);
      alert('An error occurred while changing the server state.');
    }
  };

  return (
    <p
      onClick={handleToggleServer}
      className={`cursor-pointer ${statusClass}`}
      title={serverStatus === 'Running' ? 'Click to stop server' : 'Click to start server'}
    >
      {serverStatus}
    </p>
  );
}
