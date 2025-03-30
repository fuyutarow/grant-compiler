'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

type Params = {
  hackathonId: string;
};

export default function Page() {
  const pathname = usePathname();
  const router = useRouter();
  const { hackathonId } = useParams<Params>();

  useEffect(() => {
    router.push(`/hackathons/${hackathonId}/projects`);
  }, [pathname, router, hackathonId]);

  return null; // Or a loading indicator if needed
}
