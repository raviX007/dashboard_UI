
// 'use client';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import config from '../config';
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from '@/components/ui/alert-dialog';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';


// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isOpen, setIsOpen] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const router = useRouter();
//   const [browserName, setBrowserName] = useState<string | null>(null);
//   const [deviceName, setDeviceName] = useState<string | null>(null);


//   const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//       console.log('Inside handleLogin');
//     //   await setBrowserInfo();
//     //   setDeviceInfo();
   

    

// const formURL = `${config.apiBaseUrl}/login`;
// try {
//   const response = await axios.post(formURL, {
//     email,
//     password,
//   }, {
//     headers: {
//       'Content-Type': 'application/json',
//       'accept': 'application/json',
//     },
//   });

//   // Handle successful response
//   console.log('Login successful');

//   localStorage.setItem('userEmail',email)
//       router.push('/dashboard');
// console.log('Response:', response.data);
// } catch (error:any) {
//   // Handle error
//   if (error.response) {
//     // The request was made and the server responded with a status code
//     // that falls out of the range of 2xx
//     console.error('Request failed with status code:', error.response.status);
//     console.error('Response data:', error.response.data);
//   } else if (error.request) {
//     // The request was made but no response was received
//     console.error('No response received:', error.request);
//   } else {
//     // Something happened in setting up the request that triggered an Error
//     console.error('Error:', error.message);
//   }
//   //console.error(error);
//       setErrorMessage(error.message);
//       setIsOpen(true);
// }

    
//       // Redirect to the desired page after successful login
      
//     // } catch (err: any) {
//     //   console.error(err);
//     //   setErrorMessage(err.message);
//     //   setIsOpen(true);
//     // }
//   };
  
//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Error</AlertDialogTitle>
//             <AlertDialogDescription>{errorMessage}</AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancel</AlertDialogCancel>
//             <AlertDialogAction>Retry</AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//       <h2 className="text-2xl font-bold mb-4">Login</h2>
//       <form onSubmit={handleLogin} className="flex flex-col space-y-4">
//         <Input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <Input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <Button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
//           Login
//         </Button>
//         <p className="text-sm">
//           New user?{' '}
//           <a href="/register" className="text-blue-500 hover:underline">
//             Sign up
//           </a>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;
'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import config from '../config';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Inside handleLogin');

    const formURL = `${config.apiBaseUrl}/login`;
    try {
      const response = await axios.post(
        formURL,
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
          },
        }
      );

      // Handle successful response
      console.log('Login successful');

      localStorage.setItem('userEmail', email);
      if (response.data.isAdmin) {
        // User is an admin, redirect to /admin
        router.push('/verif');
      } else {
        // User is not an admin, redirect to /dashboard
        router.push('/verif');
      }
      console.log('Response:', response.data);
    } catch (error: any) {
      // Handle error
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Request failed with status code:', error.response.status);
        console.error('Response data:', error.response.data);
        setErrorMessage(error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error:', error.message);
      }
      //setErrorMessage(error.message);
      setIsOpen(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Error</AlertDialogTitle>
            <AlertDialogDescription>{errorMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Retry</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="py-3 px-4 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="py-3 px-4 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Login
          </Button>
          <p className="text-sm text-center text-gray-600">
            New user?{' '}
            <a href="/register" className="text-blue-500 hover:underline">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;