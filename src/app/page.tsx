"use client";
import { useEffect, useState } from 'react';
import ArrowIcon from '@/assets/icons/arrow.svg';
import PersonalInfo from '@/components/PersonalInfo';
import AboutMe from '@/components/AboutMe';
import BirthdayPicker from '@/components/BirthdayPicker';
import AddressPicker from '@/components/AddressPicker';
import { useForm, FormProvider } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

enum StepNameEnum {
  personalStep = 'personalStep',
  aboutStep = 'aboutStep',
  addressStep = 'addressStep',
  birthdayStep = 'birthdayStep',
}

type stepType = 1 | 2 | 3;
type stepNameType =
  StepNameEnum.personalStep
  | StepNameEnum.aboutStep
  | StepNameEnum.addressStep
  | StepNameEnum.birthdayStep;

export default function Home() {
  const steps = {
    personalStep: <PersonalInfo key='personalStep'/>,
    aboutStep: <AboutMe key='aboutStep'/>,
    birthdayStep: <BirthdayPicker key='birthdayStep'/>,
    addressStep: <AddressPicker key='addressStep'/>,
  }
  
  const methods = useForm();
  const router = useRouter();
  
  const [step, setStep] = useState<stepType>(1);
  const [order, setOrder] = useState<stepNameType[][]>(
    [[StepNameEnum.personalStep], [StepNameEnum.aboutStep], [StepNameEnum.birthdayStep, StepNameEnum.addressStep]]
  );
  
  useEffect(() => {
    const cache = JSON.parse(localStorage.getItem('cache') || '{}')
    Object.keys(cache).map((name) => {
      methods.setValue(name, cache[name])
    })
    setStep(Object.keys(cache).length ? 2 : 1);

    const fetchOrder = async () => {
      const response = await axios(process.env.NEXT_PUBLIC_API_URL + "order");
      const order: stepNameType[][] = [[], [], []];
      Object.keys(StepNameEnum).map(stepName => {
        order[(response.data[stepName] ?? 1) - 1].push(stepName as stepNameType);
      })
      setOrder(order);
    }

    fetchOrder()
  }, [])
  const onSubmit = async (data: Record<string, unknown>) => {
    if (step < 3) {
      setStep(step + 1 as stepType)
      localStorage.setItem('cache', JSON.stringify(data))
      return;
    }
    await axios(process.env.NEXT_PUBLIC_API_URL + "user", {method: 'POST', data});
    localStorage.removeItem('cache')
    router.push('/data')
  }
  return <main className="flex row-start-2">
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-8 items-center">
        <div className="card bg-white w-96 shadow-xl p-3 text-accent-content font-black pb-5">
          {order[step - 1].map((stepName) => steps[stepName])}
        </div>
        <div className="flex flex-row items-center relative">
          <button
            type="button"
            className="flex flex-row items-center gap-2 font-bold text-primary absolute right-full cursor-pointer"
            onClick={() => setStep(((step - 1) || 1) as stepType)}
          >
            <ArrowIcon className="w-5 h-auto fill-primary rotate-180"/>Back
          </button>
          <ul className="steps">
            {Object.keys(order).map((key) =>
              <li key={key} className={`step${Number(key) < step ? ' step-primary' : ''}`}/>
            )}
          </ul>
          <button
            type="submit"
            className="flex flex-row items-center gap-2 font-bold text-primary absolute left-full cursor-pointer"
          >
            Next <ArrowIcon className="w-5 h-auto fill-primary"/>
          </button>
        </div>
      </form>
    </FormProvider>
  </main>;
}
