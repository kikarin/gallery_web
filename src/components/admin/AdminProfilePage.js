import React from 'react';

const AdminProfilePage = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Profile</h2>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                value="Admin User"
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                value="admin@example.com"
                readOnly
              />
            </div>
          </div>
        </div>
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProfilePage; 