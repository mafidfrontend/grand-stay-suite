import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  branchService, 
  roomService, 
  bookingService, 
  complaintService, 
  userService, 
  dashboardService
} from '@/lib/firebaseService';
import { 
  Branch,
  Room,
  Booking,
  Complaint,
  User,
  UpdateEntityData
} from '@/types';

// Branch Hooks
export const useBranches = () => {
  return useQuery({
    queryKey: ['branches'],
    queryFn: branchService.getAllBranches,
  });
};

export const useBranch = (id: string) => {
  return useQuery({
    queryKey: ['branches', id],
    queryFn: () => branchService.getBranchById(id),
    enabled: !!id,
  });
};

export const useCreateBranch = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: branchService.createBranch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['branches'] });
    },
  });
};

export const useUpdateBranch = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateEntityData<Branch> }) =>
      branchService.updateBranch(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['branches'] });
      queryClient.invalidateQueries({ queryKey: ['branches', id] });
    },
  });
};

export const useDeleteBranch = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: branchService.deleteBranch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['branches'] });
    },
  });
};

// Room Hooks
export const useRooms = () => {
  return useQuery({
    queryKey: ['rooms'],
    queryFn: roomService.getAllRooms,
  });
};

export const useRoomsByBranch = (branchId: string) => {
  return useQuery({
    queryKey: ['rooms', 'branch', branchId],
    queryFn: () => roomService.getRoomsByBranch(branchId),
    enabled: !!branchId,
  });
};

export const useRoom = (id: string) => {
  return useQuery({
    queryKey: ['rooms', id],
    queryFn: () => roomService.getRoomById(id),
    enabled: !!id,
  });
};

export const useCreateRoom = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: roomService.createRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    },
  });
};

export const useUpdateRoom = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateEntityData<Room> }) =>
      roomService.updateRoom(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      queryClient.invalidateQueries({ queryKey: ['rooms', id] });
    },
  });
};

export const useDeleteRoom = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: roomService.deleteRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    },
  });
};

// Booking Hooks
export const useBookings = () => {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: bookingService.getAllBookings,
  });
};

export const useBookingsByBranch = (branchId: string) => {
  return useQuery({
    queryKey: ['bookings', 'branch', branchId],
    queryFn: () => bookingService.getBookingsByBranch(branchId),
    enabled: !!branchId,
  });
};

export const useBookingsByEmail = (email: string) => {
  return useQuery({
    queryKey: ['bookings', 'email', email],
    queryFn: () => bookingService.getBookingsByEmail(email),
    enabled: !!email,
  });
};

export const useBooking = (id: string) => {
  return useQuery({
    queryKey: ['bookings', id],
    queryFn: () => bookingService.getBookingById(id),
    enabled: !!id,
  });
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: bookingService.createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
};

export const useUpdateBooking = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateEntityData<Booking> }) =>
      bookingService.updateBooking(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['bookings', id] });
    },
  });
};

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: bookingService.deleteBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
};

// Complaint Hooks
export const useComplaints = () => {
  return useQuery({
    queryKey: ['complaints'],
    queryFn: complaintService.getAllComplaints,
  });
};

export const useComplaintsByBranch = (branchId: string) => {
  return useQuery({
    queryKey: ['complaints', 'branch', branchId],
    queryFn: () => complaintService.getComplaintsByBranch(branchId),
    enabled: !!branchId,
  });
};

export const useComplaint = (id: string) => {
  return useQuery({
    queryKey: ['complaints', id],
    queryFn: () => complaintService.getComplaintById(id),
    enabled: !!id,
  });
};

export const useCreateComplaint = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: complaintService.createComplaint,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['complaints'] });
    },
  });
};

export const useUpdateComplaint = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateEntityData<Complaint> }) =>
      complaintService.updateComplaint(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['complaints'] });
      queryClient.invalidateQueries({ queryKey: ['complaints', id] });
    },
  });
};

export const useDeleteComplaint = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: complaintService.deleteComplaint,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['complaints'] });
    },
  });
};

// User Hooks
export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: userService.getAllUsers,
  });
};

export const useUsersByRole = (role: string) => {
  return useQuery({
    queryKey: ['users', 'role', role],
    queryFn: () => userService.getUsersByRole(role),
    enabled: !!role,
  });
};

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => userService.getUserById(id),
    enabled: !!id,
  });
};

export const useUserByEmail = (email: string) => {
  return useQuery({
    queryKey: ['users', 'email', email],
    queryFn: () => userService.getUserByEmail(email),
    enabled: !!email,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: userService.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateEntityData<User> }) =>
      userService.updateUser(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['users', id] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: userService.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

// Dashboard Hooks
export const useGlobalStats = () => {
  return useQuery({
    queryKey: ['dashboard', 'global-stats'],
    queryFn: dashboardService.getGlobalStats,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};

export const useBranchStats = (branchId: string) => {
  return useQuery({
    queryKey: ['dashboard', 'branch-stats', branchId],
    queryFn: () => dashboardService.getBranchStats(branchId),
    enabled: !!branchId,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}; 