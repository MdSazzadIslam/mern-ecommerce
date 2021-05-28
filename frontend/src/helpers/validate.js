const validate = (inputs) => {
  //Email errors
  debugger;
  const errors = {};
  if (!inputs.email && inputs.email !== undefined) {
    errors.email = "Check Email";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(inputs.email)) {
    errors.email = "Invalid email address";
  }
  //Password Errors
  if (
    !inputs.password ||
    (inputs.password.length < 8 && inputs.password !== undefined)
  ) {
    errors.password = "Password must be 8 digits";
  }

  if (
    !inputs.firstName ||
    (inputs.firstName.length < 0 && inputs.firstName !== undefined)
  ) {
    errors.firstName = "First name must be filled in";
  }
  if (inputs.firstName && inputs.firstName !== undefined) {
    let regx = /^[a-zA-Z]+$/.test(inputs.firstName);
    if (regx === false) {
      errors.firstName = "Only character are allowed in first name";
    }
  }

  if (
    !inputs.lastName ||
    (inputs.lastName.length < 0 && inputs.lastName !== undefined)
  ) {
    errors.lastName = "Last name must be filled in";
  }

  if (inputs.lastName && inputs.lastName !== undefined) {
    let regx = /^[a-zA-Z]+$/.test(inputs.lastName);
    if (regx === false) {
      errors.firstName = "Only character are allowed in last name";
    }
  }

  return errors;
};

export default validate;
