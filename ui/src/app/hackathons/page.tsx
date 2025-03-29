
'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { useState } from 'react';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { AppBar } from '@/src/components/AppBar';

type FormData = {
  title: string;
  description: string;
  deadline: Date;
  stakeAmount: number;
  projects: { id: string }[];
};

export default function CreateHackathon() {
  const account = useCurrentAccount();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
  } = useForm<FormData>({
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

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log('Submitted:', data);
    alert('Hackathon created successfully');
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <AppBar />
      <main className="flex-grow flex flex-col items-center p-8 w-full">
        <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6 space-y-6">
          <h1 className="text-2xl font-bold text-center">Create Hackathon Form</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
              <input
                {...register('title', { required: true })}
                className="w-full border border-gray-300 rounded-md p-2 bg-white text-black"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
              <textarea
                {...register('description', { required: true })}
                className="w-full border border-gray-300 rounded-md p-2 bg-white text-black"
              />
            </div>

            {/* Stake Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reward (SUI)*</label>
              <input
                type="number"
                step="0.001"
                {...register('stakeAmount')}
                className="w-full border border-gray-300 rounded-md p-2 bg-white text-black"
              />
              <p className="text-gray-500 text-xs mt-1">
                Note: Due to testnet constraints, the decimal is set to 3. The actual decimal places should be 9.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition flex justify-center items-center min-h-[42px]"
            >
              {isSubmitting ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : (
                'Create Hackathon'
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
