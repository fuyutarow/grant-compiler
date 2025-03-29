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
                <Link
                  key={project.id}
                  href={`/hackathons/${hackathon.id}/projects/${project.id}`}
                  passHref
                >
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
                          <span
                            key={index}
                            className="inline-block bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full mr-2"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default MyPage;
