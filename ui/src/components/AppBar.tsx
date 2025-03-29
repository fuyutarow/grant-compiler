import { ConnectButton } from '@mysten/dapp-kit';
import Image from 'next/image';
export const AppBar = () => (
  <header className="flex justify-between items-center p-4 bg-white shadow-md">
    <div className="flex items-center rounded-full overflow-hidden">
      <Image src="/logo/logo.jpg" alt="Sui Logo" width={80} height={40} />
    </div>
    <ConnectButton />
  </header>
);
