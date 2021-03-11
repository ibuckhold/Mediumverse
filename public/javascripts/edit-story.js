const showEditButtons = document.querySelectorAll('[id^="show-edit"]');

const showCommentsButton = document.getElementById('show-comments')
const closeCommentsButton = document.getElementById('close-comments')

showEditButtons.forEach(showEditButton => {
    showEditButton.addEventListener("click", event => {
        const commentId = showEditButton.id.slice(10)
        const editFormId = 'edit-comment-form-' + commentId
        const editCommentForm = document.getElementById(editFormId)
        editCommentForm.removeAttribute("hidden");
        showEditButton.setAttribute("hidden", true);
    })
});

showCommentsButton.addEventListener('click', event => {
    const commentForm = document.getElementById('comment-section')
    console.log('show comments')
    if (commentForm.style.visibility === 'hidden') {
        commentForm.style.visibility = 'visible';
    } else {
        commentForm.style.visibility = 'hidden';
    }
})

closeCommentsButton.addEventListener('click', event => {
    const commentForm = document.getElementById('comment-section')
    console.log('exit comment')
    commentForm.style.visibility = 'hidden';
})