const img = document.querySelector("img");
const cat = document.querySelector(".cat");
const imgContainer = document.querySelector(".img-container");
const form = document.querySelector("form");
const searchContent = document.querySelector(".search");

function fetchImg(search = "cats") {
    fetch(
        `https://api.giphy.com/v1/gifs/translate?api_key=QYDcK66FzounkHbq2pLGzUetmZ9GyzyH&s=${search}`,
        { mode: "cors" }
    )
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (response) {
            if(response.data.length === 0) return
            searchContent.value = ""
            console.log(img.src);
            console.log(response.data);
            imgContainer.classList.remove("hidden");
            if (img.src === response.data.images.original.url) {
                fetchImg();
                return;
            }
            img.src = response.data.images.original.url;
        })
        .catch(function (error) {
            console.log(error);
        });
}
cat.addEventListener("click", (e) => {
    fetchImg();
});
form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetchImg(searchContent.value);
    console.log(searchContent.value);
});