'use server';
import { callIncus } from '../../lib/incus';

export const deleteServer = async (projectId: string, serverName: string) => {
  try {
    const response = await callIncus(`/instances/${serverName}`, {
      method: 'DELETE',
      query: { project: projectId },
    });
    return response;
  } catch (error) {
    console.error('Failed to delete server:', error);
    throw new Error('Unable to delete server');
  }
};
