import { PUBLISHED_AT } from '..';
import { ID } from '../../_dependencies/onchain/0x2/object/structs';
import { obj, pure } from '../../_framework/util';
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions';

export interface AddHackathonArgs {
  root: TransactionObjectInput;
  id: string | TransactionArgument;
}

export function addHackathon(tx: Transaction, args: AddHackathonArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::root::add_hackathon`,
    arguments: [obj(tx, args.root), pure(tx, args.id, `${ID.$typeName}`)],
  });
}

export function init(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::root::init`, arguments: [] });
}
