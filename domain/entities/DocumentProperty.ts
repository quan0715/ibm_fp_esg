import { DocumentGroupType } from "./Document";
import { Status } from "./Status";

export enum PropertyType {
  text = "text",
  number = "number",
  options = "options",
  dateTime = "dateTime",
  status = "status",
  reference = "reference",
  boolean = "boolean",
}

interface BaseProperty {
  name: string;
  isHidden?: boolean;
  readonly?: boolean;
  required?: boolean;
}
export interface TitleProperty extends BaseProperty {
  value: string;
  type: PropertyType.text;
}
export interface TextProperty extends BaseProperty {
  name: "標題";
  type: PropertyType.text;
  value: string;
}

interface DateTimeProperty extends BaseProperty {
  type: PropertyType.dateTime;
  value: Date;
}

interface NumberProperty extends BaseProperty {
  type: PropertyType.number;
  value: number;
}

interface BooleanProperty extends BaseProperty {
  type: PropertyType.boolean;
  value: boolean;
}

export interface OptionsProperty extends BaseProperty {
  type: PropertyType.options;
  value: string;
  options: string[];
}

interface StatusProperty extends BaseProperty {
  type: PropertyType.status;
  value: Status;
}

export interface DocumentReferenceProperty extends BaseProperty {
  type: PropertyType.reference;
  referenceGroup: DocumentGroupType;
  limit?: true;
  value: string[];
}

export type Property =
  | TitleProperty
  | TextProperty
  | NumberProperty
  | DateTimeProperty
  | OptionsProperty
  | StatusProperty
  | DocumentReferenceProperty
  | BooleanProperty;
