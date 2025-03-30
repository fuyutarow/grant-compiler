'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { useCurrentAccount, useSignAndExecuteTransaction, useSuiClient } from '@mysten/dapp-kit';
import { AppBar } from '@/src/components/AppBar';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Transaction } from '@mysten/sui/transactions';
import { ProjectTX } from '@/src/libs/grantcompiler-sdk/project';
import { Project } from '@/src/libs/moveCall/grant-compiler/project/structs';

const ALL_TAGS = [
  'Consumer',
  'DAOs',
  'DeFi',
  'DeFi & Payments',
  'DePin',
  'Gaming',
  'Infrastructure',
  'Payments',
];

function getRandomTags(): string[] {
  const shuffled = ALL_TAGS.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.floor(Math.random() * 3) + 1);
}

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
  const account = useCurrentAccount();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();
  const router = useRouter();
  const suiClient = useSuiClient();
  const { register, handleSubmit, control } = useForm<FormData>({
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
    console.log("Submit started with data:", data);

    if (!account?.address) {
      alert('No connected account found.');
      setIsSubmitting(false);
      return;
    }

    try {
      console.log("Creating transaction...");
      const tx = new Transaction();
      console.log("Transaction created:", tx);

      console.log("Calling ProjectTX.create...");
      await ProjectTX.create(tx, {
        sender: account.address,
        hackathonId: data.hackathonId,
        title: data.title,
        description: data.description,
        logo: null,
        links: data.links.map((link) => link.url),
        tags: getRandomTags()
      });
      console.log("ProjectTX.create completed");

      console.log("Calling signAndExecute...");
      signAndExecute(
        { transaction: tx },
        {
          onSuccess: async ({ digest }) => {
            console.log("Transaction successful, digest:", digest);

            console.log("Waiting for transaction...");
            const { effects } = await suiClient.waitForTransaction({
              digest,
              options: {
                showEffects: true,
                showObjectChanges: true,
              }
            });
            console.log("Transaction effects:", effects);

            const createdObjects = effects?.created ?? [];
            console.log("Created objects:", createdObjects);

            for (const c of createdObjects) {
              console.log("Checking object:", c.reference.objectId);
              const { data } = await suiClient.getObject({
                id: c.reference.objectId,
                options: { showType: true }
              });
              console.log("Object data:", data);

              if (data?.type === Project.$typeName) {
                console.log("Project found!");
                const createdId = c.reference.objectId;
                alert(`Project created successfully: projectId: ${createdId}`);
                router.push(`/hackathons/${hackathonId}/projects/${createdId}`);
                return;
              }
            }

            console.log("Project not found in created objects");
            alert('Failed to retrieve created project ID.');
            setIsSubmitting(false);
          },
          onError: (error) => {
            console.error("signAndExecute error:", error);
            alert(`Transaction failed: ${error.message || 'Unknown error'}`);
            setIsSubmitting(false);
          }
        },
      );
    } catch (err) {
      console.error('Transaction error:', err);
      alert(`An error occurred during project creation: ${err instanceof Error ? err.message : String(err)}`);
      setIsSubmitting(false);
    }
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Description*
              </label>
              <textarea
                {...register('description', { required: true })}
                className="w-full border border-gray-300 rounded-md p-2 bg-white text-black"
              />
            </div>

            {/* Project Links */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Project Links (optional)
              </label>
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => append({ url: '' })}
                className="flex items-center gap-2 border border-gray-500 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
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
