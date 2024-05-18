'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import config from '../config';

interface Activity {
  id: number | string;
  action: string;
  timestamp: string;
  device: string;
  browser: string;
  // Add any other properties that exist in your activity object
}

const AdminPage = () => {
  const [users, setUsers] = useState<{ id: number; email: string; activities: Activity[]; isDeleted: boolean }[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUserActivities = async () => {
      try {
        const response = await axios.get(`${config.apiBaseUrl}/userAdminAct`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching user activities:', error);
      }
    };
    fetchUserActivities();
  }, []);

  const handleLogout = async (userId: any, activityId: any, logoutAll: boolean) => {
    try {
      // Make a request to the backend to log out the specific user associated with the activity
      await axios.post(`${config.apiBaseUrl}/logoutAdm`, { userId, activityId, logoutAll });
      if (logoutAll) {
        // Update the users state by removing the user
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      } else {
        // Update the activities state by removing the logged out activity
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, activities: user.activities.filter((a) => a.id !== activityId) } : user
          )
        );
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleDeleteUser = async (userId: any) => {
    try {
      // Make a request to the backend to set isDeleted to true for the user
      await axios.put(`${config.apiBaseUrl}/deleteUser/${userId}`);

      // Update the users state by removing the deleted user
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      {users.map((user) => (
        !user.isDeleted && (
          <div key={user.id} className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="px-6 py-4 bg-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">{user.email}</h2>
              <div>
                <Button
                  onClick={() => handleLogout(user.id, null, true)}
                  className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded mr-2"
                >
                  Logout User
                </Button>
                <Button
                  onClick={() => handleDeleteUser(user.id)}
                  className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded"
                >
                  Delete
                </Button>
              </div>
            </div>
            {user.activities.length > 0 ? (
              user.activities.map((activity) => (
                <div key={activity.id} className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <div>
                    <p className="text-gray-700 mb-2">{activity.action}</p>
                    <p className="text-gray-500 text-sm">
                      {activity.device}-{activity.browser}
                    </p>
                    <p className="text-gray-500 text-sm">{new Date(activity.timestamp).toLocaleString()}</p>
                  </div>
                  <Button
                    onClick={() => handleLogout(user.id, activity.id, false)}
                    className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded"
                  >
                    Logout
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-gray-600 p-6">No activities to display for this user.</p>
            )}
          </div>
        )
      ))}
    </div>
  );
};

export default AdminPage;