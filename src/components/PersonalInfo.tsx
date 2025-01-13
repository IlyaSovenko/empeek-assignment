"use client";
import PersonIcon from '@/assets/icons/person.svg';
import KeyIcon from '@/assets/icons/key.svg';
import { useFormContext } from 'react-hook-form';

export default function PersonalInfo() {
  const {register, formState: {errors}} = useFormContext()
  return <>
    <label className="input input-bordered flex items-center gap-2 bg-white">
      <PersonIcon className="h-4 w-4 opacity-70"/>
      <input
        type="email"
        className="grow"
        placeholder="Email"
        {...register("email", {
          required: 'Email is required', pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address'
          }
        })}
      />
    </label>
    {errors.email && <p className='text-error'>{errors.email.message as string}</p>}
    <label className="input input-bordered flex items-center gap-2 bg-white mt-5">
      <KeyIcon className="h-4 w-4 opacity-70"/>
      <input
        type="password"
        className="grow"
        placeholder="Password"
        {...register("password", {required: 'Password is required'})}
      />
    </label>
    {errors.password && <p className='text-error'>{errors.password.message as string}</p>}
  </>
}
