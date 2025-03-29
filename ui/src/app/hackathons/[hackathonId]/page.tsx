'use client';

import { useParams } from 'next/navigation';
import { AppBar } from '@/src/components/AppBar';
import Link from 'next/link';
import { ProjectFields } from '@/src/libs/moveCall/grant-compiler/project/structs';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import ProjectCard from '@/src/components/ProjectCard';

type Params = {
  hackathonId: string;
};

export default function Page() {
  const pathname = usePathname();
  const router = useRouter();
  const { hackathonId } = useParams<Params>();

  useEffect(() => {
    router.push(`/hackathons/${hackathonId}/projects`);
  }, [pathname, router]);

  return null; // Or a loading indicator if needed
}