const showEditButtons = document.querySelectorAll('[id^="show-edit"]');

showEditButtons.forEach(showEditButton => {
    showEditButton.addEventListener("click", event => {
        const commentId = showEditButton.id.slice(10)
        const editFormId = 'edit-comment-form-' + commentId
        const editCommentForm = document.getElementById(editFormId)
        editCommentForm.removeAttribute("hidden");
        showEditButton.setAttribute("hidden", true);
    })
});