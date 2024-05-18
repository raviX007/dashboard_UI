// "use client"
// import React from 'react';
// import { useRouter } from 'next/navigation'; // Importing useRouter from next/navigation

  
// const Page: React.FC = () => {
//   const router = useRouter();

//   const handleLoginClick = () => {
//     router.push('/login');
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <h1 className="text-3xl font-bold mb-4">Welcome to My Website</h1>
//       <button
//         onClick={handleLoginClick}
//         className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
//       >
//         Login
//       </button>
//     </div>
//   );
// };

// export default Page;

"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

const Page: React.FC = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    
    router.push('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
          Welcome to<br/> 
          Secure Login Dashboard
        </h1>
        <button
          onClick={handleLoginClick}
          className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold hover:opacity-90 transition-opacity duration-300"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Page;