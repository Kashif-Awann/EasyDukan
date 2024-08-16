'use client';

import { exit } from 'process';
import { usersData } from '../hooks/userData';



export default function DashboardPage() {
   const [data, loading] = usersData();

   exit;
  return (
    <div>
    {loading ? (
      <p>Loading user data...</p>
    ) : (
      data.length > 0 ? (
        data.map((user) => (
          <div key={user.id} className='block font-mono pl-10 p-4'>
            <h1 className='text-2xl text-fuchsia-700 font-medium my-2'>Welcome, {user.firstName} {user.lastName}</h1>
            <p className='text-xl my-2'>Phone Number: {user.phoneNumber}</p>
            <p className='my-2'>Your ID Number: {user.id}</p>
            <hr />
          </div>
        ))
      ) : (
        <p>No users found.</p>
      )
    )}
  </div>
  );
}
