import * as reified from '../../_framework/reified';
import { String } from '../../_dependencies/onchain/0x1/string/structs';
import { Balance } from '../../_dependencies/onchain/0x2/balance/structs';
import { ID, UID } from '../../_dependencies/onchain/0x2/object/structs';
import { SUI } from '../../_dependencies/onchain/0x2/sui/structs';
import { Table } from '../../_dependencies/onchain/0x2/table/structs';
import {
  PhantomReified,
  Reified,
  StructClass,
  ToField,
  ToTypeStr,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  fieldToJSON,
  phantom,
  ToTypeStr as ToPhantom,
} from '../../_framework/reified';
import { FieldsWithTypes, composeSuiType, compressSuiType } from '../../_framework/util';
import { Vector } from '../../_framework/vector';
import { PKG_V1 } from '../index';
import { bcs } from '@mysten/sui/bcs';
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client';
import { fromB64, fromHEX, toHEX } from '@mysten/sui/utils';

/* ============================== AdminCap =============================== */

export function isAdminCap(type: string): boolean {
  type = compressSuiType(type);
  return type === `${PKG_V1}::hackathon::AdminCap`;
}

export interface AdminCapFields {
  id: ToField<UID>;
  hackathonId: ToField<ID>;
}

export type AdminCapReified = Reified<AdminCap, AdminCapFields>;

export class AdminCap implements StructClass {
  __StructClass = true as const;

  static readonly $typeName = `${PKG_V1}::hackathon::AdminCap`;
  static readonly $numTypeParams = 0;
  static readonly $isPhantom = [] as const;

  readonly $typeName = AdminCap.$typeName;
  readonly $fullTypeName: `${typeof PKG_V1}::hackathon::AdminCap`;
  readonly $typeArgs: [];
  readonly $isPhantom = AdminCap.$isPhantom;

  readonly id: ToField<UID>;
  readonly hackathonId: ToField<ID>;

  private constructor(typeArgs: [], fields: AdminCapFields) {
    this.$fullTypeName = composeSuiType(
      AdminCap.$typeName,
      ...typeArgs,
    ) as `${typeof PKG_V1}::hackathon::AdminCap`;
    this.$typeArgs = typeArgs;

    this.id = fields.id;
    this.hackathonId = fields.hackathonId;
  }

  static reified(): AdminCapReified {
    return {
      typeName: AdminCap.$typeName,
      fullTypeName: composeSuiType(
        AdminCap.$typeName,
        ...[],
      ) as `${typeof PKG_V1}::hackathon::AdminCap`,
      typeArgs: [] as [],
      isPhantom: AdminCap.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AdminCap.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AdminCap.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AdminCap.fromBcs(data),
      bcs: AdminCap.bcs,
      fromJSONField: (field: any) => AdminCap.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AdminCap.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => AdminCap.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => AdminCap.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => AdminCap.fetch(client, id),
      new: (fields: AdminCapFields) => {
        return new AdminCap([], fields);
      },
      kind: 'StructClassReified',
    };
  }

  static get r() {
    return AdminCap.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<AdminCap>> {
    return phantom(AdminCap.reified());
  }
  static get p() {
    return AdminCap.phantom();
  }

  static get bcs() {
    return bcs.struct('AdminCap', {
      id: UID.bcs,
      hackathon_id: ID.bcs,
    });
  }

  static fromFields(fields: Record<string, any>): AdminCap {
    return AdminCap.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      hackathonId: decodeFromFields(ID.reified(), fields.hackathon_id),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): AdminCap {
    if (!isAdminCap(item.type)) {
      throw new Error('not a AdminCap type');
    }

    return AdminCap.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      hackathonId: decodeFromFieldsWithTypes(ID.reified(), item.fields.hackathon_id),
    });
  }

  static fromBcs(data: Uint8Array): AdminCap {
    return AdminCap.fromFields(AdminCap.bcs.parse(data));
  }

  toJSONField() {
    return {
      id: this.id,
      hackathonId: this.hackathonId,
    };
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
  }

  static fromJSONField(field: any): AdminCap {
    return AdminCap.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      hackathonId: decodeFromJSONField(ID.reified(), field.hackathonId),
    });
  }

  static fromJSON(json: Record<string, any>): AdminCap {
    if (json.$typeName !== AdminCap.$typeName) {
      throw new Error('not a WithTwoGenerics json object');
    }

    return AdminCap.fromJSONField(json);
  }

  static fromSuiParsedData(content: SuiParsedData): AdminCap {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object');
    }
    if (!isAdminCap(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AdminCap object`);
    }
    return AdminCap.fromFieldsWithTypes(content);
  }

  static fromSuiObjectData(data: SuiObjectData): AdminCap {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAdminCap(data.bcs.type)) {
        throw new Error(`object at is not a AdminCap object`);
      }

      return AdminCap.fromBcs(fromB64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return AdminCap.fromSuiParsedData(data.content);
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    );
  }

  static async fetch(client: SuiClient, id: string): Promise<AdminCap> {
    const res = await client.getObject({ id, options: { showBcs: true } });
    if (res.error) {
      throw new Error(`error fetching AdminCap object at id ${id}: ${res.error.code}`);
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isAdminCap(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a AdminCap object`);
    }

    return AdminCap.fromSuiObjectData(res.data);
  }
}

/* ============================== Hackathon =============================== */

export function isHackathon(type: string): boolean {
  type = compressSuiType(type);
  return type === `${PKG_V1}::hackathon::Hackathon`;
}

export interface HackathonFields {
  id: ToField<UID>;
  title: ToField<String>;
  description: ToField<String>;
  projects: ToField<Vector<ID>>;
  scoreboard: ToField<ScoreBoard>;
  pool: ToField<ReviewerPool>;
  deadline: ToField<'u64'>;
  createdBy: ToField<'address'>;
  createdAt: ToField<'u64'>;
}

export type HackathonReified = Reified<Hackathon, HackathonFields>;

export class Hackathon implements StructClass {
  __StructClass = true as const;

  static readonly $typeName = `${PKG_V1}::hackathon::Hackathon`;
  static readonly $numTypeParams = 0;
  static readonly $isPhantom = [] as const;

  readonly $typeName = Hackathon.$typeName;
  readonly $fullTypeName: `${typeof PKG_V1}::hackathon::Hackathon`;
  readonly $typeArgs: [];
  readonly $isPhantom = Hackathon.$isPhantom;

  readonly id: ToField<UID>;
  readonly title: ToField<String>;
  readonly description: ToField<String>;
  readonly projects: ToField<Vector<ID>>;
  readonly scoreboard: ToField<ScoreBoard>;
  readonly pool: ToField<ReviewerPool>;
  readonly deadline: ToField<'u64'>;
  readonly createdBy: ToField<'address'>;
  readonly createdAt: ToField<'u64'>;

  private constructor(typeArgs: [], fields: HackathonFields) {
    this.$fullTypeName = composeSuiType(
      Hackathon.$typeName,
      ...typeArgs,
    ) as `${typeof PKG_V1}::hackathon::Hackathon`;
    this.$typeArgs = typeArgs;

    this.id = fields.id;
    this.title = fields.title;
    this.description = fields.description;
    this.projects = fields.projects;
    this.scoreboard = fields.scoreboard;
    this.pool = fields.pool;
    this.deadline = fields.deadline;
    this.createdBy = fields.createdBy;
    this.createdAt = fields.createdAt;
  }

  static reified(): HackathonReified {
    return {
      typeName: Hackathon.$typeName,
      fullTypeName: composeSuiType(
        Hackathon.$typeName,
        ...[],
      ) as `${typeof PKG_V1}::hackathon::Hackathon`,
      typeArgs: [] as [],
      isPhantom: Hackathon.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Hackathon.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Hackathon.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Hackathon.fromBcs(data),
      bcs: Hackathon.bcs,
      fromJSONField: (field: any) => Hackathon.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Hackathon.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => Hackathon.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Hackathon.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => Hackathon.fetch(client, id),
      new: (fields: HackathonFields) => {
        return new Hackathon([], fields);
      },
      kind: 'StructClassReified',
    };
  }

  static get r() {
    return Hackathon.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<Hackathon>> {
    return phantom(Hackathon.reified());
  }
  static get p() {
    return Hackathon.phantom();
  }

  static get bcs() {
    return bcs.struct('Hackathon', {
      id: UID.bcs,
      title: String.bcs,
      description: String.bcs,
      projects: bcs.vector(ID.bcs),
      scoreboard: ScoreBoard.bcs,
      pool: ReviewerPool.bcs,
      deadline: bcs.u64(),
      created_by: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      created_at: bcs.u64(),
    });
  }

  static fromFields(fields: Record<string, any>): Hackathon {
    return Hackathon.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      title: decodeFromFields(String.reified(), fields.title),
      description: decodeFromFields(String.reified(), fields.description),
      projects: decodeFromFields(reified.vector(ID.reified()), fields.projects),
      scoreboard: decodeFromFields(ScoreBoard.reified(), fields.scoreboard),
      pool: decodeFromFields(ReviewerPool.reified(), fields.pool),
      deadline: decodeFromFields('u64', fields.deadline),
      createdBy: decodeFromFields('address', fields.created_by),
      createdAt: decodeFromFields('u64', fields.created_at),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Hackathon {
    if (!isHackathon(item.type)) {
      throw new Error('not a Hackathon type');
    }

    return Hackathon.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      title: decodeFromFieldsWithTypes(String.reified(), item.fields.title),
      description: decodeFromFieldsWithTypes(String.reified(), item.fields.description),
      projects: decodeFromFieldsWithTypes(reified.vector(ID.reified()), item.fields.projects),
      scoreboard: decodeFromFieldsWithTypes(ScoreBoard.reified(), item.fields.scoreboard),
      pool: decodeFromFieldsWithTypes(ReviewerPool.reified(), item.fields.pool),
      deadline: decodeFromFieldsWithTypes('u64', item.fields.deadline),
      createdBy: decodeFromFieldsWithTypes('address', item.fields.created_by),
      createdAt: decodeFromFieldsWithTypes('u64', item.fields.created_at),
    });
  }

  static fromBcs(data: Uint8Array): Hackathon {
    return Hackathon.fromFields(Hackathon.bcs.parse(data));
  }

  toJSONField() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      projects: fieldToJSON<Vector<ID>>(`vector<${ID.$typeName}>`, this.projects),
      scoreboard: this.scoreboard.toJSONField(),
      pool: this.pool.toJSONField(),
      deadline: this.deadline.toString(),
      createdBy: this.createdBy,
      createdAt: this.createdAt.toString(),
    };
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
  }

  static fromJSONField(field: any): Hackathon {
    return Hackathon.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      title: decodeFromJSONField(String.reified(), field.title),
      description: decodeFromJSONField(String.reified(), field.description),
      projects: decodeFromJSONField(reified.vector(ID.reified()), field.projects),
      scoreboard: decodeFromJSONField(ScoreBoard.reified(), field.scoreboard),
      pool: decodeFromJSONField(ReviewerPool.reified(), field.pool),
      deadline: decodeFromJSONField('u64', field.deadline),
      createdBy: decodeFromJSONField('address', field.createdBy),
      createdAt: decodeFromJSONField('u64', field.createdAt),
    });
  }

  static fromJSON(json: Record<string, any>): Hackathon {
    if (json.$typeName !== Hackathon.$typeName) {
      throw new Error('not a WithTwoGenerics json object');
    }

    return Hackathon.fromJSONField(json);
  }

  static fromSuiParsedData(content: SuiParsedData): Hackathon {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object');
    }
    if (!isHackathon(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Hackathon object`);
    }
    return Hackathon.fromFieldsWithTypes(content);
  }

  static fromSuiObjectData(data: SuiObjectData): Hackathon {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isHackathon(data.bcs.type)) {
        throw new Error(`object at is not a Hackathon object`);
      }

      return Hackathon.fromBcs(fromB64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return Hackathon.fromSuiParsedData(data.content);
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    );
  }

  static async fetch(client: SuiClient, id: string): Promise<Hackathon> {
    const res = await client.getObject({ id, options: { showBcs: true } });
    if (res.error) {
      throw new Error(`error fetching Hackathon object at id ${id}: ${res.error.code}`);
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isHackathon(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a Hackathon object`);
    }

    return Hackathon.fromSuiObjectData(res.data);
  }
}

/* ============================== ReviewerPool =============================== */

export function isReviewerPool(type: string): boolean {
  type = compressSuiType(type);
  return type === `${PKG_V1}::hackathon::ReviewerPool`;
}

export interface ReviewerPoolFields {
  reservedSui: ToField<Balance<ToPhantom<SUI>>>;
  distributed: ToField<Table<ToPhantom<ID>, 'bool'>>;
}

export type ReviewerPoolReified = Reified<ReviewerPool, ReviewerPoolFields>;

export class ReviewerPool implements StructClass {
  __StructClass = true as const;

  static readonly $typeName = `${PKG_V1}::hackathon::ReviewerPool`;
  static readonly $numTypeParams = 0;
  static readonly $isPhantom = [] as const;

  readonly $typeName = ReviewerPool.$typeName;
  readonly $fullTypeName: `${typeof PKG_V1}::hackathon::ReviewerPool`;
  readonly $typeArgs: [];
  readonly $isPhantom = ReviewerPool.$isPhantom;

  readonly reservedSui: ToField<Balance<ToPhantom<SUI>>>;
  readonly distributed: ToField<Table<ToPhantom<ID>, 'bool'>>;

  private constructor(typeArgs: [], fields: ReviewerPoolFields) {
    this.$fullTypeName = composeSuiType(
      ReviewerPool.$typeName,
      ...typeArgs,
    ) as `${typeof PKG_V1}::hackathon::ReviewerPool`;
    this.$typeArgs = typeArgs;

    this.reservedSui = fields.reservedSui;
    this.distributed = fields.distributed;
  }

  static reified(): ReviewerPoolReified {
    return {
      typeName: ReviewerPool.$typeName,
      fullTypeName: composeSuiType(
        ReviewerPool.$typeName,
        ...[],
      ) as `${typeof PKG_V1}::hackathon::ReviewerPool`,
      typeArgs: [] as [],
      isPhantom: ReviewerPool.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ReviewerPool.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ReviewerPool.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ReviewerPool.fromBcs(data),
      bcs: ReviewerPool.bcs,
      fromJSONField: (field: any) => ReviewerPool.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ReviewerPool.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => ReviewerPool.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => ReviewerPool.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => ReviewerPool.fetch(client, id),
      new: (fields: ReviewerPoolFields) => {
        return new ReviewerPool([], fields);
      },
      kind: 'StructClassReified',
    };
  }

  static get r() {
    return ReviewerPool.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<ReviewerPool>> {
    return phantom(ReviewerPool.reified());
  }
  static get p() {
    return ReviewerPool.phantom();
  }

  static get bcs() {
    return bcs.struct('ReviewerPool', {
      reserved_sui: Balance.bcs,
      distributed: Table.bcs,
    });
  }

  static fromFields(fields: Record<string, any>): ReviewerPool {
    return ReviewerPool.reified().new({
      reservedSui: decodeFromFields(
        Balance.reified(reified.phantom(SUI.reified())),
        fields.reserved_sui,
      ),
      distributed: decodeFromFields(
        Table.reified(reified.phantom(ID.reified()), reified.phantom('bool')),
        fields.distributed,
      ),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ReviewerPool {
    if (!isReviewerPool(item.type)) {
      throw new Error('not a ReviewerPool type');
    }

    return ReviewerPool.reified().new({
      reservedSui: decodeFromFieldsWithTypes(
        Balance.reified(reified.phantom(SUI.reified())),
        item.fields.reserved_sui,
      ),
      distributed: decodeFromFieldsWithTypes(
        Table.reified(reified.phantom(ID.reified()), reified.phantom('bool')),
        item.fields.distributed,
      ),
    });
  }

  static fromBcs(data: Uint8Array): ReviewerPool {
    return ReviewerPool.fromFields(ReviewerPool.bcs.parse(data));
  }

  toJSONField() {
    return {
      reservedSui: this.reservedSui.toJSONField(),
      distributed: this.distributed.toJSONField(),
    };
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
  }

  static fromJSONField(field: any): ReviewerPool {
    return ReviewerPool.reified().new({
      reservedSui: decodeFromJSONField(
        Balance.reified(reified.phantom(SUI.reified())),
        field.reservedSui,
      ),
      distributed: decodeFromJSONField(
        Table.reified(reified.phantom(ID.reified()), reified.phantom('bool')),
        field.distributed,
      ),
    });
  }

  static fromJSON(json: Record<string, any>): ReviewerPool {
    if (json.$typeName !== ReviewerPool.$typeName) {
      throw new Error('not a WithTwoGenerics json object');
    }

    return ReviewerPool.fromJSONField(json);
  }

  static fromSuiParsedData(content: SuiParsedData): ReviewerPool {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object');
    }
    if (!isReviewerPool(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ReviewerPool object`);
    }
    return ReviewerPool.fromFieldsWithTypes(content);
  }

  static fromSuiObjectData(data: SuiObjectData): ReviewerPool {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isReviewerPool(data.bcs.type)) {
        throw new Error(`object at is not a ReviewerPool object`);
      }

      return ReviewerPool.fromBcs(fromB64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return ReviewerPool.fromSuiParsedData(data.content);
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    );
  }

  static async fetch(client: SuiClient, id: string): Promise<ReviewerPool> {
    const res = await client.getObject({ id, options: { showBcs: true } });
    if (res.error) {
      throw new Error(`error fetching ReviewerPool object at id ${id}: ${res.error.code}`);
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isReviewerPool(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a ReviewerPool object`);
    }

    return ReviewerPool.fromSuiObjectData(res.data);
  }
}

/* ============================== ScoreBoard =============================== */

export function isScoreBoard(type: string): boolean {
  type = compressSuiType(type);
  return type === `${PKG_V1}::hackathon::ScoreBoard`;
}

export interface ScoreBoardFields {
  scores: ToField<Table<ToPhantom<ID>, 'u64'>>;
  sumScore: ToField<'u64'>;
}

export type ScoreBoardReified = Reified<ScoreBoard, ScoreBoardFields>;

export class ScoreBoard implements StructClass {
  __StructClass = true as const;

  static readonly $typeName = `${PKG_V1}::hackathon::ScoreBoard`;
  static readonly $numTypeParams = 0;
  static readonly $isPhantom = [] as const;

  readonly $typeName = ScoreBoard.$typeName;
  readonly $fullTypeName: `${typeof PKG_V1}::hackathon::ScoreBoard`;
  readonly $typeArgs: [];
  readonly $isPhantom = ScoreBoard.$isPhantom;

  readonly scores: ToField<Table<ToPhantom<ID>, 'u64'>>;
  readonly sumScore: ToField<'u64'>;

  private constructor(typeArgs: [], fields: ScoreBoardFields) {
    this.$fullTypeName = composeSuiType(
      ScoreBoard.$typeName,
      ...typeArgs,
    ) as `${typeof PKG_V1}::hackathon::ScoreBoard`;
    this.$typeArgs = typeArgs;

    this.scores = fields.scores;
    this.sumScore = fields.sumScore;
  }

  static reified(): ScoreBoardReified {
    return {
      typeName: ScoreBoard.$typeName,
      fullTypeName: composeSuiType(
        ScoreBoard.$typeName,
        ...[],
      ) as `${typeof PKG_V1}::hackathon::ScoreBoard`,
      typeArgs: [] as [],
      isPhantom: ScoreBoard.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ScoreBoard.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ScoreBoard.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ScoreBoard.fromBcs(data),
      bcs: ScoreBoard.bcs,
      fromJSONField: (field: any) => ScoreBoard.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ScoreBoard.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => ScoreBoard.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => ScoreBoard.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => ScoreBoard.fetch(client, id),
      new: (fields: ScoreBoardFields) => {
        return new ScoreBoard([], fields);
      },
      kind: 'StructClassReified',
    };
  }

  static get r() {
    return ScoreBoard.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<ScoreBoard>> {
    return phantom(ScoreBoard.reified());
  }
  static get p() {
    return ScoreBoard.phantom();
  }

  static get bcs() {
    return bcs.struct('ScoreBoard', {
      scores: Table.bcs,
      sum_score: bcs.u64(),
    });
  }

  static fromFields(fields: Record<string, any>): ScoreBoard {
    return ScoreBoard.reified().new({
      scores: decodeFromFields(
        Table.reified(reified.phantom(ID.reified()), reified.phantom('u64')),
        fields.scores,
      ),
      sumScore: decodeFromFields('u64', fields.sum_score),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ScoreBoard {
    if (!isScoreBoard(item.type)) {
      throw new Error('not a ScoreBoard type');
    }

    return ScoreBoard.reified().new({
      scores: decodeFromFieldsWithTypes(
        Table.reified(reified.phantom(ID.reified()), reified.phantom('u64')),
        item.fields.scores,
      ),
      sumScore: decodeFromFieldsWithTypes('u64', item.fields.sum_score),
    });
  }

  static fromBcs(data: Uint8Array): ScoreBoard {
    return ScoreBoard.fromFields(ScoreBoard.bcs.parse(data));
  }

  toJSONField() {
    return {
      scores: this.scores.toJSONField(),
      sumScore: this.sumScore.toString(),
    };
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
  }

  static fromJSONField(field: any): ScoreBoard {
    return ScoreBoard.reified().new({
      scores: decodeFromJSONField(
        Table.reified(reified.phantom(ID.reified()), reified.phantom('u64')),
        field.scores,
      ),
      sumScore: decodeFromJSONField('u64', field.sumScore),
    });
  }

  static fromJSON(json: Record<string, any>): ScoreBoard {
    if (json.$typeName !== ScoreBoard.$typeName) {
      throw new Error('not a WithTwoGenerics json object');
    }

    return ScoreBoard.fromJSONField(json);
  }

  static fromSuiParsedData(content: SuiParsedData): ScoreBoard {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object');
    }
    if (!isScoreBoard(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ScoreBoard object`);
    }
    return ScoreBoard.fromFieldsWithTypes(content);
  }

  static fromSuiObjectData(data: SuiObjectData): ScoreBoard {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isScoreBoard(data.bcs.type)) {
        throw new Error(`object at is not a ScoreBoard object`);
      }

      return ScoreBoard.fromBcs(fromB64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return ScoreBoard.fromSuiParsedData(data.content);
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    );
  }

  static async fetch(client: SuiClient, id: string): Promise<ScoreBoard> {
    const res = await client.getObject({ id, options: { showBcs: true } });
    if (res.error) {
      throw new Error(`error fetching ScoreBoard object at id ${id}: ${res.error.code}`);
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isScoreBoard(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a ScoreBoard object`);
    }

    return ScoreBoard.fromSuiObjectData(res.data);
  }
}
