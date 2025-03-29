'use client';

import { useParams } from 'next/navigation';
import { AppBar } from '@/src/components/AppBar';
import { useEffect, useState } from 'react';
import { Counter } from '@/src/libs/moveCall/counter/counter/structs';
import { suiClient } from '@/src/contracts';
import useSWR from 'swr';

type Params = {
  counterId: string;
};

const Page = () => {
  const { counterId } = useParams<Params>();
  const { data: counter } = useSWR(
    counterId,
    async (key: string) => await Counter.fetch(suiClient, key),
    { revalidateOnFocus: false },
  );

  return (
    <div className="min-h-screen flex flex-col">
      <AppBar />
      <main className="flex-grow flex flex-col items-center p-8">
        <p>{counterId}/counter</p>
        <p>{counter?.id}</p>
        <p>{counter?.value}</p>
      </main>
    </div>
  );
};

export default Page;
