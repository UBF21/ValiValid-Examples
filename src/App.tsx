import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { FormErrors } from './formValidation/FormTypes';
import { Person } from './interfaces/Person';
import { FormManager } from './formValidation/FormValidation';
import { ValidationType } from './formValidation/Validators';

function App() {

  const [formPerson, setFormPerson] = useState<Person>({ name: "", lastName: "", yearsOld: 0, sex: "", skills: "" });
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
      isNumber:true,
    })
    .addValidation({
      field: "sex",
      validations: [
        {
          type: ValidationType.Required,
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
    const initial: Person = { name: "", lastName: "", yearsOld: 0, sex: "", skills: "" };

    const errors = formManager.validate(formPerson);
    setFormErrors(errors);

    if (isFormValid) {
      console.log('Form submitted:', formPerson);
      setFormPerson(initial);
    }

  }

  return (
    // <ExampleString/>







    <div className="container mt-4">
      <h2>Example</h2>
      <div className='col-12'>
        <pre>{JSON.stringify(formPerson,null,2)}</pre>
      </div>
      <form className="row g-3" onSubmit={onSubmit}>
        <div className="col-md-12">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" onChange={(e) => { handleChange("name", e.target.value) }} value={formPerson.name} className="form-control" id="name" />
          <span style={{ color: "red", fontWeight: "bold" }}>{formErrors.name}</span>
        </div>
        <div className="col-md-12">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input type="text" className="form-control" id="lastName" value={formPerson.lastName} onChange={(e) => { handleChange("lastName", e.target.value) }} />
          <span style={{ color: "red", fontWeight: "bold" }}>{formErrors.lastName}</span>
        </div>
        <div className="col-md-12">
          <label htmlFor="yearsOld" className="form-label">Years Old</label>
          <input type="number" 
                 step='0.01' 
                 className="form-control" 
                 id="yearsOld" 
                 value={formPerson.yearsOld || ""} 
                 onChange={(e) => { handleChange("yearsOld", e.target.value) }} 
                //  onFocus={(e) => {if(e.target.value === '0') e.target.value = '' } }
                //  onBlur={(e) => {if(e.target.value === '') e.target.value = '0' } }
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
  );
}

export default App;
