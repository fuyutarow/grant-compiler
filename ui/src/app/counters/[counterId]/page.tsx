'use client';

import { useParams } from 'next/navigation';
import { AppBar } from '@/src/components/AppBar';

type Params = {
  counterId: string;
};

const Page = () => {
  const { counterId } = useParams<Params>();
  return (
    <div className="min-h-screen flex flex-col">
      <AppBar />
      <main className="flex-grow flex flex-col items-center p-8">
        <p>{counterId}/poap</p>
      </main>
    </div>
  );
};

export default Page;
