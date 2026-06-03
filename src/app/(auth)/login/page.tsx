'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { LoginForm, LoginFormValues } from '@/components/forms/LoginForm';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(values: LoginFormValues) {
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (result?.error) {
        setError('Invalid email or password');
      } else if (result?.ok) {
        router.push('/dashboard');
        router.refresh();
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Left Side - Login Form */}
      <div className="flex min-h-screen w-full items-center justify-center bg-white px-4 py-8 sm:px-6 lg:min-h-0 lg:w-1/2 lg:px-8 lg:py-12">
        <div className="w-full max-w-[440px]">
          <LoginForm onSubmit={handleLogin} isLoading={isLoading} error={error} />
        </div>
      </div>

      {/* Right Side - Branding */}
      <div className="flex min-h-[400px] w-full items-center justify-center bg-[#1C64F2] px-6 py-12 sm:px-8 lg:min-h-screen lg:w-1/2">
        <div className="w-full max-w-[576px] space-y-6 sm:space-y-8">
          <h1 className="text-3xl font-semibold leading-[150%] text-white sm:text-4xl lg:text-[40px]">
            ticktock
          </h1>
          <p className="text-sm leading-[150%] text-[#E5E7EB] sm:text-base">
            Introducing ticktock, our cutting-edge timesheet web application designed to
            revolutionize how you manage employee work hours. With ticktock, you can effortlessly
            track and monitor employee attendance and productivity from anywhere, anytime, using any
            internet-connected device.
          </p>
        </div>
      </div>
    </div>
  );
}
