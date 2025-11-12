document.addEventListener("DOMContentLoaded", function() {
  var list = document.getElementById("comments-list");
  var form = document.getElementById("comment-form");
  var author = document.getElementById("author");
  var commentText = document.getElementById("commentText");

  var xhrGet = new XMLHttpRequest();
  xhrGet.open("GET", "comments_initial.json", true);
  xhrGet.onload = function() {
    if (xhrGet.status === 200) {
      var comments = JSON.parse(xhrGet.responseText);
      comments.forEach(function(c) {
        addComment(c);
      });
    } else {
      console.log("Error al cargar los comentarios iniciales");
    }
  };
  xhrGet.onerror = function() {
    console.log("Error de red al obtener los comentarios");
  };
  xhrGet.send();

  function addComment(comment) {
    var li = document.createElement("li");
    li.innerHTML = "<strong>" + comment.author + ":</strong> " +
                   comment.text + "<br><small>" +
                   new Date(comment.timestamp).toLocaleString() + "</small>";
    list.prepend(li);
  }

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    var newComment = {
      author: author.value.trim(),
      text: commentText.value.trim(),
      timestamp: new Date().toISOString()
    };

    if (!newComment.author || !newComment.text) {
      alert("Por favor completa todos los campos");
      return;
    }

    var xhrPost = new XMLHttpRequest();
    var url = "https://cors-anywhere.herokuapp.com/https://webhook.site/";
    xhrPost.open("POST", url, true);
    xhrPost.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhrPost.onload = function() {
      if (xhrPost.status >= 200 && xhrPost.status < 300) {
        console.log("Comentario enviado correctamente (simulado)");
        addComment(newComment); 
        form.reset();
      } else {
        console.log("Error al enviar el comentario");
      }
    };

    xhrPost.onerror = function() {
      console.log("Error de red al enviar el comentario");
    };

    xhrPost.send(JSON.stringify(newComment));
  });
});
