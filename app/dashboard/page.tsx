
// 'use client';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { useRouter } from 'next/navigation';
// import config from '../config';

// const Dashboard = () => {
//   const [user, setUser] = useState<string>('');
//   const [activities, setActivities] = useState<any[]>([]);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const userEmail = localStorage.getItem('userEmail') || '';
//         console.log('userEmail', userEmail);
//         setUser(userEmail);
//         const url = `${config.apiBaseUrl}/userAct?userEmail=${userEmail}`;
//         console.log('url', url);
//         const response = await axios.get(url);
//         console.log('response', response.data);
//         setActivities(response.data);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//         //router.push('/login'); // Redirect to the login page if user is not authenticated
//       }
//     };
//     fetchUserData();
//   }, [activities]);

//   const handleLogout = async () => {
//     try {
//         const url = `${config.apiBaseUrl}/logout`;
//       // Make a logout request to the server
//       await axios.post(url);

//       // Clear the user information from local storage
//       localStorage.removeItem('userEmail');

//       // Reset the user state
//       setUser('');

//       // Redirect to the login page after logout
//       router.push('/login');
//     } catch (error) {
//       console.error('Error during logout:', error);
//     }
//   };
//   return (
//     <div className="flex flex-col min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
//       <div className="flex-grow flex items-center justify-center">
//         {user ? (
//           <div className="max-w-4xl w-full p-8 bg-white rounded-lg shadow-2xl">
//             <div className="flex justify-between items-center mb-8">
//               <h2 className="text-3xl font-bold text-gray-800">Welcome, {user}</h2>
//               <Button onClick={handleLogout} className="bg-gradient-to-r from-red-500 to-pink-500 text-white hover:opacity-90 transition-opacity duration-300 px-6 py-3 rounded-lg shadow-md">
//                 Logout
//               </Button>
//             </div>
//             <h3 className="text-2xl font-bold mb-6 text-gray-700">Login Activities</h3>
//             {activities.length > 0 ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {activities.map((activity, index) => (
//                   <Card key={index} className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
//                     <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2">
//                       <CardTitle className="font-semibold">{activity.device}</CardTitle>
//                     </CardHeader>
//                     <CardContent className="p-4">
//                       <p className="text-gray-700 mb-2">{activity.action}</p>
//                       <p className="text-gray-500 text-sm">{new Date(activity.timestamp).toLocaleString()}</p>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-600">No activities to display.</p>
//             )}
//           </div>
//         ) : (
//           <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
//             <h2 className="text-3xl font-bold mb-4 text-gray-800">Please log in</h2>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import config from '../config';

const Dashboard = () => {
  const [user, setUser] = useState<string>('');
  const [activities, setActivities] = useState<any[]>([]);
  const [popupMessage, setPopupMessage] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userEmail = localStorage.getItem('userEmail') || '';
        console.log('userEmail', userEmail);
        setUser(userEmail);
        const url = `${config.apiBaseUrl}/userAct?userEmail=${userEmail}`;
        console.log('url', url);
        const response = await axios.get(url);
        console.log('response', response.data);
        if(response.data.length===0){

            router.push('/login');
            
        

            
            
        }
    
        setActivities(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        router.push('/login'); // Redirect to the login page if user is not authenticated
      }
    };
    fetchUserData();
  }, [ ]);

  const handleLogout = async () => {
    try {
      const url = `${config.apiBaseUrl}/logout`;
      const userEmail = localStorage.getItem('userEmail');
  
      // Make a logout request to the server with userEmail in the request body
      await axios.post(url, { userEmail });
  
      // Clear the user information from local storage
      localStorage.removeItem('userEmail');
  
      // Reset the user state
      setUser('');
  
      // Redirect to the login page after logout
      router.push('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleCardLogout = async (activityId:any) => {
    try {
      const userEmail = localStorage.getItem('userEmail') || '';
      console.log('Logging out activityId:', activityId);
      console.log('userEmail:', userEmail);
  
      const url = `${config.apiBaseUrl}/logoutCard`;
      console.log('Sending POST request to:', url);
  
      // Make a request to the backend to log out the specific user associated with the activity
      await axios.post(url, {userEmail});
  
      console.log('Logout request successful');
  
      // Update the activities state by removing the logged out activity
      setActivities(activities.filter((a) => a.id !== activityId));
      if(activities.length === 0){
        router.push('/login');
      }
  
      console.log('Activities updated');
  
      // Show the popup message
      setPopupMessage(`User successfully logged off from ${activityId}`);
  
      // Clear the popup message after 3 seconds
      setTimeout(() => {
        setPopupMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error during card logout:', error);
    }
  };
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="flex-grow flex items-center justify-center">
        {user ? (
          <div className="max-w-4xl w-full p-8 bg-white rounded-lg shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">Welcome, {user}</h2>
              <Button onClick={handleLogout} className="bg-gradient-to-r from-red-500 to-pink-500 text-white hover:opacity-90 transition-opacity duration-300 px-6 py-3 rounded-lg shadow-md">
                Logout
              </Button>
            </div>
            <h3 className="text-2xl font-bold mb-6 text-gray-700">Login Activities</h3>
            {activities.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {activities.map((activity, index) => (
                  <Card key={index} className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
                    <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2">
                      <CardTitle className="font-semibold">{activity.device}-{activity.browser}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="text-gray-700 mb-2">{activity.action}</p>
                      <p className="text-gray-500 text-sm">{new Date(activity.timestamp).toLocaleString()}</p>
                      <Button onClick={() => handleCardLogout(activity.id)} className="bg-red-500 text-white hover:bg-red-600 mt-4">
                        Logout
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No activities to display.</p>
            )}
          </div>
        ) : (
          <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Please log in</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;