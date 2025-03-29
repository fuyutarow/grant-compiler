import { PUBLISHED_AT } from '..';
import { String } from '../../_dependencies/onchain/0x1/string/structs';
import { ID } from '../../_dependencies/onchain/0x2/object/structs';
import { obj, pure } from '../../_framework/util';
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions';

export interface AddProjectIdArgs {
  hackathon: TransactionObjectInput;
  id: string | TransactionArgument;
  clock: TransactionObjectInput;
}

export function addProjectId(tx: Transaction, args: AddProjectIdArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::hackathon::add_project_id`,
    arguments: [obj(tx, args.hackathon), pure(tx, args.id, `${ID.$typeName}`), obj(tx, args.clock)],
  });
}

export interface CalulateProjectGrantValueArgs {
  hackathon: TransactionObjectInput;
  id: string | TransactionArgument;
}

export function calulateProjectGrantValue(tx: Transaction, args: CalulateProjectGrantValueArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::hackathon::calulate_project_grant_value`,
    arguments: [obj(tx, args.hackathon), pure(tx, args.id, `${ID.$typeName}`)],
  });
}

export interface CreateArgs {
  root: TransactionObjectInput;
  string1: string | TransactionArgument;
  string2: string | TransactionArgument;
  u64: bigint | TransactionArgument;
  clock: TransactionObjectInput;
}

export function create(tx: Transaction, args: CreateArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::hackathon::create`,
    arguments: [
      obj(tx, args.root),
      pure(tx, args.string1, `${String.$typeName}`),
      pure(tx, args.string2, `${String.$typeName}`),
      pure(tx, args.u64, `u64`),
      obj(tx, args.clock),
    ],
  });
}

export interface SplitProjectGrantArgs {
  hackathon: TransactionObjectInput;
  id: string | TransactionArgument;
  clock: TransactionObjectInput;
}

export function splitProjectGrant(tx: Transaction, args: SplitProjectGrantArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::hackathon::split_project_grant`,
    arguments: [obj(tx, args.hackathon), pure(tx, args.id, `${ID.$typeName}`), obj(tx, args.clock)],
  });
}

export interface StakeSuiArgs {
  hackathon: TransactionObjectInput;
  balance: TransactionObjectInput;
  clock: TransactionObjectInput;
}

export function stakeSui(tx: Transaction, args: StakeSuiArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::hackathon::stake_sui`,
    arguments: [obj(tx, args.hackathon), obj(tx, args.balance), obj(tx, args.clock)],
  });
}

export interface UpdateScoreArgs {
  hackathon: TransactionObjectInput;
  adminCap: TransactionObjectInput;
  id: string | TransactionArgument;
  u64: bigint | TransactionArgument;
  clock: TransactionObjectInput;
}

export function updateScore(tx: Transaction, args: UpdateScoreArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::hackathon::update_score`,
    arguments: [
      obj(tx, args.hackathon),
      obj(tx, args.adminCap),
      pure(tx, args.id, `${ID.$typeName}`),
      pure(tx, args.u64, `u64`),
      obj(tx, args.clock),
    ],
  });
}

export interface WithdrawRemainingGrantArgs {
  hackathon: TransactionObjectInput;
  clock: TransactionObjectInput;
}

export function withdrawRemainingGrant(tx: Transaction, args: WithdrawRemainingGrantArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::hackathon::withdraw_remaining_grant`,
    arguments: [obj(tx, args.hackathon), obj(tx, args.clock)],
  });
}
