import React, { useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import { GrNotification } from 'react-icons/gr';
import useAuth from '../../../hooks/useAuth';
import Link from 'next/link';
import Notifications from '../notifications';

export interface HomePageHeaderProps {}

export default function HomePageHeader({}: HomePageHeaderProps) {
  const { auth, setAuth }: any = useAuth();
  const [showNotification, setShowNotification] = useState(false);

  const toggleNotification = () => {
    showNotification ? setShowNotification(false) : setShowNotification(true);
  };

  return (
    <>
      {showNotification ? (
        <Notifications toggleNotification={toggleNotification} />
      ) : null}
      <div className='home-page-header border-b-2 md:hidden text-[#002D72] font- px-4 items-center  flex justify-between'>
        <div className='heade-logo font-extrabold text-xl'>
          <Link href={'/'}>
            <a>RightApp</a>
          </Link>
        </div>
        <div className='flex  space-x-4 '>
          {auth.id ? (
            <>
              <span className=''>
                <FiSettings className='text-3xl' />
              </span>
              <span onClick={toggleNotification}>
                <GrNotification className='text-3xl' />
              </span>
            </>
          ) : (
            <div className='items-center space-x-2'>
              <span className='font-bold'>
                <Link href={'/login'}>
                  <a>login</a>
                </Link>
              </span>
              <span className='font-bold whitespace-nowrap rounded-md p-1 px-2'>
                <Link href={'/sign-up'}>
                  <a>Sign Up</a>
                </Link>
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
