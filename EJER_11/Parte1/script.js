document.addEventListener("DOMContentLoaded", function () {
  const profileContainer = document.getElementById("user-profile");
  let userData = {};
  let editing = false;

  const xhr = new XMLHttpRequest();
  xhr.open("GET", "user_data.json", true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      userData = JSON.parse(xhr.responseText);
      renderProfile(userData);
    } else {
      profileContainer.innerHTML = `<div class="alert alert-danger">Error al cargar los datos del usuario.</div>`;
    }
  };
  xhr.send();

  function renderProfile(data) {
    const personal = data.personalInfo;
    const address = data.address;
    const hobbies = data.hobbies.join(", ");

    profileContainer.innerHTML = `
      <form id="profile-form">
        <h4>Información Personal</h4>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label">Nombre</label>
            <input type="text" class="form-control" id="firstName" value="${personal.firstName}" readonly>
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Apellidos</label>
            <input type="text" class="form-control" id="lastName" value="${personal.lastName}" readonly>
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Email</label>
            <input type="email" class="form-control" id="email" value="${personal.email}" readonly>
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Teléfono</label>
            <input type="text" class="form-control" id="phone" value="${personal.phone}" readonly>
          </div>
        </div>

        <h4>Dirección</h4>
        <div class="mb-3">
          <label class="form-label">Calle</label>
          <input type="text" class="form-control" id="street" value="${address.street}" readonly>
        </div>
        <div class="row">
          <div class="col-md-4 mb-3">
            <label class="form-label">Ciudad</label>
            <input type="text" class="form-control" id="city" value="${address.city}" readonly>
          </div>
          <div class="col-md-4 mb-3">
            <label class="form-label">Código Postal</label>
            <input type="text" class="form-control" id="zipCode" value="${address.zipCode}" readonly>
          </div>
          <div class="col-md-4 mb-3">
            <label class="form-label">País</label>
            <input type="text" class="form-control" id="country" value="${address.country}" readonly>
          </div>
        </div>

        <h4>Hobbies</h4>
        <div class="mb-3">
          <textarea class="form-control" id="hobbies" rows="2" readonly>${hobbies}</textarea>
        </div>

        <div class="text-end">
          <button type="button" id="edit-btn" class="btn btn-primary">Editar</button>
        </div>
      </form>
    `;

    document.getElementById("edit-btn").addEventListener("click", toggleEditMode);
  }

  function toggleEditMode() {
    const inputs = profileContainer.querySelectorAll("input, textarea");
    const btn = document.getElementById("edit-btn");

    if (!editing) {
      inputs.forEach(i => i.removeAttribute("readonly"));
      btn.textContent = "Guardar cambios";
      btn.classList.replace("btn-primary", "btn-success");
      editing = true;
    } else {
      btn.disabled = true;
      btn.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Guardando...`;

      const updatedData = {
        personalInfo: {
          firstName: document.getElementById("firstName").value,
          lastName: document.getElementById("lastName").value,
          email: document.getElementById("email").value,
          phone: document.getElementById("phone").value
        },
        address: {
          street: document.getElementById("street").value,
          city: document.getElementById("city").value,
          zipCode: document.getElementById("zipCode").value,
          country: document.getElementById("country").value
        },
        hobbies: document.getElementById("hobbies").value.split(",").map(h => h.trim())
      };

      const postXhr = new XMLHttpRequest();
      const endpoint = "https://cors-anywhere.herokuapp.com/https://webhook.site/2b59f485-bbd8-4e87-af7e-f26430b443ff";
      postXhr.open("POST", endpoint, true);
      postXhr.setRequestHeader("Content-Type", "application/json");

      postXhr.onload = function () {
        btn.disabled = false;
        if (postXhr.status >= 200 && postXhr.status < 300) {
          alert("Cambios guardados correctamente.");
          editing = false;
          inputs.forEach(i => i.setAttribute("readonly", true));
          btn.textContent = "Editar";
          btn.classList.replace("btn-success", "btn-primary");
        } else {
          alert("Error al guardar los cambios. Inténtalo de nuevo.");
        }
      };

      postXhr.onerror = function () {
        btn.disabled = false;
        alert("Error de conexión.");
      };

      postXhr.send(JSON.stringify(updatedData));
    }
  }
});
