// "use client";

// import { UserButton } from '@clerk/nextjs'
// import Image from 'next/image'
// import { usePathname } from 'next/navigation'
// import React, { useEffect } from 'react'

// const Header = () => {
//     const path = usePathname();
//     useEffect(() => {
        
//     }, [path]);
//   return (
//     <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
//         <Image src={'/logo.svg'} width={160} height={100} alt='logo'/>
//         <ul className='hidden md:flex gap-6'>
//             <li className={`hover:text-primary hover:font-bold transition-all
//             cursor-pointer
//             ${path=='/dashboard' && 'text-primary font-bold'}`}>Dashboard</li>
//             <li className={`hover:text-primary hover:font-bold transition-all
//             cursor-pointer
//             ${path=='/dashboard/questions' && 'text-primary font-bold'}`}>Questions</li>
//             <li className={`hover:text-primary hover:font-bold transition-all
//             cursor-pointer
//             ${path=='/dashboard/how-it-works' && 'text-primary font-bold'}`}>How it Works?</li>
//         </ul>
//         <UserButton/>
//     </div>
//   )
// }

// export default Header





"use client";

import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

const Header = () => {
  const path = usePathname();
  const router = useRouter();

  return (
    <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
      <Image src={'/logo.svg'} width={160} height={100} alt='logo' className="cursor-pointer" onClick={() => router.push('/dashboard')} />

      <ul className='hidden md:flex gap-6'>
        <li
          onClick={() => router.push('/dashboard')}
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path === '/dashboard' ? 'text-primary font-bold' : ''
          }`}
        >
          Dashboard
        </li>
        <li
          onClick={() => router.push('/dashboard/questions')}
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path === '/dashboard/questions' ? 'text-primary font-bold' : ''
          }`}
        >
          Questions
        </li>
        <li
          onClick={() => router.push('/dashboard/how-it-works')}
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path === '/dashboard/how-it-works' ? 'text-primary font-bold' : ''
          }`}
        >
          How it Works?
        </li>
      </ul>

      <UserButton />
    </div>
  );
};

export default Header;
