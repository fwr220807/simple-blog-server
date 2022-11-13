import { ValidationOptions } from 'class-validator';
export declare function IsExitsRule(table: string, validationOptions?: ValidationOptions): (object: Record<string, any>, propertyName: string) => void;
