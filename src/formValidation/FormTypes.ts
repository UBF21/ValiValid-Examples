import { ValidationConfigDigitsOnly, ValidationConfigMaxLength, ValidationConfigMinLength, ValidationConfigNumberRange, ValidationConfigRequired } from "./Validators";

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
 * @typedef {ValidationConfigRequired | ValidationConfigMinLength | ValidationConfigMaxLength | ValidationConfigDigitsOnly | ValidationConfigNumberRange} ValidationConfig
 * @description Configuración de validación que puede ser de diferentes tipos.
 */
export type ValidationConfig =
    | ValidationConfigRequired
    | ValidationConfigMinLength
    | ValidationConfigMaxLength
    | ValidationConfigDigitsOnly
    | ValidationConfigNumberRange;


/**
 * @template T
 * @typedef {Object} FieldValidationConfig
 * @property {keyof T} field - El nombre del campo en el objeto `T` que se va a validar.
 * @property {ValidationConfig[]} validations - Las configuraciones de validación que se aplican al campo.
 * @description Configuración de validación para un campo específico de un objeto `T`.
 */    
export type FieldValidationConfig<T> = {
    field: keyof T;
    validations: ValidationConfig[];
    isNumber?:boolean;
};  


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




