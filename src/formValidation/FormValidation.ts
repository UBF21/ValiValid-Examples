import { log } from "console";
import { DEFAULT_ERROR_DIGITS_ONLY_MESSAGE, defaultErrorMaxLengthMessage, defaultErrorMinLengthMessage, defaultErrorNumberRangeMessage, DEFAULT_ERROR_REQUIRED_MESSAGE, expressionDigitsOnlyValidator, expressionMaxLengthValidator, expressionMinLengthValidator, expressionNumberRangeValidator, expressionRequiredValidator, EXPRESSION_REGULAR_ONLY_NUMBERS, EXPRESSION_REGULAR_DECIMALS, DEFAULT_ERROR_EMAIL_MESSAGE, expressionEmailValidator, DEFAULT_ERROR_URL_MESSAGE, expressionUrlValidator, DEFAULT_ERROR_FILE_SIZE_MESSAGE, expressionFileSizeValidator, DEFAULT_ERROR_FILE_TYPE_MESSAGE, expressionFileTypeValidator, DEFAULT_ERROR_FILE_DIMENSIONS_MESSAGE, expressionImageDimensionsValidator, defaultErrorFileDimensionsMessage, DEFAULT_ERROR_PATTERN_MESSAGE, DEFAULT_ERROR_FORMAT_DATE_MESSAGE, expressionDateFormatValidator, defaultErrorFormatDateMessage, DEFAULT_ERROR_NUMBER_POSITIVE, expressionNumberPositive, DEFAULT_ERROR_NUMBER_NEGATIVE, expressionNumberNegative } from "./Constants";
import { BuilderValidationConfig, FieldValidationConfig, FormErrors, SetState, ValidationsConfig, ValidationRule } from "./FormTypes";
import { ValidationType } from "./Validators";
import { promises } from "dns";
import { format } from "path";

export class FormManager<T> {
    private _rules: Map<keyof T, ValidationRule<T>[]> = new Map();

    private _AllfieldValidationConfig: FieldValidationConfig<T>[] = [];

    private _isFormValid: (isValid: boolean) => void;

    constructor(setFormValid: (isValid: boolean) => void, builderValidations: BuilderValidationConfig<T> = []) {
        this._isFormValid = setFormValid;
        builderValidations.map((fieldValidation: FieldValidationConfig<T>) => this.addValidation(fieldValidation));
    }

    addRule(field: keyof T, message: string, validate: (value: any) => boolean) {
        if (!this._rules.has(field)) {
            this._rules.set(field, []);
        }
        this._rules.get(field)!.push({ field, message, validate });
    }

    addValidation(fieldValidationConfig: FieldValidationConfig<T>): this {

        this._AllfieldValidationConfig.push(fieldValidationConfig);

        const { field, validations, isNumber = false, isDecimal = false } = fieldValidationConfig;

        validations.forEach((validationConfig: ValidationsConfig) => {
            switch (validationConfig.type) {
                case ValidationType.Required:
                    this.addRule(
                        field,
                        validationConfig.message || DEFAULT_ERROR_REQUIRED_MESSAGE,
                        (value: any) => expressionRequiredValidator(value)
                    );
                    break;
                case ValidationType.MinLength:
                    this.addRule(
                        field,
                        validationConfig.message || defaultErrorMinLengthMessage(validationConfig.value),
                        (value: string) => expressionMinLengthValidator(value, validationConfig.value)
                    );
                    break;
                case ValidationType.MaxLength:
                    this.addRule(
                        field,
                        validationConfig.message || defaultErrorMaxLengthMessage(validationConfig.value),
                        (value: string) => expressionMaxLengthValidator(value, validationConfig.value)
                    )
                    break;
                case ValidationType.DigitsOnly:
                    this.addRule(
                        field,
                        validationConfig.message || DEFAULT_ERROR_DIGITS_ONLY_MESSAGE,
                        (value: string) => expressionDigitsOnlyValidator(value)
                    )
                    break;
                case ValidationType.NumberRange:
                    const [min, max] = validationConfig.value;
                    this.addRule(
                        field,
                        validationConfig.message || defaultErrorNumberRangeMessage(min, max),
                        (value: number) => expressionNumberRangeValidator(value, min, max)
                    );
                    break;
                case ValidationType.Email:
                    this.addRule(
                        field,
                        validationConfig.message || DEFAULT_ERROR_EMAIL_MESSAGE,
                        (value: string) => expressionEmailValidator(value)
                    );
                    break;
                case ValidationType.Url:
                    this.addRule(
                        field,
                        validationConfig.message || DEFAULT_ERROR_URL_MESSAGE,
                        (value: string) => expressionUrlValidator(value)
                    )
                    break;
                case ValidationType.FileSize:
                    this.addRule(
                        field,
                        validationConfig.message || DEFAULT_ERROR_FILE_SIZE_MESSAGE,
                        (file: File) => expressionFileSizeValidator(file, validationConfig.value)
                    )
                    break;
                case ValidationType.FileType:
                    this.addRule(
                        field,
                        validationConfig.message || DEFAULT_ERROR_FILE_TYPE_MESSAGE,
                        (file: File) => expressionFileTypeValidator(file, validationConfig.value)
                    )
                    break;
                case ValidationType.FileDimensions:
                    const { width, height } = validationConfig.value;
                    this.addRule(
                        field,
                        validationConfig.message || defaultErrorFileDimensionsMessage(width, height),
                        (file: File) => expressionImageDimensionsValidator(file, { width, height })
                    )
                    break;
                case ValidationType.Pattern:
                    this.addRule(
                        field,
                        validationConfig.message || DEFAULT_ERROR_PATTERN_MESSAGE,
                        validationConfig.value
                    )
                    break;
                case ValidationType.DateFormat:
                    this.addRule(
                        field,
                        validationConfig.message || defaultErrorFormatDateMessage(validationConfig.format),
                        (value: string) => expressionDateFormatValidator(value, validationConfig.format)
                    )
                    break;
                case ValidationType.NumberPositive:
                    this.addRule(
                        field,
                        validationConfig.message || DEFAULT_ERROR_NUMBER_POSITIVE,
                        (value: number) => expressionNumberPositive(value)
                    )
                    break;
                case ValidationType.NumberNegative:
                    this.addRule(
                        field,
                        validationConfig.message || DEFAULT_ERROR_NUMBER_NEGATIVE,
                        (value: number) => expressionNumberNegative(value)
                    )
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

    handleChange(
        name: keyof T,
        value: any,
        setForm: SetState<T>,
        setErrors: SetState<FormErrors<T>>
    ): void {

        const fieldValidation: FieldValidationConfig<T> = this._AllfieldValidationConfig.find(item => item.field === name)!;
        const { field, validations, isNumber, isDecimal } = fieldValidation;

        if ('isNumber' in fieldValidation && isNumber && value === '0') {
            value = '';
        }
        else if ('isNumber' in fieldValidation && isNumber && isDecimal) {
            console.log("Hola Decimal");
            value = Number(value);
        }
        else if ('isNumber' in fieldValidation && isNumber) {
            value = Number(value.toString().replace(EXPRESSION_REGULAR_ONLY_NUMBERS, ''));
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