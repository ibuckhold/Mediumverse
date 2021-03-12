const followBtn = document.getElementById("followButton")
followBtn.addEventListener("click", async(event) => {
    //add and remove following class so button can change
    //true or false for following
    //create a new follow, USER= followerId = req.session.auth.id
    //find id of user they want to follow
    const otherUser = event.target.dataset.otherUserId;
    console.log(event.target.dataset)
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
