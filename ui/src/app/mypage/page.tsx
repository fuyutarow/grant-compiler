'use client';
import { getUserProfile } from '@/src/contracts/query';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { useEffect, useState } from 'react';
import {
  CategorizedObjects,
  calculateTotalBalance,
  formatBalance,
} from '@/src/utils/assetsHelpers';
import { AppBar } from '@/src/components/AppBar';
import Link from 'next/link';
import ProjectCard from '@/src/components/ProjectCard';

const MyPage = () => {
  const account = useCurrentAccount();
  const [userObjects, setUserObjects] = useState<CategorizedObjects | null>(null);

  const hackathons = [
    {
      id: 'hackathon-1',
      title: 'Hackathon 1',
      projects: [
        {
          id: 'project-1',
          title: 'Project 1',
          description: 'Description for Project 1',
          tags: ['#Tag1', '#Tag2'],
        },
        {
          id: 'project-2',
          title: 'Project 2',
          description: 'Description for Project 2',
          tags: ['#Tag3', '#Tag4'],
        },
      ],
    },
    // Add more hackathons and projects as needed
  ];

  useEffect(() => {
    async function fetchUserProfile() {
      if (account?.address) {
        try {
          const profile = await getUserProfile(account.address);
          setUserObjects(profile);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }
    }

    fetchUserProfile();
  }, [account]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <AppBar />
      <main className="flex-grow flex flex-col items-center p-8 w-full">
        <h1 className="text-2xl font-bold mb-4">My Page</h1>
        {hackathons.map((hackathon) => (
          <div key={hackathon.id} className="w-full max-w-4xl mb-8">
            <h2 className="text-xl font-bold mb-2">{hackathon.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {hackathon.projects.map((project) => (
                <ProjectCard key={project.id} hackathonId={hackathon.id} project={project} />
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default MyPage;
