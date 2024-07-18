import { FieldValidationConfig, ValidationConfig } from "./FormTypes";

export const DEFAULT_ERROR_REQUIRED_MESSAGE = "Required field.";
export const DEFAULT_ERROR_DIGITS_ONLY_MESSAGE = "The field can only contain digits.";
export const DEFAULT_ERROR_EMAIL_MESSAGE = "Does not have email format.";
export const DEFAULT_ERROR_URL_MESSAGE = "Invalid url format.";

export const defaultMinLengthMessage: (value: number) => string = (value: number) => `The field must have at least ${value} characters`;
export const defaultMaxLengthMessage: (value: number) => string = (value: number) => `The field cannot be more than ${value} characters.`;
export const defaultNumberRangeMessage: (min: number, max: number) => string = (min: number, max: number) => `The value must be between ${min} and ${max}.`;

//Expresion Digits(Numbers)
export const EXPRESSION_REGULAR_ONLY_NUMBERS: RegExp = /[^\d]/g;
export const EXPRESSION_REGULAR_DECIMALS: RegExp = /^\d+(\.\d+)?$/;

export const expressionNumberRangeValidator: (value: number, min: number, max: number) => boolean = (value: number, min: number, max: number) => typeof value === 'number' && value >= min && value <= max;

//Expression Strings
export const EXPRESSION_EMAIL: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const EXPRESSION_URL: RegExp = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;


//General
export const expressionRequiredValidator: (value: any) => boolean = (value: any) => typeof value === "string" ? value !== "" : value !== 0;

//String
export const expressionMinLengthValidator: (value: string, minLength: number) => boolean = (value: string, minLength: number) => typeof value === 'string' && value.length >= minLength;
export const expressionMaxLengthValidator: (value: string, maxLength: number) => boolean = (value: string, maxLength: number) => typeof value === 'string' && value.length <= maxLength;
export const expressionDigitsOnlyValidator: (value: string) => boolean = (value: string) => EXPRESSION_REGULAR_ONLY_NUMBERS.test(value);
export const expressionEmailValidator: (value: string) => boolean = (value: string) => EXPRESSION_EMAIL.test(value);
export const expressionUrlValidator: (value: string) => boolean = (value: string) => EXPRESSION_URL.test(value);

// INITIALIZERS
