const showEditButton = document.getElementById("show-edit");
const editCommentForm = document.getElementById("edit-comment-form");

showEditButton.addEventListener("click", event => {
    editCommentForm.removeAttribute("hidden");
    showEditButton.setAttribute("hidden", true);
});