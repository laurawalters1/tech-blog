console.log("postjs");

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");
    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to delete project");
    }
  }
};

const commentFormHandler = async (event) => {
  console.log("comment form hit");
  if (event.target.hasAttribute("data-id")) {
    const post_id = event.target.getAttribute("data-id");
    const body = document.querySelector("#body").value.trim();

    const response = await fetch(`/api/comments/`, {
      method: "POST",
      body: JSON.stringify({ body, post_id }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to add comment");
    }
  }
};
if (document.querySelector(".del-button")) {
  document
    .querySelector(".del-button")
    .addEventListener("click", delButtonHandler);
}
document
  .querySelector(".comment-form")
  .addEventListener("submit", commentFormHandler);
