const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// Show input error message
const showError = (input, message) => {
	const formControl = input.parentElement;
	formControl.className = "form-control error";

	const small = formControl.querySelector("small");
	small.innerText = message;
};

// Show input success outline
const showSuccess = (input) => {
	const formControl = input.parentElement;
	formControl.className = "form-control success";
};

// Get the input name
const getFieldName = (input) => {
	return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

// Check email validation
const validateEmail = (input) => {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	re.test(input.value.trim())
		? showSuccess(input)
		: showError(input, "Email is not valid");
};

// Check required fields
const checkRequired = (inputArr) => {
	inputArr.forEach((input) => {
		input.value.trim() === ""
			? showError(input, `${getFieldName(input)} is required`)
			: showSuccess(input);
	});
};

// Check input length
const checkLength = (input, min, max) => {
	if (input.value.length < min) {
		showError(
			input,
			`${getFieldName(input)} must be at least ${min} characters`
		);
	} else if (input.value.length > max) {
		showError(input, `${getFieldName(input)} cannot exceed ${max} characters `);
	}
};

// Check matching passwords
const checkPasswordMatch = (input, input2) => {
	input2.value === input.value
		? showSuccess(input2)
		: showError(input2, "Passwords don't match");
};

// Event Listeners
form.addEventListener("submit", function (e) {
	e.preventDefault();
	checkRequired([username, email, password, password2]);
	checkLength(username, 6, 15);
	checkLength(password, 8, 25);
	validateEmail(email);
	checkPasswordMatch(password, password2);
});
