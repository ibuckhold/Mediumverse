const followBtn = document.getElementById("followButton")
followBtn.addEventListener("click", async(event) => {
    const otherUser = event.target.dataset.otherUserId;
    try {
        const fetching = await fetch(`following/${otherUser}`, {method: "PATCH"});
        let obj= await fetching.json();
        if (obj.isFollowing) {
            followBtn.classList.add("following");
            followBtn.innerHTML = "Following"
        } else {
            followBtn.classList.remove("following");
            followBtn.innerHTML = "Follow"
        }
    } catch(err) {
        console.error(err);
    }
})
