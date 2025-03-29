'use client';

import { useParams } from 'next/navigation';
import { AppBar } from '@/src/components/AppBar';
import { useEffect, useState } from 'react';
import { Counter } from '@/src/libs/moveCall/counter/counter/structs';
import { suiClient } from '@/src/contracts';
import useSWR from 'swr';
import Link from 'next/link';
import ProjectCard from '@/src/components/ProjectCard';

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

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <AppBar />
      <main className="flex-grow flex flex-col items-center p-8 w-full">
        <Link href={`/hackathons`} className="mb-4 text-blue-500 hover:underline self-start">
          &larr; Back to Hackathons
        </Link>
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} hackathonId={hackathonId} project={project} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Page;
