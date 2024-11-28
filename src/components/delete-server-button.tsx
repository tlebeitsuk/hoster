'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { deleteServer } from '@/data/projects/delete-server';

type DeleteServerProps = {
  server: {
    name: string;
    projectId: string;
  };
};

export default function DeleteServerButton({ server }: DeleteServerProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteServer = async () => {
    if (isDeleting) return;

    setIsDeleting(true);
    try {
      await deleteServer(server.projectId, server.name);
      
      window.location.href = `/projects/${server.projectId}/servers`;
    } catch (error) {
      console.error('Failed to delete server:', error);
      alert('An error occurred while deleting the server.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button
      onClick={handleDeleteServer}
      className={`cursor-pointer bg-red-500 ${
        isDeleting ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      disabled={isDeleting}
      title={isDeleting ? 'Deleting...' : 'Click to delete server'}
    >
      {isDeleting ? 'Deleting...' : 'Delete Server'}
    </Button>
  );
}
