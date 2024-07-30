import { DateFormat, TypeFile } from "./FormTypes";

/**
 * @name ValidationType
 * @enum { string }
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
    FileSize = 'FileSize',

    /** Dimensiones de archivo*/
    FileDimensions = 'FileDimensions',

    /** Patrón Personalizado */
    Pattern = "Pattern",

    /** Formato Fecha */
    DateFormat = "DateFormat",

    /** Números Positivos */
    NumberPositive = "NumberPositive",

    /**Números Negativos */
    NumberNegative = "NumberNegative"
}

/**
 * @type { ValidationConfigRequired }
 * @property { ValidationType.Required } type
 * @property { boolean } value
 * @property { string } message
*/
export type ValidationConfigRequired = {
    type: ValidationType.Required;
    message?: string;
};


/**
 * @type { ValidationConfigMinLength }
 * @property { ValidationType.MinLength } type
 * @property { boolean } value
 * @property { string } message
*/
export type ValidationConfigMinLength = {
    type: ValidationType.MinLength;
    value: number;
    message?: string;
};


/**
 * @type { ValidationConfigMaxLength }
 * @property { ValidationType.MaxLength } type
 * @property { boolean } value
 * @property { string } message
*/
export type ValidationConfigMaxLength = {
    type: ValidationType.MaxLength;
    value: number;
    message?: string;
};


/**
 * @type { ValidationConfigDigitsOnly }
 * @property { ValidationType.DigitsOnly } type
 * @property { boolean } value
 * @property { string } message
*/
export type ValidationConfigDigitsOnly = {
    type: ValidationType.DigitsOnly;
    value: boolean;
    message?: string;
};


/**
 * @type { ValidationConfigNumberRange }
 * @property { ValidationType.NumberRange } type
 * @property { boolean } value
 * @property { string } message
*/
export type ValidationConfigNumberRange = {
    type: ValidationType.NumberRange;
    value: [number, number];
    message?: string;
};


/**
 * @type { ValidationConfigEmail }
 * @property { ValidationType.Email } type
 * @property { boolean } value
 * @property { string } message
*/
export type ValidationConfigEmail = {
    type: ValidationType.Email;
    message?: string;
};


/**
 * @type { ValidationConfigUrl }
 * @property { ValidationType.Url } type
 * @property { boolean } value
 * @property { string } message
*/
export type ValidationConfigUrl = {
    type: ValidationType.Url;
    message?: string;
};


/**
 * @type { ValidationConfigFileType }
 * @property { ValidationType.FileType } type
 * @property { string[] } value
 * @property { string } message
*/
export type ValidationConfigFileType = {
    type: ValidationType.FileType;
    value: TypeFile[]; // Lista de tipos MIME permitidos
    message?: string;
};

/**
 * @type { ValidationConfigFileSize }
 * @property { ValidationType.FileSize } type
 * @property { number } value
 * @property { string } message
*/
export type ValidationConfigFileSize = {
    type: ValidationType.FileSize;
    value: number; // Tamaño máximo permitido en bytes
    message?: string;
};

/**
 * @type { ValidationConfigFileDimensions }
 * @property { ValidationType.FileDimensions } type
 * @property { width:number, height:number } value
 * @property { string } message
*/
export type ValidationConfigFileDimensions = {
    type: ValidationType.FileDimensions;
    value: { width: number; height: number }; // Dimensiones permitidas
    message?: string;
};

/**
 * @type { ValidationConfigPattern }
 * @property {ValidationType.Pattern } type
 * @property { ( value:any ) => boolean } value
 * @property { string } message
*/
export type ValidationConfigPattern = {
    type: ValidationType.Pattern;
    value: (values: any) => boolean; // validación personalizada
    message?: string;
};

/**
 * @type {ValidationConfigDateFormat}
 * @property {ValidationType.DateFormat} type
 * @property { DateFormat } format
 * @property {string} message
*/
export type ValidationConfigDateFormat = {
    type: ValidationType.DateFormat;
    format: DateFormat;
    message?: string;
};

/**
 * @type {ValidationConfigNumberPositive}
 * @property {ValidationType.NumberPositive} type
 * @property { value } number
 * @property {string} message
*/
export type ValidationConfigNumberPositive = {
    type: ValidationType.NumberPositive;
    message?: string;
};

/**
 * @type {ValidationConfigNumberNegative}
 * @property {ValidationType.NumberNegative} type
 * @property { value } number
 * @property {string} message
*/
export type ValidationConfigNumberNegative = {
    type: ValidationType.NumberNegative;
    message?: string;
};
