async function useEyedropper() { 
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
    showToast(copied);
}

function showToast(copied) {
    const toast = document.querySelector('.toast');
    toast.textContent = copied === 'No color selected.' ? copied : 'Copied to clipboard!';
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.textContent = '';
        }, 500)
    }, 2000);
}

const eyedropper = new EyeDropper();
const pickButton = document.querySelector('.eyedrop');
const background = document.querySelector('.color-background');
const text = document.querySelector('.color-text');
const copyButton = document.querySelector('.copy');
const indicator = document.querySelector('.copied-indicator');
let color;

if (window.EyeDropper == undefined) {
    console.error('EyeDropper API is not supported on this platform.');
} else {
    pickButton.addEventListener('click', () => {
        useEyedropper();
    })

    copyButton.addEventListener('click', () => {
        copyColor();
    });
}

