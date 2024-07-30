import { isEnumMember } from "typescript";
import { DateFormat, DateFormatExpressions, FieldValidationConfig, FileSize, TypeFile, ValidationsConfig } from "./FormTypes";

//Message Error

export const DEFAULT_ERROR_PATTERN_MESSAGE:string = "Does not comply with the patternRequired field.";
export const DEFAULT_ERROR_REQUIRED_MESSAGE:string = "Required field.";
export const DEFAULT_ERROR_DIGITS_ONLY_MESSAGE:string = "The field can only contain digits.";
export const DEFAULT_ERROR_EMAIL_MESSAGE:string = "Does not have email format.";
export const DEFAULT_ERROR_URL_MESSAGE:string = "Invalid url format.";
export const DEFAULT_ERROR_FILE_TYPE_MESSAGE:string = 'File type not allowed.';
export const DEFAULT_ERROR_FILE_SIZE_MESSAGE:string = 'The file size exceeds the allowed limit.';
export const DEFAULT_ERROR_FILE_DIMENSIONS_MESSAGE:string = 'The file dimensions are not allowed';
export const DEFAULT_ERROR_FORMAT_DATE_MESSAGE:string = 'The date format is invalid';
export const DEFAULT_ERROR_NUMBER_POSITIVE:string = 'Only positive numbers are allowed.'; 
export const DEFAULT_ERROR_NUMBER_NEGATIVE:string = 'Only negative numbers are allowed.'; 


export const defaultErrorMinLengthMessage: (value: number) => string = (value: number) => `The field must have at least ${value} characters`;
export const defaultErrorMaxLengthMessage: (value: number) => string = (value: number) => `The field cannot be more than ${value} characters.`;
export const defaultErrorNumberRangeMessage: (min: number, max: number) => string = (min: number, max: number) => `The value must be between ${min} and ${max}.`;
export const defaultErrorFileDimensionsMessage: (width: number, height: number) => string = (width: number, height: number) => `${DEFAULT_ERROR_FILE_DIMENSIONS_MESSAGE} (${width}x${height}).`;
export const defaultErrorFormatDateMessage: (format: DateFormat) => string = (format: DateFormat) => `${DEFAULT_ERROR_FORMAT_DATE_MESSAGE}.  the format is (${format}).`;

//Expresion Regular Digits(Numbers)
export const EXPRESSION_REGULAR_ONLY_NUMBERS: RegExp = /[^\d]/g;
export const EXPRESSION_REGULAR_DECIMALS: RegExp = /^\d+(\.\d+)?$/;

export const expressionNumberRangeValidator: (value: number, min: number, max: number) => boolean = (value: number, min: number, max: number) => typeof value === 'number' && value >= min && value <= max;
export const expressionNumberPositive:(value:number) => boolean = (value:number) => value > 0;
export const expressionNumberNegative:(value:number) => boolean = (value:number) => value < 0;

//Expression Regular Strings
export const EXPRESSION_EMAIL: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const EXPRESSION_URL: RegExp = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

//File
export const expressionFileSizeValidator: (file: File, maxSize: number) => boolean = (file: File, maxSize: number) => file.size <= maxSize;
export const expressionFileTypeValidator = (file: File, allowedTypes: TypeFile[]): boolean => allowedTypes.toString().includes(file.type);
export const expressionImageDimensionsValidator: (file: File, dimensions: { width: number; height: number }) => boolean = (file: File, dimensions: { width: number; height: number }) => {
    let result: boolean = false;

    expressionImageDimensionsValidatorAsync(file, dimensions)
        .then((result) => result = result)
        .catch((error) => console.error(error));

    return result;
}

//Expressions Asyncs
const expressionImageDimensionsValidatorAsync = async (file: File, dimensions: { width: number; height: number }): Promise<boolean> => {
    try {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        await img.decode();
        return img.width === dimensions.width && img.height === dimensions.height;
    } catch (error) {
        console.error(error);
        return false;
    }
};

//General
export const expressionRequiredValidator: (value: any) => boolean = (value: any) => {
    if (typeof value === "string") {
        return value !== "";
    } else if (typeof value === "number") {
        return value !== 0;
    } else if (value instanceof File) {
        return value !== null && value !== undefined;
    }else if( value instanceof Date) {
        return value !== null;
    }
    return false;
};

//String
export const expressionMinLengthValidator: (value: string, minLength: number) => boolean = (value: string, minLength: number) => typeof value === 'string' && value.length >= minLength;
export const expressionMaxLengthValidator: (value: string, maxLength: number) => boolean = (value: string, maxLength: number) => typeof value === 'string' && value.length <= maxLength;
export const expressionDigitsOnlyValidator: (value: string) => boolean = (value: string) => EXPRESSION_REGULAR_ONLY_NUMBERS.test(value);
export const expressionEmailValidator: (value: string) => boolean = (value: string) => EXPRESSION_EMAIL.test(value);
export const expressionUrlValidator: (value: string) => boolean = (value: string) => EXPRESSION_URL.test(value);


//Dates
export const expressionDateFormatValidator: (value: string, format: DateFormat) => boolean = (value: string, format: DateFormat) => DateFormatExpressions[format].test(value.toString());
    


// INITIALIZERS
