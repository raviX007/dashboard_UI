// 'use client';
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import config from '../config';
// import {
//     AlertDialog,
//     AlertDialogAction,
//     AlertDialogCancel,
//     AlertDialogContent,
//     AlertDialogDescription,
//     AlertDialogFooter,
//     AlertDialogHeader,
//     AlertDialogTitle,
    
//   } from '@/components/ui/alert-dialog';
//   import {Button} from '@/components/ui/button';
//   import { Input } from '@/components/ui/input';
//   import {Checkbox} from '@/components/ui/checkbox'; 
// const Register = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const router = useRouter();

//   const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       console.log('Inside handleregister');
//       const formURL = `${config.apiBaseUrl}/register`;
//       await fetch(formURL, {
//         method: 'POST',
//         body: JSON.stringify({ email, password, isAdmin }),
//         headers: {
//           'Content-Type': 'application/json',
//           accept: 'application/json',
//         },
//       });
//       router.push('/login');
//     } catch (err: any) {
//       console.error(err);
//       setErrorMessage(err.message);
//       setIsOpen(true);
//     }
//   };

 

//   const handleAdminCheckedChange = (checked: boolean) => {
//     setIsAdmin(checked);
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
//       <h2 className="text-2xl font-bold mb-4">Register</h2>
//       <form onSubmit={handleRegister} className="flex flex-col space-y-4">
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
//         <div className="flex items-center space-x-2">
//           <Checkbox
//             checked={isAdmin}
//             onCheckedChange={handleAdminCheckedChange}
//             className="h-5 w-5 text-blue-600"
//           />
//           <label htmlFor="isAdmin" className="text-gray-700">
//             Admin
//           </label>
//         </div>
//         <Button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
//           Register
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default Register;

'use client';
import React, { useState } from 'react';
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
import { Checkbox } from '@/components/ui/checkbox';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Inside handleregister');
      const formURL = `${config.apiBaseUrl}/register`;
      const isDeleted= false;
      await axios.post(formURL, { email, password, isAdmin,isDeleted }, {
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      });
      router.push('/login');
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message);
      setIsOpen(true);
    }
  };
  const handleAdminCheckedChange = (checked: boolean) => {
    setIsAdmin(checked);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Register
        </h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-4">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-6 flex items-center">
            <Checkbox
              checked={isAdmin}
              onCheckedChange={handleAdminCheckedChange}
              className="mr-2 text-indigo-500 focus:ring-indigo-500"
            />
            <label htmlFor="isAdmin" className="text-gray-700">
              Admin
            </label>
          </div>
          <div className="flex justify-center">
            <Button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
            >
              Register
            </Button>
          </div>
        </form>
      </div>

      <AlertDialog open={isOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Error</AlertDialogTitle>
            <AlertDialogDescription>{errorMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => setIsOpen(false)}>
              Retry
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Register;