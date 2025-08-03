import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  onSnapshot,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { 
  Branch, 
  Room, 
  Booking, 
  Complaint, 
  User, 
  GlobalStats, 
  BranchStats,
  CreateEntityData,
  UpdateEntityData
} from '@/types';

// Branch Services
export const branchService = {
  async getAllBranches(): Promise<Branch[]> {
    const querySnapshot = await getDocs(collection(db, 'branches'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Branch[];
  },

  async getBranchById(id: string): Promise<Branch | null> {
    const docRef = doc(db, 'branches', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Branch;
    }
    return null;
  },

  async createBranch(branchData: CreateEntityData<Branch>): Promise<string> {
    const docRef = await addDoc(collection(db, 'branches'), {
      ...branchData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  },

  async updateBranch(id: string, branchData: UpdateEntityData<Branch>): Promise<void> {
    const docRef = doc(db, 'branches', id);
    await updateDoc(docRef, {
      ...branchData,
      updatedAt: Timestamp.now()
    });
  },

  async deleteBranch(id: string): Promise<void> {
    const docRef = doc(db, 'branches', id);
    await deleteDoc(docRef);
  }
};

// Room Services
export const roomService = {
  async getAllRooms(): Promise<Room[]> {
    const querySnapshot = await getDocs(collection(db, 'rooms'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Room[];
  },

  async getRoomsByBranch(branchId: string): Promise<Room[]> {
    const q = query(
      collection(db, 'rooms'),
      where('branchId', '==', branchId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Room[];
  },

  async getRoomById(id: string): Promise<Room | null> {
    const docRef = doc(db, 'rooms', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Room;
    }
    return null;
  },

  async createRoom(roomData: CreateEntityData<Room>): Promise<string> {
    const docRef = await addDoc(collection(db, 'rooms'), {
      ...roomData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  },

  async updateRoom(id: string, roomData: UpdateEntityData<Room>): Promise<void> {
    const docRef = doc(db, 'rooms', id);
    await updateDoc(docRef, {
      ...roomData,
      updatedAt: Timestamp.now()
    });
  },

  async deleteRoom(id: string): Promise<void> {
    const docRef = doc(db, 'rooms', id);
    await deleteDoc(docRef);
  }
};

// Booking Services
export const bookingService = {
  async getAllBookings(): Promise<Booking[]> {
    const querySnapshot = await getDocs(collection(db, 'bookings'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Booking[];
  },

  async getBookingsByBranch(branchId: string): Promise<Booking[]> {
    const q = query(
      collection(db, 'bookings'),
      where('branchId', '==', branchId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Booking[];
  },

  async getBookingsByEmail(email: string): Promise<Booking[]> {
    const q = query(
      collection(db, 'bookings'),
      where('email', '==', email)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Booking[];
  },

  async getBookingById(id: string): Promise<Booking | null> {
    const docRef = doc(db, 'bookings', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Booking;
    }
    return null;
  },

  async createBooking(bookingData: CreateEntityData<Booking>): Promise<string> {
    const docRef = await addDoc(collection(db, 'bookings'), {
      ...bookingData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  },

  async updateBooking(id: string, bookingData: UpdateEntityData<Booking>): Promise<void> {
    const docRef = doc(db, 'bookings', id);
    await updateDoc(docRef, {
      ...bookingData,
      updatedAt: Timestamp.now()
    });
  },

  async deleteBooking(id: string): Promise<void> {
    const docRef = doc(db, 'bookings', id);
    await deleteDoc(docRef);
  }
};

// Complaint Services
export const complaintService = {
  async getAllComplaints(): Promise<Complaint[]> {
    const querySnapshot = await getDocs(collection(db, 'complaints'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Complaint[];
  },

  async getComplaintsByBranch(branchId: string): Promise<Complaint[]> {
    const q = query(
      collection(db, 'complaints'),
      where('branchId', '==', branchId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Complaint[];
  },

  async getComplaintById(id: string): Promise<Complaint | null> {
    const docRef = doc(db, 'complaints', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Complaint;
    }
    return null;
  },

  async createComplaint(complaintData: CreateEntityData<Complaint>): Promise<string> {
    const docRef = await addDoc(collection(db, 'complaints'), {
      ...complaintData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  },

  async updateComplaint(id: string, complaintData: UpdateEntityData<Complaint>): Promise<void> {
    const docRef = doc(db, 'complaints', id);
    await updateDoc(docRef, {
      ...complaintData,
      updatedAt: Timestamp.now()
    });
  },

  async deleteComplaint(id: string): Promise<void> {
    const docRef = doc(db, 'complaints', id);
    await deleteDoc(docRef);
  }
};

// User Services
export const userService = {
  async getAllUsers(): Promise<User[]> {
    const querySnapshot = await getDocs(collection(db, 'users'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as User[];
  },

  async getUsersByRole(role: string): Promise<User[]> {
    const q = query(
      collection(db, 'users'),
      where('role', '==', role)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as User[];
  },

  async getUserById(id: string): Promise<User | null> {
    const docRef = doc(db, 'users', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as User;
    }
    return null;
  },

  async getUserByEmail(email: string): Promise<User | null> {
    const q = query(
      collection(db, 'users'),
      where('email', '==', email)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() } as User;
    }
    return null;
  },

  async createUser(userData: CreateEntityData<User>): Promise<string> {
    const docRef = await addDoc(collection(db, 'users'), {
      ...userData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  },

  async updateUser(id: string, userData: UpdateEntityData<User>): Promise<void> {
    const docRef = doc(db, 'users', id);
    await updateDoc(docRef, {
      ...userData,
      updatedAt: Timestamp.now()
    });
  },

  async deleteUser(id: string): Promise<void> {
    const docRef = doc(db, 'users', id);
    await deleteDoc(docRef);
  }
};

// Dashboard Statistics
export const dashboardService = {
  async getGlobalStats(): Promise<GlobalStats> {
    const [branches, rooms, bookings, users] = await Promise.all([
      branchService.getAllBranches(),
      roomService.getAllRooms(),
      bookingService.getAllBookings(),
      userService.getAllUsers()
    ]);

    const totalBranches = branches.length;
    const totalRooms = rooms.length;
    const bookedRooms = rooms.filter(room => room.status === 'occupied').length;
    const totalClients = users.filter(user => user.role === 'client').length;
    const totalStaff = users.filter(user => user.role === 'admin').length;
    
    const today = new Date().toISOString().split('T')[0];
    const checkInsToday = bookings.filter(booking => 
      booking.checkIn === today && booking.status === 'checked-in'
    ).length;
    const checkOutsToday = bookings.filter(booking => 
      booking.checkOut === today && booking.status === 'checked-out'
    ).length;

    const dailyRevenue = bookings
      .filter(booking => booking.checkIn === today)
      .reduce((sum, booking) => sum + booking.totalPrice, 0);

    const monthlyRevenue = bookings
      .filter(booking => {
        const bookingDate = new Date(booking.checkIn);
        const currentDate = new Date();
        return bookingDate.getMonth() === currentDate.getMonth() && 
               bookingDate.getFullYear() === currentDate.getFullYear();
      })
      .reduce((sum, booking) => sum + booking.totalPrice, 0);

    return {
      totalBranches,
      totalRooms,
      bookedRooms,
      availableRooms: totalRooms - bookedRooms,
      totalClients,
      activeClients: users.filter(user => user.role === 'client' && user.status === 'active').length,
      checkInsToday,
      checkOutsToday,
      dailyRevenue,
      monthlyRevenue,
      totalStaff,
      activeAdmins: users.filter(user => user.role === 'admin' && user.status === 'active').length,
    };
  },

  async getBranchStats(branchId: string): Promise<BranchStats> {
    const [rooms, bookings, complaints] = await Promise.all([
      roomService.getRoomsByBranch(branchId),
      bookingService.getBookingsByBranch(branchId),
      complaintService.getComplaintsByBranch(branchId)
    ]);

    const totalRooms = rooms.length;
    const occupiedRooms = rooms.filter(room => room.status === 'occupied').length;
    const occupancy = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;
    
    const today = new Date().toISOString().split('T')[0];
    const todayRevenue = bookings
      .filter(booking => booking.checkIn === today)
      .reduce((sum, booking) => sum + booking.totalPrice, 0);

    return {
      totalRooms,
      occupiedRooms,
      availableRooms: totalRooms - occupiedRooms,
      occupancy,
      todayRevenue,
      totalBookings: bookings.length,
      activeBookings: bookings.filter(booking => 
        ['confirmed', 'checked-in'].includes(booking.status)
      ).length,
      totalComplaints: complaints.length,
      pendingComplaints: complaints.filter(complaint => complaint.status === 'pending').length,
    };
  }
}; 