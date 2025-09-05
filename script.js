// Referencias a sliders
const rojo = document.getElementById('rojo');
const verde = document.getElementById('verde');
const azul = document.getElementById('azul');

// Inputs numéricos
const inputRojo = document.getElementById('inputRojo');
const inputVerde = document.getElementById('inputVerde');
const inputAzul = document.getElementById('inputAzul');

// Textos
const valRojo = document.getElementById('valRojo');
const valVerde = document.getElementById('valVerde');
const valAzul = document.getElementById('valAzul');

// Recuadro y códigos
const colorBox = document.getElementById('colorBox');
const rgbCode = document.getElementById('rgbCode');
const hexCode = document.getElementById('hexCode');
const colorPicker = document.getElementById('colorPicker');
const copyBtn = document.getElementById('copyBtn');

// Hex a RGB
function hexToRgb(hex) {
    hex = hex.replace(/^#/, '');
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;
    return { r, g, b };
}

// Actualizar color
function actualizarColor() {
    const r = parseInt(rojo.value);
    const g = parseInt(verde.value);
    const b = parseInt(azul.value);

    valRojo.textContent = r;
    valVerde.textContent = g;
    valAzul.textContent = b;

    inputRojo.value = r;
    inputVerde.value = g;
    inputAzul.value = b;

    const rgb = `rgb(${r}, ${g}, ${b})`;
    const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;

    colorBox.style.backgroundColor = rgb;
    rgbCode.textContent = rgb;
    hexCode.textContent = hex;

    colorPicker.value = hex;
}

// Sliders
rojo.addEventListener('input', actualizarColor);
verde.addEventListener('input', actualizarColor);
azul.addEventListener('input', actualizarColor);

// Inputs numéricos
[inputRojo, inputVerde, inputAzul].forEach((input, index) => {
    input.addEventListener('input', () => {
        let val = Math.min(Math.max(parseInt(input.value) || 0, 0), 255);
        if (index === 0) rojo.value = val;
        if (index === 1) verde.value = val;
        if (index === 2) azul.value = val;
        actualizarColor();
    });
});

// Color picker
colorPicker.addEventListener('input', () => {
    const { r, g, b } = hexToRgb(colorPicker.value);
    rojo.value = r;
    verde.value = g;
    azul.value = b;
    actualizarColor();
});

// Copiar al portapapeles
copyBtn.addEventListener('click', () => {
    const text = `RGB: ${rgbCode.textContent} | HEX: ${hexCode.textContent}`;
    navigator.clipboard.writeText(text).then(() => {
        copyBtn.textContent = "✅ Copiado!";
        setTimeout(() => copyBtn.textContent = "📋 Copiar Código", 1500);
    });
});

// Inicializar
actualizarColor();
