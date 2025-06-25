"use client";


import { Suspense } from 'react';
import VerifyOtpPage from '@/components/VerifyOTP/VerifyOTP'

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOtpPage />
    </Suspense>
  );
}
