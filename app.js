const yearSelect = document.getElementById("year");
const makeSelect = document.getElementById("make");
const modelSelect = document.getElementById("model");
const recentSelect = document.getElementById("recent");
const resetBtn = document.getElementById("resetBtn");
const selectBtn = document.getElementById("selectBtn");
const vehicleMessage = document.getElementById("vehicleMessage");

const accessForm = document.getElementById("accessForm");
const accessCodeInput = document.getElementById("accessCode");
const accessMessage = document.getElementById("accessMessage");

const VALID_CODE = "100003000";
const TARGET_URL = "https://ohioweblibrary.org/db/chilton";

const vehicleData = {
  "2024": {
    Toyota: ["Corolla", "Camry", "RAV4", "Tacoma"],
    Ford: ["F-150", "Escape", "Explorer", "Mustang"],
    Honda: ["Civic", "Accord", "CR-V", "Pilot"]
  },
  "2023": {
    Toyota: ["Corolla", "Highlander", "Tacoma"],
    Chevrolet: ["Silverado", "Malibu", "Tahoe"],
    Nissan: ["Altima", "Rogue", "Frontier"]
  },
  "2022": {
    Hyundai: ["Elantra", "Santa Fe", "Tucson"],
    Kia: ["Forte", "Sportage", "Sorento"],
    Jeep: ["Wrangler", "Cherokee", "Compass"]
  },
  "2021": {
    BMW: ["330i", "X3", "X5"],
    Mercedes-Benz: ["C-Class", "E-Class", "GLE"],
    Audi: ["A4", "Q5", "Q7"]
  }
};

function populateYears() {
  Object.keys(vehicleData)
    .sort((a, b) => Number(b) - Number(a))
    .forEach((year) => {
      const option = document.createElement("option");
      option.value = year;
      option.textContent = year;
      yearSelect.appendChild(option);
    });
}

function resetSelect(selectElement, placeholder) {
  selectElement.innerHTML = `<option value="">${placeholder}</option>`;
}

function populateMakes(year) {
  resetSelect(makeSelect, "Select Make");
  resetSelect(modelSelect, "Select Model");

  if (!year || !vehicleData[year]) return;

  Object.keys(vehicleData[year]).forEach((make) => {
    const option = document.createElement("option");
    option.value = make;
    option.textContent = make;
    makeSelect.appendChild(option);
  });
}

function populateModels(year, make) {
  resetSelect(modelSelect, "Select Model");

  if (!year || !make || !vehicleData[year] || !vehicleData[year][make]) return;

  vehicleData[year][make].forEach((model) => {
    const option = document.createElement("option");
    option.value = model;
    option.textContent = model;
    modelSelect.appendChild(option);
  });
}

yearSelect.addEventListener("change", () => {
  populateMakes(yearSelect.value);
  vehicleMessage.textContent = "";
  vehicleMessage.className = "vehicle-message";
});

makeSelect.addEventListener("change", () => {
  populateModels(yearSelect.value, makeSelect.value);
  vehicleMessage.textContent = "";
  vehicleMessage.className = "vehicle-message";
});

selectBtn.addEventListener("click", () => {
  const year = yearSelect.value;
  const make = makeSelect.value;
  const model = modelSelect.value;

  vehicleMessage.className = "vehicle-message";

  if (!year || !make || !model) {
    vehicleMessage.textContent = "Complete Year, Make y Model para continuar.";
    vehicleMessage.classList.add("error");
    return;
  }

  const summary = `${year} ${make} ${model}`;
  vehicleMessage.textContent = `Vehículo seleccionado: ${summary}. Portal listo para consulta demo.`;
  vehicleMessage.classList.add("success");

  try {
    localStorage.setItem("chilton_demo_vehicle", summary);
  } catch (error) {
    console.warn("No se pudo guardar en localStorage:", error);
  }
});

resetBtn.addEventListener("click", () => {
  yearSelect.value = "";
  resetSelect(makeSelect, "Select Make");
  resetSelect(modelSelect, "Select Model");
  recentSelect.selectedIndex = 0;
  vehicleMessage.textContent = "Formulario reiniciado.";
  vehicleMessage.className = "vehicle-message success";
});

recentSelect.addEventListener("change", () => {
  if (recentSelect.value === "Last Search" || recentSelect.value === "Saved Demo") {
    const lastVehicle = localStorage.getItem("chilton_demo_vehicle");

    vehicleMessage.className = "vehicle-message";

    if (lastVehicle) {
      vehicleMessage.textContent = `Último vehículo guardado: ${lastVehicle}`;
      vehicleMessage.classList.add("success");
    } else {
      vehicleMessage.textContent = "No hay búsquedas previas guardadas todavía.";
      vehicleMessage.classList.add("error");
    }
  }
});

accessForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const enteredCode = accessCodeInput.value.trim();

  accessMessage.className = "access-message";

  if (!enteredCode) {
    accessMessage.textContent = "Enter the access code first.";
    accessMessage.classList.add("error");
    return;
  }

  if (enteredCode === VALID_CODE) {
    accessMessage.textContent = "Valid code. Opening portal...";
    accessMessage.classList.add("success");

    setTimeout(() => {
      window.open(TARGET_URL, "_blank", "noopener,noreferrer");
    }, 800);
  } else {
    accessMessage.textContent = "Invalid code. Try again.";
    accessMessage.classList.add("error");
  }
});

accessCodeInput.addEventListener("input", function () {
  this.value = this.value.replace(/[^\d]/g, "");
});

populateYears();
