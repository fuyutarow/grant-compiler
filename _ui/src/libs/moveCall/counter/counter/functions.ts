import {PUBLISHED_AT} from "..";
import {obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export function create( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::counter::create`, arguments: [ ], }) }

export function increment( tx: Transaction, counter: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::counter::increment`, arguments: [ obj(tx, counter) ], }) }

export interface SetValueArgs { counter: TransactionObjectInput; u64: bigint | TransactionArgument }

export function setValue( tx: Transaction, args: SetValueArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::counter::set_value`, arguments: [ obj(tx, args.counter), pure(tx, args.u64, `u64`) ], }) }
