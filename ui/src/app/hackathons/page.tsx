'use client';

import { AppBar } from '@/src/components/AppBar';
import { sdkClient } from '@/src/contracts';
import { ROOT_ID } from '@/src/libs/grantcompiler-sdk';
import { Hackathon, HackathonFields } from '@/src/libs/moveCall/grant-compiler/hackathon/structs';
import { Root } from '@/src/libs/moveCall/grant-compiler/root/structs';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

export default function Hackathons() {
  const { data: root } = useSWR(
    ROOT_ID,
    async (key: string) => await Root.fetch(sdkClient, key),
    { revalidateOnFocus: false },
  );

  const [hackathons, setHackathons] = useState<HackathonFields[]>([]);

  useEffect(() => {
    const fetchHackathons = async() => {
      root?.hackathons.forEach(async (hackathonId) => {
        const hackathonData = await Hackathon.fetch(sdkClient, hackathonId);
        setHackathons((prev) => [...prev, hackathonData]);
      });
    }

    fetchHackathons();

    console.log(hackathons);


  }, [root]);

  const _hackathons = [
    {
      id: '1',
      title: 'Hackathon 1',
      description: 'Description for Hackathon 1',
      projects: [],
      deadline: '2023-12-31',
      createdBy: '0x123',
      createdAt: '2023-01-01',
    },
    {
      id: '2',
      title: 'Hackathon 2',
      description: 'Description for Hackathon 2',
      projects: [],
      deadline: '2023-12-31',
      createdBy: '0x456',
      createdAt: '2023-01-01',
    },
    // Add more hackathons as needed
  ] as unknown as HackathonFields[];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <AppBar />
      <main className="flex-grow flex flex-col items-center p-8 w-full">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4">
          {hackathons.map((hackathon) => (
            <Link key={hackathon.id} href={`/hackathons/${hackathon.id}`} passHref>
              <div className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer">
                <img
                  src={`https://picsum.photos/seed/${hackathon.id}/400/200`}
                  alt={hackathon.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold">{hackathon.title}</h2>
                  <p className="text-gray-700">{hackathon.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <Link href="/hackathons/new">
          <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md">
            New Hackathon
          </button>
        </Link>
      </main>
    </div>
  );
}
