let qrInput = document.getElementById("qr-input");
let qrImgBox = document.getElementById("qr-image-container");
let qrImg = document.getElementById("qr-img");

function generateQR() {
  if (qrInput.value.length > 0) {
    qrImg.src =
      "https://api.qrserver.com/v1/create-qr-code/?size=512x512&data=" +
      qrInput.value;
    qrImgBox.classList.add("show-img");
  } else {
    qrImgBox.classList.add("error");
    setTimeout(() => {
      qrImgBox.classList.remove("error");
    }, 1000);
  }
}
