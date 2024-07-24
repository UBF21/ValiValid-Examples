import { useContext, useEffect, useRef, useState } from 'react';
import { ValidationType } from '../../../formValidation/Validators';
import { FormManager } from '../../../formValidation/FormValidation';
import { Person } from '../../../interfaces/Person';
import { FormErrors } from '../../../formValidation/FormTypes';

const ExampleBootstrap = () => {

  const [formPerson, setFormPerson] = useState<Person>({ name: "", lastName: "", yearsOld: 0, sex: "", skills: "", email: "", urlLinkedin: "", foto: new Blob, cv: new Blob, profile: new Blob() });
  const [formErrors, setFormErrors] = useState<FormErrors<Person>>({});
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const formManager = new FormManager<Person>(setIsFormValid, [
    {
      field: "name",
      validations: [
        { type: ValidationType.Required }
      ]
    },
    {
      field: "lastName",
      validations: [
        { type: ValidationType.Required }
      ]
    },
    {
      field: "yearsOld",
      validations: [
        { type: ValidationType.Required }
      ],
      isNumber: true,
    },
    {
      field: "sex",
      validations: [
        { type: ValidationType.Required }
      ]
    },
    {
      field: 'email',
      validations: [
        { type: ValidationType.Required },
        { type: ValidationType.Email }
      ]
    },
    {
      field: 'urlLinkedin',
      validations: [
        { type: ValidationType.Required },
        { type: ValidationType.Url }
      ]
    }
  ]);

  useEffect(() => {
    const errors = formManager.validate(formPerson);
    setFormErrors(errors);
  }, [formPerson])

  const handleChange = (field: keyof Person, value: any): void => {
    formManager.handleChange(field, value, setFormPerson, setFormErrors);
  }

  const onSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const initial: Person = { name: "", lastName: "", yearsOld: 0, sex: "", skills: "", email: "", urlLinkedin: "", foto: new Blob(), cv: new Blob(), profile: new Blob() };

    const errors = formManager.validate(formPerson);
    setFormErrors(errors);

    if (isFormValid) {
      console.log('Form submitted:', formPerson);
      setFormPerson(initial);
    }

  }

  return (
    <div className='container mt-4'>
      <div className='row'>
        <div className='col-md-4'>
          <pre style={{ fontWeight: 'bold', width: '100%', height: '70vh' }}>{JSON.stringify(formPerson, null, 2)}</pre>
        </div>
        <div className='col-md-8'>
          <form className="row g-3" onSubmit={onSubmit}>
            <div className="col-md-12">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" onChange={(e) => { handleChange("name", e.target.value) }} value={formPerson.name} className="form-control" id="name" />
              <span style={{ color: "red", fontWeight: "bold" }}>{formErrors.name}</span>
            </div>
            <div className="col-md-6">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input type="text" className="form-control" id="lastName" value={formPerson.lastName} onChange={(e) => { handleChange("lastName", e.target.value) }} />
              <span style={{ color: "red", fontWeight: "bold" }}>{formErrors.lastName}</span>
            </div>
            <div className="col-md-6">
              <label htmlFor="Linkedin" className="form-label">URL-Linkedin</label>
              <input type="text" className="form-control" id="Linkedin" value={formPerson.urlLinkedin} onChange={(e) => { handleChange("urlLinkedin", e.target.value) }} />
              <span style={{ color: "red", fontWeight: "bold" }}>{formErrors.urlLinkedin}</span>
            </div>
            <div className="col-md-6">
              <label htmlFor="Email" className="form-label">Email</label>
              <input type="text" className="form-control" id="Email" value={formPerson.email} onChange={(e) => { handleChange("email", e.target.value) }} />
              <span style={{ color: "red", fontWeight: "bold" }}>{formErrors.email}</span>
            </div>
            <div className="col-md-6">
              <label htmlFor="yearsOld" className="form-label">Years Old</label>
              <input type="number"
                step='0.01'
                className="form-control"
                id="yearsOld"
                value={formPerson.yearsOld || ""}
                onChange={(e) => { handleChange("yearsOld", e.target.value) }}
              />
              <span style={{ color: "red", fontWeight: "bold" }}>{formErrors.yearsOld}</span>
            </div>
            <div className="col-md-12">
              <label htmlFor="sex" className="form-label">Sex</label>
              <select id="sex" className="form-select" value={formPerson.sex} onChange={(e) => { handleChange("sex", e.target.value) }}>
                <option value="">[Select]</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
              <span style={{ color: "red", fontWeight: "bold" }}>{formErrors.sex}</span>
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export {
  ExampleBootstrap
};