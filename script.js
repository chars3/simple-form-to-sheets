document.getElementById("dataForm").addEventListener("submit", function (e) {
  e.preventDefault();
  var formData = new FormData(this);
  var botaoEnviar = document.getElementById("botaoEnviar");

  botaoEnviar.disabled = true;
  botaoEnviar.classList.add("loading");
  botaoEnviar.textContent = "Enviando";

  fetch(process.env.GOOGLE_SCRIPT_URL, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
      botaoEnviar.textContent = "Dados enviados!";
      botaoEnviar.classList.remove("loading");
      botaoEnviar.disabled = false;
      document.getElementById("dataForm").reset();
    })
    .catch((error) => {
      console.error("Erro:", error);
      botaoEnviar.textContent = "Erro ao enviar dados!";
      botaoEnviar.classList.remove("loading");
      botaoEnviar.disabled = false;
    });
});

//===== MáscaraTelefone =====
const handlePhone = (event) => {
  let input = event.target;
  input.value = phoneMask(input.value);
};

const phoneMask = (value) => {
  if (!value) return "";
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d{2})(\d)/, "($1) $2");
  value = value.replace(/(\d)(\d{4})$/, "$1-$2");
  return value;
};
