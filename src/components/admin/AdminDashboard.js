import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-bold mb-2">Users</h3>
          <p className="text-gray-600">Manage user accounts</p>
          <Link to="/admin/users" className="text-blue-500 hover:text-blue-700">
            View Users →
          </Link>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-bold mb-2">Settings</h3>
          <p className="text-gray-600">System configuration</p>
          <Link to="/admin/settings" className="text-blue-500 hover:text-blue-700">
            View Settings →
          </Link>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-bold mb-2">Reports</h3>
          <p className="text-gray-600">View analytics and reports</p>
          <Link to="/admin/reports" className="text-blue-500 hover:text-blue-700">
            View Reports →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 