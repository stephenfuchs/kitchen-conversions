import "../styles/main.css";
import convert from "convert-units";

const selector = document.getElementById("selector");
const selectVolume = document.getElementById("selectVolume");
const selectWeight = document.getElementById("selectWeight");
const conversionInput = document.getElementById("conversionInput");
const restart = document.getElementById("btnRestart");
const volume = document.getElementById("volume");
const weight = document.getElementById("weight");
const switchToWeight = document.getElementById("switchToWeight");
const switchToVolume = document.getElementById("switchToVolume");
const fromBtns = document.querySelectorAll(`[data-from]`);
const toBtns = document.querySelectorAll(`[data-to]`);
const swapBtn = document.getElementById("swapBtn");
let input = document.getElementById("input");
let result = document.getElementById("result");

let fromUnit = "";
let toUnit = "";

// SET DISPLAY

// Set conversion type upon selection
function unitSelection(unit) {
  selector.classList.add("hidden");
  unit.classList.remove("hidden");
  restart.classList.remove("hidden");
  conversionInput.classList.remove("hidden");
  conversionInput.classList.add("flex");
}

// Set conversion units to VOLUME
selectVolume.addEventListener("click", () => {
  unitSelection(volume);
});

// Set conversion units to WEIGHT
selectWeight.addEventListener("click", () => {
  unitSelection(weight);
});

// Toggle between VOLUME and WEIGHT units
function toggleType() {
  volume.classList.toggle("hidden");
  weight.classList.toggle("hidden");
}

// Switch to VOLUME units and reset app
switchToVolume.addEventListener("click", () => {
  toggleType(), resetApp();
});

// Switch to WEIGHT units and reset app
switchToWeight.addEventListener("click", () => {
  toggleType(), resetApp();
});

// Clear input
function clearInput() {
  input.value = "";
  result.value = "";
}

// Reset UNITS
function resetUnits() {
  fromUnit = "";
  toUnit = "";
}

// Clear input on focus
input.addEventListener("focus", clearInput);

// Remove DISABLED unit button states
function removeDisabledState() {
  fromBtns.forEach((button) => button.removeAttribute("disabled"));
  toBtns.forEach((button) => button.removeAttribute("disabled"));
}

// Remove ACTIVE unit button states
function removeActiveState() {
  fromBtns.forEach((button) => button.classList.remove("active"));
  toBtns.forEach((button) => button.classList.remove("active"));
}

// Reset app state
function resetApp() {
  clearInput();
  removeDisabledState();
  removeActiveState();
  resetUnits();
}

// Reset entire app
restart.addEventListener("click", () => {
  location.reload();
});

// CONVERSIONS

// Set unit to convert FROM on button click
fromBtns.forEach((button) => {
  button.addEventListener("click", () => {
    fromBtns.forEach((button) => button.classList.remove("active"));
    toBtns.forEach((button) => button.removeAttribute("disabled"));
    button.classList.add("active");

    let sameUnit = document.querySelector(
      `[data-to][data-unit="${button.dataset.unit}"]`
    );
    sameUnit.toggleAttribute("disabled");

    fromUnit = button.dataset.unit;
    unitConversion();
  });
});

// Set unit to convert TO on button click
toBtns.forEach((button) => {
  button.addEventListener("click", () => {
    toBtns.forEach((button) => button.classList.remove("active"));
    fromBtns.forEach((button) => button.removeAttribute("disabled"));

    button.classList.add("active");
    let sameUnit = document.querySelector(
      `[data-from][data-unit="${button.dataset.unit}"]`
    );
    sameUnit.toggleAttribute("disabled");

    toUnit = button.dataset.unit;
    unitConversion();
  });
});

// Swap FROM & TO units
swapBtn.addEventListener("click", () => {
  if (fromUnit !== "" && toUnit !== "") {
    input.value = result.value;
    removeDisabledState();
    [toUnit, fromUnit] = [fromUnit, toUnit];
    document.querySelector(`[data-from][data-unit="${fromUnit}"]`).click();
    document.querySelector(`[data-to][data-unit="${toUnit}"]`).click();
  }
});

// Perform conversion
function unitConversion() {
  if (fromUnit !== "" && toUnit !== "") {
    result.value = parseFloat(
      convert(input.value).from(fromUnit).to(toUnit).toFixed(2)
    );
  }
}

// Perform conversion on each change to input field
input.addEventListener("keyup", unitConversion);
