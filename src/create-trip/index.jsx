import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "./CreateTrip.css";
import "./PlaneAnimations.css";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPlanes, setShowPlanes] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => { 
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true);
      return;
    }
    if (formData?.totalDays > 5 || !formData?.location || !formData?.budget || !formData?.traveler) {
      toast("Please fill all details!");
      return;
    }
    toast("Form generated.");
    setLoading(true);
    setShowPlanes(true); // Trigger plane animations
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location)
      .replace('{totalDays}', formData?.totalDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const docId = Date.now().toString();
      
      // Validate and parse TripData
      let parsedTripData;
      try {
        parsedTripData = JSON.parse(TripData);
      } catch (error) {
        console.error("Failed to parse TripData:", error);
        toast("Failed to process trip data.");
        setLoading(false);
        return;
      }
      
      await setDoc(doc(db, "AiTrips", docId), {
        userSelection: formData,
        tripData: parsedTripData,
        userEmail: user?.email,
        id: docId
      });
      setLoading(false);
      navigate('/view-trip/' + docId);
    } catch (error) {
      console.error("Error saving trip:", error);
      toast("Failed to save trip.");
      setLoading(false);
    }
  };
  

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'application/json'
      }
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      OnGenerateTrip();
    });
  };

  return (
    <div className="px-5 mt-12 sm:px-10 md:px-32 lg:px-56 xl:px-72">
      {showPlanes && (
        <div className="plane-container">
          <svg className="plane plane-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
          </svg>
          <svg className="plane plane-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
          </svg>
          <svg className="plane plane-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
          </svg>
        </div>
      )}

      <div>
        <h2 className="font-bold text-3xl">Tell us your travel preferences 🌍✈️🌴</h2>
        <p className="mt-3 text-gray-600 text-xl">Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>
      </div>

      <div className="mt-20 flex flex-col gap-10">
        <div className="mb-5">
          <label className="text-xl mb-3 font-medium">What is destination of choice?</label>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACES_API_KEY}
            selectProps={{
              place,
              onChange: (v) => { setPlace(v); handleInputChange('location', v.label); }
            }}
          />
        </div>

        <div className="mb-5">
          <label className="text-xl font-medium">How many days are you planning your trip?</label>
          <Input 
            placeholder={'ex.3'} 
            type='number' 
            min="1" 
            onChange={(v) => handleInputChange('totalDays', v.target.value)}
          />
        </div>

        <div>
          <label className="text-xl my-3 font-medium">What is Your Budget?</label>
          <p>The budget is exclusively allocated for activities and dining purposes.</p>
          <div className="grid grid-cols-3 gap-5 mt-5 mb-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange('budget', item.title)}
                className={`option-card ${formData?.budget === item.title ? 'selected' : ''}`}
              >
                <div className="option-content">
                  <h2 className="text-3xl">{item.icon}</h2>
                  <h2 className="font-bold text-lg">{item.title}</h2>
                  <h2 className="text-sm text-gray-500">{item.desc}</h2>
                </div>
              </div>
            ))}
          </div>

          <label className="text-xl font-medium my-3">Who do you plan on traveling with on your next adventure?</label>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange('traveler', item.people)}
                className={`option-card ${formData?.traveler === item.people ? 'selected' : ''}`}
              >
                <div className="option-content">
                  <h2 className="text-3xl">{item.icon}</h2>
                  <h2 className="text-lg font-bold">{item.title}</h2>
                  <h2 className="text-sm text-gray-500">{item.desc}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="my-10 flex justify-end">
        <Button onClick={OnGenerateTrip} disabled={loading}>
          {loading ? 
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
            : 'Generate Trip'
          }
        </Button>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="Logo" />
              <h2 className="font-bold text-lg mt-6">Sign In with Google</h2>
              <p>Sign In to the App with Google authentication securely</p>
              <Button 
                onClick={login} 
                className="w-full mt-5 flex gap-4 items-center"
              >
                <FcGoogle className="h-7 w-7" />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;

// import React, { useEffect, useState } from "react"
// import GooglePlacesAutocomplete from "react-google-places-autocomplete"
// import { Input } from "@/components/ui/input"
// import { AI_PROMPT, SelectBudgetOptions,SelectTravelList } from "@/constants/options"
// import { Button } from "@/components/ui/button"
// import { toast } from "sonner"
// import { chatSession } from "@/service/AIModal"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { FcGoogle } from "react-icons/fc";
// import { useGoogleLogin } from "@react-oauth/google"
// import axios from "axios"
// import { doc, setDoc } from "firebase/firestore"; 
// import { db } from "@/service/firebaseConfig"
// import { AiOutlineLoading3Quarters } from "react-icons/ai";
// import { useNavigate } from "react-router-dom"

// function CreateTrip() {
//   const [place,setPlace]=useState();
//   const [formData,setFromData]=useState([]);
//   const [openDialog,setOpenDialog]=useState(false);
//   const [loading,setLoading]=useState(false);
//   const navigate=useNavigate();


//   const handleInputChange=(name,value)=>{
//     setFromData({
//       ...formData,
//       [name]:value
//     })
//   }
//   useEffect(()=>{ 
//     console.log(formData)
//   },[formData])

//   const login=useGoogleLogin({
//     onSuccess:(codeResp)=>GetUserProfile(codeResp),
//     onError:(error)=>console.log(error)
//   })

//   const OnGenerateTrip = async()=>{
//     const user = localStorage.getItem('user')
//     if(!user){
//       setOpenDialog(true)
//       return ;
//     }
//     if(formData?.totalDays>5 || !formData?.location || !formData?.budget || !formData?.traveler){
//       toast("Please fill all details!")
//       return ;
//     }
//     toast("Form generated.");
//     setLoading(true);
//     const FINAL_PROMPT=AI_PROMPT
//     .replace('{location}',formData?.location)
//     .replace('{totalDays}',formData?.totalDays)
//     .replace('{traveler}',formData?.traveler)
//     .replace('{budget}',formData?.budget)

//     const result=await chatSession.sendMessage(FINAL_PROMPT);
//     // console.log("--",result?.response?.text());
//     setLoading(false);
//     SaveAiTrip(result?.response?.text());
//   } 

//   const SaveAiTrip=async(TripData) => {
//     setLoading(true);
//     const user=JSON.parse(localStorage.getItem("user"));
//     const docId=Date.now().toString();
//     await setDoc(doc(db, "AiTrips", docId), {
//       userSelection:formData,
//       tripData:JSON.parse(TripData),
//       userEmail:user?.email,
//       id:docId
//     });
//     setLoading(false);
//     navigate('/view-trip/'+docId);
//   }

//   const GetUserProfile=(tokenInfo)=>{
//     axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`,{
//       headers: {
//        Authorization: `Bearer ${tokenInfo?.access_token}`,
//        Accept:'Application/json'
//       }
//     }).then((resp) => {console.log(resp);
//       localStorage.setItem('user',JSON.stringify(resp.data));
//       setOpenDialog(false);
//       OnGenerateTrip();
//     })
//   }

//   return (
//     <div className="px-5 mt-12 sm:px-10 md:px-32 lg:px-56 xl:px-72">
//      <div>
//      <h2 className="font-bold text-3xl ">Tell us your travel preferences 🌍✈️🌴</h2>
//      <p className="mt-3 text-gray-600 text-xl">Just provide some basic information,and our trip planner will generate a customized itinerary based on your preferences.</p>
//      </div>

//       <div className="mt-20 flex flex-col gap-10 ">
//        <div className="mb-5">
//         <label className="text-xl mb-3 font-medium">What is destination of choice?</label>
//           <GooglePlacesAutocomplete
//           apiKey={import.meta.env.VITE_GOOGLE_PLACES_API_KEY}
//           selectProps={{
//             place,
//             onChange:(v)=>{setPlace(v); handleInputChange('location',v.label)}
//           }}
//         />
//        </div>

//         <div className="mb-5">
//           <label className="text-xl font-medium">How many days are you planning your trip?</label>
//           <Input placeholder={'ex.3'} type='number' min="1" 
//           onChange={(v)=>handleInputChange('totalDays',v.target.value)}/>
//         </div>

//         <div>
//             <label className="text-xl my-3 font-medium">What is Your Budget?</label>
//             <p>The budget is exclusively allocated for activities and dining purposes. </p>
//             <div className="grid grid-cols-3 gap-5 mt-5 mb-5">
//               {SelectBudgetOptions.map((item,index)=>(
//                 <div key={index} 
//                 onClick={()=>handleInputChange('budget',item.title)}
//                 className={`cursor-pointer p-4 border rounded-lg hover:shadow-lg
//                 ${formData?.budget==item.title&&'shadow-lg border-cyan-500'}
//                 `}>
//                   <h2 className="text-3xl">{item.icon}</h2>
//                   <h2 className="font-bold text-lg">{item.title}</h2>
//                   <h2 className="text-sm text-gray-500">{item.desc}</h2>
//                 </div>
//               ))}
//             </div>

//             <label className="text-xl font-medium my-3"> Who do you plan on traveling with on your next adventure?</label>
//             <div className="grid grid-cols-3 gap-5 mt-5">
//               {SelectTravelList.map(( item,index)=>(
//                 <div key={index}
//                 onClick={()=>handleInputChange('traveler',item.people)}
//                 className={`cursor-pointer p-4 border rounded-lg hover:shadow-lg
//                   ${formData?.traveler==item.people&&'shadow-lg border-cyan-500'}
//                   `}>
//                   <h2 className="text-3xl">{item.icon}</h2> 
//                   <h2 className="text-lg font-bold">{item.title}</h2> 
//                   <h2 className="text-sm text-gray-500">{item.desc}</h2> 
//                 </div>
//               ))}
//             </div>
//         </div>
//       </div>
//       <div className="my-10 flex justify-end ">
//         <Button onClick={OnGenerateTrip} disabled={loading} >
//           {loading ? 
//           <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
//            : 'Generate Trip' }
//           </Button>
//       </div>

//       <Dialog open={openDialog}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogDescription>
//               <img src="/logo.svg"/>
//               <h2 className="font-bold text-lg mt-6">Sign In with Google</h2>
//               <p>Sign In to the App with Google authentication securely</p>
//               <Button 
//               onClick={login} className="w-full mt-5 flex gap-4 items-center">
//                 <FcGoogle className="h-7 w-7"/>
//                 Sign In With Google
//               </Button>
//             </DialogDescription>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>

//     </div>
//   )
// }

// export default CreateTrip
