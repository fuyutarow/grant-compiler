'use client';

import { useParams } from 'next/navigation';
import { AppBar } from '@/src/components/AppBar';
import { useEffect, useState } from 'react';
import { Counter } from '@/src/libs/moveCall/counter/counter/structs';
import useSWR from 'swr';
import Link from 'next/link';

type Params = {
  hackathonId: string;
  projectId: string;
};

type ProjectFields = {
  id: string;
  title: string;
  description: string;
  logo: string | null;
  tags: string[];
  owner: string;
  created_at: bigint;
  links: { label: string; url: string }[];
};

const Page = () => {
  const { hackathonId, projectId } = useParams<Params>();

  const project: ProjectFields = {
    id: 'project-456',
    title: 'InnovateX',
    description:
      'InnovateX is a groundbreaking platform designed to foster innovation in technology and sustainability. Our mission is to connect creative minds with the resources they need to bring their ideas to life. By leveraging cutting-edge technology and a collaborative community, InnovateX aims to drive positive change and sustainable development across various industries. Join us in our journey to make the world a better place through innovation and collaboration.',
    logo: 'https://picsum.photos/seed/project-456/150/150',
    tags: ['#Innovation', '#Sustainability'],
    owner: '0x123456',
    created_at: BigInt(Date.now()),
    links: [
      { label: 'Website', url: 'https://example.com' },
      { label: 'GitHub', url: 'https://github.com/example/repo' },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-black">
      <AppBar />
      <main className="flex-grow flex flex-col items-center p-8 w-full">
        <Link
          href={`/hackathons/${hackathonId}/projects`}
          className="mb-4 text-blue-500 hover:underline self-start"
        >
          &larr; Back to Projects
        </Link>
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <img
              src={project.logo || 'https://via.placeholder.com/150'}
              alt="Project Logo"
              className="w-32 h-32 object-cover rounded-full md:mr-6 mb-4 md:mb-0"
            />
            <div className="flex-grow">
              <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
              <div className="flex flex-wrap mb-4">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full mr-2 mb-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="text-sm text-gray-500 mb-4">
                <p>Owner: {project.owner}</p>
                <p>Created At: {new Date(Number(project.created_at)).toLocaleDateString()}</p>
              </div>
              <div className="flex flex-col mb-4">
                {project.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline mb-2"
                  >
                    {link.url}
                  </a>
                ))}
              </div>
              <p className="text-gray-600">{project.description}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
