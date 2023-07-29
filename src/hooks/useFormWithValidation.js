import React from 'react';
import * as EmailValidator from 'email-validator';

export function useFormWithValidation() {

	const [values, setValues] = React.useState({});
	const [errors, setErrors] = React.useState({});
	const [isValid, setIsValid] = React.useState(false);

	const [isValidInputs, setIsValidInputs] = React.useState({});

	//---ОБРАБОТЧИКИ---
	const handleChange = (event) => {
		const target = event.target;
		const name = target.name;
		const value = target.value;
		setIsValidInputs('');
		setValues({ ...values, [name]: value });
		setErrors({ ...errors, [name]: target.validationMessage });
		setIsValid(target.closest("form").checkValidity() && errors.email !== 'Неверный формат почты')
		if (!target.validationMessage && name === "email") {
			if (!EmailValidator.validate(value)) {
				setErrors({ ...errors, "email": 'Неверный формат почты' });
				setIsValid(false);
			}
			else {
				setErrors({ ...errors, "email": '' });
				setIsValid(target.closest("form").checkValidity())
			}
		}
	};

	return { values, errors, isValid, handleChange, setValues, setIsValid, setErrors, isValidInputs };
};