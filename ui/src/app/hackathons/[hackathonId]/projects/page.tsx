'use client';

import { useParams } from 'next/navigation';
import { AppBar } from '@/src/components/AppBar';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import ProjectCard from '@/src/components/ProjectCard';
import { truncateAddress } from '@/src/utils';
import { Hackathon } from '@/src/libs/moveCall/grant-compiler/hackathon/structs';
import { sdkClient } from '@/src/contracts';

type Params = {
  hackathonId: string;
};

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

const Page = () => {
  const { hackathonId } = useParams<Params>();
  const { data: hackathon } = useSWR(
    hackathonId,
    async (key: string) => await Hackathon.fetch(sdkClient, key),
    { revalidateOnFocus: false },
  );


  const projects = [
    {
      id: Math.floor(Math.random() * 1000000).toString(),
      title: 'Project 1',
      description: 'Description for Project 1',
      tags: getRandomTags(),
    },
    {
      id: Math.floor(Math.random() * 1000000).toString(),
      title: 'Project 2',
      description: 'Description for Project 2',
      tags: getRandomTags(),
    },
    // Add more projects as needed
  ];

  useEffect(() => {
    console.log(hackathon);
  }, [hackathon?.id]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800">
      <AppBar />
      <main className="flex-grow flex flex-col items-center p-8 max-w-7xl mx-auto w-full">
        <div className="w-full flex items-center justify-between mb-8">
          <Link href={`/hackathons`} className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Hackathons
          </Link>
        </div>

        {hackathon ? (
          <div className="w-full mb-10">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
              <div className="bg-blue-600 px-6 py-4">
                <h1 className="text-2xl font-bold text-white">{hackathon.title}</h1>
                <div className="flex items-center mt-2 text-blue-100">
                  <span className="text-sm">ID: </span>
                  <a
                    href={`https://suiscan.xyz/testnet/object/${hackathonId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-1 text-sm hover:text-white transition-colors flex items-center"
                  >
                    {truncateAddress(hackathonId)}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="px-6 py-4">
                <div className="mb-4">
                  <p className="text-gray-700 whitespace-pre-wrap">{hackathon.description}</p>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Deadline: {new Date(Number(hackathon.deadline)).toLocaleDateString()} {new Date(Number(hackathon.deadline)).toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-center py-20">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-gray-300 h-12 w-12"></div>
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <h2 className="text-xl font-bold text-gray-800 self-start mb-4">Projects</h2>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} hackathonId={hackathonId} project={project} />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link href={`/hackathons/${hackathonId}/submit`}>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition-colors">
              Submit Project
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Page;
