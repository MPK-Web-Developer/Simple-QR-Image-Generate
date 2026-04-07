let qrInput = document.getElementById("qr-input");
let qrImgBox = document.getElementById("qr-image-container");
let qrImg = document.getElementById("qr-img");
let downloadBtn = document.getElementById("download-btn");

function generateQR() {
  if (qrInput.value.length > 0) {
    let qrURL =
      "https://api.qrserver.com/v1/create-qr-code/?size=512x512&data=" +
      encodeURIComponent(qrInput.value);

    qrImg.src = qrURL;
    qrImgBox.classList.add("show-img");

    // ✅ show download button
    downloadBtn.style.display = "block";

    // ✅ store URL for download
    downloadBtn.onclick = async function () {
      try {
        const response = await fetch(qrURL);
        const blob = await response.blob();

        const blobURL = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = blobURL;
        link.download = "qr-code.png";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        window.URL.revokeObjectURL(blobURL);
      } catch (error) {
        console.error("Download failed", error);
      }
    };
  } else {
    qrImgBox.classList.add("error");

    setTimeout(() => {
      qrImgBox.classList.remove("error");
    }, 1000);
  }
}
