import { useEffect, useState } from 'react';
import { Resend } from 'resend';
import { callResend } from '@/lib/email';
import { setEmailSent, wasEmailSent } from '@/lib/session';

export default function Form() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const sendEmail = async () => {
    setIsLoading(true);
    await callResend(email);
    setEmailSent();
    setIsLoading(false);
  };

  useEffect(() => {
    setIsSent(wasEmailSent());
  }, []);

  if (isSent) {
    return <p className="mt-10 font-hp text-lg font-semibold">Thank you!</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <label className={`form-control w-full max-w-xs mt-10`}>
        <div className="label">
          <span className="label-text">Please answer who will attend to the magical celebration!</span>
        </div>
        <input
          type="text"
          placeholder="Your names"
          onChange={e => setEmail(e.target.value)}
          onKeyDown={e => (e.key === 'Enter' ? sendEmail() : null)}
          className={'input input-bordered w-full max-w-xs font-hp'}
        />
      </label>
      <button
        className={`btn btn-primary font-hp mt-5 text-3xl leading-[3.8rem] font-normal ${isLoading ? 'loading' : ''}`}
        onClick={sendEmail}
        disabled={isLoading || email.length < 2}
      >
        {isLoading ? 'Sending...' : 'Send!'}
      </button>
    </div>
  );
}
