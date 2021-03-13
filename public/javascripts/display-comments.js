const commentLikes = document.querySelectorAll(`.commentlikeButton`); // -${dataset.commentId}
commentLikes.forEach(likeButton => {
    likeButton.addEventListener("click", async event => {
        // const storyId = event.target.dataset.storyId;
        const commentId = event.target.dataset.commentId;
        try {
            // let fetching = await fetch(`/stories/${storyId}`, {method: "PATCH"})
            let fetching = await fetch(`/comments/${commentId}`, {method: "PATCH" });
            let obj = await fetching.json();
            document.getElementById(`likes-${commentId}`).innerHTML = `${obj.likes} people like this!`;
        } catch(error) {
            console.error(error);
        }
    });
})
