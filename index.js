// TITLE: Friis Equation Solver
// FOCUS: Solving the distance between two antennas

const calculatorForm = document.getElementById("calculator");
const clearButton = document.getElementById("clear-all");

clearButton.addEventListener("click", clearAllFields);
calculatorForm.addEventListener("submit", (e) => showResult(e));

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
    console.log(input);
    formulaParameters[input.name] = input.value;
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
  console.log("clicked");
  let inputLists = document.getElementsByTagName("input");
  const formulaParameters = {};

  for (let input of inputLists) {
    input.value = null;
  }

  const resultBox = document.getElementById("result");
  resultBox.innerText = "?";
  resultBox.className = "";
}
