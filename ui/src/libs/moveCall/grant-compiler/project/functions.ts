import { PUBLISHED_AT } from '..';
import { String } from '../../_dependencies/onchain/0x1/string/structs';
import { Url } from '../../_dependencies/onchain/0x2/url/structs';
import { obj, option, pure, vector } from '../../_framework/util';
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions';

export interface ClaimGrantArgs {
  project: TransactionObjectInput;
  hackathon: TransactionObjectInput;
  clock: TransactionObjectInput;
}

export function claimGrant(tx: Transaction, args: ClaimGrantArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::project::claim_grant`,
    arguments: [obj(tx, args.project), obj(tx, args.hackathon), obj(tx, args.clock)],
  });
}

export interface NewArgs {
  hackathon: TransactionObjectInput;
  string1: string | TransactionArgument;
  string2: string | TransactionArgument;
  option: TransactionObjectInput | TransactionArgument | null;
  vecUrl: Array<TransactionObjectInput> | TransactionArgument;
  vecString: Array<string | TransactionArgument> | TransactionArgument;
  clock: TransactionObjectInput;
}

export function new_(tx: Transaction, args: NewArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::project::new`,
    arguments: [
      obj(tx, args.hackathon),
      pure(tx, args.string1, `${String.$typeName}`),
      pure(tx, args.string2, `${String.$typeName}`),
      option(tx, `${Url.$typeName}`, args.option),
      vector(tx, `${Url.$typeName}`, args.vecUrl),
      pure(tx, args.vecString, `vector<${String.$typeName}>`),
      obj(tx, args.clock),
    ],
  });
}

export interface UpdateArgs {
  project: TransactionObjectInput;
  string1: string | TransactionArgument;
  string2: string | TransactionArgument;
}

export function update(tx: Transaction, args: UpdateArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::project::update`,
    arguments: [
      obj(tx, args.project),
      pure(tx, args.string1, `${String.$typeName}`),
      pure(tx, args.string2, `${String.$typeName}`),
    ],
  });
}
