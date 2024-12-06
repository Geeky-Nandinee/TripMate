import { db } from '@/service/firebaseConfig';
import React, { useEffect, useState } from 'react';
import { useNavigation } from 'react-router-dom';
import { collection, query, where, getDocs } from "firebase/firestore";
import UserTripCard from './components/UserTripCard';

function MyTrips() {
    const navigation = useNavigation();
    const [userTrips, setUserTrips] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        GetUserTrips();
    }, []);

    const GetUserTrips = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user) {
                navigation('/');
                return;
            }

            setIsLoading(true);
            const q = query(collection(db, 'AiTrips'), where('userEmail', '==', user?.email));
            const querySnapshot = await getDocs(q);
            
            const trips = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            
            setUserTrips(trips);
        } catch (error) {
            console.error('Error fetching trips:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="pt-20 min-h-screen bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="font-bold text-3xl mb-8">My Trips</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-5 pb-8">
                    {isLoading ? (
                        [...Array(6)].map((_, index) => (
                            <div 
                                key={index} 
                                className="h-[200px] w-full bg-slate-200 animate-pulse rounded-xl"
                            />
                        ))
                    ) : userTrips.length > 0 ? (
                        userTrips.map((trip, index) => (
                            <UserTripCard 
                                trip={trip} 
                                key={trip.id || index}
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-10 text-gray-500">
                            No trips found
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

export default MyTrips;

// import { db } from '@/service/firebaseConfig';
// import React, { useEffect, useState } from 'react'
// import { useNavigation } from 'react-router-dom';
// import { collection, query, where, getDocs } from "firebase/firestore";
// import UserTripCard from './components/UserTripCard';

// function MyTrips() {
//     const navigation=useNavigation();
//     const [userTrips,setUserTrips] = useState([]);
//     useEffect(() =>{
//         GetUserTrips();
//     },[])
//     const GetUserTrips=async()=>{
//         const user=JSON.parse(localStorage.getItem('user'));
//         if(!user){
//             navigation('/');
//             return ;
//         }
//         setUserTrips([]); // Fetch işlemi başlamadan önce boş bir dizi olarak ayarla
//         const q=query(collection(db,'AiTrips'),where('userEmail','==',user?.email))
//         const querySnapshot = await getDocs(q);
//         querySnapshot.forEach((doc) => {
//         console.log(doc.id, " => ", doc.data());
//         setUserTrips(prev=>[...prev,doc.data()])
//     });
//     }
   
//   return (
//     <div className='px-5 mt-12 sm:px-10 md:px-32 lg:px-56 xl:px-72"'>
//       <h2 className='font-bold text-3xl mb-10'>My Trips</h2>
//       <div className='grid grid-cols-2 md:grid-cols-3 gap-5 my-3'>
//         {userTrips?.length>0 ? userTrips.map((trip,index)=>(
//             <UserTripCard trip={trip} key={index} />
//         ))
//         : [1,2,3,4,5,6].map((item,index)=>(
//             <div key={index} className='h-[200px] w-full bg-slate-200 animate-pulse rounded-xl'>
//             </div>
//         ))
//         }
//       </div>
//     </div>
//   )
// }

// export default MyTrips
