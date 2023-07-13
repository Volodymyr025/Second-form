const ERROR_MESSAGE = {
  notEmpty: "Field not to be empty",
  minVal: "Minimum caracters must be",
  maxVal: "Maximum caracters must be",
  firstLetter: "First letter must be uppercase",
  spaces: "Name not to be with spaces",
  isNameNumber: "The name cannot contain a number",
  corectEmail: "Write correctly Email",
  charsUsa: "Phone number must be",
  charsUa: "Phone number must be",
  isPhoneNumber: ["The phone number must be written in numbers"],
  minValDate: "You are not yet",
  maxValDate: "You are already",
  pastDate: "You are not born yet",
  select: 'Select a country number',
  minPassword: 'Minimum caracters must be',
  maxPassword: 'Maximum caracters must be',
  oneUpperPassword: 'Password must include one letter uppercase and one number',
  symbolPasword: 'Password must include one sumbol (@!#$%,.)',
  mustMachPassword: 'Passwords must match',
  haveError: 'Fix all error',
  epmtyFields: "Fill in all fields"
};
const FIELDS_CONFIG = {
  firstName: {
    notEmpty: { message: ERROR_MESSAGE.notEmpty },
    minimumCharacters: { min: 3, message: ERROR_MESSAGE.minVal },
    maximumCharacters: { max: 10, message: ERROR_MESSAGE.maxVal },
    firstUpperCase: { message: ERROR_MESSAGE.firstLetter },
    spaces: { message: ERROR_MESSAGE.spaces },
    isNumber: { message: ERROR_MESSAGE.isNumber },
  },
  lastName: {
    notEmpty: { message: ERROR_MESSAGE.notEmpty },
    minimumCharacters: { min: 3, message: ERROR_MESSAGE.minVal },
    maximumCharacters: { max: 10, message: ERROR_MESSAGE.maxVal },
    firstUpperCase: { message: ERROR_MESSAGE.firstLetter },
    spaces: { message: ERROR_MESSAGE.spaces },
    isNumber: { message: ERROR_MESSAGE.isNameNumber },
  },
  email: {
    notEmpty: { message: ERROR_MESSAGE.notEmpty },
    corectEmail: { message: ERROR_MESSAGE.corectEmail },
  },
  phoneNumber: {
    notEmpty: { message: ERROR_MESSAGE.notEmpty },
    select: { message: ERROR_MESSAGE.select },
    selectUSA: { equal: 12, message: ERROR_MESSAGE.charsUsa },
    selectUA: { equal: 13, message: ERROR_MESSAGE.charsUa },
    notNumber: { message: ERROR_MESSAGE.isPhoneNumber },
  },
  date: {
    past: { message: ERROR_MESSAGE.pastDate },
    minValDate: { min: 568036800000, message: ERROR_MESSAGE.minValDate }, //18 y.o in ms
    maxValDate: { max: 2051244000000, message: ERROR_MESSAGE.maxValDate }, //65 y.o in ms
  },
  password: {
    minPassword: { min: 6, message: ERROR_MESSAGE.minPassword },
    maxPassword: { max: 20, message: ERROR_MESSAGE.maxPassword },
    oneUpperPassword: { message: ERROR_MESSAGE.oneUpperPassword },
    symbolPassword: { message: ERROR_MESSAGE.symbolPasword }
  },
  confirmPassword: {
    mustMachPassword: { message: ERROR_MESSAGE.mustMachPassword }
  },
};
// ERROR MESSAGE OR FALSE
const minLength = (value, options) => {
  return !(value.length >= options.min)
    ? options.message + " " + options.min + " chars"
    : false;
};
const maxLength = (value, options) => {
  return !(value.length <= options.max)
    ? options.message + " " + options.max + " chars"
    : false;
};
const notEmpty = (value, options) => (!value ? options.message : false);

const isFirstUpperCase = (value, options) => {
  const firstLetter = value[0];
  return !(firstLetter === value[0].toUpperCase()) ? options.message : false;
};

const isSpaces = (value, options) =>
  /\s/.test(value) ? options.message : false;
const isNumber = (value, options) =>
  /\d/.test(value) ? options.message : false;
const notNumber = (value, options) =>
  regexStr.test(value) ? options.message : false;
const isEmail = (value, options) =>
  !regexEmail.test(value) ? options.message : false;

const selectCountry = (value, options) => {
  const usa = document.getElementById("usa");
  const ua = document.getElementById("ua");
  if (!(usa.selected || ua.selected)) {
    return options.message
  } else false
}
const usaNumber = (value, options) => {
  const usa = document.getElementById("usa");
  if (usa.selected) {
    return !(value.length === options.equal)
      ? options.message + " " + options.equal + " chars"
      : false;
  }
};
const uaNumber = (value, options) => {
  const ua = document.getElementById("ua");
  if (ua.selected) {
    return !(value.length === options.equal)
      ? options.message + " " + options.equal + " chars"
      : false;
  }
};
const pastDate = (value, options) => {
  let today = new Date();
  let selectDate = new Date(date.value);
  if (Math.sign(today.getTime() - selectDate.getTime()) === -1) {
    return options.message;
  } else false;
};

const minDate = (value, options) => {
  let today = new Date();
  let selectDate = new Date(date.value);
  if (today.getTime() - selectDate.getTime() < options.min) {
    return (
      options.message +
      " " +
      parseInt(options.min / 1000 / 60 / 60 / 24 / 366 + 1) +
      " " +
      "years old"
    );
  } else false;
};
const maxDate = (value, options) => {
  let today = new Date();
  let selectDate = new Date(date.value);
  if (today.getTime() - selectDate.getTime() > options.max) {
    return (
      options.message +
      " " +
      parseInt(+options.max / 1000 / 60 / 60 / 24 / 366) +
      " " +
      "years old"
    );
  } else false;
};

const toUpperCasePasword = (value, options) => { return !oneUperandNumber.test(value) ? options.message : false }
const toSymbolPasword = (value, options) => { return !oneSymbol.test(value) ? options.message : false }
const checkPassword = (value, options) => { return password.value !== value ? options.message : false }



const VALIDATION_FUNCTIONS_CONFIG = {
  minimumCharacters: minLength,
  maximumCharacters: maxLength,
  notEmpty: notEmpty,
  firstUpperCase: isFirstUpperCase,
  spaces: isSpaces,
  isNumber: isNumber,
  corectEmail: isEmail,
  select: selectCountry,
  selectUSA: usaNumber,
  selectUA: uaNumber,
  minValDate: minDate,
  maxValDate: maxDate,
  past: pastDate,
  notNumber: notNumber,
  minPassword: minLength,
  maxPassword: maxLength,
  mustMachPassword: checkPassword,
  symbolPassword: toSymbolPasword,
  oneUpperPassword: toUpperCasePasword,
};

const VALIDATOR = (name, value) => {
  const fieldRules = FIELDS_CONFIG[name];
  for (let rule in fieldRules) {
    const message = VALIDATION_FUNCTIONS_CONFIG[rule](value, fieldRules[rule]);
    if (message) return message;
  }
  return false;
};

const firstN = document.getElementById("first-name");
const lastN = document.getElementById("last-name");
const email = document.getElementById("e_mail");
const select = document.querySelector("select");
const phone = document.getElementById("phone");
const label = document.querySelectorAll('.label')
const password = document.getElementById("passwords");
const confirm_password = document.getElementById("confirm-password");
const btnSub = document.getElementById("register_form");
const btnRes = document.getElementById("res");
const date = document.getElementById("dateOfBirth");

const regexEmail = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
const regexStr = new RegExp("[a-zA-Z]");
const oneUperandNumber = new RegExp("(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*).*$");
const oneSymbol = new RegExp('(?=.*?[#?!@$%^&*-])')

//root
const createErr = (element, text) => {
  const err = document.createElement("p");
  err.innerHTML = text;
  element.append(err);
  element.children[0].style.borderBottom = "4px solid red";
};
const applyError = (name, textError) => {
  const label = document.getElementById(name);
  if (!label.querySelector("p")) {
    createErr(label, textError);
  }
};
const deleteError = (name) => {
  const label = document.getElementById(name);
  if (label.querySelector("p")) {
    label.lastElementChild.remove();
    label.children[0].style.borderBottom = "4px solid #668d39";
    return;
  }
};

//first Name
const onChangeName = ({ target }) => {
  const result = VALIDATOR(target.name, target.value);
  deleteError(target.name);
  if (result) {
    applyError(target.name, result);
  } else USER_DATA[target.name] = target.value
};

// last Name
const onChangeLastName = ({ target }) => {
  const result = VALIDATOR(target.name, target.value);
  deleteError(target.name);
  if (result) {
    applyError(target.name, result);
  } else USER_DATA[target.name] = target.value
};
//Email
const onChangeEmail = ({ target }) => {
  const result = VALIDATOR(target.name, target.value);
  deleteError(target.name);
  if (result) {
    applyError(target.name, result);
  } else USER_DATA[target.name] = target.value
};

//Phone
const onChangePhone = ({ target }) => {
  const result = VALIDATOR(target.name, target.value);
  deleteError(target.name);
  if (result) {
    applyError(target.name, result);
  } else USER_DATA[target.name] = target.value
};
//seclec country number
const selectNumber = ({ target }) => {
  if (target.value === "USA") {
    deleteError(target.parentElement.id);
    select.className = "usa";
    phone.value = "+1";
    return;
  }
  if (target.value === "UA") {
    deleteError(target.parentElement.id);
    select.className = "ua";
    phone.value = "+380";
  }
};
// // date of birth
const onChangeDate = ({ target }) => {
  const result = VALIDATOR(target.name, target.value);
  deleteError(target.name);
  if (result) {
    applyError(target.name, result);
  } else USER_DATA[target.name] = target.value
};

const onChangePassword = ({ target }) => {
  const result = VALIDATOR(target.name, target.value);
  deleteError(target.name);
  if (result) {
    applyError(target.name, result);
  } else USER_DATA[target.name] = target.value
};

// //confirm_password

const checkDuplicatePassword = ({ target }) => {
  const result = VALIDATOR(target.name, target.value);
  deleteError(target.name);
  if (result) {
    applyError(target.name, result);
  } else USER_DATA[target.name] = target.value
};
//get User Data
const USER_DATA = {
  firstName: false,
  lastName: false,
  email: false,
  phoneNumber: false,
  date: false,
  password: false,
  confirmPassword: false,
};

// button reset
const deleteAllError = () => {
  label.forEach((element, i) => {
    if (element.querySelector("p")) {
      element.lastElementChild.remove();
      label[i].firstElementChild.style.borderBottom = "4px solid #668d39";
    }
  });
};

const reset = (e) => {
  deleteAllError();
  cleanValue();
  e.preventDefault();
};

const cleanValue = () => {
  label.forEach((element) => {
    element.lastElementChild.value = "";
  });
};

const emptyField = () => {
  if (Object.values(USER_DATA).includes(false)) {
    return message = ERROR_MESSAGE.epmtyFields
  } else return false
}
const haveError = () => {
  if (document.querySelector('p')){
    return message = ERROR_MESSAGE.haveError
  }else return false
}

const submitHeandler = (e) => {
  e.preventDefault();
  deleteError('button')
  const userEmpty = emptyField()
  const err = haveError()
  if (userEmpty) {
    return applyError('button', userEmpty)
  } else if (err) {
    return applyError('button', err)
  }
  cleanValue()
  done()
};

//add img done
const done = () => {
  const background = document.getElementById("background");
  const img = document.createElement("img");
  img.src = "./img/done.png";
  img.alt = "done";
  background.append(img);
};

firstN.addEventListener("change", onChangeName);
lastN.addEventListener("change", onChangeLastName);
email.addEventListener("change", onChangeEmail);
select.addEventListener("change", selectNumber);
phone.addEventListener("change", onChangePhone);
date.addEventListener("change", onChangeDate);
password.addEventListener("change", onChangePassword);
confirm_password.addEventListener("change", checkDuplicatePassword);
btnRes.addEventListener("click", reset);
btnSub.addEventListener("submit", submitHeandler);
