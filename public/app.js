document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;

    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }
});
document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "edit") {
    const title = event.target.dataset.title;
    const id = event.target.dataset.id;

    const editTitle = prompt("Введите новое название", title);
    const newTitle = editTitle ? editTitle : title;

    editNote(id, newTitle).then(() => {
      event.target.closest("li").firstElementChild.textContent = newTitle;
    });
  }
});

async function editNote(id, newTitle) {
  await fetch(`/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ newTitle }),
  });
}

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}
