import "./styles.css";

const count = 10;
// Normally, don't store API Keys like this, but an exception made here because it is free, and the data is publicly available!
const apiKey = "7ZeDPa45KRVCEAsd1BzLoiDGN4p2gyQHuOSdjQg1xv8";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

const imagecontainer = document.getElementById("image-container");

let imageList = [],
  ready = false,
  imgNumber = 0;

/* fetch images */
async function fetchImages() {
  try {
    const images = await fetch(apiUrl);
    imageList = await images.json();
    console.log(imageList);

    imageList.forEach((image) => {
      createImageTag(image?.urls?.regular);
    });
  } catch (error) {
    console.log(error);
  }
}

function createImageTag(url) {
  const img = document.createElement("img");
  imgNumber = 0;
  img.setAttribute("src", url);
  img.addEventListener("load", (e) => {
    imgNumber++;
    console.log("loaded image", imgNumber);
  });
  imagecontainer.appendChild(img);
  console.log(imgNumber);
  if (imgNumber === count) ready = true;
}

window.addEventListener("scroll", () => {
  console.log(
    ready,
    window.scrollY,
    window.innerHeight,
    document.body.offsetHeight,
    window.innerHeight + window.scrollY,
    document.body.offsetHeight - 700
  );
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 700) {
    ready = false;
    fetchImages();
  }
});

fetchImages();
