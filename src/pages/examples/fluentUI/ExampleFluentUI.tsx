import { Button, Field, Input } from '@fluentui/react-components';
import { useContext, useEffect, useRef, useState } from 'react';
import { Person } from '../../../interfaces/Person';
import { ValidationType } from '../../../formValidation/Validators';
import { FormErrors } from '../../../formValidation/FormTypes';
import { FormManager } from '../../../formValidation/FormValidation';

const ExampleFluentUI = () => {

    const [formPerson, setFormPerson] = useState<Person>({ name: "", lastName: "", yearsOld: 0, sex: "", skills: "", email: "", urlLinkedin: "" });
    const [formErrors, setFormErrors] = useState<FormErrors<Person>>({});
    const [isFormValid, setIsFormValid] = useState<boolean>(false);

    const formManager = new FormManager<Person>(setIsFormValid);
    formManager
        .addValidation({
            field: "name",
            validations: [
                {
                    type: ValidationType.Required,
                    value: true
                }
            ]
        })
        .addValidation({
            field: "lastName",
            validations: [
                {
                    type: ValidationType.Required,
                    value: true
                }
            ]
        })
        .addValidation({
            field: "yearsOld",
            validations: [
                {
                    type: ValidationType.Required,
                    value: true
                }
            ],
            isNumber: true,
        })
        .addValidation({
            field: "sex",
            validations: [
                {
                    type: ValidationType.Required,
                    value: true
                }
            ]
        })
        .addValidation({
            field: 'email',
            validations: [
                {
                    type: ValidationType.Required,
                    value: true
                },
                {
                    type: ValidationType.Email,
                    value: true
                }
            ]
        })
        .addValidation({
            field: 'urlLinkedin',
            validations: [
                {
                    type: ValidationType.Required,
                    value: true
                },
                {
                    type: ValidationType.Url,
                    value: true
                }
            ]
        });

    useEffect(() => {
        const errors = formManager.validate(formPerson);
        setFormErrors(errors);
    }, [formPerson])

    const handleChange = (field: keyof Person, value: any): void => {
        formManager.handleChange(field, value, setFormPerson, setFormErrors);
    }

    const onSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        const initial: Person = { name: "", lastName: "", yearsOld: 0, sex: "", skills: "", email: "", urlLinkedin: "" };

        const errors = formManager.validate(formPerson);
        setFormErrors(errors);

        if (isFormValid) {
            console.log('Form submitted:', formPerson);
            setFormPerson(initial);
        }

    }

    return (
        <div className='container mt-4'>
            <form onSubmit={onSubmit}>
                <div className='row'>
                    <div className='col-md-4'>
                        <pre style={{ fontWeight: 'bold',width:'100%',height:'70vh' }}>{JSON.stringify(formPerson, null, 2)}</pre>
                    </div>

                    <div className='col-md-8'>
                        <div className='row g-3'>
                            <div className="col-12">
                                <Field
                                    label="Name"
                                    validationState={!formErrors ? "none" : formErrors.name ? "error" : "success"}
                                    validationMessage={!formErrors ? "none" : formErrors.name ? formErrors.name : "Correcto."}
                                >
                                    <Input
                                        size='large'
                                        value={formPerson.name}
                                        onChange={(e) => { handleChange("name", e.target.value) }}
                                    />
                                </Field>
                            </div>
                            <div className="col-md-6">
                                <Field
                                    label="LastName"
                                    validationState={!formErrors ? "none" : formErrors.lastName ? "error" : "success"}
                                    validationMessage={!formErrors ? "none" : formErrors.lastName ? formErrors.lastName : "Correcto."}
                                >
                                    <Input
                                        size='large'
                                        value={formPerson.lastName}
                                        onChange={(e) => { handleChange("lastName", e.target.value) }}
                                    />
                                </Field>
                            </div>
                            <div className="col-md-6">
                                <Field
                                    label="URL-Linkedin"
                                    validationState={!formErrors ? "none" : formErrors.urlLinkedin ? "error" : "success"}
                                    validationMessage={!formErrors ? "none" : formErrors.urlLinkedin ? formErrors.urlLinkedin : "Correcto."}
                                >
                                    <Input
                                        size='large'
                                        value={formPerson.urlLinkedin}
                                        onChange={(e) => { handleChange("urlLinkedin", e.target.value) }}
                                    />
                                </Field>
                            </div>
                            <div className="col-md-6">
                                <Field
                                    label="Email"
                                    validationState={!formErrors ? "none" : formErrors.email ? "error" : "success"}
                                    validationMessage={!formErrors ? "none" : formErrors.email ? formErrors.email : "Correcto."}
                                >
                                    <Input
                                        size='large'
                                        value={formPerson.email}
                                        onChange={(e) => { handleChange("email", e.target.value) }}
                                    />
                                </Field>
                            </div>
                            <div className="col-md-6">
                                <Field
                                    label="Years Old"
                                    validationState={!formErrors ? "none" : formErrors.yearsOld ? "error" : "success"}
                                    validationMessage={!formErrors ? "none" : formErrors.yearsOld ? formErrors.yearsOld : "Correcto."}
                                >
                                    <Input
                                        type='number'
                                        size='large'
                                        value={String(formPerson.yearsOld) || ""}
                                        onChange={(e) => { handleChange("yearsOld", e.target.value) }}
                                    />
                                </Field>
                            </div>
                            <div className='col-md-12'>
                                <Button appearance="primary">
                                    Save
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export {
    ExampleFluentUI
};