import { DocumentGroupType } from "./Document";
import { Status } from "./Status";

export enum PropertyType {
  text = "text",
  number = "number",
  options = "options",
  dateTime = "dateTime",
  status = "status",
  reference = "reference",
}

interface BaseProperty {
  name: string;
  isHidden: boolean;
  readonly: boolean;
  required?: boolean;
}

interface TextProperty extends BaseProperty {
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

export interface OptionsProperty extends BaseProperty {
  type: PropertyType.options;
  value: string;
  options: string[];
}

interface StatusProperty extends BaseProperty {
  type: PropertyType.status;
  value: Status;
}

interface DocumentReferenceProperty extends BaseProperty {
  type: PropertyType.reference;
  referenceGroup: DocumentGroupType;
  referenceIndex: string;
}

export type Property =
  | TextProperty
  | NumberProperty
  | DateTimeProperty
  | OptionsProperty
  | StatusProperty
  | DocumentReferenceProperty;
