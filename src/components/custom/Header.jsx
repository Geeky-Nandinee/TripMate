import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json',
      },
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      window.location.reload();
    });
  };

  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-4 header-gradient'>
      <div className='flex-grow flex'>
        <Link to="/">
          <img src='/TripMate-Logo-1.png' className='header-logo' alt="TripMate Logo" />
        </Link>
      </div>
      <div className='flex items-center gap-4'>
        {user ? (
          <>
            <a href="/create-trip">
              <Button variant="outline" className="rounded-full button-gradient">Create Trip</Button>
            </a>
            <a href="/my-trips">
              <Button variant="outline" className="rounded-full button-gradient">My Trips</Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img src={user?.picture} className='rounded-full w-[38px] h-[38px]' />
              </PopoverTrigger>
              <PopoverContent>
                <h2 className="cursor-pointer" onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}>Logout</h2>
              </PopoverContent>
            </Popover>
          </>
        ) : (
          <Button onClick={() => setOpenDialog(true)} className="button-gradient">Sign In</Button>
        )}
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/TripMate-Logo-1.png" className='dialog-logo' alt="Dialog Logo"/>
              <h2 className="font-bold text-lg mt-6">Sign In with Google</h2>
              <p>Sign In to the App with Google authentication securely</p>
              <Button
                onClick={login} className="w-full mt-5 flex gap-4 items-center button-gradient">
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

export default Header;
