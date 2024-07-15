import { DEFAULT_DIGITS_ONLY_MESSAGE, defaultMaxLengthMessage, defaultMinLengthMessage, defaultNumberRangeMessage, DEFAULT_REQUIRED_MESSAGE, expressionDigitsOnlyValidator, expressionMaxLengthValidator, expressionMinLengthValidator, expressionNumberRangeValidator, expressionRequiredValidator, EXPRESSION_REGULAR_ONLY_NUMBERS, EXPRESSION_REGULAR_DECIMALS } from "./Constants";
import { FieldValidationConfig, FormErrors, SetState, ValidationConfig, ValidationRule } from "./FormTypes";
import { ValidationType } from "./Validators";

export class FormManager<T> {
    private _rules: Map<keyof T, ValidationRule<T>[]> = new Map();  
    //private _rules: ValidationRule<T>[] = [];

    //
    private _AllfieldValidationConfig: FieldValidationConfig<T>[] = [];
    //

    private _isFormValid: (isValid: boolean) => void;

    constructor(setFormValid: (isValid: boolean) => void) {
        this._isFormValid = setFormValid;
    }

    addRule(field: keyof T, message: string, validate: (value: any) => boolean) {
        //this._rules.push({ field, message, validate });
        if (!this._rules.has(field)) {
            this._rules.set(field, []);
        }
        this._rules.get(field)!.push({ field, message, validate });
    }

    addValidation(fieldValidationConfig: FieldValidationConfig<T>): this {

        //
        this._AllfieldValidationConfig.push(fieldValidationConfig);
        //

        const { field, validations } = fieldValidationConfig;

        validations.forEach((validationConfig: ValidationConfig) => {
            switch (validationConfig.type) {
                case ValidationType.Required:
                    this.addRule(
                        field,
                        validationConfig.message || DEFAULT_REQUIRED_MESSAGE,
                        (value: string) => expressionRequiredValidator(value)
                    );
                    break;
                case ValidationType.MinLength:
                    this.addRule(
                        field,
                        validationConfig.message || defaultMinLengthMessage(validationConfig.value),
                        (value: string) => expressionMinLengthValidator(value, validationConfig.value)
                    );
                    break;
                case ValidationType.MaxLength:
                    this.addRule(
                        field,
                        validationConfig.message || defaultMaxLengthMessage(validationConfig.value),
                        (value: string) => expressionMaxLengthValidator(value, validationConfig.value)
                    )
                    break;
                case ValidationType.DigitsOnly:
                    this.addRule(
                        field,
                        validationConfig.message || DEFAULT_DIGITS_ONLY_MESSAGE,
                        (value: string) => expressionDigitsOnlyValidator(value)
                    )
                    break;
                case ValidationType.NumberRange:
                    const [min, max] = validationConfig.value;
                    this.addRule(
                        field,
                        validationConfig.message || defaultNumberRangeMessage(min, max),
                        (value: number) => expressionNumberRangeValidator(value, min, max)
                    );
                    break;
                default:
                    throw new Error(`Unsupported validation type.`);
            }
        });

        return this;
    }

    validate(data: T): FormErrors<T> {
        const errors: FormErrors<T> = {};

        this._rules.forEach((rules, field) => {
            for (const rule of rules) {
                if (!rule.validate(data[field])) {
                    errors[field] = rule.message;
                    break;
                }
            }
        });

        const isFormValid = Object.values(errors).every(error => error === null);
        this._isFormValid(isFormValid);

        return errors;
    }

    validateField(field: keyof T, value: any): string | null {

        const rules = this._rules.get(field) || [];
        for (const rule of rules) {
            if (rule && !rule.validate(value)) {
                return rule.message;
            }
        }
        return null;
    }

    // private validateValue(name: keyof T, value: any): any {
    //     let response: any;
    //     const fieldValidation: FieldValidationConfig<T> = this._AllfieldValidationConfig.find(item => item.field === name)!;
    //     if ('isDecimal' in fieldValidation && fieldValidation.isNumber && fieldValidation.isDecimal) {

    //         let cleanedValue = value.replace(/[^0-9.]/g, '');
    //         const parts = cleanedValue.split('.');

    //         if (parts.length > 2) cleanedValue = parts.shift() + '.' + parts.join('');
            
    //         response = cleanedValue; // Mantener como cadena
    //     }
    //     else if ('isNumber' in fieldValidation && fieldValidation.isNumber) {
    //         response = +(value.replace(EXPRESSION_REGULAR_ONLY_NUMBERS, ''));
    //         console.log("aqui");
    //     } else {
    //         response = value;
    //     }
    //     return response;
    // }


    handleChange(
        name: keyof T,
        value: any,
        setForm: SetState<T>,
        setErrors: SetState<FormErrors<T>>
    ): void {

            const fieldValidation: FieldValidationConfig<T> = this._AllfieldValidationConfig.find(item => item.field === name)!;

        if('isNumber' in fieldValidation && fieldValidation.isNumber){
            value = Number(value);
        }

        setForm((prevForm) => ({ ...prevForm, [name]: value }));
        const fieldError = this.validateField(name, value);

        setErrors((prevErrors: FormErrors<T>) => {
            const errors = { ...prevErrors, [name]: fieldError };
            const totalFields = Object.keys(errors).length;
            const validFields = Object.values(errors).filter(error => error === null).length;
            this._isFormValid(totalFields === validFields);
            return errors;
        });
    }

}