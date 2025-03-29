import * as reified from '../../_framework/reified';
import { Option } from '../../_dependencies/onchain/0x1/option/structs';
import { String } from '../../_dependencies/onchain/0x1/string/structs';
import { ID, UID } from '../../_dependencies/onchain/0x2/object/structs';
import { Url } from '../../_dependencies/onchain/0x2/url/structs';
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
import { fromB64, fromHEX, toHEX } from '@mysten/sui/utils';

/* ============================== Project =============================== */

export function isProject(type: string): boolean {
  type = compressSuiType(type);
  return type === `${PKG_V1}::project::Project`;
}

export interface ProjectFields {
  id: ToField<UID>;
  title: ToField<String>;
  description: ToField<String>;
  hackathonId: ToField<ID>;
  logo: ToField<Option<Url>>;
  links: ToField<Vector<Url>>;
  tags: ToField<Vector<String>>;
  owner: ToField<'address'>;
  createdAt: ToField<'u64'>;
}

export type ProjectReified = Reified<Project, ProjectFields>;

export class Project implements StructClass {
  __StructClass = true as const;

  static readonly $typeName = `${PKG_V1}::project::Project`;
  static readonly $numTypeParams = 0;
  static readonly $isPhantom = [] as const;

  readonly $typeName = Project.$typeName;
  readonly $fullTypeName: `${typeof PKG_V1}::project::Project`;
  readonly $typeArgs: [];
  readonly $isPhantom = Project.$isPhantom;

  readonly id: ToField<UID>;
  readonly title: ToField<String>;
  readonly description: ToField<String>;
  readonly hackathonId: ToField<ID>;
  readonly logo: ToField<Option<Url>>;
  readonly links: ToField<Vector<Url>>;
  readonly tags: ToField<Vector<String>>;
  readonly owner: ToField<'address'>;
  readonly createdAt: ToField<'u64'>;

  private constructor(typeArgs: [], fields: ProjectFields) {
    this.$fullTypeName = composeSuiType(
      Project.$typeName,
      ...typeArgs,
    ) as `${typeof PKG_V1}::project::Project`;
    this.$typeArgs = typeArgs;

    this.id = fields.id;
    this.title = fields.title;
    this.description = fields.description;
    this.hackathonId = fields.hackathonId;
    this.logo = fields.logo;
    this.links = fields.links;
    this.tags = fields.tags;
    this.owner = fields.owner;
    this.createdAt = fields.createdAt;
  }

  static reified(): ProjectReified {
    return {
      typeName: Project.$typeName,
      fullTypeName: composeSuiType(
        Project.$typeName,
        ...[],
      ) as `${typeof PKG_V1}::project::Project`,
      typeArgs: [] as [],
      isPhantom: Project.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Project.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Project.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Project.fromBcs(data),
      bcs: Project.bcs,
      fromJSONField: (field: any) => Project.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Project.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => Project.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Project.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => Project.fetch(client, id),
      new: (fields: ProjectFields) => {
        return new Project([], fields);
      },
      kind: 'StructClassReified',
    };
  }

  static get r() {
    return Project.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<Project>> {
    return phantom(Project.reified());
  }
  static get p() {
    return Project.phantom();
  }

  static get bcs() {
    return bcs.struct('Project', {
      id: UID.bcs,
      title: String.bcs,
      description: String.bcs,
      hackathon_id: ID.bcs,
      logo: Option.bcs(Url.bcs),
      links: bcs.vector(Url.bcs),
      tags: bcs.vector(String.bcs),
      owner: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      created_at: bcs.u64(),
    });
  }

  static fromFields(fields: Record<string, any>): Project {
    return Project.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      title: decodeFromFields(String.reified(), fields.title),
      description: decodeFromFields(String.reified(), fields.description),
      hackathonId: decodeFromFields(ID.reified(), fields.hackathon_id),
      logo: decodeFromFields(Option.reified(Url.reified()), fields.logo),
      links: decodeFromFields(reified.vector(Url.reified()), fields.links),
      tags: decodeFromFields(reified.vector(String.reified()), fields.tags),
      owner: decodeFromFields('address', fields.owner),
      createdAt: decodeFromFields('u64', fields.created_at),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Project {
    if (!isProject(item.type)) {
      throw new Error('not a Project type');
    }

    return Project.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      title: decodeFromFieldsWithTypes(String.reified(), item.fields.title),
      description: decodeFromFieldsWithTypes(String.reified(), item.fields.description),
      hackathonId: decodeFromFieldsWithTypes(ID.reified(), item.fields.hackathon_id),
      logo: decodeFromFieldsWithTypes(Option.reified(Url.reified()), item.fields.logo),
      links: decodeFromFieldsWithTypes(reified.vector(Url.reified()), item.fields.links),
      tags: decodeFromFieldsWithTypes(reified.vector(String.reified()), item.fields.tags),
      owner: decodeFromFieldsWithTypes('address', item.fields.owner),
      createdAt: decodeFromFieldsWithTypes('u64', item.fields.created_at),
    });
  }

  static fromBcs(data: Uint8Array): Project {
    return Project.fromFields(Project.bcs.parse(data));
  }

  toJSONField() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      hackathonId: this.hackathonId,
      logo: fieldToJSON<Option<Url>>(`${Option.$typeName}<${Url.$typeName}>`, this.logo),
      links: fieldToJSON<Vector<Url>>(`vector<${Url.$typeName}>`, this.links),
      tags: fieldToJSON<Vector<String>>(`vector<${String.$typeName}>`, this.tags),
      owner: this.owner,
      createdAt: this.createdAt.toString(),
    };
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
  }

  static fromJSONField(field: any): Project {
    return Project.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      title: decodeFromJSONField(String.reified(), field.title),
      description: decodeFromJSONField(String.reified(), field.description),
      hackathonId: decodeFromJSONField(ID.reified(), field.hackathonId),
      logo: decodeFromJSONField(Option.reified(Url.reified()), field.logo),
      links: decodeFromJSONField(reified.vector(Url.reified()), field.links),
      tags: decodeFromJSONField(reified.vector(String.reified()), field.tags),
      owner: decodeFromJSONField('address', field.owner),
      createdAt: decodeFromJSONField('u64', field.createdAt),
    });
  }

  static fromJSON(json: Record<string, any>): Project {
    if (json.$typeName !== Project.$typeName) {
      throw new Error('not a WithTwoGenerics json object');
    }

    return Project.fromJSONField(json);
  }

  static fromSuiParsedData(content: SuiParsedData): Project {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object');
    }
    if (!isProject(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Project object`);
    }
    return Project.fromFieldsWithTypes(content);
  }

  static fromSuiObjectData(data: SuiObjectData): Project {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isProject(data.bcs.type)) {
        throw new Error(`object at is not a Project object`);
      }

      return Project.fromBcs(fromB64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return Project.fromSuiParsedData(data.content);
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    );
  }

  static async fetch(client: SuiClient, id: string): Promise<Project> {
    const res = await client.getObject({ id, options: { showBcs: true } });
    if (res.error) {
      throw new Error(`error fetching Project object at id ${id}: ${res.error.code}`);
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isProject(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a Project object`);
    }

    return Project.fromSuiObjectData(res.data);
  }
}
