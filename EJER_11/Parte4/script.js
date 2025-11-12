document.addEventListener("DOMContentLoaded", () => {
  const userWidget = document.getElementById("user-widget");
  const postsWidget = document.getElementById("posts-widget");
  const spinner = document.getElementById("loading-spinner");

  spinner.style.display = "block";

  const userUrl = "https://jsonplaceholder.typicode.com/users/1";
  const postsUrl = "https://jsonplaceholder.typicode.com/posts?userId=1";

  const userPromise = fetch(userUrl)
    .then(res => {
      if (!res.ok) throw new Error("Error al obtener el usuario");
      return res.json();
    })
    .catch(() => {
      userWidget.innerHTML = "<p>Error al cargar la información del usuario.</p>";
      return null;
    });

  const postsPromise = fetch(postsUrl)
    .then(res => {
      if (!res.ok) throw new Error("Error al obtener los posts");
      return res.json();
    })
    .catch(() => {
      postsWidget.innerHTML = "<p>Error al cargar los posts.</p>";
      return null;
    });

  Promise.all([userPromise, postsPromise])
    .then(([userData, postsData]) => {
      spinner.style.display = "none"; 

      if (userData) {
        userWidget.innerHTML = `
          <h2>Usuario</h2>
          <p><strong>Nombre:</strong> ${userData.name}</p>
          <p><strong>Email:</strong> ${userData.email}</p>
          <p><strong>Compañía:</strong> ${userData.company.name}</p>
        `;
      }

      if (postsData && Array.isArray(postsData)) {
        const lastThree = postsData.slice(-3);
        let html = "<h2>Últimos Posts</h2>";
        lastThree.forEach(p => {
          html += `
            <div>
              <h4>${p.title}</h4>
              <p>${p.body}</p>
            </div>
          `;
        });
        postsWidget.innerHTML = html;
      }

      if (!userData && !postsData) {
        spinner.style.display = "none";
        userWidget.innerHTML = "<p>Error general: no se pudo obtener la información.</p>";
      }
    });
});
