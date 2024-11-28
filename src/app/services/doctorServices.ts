import { Doctor } from '../types/doctor';

const API_URL = 'api/doctors';

export const fetchDoctors = async (page: number, limit: number): Promise<{ doctors: Doctor[], total: number }> => {
  const response = await fetch(`${API_URL}?page=${page}&limit=${limit}`);
  const data = await response.json()
  if (!response.ok) throw new Error('Failed to fetch doctors');
  return data;
};

export const createDoctor = async (doctor: Omit<Doctor, 'id'>): Promise<Doctor> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(doctor),
  });
  if (!response.ok) throw new Error('Failed to create doctor');
  return await response.json();
};

export const updateDoctor = async (id: string, doctor: Partial<Doctor>): Promise<Doctor> => {
  const response = await fetch(`${API_URL}/?id=${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(doctor),
  });
  if (!response.ok) throw new Error('Failed to update doctor');
  return await response.json();
};

export const deleteDoctor = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/?id=${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete doctor');
};

