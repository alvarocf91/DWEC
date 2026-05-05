const cart = [];

function openModal(id){ document.getElementById(id).style.display="flex"; }
function closeModal(id){ document.getElementById(id).style.display="none"; }

document.querySelectorAll("[data-close]").forEach(btn=>{
  btn.addEventListener("click", ()=> {
    const modal = btn.closest(".modal");
    if(modal) modal.style.display="none";
  });
});

document.getElementById("botonCarrito").addEventListener("click", ()=>{ renderCart(); openModal("modalCarrito"); });
document.getElementById("botonLogin").addEventListener("click", ()=>openModal("modalLogin"));
document.getElementById("botonPerfil").addEventListener("click", ()=>openModal("modalPerfil"));

document.getElementById("selectColeccion").addEventListener("change", ()=>{
  const valor = document.getElementById("selectColeccion").value;
  document.querySelectorAll(".producto").forEach(prod=>{
    prod.style.display = (!valor || prod.dataset.coleccion===valor) ? "block" : "none";
  });
});

document.querySelectorAll(".producto").forEach(prod=>{
  prod.querySelector(".btn-detalle").addEventListener("click", ()=>{
    document.getElementById("tituloDetalle").textContent = prod.dataset.nombre;
    document.getElementById("descripcionDetalle").textContent = prod.dataset.descripcion;
    document.getElementById("precioDetalle").textContent = prod.querySelector("p").textContent;
    document.getElementById("imgDetalle").src = prod.querySelector("img").src;
    openModal("modalDetalles");
  });

  prod.querySelector(".btn-agregar").addEventListener("click", ()=> addToCart(prod));
});

function addToCart(prod){
  const nombre = prod.dataset.nombre;
  const precio = parseFloat(prod.querySelector("p").textContent.replace("€",""));
  const img = prod.querySelector("img").src;

  const existing = cart.find(item=>item.nombre===nombre);
  if(existing){ existing.cantidad++; } else { cart.push({nombre, precio, img, cantidad:1}); }

  renderCart();
  openModal("modalCarrito");
}

function renderCart(){
  const container = document.getElementById("itemsCarrito");
  container.innerHTML="";
  let total = 0;

  if(cart.length===0){ container.innerHTML="<p>Carrito vacío.</p>"; }

  cart.forEach((item,index)=>{
    total += item.precio*item.cantidad;
    const div = document.createElement("div");
    div.style.display="flex";
    div.style.alignItems="center";
    div.style.gap="8px";
    div.style.marginBottom="10px";
    div.style.flexWrap="wrap";
    div.innerHTML=`
      <img src="${item.img}" alt="${item.nombre}" width="50">
      <span>${item.nombre}</span>
      <span>${item.precio.toFixed(2)}€</span>
      <button class="btn-minus">-</button>
      <span>${item.cantidad}</span>
      <button class="btn-plus">+</button>
      <button class="btn-remove">X</button>
    `;

    div.querySelector(".btn-minus").addEventListener("click", ()=>{
      if(item.cantidad>1) item.cantidad--; else cart.splice(index,1);
      renderCart();
    });
    div.querySelector(".btn-plus").addEventListener("click", ()=>{
      item.cantidad++;
      renderCart();
    });
    div.querySelector(".btn-remove").addEventListener("click", ()=>{
      cart.splice(index,1);
      renderCart();
    });

    container.appendChild(div);
  });

  document.getElementById("totalCarrito").textContent = total.toFixed(2)+"€";
}

document.getElementById("botonVaciarCarrito").addEventListener("click", ()=>{
  cart.length=0;
  renderCart();
});

document.getElementById("formLogin").addEventListener("submit", e=>{
  e.preventDefault(); closeModal("modalLogin"); alert("Inicio de sesión simulado.");
});
document.getElementById("formPerfil").addEventListener("submit", e=>{
  e.preventDefault(); closeModal("modalPerfil"); alert("Perfil guardado (simulado).");
});
