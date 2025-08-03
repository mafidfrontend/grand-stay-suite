// Demo data for the hotel management system

export const hotelData = {
  // Director-level data
  globalStats: {
    totalBranches: 5,
    totalRooms: 150,
    totalClients: 450,
    totalStaff: 45,
    monthlyRevenue: 850000,
    dailyRevenue: 45000,
  },
  
  branches: [
    {
      id: 'branch-1',
      name: 'Downtown Branch',
      location: 'Downtown',
      rooms: 45,
      occupancy: 85,
      revenue: 12000,
      adminId: 'admin@hotel.com',
    },
    {
      id: 'branch-2',
      name: 'Airport Branch',
      location: 'Airport',
      rooms: 38,
      occupancy: 92,
      revenue: 15000,
      adminId: 'admin2@hotel.com',
    },
    {
      id: 'branch-3',
      name: 'Beach Resort',
      location: 'Beachfront',
      rooms: 32,
      occupancy: 78,
      revenue: 18000,
      adminId: 'admin3@hotel.com',
    },
    {
      id: 'branch-4',
      name: 'City Center',
      location: 'City Center',
      rooms: 25,
      occupancy: 88,
      revenue: 10000,
      adminId: 'admin4@hotel.com',
    },
    {
      id: 'branch-5',
      name: 'Business District',
      location: 'Business District',
      rooms: 10,
      occupancy: 95,
      revenue: 8000,
      adminId: 'admin5@hotel.com',
    },
  ],
  
  // Sample room data for admin view
  rooms: [
    { id: 101, status: 'occupied', guest: 'John Smith', checkOut: '2024-08-05', branchId: 'branch-1' },
    { id: 102, status: 'available', guest: null, checkOut: null, branchId: 'branch-1' },
    { id: 103, status: 'cleaning', guest: null, checkOut: null, branchId: 'branch-1' },
    { id: 104, status: 'occupied', guest: 'Sarah Wilson', checkOut: '2024-08-04', branchId: 'branch-1' },
    { id: 105, status: 'available', guest: null, checkOut: null, branchId: 'branch-1' },
    { id: 106, status: 'occupied', guest: 'Mike Johnson', checkOut: '2024-08-06', branchId: 'branch-1' },
  ],
  
  // Sample client bookings
  bookings: [
    {
      id: 'booking-1',
      guestName: 'John Smith',
      email: 'client@hotel.com',
      roomNumber: 101,
      roomType: 'Deluxe Suite',
      checkIn: '2024-08-02',
      checkOut: '2024-08-05',
      branchId: 'branch-1',
      status: 'checked-in',
    },
    {
      id: 'booking-2',
      guestName: 'Sarah Wilson',
      email: 'sarah@example.com',
      roomNumber: 104,
      roomType: 'Standard Room',
      checkIn: '2024-08-01',
      checkOut: '2024-08-04',
      branchId: 'branch-1',
      status: 'checking-out',
    },
  ],
  
  // Sample complaints
  complaints: [
    {
      id: 1,
      client: 'John Smith',
      room: 101,
      issue: 'Air conditioning not working',
      status: 'pending',
      time: '2 hours ago',
      branchId: 'branch-1',
    },
    {
      id: 2,
      client: 'Sarah Wilson',
      room: 104,
      issue: 'Noisy neighbors',
      status: 'resolved',
      time: '1 day ago',
      branchId: 'branch-1',
    },
  ],
  
  // Sample staff data
  staff: [
    {
      id: 'director@hotel.com',
      name: 'Director Admin',
      role: 'director',
      email: 'director@hotel.com',
      status: 'active',
      lastLogin: '2024-08-03',
    },
    {
      id: 'admin@hotel.com',
      name: 'Branch Manager',
      role: 'admin',
      email: 'admin@hotel.com',
      branchId: 'branch-1',
      status: 'active',
      lastLogin: '2024-08-03',
    },
  ],
};

// Helper functions to get data based on user role and permissions
export const getDataForUser = (userEmail: string, userRole: string, branchId?: string) => {
  switch (userRole) {
    case 'director':
      return {
        stats: hotelData.globalStats,
        branches: hotelData.branches,
        staff: hotelData.staff,
      };
      
    case 'admin':
      return {
        rooms: hotelData.rooms.filter(room => room.branchId === branchId),
        bookings: hotelData.bookings.filter(booking => booking.branchId === branchId),
        complaints: hotelData.complaints.filter(complaint => complaint.branchId === branchId),
        branch: hotelData.branches.find(branch => branch.id === branchId),
      };
      
    case 'client':
      return {
        booking: hotelData.bookings.find(booking => booking.email === userEmail),
        room: hotelData.rooms.find(room => 
          hotelData.bookings.find(booking => 
            booking.email === userEmail && booking.roomNumber === room.id
          )
        ),
      };
      
    default:
      return {};
  }
};