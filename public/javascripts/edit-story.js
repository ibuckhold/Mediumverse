
const showEditButtons = document.querySelectorAll('[id^="show-edit"]');

const showCommentsButton = document.getElementById('show-comments')
const closeCommentsButton = document.getElementById('close-comments');
const deleteCommentButtons = document.querySelectorAll('input[name=delete-comment]')
const deleteHideButton = document.getElementById('[id^="show-delete"]')

showEditButtons.forEach(showEditButton => {
    showEditButton.addEventListener("click", event => {
        const commentId = showEditButton.id.slice(10)
        const editFormId = 'edit-comment-form-' + commentId
        const editCommentForm = document.getElementById(editFormId)
        editCommentForm.removeAttribute("hidden");
        showEditButton.setAttribute("hidden", true);
        deleteHideButton.setAttribute("hidden", true);
    })
});

showCommentsButton.addEventListener('click', event => {
    const commentForm = document.getElementById('comment-section')
    if (commentForm.style.visibility === 'hidden') {
        commentForm.style.visibility = 'visible';
    } else {
        commentForm.style.visibility = 'hidden';
    }
})

closeCommentsButton.addEventListener('click', event => {
    const commentForm = document.getElementById('comment-section')
    commentForm.style.visibility = 'hidden';
})

deleteCommentButtons.forEach((deleteCommentButton) => {
    deleteCommentButton.addEventListener('click', async (event) => {
        const commentId = event.target.id
        const ele = document.querySelector(`[data-comment-id="${commentId}"]`)
        try {
            const res = await fetch(`/comments/delete/${commentId}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                }
            });
            if (!res.ok) {
                throw res;
            }

            // const data = await res.json()
            // console.log(data)
            ele.remove()
        } catch (err) {
            console.error(err)
        }
    })
})
