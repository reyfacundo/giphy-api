const img = document.querySelector("img");
const cat = document.querySelector(".cat");
const imgContainer = document.querySelector(".img-container");
const form = document.querySelector("form");
const searchContent = document.querySelector(".search");

async function fetchImg(search = "cats") {
    try {
        const response = await fetch(
            `https://api.giphy.com/v1/gifs/translate?api_key=QYDcK66FzounkHbq2pLGzUetmZ9GyzyH&s=${search}`,
            { mode: "cors" }
        );
        const gif = await response.json();
        searchContent.value = "";
        if (gif.data.length === 0) throw new Error("Empty String");
        if (img.src === gif.data.images.original.url) {
            fetchImg();
            return;
        }
        img.src = gif.data.images.original.url;
        imgContainer.classList.remove("hidden");
    } catch (error) {
        console.error(error);
    }
}
cat.addEventListener("click", (e) => {
    fetchImg();
});
form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetchImg(searchContent.value);
});

//- Promise based version -

// function fetchImg(search = "cats") {
//     fetch(
//         `https://api.giphy.com/v1/gifs/translate?api_key=QYDcK66FzounkHbq2pLGzUetmZ9GyzyH&s=${search}`,
//         { mode: "cors" }
//     )
//         .then(function (response) {
//             console.log(response);
//             return response.json();
//         })
//         .then(function (response) {
//             if(response.data.length === 0) return
//             searchContent.value = ""
//             console.log(img.src);
//             console.log(response.data);
//             imgContainer.classList.remove("hidden");
//             if (img.src === response.data.images.original.url) {
//                 fetchImg();
//                 return;
//             }
//             img.src = response.data.images.original.url;
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// }
