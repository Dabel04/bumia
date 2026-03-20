const formElem = document.getElementById("regForm");
const fullnameInput = document.getElementById("regFullname");
const emailInput = document.getElementById("regEmail");
const phoneNumberInput = document.getElementById("regPhoneNumber");
const passwordInput = document.getElementById("regPassword");
const businessNameInput = document.getElementById("regBusinessName");

const fullnameErrorElem = document.getElementById("fullnameError");
const emailErrorElem = document.getElementById("emailError");
const phoneNumberErrorElem = document.getElementById("phoneNumberError");
const passwordErrorElem = document.getElementById("passwordError");
const businessNameErrorElem = document.getElementById("businessNameError");
const registerButton = document.getElementById("registerButton");
const registerStatusElem = document.getElementById("registerStatus");

formElem.addEventListener("submit", async function (e) {
  e.preventDefault();

  let fullname = fullnameInput.value;
  let email = emailInput.value;
  let phoneNumber = phoneNumberInput.value;
  let password = passwordInput.value;
  let businessName = businessNameInput.value;

  let hasError = false;

  // --- VALIDATION BLOCK START ---
  if (fullname.trim().length === 0) {
    fullnameErrorElem.textContent = "You must enter your full name";
    fullnameErrorElem.className = "error";
    fullnameInput.classList.add("input-error");
    hasError = true;
  }

  if (email.trim().length === 0) {
    emailErrorElem.textContent = "You must enter an email";
    emailErrorElem.className = "error";
    emailInput.classList.add("input-error");
    hasError = true;
  }

  if (phoneNumber.trim().length === 0) {
    phoneNumberErrorElem.textContent = "You must enter a phone number";
    phoneNumberErrorElem.className = "error";
    phoneNumberInput.classList.add("input-error");
    hasError = true;
  }

  if (password.trim().length === 0) {
    passwordErrorElem.textContent = "You must enter a password";
    passwordErrorElem.className = "error";
    passwordInput.classList.add("input-error");
    hasError = true;
  }

  if (businessName.trim().length === 0) {
    businessNameErrorElem.textContent = "You must enter a business name";
    businessNameErrorElem.className = "error";
    businessNameInput.classList.add("input-error");
    hasError = true;
  }

  if (hasError) {
    return; // Early return stops the API request if ANY field is blank
  }
  // --- VALIDATION BLOCK END ---

  const userData = {
    fullName: fullname,
    email,
    phoneNumber,
    password,
    businessName
  };

  console.log("Before API request");

  const requestApiUrl = "https://igronchain.onrender.com/auth/register";
  const requestApiOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  };

  try {
    registerButton.disabled = true;
    registerButton.textContent = "Please wait...";
    registerButton.style.backgroundColor = "#515151";

    const response = await fetch(requestApiUrl, requestApiOptions);
    const responseData = await response.json();

    registerButton.disabled = false;
    registerButton.textContent = "Register";
    registerButton.style.backgroundColor = "#000000";

    if (!response.ok) {
      registerStatusElem.textContent = responseData.message || "Error registering";
      return;
    }

    // Redirecting to login page after successful registration
    window.location.href = "my-product.html";
  } catch (error) {
    registerStatusElem.textContent = error.message;
  }
  
  // try {
  //   const response = await fetch("https://igronchain.onrender.com/auth/register", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(userData)
  //   })
  //   console.log("Inside API request - RESPONSE");
  //   const data = await response.json();
  //   console.log("Inside API request - DATA");
  //   console.log("Actual data from backend: ", data);
  // } catch (err) {
  //   console.log("Something went bad!");
  //   console.error(err)
  // }

  console.log("AFter API request");
});

// --- INPUT EVENT LISTENERS TO CLEAR ERRORS ON TYPING ---
fullnameInput.addEventListener("input", function () {
  fullnameErrorElem.textContent = "";
  fullnameErrorElem.className = "";
  fullnameInput.classList.remove("input-error");
});

emailInput.addEventListener("input", function () {
  emailErrorElem.textContent = "";
  emailErrorElem.className = "";
  emailInput.classList.remove("input-error");
});

phoneNumberInput.addEventListener("input", function () {
  phoneNumberErrorElem.textContent = "";
  phoneNumberErrorElem.className = "";
  phoneNumberInput.classList.remove("input-error");
});

passwordInput.addEventListener("input", function () {
  passwordErrorElem.textContent = "";
  passwordErrorElem.className = "";
  passwordInput.classList.remove("input-error");
});

businessNameInput.addEventListener("input", function () {
  businessNameErrorElem.textContent = "";
  businessNameErrorElem.className = "";
  businessNameInput.classList.remove("input-error");
});