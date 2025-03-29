'use client';

import { useParams } from 'next/navigation';
import { AppBar } from '@/src/components/AppBar';
import { useEffect, useState } from 'react';
import { Counter } from '@/src/libs/moveCall/counter/counter/structs';
import { suiClient } from '@/src/contracts';
import useSWR from 'swr';

type Params = {
  hackathonId: string;
};

const Page = () => {
  const { hackathonId } = useParams<Params>();

  return (
    <div className="min-h-screen flex flex-col">
      <AppBar />
      <main className="flex-grow flex flex-col items-center p-8">
        <p>/hackathons/{hackathonId}</p>
      </main>
    </div>
  );
};

export default Page;
