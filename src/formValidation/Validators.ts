import { TypeFile } from "./FormTypes";

/**
 * @name ValidationType
 * @enum {string}
 * @description Lista de tipos de validaciones predeterminadas de ValiValid
 * */
export enum ValidationType {

    /** Campo Obligatorio. */
    Required = 'Required',

    /** Longitud mínima permitida. */
    MinLength = 'MinLength',
    
    /** Longitud máxima permitida. */
    MaxLength = 'MaxLength',
    
    /** Solo dígitos permitidos. */
    DigitsOnly = 'DigitsOnly',

    /** Rango de números permitido. */
    NumberRange = 'NumberRange',

    /** Formato de email. */
    Email = 'Email',

    /** URL */
    Url = 'Url',

    /** Extensión de archivo */
    FileType = "FileType",

     /** tamaño de archivo */
    FileSize = 'FileSize'
}


/**
 * @type {ValidationConfigRequired}
 * @property {ValidationType.Required} type
 * @property {boolean} value
 * @property {string} message
*/
export type ValidationConfigRequired = {
    type: ValidationType.Required;
    value: boolean;
    message?: string;
};


/**
 * @type {ValidationConfigMinLength}
 * @property {ValidationType.MinLength} type
 * @property {boolean} value
 * @property {string} message
*/
export type ValidationConfigMinLength = {
    type: ValidationType.MinLength;
    value: number;
    message?: string;
};


/**
 * @type {ValidationConfigMaxLength}
 * @property {ValidationType.MaxLength} type
 * @property {boolean} value
 * @property {string} message
*/
export type ValidationConfigMaxLength = {
    type: ValidationType.MaxLength;
    value: number;
    message?: string;
};


/**
 * @type {ValidationConfigDigitsOnly}
 * @property {ValidationType.DigitsOnly} type
 * @property {boolean} value
 * @property {string} message
*/
export type ValidationConfigDigitsOnly = {
    type: ValidationType.DigitsOnly;
    value: boolean;
    message?: string;
};


/**
 * @type {ValidationConfigNumberRange}
 * @property {ValidationType.NumberRange} type
 * @property {boolean} value
 * @property {string} message
*/
export type ValidationConfigNumberRange = {
    type: ValidationType.NumberRange;
    value: [number, number];
    message?: string;
};


/**
 * @type {ValidationConfigEmail}
 * @property {ValidationType.Email} type
 * @property {boolean} value
 * @property {string} message
*/
export type ValidationConfigEmail = {
    type: ValidationType.Email;
    value: boolean;
    message?: string;
};


/**
 * @type {ValidationConfigUrl}
 * @property {ValidationType.Url} type
 * @property {boolean} value
 * @property {string} message
*/
export type ValidationConfigUrl = {
    type: ValidationType.Url;
    value: boolean;
    message?: string;
};


/**
 * @type {ValidationConfigFileType}
 * @property {ValidationType.FileType} type
 * @property {string[]} value
 * @property {string} message
*/
export type ValidationConfigFileType = {
    type: ValidationType.FileType;
    value: TypeFile[]; // Lista de tipos MIME permitidos
    message?: string;
};

/**
 * @type {ValidationConfigFileSize}
 * @property {ValidationType.FileSize} type
 * @property {number} value
 * @property {string} message
*/
export type ValidationConfigFileSize = {
    type: ValidationType.FileSize;
    value: number; // Tamaño máximo permitido en bytes
    message?: string;
};
