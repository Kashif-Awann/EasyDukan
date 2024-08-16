// useUserData.js

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';


export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  imageUrl: string;
  // Add other fields as needed
}
// Custom hook to fetch user data
export const usersData = (): [User[], boolean] => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true); // Optional: Loading state

  useEffect(() => {
    const getUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Users"));
        let list: User[] = [];
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() } as User);
        });
        setData(list);
        setLoading(false); // Set loading to false after data fetch
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false); // Handle error: Set loading to false
      }
    };

    getUsers();
  }, []);

  return [ data, loading ];
};

export const LoginUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth();
  const firestore = getFirestore();

useEffect(() => {

 const unsubscribe = onAuthStateChanged(auth, async (user) => { 
  if (user) {
    try {
      const userDocRef = doc(firestore, "Users", user.uid);
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        setUser(userDocSnapshot.data() as User);
      } else {
        console.log('No such document!');
        setUser(null);
    }
   } catch(error) {
      console.log(error);
      setUser(null)
    }
   } else {
    setUser(null); // Clear user data if no user is logged in
  }
  });
    return () => unsubscribe();
  }, []);
  return user;
  };
