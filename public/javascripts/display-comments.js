const commentLikes = document.querySelectorAll(".commentlikeButton");
commentLikes.forEach(likeButton => {
    likeButton.addEventListener("click", async event => {
        const storyId = event.target.dataset.storyId;
        const commentId = event.target.dataset.commentId;

        try {
            let fetching = await fetch(`/stories/${commentId}`, {method: "PATCH"})
            let obj = await fetching.json();
            document.getElementById("commentLikes").innerHTML = `${obj.likes} people like this!`;
        } catch(error) {
            console.error(error);
        }
    });
})
