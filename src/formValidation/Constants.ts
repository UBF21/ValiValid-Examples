import { EnumType } from "typescript";
import { FieldValidationConfig, TypeFile, ValidationConfig } from "./FormTypes";

export const DEFAULT_ERROR_REQUIRED_MESSAGE = "Required field.";
export const DEFAULT_ERROR_DIGITS_ONLY_MESSAGE = "The field can only contain digits.";
export const DEFAULT_ERROR_EMAIL_MESSAGE = "Does not have email format.";
export const DEFAULT_ERROR_URL_MESSAGE = "Invalid url format.";
export const DEFAULT_FILE_SIZE_MESSAGE = 'The file size exceeds the allowed limit.';
export const DEFAULT_FILE_TYPE_MESSAGE = 'File type not allowed.';


export const defaultMinLengthMessage: (value: number) => string = (value: number) => `The field must have at least ${value} characters`;
export const defaultMaxLengthMessage: (value: number) => string = (value: number) => `The field cannot be more than ${value} characters.`;
export const defaultNumberRangeMessage: (min: number, max: number) => string = (min: number, max: number) => `The value must be between ${min} and ${max}.`;

//Expresion Regular Digits(Numbers)
export const EXPRESSION_REGULAR_ONLY_NUMBERS: RegExp = /[^\d]/g;
export const EXPRESSION_REGULAR_DECIMALS: RegExp = /^\d+(\.\d+)?$/;

export const expressionNumberRangeValidator: (value: number, min: number, max: number) => boolean = (value: number, min: number, max: number) => typeof value === 'number' && value >= min && value <= max;

//Expression Regular Strings
export const EXPRESSION_EMAIL: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const EXPRESSION_URL: RegExp = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

//File
export const expressionFileSizeValidator: (file: File, maxSize: number) => boolean = (file: File, maxSize: number) => file.size <= maxSize;
export const expressionFileTypeValidator = (file: File, allowedTypes: TypeFile[]): boolean => allowedTypes.toString().includes(file.type);

//General
export const expressionRequiredValidator: (value: any) => boolean = (value: any) => {
    if (typeof value === "string") {
        return value !== "";
    } else if (typeof value === "number") {
        return value !== 0;
    } else if (value instanceof File) {
        return value !== null && value !== undefined;
    }
    return false;
};

//String
export const expressionMinLengthValidator: (value: string, minLength: number) => boolean = (value: string, minLength: number) => typeof value === 'string' && value.length >= minLength;
export const expressionMaxLengthValidator: (value: string, maxLength: number) => boolean = (value: string, maxLength: number) => typeof value === 'string' && value.length <= maxLength;
export const expressionDigitsOnlyValidator: (value: string) => boolean = (value: string) => EXPRESSION_REGULAR_ONLY_NUMBERS.test(value);
export const expressionEmailValidator: (value: string) => boolean = (value: string) => EXPRESSION_EMAIL.test(value);
export const expressionUrlValidator: (value: string) => boolean = (value: string) => EXPRESSION_URL.test(value);

// INITIALIZERS
