"use client"
import Image from 'next/image'
import { useMe } from "@/providers/MeProvider";
import { useState } from "react";

import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import Spinner from '@/components/Spinner'

const Login = () => {
  const [username, setUsername] = useState("");
  const { create, get, returning, isLoading } = useMe();
  const [createForm, setCreateForm] = useState(!returning);
    return ( 
        <div className='w-full h-full flex items-center justify-center relative'>
          <div className="flex flex-col items-center justify-center space-y-2 z-10">
            <div className='text-4xl font-black font-[Monument]'>
              Kuma
            </div>
            <div className='text-xs font-black text-center text-primary/50'>
              Your Blockchain All-in-one App
            </div>
            {isLoading && <Spinner />}

            {!isLoading && (
              <form className="pt-4" onSubmit={(e) => {
                if (createForm) {
                  e.preventDefault();
                  username && create(username);
                }
    
                if (!createForm) {
                  e.preventDefault();
                  get();
                }
              }}>
                {createForm && (
                  <div className="flex ">
                    <Input placeholder='Username' className="w-36 text-sm mr-1" required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      disabled={isLoading}/>
                    <Button>CREATE</Button>
                  </div>
                )}
                {!createForm && (
                  <Button >LOG IN</Button>
                )}
              </form>
            )}
          </div>

          <div className='absolute bottom-0 flex w-full justify-end p-4'>
            {!createForm && !isLoading && (
              <div onClick={() => {
                !isLoading && setCreateForm(true);
              }}>or create a new wallet</div>
            )}
            {createForm && !isLoading && (
              <div onClick={() => !isLoading && setCreateForm(false)}>or log in with an existing passkey</div>
            )}
          </div>

          <Image src="/illustrations/6.png" alt="Kuma" width={700} height={700} className='absolute bottom-0 right-1/2 translate-x-1/2 -translate-y-1/4 opacity-30'/>
          <Image src="/illustrations/2.png" alt="Kuma" width={700} height={700} className='absolute top-0 right-1/2 translate-x-1/2 translate-y-1/4 opacity-30'/>

        </div>
    );
}

export default Login;