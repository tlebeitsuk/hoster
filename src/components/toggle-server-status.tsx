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
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleServer = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const action = serverStatus === 'Running' ? 'stop' : 'start';
      await toggleServer(server.projectId, server.name, action);

      setServerStatus(action === 'start' ? 'Running' : 'Stopped');
    } catch (error) {
      console.error('Failed to toggle server state:', error);
      alert('An error occurred while changing the server state.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <p
      onClick={handleToggleServer}
      className={`cursor-pointer ${statusClass} ${isLoading ? 'opacity-50' : ''}`}
      title={isLoading ? 'Loading...' : 'Click to toggle status'}
    >
      {isLoading ? 'Loading...' : serverStatus}
    </p>
  );
}
