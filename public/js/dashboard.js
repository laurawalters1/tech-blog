const createPostFormHandler = async (event) => {
  event.preventDefault();
  console.log("create post");
  const title = document.querySelector("#title").value.trim();
  const body = document.querySelector("#body").value.trim();

  if (title && body) {
    const response = await fetch("/api/posts/create", {
      method: "POST",
      body: JSON.stringify({ title, body }),
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
  .querySelector(".create-post-form")
  .addEventListener("submit", createPostFormHandler);
