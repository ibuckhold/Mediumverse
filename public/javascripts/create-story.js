const hiddenInput = document.querySelector(".categoryInput");
const categoryOptions = document.querySelectorAll(".categoryOption");

document.querySelector(".categoryDiv").addEventListener("click", event => {
    if(event.target.classList.contains("categoryOption")){
        categoryOptions.forEach(option => {
            option.classList.remove("userSelected");
        });

        event.target.classList.add("userSelected");
        hiddenInput.value = event.target.parentElement.dataset.categoryId;
        //event.target = span
        //parentElement = div the span is in
    }
});
