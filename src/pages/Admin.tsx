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
  UserX,
  Loader2
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  useBranchStats, 
  useRoomsByBranch, 
  useBookingsByBranch, 
  useComplaintsByBranch 
} from '@/hooks/useFirebaseData';
import { StatCardProps } from '@/types';

export default function Admin() {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user } = useAuth();

  // Use fallback branchId if user doesn't have one (for demo purposes)
  const branchId = user?.branchId || 'branch-1';

  // Fetch data for the admin's branch
  const { data: branchStats, isLoading: statsLoading, error: statsError } = useBranchStats(branchId);
  const { data: rooms, isLoading: roomsLoading, error: roomsError } = useRoomsByBranch(branchId);
  const { data: bookings, isLoading: bookingsLoading, error: bookingsError } = useBookingsByBranch(branchId);
  const { data: complaints, isLoading: complaintsLoading, error: complaintsError } = useComplaintsByBranch(branchId);

  // Loading state
  if (statsLoading || roomsLoading || bookingsLoading || complaintsLoading) {
    return (
      <Layout title="Admin Dashboard" subtitle="Branch Management">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-base-content/70">Loading branch data...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Error state - only show if we have actual errors, not just empty data
  const hasErrors = statsError || roomsError || bookingsError || complaintsError;
  const hasData = branchStats || rooms?.length || bookings?.length || complaints?.length;
  
  if (hasErrors && !hasData) {
    return (
      <Layout title="Admin Dashboard" subtitle="Branch Management">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="text-error text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold mb-2">Error Loading Data</h3>
            <p className="text-base-content/70 mb-4">Unable to load branch information. Please try again later.</p>
            <div className="text-sm text-base-content/60">
              <p>Branch ID: {branchId}</p>
              <p>User: {user?.email}</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Use safe defaults if data is not available
  const safeStats = branchStats || {
    totalRooms: 0,
    occupiedRooms: 0,
    availableRooms: 0,
    occupancy: 0,
    todayRevenue: 0,
    totalBookings: 0,
    activeBookings: 0,
    totalComplaints: 0,
    pendingComplaints: 0,
  };

  const safeRooms = rooms || [];
  const safeBookings = bookings || [];
  const safeComplaints = complaints || [];

  // Show welcome message if no data exists yet
  const hasAnyData = safeRooms.length > 0 || safeBookings.length > 0 || safeComplaints.length > 0;

  // Calculate today's stats
  const today = new Date().toISOString().split('T')[0];
  const checkInsToday = safeBookings.filter(booking => 
    booking.checkIn === today && booking.status === 'checked-in'
  ).length;
  const checkOutsToday = safeBookings.filter(booking => 
    booking.checkOut === today && booking.status === 'checked-out'
  ).length;
  const cleaningRooms = safeRooms.filter(room => room.status === 'cleaning').length;

  const getRoomStatusColor = (status: string) => {
    switch (status) {
      case 'occupied': return 'badge-error';
      case 'available': return 'badge-success';
      case 'cleaning': return 'badge-warning';
      default: return 'badge-neutral';
    }
  };

  const StatCard = ({ icon: Icon, title, value, color = 'primary' }: StatCardProps) => (
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
            {/* Welcome Message for Empty Database */}
            {!hasAnyData && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20"
              >
                <div className="card-body text-center">
                  <div className="text-4xl mb-4">🏨</div>
                  <h2 className="text-2xl font-bold text-base-content mb-2">Welcome to Your Branch!</h2>
                  <p className="text-base-content/70 mb-4">
                    This is your branch management dashboard. You can start by adding rooms, managing bookings, and handling guest complaints.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <button className="btn btn-primary btn-sm">Add Rooms</button>
                    <button className="btn btn-secondary btn-sm">Create Booking</button>
                    <button className="btn btn-accent btn-sm">View Reports</button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Today's Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <StatCard icon={UserCheck} title="Check-ins" value={checkInsToday} color="success" />
              <StatCard icon={UserX} title="Check-outs" value={checkOutsToday} color="warning" />
              <StatCard icon={Users} title="Total Guests" value={safeStats.occupiedRooms} color="info" />
              <StatCard icon={Bed} title="Available" value={safeStats.availableRooms} color="success" />
              <StatCard icon={Bed} title="Occupied" value={safeStats.occupiedRooms} color="error" />
              <StatCard icon={Clock} title="Cleaning" value={cleaningRooms} color="warning" />
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
            {safeRooms.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card bg-base-100 shadow-md"
              >
                <div className="card-body text-center">
                  <div className="text-6xl mb-4">🛏️</div>
                  <h2 className="text-xl font-bold text-base-content mb-2">No Rooms Added Yet</h2>
                  <p className="text-base-content/70 mb-4">
                    Start by adding rooms to your branch. You can manage room status, assign guests, and track occupancy.
                  </p>
                  <button className="btn btn-primary">Add First Room</button>
                </div>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {safeRooms.map((room, index) => (
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
                      <h3 className="card-title text-lg">Room {room.roomNumber}</h3>
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
            )}
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
              {safeBookings.filter(booking => 
                ['checked-in', 'confirmed'].includes(booking.status)
              ).length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">👥</div>
                  <h3 className="text-lg font-semibold text-base-content mb-2">No Active Clients</h3>
                  <p className="text-base-content/70 mb-4">
                    No clients are currently checked in. New bookings will appear here.
                  </p>
                  <button className="btn btn-primary">Create Booking</button>
                </div>
              ) : (
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
                      {safeBookings.filter(booking => 
                        ['checked-in', 'confirmed'].includes(booking.status)
                      ).map((booking, index) => (
                      <motion.tr
                        key={booking.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <td className="font-medium">{booking.guestName}</td>
                        <td>{booking.roomNumber}</td>
                        <td>{booking.checkIn}</td>
                        <td>{booking.checkOut}</td>
                        <td>
                          <div className={`badge ${
                            booking.status === 'checked-in' ? 'badge-success' : 'badge-warning'
                          }`}>
                            {booking.status}
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
              )}
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
                {safeComplaints.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4">📝</div>
                    <h3 className="text-lg font-semibold text-base-content mb-2">No Complaints</h3>
                    <p className="text-base-content/70 mb-4">
                      Great! No complaints have been reported. Keep up the excellent service.
                    </p>
                    <button className="btn btn-primary">View Service Requests</button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {safeComplaints.map((complaint, index) => (
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
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}