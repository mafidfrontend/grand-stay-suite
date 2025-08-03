import React from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { Building2, Users, Bed, TrendingUp, UserCheck, UserX, DollarSign, Calendar, Loader2 } from 'lucide-react';
import { useGlobalStats, useBranches } from '@/hooks/useFirebaseData';
import { StatCardProps } from '@/types';

export default function Director() {
  const { data: stats, isLoading: statsLoading, error: statsError } = useGlobalStats();
  const { data: branches, isLoading: branchesLoading, error: branchesError } = useBranches();

  // Loading state
  if (statsLoading || branchesLoading) {
    return (
      <Layout title="Director Dashboard" subtitle="Complete overview of all hotel operations">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-base-content/70">Loading dashboard data...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Error state
  if (statsError || branchesError) {
    return (
      <Layout title="Director Dashboard" subtitle="Complete overview of all hotel operations">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="text-error text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold mb-2">Error Loading Data</h3>
            <p className="text-base-content/70">Unable to load dashboard information. Please try again later.</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Use default values if data is not available
  const safeStats = stats || {
    totalBranches: 0,
    totalRooms: 0,
    bookedRooms: 0,
    availableRooms: 0,
    totalClients: 0,
    activeClients: 0,
    checkInsToday: 0,
    checkOutsToday: 0,
    dailyRevenue: 0,
    monthlyRevenue: 0,
    totalStaff: 0,
    activeAdmins: 0,
  };

  const safeBranches = branches || [];

  const StatCard = ({ icon: Icon, title, value, subtitle, color = 'primary' }: StatCardProps) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="card bg-base-100/95 backdrop-blur-sm shadow-soft hover:shadow-elevated transition-all duration-300 border border-base-300/50 card-enhanced"
    >
      <div className="card-body p-6">
        <div className="flex items-center gap-4">
          <div className={`p-4 rounded-xl bg-gradient-to-br from-${color}/20 to-${color}/10 shadow-soft`}>
            <Icon className={`h-7 w-7 text-${color}`} />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-base-content/70 uppercase tracking-wide">{title}</h3>
            <p className="text-3xl font-bold text-base-content mt-1">{value}</p>
            {subtitle && <p className="text-xs text-base-content/60 mt-1">{subtitle}</p>}
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <Layout 
      title="Director Dashboard" 
      subtitle="Complete overview of all hotel operations"
    >
      <div className="space-y-6">
        {/* Key Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={Building2}
            title="Total Branches"
            value={safeStats.totalBranches}
            subtitle="Nationwide locations"
          />
          <StatCard
            icon={Bed}
            title="Room Occupancy"
            value={safeStats.totalRooms > 0 ? `${Math.round((safeStats.bookedRooms / safeStats.totalRooms) * 100)}%` : '0%'}
            subtitle={`${safeStats.bookedRooms}/${safeStats.totalRooms} rooms`}
            color="info"
          />
          <StatCard
            icon={Users}
            title="Active Clients"
            value={safeStats.activeClients}
            subtitle={`${safeStats.totalClients} total clients`}
            color="success"
          />
          <StatCard
            icon={DollarSign}
            title="Daily Revenue"
            value={`$${safeStats.dailyRevenue.toLocaleString()}`}
            subtitle="Today's earnings"
            color="accent"
          />
        </div>

        {/* Daily Operations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card bg-base-100/95 backdrop-blur-sm shadow-soft border border-base-300/50 card-enhanced"
          >
            <div className="card-body p-6">
              <h2 className="card-title flex items-center gap-3 text-xl">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                Today's Activity
              </h2>
              <div className="space-y-4 mt-6">
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-success/10 to-success/5 rounded-xl border border-success/20"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-success/20">
                      <UserCheck className="h-5 w-5 text-success" />
                    </div>
                    <span className="font-semibold">Check-ins</span>
                  </div>
                  <span className="font-bold text-2xl text-success">{safeStats.checkInsToday}</span>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-warning/10 to-warning/5 rounded-xl border border-warning/20"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-warning/20">
                      <UserX className="h-5 w-5 text-warning" />
                    </div>
                    <span className="font-semibold">Check-outs</span>
                  </div>
                  <span className="font-bold text-2xl text-warning">{safeStats.checkOutsToday}</span>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-info/10 to-info/5 rounded-xl border border-info/20"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-info/20">
                      <Users className="h-5 w-5 text-info" />
                    </div>
                    <span className="font-semibold">Active Staff</span>
                  </div>
                  <span className="font-bold text-2xl text-info">{safeStats.activeAdmins}</span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card bg-base-100/95 backdrop-blur-sm shadow-soft border border-base-300/50 card-enhanced"
          >
            <div className="card-body p-6">
              <h2 className="card-title flex items-center gap-3 text-xl">
                <div className="p-2 rounded-lg bg-accent/10">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
                Revenue Overview
              </h2>
              <div className="space-y-6 mt-6">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="stat bg-gradient-to-r from-primary/5 to-primary/10 p-4 rounded-xl border border-primary/20"
                >
                  <div className="stat-title text-primary font-semibold">Daily Revenue</div>
                  <div className="stat-value text-primary text-3xl">
                    ${safeStats.dailyRevenue.toLocaleString()}
                  </div>
                  <div className="stat-desc text-success font-medium">↗︎ 12% vs yesterday</div>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="stat bg-gradient-to-r from-secondary/5 to-secondary/10 p-4 rounded-xl border border-secondary/20"
                >
                  <div className="stat-title text-secondary font-semibold">Monthly Revenue</div>
                  <div className="stat-value text-secondary text-3xl">
                    ${safeStats.monthlyRevenue.toLocaleString()}
                  </div>
                  <div className="stat-desc text-success font-medium">↗︎ 8% vs last month</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Branch Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card bg-base-100/95 backdrop-blur-sm shadow-soft border border-base-300/50 card-enhanced"
        >
          <div className="card-body p-6">
            <h2 className="card-title text-xl mb-6">Branch Performance</h2>
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr className="bg-base-200/50">
                    <th className="font-semibold text-base-content">Branch</th>
                    <th className="font-semibold text-base-content">Rooms</th>
                    <th className="font-semibold text-base-content">Occupancy</th>
                    <th className="font-semibold text-base-content">Revenue</th>
                    <th className="font-semibold text-base-content">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {safeBranches.map((branch, index) => (
                    <motion.tr
                      key={branch.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-base-200/30 transition-colors duration-200"
                    >
                      <td className="font-semibold text-base-content">{branch.name}</td>
                      <td className="text-base-content/80">{branch.rooms}</td>
                      <td>
                        <div className="flex items-center gap-3">
                          <progress 
                            className="progress progress-primary w-20 h-2" 
                            value={branch.occupancy} 
                            max="100"
                          ></progress>
                          <span className="text-sm font-medium text-base-content/80">{branch.occupancy}%</span>
                        </div>
                      </td>
                      <td className="font-bold text-primary">${branch.revenue.toLocaleString()}</td>
                      <td>
                        <div className={`badge badge-sm font-medium ${
                          branch.occupancy > 90 ? 'badge-success bg-success/20 text-success border-success/30' :
                          branch.occupancy > 70 ? 'badge-warning bg-warning/20 text-warning border-warning/30' : 
                          'badge-error bg-error/20 text-error border-error/30'
                        }`}>
                          {branch.occupancy > 90 ? 'Excellent' :
                           branch.occupancy > 70 ? 'Good' : 'Low'}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}