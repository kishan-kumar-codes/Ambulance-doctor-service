"use client";

import { useState, useEffect } from 'react';
import { Ambulance } from '@/app/types/ambulance';

interface AmbulanceFormProps {
  ambulance?: Ambulance;
  onSubmit: (ambulance: Omit<Ambulance, 'id'>) => void;
  onCancel: () => void;
}

const AmbulanceForm: React.FC<AmbulanceFormProps> = ({ ambulance, onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    phone: '',
  });

  useEffect(() => {
    if (ambulance) {
      setForm({
        title: ambulance.title,
        description: ambulance.description,
        location: ambulance.location,
        phone: ambulance.phone || '',
      });
    }
  }, [ambulance]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 bg-white p-4 rounded-lg shadow-lg animate-fade-in">
      <div className="space-y-4">
        <div className="form-group">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Ambulance Name
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out hover:border-blue-300"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out hover:border-blue-300 resize-none"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out hover:border-blue-300"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            pattern="[0-9]{10}"
            placeholder="Enter a 10-digit phone number"
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out hover:border-blue-300"
          />
        </div>
      </div>
      <div className="flex justify-end space-x-3 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          {ambulance ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};

export default AmbulanceForm;

