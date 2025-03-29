import { ConnectButton } from '@mysten/dapp-kit';
import Image from 'next/image';
import Link from 'next/link';

export const AppBar = () => (
  <header className="flex justify-between items-center p-4 bg-white shadow-md">
    <Link href="/" passHref>
      <div className="flex items-center space-x-3 cursor-pointer">
        <Image src="/logo/logo.png" alt="Sui Logo" width={40} height={40} className="rounded-full" />
        <span className="text-xl font-bold text-gray-800">Grant Compiler</span>
      </div>
    </Link>
    <ConnectButton />
  </header>
);
