const commentLikes = document.querySelectorAll(`.commentlikeButton`); // -${dataset.commentId}
commentLikes.forEach(likeButton => {
    likeButton.addEventListener("click", async event => {
        // const storyId = event.target.dataset.storyId;
        const commentId = event.target.dataset.commentId;
        console.log(commentId)
        try {
            // let fetching = await fetch(`/stories/${storyId}`, {method: "PATCH"})
            let fetching = await fetch(`/comments/${commentId}`, {method: "PATCH" });
            console.log(fetching)
            let obj = await fetching.json();
            console.log(obj)
            document.getElementById(`likes-${commentId}`).innerHTML = `${obj.likes} people like this!`;
        } catch(error) {
            console.error(error);
        }
    });
})
