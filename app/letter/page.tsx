'use client';

import { motion } from 'framer-motion';
import styles from './styles.module.css';
import { isAuthenticated } from '@/lib/session';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';
import Form from './form';

export default function Letter() {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/');
    }
  }, [router]);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="flex flex-col items-center md:p-24 p-5 sm:p-10 min-h-screen "
    >
      <h1 className="font-hp absolute top-10 text-5xl md:text-7xl text-center leading-[4rem]">
        {process.env.NEXT_PUBLIC_INVITATION_NAME}&apos;s Birthday Party
      </h1>
      <div
        className={`font-letter md:mt-10 mt-24 max-[428px]:mt-40 leading-8 font-semibold p-10 shadow-[35px_35px_60px_-15px_rgba(0,0,0,0.3)] sm:w-screen h-full md:h-[1000px] md:w-[736px] ${styles.background}`}
      >
        <div className="flex justify-center items-center">
          <Image src="/hogwarts.png" width={250} height={250} alt="Logo" />
        </div>
        <p className={'font-letter leading-10 text-2xl d md:p-10'}>
          Dear Hogwarts student,
          <br />
          <br />
          We are pleased to inform you that you have been invited to a magical celebration in honor of{' '}
          {process.env.NEXT_PUBLIC_PARTY_HONOR}.
          <br />
          Join us for an evening filled with wizardry, spells, and merriment. Wear your wizard robes and prepare for a
          magical journey reminiscent of the Hogwarts experience. A night of wizard duels, potion making, and Quidditch
          awaits!
          <br />
          <br />
          Please use the digital owl below to send us the names of all attendees until{' '}
          {process.env.NEXT_PUBLIC_UNTIL_TEXT}.
          <br />
          We solemnly swear that it will be a party to remember!
          <br />
          <br />
          Yours magically, {process.env.NEXT_PUBLIC_NAMES}
        </p>
      </div>
      <Form />
    </motion.main>
  );
}
