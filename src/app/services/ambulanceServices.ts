import { Ambulance } from '../types/ambulance';

const API_URL = 'api/ambulances'; 

export const fetchAmbulances = async (page: number, limit: number): Promise<{ ambulances: Ambulance[], total: number }> => {
  const response = await fetch(`${API_URL}?page=${page}&limit=${limit}`);
  const data = await response.json();
  console.log('Response:', data);
  if (!response.ok) throw new Error('Failed to fetch ambulances');
  return data;
};

export const createAmbulance = async (ambulance: Omit<Ambulance, 'id'>): Promise<Ambulance> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ambulance),
  });
  if (!response.ok) throw new Error('Failed to create ambulance');
  return await response.json();
};

export const updateAmbulance = async (id: string, ambulance: Partial<Ambulance>): Promise<Ambulance> => {
  const response = await fetch(`${API_URL}/?id=${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ambulance),
  });
  if (!response.ok) throw new Error('Failed to update ambulance');
  return await response.json();
};

export const deleteAmbulance = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}?id=${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete ambulance');
};
