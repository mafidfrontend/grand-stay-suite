import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { 
  Bed, 
  Users, 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  MessageSquare,
  Settings,
  UserCheck,
  UserX
} from 'lucide-react';

export default function Admin() {
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  const todayStats = {
    checkIns: 8,
    checkOuts: 6,
    totalGuests: 32,
    availableRooms: 12,
    occupiedRooms: 23,
    cleaningRooms: 3,
  };

  const rooms = [
    { id: 101, status: 'occupied', guest: 'John Smith', checkOut: '2024-08-05', cleaning: false },
    { id: 102, status: 'available', guest: null, checkOut: null, cleaning: false },
    { id: 103, status: 'cleaning', guest: null, checkOut: null, cleaning: true },
    { id: 104, status: 'occupied', guest: 'Sarah Wilson', checkOut: '2024-08-04', cleaning: false },
    { id: 105, status: 'available', guest: null, checkOut: null, cleaning: false },
    { id: 106, status: 'occupied', guest: 'Mike Johnson', checkOut: '2024-08-06', cleaning: false },
  ];

  const clients = [
    { id: 1, name: 'John Smith', room: 101, checkIn: '2024-08-02', checkOut: '2024-08-05', status: 'checked-in' },
    { id: 2, name: 'Sarah Wilson', room: 104, checkIn: '2024-08-01', checkOut: '2024-08-04', status: 'checking-out' },
    { id: 3, name: 'Mike Johnson', room: 106, checkIn: '2024-08-03', checkOut: '2024-08-06', status: 'checked-in' },
  ];

  const complaints = [
    { id: 1, client: 'John Smith', room: 101, issue: 'Air conditioning not working', status: 'pending', time: '2 hours ago' },
    { id: 2, client: 'Sarah Wilson', room: 104, issue: 'Noisy neighbors', status: 'resolved', time: '1 day ago' },
  ];

  const getRoomStatusColor = (status: string) => {
    switch (status) {
      case 'occupied': return 'badge-error';
      case 'available': return 'badge-success';
      case 'cleaning': return 'badge-warning';
      default: return 'badge-neutral';
    }
  };

  const StatCard = ({ icon: Icon, title, value, color = 'primary' }: any) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="card bg-base-100 shadow-md hover:shadow-lg transition-smooth"
    >
      <div className="card-body compact">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-${color}/10`}>
            <Icon className={`h-5 w-5 text-${color}`} />
          </div>
          <div>
            <h3 className="text-xs font-medium text-base-content/70">{title}</h3>
            <p className="text-xl font-bold text-base-content">{value}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <Layout 
      title="Admin Dashboard" 
      subtitle="Downtown Branch Management"
    >
      <div className="space-y-6">
        {/* Tabs */}
        <div className="tabs tabs-boxed">
          <a 
            className={`tab ${activeTab === 'dashboard' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </a>
          <a 
            className={`tab ${activeTab === 'rooms' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('rooms')}
          >
            Rooms
          </a>
          <a 
            className={`tab ${activeTab === 'clients' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('clients')}
          >
            Clients
          </a>
          <a 
            className={`tab ${activeTab === 'complaints' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('complaints')}
          >
            Complaints
          </a>
        </div>

        {activeTab === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Today's Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <StatCard icon={UserCheck} title="Check-ins" value={todayStats.checkIns} color="success" />
              <StatCard icon={UserX} title="Check-outs" value={todayStats.checkOuts} color="warning" />
              <StatCard icon={Users} title="Total Guests" value={todayStats.totalGuests} color="info" />
              <StatCard icon={Bed} title="Available" value={todayStats.availableRooms} color="success" />
              <StatCard icon={Bed} title="Occupied" value={todayStats.occupiedRooms} color="error" />
              <StatCard icon={Clock} title="Cleaning" value={todayStats.cleaningRooms} color="warning" />
            </div>

            {/* Quick Actions */}
            <div className="card bg-base-100 shadow-md">
              <div className="card-body">
                <h2 className="card-title">Quick Actions</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <button className="btn btn-primary btn-outline">
                    <UserCheck className="h-4 w-4" />
                    Check-in Guest
                  </button>
                  <button className="btn btn-warning btn-outline">
                    <UserX className="h-4 w-4" />
                    Check-out Guest
                  </button>
                  <button className="btn btn-info btn-outline">
                    <Settings className="h-4 w-4" />
                    Room Service
                  </button>
                  <button className="btn btn-success btn-outline">
                    <CheckCircle className="h-4 w-4" />
                    Mark Clean
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'rooms' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rooms.map((room, index) => (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className={`card bg-base-100 shadow-md cursor-pointer border-2 ${
                    selectedRoom === room.id ? 'border-primary' : 'border-transparent'
                  }`}
                  onClick={() => setSelectedRoom(selectedRoom === room.id ? null : room.id)}
                >
                  <div className="card-body">
                    <div className="flex items-center justify-between">
                      <h3 className="card-title text-lg">Room {room.id}</h3>
                      <div className={`badge ${getRoomStatusColor(room.status)}`}>
                        {room.status}
                      </div>
                    </div>
                    
                    {room.guest && (
                      <div className="space-y-2 mt-3">
                        <p className="text-sm"><strong>Guest:</strong> {room.guest}</p>
                        <p className="text-sm"><strong>Check-out:</strong> {room.checkOut}</p>
                      </div>
                    )}
                    
                    {room.status === 'cleaning' && (
                      <div className="alert alert-warning mt-3">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="text-xs">Cleaning in progress</span>
                      </div>
                    )}

                    {selectedRoom === room.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 space-y-2"
                      >
                        <button className="btn btn-sm btn-primary w-full">Assign Guest</button>
                        <button className="btn btn-sm btn-warning w-full">Schedule Cleaning</button>
                        <button className="btn btn-sm btn-info w-full">Room Service</button>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'clients' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card bg-base-100 shadow-md"
          >
            <div className="card-body">
              <h2 className="card-title">Current Clients</h2>
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Room</th>
                      <th>Check-in</th>
                      <th>Check-out</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((client, index) => (
                      <motion.tr
                        key={client.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <td className="font-medium">{client.name}</td>
                        <td>{client.room}</td>
                        <td>{client.checkIn}</td>
                        <td>{client.checkOut}</td>
                        <td>
                          <div className={`badge ${
                            client.status === 'checked-in' ? 'badge-success' : 'badge-warning'
                          }`}>
                            {client.status}
                          </div>
                        </td>
                        <td>
                          <button className="btn btn-sm btn-primary">View</button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'complaints' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="card bg-base-100 shadow-md">
              <div className="card-body">
                <h2 className="card-title">Guest Complaints</h2>
                <div className="space-y-4">
                  {complaints.map((complaint, index) => (
                    <motion.div
                      key={complaint.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="alert"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <div className="flex-1">
                        <h3 className="font-bold">{complaint.client} - Room {complaint.room}</h3>
                        <p className="text-sm">{complaint.issue}</p>
                        <p className="text-xs opacity-70">{complaint.time}</p>
                      </div>
                      <div className={`badge ${
                        complaint.status === 'resolved' ? 'badge-success' : 'badge-warning'
                      }`}>
                        {complaint.status}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}