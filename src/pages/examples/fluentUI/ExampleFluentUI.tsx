import { Button, Field, Image, Input } from '@fluentui/react-components';
import { useContext, useEffect, useRef, useState } from 'react';
import { Person } from '../../../interfaces/Person';
import { ValidationType } from '../../../formValidation/Validators';
import { FileSize, FormErrors, TypeFile } from '../../../formValidation/FormTypes';
import { FormManager } from '../../../formValidation/FormValidation';

const ExampleFluentUI = () => {

    const [formPerson, setFormPerson] = useState<Person>({ name: "", lastName: "", yearsOld: 0, sex: "", skills: "", email: "", urlLinkedin: "", foto: new Blob(), cv: new Blob() });
    const [formErrors, setFormErrors] = useState<FormErrors<Person>>({});
    const [isFormValid, setIsFormValid] = useState<boolean>(false);

    const [fileImage, setFileImage] = useState<string>("");
    const [file, setFile] = useState<string>("");
    const fileImageInputHidden = useRef<HTMLInputElement>(null);
    const fileInputHidden = useRef<HTMLInputElement>(null);


    const formManager = new FormManager<Person>(setIsFormValid, [
        {
            field: "name",
            validations: [
                { type: ValidationType.Required, value: true }
            ]
        },
        {
            field: "lastName",
            validations: [
                { type: ValidationType.Required, value: true }
            ]
        },
        {
            field: "yearsOld",
            validations: [
                { type: ValidationType.Required, value: true }
            ],
            isNumber: true
        },
        // {
        //     field: "sex",
        //     validations: [
        //         { type: ValidationType.Required, value: true }
        //     ]
        // },
        {
            field: 'email',
            validations: [
                { type: ValidationType.Required, value: true },
                { type: ValidationType.Email, value: true }
            ]
        },
        {
            field: 'urlLinkedin',
            validations: [
                { type: ValidationType.Required, value: true },
                { type: ValidationType.Url, value: true }
            ]
        },
        {
            field: "foto",
            validations: [
                { type: ValidationType.Required, value: true },
                { type: ValidationType.FileSize, value: FileSize['200KB'] },
                { type: ValidationType.FileType, value: [TypeFile.JPG] }
            ]
        },
        {
            field: "cv",
            validations: [
                { type: ValidationType.Required, value: true },
                { type: ValidationType.FileSize, value: FileSize['3MB'] },
                { type: ValidationType.FileType, value: [TypeFile.PDF] }
            ]
        }
    ]);

    useEffect(() => {
        const errors = formManager.validate(formPerson);
        setFormErrors(errors);
    }, [formPerson])

    const handleClickImage = () => {
        if (fileImageInputHidden.current !== null && fileImageInputHidden.current !== undefined) {
            fileImageInputHidden.current.click();
        }
    };

    const handleClickFile = () => {
        if (fileInputHidden.current !== null && fileInputHidden.current !== undefined) {
            fileInputHidden.current.click();
        }
    };

    const handleChange = (field: keyof Person, value: any): void => {
        formManager.handleChange(field, value, setFormPerson, setFormErrors);
    }

    const onSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        const initial: Person = { name: "", lastName: "", yearsOld: 0, sex: "", skills: "", email: "", urlLinkedin: "", foto: new Blob(), cv: new Blob() };

        const errors = formManager.validate(formPerson);
        setFormErrors(errors);
    
        if (isFormValid) {
            console.log('Form submitted:', formPerson);
            setFormPerson(initial);
            setFileImage("");
            setFile("");
        }

    }

    return (
        <div className='container mt-4'>
            <form onSubmit={onSubmit}>
                <div className='row'>
                    <div className='col-md-4'>
                        <pre style={{ fontWeight: 'bold', width: '100%', height: '70vh' }}>{JSON.stringify(formPerson, null, 2)}</pre>
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
                                        step='1'
                                        value={String(formPerson.yearsOld) || ""}
                                        onChange={(e) => { handleChange("yearsOld", e.target.value) }}
                                    />
                                </Field>
                            </div>
                            <div className='col-md-6 d-flex justify-content-center align-items-center'>
                                <Field
                                    label=""
                                    validationState={!formErrors ? "none" : formErrors.foto ? "error" : "success"}
                                    validationMessage={!formErrors ? "none" : formErrors.foto ? formErrors.foto : "Correcto."}
                                >
                                    <input type="file" hidden ref={fileImageInputHidden} onChange={(e) => {
                                        if (e.target.files && e.target.files.length > 0) {
                                            const file = e.target.files[0];
                                            handleChange("foto", file);
                                            setFileImage(URL.createObjectURL(file));
                                        }
                                    }} />
                                    <Image src={fileImage || 'https://mexicana.cultura.gob.mx/work/models/repositorio/img/empty.jpg'}
                                        style={{ width: '90px', height: '90px', marginBottom: '8px' }}
                                        fit='cover'
                                        shadow={true}
                                        onClick={handleClickImage}
                                        shape='circular' />
                                </Field>

                            </div>
                            <div className='col-md-6 d-flex justify-content-center align-items-center'>
                                <Field
                                    label=""
                                    validationState={!formErrors ? "none" : formErrors.cv ? "error" : "success"}
                                    validationMessage={!formErrors ? "none" : formErrors.cv ? formErrors.cv : "Correcto."}
                                >
                                    <input type="file" hidden ref={fileInputHidden} onChange={(e) => {
                                        if (e.target.files && e.target.files.length > 0) {
                                            const file = e.target.files[0];
                                            handleChange("cv", file);
                                            setFile(URL.createObjectURL(file));
                                        }
                                    }} />
                                    <embed src={file || 'https://png.pngtree.com/png-clipart/20230823/original/pngtree-blank-file-icon-page-document-picture-image_8222677.png'}
                                        style={{ width: '150px', height: '150px', marginBottom: '8px', objectFit: 'cover', backgroundColor: 'grey' }}
                                        onClick={handleClickFile}
                                    />
                                    {
                                        file && (
                                            <Button appearance='outline' onClick={handleClickFile}>Upload Other</Button>
                                        )
                                    }
                                </Field>

                            </div>
                            <div className='col-md-12'>
                                <button type="submit" className="btn btn-primary">Save</button>
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