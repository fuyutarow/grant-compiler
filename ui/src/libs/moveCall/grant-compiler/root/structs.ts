import * as reified from '../../_framework/reified';
import { ID, UID } from '../../_dependencies/onchain/0x2/object/structs';
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
} from '../../_framework/reified';
import { FieldsWithTypes, composeSuiType, compressSuiType } from '../../_framework/util';
import { Vector } from '../../_framework/vector';
import { PKG_V1 } from '../index';
import { bcs } from '@mysten/sui/bcs';
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client';
import { fromB64 } from '@mysten/sui/utils';

/* ============================== Root =============================== */

export function isRoot(type: string): boolean {
  type = compressSuiType(type);
  return type === `${PKG_V1}::root::Root`;
}

export interface RootFields {
  id: ToField<UID>;
  hackathons: ToField<Vector<ID>>;
}

export type RootReified = Reified<Root, RootFields>;

export class Root implements StructClass {
  __StructClass = true as const;

  static readonly $typeName = `${PKG_V1}::root::Root`;
  static readonly $numTypeParams = 0;
  static readonly $isPhantom = [] as const;

  readonly $typeName = Root.$typeName;
  readonly $fullTypeName: `${typeof PKG_V1}::root::Root`;
  readonly $typeArgs: [];
  readonly $isPhantom = Root.$isPhantom;

  readonly id: ToField<UID>;
  readonly hackathons: ToField<Vector<ID>>;

  private constructor(typeArgs: [], fields: RootFields) {
    this.$fullTypeName = composeSuiType(
      Root.$typeName,
      ...typeArgs,
    ) as `${typeof PKG_V1}::root::Root`;
    this.$typeArgs = typeArgs;

    this.id = fields.id;
    this.hackathons = fields.hackathons;
  }

  static reified(): RootReified {
    return {
      typeName: Root.$typeName,
      fullTypeName: composeSuiType(Root.$typeName, ...[]) as `${typeof PKG_V1}::root::Root`,
      typeArgs: [] as [],
      isPhantom: Root.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Root.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Root.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Root.fromBcs(data),
      bcs: Root.bcs,
      fromJSONField: (field: any) => Root.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Root.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => Root.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Root.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => Root.fetch(client, id),
      new: (fields: RootFields) => {
        return new Root([], fields);
      },
      kind: 'StructClassReified',
    };
  }

  static get r() {
    return Root.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<Root>> {
    return phantom(Root.reified());
  }
  static get p() {
    return Root.phantom();
  }

  static get bcs() {
    return bcs.struct('Root', {
      id: UID.bcs,
      hackathons: bcs.vector(ID.bcs),
    });
  }

  static fromFields(fields: Record<string, any>): Root {
    return Root.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      hackathons: decodeFromFields(reified.vector(ID.reified()), fields.hackathons),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Root {
    if (!isRoot(item.type)) {
      throw new Error('not a Root type');
    }

    return Root.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      hackathons: decodeFromFieldsWithTypes(reified.vector(ID.reified()), item.fields.hackathons),
    });
  }

  static fromBcs(data: Uint8Array): Root {
    return Root.fromFields(Root.bcs.parse(data));
  }

  toJSONField() {
    return {
      id: this.id,
      hackathons: fieldToJSON<Vector<ID>>(`vector<${ID.$typeName}>`, this.hackathons),
    };
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
  }

  static fromJSONField(field: any): Root {
    return Root.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      hackathons: decodeFromJSONField(reified.vector(ID.reified()), field.hackathons),
    });
  }

  static fromJSON(json: Record<string, any>): Root {
    if (json.$typeName !== Root.$typeName) {
      throw new Error('not a WithTwoGenerics json object');
    }

    return Root.fromJSONField(json);
  }

  static fromSuiParsedData(content: SuiParsedData): Root {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object');
    }
    if (!isRoot(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Root object`);
    }
    return Root.fromFieldsWithTypes(content);
  }

  static fromSuiObjectData(data: SuiObjectData): Root {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRoot(data.bcs.type)) {
        throw new Error(`object at is not a Root object`);
      }

      return Root.fromBcs(fromB64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return Root.fromSuiParsedData(data.content);
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    );
  }

  static async fetch(client: SuiClient, id: string): Promise<Root> {
    const res = await client.getObject({ id, options: { showBcs: true } });
    if (res.error) {
      throw new Error(`error fetching Root object at id ${id}: ${res.error.code}`);
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isRoot(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a Root object`);
    }

    return Root.fromSuiObjectData(res.data);
  }
}
