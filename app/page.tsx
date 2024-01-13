'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { isAuthenticated, setAuthenticated } from '@/lib/session';

export default function Home() {
  const router = useRouter();

  const [labelClass, setLabelClass] = useState<string>('opacity-0');
  const [mainClass, setMainClass] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [showHint, setShowHint] = useState<boolean>(false);

  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/letter');
    }

    const hintTimeout = () => {
      if (labelClass != 'opacity-0') {
        return;
      }

      setShowHint(true);
    };

    const timeoutId = setTimeout(hintTimeout, 4000);

    return () => clearTimeout(timeoutId);
  }, [router, labelClass]);

  const handleButtonClick = () => {
    if (inputValue.toLowerCase() !== 'alohomora') {
      setShowErrorMessage(true);
      return;
    }

    setAuthenticated();
    setShowErrorMessage(false);
    setMainClass('!opacity-0');

    setTimeout(() => {
      router.push('/letter');
    }, 1500);
  };

  return (
    <motion.main
      className={`flex flex-col min-h-screen justify-center items-center md:p-24 p-5 sm:p-10 transition-opacity duration-[1.5s] ${mainClass}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <h1 className="font-hp absolute top-10 text-5xl md:text-7xl text-center leading-[4rem]">Birthday Invitation</h1>

      <p className={`mt-10 font-hp text-lg transition-opacity duration-[3s] ${!showHint ? 'opacity-0' : ''} `}>
        Hint: Click on the envelope
      </p>

      <div className="flex justify-center items-center mt-5">
        <Image
          src="/envelope.jpg"
          width={694}
          height={500}
          alt="Envelope"
          className="transition ease-in-out hover:scale-110 duration-1000"
          onClick={() => {
            setLabelClass('opacity-1');
            setShowHint(false);
          }}
        />
      </div>

      <div className={`flex flex-col justify-center items-center transition-opacity duration-[3s] ${labelClass}`}>
        <label className={'form-control w-full max-w-xs mt-10 '}>
          <div className="label">
            <span className="label-text">Enter the correct spell to open the envelope!</span>
          </div>
          <input
            type="text"
            placeholder="Spell"
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => (e.key === 'Enter' ? handleButtonClick() : null)}
            className={`input input-bordered w-full max-w-xs font-hp ${showErrorMessage ? 'input-error' : ''}`}
          />
          {showErrorMessage && (
            <div className="label">
              <span className="label-text">Tip: How do wizards open things like doors?</span>
            </div>
          )}
        </label>
        <button
          className="btn btn-primary font-hp mt-5 text-3xl leading-[3.8rem] font-normal"
          onClick={handleButtonClick}
        >
          Cast!
        </button>
      </div>
    </motion.main>
  );
}
