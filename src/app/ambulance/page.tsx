'use client';

import { useState, useEffect, Suspense, useCallback } from 'react';
import { Ambulance } from '../types/ambulance';
import {
  fetchAmbulances,
  createAmbulance,
  updateAmbulance,
  deleteAmbulance,
} from '@/app/services/ambulanceServices';
import AmbulanceCard from '@/components/AmbulanceCard';
import AmbulanceForm from '@/components/AmbulanceForm';
import Loader from '@/components/Loader';

const AmbulancesPage = () => {
  const [ambulances, setAmbulances] = useState<Ambulance[]>([]);
  const [totalAmbulances, setTotalAmbulances] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAmbulance, setEditingAmbulance] = useState<Ambulance | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const limit = 10;



  const fetchAmbulancesData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchAmbulances(currentPage, limit);
      setAmbulances(response.ambulances);
      setTotalAmbulances(response.total);
    } catch (err) {
      console.log('Error in Fetching Ambulance data:', err);
      setError('Failed to fetch ambulances. Please try again.');
    }
    setIsLoading(false);
  }, [currentPage, limit]);

  useEffect(() => {
    setIsMounted(true);
    fetchAmbulancesData(); 
  }, [fetchAmbulancesData]); 

  const handleCreateAmbulance = async (ambulance: Omit<Ambulance, 'id'>) => {
    try {
      await createAmbulance(ambulance);
      setIsFormOpen(false);
      fetchAmbulancesData();
    } catch (err) {
      console.log('Error in Creating Ambulance data:',err)
      setError('Failed to create ambulance. Please try again.');
    }
  };

  const handleUpdateAmbulance = async (id: string, ambulance: Partial<Ambulance>) => {
    try {
      await updateAmbulance(id, ambulance);
      setEditingAmbulance(null);
      fetchAmbulancesData();
    } catch (err) {
      console.log('Error in Updating Ambulance data:',err)
      setError('Failed to update ambulance. Please try again.');
    }
  };

  const handleDeleteAmbulance = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this ambulance?')) {
      try {
        await deleteAmbulance(id);
        fetchAmbulancesData();
      } catch (err) {
        console.log('Error in Deleting Ambulance data:',err)
        setError('Failed to delete ambulance. Please try again.');
      }
    }
  };

  const totalPages = Math.ceil(totalAmbulances / limit);

  return (
    <Suspense fallback={<Loader />}>
      <div className="container mx-auto px-4 py-8 pt-36 min-h-screen bg-gradient-to-b from-red-50 to-white">
        <h1 className="text-4xl font-bold mb-8 text-blue-800 text-center animate-fade-in-down">Ambulance Fleet</h1>
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => setIsFormOpen(true)}
            className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 shadow-lg"
          >
            Add New Ambulance
          </button>
          <div className="text-lg font-semibold text-gray-700">
            Total Ambulances: <span className="text-green-600">{totalAmbulances}</span>
          </div>
        </div>
        {error && (
          <p className="text-red-500 mb-4 p-4 bg-red-100 rounded-lg animate-fade-in">
            {error}
          </p>
        )}
        {isLoading ? (
          <Loader />
        ) : (
          <Suspense fallback={<p className="text-center text-gray-600">Loading ambulances...</p>}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
              {ambulances.map((ambulance) => (
                <AmbulanceCard
                  key={ambulance.id}
                  ambulance={ambulance}
                  onEdit={() => setEditingAmbulance(ambulance)}
                  onDelete={() => handleDeleteAmbulance(ambulance.id)}
                />
              ))}
            </div>
          </Suspense>
        )}
        <div className="mt-12 flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                currentPage === page
                  ? 'bg-blue-500 text-white transform scale-110 shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
        {isMounted && (isFormOpen || editingAmbulance) && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center animate-fade-in">
            <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100 hover:scale-105">
              <h2 className="text-2xl font-bold mb-6 text-blue-800">
                {editingAmbulance ? 'Edit Ambulance' : 'Add New Ambulance'}
              </h2>
              <AmbulanceForm
                ambulance={editingAmbulance || undefined}
                onSubmit={(ambulance) => {
                  if (editingAmbulance) {
                    handleUpdateAmbulance(editingAmbulance.id, ambulance);
                  } else {
                    handleCreateAmbulance(ambulance);
                  }
                }}
                onCancel={() => {
                  setIsFormOpen(false);
                  setEditingAmbulance(null);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </Suspense>
  );
};

export default AmbulancesPage;

