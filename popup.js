async function useEyedropper(eyedropper) { 
    try {
        color = await eyedropper.open();
        console.log(color.sRGBHex);
        displayColor(color.sRGBHex);
        
    } catch (err) {
        const abortError = "AbortError: Failed to execute 'open' on 'EyeDropper': The user canceled the selection.";
        if (err == abortError) {
            console.log('Abort error: user hit escape before the selection.');
        } else {
            console.error(`Error using eyedropper: ${err}`)
        }
    }
}

function displayColor(hex) {
    background.style.backgroundColor = hex;
    text.innerHTML = `HEX Code: <br>${hex}`;
}

function copyColor() {
    const copied = color ? color.sRGBHex : 'No color selected.';
    if (copied !== 'No color selected.') {
        navigator.clipboard.writeText(copied);
    }
    const copiedText = copied === 'No color selected.' ? copied : 'Copied to clipboard!';
    showToast(copiedText);
}

function createNewPalette() {
    const newPalette = document.createElement('div');
    newPalette.className = 'palette';
    newPalette.innerHTML = `<div class="info-row">
                    <div class="left">
                        <span class="palette-name">New Palette</span>
                    </div>
                    <div class="right">
                        <button class="palette-btn plus-btn"><img class="pal-img plus-img" src="icons/plus-lg.svg"></button>
                        <button class="palette-btn edit-btn"><img class="pal-img edit-img" src="icons/pencil-square.svg"></button>
                        <button class="palette-btn trash-btn"><img class="pal-img trash-img" src="icons/trash.svg"></button>
                    </div>
                </div>
                <div class="color-container">
                    <div class="color" data-color="red"></div>
                    <div class="color" data-color="red"></div>                    
                </div>`;
    
    paletteContainer.appendChild(newPalette);
}

function showToast(text) {
    const toast = document.querySelector('.toast');
    toast.textContent = text;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.textContent = '';
        }, 500)
    }, 2000);
}

const pickButton = document.querySelector('.eyedrop');
const background = document.querySelector('.color-background');
const text = document.querySelector('.color-text');
const copyButton = document.querySelector('.copy');
const indicator = document.querySelector('.copied-indicator');
const paletteContainer = document.querySelector('.palettes');
const paletteBtn = document.querySelector('.create-palette-button');
let color;

if (window.EyeDropper == undefined) {
    console.error('EyeDropper API is not supported on this platform.');
} else {
    const eyedropper = new EyeDropper();

    pickButton.addEventListener('click', () => {
        useEyedropper(eyedropper);
    })

    copyButton.addEventListener('click', () => {
        copyColor();
    });

    paletteBtn.addEventListener('click', () => {
        createNewPalette();
    })
}

