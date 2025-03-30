import { Transaction } from '@mysten/sui/transactions';
import { ROOT_ID } from './index';
import { SUI_CLOCK_OBJECT_ID } from '@mysten/sui/utils';
import { new_ } from '../moveCall/grant-compiler/project/functions';

export class ProjectTX {
  static async create(
    tx: Transaction,
    args: {
      sender: string;
      hackathonId: string;
      title: string;
      description: string;
      logo: string | null;
      links: string[];
      tags: string[];
    },
  ) {
    const [project] = await new_(tx, {
      hackathon: args.hackathonId,
      string1: args.title,
      string2: args.description,
      option: args.logo,
      vecUrl: args.links,
      vecString: args.tags,
      clock: SUI_CLOCK_OBJECT_ID,
    });
    tx.transferObjects([project], args.sender);
  }
}