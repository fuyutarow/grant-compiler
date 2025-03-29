'use client';

import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { AppBar } from '@/src/components/AppBar';

type FormData = {
  title: string;
  description: string;
  deadline: Date;
  stakeAmount: number;
  projects: { id: string }[];
};

const onSubmit = (data: FormData) => {
  console.log(data);
};

export default function CreateHackathon() {
  const account = useCurrentAccount();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      deadline: new Date(),
      stakeAmount: 0,
      projects: [{ id: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'projects',
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <AppBar />
      <main className="flex-grow flex flex-col items-center p-8 w-full">
        <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6 space-y-6">
          <h1 className="text-2xl font-bold text-center">Create Hackathon Form</h1>
          <form onSubmit={handleSubmit()} className="space-y-4">
            <label className="form-control">
              <span className="label-text">Title*</span>
              <input {...register('title', { required: true })} className="input input-bordered w-full border border-gray-300 rounded-md p-2" />
            </label>

            <label className="form-control">
              <span className="label-text">Description*</span>
              <textarea {...register('description', { required: true })} className="textarea textarea-bordered w-full border border-gray-300 rounded-md p-2" />
            </label>

            <label className="form-control">
              <span className="label-text">Reward (SUI)</span>
              <input type="number" step="0.001" {...register('stakeAmount')} className="input input-bordered w-full border border-gray-300 rounded-md p-2" />
              <small className="text-gray-500 text-xs">Note: Due to testnet constraints, the decimal is set to 3. The actual decimal places should be 9.</small>
            </label>

            <button type="submit" disabled={isSubmitting} className="btn btn-success w-full">
              {isSubmitting ? <span className="loading loading-spinner" /> : 'Create Hackathon'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
