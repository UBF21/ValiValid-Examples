# Documentación - ValiValid

## Visión General

Este código define una utilidad de validación de formularios para ReactJS usando TypeScript. La utilidad proporciona una manera de agregar reglas de validación a los campos del formulario, validar todo el formulario y manejar cambios en los campos del formulario. El validador asegura que el formulario se mantenga válido según las reglas definidas y actualiza el estado del formulario y el estado de errores en consecuencia.

### Clases y Tipos

#### `ValidationRule<T>`

```csharp
export type ValidationRule<T> = {
    field: keyof T;
    message: string;
    validate: (value: any) => boolean;
};
```

-  `field` : El campo del formulario a validar.
- `message` : El mensaje de error que se mostrará si la validación falla.
- `validate` : Una función que toma el valor del campo y devuelve un booleano indicando si el valor del campo es válido.

#### `FormErrors<T>`

Un tipo que representa los errores para cada campo del formulario.

```csharp
export type FormErrors<T> = {
    [key in keyof T]?: string | null;
};
```
- Las claves son los nombres de los campos del formulario..
- Los valores son mensajes de error o `null` si el campo es válido.

#### `SetState<T>`

Un tipo que representa la función para actualizar el estado de un formulario.

```csharp
export type SetState<T> = (value: T | ((prevState: T) => T)) => void;
```

- `value` : El nuevo valor del estado o una función que recibe el estado anterior y devuelve el nuevo estado.
  
### `FormManager<T>`

Una clase que gestiona las reglas de validación y la validación del formulario.

```csharp
export class FormManager<T> {
 ......
}
```

#### `Constructor`

```csharp
export class FormManager<T> {
     private _isFormValid: (isValid: boolean) => void;

    constructor(setFormValid: (isValid: boolean) => void) {
        this._isFormValid = setFormValid;
    }
}
```
- `setFormValid` Una función que toma un booleano indicando si el formulario es válido.


## Métodos

###  `addRule`

Agrega una regla de validación para un campo del formulario.

```csharp
export class FormManager<T> {
    addRule(field: keyof T, message: string, validate: (value: any) => boolean): void;
}
```
-  `field` : El campo del formulario a validar.
- `message` : El mensaje de error que se mostrará si la validación falla.
- `validate` : Una función que toma el valor del campo y devuelve un booleano indicando si el valor del campo es válido.

###  `Validate`

Valida todos los datos del formulario.

```csharp
export class FormManager<T> {
   validate(fields: T): FormErrors<T> {
    }
}
```
-  `fields` : Los datos del formulario a validar.
- Devuelve un objeto que contiene mensajes de error para los campos inválidos.

###  `validateField`

Valida un solo campo del formulario.

```csharp
export class FormManager<T> {
   validateField(field: keyof T, value: any): string | null {
    }
}
```
-  `field` : El campo del formulario a validar.
-  `value` : El valor del campo del formulario.
- Devuelve un mensaje de error si el campo es inválido, de lo contrario `null`.

###  `handleChange`

Maneja los cambios en los campos del formulario y actualiza el estado del formulario y el estado de errores.

```csharp
export class FormManager<T> {
   handleChange( name: keyof T, value: any, setForm: SetState<T>, setErrors: SetState<FormErrors<T>> ): void{
    }
}
```
-  `name` : El nombre del campo del formulario.
-  `value` : El nuevo valor del campo del formulario.
-  `setForm` : Una función para actualizar el estado del formulario.
-  `setErrors` : Una función para actualizar el estado de errores.

## Examples 

### basic

```csharp
import React, { useState } from 'react';

// Definir el tipo de datos del formulario
type FormData = {
    name: string;
    email: string;
    age: number;
};

const MyForm: React.FC = () => {
    const [form, setForm] = useState<FormData>({ name: '', email: '', age: 0 });
    const [errors, setErrors] = useState<FormErrors<FormData>>({});

    // Definir los setters de estado
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    
    // Crear una instancia del validador de formularios
    const formValidator = new FormManager<FormData>(isFormValid => {
        console.log(`El formulario es válido: ${isFormValid}`);
    });
    
    // Agregar reglas de validación
    formValidator.addRule('name', 'El nombre es obligatorio', value => !!value);
    formValidator.addRule('email', 'El correo electrónico es inválido', value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
    formValidator.addRule('age', 'La edad debe ser un número positivo', value => value > 0);

    const handleOnChange = (name: keyof FormData, value: any) => {
        formValidator.handleChange(name, value, setForm, setErrors);
    };

    return (
        <form>
            <div>
                <label>Nombre:</label>
                <input
                    type="text"
                    value={form.name}
                    onChange={e => handleOnChange('name', e.target.value)}
                />
                {errors.name && <span>{errors.name}</span>}
            </div>
            <div>
                <label>Correo Electrónico:</label>
                <input
                    type="email"
                    value={form.email}
                    onChange={e => handleOnChange('email', e.target.value)}
                />
                {errors.email && <span>{errors.email}</span>}
            </div>
            <div>
                <label>Edad:</label>
                <input
                    type="number"
                    value={form.age}
                    onChange={e => handleOnChange('age', Number(e.target.value))}
                />
                {errors.age && <span>{errors.age}</span>}
            </div>
            <button type="submit">Enviar</button>
        </form>
    );
};

export default MyForm;```
