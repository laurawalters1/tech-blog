const updatePostFormHandler = async (event) => {
  event.preventDefault();
  console.log("update post");
  const id = event.target.getAttribute("data-id");
  const title = document.querySelector("#title").value.trim();
  const body = document.querySelector("#body").value.trim();

  if (title && body) {
    const response = await fetch("/api/posts/update", {
      method: "PUT",
      body: JSON.stringify({ title, body, id }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".update-post-form")
  .addEventListener("submit", updatePostFormHandler);
