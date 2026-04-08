let qrInput = document.getElementById("qr-input");
let qrImgBox = document.getElementById("qr-image-container");
let qrImg = document.getElementById("qr-img");
let downloadBtn = document.getElementById("download-btn");
let loader = document.getElementById("loader");
let formatSelect = document.getElementById("format-select");
let qualitySelect = document.getElementById("quality-select");

function generateQR() {
  if (qrInput.value.length > 0) {
    loader.style.display = "block";
    qrImg.style.display = "none";
    downloadBtn.style.display = "none";

    let format = formatSelect.value;
    let size = qualitySelect.value;

    // ✅ IMPORTANT: format சேர்க்கணும்
    let qrURL =
      "https://api.qrserver.com/v1/create-qr-code/?size=" +
      size +
      "x" +
      size +
      "&format=" +
      format + // 🔥 FIX
      "&data=" +
      encodeURIComponent(qrInput.value);

    qrImg.onload = function () {
      loader.style.display = "none";
      qrImg.style.display = "block";
      qrImgBox.classList.add("show-img");
      downloadBtn.style.display = "block";
    };

    qrImg.src = qrURL;

    // ✅ Download logic
    downloadBtn.onclick = async function () {
      try {
        const response = await fetch(qrURL); // 🔥 use same URL
        const blob = await response.blob();

        const blobURL = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = blobURL;

        let fileName = qrInput.value.replace(/\s+/g, "_").substring(0, 10);

        // ✅ format + size correct
        link.download = `${fileName}-${size}.${format}`;

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
