"use client";

import Image from 'next/image';
import { Doctor } from '@/app/types/doctor';
import { Edit2, Trash2, Phone,  Droplets, MapPin, FileText, Hash } from 'lucide-react';
import { useState } from 'react';

interface DoctorCardProps {
  doctor: Doctor;
  onEdit: (doctor: Doctor) => void;
  onDelete: (id: string) => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onEdit, onDelete }) => {
  const [showEditTooltip, setShowEditTooltip] = useState(false);
  const [showDeleteTooltip, setShowDeleteTooltip] = useState(false);

  return (
    <div className="w-[250px] mx-auto">
      <div className="bg-gray-100 p-2 rounded-xl shadow-2xl">
     
        <div className="flex justify-between px-6 mb-2">
          <div className="w-4 h-4 rounded-full bg-gray-300"></div>
          <div className="w-4 h-4 rounded-full bg-gray-300"></div>
        </div>

        <div className="bg-white rounded-lg overflow-hidden shadow-inner relative">
        
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-blue-600">
            <div className="absolute bottom-0 left-0 right-0">
              <svg
                viewBox="0 0 100 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                className="w-full h-16"
              >
                <path
                  d="M0 24H100V0C65 24 35 -12 0 12V24Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>

          <div className="relative px-6 pt-4 pb-2">
           
            <div className="flex justify-center mb-3">
              <div className="bg-white px-4 py-1 rounded-lg shadow-md">
                <h3 className="text-blue-600 font-bold text-sm">HOSPITAL NAME</h3>
              </div>
            </div>

           
            <div className="flex justify-center mb-3">
              <div className="relative w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden">
                <Image
                  src={ '/images/doctorProfile2.jpg'}
                  alt={doctor.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
            </div>

         
            <div className="text-center mb-3">
              <h3 className="text-lg font-bold text-white mb-1">{doctor.title}</h3>
              <div className="flex items-center justify-center text-white/90 gap-1">
                <MapPin className="w-3 h-3" />
                <p className="text-sm font-medium">{doctor.location}</p>
              </div>
            </div>

          
            <div className="space-y-1 mb-6">
              <div className="flex items-center text-xs text-white">
                <span className="w-16 font-semibold flex items-center gap-1"> <Hash className="w-3 h-3" />ID No</span>
                <span>: {doctor.id}</span>
              </div>
              <div className="flex items-center text-xs text-white">
                <span className="w-16 font-semibold flex items-center gap-1">
                  <Droplets className="w-3 h-3" />Blood
                </span>
                <span>: A+</span>
              </div>
              <div className="flex items-center text-xs text-white">
                <span className="w-16 font-semibold flex items-center gap-1">
                  <Phone className="w-3 h-3" />Phone
                </span>
                <span>: {doctor.phone || '+1 234 567 890'}</span>
              </div>
              <div className="flex items-center text-xs text-white">
                <span className="w-16 font-semibold flex items-center gap-1">
                  <FileText className="w-3 h-3" /> Desc.
                </span>
                <span>: {doctor.description || 'doctor@hospital.com'}</span>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <div className="relative">
                <button
                  onClick={() => onEdit(doctor)}
                  onMouseEnter={() => setShowEditTooltip(true)}
                  onMouseLeave={() => setShowEditTooltip(false)}
                  className="p-2 bg-gray-300 text-blue-600 rounded-full hover:bg-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                  aria-label="Edit doctor"
                >
                  <Edit2 size={16} />
                </button>
                {showEditTooltip && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap">
                    Edit 
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={() => onDelete(doctor.id)}
                  onMouseEnter={() => setShowDeleteTooltip(true)}
                  onMouseLeave={() => setShowDeleteTooltip(false)}
                  className="p-2 bg-gray-300 text-red-600 rounded-full hover:bg-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                  aria-label="Delete doctor"
                >
                  <Trash2 size={16} />
                </button>
                {showDeleteTooltip && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap">
                    Delete 
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;


