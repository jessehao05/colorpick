if (window.EyeDropper == undefined) {
    console.error('EyeDropper API is not supported on this platform.');
} else {

const eyedropper = new EyeDropper();
const pickButton = document.querySelector('.pick-button');
const background = document.querySelector('.color-background');
const text = document.querySelector('.color-text');


async function useEyedropper() { 
    try {
        const color = await eyedropper.open();
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

pickButton.addEventListener('click', () => {
    useEyedropper();
}) 

}
