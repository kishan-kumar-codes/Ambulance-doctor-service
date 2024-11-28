"use client";

import { UserIcon as UserMd, Ambulance, Phone, Clock } from 'lucide-react'

const Services = () => {
  return (
    <div id="services" className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center animate-fade-in">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Services</h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
            We provide top-notch medical care and emergency services.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
            <ServiceCard
              title="Doctor Consultations"
              description="Get expert medical advice from our team of experienced doctors."
              icon={<UserMd className="h-12 w-12 text-blue-600" />}
            />
            <ServiceCard
              title="Ambulance Service"
              description="Fast and reliable ambulance service for emergencies."
              icon={<Ambulance className="h-12 w-12 text-blue-600" />}
            />
            <ServiceCard
              title="24/7 Availability"
              description="Our services are available round the clock for your convenience."
              icon={<Clock className="h-12 w-12 text-blue-600" />}
            />
            <ServiceCard
              title="Emergency Hotline"
              description="Dedicated emergency hotline for immediate assistance."
              icon={<Phone className="h-12 w-12 text-blue-600" />}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const ServiceCard = ({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 animate-fade-in-up">
    <div className="flex justify-center items-center mb-4 transition-transform duration-300 ease-in-out transform hover:scale-110">
      {icon}
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
    <p className="text-base text-gray-600">{description}</p>
  </div>
)

export default Services

