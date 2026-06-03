'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { Label } from '@/components/ui/Label';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => void;
  isLoading?: boolean;
  error?: string;
}

export function LoginForm({ onSubmit, isLoading, error }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  return (
    <div className="w-full">
      <h2 className="mb-4 text-xl font-bold leading-[125%] text-[#111928] sm:mb-6 sm:text-2xl">
        Welcome back
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4 sm:space-y-6">
        {/* Error Message */}
        {error && (
          <div
            role="alert"
            aria-live="polite"
            className="rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-600 sm:px-4 sm:py-3"
          >
            {error}
          </div>
        )}

        {/* Email Field */}
        <div className="space-y-1.5 sm:space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            autoComplete="email"
            error={!!errors.email}
            disabled={isLoading}
            {...register('email')}
          />
          {errors.email && (
            <p className="text-xs text-[#F05252]" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-1.5 sm:space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••••"
            autoComplete="current-password"
            error={!!errors.password}
            disabled={isLoading}
            {...register('password')}
          />
          {errors.password && (
            <p className="text-xs text-[#F05252]" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember Me Checkbox */}
        <div className="py-1">
          <Checkbox label="Remember me" disabled={isLoading} {...register('rememberMe')} />
        </div>

        {/* Submit Button */}
        <Button type="submit" isLoading={isLoading} className="w-full">
          Sign in
        </Button>
      </form>
    </div>
  );
}
