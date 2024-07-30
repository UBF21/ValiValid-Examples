import { ValidationConfigDateFormat, ValidationConfigDigitsOnly, ValidationConfigEmail, ValidationConfigFileDimensions, ValidationConfigFileSize, ValidationConfigFileType, ValidationConfigMaxLength, ValidationConfigMinLength, ValidationConfigNumberRange, ValidationConfigPattern, ValidationConfigRequired, ValidationConfigUrl,ValidationConfigNumberNegative,ValidationConfigNumberPositive, ValidationConfigAlpha, ValidationConfigAlphaNumeric } from "./Validators";

/**
 * @type 
 * @template T
 * @callback SetState
 * @param {T | ((prevState: T) => T)} value - El nuevo valor del estado o una función que recibe el estado anterior y devuelve el nuevo estado.
 * @returns {void}
 * @description Una función que actualiza el estado con un nuevo valor o una función que calcula el nuevo valor basado en el estado anterior.
 */
export type SetState<T> = (value: T | ((prevState: T) => T)) => void;


/**
 * 
 * @typedef {ValidationConfigRequired | ValidationConfigMinLength | ValidationConfigMaxLength | ValidationConfigDigitsOnly | ValidationConfigNumberRange | ValidationConfigEmail     | ValidationConfigUrl | ValidationConfigFileSize | ValidationConfigFileType | ValidationConfigFileDimensions | ValidationConfigPattern | ValidationConfigDateFormat   | ValidationConfigNumberPositive | ValidationConfigNumberNegative | ValidationConfigAlpha | ValidationConfigAlphaNumeric} ValidationConfig
 * @description Configuración de validación que puede ser de diferentes tipos.
 */
export type ValidationsConfig =
    | ValidationConfigRequired
    | ValidationConfigMinLength
    | ValidationConfigMaxLength
    | ValidationConfigDigitsOnly
    | ValidationConfigNumberRange
    | ValidationConfigEmail
    | ValidationConfigUrl
    | ValidationConfigFileSize
    | ValidationConfigFileType
    | ValidationConfigFileDimensions
    | ValidationConfigPattern
    | ValidationConfigDateFormat
    | ValidationConfigNumberPositive
    | ValidationConfigNumberNegative
    | ValidationConfigAlpha
    | ValidationConfigAlphaNumeric;

/**
 * @template T
 * @typedef {Object} FieldValidationConfig
 * @property {keyof T} field - El nombre del campo en el objeto `T` que se va a validar.
 * @property {ValidationsConfig[]} validations - Las configuraciones de validación que se aplican al campo.
 * @description Configuración de validación para un campo específico de un objeto `T`.
 */
export type FieldValidationConfig<T> = {
    field: keyof T;
    validations: ValidationsConfig[];
    isNumber?: boolean;
    isDecimal?: boolean;
};


/**
 * @template T
 * @typedef {Object} FieldValidationConfig
 * @property {FieldValidationConfig<T>[]} -Las configuraciones de las validaciones que se aplican a los campos.
 * @description Configuración de validaciones para loas campos específico de un objeto `T`.
 */
export type BuilderValidationConfig<T> = FieldValidationConfig<T>[];

/**
 * @template T
 * @typedef {Object} ValidationRule
 * @property {keyof T} field - El nombre del campo en el objeto `T` que se va a validar.
 * @property {string} message - El mensaje de error que se mostrará si la validación falla.
 * @property {(value: any) => boolean} validate - Función que valida el valor del campo y devuelve true si es válido, false si no lo es.
 * @description Regla de validación para un campo específico de un objeto `T`.
 */
export type ValidationRule<T> = {
    field: keyof T;
    message: string;
    validate: (value: any) => boolean;
};


/**
 * @template T
 * @typedef {Object.<keyof T, string | null>} FormErrors
 * @description Objeto que contiene errores de validación para cada campo de un formulario representado por un objeto `T`.
 */
export type FormErrors<T> = {
    [key in keyof T]?: string | null;
};

export enum TypeFile {
    JPG = 'image/jpeg',
    PNG = 'image/png',
    PDF = 'application/pdf',
    DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    XLSX = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    MP3 = 'audio/mpeg',
    MP4 = 'video/mp4'
}

export enum DateFormat {
    "YYYY-MM-DD" = 'YYYY-MM-DD',
    "DD-MM-YYYY" = 'DD-MM-YYYY',
    "YYYY/MM/DD" = 'YYYY/MM/DD',
    "DD/MM/YYYY" = 'DD/MM/YYYY',
}

export const DateFormatExpressions = {
    [DateFormat["YYYY-MM-DD"]]: /^\d{4}-\d{2}-\d{2}$/,
    [DateFormat["DD-MM-YYYY"]]: /^\d{2}-\d{2}-\d{4}$/,
    [DateFormat["YYYY/MM/DD"]]: /^\d{4}\/\d{2}\/\d{2}$/,
    [DateFormat["DD/MM/YYYY"]]: /^\d{2}\/\d{2}\/\d{4}$/,
};


export enum FileSize {
    "100KB" = 100 * 1024,
    "150KB" = 150 * 1024,
    "200KB" = 200 * 1024,
    "250KB" = 250 * 1024,
    "300KB" = 300 * 1024,
    "350KB" = 350 * 1024,
    "400KB" = 400 * 1024,
    "450KB" = 450 * 1024,
    "500KB" = 500 * 1024,
    "550KB" = 550 * 1024,
    "600KB" = 600 * 1024,
    "650KB" = 650 * 1024,
    "700KB" = 700 * 1024,
    "750KB" = 750 * 1024,
    "800KB" = 800 * 1024,
    "850KB" = 850 * 1024,
    "900KB" = 900 * 1024,
    "950KB" = 950 * 1024,
    "1MB" = 1 * 1024 * 1024,
    "2MB" = 2 * 1024 * 1024,
    "3MB" = 3 * 1024 * 1024,
    "4MB" = 4 * 1024 * 1024,
    "5MB" = 5 * 1024 * 1024,
    "6MB" = 6 * 1024 * 1024,
    "7MB" = 7 * 1024 * 1024,
    "8MB" = 8 * 1024 * 1024,
    "9MB" = 9 * 1024 * 1024,
    "10MB" = 10 * 1024 * 1024,
    "15MB" = 15 * 1024 * 1024,
    "20MB" = 20 * 1024 * 1024,
    "25MB" = 25 * 1024 * 1024,
    "30MB" = 30 * 1024 * 1024,
    "35MB" = 35 * 1024 * 1024,
    "40MB" = 40 * 1024 * 1024,
    "45MB" = 45 * 1024 * 1024,
    "50MB" = 50 * 1024 * 1024,
    "100MB" = 100 * 1024 * 1024,
    "150MB" = 150 * 1024 * 1024,
    "200MB" = 200 * 1024 * 1024,
    "250MB" = 250 * 1024 * 1024,
    "300MB" = 300 * 1024 * 1024,
    "350MB" = 350 * 1024 * 1024,
    "400MB" = 400 * 1024 * 1024,
    "450MB" = 450 * 1024 * 1024,
    "500MB" = 500 * 1024 * 1024,
    "550MB" = 550 * 1024 * 1024,
    "600MB" = 600 * 1024 * 1024,
    "650MB" = 650 * 1024 * 1024,
    "700MB" = 700 * 1024 * 1024,
    "750MB" = 750 * 1024 * 1024,
    "800MB" = 800 * 1024 * 1024,
    "850MB" = 850 * 1024 * 1024,
    "900MB" = 900 * 1024 * 1024,
    "950MB" = 950 * 1024 * 1024,
    "1000MB" = 1000 * 1024 * 1024
}



