const likeButton = document.getElementById("likeButton");
if (likeButton) likeButton.addEventListener("click", async event => {
    const storyId = event.target.dataset.storyId;
    try {
        // let fetching = await fetch(`/comments/create/${storyId}`, {method: "PATCH"})
        let fetching = await fetch(`/stories/${storyId}`, { method: "PATCH" });
        let obj = await fetching.json();
        document.getElementById("likes").innerHTML = `${obj.likes} people like this!`;
    } catch(error) {
        console.error(error);
    }
});
