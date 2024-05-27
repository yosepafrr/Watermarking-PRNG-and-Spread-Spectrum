document.getElementById('imageUpload').addEventListener('change', handleImage);
document.getElementById('watermarkUpload').addEventListener('change', handleWatermark);
document.getElementById('downloadBtn').addEventListener('click', downloadImage);
document.getElementById('extractImageUpload').addEventListener('change', extractWatermark);

document.getElementById('watermarkingBtn').addEventListener('click', () => {
    document.getElementById('leftRow').classList.remove('hidden');
    document.getElementById('rightRow').classList.add('hidden');
});
document.getElementById('extractionBtn').addEventListener('click', () => {
    document.getElementById('leftRow').classList.add('hidden');
    document.getElementById('rightRow').classList.remove('hidden');
});

function generatePseudorandomSequence(seed, length) {
    let sequence = new Uint8Array(length);
    let random = new Math.seedrandom(seed); // Pseudorandom number generator with seed
    for (let i = 0; i < length; i++) {
        sequence[i] = Math.floor(random() * length);
    }
    return sequence;
}


let baseImage = null;
let watermarkImage = null;

function handleImage(e) {
    document.getElementById('oriImg').innerHTML = 'Original Image: ';
    const reader = new FileReader();
    reader.onload = function(event) {
        baseImage = new Image();
        baseImage.onload = function() {
            drawImages();
            // Menampilkan pratinjau gambar
            const preview = document.getElementById('baseImagePreview');
            preview.innerHTML = ''; // Membersihkan pratinjau sebelumnya
            const img = document.createElement('img');
            img.src = event.target.result;
            img.style.maxWidth = '100%';
            preview.appendChild(img);
        };
        baseImage.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
}

function handleWatermark(e) {
    document.getElementById('imgWatermark').innerHTML = 'Gambar watermark kamu: ';
    const reader = new FileReader();
    reader.onload = function(event) {
        watermarkImage = new Image();
        watermarkImage.onload = function() {
            // Mengecek apakah ukuran watermark melebihi ukuran gambar dasar
            if (watermarkImage.width > baseImage.width || watermarkImage.height > baseImage.height) {
                alert('Ukuran watermark tidak boleh melebihi ukuran gambar dasar.');
                return;
            }

            drawImages();
            // Menampilkan pratinjau watermark
            const preview = document.getElementById('watermarkPreview');
            preview.innerHTML = ''; // Membersihkan pratinjau sebelumnya
            const img = document.createElement('img');
            img.src = event.target.result;
            img.style.maxWidth = '100%';
            preview.appendChild(img);
        };
        watermarkImage.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
}

function drawImages() {
    document.getElementById('downloadBtn').classList.remove('hidden');
    document.getElementById('embeddedImg').innerHTML = 'Embedded Image: ';
    if (baseImage && watermarkImage) {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = baseImage.width;
        canvas.height = baseImage.height;
        ctx.drawImage(baseImage, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;

        const watermarkCanvas = document.createElement('canvas');
        const watermarkCtx = watermarkCanvas.getContext('2d');
        watermarkCanvas.width = baseImage.width;
        watermarkCanvas.height = baseImage.height;
        watermarkCtx.drawImage(watermarkImage, 0, 0, baseImage.width, baseImage.height);
        const watermarkData = watermarkCtx.getImageData(0, 0, watermarkCanvas.width, watermarkCanvas.height).data;

        const seed = document.getElementById('seedInputEmbed').value;
        const sequence = generatePseudorandomSequence(seed, pixels.length / 4);

        sequence.forEach((pixelIndex, i) => {
            let index = pixelIndex * 4;
            let watermarkIndex = (i % (watermarkData.length / 4)) * 4;
            pixels[index] = (pixels[index] & 0xF8) | ((watermarkData[watermarkIndex] & 0xE0) >> 5);
            pixels[index + 1] = (pixels[index + 1] & 0xF8) | ((watermarkData[watermarkIndex + 1] & 0xE0) >> 5);
            pixels[index + 2] = (pixels[index + 2] & 0xF8) | ((watermarkData[watermarkIndex + 2] & 0xE0) >> 5);
        });

        ctx.putImageData(imageData, 0, 0);
    }
}

function downloadImage() {
    const canvas = document.getElementById('canvas');
    const link = document.createElement('a');
    link.download = 'watermarked_image.png';
    link.href = canvas.toDataURL();
    link.click();
}

function extractWatermark(e) {
    document.getElementById('extractImageUpload').classList.add('hidden');
    document.getElementById('pilihGambar').innerHTML = '';
    document.getElementById('imgWithWatermark').innerHTML = 'Embedded Image (Image dengan watermark): ';
    document.getElementById('extractedWatermark').innerHTML = 'Extracted watermark: ';
    document.getElementById('embeddedImg').innerHTML = 'Extracted Image: ';
    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            const preview = document.getElementById('extractedImagePreview');
            preview.innerHTML = ''; // Membersihkan pratinjau sebelumnya
            const previewImg = document.createElement('img');
            previewImg.src = event.target.result;
            previewImg.style.maxWidth = '100%';
            preview.appendChild(previewImg);

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const pixels = imageData.data;

            const watermarkCanvas = document.getElementById('extractedWatermarkCanvas');
            const watermarkCtx = watermarkCanvas.getContext('2d');
            watermarkCanvas.width = img.width;
            watermarkCanvas.height = img.height;
            const watermarkData = watermarkCtx.createImageData(watermarkCanvas.width, watermarkCanvas.height);
            const watermarkPixels = watermarkData.data;

            const seed = document.getElementById('seedInputEkstraksi').value;
            const sequence = generatePseudorandomSequence(seed, pixels.length / 4);

            sequence.forEach((pixelIndex, i) => {
                let index = pixelIndex * 4;
                let watermarkIndex = (i % (watermarkPixels.length / 4)) * 4;

                // Extract the 3 least significant bits of the image pixel and shift left by 5
                watermarkPixels[watermarkIndex] = (pixels[index] & 0x07) << 5;
                watermarkPixels[watermarkIndex + 1] = (pixels[index + 1] & 0x07) << 5;
                watermarkPixels[watermarkIndex + 2] = (pixels[index + 2] & 0x07) << 5;
                watermarkPixels[watermarkIndex + 3] = 255; // Set alpha to 255
            });

            watermarkCtx.putImageData(watermarkData, 0, 0);
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
}
