'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function callResend(text: string) {
  await resend.emails.send({
    from: 'Resend <onboarding@resend.dev>',
    to: [process.env.EMAIL],
    subject: 'Invitation reply',
    text: `New reply wit the following text:\n\n${text}`,
  });
}
