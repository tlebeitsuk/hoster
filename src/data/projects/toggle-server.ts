'use server'
import { callIncus } from '../../lib/incus';

export const toggleServer = async (projectId: string, serverName: string, action: 'start' | 'stop') => {
  try {
    const response = await callIncus(`/instances/${serverName}/state`, { method: 'PUT', query: { project: projectId}, body: {action: action}});
    return response;
  } catch (error) {
    console.error('Failed to toggle server:', error);
    throw new Error('Unable to change server state');
  }
};
