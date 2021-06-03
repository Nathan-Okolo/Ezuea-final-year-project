// TITLE: Friis Equation Solver
// FOCUS: Solving the distance between two antennas

const calculatorForm = document.getElementById("calculator");
const clearButton = document.getElementById("clear-all");
const inputLists = document.getElementsByTagName("input");
const formDataEntries = new FormData(calculatorForm).entries();
let errorObject = Object.fromEntries(formDataEntries);

clearButton.addEventListener("click", clearAllFields);
calculatorForm.addEventListener("submit", (e) => handleSignupFormSubmit(e));
calculatorForm.addEventListener("change", (e) => {
  errorObject = {};
});

const errorMessageContainer = document.createElement("p");
errorMessageContainer.className = "error-message";

function showResult(e) {
  e.preventDefault();

  let inputLists = document.getElementsByTagName("input");
  let thresholdPowerValue = document.getElementById("select-pth");

  let selectedThresholdPowerValue =
    thresholdPowerValue.options[thresholdPowerValue.selectedIndex].value;

  const formulaParameters = {};
  let antennaDistance = null;

  formulaParameters.thresholdPower = selectedThresholdPowerValue;

  for (let input of inputLists) {
    if (
      input.name === "polarizationCoefficient" ||
      input.name === "impedenceMismatch"
    ) {
      if (
        (input.value < 0 || input.value > 1 || !input.value) &&
        input.name === "polarizationCoefficient"
      ) {
        const impedanceErrorContainer = document.getElementById(
          "polarizationCoefficient-container"
        );
        const errorMessageText = document.createTextNode(
          "Value should be between 0 and 1."
        );
        errorMessageContainer.appendChild(errorMessageText);
        impedanceErrorContainer.appendChild(errorMessageContainer);
      }
    }

    // formulaParameters[input.name] = input.value;
  }

  const {
    impedenceMismatch,
    receiverEffiency,
    thresholdPower,
    receiverPower,
    receiverGain,
    transmitterGain,
    polarizationCoefficient,
  } = formulaParameters;

  antennaDistance =
    (receiverEffiency / 4) *
    Math.PI *
    Math.sqrt(
      (impedenceMismatch *
        receiverEffiency *
        receiverPower *
        receiverGain *
        transmitterGain *
        polarizationCoefficient) /
        thresholdPower
    );

  const resultBox = document.getElementById("result");
  resultBox.innerText =
    Math.round((antennaDistance + Number.EPSILON) * 1000) / 1000;
  resultBox.tabIndex = 2;
  resultBox.className = "new-result";
}

function clearAllFields() {
  for (let input of inputLists) {
    input.value = null;
  }

  const resultBox = document.getElementById("result");
  resultBox.innerText = "?";
  resultBox.className = "";
}

function isEmpty(value) {
  return value ? value : "Empty field.";
}

function isValueBetweenZeroOrOne(value) {
  if (value < 0 || value > 1) {
    return `Value should be between 0 and 1`;
  } else if (value === "Empty field.") return value;
  else return "";
}

function handleSignupFormSubmit(e) {
  // prevent default browser behaviour
  e.preventDefault();

  const filledFormData = new FormData(calculatorForm).entries();
  let polarizationCoefficientError = "";
  let impedenceMismatchError = "";

  const {
    impedenceMismatch,
    receiverEffiency,
    thresholdPower,
    receiverPower,
    receiverGain,
    transmitterGain,
    polarizationCoefficient,
  } = Object.fromEntries(filledFormData);

  polarizationCoefficientError = isValueBetweenZeroOrOne(
    isEmpty(polarizationCoefficient)
  );
  impedenceMismatchError = isValueBetweenZeroOrOne(isEmpty(impedenceMismatch));

  if (
    polarizationCoefficientError.includes("greater") ||
    polarizationCoefficientError.includes("Empty") ||
    !polarizationCoefficientError
  ) {
    const polCoeErrorMsgElement = document.querySelector(
      ".error-message.polarizationCoefficient"
    );
    polCoeErrorMsgElement.innerText = polarizationCoefficientError;
  }

  if (
    impedenceMismatchError.includes("greater") ||
    impedenceMismatchError.includes("Empty") ||
    !impedenceMismatchError
  ) {
    const impedenceMismatchErrorMessageElement = document.querySelector(
      ".error-message.impedenceMismatchError"
    );
    impedenceMismatchErrorMessageElement.innerText = impedenceMismatchError;
  }

  if (!impedenceMismatchError || !polarizationCoefficientError) {
    const antennaDistance =
      (receiverEffiency / (4 * Math.PI)) *
      Math.sqrt(
        (impedenceMismatch *
          receiverPower *
          receiverGain *
          transmitterGain *
          polarizationCoefficient) /
          thresholdPower
      );

    const resultBox = document.getElementById("result");
    resultBox.innerText =
      Math.round((antennaDistance + Number.EPSILON) * 10000) / 10000;
    resultBox.tabIndex = 2;
    resultBox.className = "new-result";
  }
}
