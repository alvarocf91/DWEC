document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  const categoryFilter = document.getElementById("categoryFilter");
  const brandFilter = document.getElementById("brandFilter");
  const sortPrice = document.getElementById("sortPrice");

  let products = [];

  fetch("products.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Error al cargar los productos.");
      }
      return response.json();
    })
    .then(data => {
      products = data;
      renderFilters(products);
      renderProducts(products);
    })
    .catch(error => {
      productList.innerHTML = "<p>No se pudieron cargar los productos.</p>";
      console.error(error);
    });

  function renderProducts(items) {
    productList.innerHTML = "";
    if (items.length === 0) {
      productList.innerHTML = "<p>No hay productos que coincidan con los filtros.</p>";
      return;
    }

    items.forEach(p => {
      const div = document.createElement("div");
      div.style.border = "1px solid #ccc";
      div.style.padding = "10px";
      div.style.margin = "10px";
      div.innerHTML = `
        <h3>${p.name}</h3>
        <p><strong>Marca:</strong> ${p.brand}</p>
        <p><strong>Categoría:</strong> ${p.category}</p>
        <p><strong>Precio:</strong> $${p.price.toFixed(2)}</p>
      `;
      productList.appendChild(div);
    });
  }

  function renderFilters(data) {
    const categories = ["all", ...new Set(data.map(p => p.category))];
    const brands = ["all", ...new Set(data.map(p => p.brand))];

    categories.forEach(c => {
      const opt = document.createElement("option");
      opt.value = c;
      opt.textContent = c;
      categoryFilter.appendChild(opt);
    });

    brands.forEach(b => {
      const opt = document.createElement("option");
      opt.value = b;
      opt.textContent = b;
      brandFilter.appendChild(opt);
    });
  }

  function updateCatalog() {
    let filtered = [...products];

    const selectedCategory = categoryFilter.value;
    const selectedBrand = brandFilter.value;
    const sortValue = sortPrice.value;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (selectedBrand !== "all") {
      filtered = filtered.filter(p => p.brand === selectedBrand);
    }

    if (sortValue === "asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortValue === "desc") {
      filtered.sort((a, b) => b.price - a.price);
    }

    renderProducts(filtered);
  }

  categoryFilter.addEventListener("change", updateCatalog);
  brandFilter.addEventListener("change", updateCatalog);
  sortPrice.addEventListener("change", updateCatalog);
});
