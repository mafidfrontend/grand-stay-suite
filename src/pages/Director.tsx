import React from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { Building2, Users, Bed, TrendingUp, UserCheck, UserX, DollarSign, Calendar } from 'lucide-react';

export default function Director() {
  const stats = {
    totalBranches: 5,
    totalRooms: 150,
    bookedRooms: 120,
    availableRooms: 30,
    totalClients: 450,
    activeClients: 120,
    checkInsToday: 25,
    checkOutsToday: 18,
    dailyRevenue: 45000,
    monthlyRevenue: 850000,
    totalStaff: 45,
    activeAdmins: 12,
  };

  const branches = [
    { id: 1, name: 'Downtown Branch', rooms: 45, occupancy: 85, revenue: 12000 },
    { id: 2, name: 'Airport Branch', rooms: 38, occupancy: 92, revenue: 15000 },
    { id: 3, name: 'Beach Resort', rooms: 32, occupancy: 78, revenue: 18000 },
    { id: 4, name: 'City Center', rooms: 25, occupancy: 88, revenue: 10000 },
    { id: 5, name: 'Business District', rooms: 10, occupancy: 95, revenue: 8000 },
  ];

  const StatCard = ({ icon: Icon, title, value, subtitle, color = 'primary' }: any) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="card bg-base-100 shadow-md hover:shadow-lg transition-smooth"
    >
      <div className="card-body">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-lg bg-${color}/10`}>
            <Icon className={`h-6 w-6 text-${color}`} />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-base-content/70">{title}</h3>
            <p className="text-2xl font-bold text-base-content">{value}</p>
            {subtitle && <p className="text-xs text-base-content/60">{subtitle}</p>}
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
            value={stats.totalBranches}
            subtitle="Nationwide locations"
          />
          <StatCard
            icon={Bed}
            title="Room Occupancy"
            value={`${Math.round((stats.bookedRooms / stats.totalRooms) * 100)}%`}
            subtitle={`${stats.bookedRooms}/${stats.totalRooms} rooms`}
            color="info"
          />
          <StatCard
            icon={Users}
            title="Active Clients"
            value={stats.activeClients}
            subtitle={`${stats.totalClients} total clients`}
            color="success"
          />
          <StatCard
            icon={DollarSign}
            title="Daily Revenue"
            value={`$${stats.dailyRevenue.toLocaleString()}`}
            subtitle="Today's earnings"
            color="accent"
          />
        </div>

        {/* Daily Operations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card bg-base-100 shadow-md"
          >
            <div className="card-body">
              <h2 className="card-title flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Today's Activity
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                  <div className="flex items-center gap-2">
                    <UserCheck className="h-4 w-4 text-success" />
                    <span>Check-ins</span>
                  </div>
                  <span className="font-bold text-success">{stats.checkInsToday}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg">
                  <div className="flex items-center gap-2">
                    <UserX className="h-4 w-4 text-warning" />
                    <span>Check-outs</span>
                  </div>
                  <span className="font-bold text-warning">{stats.checkOutsToday}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-info/10 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-info" />
                    <span>Active Staff</span>
                  </div>
                  <span className="font-bold text-info">{stats.activeAdmins}</span>
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
              <h2 className="card-title flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Revenue Overview
              </h2>
              <div className="space-y-4">
                <div className="stat">
                  <div className="stat-title">Daily Revenue</div>
                  <div className="stat-value text-primary">
                    ${stats.dailyRevenue.toLocaleString()}
                  </div>
                  <div className="stat-desc text-success">↗︎ 12% vs yesterday</div>
                </div>
                <div className="stat">
                  <div className="stat-title">Monthly Revenue</div>
                  <div className="stat-value text-secondary">
                    ${stats.monthlyRevenue.toLocaleString()}
                  </div>
                  <div className="stat-desc text-success">↗︎ 8% vs last month</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Branch Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card bg-base-100 shadow-md"
        >
          <div className="card-body">
            <h2 className="card-title">Branch Performance</h2>
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Branch</th>
                    <th>Rooms</th>
                    <th>Occupancy</th>
                    <th>Revenue</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {branches.map((branch, index) => (
                    <motion.tr
                      key={branch.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <td className="font-medium">{branch.name}</td>
                      <td>{branch.rooms}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <progress 
                            className="progress progress-primary w-16" 
                            value={branch.occupancy} 
                            max="100"
                          ></progress>
                          <span className="text-sm">{branch.occupancy}%</span>
                        </div>
                      </td>
                      <td className="font-bold">${branch.revenue.toLocaleString()}</td>
                      <td>
                        <div className={`badge ${
                          branch.occupancy > 90 ? 'badge-success' :
                          branch.occupancy > 70 ? 'badge-warning' : 'badge-error'
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