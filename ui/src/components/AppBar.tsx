import { ConnectButton } from '@mysten/dapp-kit';
import Image from 'next/image';
import Link from 'next/link';

export const AppBar = () => (
  <header className="flex justify-between items-center p-4 bg-white shadow-md">
    <Link href="/" passHref>
      <div className="flex items-center space-x-3 cursor-pointer">
        <Image
          src="/logo/logo.png"
          alt="Sui Logo"
          width={40}
          height={40}
          className="rounded-full"
        />
        <span className="text-xl font-bold text-gray-800">Grant Compiler</span>
      </div>
    </Link>
    <div className="flex items-center">
      <Link href="/mypage" passHref>
        <span className="text-gray-800 hover:underline cursor-pointer mr-4">My Page</span>
      </Link>
      <ConnectButton />
      <span className="ml-4 text-gray-800">Testnet</span>
    </div>
  </header>
);
