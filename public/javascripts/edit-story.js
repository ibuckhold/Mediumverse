const showEditButtons = document.querySelectorAll('[id^="show-edit"]');
const commentForm = document.querySelector('#create-comment-form');
const showCommentsButton = document.getElementById('show-comments');
const closeCommentsButton = document.getElementById('close-comments');
const deleteCommentButtons = document.querySelectorAll('input[name=delete-comment]');
const deleteHideButton = document.getElementById('[id^="show-delete"]');
const submitCommentButton = document.getElementById('submit-comment-button');
const csrfToken = document.getElementsByName('_csrf');

// console.log(commentForm)
// commentForm.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const formData = new FormData(commentForm)
//     console.log('user---', user)
//     console.log('target', e.target)

// })

function createCommentElement(commentId, commentText, username, createdDate, csrfToken) {
    // div(class='user-comments' data-comment-id=comment.id)
    const commentElement = document.createElement("div");
    commentElement.classList.add("user-comments");
    commentElement.dataset.commentId = commentId;

    // span(id='two' class='comment-creator') #{comment.User.username}
    const creator = document.createElement("span");
    creator.classList.add("comment-creator");
    creator.innerText = username;

    // div(class='posted-time') Posted: #{comment.createdAt.toLocaleDateString("en-US")}
    const postedTime = document.createElement("div");
    postedTime.classList.add("posted-time");
    postedTime.innerText = "Posted: " + createdDate;

    //  div(id='comment-body' class='comment-body')
    const commentBody = document.createElement("div");
    commentBody.classList.add("comment-body");

    // span(id='one' class='comment-text') #{comment.text}
    const displayCommentText = document.createElement("span");
    displayCommentText.classList.add("comment-text");
    displayCommentText.innerText = commentText;

    // div(id = 'comment-buttons-div' class= 'comment-buttons-div')
    const commentButtonsDiv = document.createElement("div");
    commentButtonsDiv.classList.add("comment-buttons-div");

    // input(type = "button" name = "show-edit" id = `show-edit-${comment.id}` value = "Edit" class= 'comment-div-buttons')
    const showEditButton = document.createElement("input");
    showEditButton.classList.add("comment-div-buttons");
    showEditButton.setAttribute("type", "button");
    showEditButton.setAttribute("name", "show-edit");
    showEditButton.setAttribute("id", `show-edit-${commentId}`);
    showEditButton.setAttribute("value", "Edit");
    showEditButton.addEventListener("click", event => {
        showEditButtonCb(showEditButton, commentId);
    })

    // form(action = `/comments/edit/${comment.id}` method = "post" id = `edit-comment-form-${comment.id}` class= 'edit-form' hidden)
    const editForm = document.createElement("form");
    editForm.classList.add("edit-form");
    editForm.setAttribute("action", `/comments/edit/${commentId}`);
    editForm.setAttribute("method", "post");
    editForm.setAttribute("id", `edit-comment-form-${commentId}`);
    editForm.setAttribute("hidden", true);

    // input(type = 'hidden', name = '_csrf', value = csrfToken)
    const csrf = document.createElement("input");
    csrf.setAttribute("type", "hidden");
    csrf.setAttribute("name", "_csrf");
    csrf.setAttribute("value", csrfToken);

    // div(class='form-group')
    const formGroup = document.createElement("div");
    formGroup.classList.add("form-group");
    
    // textarea(id=fieldName name=fieldName class=`form-control ${classes}` rows='5' placeholder=placeholder)= fieldValue
    const editCommentTextArea = document.createElement("textarea");
    editCommentTextArea.classList.add("form-control")
    editCommentTextArea.setAttribute("name", "text");
    editCommentTextArea.setAttribute("rows", "5");
    editCommentTextArea.setAttribute("placeholder", "Edit comment...");

    // button(type="submit" class='comment-div-buttons') Confirm
    const editSubmit = document.createElement("button");
    editSubmit.classList.add("comment-div-buttons")
    editSubmit.setAttribute("type", "submit");
    editSubmit.innerText = "Confirm";

    // input(type="button" name="delete-comment" id=`${comment.id}` value="Delete" class='comment-div-buttons ')
    const deleteSubmit = document.createElement("input");
    deleteSubmit.classList.add("comment-div-buttons")
    deleteSubmit.setAttribute("type", "button");
    deleteSubmit.setAttribute("name", "delete-comment");
    deleteSubmit.setAttribute("id", commentId);
    deleteSubmit.setAttribute("value", "Delete");
     
    // Top-level comment.
    commentElement.appendChild(creator);

    // Append created time to comment.
    commentElement.appendChild(postedTime);

    // Append existing comment body text to comment.
    commentElement.appendChild(commentBody);
    commentBody.appendChild(displayCommentText)

    // Append buttons.
    commentElement.appendChild(commentButtonsDiv);
    commentButtonsDiv.appendChild(showEditButton);
    commentButtonsDiv.appendChild(editForm);

    // Append form.
    editForm.appendChild(csrf);
    editForm.appendChild(formGroup);
    editForm.appendChild(editSubmit);
    editForm.appendChild(deleteSubmit);
    formGroup.appendChild(editCommentTextArea);
    
    return commentElement;
}

submitCommentButton.addEventListener('click', async (e) => {
    console.log("clicked scb");
    const addCommentText = document.getElementById('add-text');
    const commentText = addCommentText.value;

    const commentSection = document.getElementById('comment-section');

    const storyId = commentSection.dataset.storyId;
    const token = csrfToken[0].value;

    const commentsContainer = document.getElementById("all-comments");

    // console.log(token);
    // return;

    try {
        const body = {
            _csrf: token,
            text: commentText
        }
        const res = await fetch(`/comments/create/${storyId}`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json',
            }
        });

        if (!res.ok) {
            throw res;
        }

        const resJson = await res.json();

        // console.log(resJson);
        const {
            commentId,
            username,
            createdDate
        } = resJson;

        const comment = createCommentElement(commentId, commentText, username, createdDate, token);
        commentsContainer.prepend(comment);

    } catch (err) {
        console.error(err);
    }
});

const showEditButtonCb = (showEditButton, commentId) => {
    const editFormId = 'edit-comment-form-' + commentId
    const editCommentForm = document.getElementById(editFormId)
    editCommentForm.removeAttribute("hidden");
    showEditButton.setAttribute("hidden", true);
    // deleteHideButton.setAttribute("hidden", true);
};

showEditButtons.forEach(showEditButton => {
    const commentId = showEditButton.id.slice(10)
    showEditButton.addEventListener("click", event => {
        showEditButtonCb(showEditButton, commentId);
    });
});

showCommentsButton.addEventListener('click', event => {
    const commentForm = document.getElementById('comment-section')
    console.log('show comments')
    if (commentForm.style.visibility === 'hidden') {
        commentForm.style.visibility = 'visible';
    } else {
        commentForm.style.visibility = 'hidden';
    }
});

closeCommentsButton.addEventListener('click', event => {
    const commentForm = document.getElementById('comment-section')
    console.log('exit comment')
    commentForm.style.visibility = 'hidden';
});

deleteCommentButtons.forEach((deleteCommentButton) => {
    deleteCommentButton.addEventListener('click', async (event) => {
        const commentId = event.target.id;
        const ele = document.querySelector(`[data-comment-id="${commentId}"]`)
        // console.log(ele);
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