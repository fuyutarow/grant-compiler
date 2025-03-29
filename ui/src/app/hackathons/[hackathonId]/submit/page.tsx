
'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { AppBar } from '@/src/components/AppBar';
import { useParams } from 'next/navigation';
import { useState } from 'react';

type Params = {
  hackathonId: string;
};

type FormData = {
  title: string;
  description: string;
  hackathonId: string;
  links: { url: string }[];
};

export default function CreateProject() {
  const { hackathonId } = useParams<Params>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
  } = useForm<FormData>({
    defaultValues: {
      title: '',
      description: '',
      hackathonId,
      links: [{ url: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'links',
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log('Submitted:', data);
    alert('Submitted successfully');
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <AppBar />
      <main className="flex-grow flex flex-col items-center p-8 w-full">
        <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6 space-y-6">
          <h1 className="text-2xl font-bold text-center">Submit Project Form</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Project Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Title*</label>
              <input
                {...register('title', { required: true })}
                className="w-full border border-gray-300 rounded-md p-2 bg-white text-black"
              />
            </div>

            {/* Project Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Description*</label>
              <textarea
                {...register('description', { required: true })}
                className="w-full border border-gray-300 rounded-md p-2 bg-white text-black"
              />
            </div>

            {/* Project Links */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Project Links (optional)</label>
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-center">
                  <input
                    {...register(`links.${index}.url`, { required: true })}
                    className="w-full border border-gray-300 rounded-md p-2 bg-white text-black"
                    placeholder="https://example.com"
                  />
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="bg-red-500 hover:bg-red-600 text-white rounded-md p-1.5"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => append({ url: '' })}
                className="flex items-center gap-2 border border-gray-500 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Link
              </button>
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
                'Submit'
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
