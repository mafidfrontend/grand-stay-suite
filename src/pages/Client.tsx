import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { 
  Bed, 
  Calendar, 
  Clock, 
  Wifi, 
  Car, 
  Coffee, 
  Utensils,
  MapPin,
  Phone,
  CheckCircle,
  Star,
  MessageCircle
} from 'lucide-react';

export default function Client() {
  const [activeService, setActiveService] = useState<string | null>(null);

  const bookingInfo = {
    roomNumber: 101,
    guestName: 'John Smith',
    checkIn: '2024-08-02',
    checkOut: '2024-08-05',
    nights: 3,
    roomType: 'Deluxe Suite',
    status: 'checked-in'
  };

  const roomServices = [
    { id: 'cleaning', name: 'Housekeeping', icon: CheckCircle, status: 'completed', nextTime: '2:00 PM' },
    { id: 'wifi', name: 'Wi-Fi', icon: Wifi, status: 'active', info: 'HotelGuest_2024' },
    { id: 'parking', name: 'Valet Parking', icon: Car, status: 'available', info: 'Spot B-15' },
    { id: 'breakfast', name: 'Room Service', icon: Coffee, status: 'available', info: '6:00 AM - 11:00 PM' },
  ];

  const amenities = [
    { name: 'Restaurant', icon: Utensils, hours: '6:00 AM - 11:00 PM', location: 'Ground Floor' },
    { name: 'Gym', icon: Star, hours: '24/7', location: '2nd Floor' },
    { name: 'Spa', icon: Star, hours: '9:00 AM - 9:00 PM', location: '3rd Floor' },
    { name: 'Pool', icon: Star, hours: '6:00 AM - 10:00 PM', location: 'Rooftop' },
  ];

  const ServiceCard = ({ service }: { service: any }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="card bg-base-100 shadow-md hover:shadow-lg transition-smooth cursor-pointer"
      onClick={() => setActiveService(activeService === service.id ? null : service.id)}
    >
      <div className="card-body">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              service.status === 'completed' ? 'bg-success/10' :
              service.status === 'active' ? 'bg-info/10' : 'bg-warning/10'
            }`}>
              <service.icon className={`h-5 w-5 ${
                service.status === 'completed' ? 'text-success' :
                service.status === 'active' ? 'text-info' : 'text-warning'
              }`} />
            </div>
            <div>
              <h3 className="font-medium">{service.name}</h3>
              {service.info && <p className="text-sm text-base-content/70">{service.info}</p>}
            </div>
          </div>
          <div className={`badge ${
            service.status === 'completed' ? 'badge-success' :
            service.status === 'active' ? 'badge-info' : 'badge-warning'
          }`}>
            {service.status}
          </div>
        </div>
        
        {service.nextTime && (
          <p className="text-xs text-base-content/60 mt-2">
            Next: {service.nextTime}
          </p>
        )}

        {activeService === service.id && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 pt-4 border-t space-y-2"
          >
            <button className="btn btn-sm btn-primary w-full">Request Service</button>
            <button className="btn btn-sm btn-outline w-full">Contact Staff</button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );

  return (
    <Layout 
      title="Welcome Back!" 
      subtitle={`Room ${bookingInfo.roomNumber} • ${bookingInfo.roomType}`}
    >
      <div className="space-y-6">
        {/* Booking Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card bg-gradient-to-r from-primary to-primary-focus text-primary-content shadow-luxury"
        >
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{bookingInfo.guestName}</h2>
                <p className="opacity-90">Room {bookingInfo.roomNumber} • {bookingInfo.roomType}</p>
              </div>
              <div className="text-right">
                <div className="badge badge-accent">
                  {bookingInfo.status}
                </div>
                <p className="text-sm opacity-90 mt-1">{bookingInfo.nights} nights</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <div>
                  <p className="text-sm opacity-90">Check-in</p>
                  <p className="font-medium">{bookingInfo.checkIn}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <div>
                  <p className="text-sm opacity-90">Check-out</p>
                  <p className="font-medium">{bookingInfo.checkOut}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Room Services */}
        <div>
          <h2 className="text-xl font-bold mb-4">Room Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roomServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Hotel Amenities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card bg-base-100 shadow-md"
        >
          <div className="card-body">
            <h2 className="card-title">Hotel Amenities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {amenities.map((amenity, index) => (
                <motion.div
                  key={amenity.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-200 transition-smooth"
                >
                  <div className="p-2 rounded-lg bg-accent/10">
                    <amenity.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{amenity.name}</h3>
                    <p className="text-sm text-base-content/70">{amenity.hours}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3 text-base-content/50" />
                      <p className="text-xs text-base-content/50">{amenity.location}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card bg-base-100 shadow-md"
        >
          <div className="card-body">
            <h2 className="card-title">Need Assistance?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <button className="btn btn-primary btn-outline">
                <Phone className="h-4 w-4" />
                Call Front Desk
              </button>
              <button className="btn btn-secondary btn-outline">
                <MessageCircle className="h-4 w-4" />
                Send Message
              </button>
              <button className="btn btn-accent btn-outline">
                <Utensils className="h-4 w-4" />
                Order Room Service
              </button>
            </div>
          </div>
        </motion.div>

        {/* Current Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card bg-base-100 shadow-md"
          >
            <div className="card-body">
              <h3 className="card-title text-lg">Room Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Housekeeping</span>
                  <div className="badge badge-success">Completed</div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Next Cleaning</span>
                  <span className="text-sm text-base-content/70">Today 2:00 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Temperature</span>
                  <span className="text-sm text-base-content/70">72°F</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card bg-base-100 shadow-md"
          >
            <div className="card-body">
              <h3 className="card-title text-lg">Stay Information</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Days Remaining</span>
                  <span className="font-bold text-primary">2 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Check-out Time</span>
                  <span className="text-sm text-base-content/70">11:00 AM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Late Checkout</span>
                  <button className="btn btn-xs btn-outline">Request</button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}