const ERROR_MESSAGE = {
  notEmpty: "Field not to be empty",
  minVal: "Minimum caracters must be",
  maxVal: "Maximum caracters must be",
  firstLetter: "First letter must be upercase",
};
const FIELDS_CONFIG = {
  firstName: {
    notEmpty: { message: ERROR_MESSAGE.notEmpty },
    minimumCharacters: { min: 3, message: ERROR_MESSAGE.minVal },
    maximumCharacters: { max: 10, message: ERROR_MESSAGE.maxVal,},
    firstUpperCase: { message: ERROR_MESSAGE.firstLetter },
  },
  lastName: {
    notEmpty: { message: ERROR_MESSAGE.notEmpty },
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

const VALIDATION_FUNCTIONS_CONFIG = {
  minimumCharacters: minLength,
  maximumCharacters: maxLength,
  notEmpty: notEmpty,
  firstUpperCase: isFirstUpperCase,
};

const VALIDATOR = (name, value) => {
  const fieldRules = FIELDS_CONFIG[name];
  for (let rule in fieldRules) {
    const message = VALIDATION_FUNCTIONS_CONFIG[rule](value, fieldRules[rule]);
    if (message) return message;
  }
  return false;
};

// const findIndexLabel = () => {
//   for (let i=0; labels.length < i; i++){ 
//     console.log(labels[i])
//   }
// }

const firstN = document.getElementById("firstName");
const lastN = document.getElementById("last-name");
const labels = document.querySelectorAll("label");
const email = document.getElementById("email");
const select = document.querySelector("select");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const confirm_password = document.getElementById("confirm-password");
const btnSub = document.getElementById("register_form");
const btnRes = document.getElementById("res");

let date = document.getElementById("date");

const regexEmail = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
const regexStr = new RegExp("[a-zA-Z]");
const regexPassword = new RegExp(
  "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,20}$"
);


//root

const spaces = (text) => {
  text.value = text.value.split(" ").join("");
};
const includeNumber = (myString) => {
  if (/\d/.test(myString)) {
    return true;
  }
};

const createErr = (name, text) => {
  const err = document.createElement("p");
  err.innerHTML = text;
  labels[name].append(err);
  labels[name].children[0].style.borderBottom = "4px solid red";
};
const applyError = (name, textError) => {
  if (!labels[name].querySelector("p")) {
    createErr(name, textError);
  }
};

const deleteError = (name) => {
  if (labels[name].querySelector("p")) {
    // labels[name].lastElementChild.remove();
    // labels[name].children[0].style.borderBottom = "4px solid #668d39";
    // return;
  }
};

//first Name
const onChangeName = ({target}) => {
  const result = VALIDATOR(target.name, target.value);
  console.log(target.name)
  findIndexLabel()
  deleteError(0);
  if (!result) {
    // 0 change to name
    applyError(0, result);
  }
};

//last Name
const ruleLastName = () => {
  min_max(
    lastN,
    CONFIG.last_name.min,
    CONFIG.last_name.max,
    CONFIG.last_name.length,
    CONFIG.last_name.err
  );
  if (includeNumber(lastN.value)) {
    addError(CONFIG.last_name.length, CONFIG.last_name.errNum);
    return;
  }
};

const onChangeLastName = () => {
  upperCase(lastN);
  spaces(lastN);
  deleteError(CONFIG.last_name.length);
  ruleLastName();
};
// //Email
// const checkEmail = (text, arr, textError) => {
//   if (!regexEmail.test(text.value)) {
//     addError(arr, textError);
//     return;
//   }
// };
// const onChangeEmail = () => {
//   deleteError(CONFIG.email.length);
//   checkEmail(email, CONFIG.email.length, CONFIG.email.err);
// };

// //Phone
// const usaRule = () => {
//   if (select.value === "USA") {
//     min_max(
//       phone,
//       CONFIG.phone.USA.min,
//       CONFIG.phone.USA.max,
//       CONFIG.phone.length,
//       CONFIG.phone.USA.err
//     );
//     return;
//   }
// };
// const uaRule = () => {
//   if (select.value === "UA") {
//     min_max(
//       phone,
//       CONFIG.phone.UA.min,
//       CONFIG.phone.UA.max,
//       CONFIG.phone.length,
//       CONFIG.phone.UA.err
//     );
//     return;
//   }
// };
// const onlyNumber = () => {
//   if (regexStr.test(phone.value)) {
//     addError(CONFIG.phone.length, CONFIG.phone.errNum);
//     return;
//   }
// };
// const checkPhone = () => {
//   deleteError(CONFIG.phone.length);
//   onlyNumber();
//   usaRule();
//   uaRule();
// };
// //seclec country number
// const selectUSA = (e) => {
//   if (e.target.value === "USA") {
//     select.className = "usa";
//     phone.value = "+1";
//     deleteError(CONFIG.phone.length);
//     return;
//   }
// };
// const selectUA = (e) => {
//   if (e.target.value === "UA") {
//     select.className = "ua";
//     phone.value = "+380";
//     deleteError(CONFIG.phone.length);
//     return;
//   }
// };

// const changeOption = (e) => {
//   selectUSA(e);
//   selectUA(e);
// };
// // date of birth
// const checkDate = (min, max) => {
//   let today = new Date();
//   let selectDate = new Date(date.value);
//   if (Math.sign(today.getTime() - selectDate.getTime()) === -1) {
//     addError(CONFIG.DATE.length, CONFIG.DATE.err_past);
//   }
//   if (today.getTime() - selectDate.getTime() < min) {
//     addError(CONFIG.DATE.length, CONFIG.DATE.err18);
//   }
//   if (today.getTime() - selectDate.getTime() > max) {
//     addError(CONFIG.DATE.length, CONFIG.DATE.err65);
//   }
// };
// const onChangeDate = () => {
//   deleteError(CONFIG.DATE.length);
//   checkDate(CONFIG.DATE.min_date, CONFIG.DATE.max_date);
// };

// //password

// const checkPaswword = (text, arr, textError) => {
//   if (!regexPassword.test(text.value)) {
//     addError(arr, textError);
//     return;
//   }
//   if (
//     password.value.includes(firstN.value) ||
//     password.value.includes(lastN.value)
//   ) {
//     addError(arr, CONFIG.password.errDubl);
//     return;
//   }
// };
// const onChangePassword = () => {
//   deleteError(CONFIG.password.length);
//   checkPaswword(password, CONFIG.password.length, CONFIG.password.err);
// };

// //confirm_password

// const checkDuplicatePassword = () => {
//   deleteError(CONFIG.confirm_password.length);
//   if (password.value !== confirm_password.value) {
//     addError(CONFIG.confirm_password.length, CONFIG.confirm_password.err);
//     return;
//   }
// };

// //user Data
// const getUserData = () => {
//   const USER_DATA = {
//     user_name: firstN.value,
//     user_last_name: lastN.value,
//     email: email.value,
//     phone: phone.value,
//     password: password.value,
//     confirm_password: confirm_password.value,
//   };
//   console.log(USER_DATA);
// };
// //check on error all form
// const deleteAllError = () => {
//   labels.forEach((element, i) => {
//     if (element.querySelector("p")) {
//       element.lastElementChild.remove();
//       labels[i].firstElementChild.style.borderBottom = "4px solid #668d39";
//     }
//   });
// };
// const errorAndEmpty = () => {
//   labels.forEach((element) => {
//     if (element.lastElementChild.value === "") {
//       addError(6, "Заповніть корректно всі поля");
//     }
//   });
//   if (btnSub.querySelector("p")) {
//     addError(6, "Заповніть корректно всі поля");
//     return;
//   }
//   cleanValue();
// };

// const cleanValue = () => {
//   labels.forEach((element) => {
//     element.lastElementChild.value = "";
//   });
// };

// // button reset
// const reset = (e) => {
//   deleteAllError();
//   cleanValue();
//   e.preventDefault();
// };

// //button submit
// const submitHeandler = (e) => {
//   e.preventDefault();
//   deleteError(CONFIG.confirm_password.length);
//   getUserData();
//   errorAndEmpty();
//   done();
// };

// //add img done
// const done = () => {
//   const background = document.getElementById("background");
//   const img = document.createElement("img");
//   img.src = "./img/done.png";
//   img.alt = "done";
//   background.append(img);
// };s

firstN.addEventListener("change", onChangeName);
lastN.addEventListener("change", onChangeLastName);
// email.addEventListener("change", onChangeEmail);
// select.addEventListener("change", changeOption);
// phone.addEventListener("change", checkPhone);
// date.addEventListener("change", onChangeDate);
// password.addEventListener("change", onChangePassword);
// confirm_password.addEventListener("change", checkDuplicatePassword);
// btnRes.addEventListener("click", reset);
// btnSub.addEventListener("submit", submitHeandler);
