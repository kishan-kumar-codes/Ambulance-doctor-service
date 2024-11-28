'use client';

import { useState, useEffect, Suspense, useCallback } from 'react';
import { Doctor } from '../types/doctor';
import {
  fetchDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from '@/app/services/doctorServices';
import DoctorCard from '@/components/DoctorCard';
import DoctorForm from '@/components/DoctorForm';
import Loader from '@/components/Loader';

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const limit = 10;

 

  const fetchDoctorsData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchDoctors(currentPage, limit);
      setDoctors(response.doctors);
      console.log("Doctors data:", response);
      setTotalDoctors(response.total);
    } catch (err) {
      console.error('Error in fetching doctors data:', err);
      setError('Failed to fetch doctors. Please try again.');
    }
    setIsLoading(false);
  }, [currentPage, limit]); 

  useEffect(() => {
    setIsMounted(true);
    fetchDoctorsData(); 
  }, [fetchDoctorsData]);

  const handleCreateDoctor = async (doctor: Omit<Doctor, 'id'>) => {
    try {
      await createDoctor(doctor);
      setIsFormOpen(false);
      fetchDoctorsData();
    } catch (err) {
      console.log('Error in Creating Doctors data:',err)
      setError('Failed to create doctor. Please try again.');
    }
  };

  const handleUpdateDoctor = async (id: string, doctor: Partial<Doctor>) => {
    console.log('data:', doctor);
    try {
      await updateDoctor(id, doctor);
      setEditingDoctor(null);
      fetchDoctorsData();
    } catch (err) {
      console.log('Error in Updating Doctors data:',err)
      setError('Failed to update doctor. Please try again.');
    }
  };

  const handleDeleteDoctor = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      try {
        await deleteDoctor(id);
        fetchDoctorsData();
      } catch (err) {
        console.log('Error in Delete Doctors data:',err)
        setError('Failed to delete doctor. Please try again.');
      }
    }
  };

  const totalPages = Math.ceil(totalDoctors / limit);

  return (
    <Suspense fallback={<Loader />}>
      <div className="container mx-auto px-4 py-8 pt-24 min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <h1 className="text-4xl font-bold mb-8 text-blue-800 text-center animate-fade-in-down">Doctors Directory</h1>
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => setIsFormOpen(true)}
            className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 shadow-lg"
          >
            Add New Doctor
          </button>
          <div className="text-lg font-semibold text-gray-700">
            Total Doctors: <span className="text-green-600">{totalDoctors}</span>
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
          <Suspense fallback={<p className="text-center text-gray-600">Loading doctors...</p>}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
              {doctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  onEdit={() => setEditingDoctor(doctor)}
                  onDelete={() => handleDeleteDoctor(doctor.id)}
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
        {isMounted && (isFormOpen || editingDoctor) && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center animate-fade-in">
            <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100 hover:scale-105">
              <h2 className="text-2xl font-bold mb-6 text-blue-800">
                {editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}
              </h2>
              <DoctorForm
                doctor={editingDoctor || undefined}
                onSubmit={(doctor) => {
                  if (editingDoctor) {
                    handleUpdateDoctor(editingDoctor.id, doctor);
                  } else {
                    handleCreateDoctor(doctor);
                  }
                }}
                onCancel={() => {
                  setIsFormOpen(false);
                  setEditingDoctor(null);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </Suspense>
  );
};

export default DoctorsPage;

