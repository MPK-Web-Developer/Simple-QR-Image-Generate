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
    let size = parseInt(qualitySelect.value);

    // 🔗 QR API
    let qrURL =
      "https://api.qrserver.com/v1/create-qr-code/?size=" +
      size +
      "x" +
      size +
      "&data=" +
      encodeURIComponent(qrInput.value);

    // 🖼️ Load image
    qrImg.onload = function () {
      loader.style.display = "none";
      qrImg.style.display = "block";
      qrImgBox.classList.add("show-img");
      downloadBtn.style.display = "block";
    };

    qrImg.src = qrURL;

    // ⬇️ Download (HD Fix using Canvas)
    downloadBtn.onclick = async function () {
      try {
        const response = await fetch(qrURL);
        const blob = await response.blob();

        const img = new Image();
        img.src = URL.createObjectURL(blob);

        img.onload = function () {
          // 🎯 force selected size
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          canvas.width = size;
          canvas.height = size;

          ctx.drawImage(img, 0, 0, size, size);

          // 🎨 format handling
          let mimeType = "image/png";
          if (format === "jpg") mimeType = "image/jpeg";

          const finalURL = canvas.toDataURL(mimeType, 1.0);

          // 📁 filename
          let fileName = qrInput.value.replace(/\s+/g, "_").substring(0, 10);

          const link = document.createElement("a");
          link.href = finalURL;
          link.download = `${fileName}-${size}.${format}`;

          link.click();
        };
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
