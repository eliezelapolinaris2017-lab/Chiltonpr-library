const accessForm = document.getElementById("accessForm");
const accessCodeInput = document.getElementById("accessCode");
const messageBox = document.getElementById("messageBox");

const VALID_CODE = "100003000";
const TARGET_URL = "https://ohioweblibrary.org/db/chilton";

accessForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const enteredCode = accessCodeInput.value.trim();

  messageBox.className = "message-box";

  if (!enteredCode) {
    messageBox.textContent = "Ingrese un código para continuar.";
    messageBox.classList.add("error");
    return;
  }

  if (enteredCode === VALID_CODE) {
    messageBox.textContent = "Código válido. Redirigiendo al portal...";
    messageBox.classList.add("success");

    setTimeout(() => {
      window.open(TARGET_URL, "_blank", "noopener,noreferrer");
    }, 900);
  } else {
    messageBox.textContent = "Código inválido. Verifique e intente otra vez.";
    messageBox.classList.add("error");
  }
});

accessCodeInput.addEventListener("input", function () {
  this.value = this.value.replace(/[^\d]/g, "");
});
