"use client";

import Image from 'next/image';
import { Ambulance } from '@/app/types/ambulance';
import { MapPin, Edit2, Trash2, FileText, Hash, Droplet, Phone } from 'lucide-react';
import { useState } from 'react';

interface AmbulanceCardProps {
  ambulance: Ambulance;
  onEdit: (ambulance: Ambulance) => void;
  onDelete: (id: string) => void;
}

const AmbulanceCard: React.FC<AmbulanceCardProps> = ({ ambulance, onEdit, onDelete }) => {
  const [showEditTooltip, setShowEditTooltip] = useState(false);
  const [showDeleteTooltip, setShowDeleteTooltip] = useState(false);

  return (
    <div className="w-[280px] transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="bg-gradient-to-b from-blue-500 to-blue-600 rounded-xl shadow-lg overflow-hidden relative min-h-[320px]">

        <div className="absolute bottom-0 left-0 right-0 h-20 -z-10">
          <svg
            className="absolute bottom-0 w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
            fill="none"
          >
            <path
              d="M0 30 Q 50 100 100 30 V100 H0 V30Z"
              fill="rgba(255,255,255,0.1)"
            />
          </svg>
        </div>
        <div className="h-36 w-full relative bg-white">
          <Image
            src={'/images/ambulance.webp'}
            alt={ambulance.title}
            layout="fill"
            objectFit="contain"
            className="p-2"
          />
        </div>

        <div className="pt-2 pb-2 relative z-10 px-6">

          <div className="text-center mb-2">
            <h3 className="text-md font-semibold text-white mb-1">{ambulance.title}</h3>
            <p className="text-blue-100 text-sm flex items-center justify-center gap-1">
              <MapPin className="w-4 h-4" />
              {ambulance.location}
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center text-white gap-2 text-sm">
              <div className="flex items-center gap-2">
                <Hash className="w-3.5 h-3.5" />
                <span className="font-medium">ID No</span>
              </div>
              <span className="ml-2">: {ambulance.id}</span>
            </div>
            <div className="flex items-center text-white gap-2 text-sm">
              <div className="flex items-center gap-2">
                <Droplet className="w-3.5 h-3.5" />
                <span className="font-medium">Type</span>
              </div>
              <span className="ml-2">: Emergency</span>
            </div>
            <div className="flex items-center text-white gap-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5" />
                <span className="font-medium">Phone</span>
              </div>
              <span className="ml-2">: {ambulance.phone}</span>
            </div>
            <div className="flex items-center text-white gap-2 text-sm">
              <div className="flex items-center gap-2">
                <FileText className="w-3.5 h-3.5" />
                <span className="font-medium">Desc</span>
              </div>
              <span className="ml-2">: {ambulance.description || 'none'}</span>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-2">
            <div className="relative">
              <button
                onClick={() => onEdit(ambulance)}
                onMouseEnter={() => setShowEditTooltip(true)}
                onMouseLeave={() => setShowEditTooltip(false)}
                className="p-2 bg-gray-200/20 hover:bg-gray-200/30 rounded-full transition-colors duration-200"
                aria-label="Edit ambulance"
              >
                <Edit2 size={16} className="text-white" />
              </button>
              {showEditTooltip && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap">
                  Edit
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => onDelete(ambulance.id)}
                onMouseEnter={() => setShowDeleteTooltip(true)}
                onMouseLeave={() => setShowDeleteTooltip(false)}
                className="p-2 bg-gray-200/20 hover:bg-gray-200/30 rounded-full transition-colors duration-200"
                aria-label="Delete ambulance"
              >
                <Trash2 size={16} className="text-white" />
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
  );
};

export default AmbulanceCard;
