const hiddenInput = document.querySelector(".categoryInput");
const categoryOptions = document.querySelectorAll(".categoryOption");

document.querySelector(".categoryDiv").addEventListener("click", event => {
    console.log(event.target);
    if(event.target.classList.contains("categoryOption")){
        console.log(event.target);
        categoryOptions.forEach(option => {
            option.classList.remove("userSelected");
        });

        event.target.classList.add("userSelected");

        hiddenInput.id = event.target.parentElement.dataset.categoryId;
        //event.target = span
        //parentElement = div the span is in

    }
});
