import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { FormErrors } from './formValidation/FormTypes';
import { Person } from './interfaces/Person';
import { FormManager } from './formValidation/FormValidation';
import { ValidationType } from './formValidation/Validators';
import { ExampleFluentUI } from './pages/examples/fluentUI/ExampleFluentUI';

function App() {

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
    // <ExampleString/>

  
    
    
    
    <div className="container mt-4">
     
      
    </div>
  );
}

export default App;
