import { Transaction } from '@mysten/sui/transactions';
import { create } from '../moveCall/grant-compiler/hackathon/functions';
import { ROOT_ID } from './index';
import { SUI_CLOCK_OBJECT_ID } from '@mysten/sui/utils';

export class HackathonTX {
  static async create(
    tx: Transaction,
    args: {
      sender: string;
      title: string;
      description: string;
      deadline: Date;
      grantAmont: number;
    },
  ) {
    const [cap] = await create(tx, {
      root: ROOT_ID,
      string1: args.title,
      string2: args.description,
      u64: BigInt(Math.floor(args.deadline.getTime() / 1000)),
      clock: SUI_CLOCK_OBJECT_ID,
    });
    console.log('cap', cap);
    tx.transferObjects([cap], args.sender);
  }
}
