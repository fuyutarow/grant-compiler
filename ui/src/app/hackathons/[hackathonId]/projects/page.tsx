'use client';

import { useParams } from 'next/navigation';
import { AppBar } from '@/src/components/AppBar';
import { useEffect, useState } from 'react';
import { Counter } from '@/src/libs/moveCall/counter/counter/structs';
import { suiClient } from '@/src/contracts';
import useSWR from 'swr';
import Link from 'next/link';

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
  'Payments'
];

function getRandomTags(): string[] {
  const shuffled = ALL_TAGS.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.floor(Math.random() * 3) + 1);
}

const Page = () => {
  const { hackathonId } = useParams<Params>();

  const projects = [
    { id: Math.floor(Math.random() * 1000000), title: 'Project 1', description: 'Description for Project 1', tags: getRandomTags() },
    { id: Math.floor(Math.random() * 1000000), title: 'Project 2', description: 'Description for Project 2', tags: getRandomTags() },
    // Add more projects as needed
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <AppBar />
      <main className="flex-grow flex flex-col items-center p-8 w-full">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`} passHref>
              <div className="bg-gray-100 shadow-md rounded-lg overflow-hidden cursor-pointer">
                <img
                  src={`https://picsum.photos/seed/${project.id}/400/400`}
                  alt={project.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold">{project.title}</h2>
                  <p className="text-gray-700">{project.description}</p>
                  <div className="mt-2">
                    {project.tags.map((tag, index) => (
                      <span key={index} className="inline-block bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full mr-2">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Page;
