"use client";
import { useForm, SubmitHandler } from "react-hook-form"
import { useEffect, useState } from 'react';
import axios from 'axios';

interface IFormInput {
  aboutStep: number,
  birthdayStep: number,
  addressStep: number,
}

export default function AdminPage() {
  const [error, setError] = useState('')
  const {
    register,
    handleSubmit,
    setValue,
  } = useForm<IFormInput>({
    defaultValues: {
      aboutStep: 2,
      birthdayStep: 3,
      addressStep: 3,
    },
  })
  
  useEffect(() => {
    const fetchOrder = async () => {
      const response = await axios(process.env.NEXT_PUBLIC_API_URL + "order")
      setValue('aboutStep', response.data.aboutStep)
      setValue('birthdayStep', response.data.birthdayStep)
      setValue('addressStep', response.data.addressStep)
    }
    fetchOrder();
  }, [])
  
  const onSubmitHandler: SubmitHandler<IFormInput> = async (data) => {
    const formValues = Object.values(data)
    if (!formValues.includes(2) || !formValues.includes(3)) {
      setError('At least one component should be on each step. Change it and try again.');
      return;
    }
    setError('')
    try {
      await axios(process.env.NEXT_PUBLIC_API_URL + 'order', { method: 'PUT', data });
    } catch (e) {
      console.error(e)
    }
  }
  return <main className="flex flex-col gap-8 row-start-2 items-center">
    <div className="card bg-white w-96 shadow-xl p-3 text-accent-content pb-5 font-black">
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Where <u>about</u> component will be?</span>
          </div>
          <select className="select select-bordered bg-white" {...register("aboutStep", {
            valueAsNumber: true,
          })}>
            <option value={2}>Step 2</option>
            <option value={3}>Step 3</option>
          </select>
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Where <u>birthday</u> component will be?</span>
          </div>
          <select className="select select-bordered bg-white" {...register("birthdayStep", {
            valueAsNumber: true,
          })}>
            <option value={2}>Step 2</option>
            <option value={3}>Step 3</option>
          </select>
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Where <u>address</u> component will be?</span>
          </div>
          <select className="select select-bordered bg-white" {...register("addressStep", {
            valueAsNumber: true,
          })}>
            <option value={2}>Step 2</option>
            <option value={3}>Step 3</option>
          </select>
        </label>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        
        <button type="submit" className="btn btn-primary mt-8 text-white w-full">Save</button>
      </form>
    </div>
  </main>
}
