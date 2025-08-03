import { Timestamp } from 'firebase/firestore';
import { User } from 'firebase/auth';

// User and Authentication Types
export type UserRole = 'director' | 'admin' | 'client';

export interface AuthUser extends User {
  role?: UserRole;
  branchId?: string;
  permissions?: string[];
}

export interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  hasRole: (role: UserRole) => boolean;
}

// Database Entity Types
export interface Branch {
  id: string;
  name: string;
  location: string;
  rooms: number;
  occupancy: number;
  revenue: number;
  adminId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Room {
  id: string;
  roomNumber: number;
  status: 'available' | 'occupied' | 'cleaning' | 'maintenance';
  guest?: string;
  checkOut?: string;
  branchId: string;
  roomType: string;
  price: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Booking {
  id: string;
  guestName: string;
  email: string;
  roomNumber: number;
  roomType: string;
  checkIn: string;
  checkOut: string;
  branchId: string;
  status: 'pending' | 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled';
  totalPrice: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Complaint {
  id: string;
  client: string;
  room: number;
  issue: string;
  status: 'pending' | 'in-progress' | 'resolved';
  time: string;
  branchId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  branchId?: string;
  status: 'active' | 'inactive';
  lastLogin: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Dashboard Statistics Types
export interface GlobalStats {
  totalBranches: number;
  totalRooms: number;
  bookedRooms: number;
  availableRooms: number;
  totalClients: number;
  activeClients: number;
  checkInsToday: number;
  checkOutsToday: number;
  dailyRevenue: number;
  monthlyRevenue: number;
  totalStaff: number;
  activeAdmins: number;
}

export interface BranchStats {
  totalRooms: number;
  occupiedRooms: number;
  availableRooms: number;
  occupancy: number;
  todayRevenue: number;
  totalBookings: number;
  activeBookings: number;
  totalComplaints: number;
  pendingComplaints: number;
}

// Component Props Types
export interface LayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string | number;
  subtitle?: string;
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info';
}

// Form Types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface BookingFormData {
  guestName: string;
  email: string;
  roomNumber: number;
  roomType: string;
  checkIn: string;
  checkOut: string;
  branchId: string;
  totalPrice: number;
}

export interface ComplaintFormData {
  client: string;
  room: number;
  issue: string;
  branchId: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Utility Types
export type CreateEntityData<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateEntityData<T> = Partial<T>;

// Theme Types
export type Theme = 'light' | 'dark' | 'system';

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}

// Permission Types
export type Permission = 
  | 'manage_all'
  | 'view_reports'
  | 'manage_staff'
  | 'manage_branches'
  | 'manage_rooms'
  | 'view_clients'
  | 'handle_complaints'
  | 'manage_bookings'
  | 'view_booking'
  | 'request_service'
  | 'view_room';

// Status Types
export type RoomStatus = 'available' | 'occupied' | 'cleaning' | 'maintenance';
export type BookingStatus = 'pending' | 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled';
export type ComplaintStatus = 'pending' | 'in-progress' | 'resolved';
export type UserStatus = 'active' | 'inactive';

// Room Type Options
export type RoomType = 'Standard' | 'Deluxe' | 'Suite' | 'Presidential Suite';

// Location Types
export type Location = 'Downtown' | 'Airport' | 'Beachfront' | 'City Center' | 'Business District'; 