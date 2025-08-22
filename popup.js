async function useEyedropper(eyedropper) { 
    try {
        color = await eyedropper.open();
        console.log(color.sRGBHex);
        displayColor(color.sRGBHex);
        updateHistory();
        
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
                </div>`;
    
    paletteContainer.appendChild(newPalette);
}

function handlePlus(palette) {
    if (!color) {
        showToast('No color selected');
        return;
    }

    const colorContainer = palette.querySelector('.color-container');
    const newColor = document.createElement('div');
    newColor.className = 'color';
    newColor.style.backgroundColor = color.sRGBHex;

    colorContainer.appendChild(newColor);
}

function handleEdit(palette) {
    // get the current name value
    const nameElement = palette.querySelector('.palette-name');
    const curName = nameElement.textContent;

    // delete it to make space for input element
    nameElement.remove();

    // make new input element, set pre-filled text to current name
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.value = curName;

    // append to the left div
    const left = palette.querySelector('.left')
    left.appendChild(nameInput);

    function saveInputName() {
        // take the value of the input and set as the new name
        const newName = nameInput.value;

        // create new span element with correct class 
        const newNameElement = document.createElement('span');
        newNameElement.className = 'palette-name';
        newNameElement.textContent = newName;

        // remove input form and append new span element
        nameInput.remove();
        left.appendChild(newNameElement);

        updateSavedPalettes();
    }

    nameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            saveInputName();
        }
    })

    nameInput.addEventListener('blur', () => {
        saveInputName();
    })
}

function handleTrash(palette) {
    // console.log('trash icon clicked');
    palette.remove();
}

function loadPalettes() {
    const paletteData = localStorage.getItem('palette-data');
    if (paletteData !== null) {
        paletteContainer.innerHTML = paletteData;
    }
}

function updateSavedPalettes() {
    // any time a palette is created, renamed, deleted, or has a color added, save innerHTML of "palettes" to localStorage
    const currentPalettesHTML = document.querySelector('.palettes').innerHTML;
    localStorage.setItem('palette-data', currentPalettesHTML);
}

function updateHistory() {
    // get current array, add color to end, and add array back into storage
    let history = JSON.parse(localStorage.getItem('history'));
    // console.log('hi')
    if (history === null) {
        // if no history variable, create new array with current color as first element
        // console.log('no histiory variable')
        history = [color.sRGBHex];
    } else {
        // console.log('history variable exists')
        history.push(color.sRGBHex);
    }

    localStorage.setItem('history', JSON.stringify(history));
    // console.log('success updating history')
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

// ------ END FUNCTIONS ------

const pickButton = document.querySelector('.eyedrop');
const background = document.querySelector('.color-background');
const text = document.querySelector('.color-text');
const copyButton = document.querySelector('.copy');
const indicator = document.querySelector('.copied-indicator');
const paletteContainer = document.querySelector('.palettes');
const paletteBtn = document.querySelector('.create-palette-button');
let color;

if (window.EyeDropper == undefined) {
    alert('EyeDropper API is not supported on this platform.')
    console.error('EyeDropper API is not supported on this platform.');
} else {
    loadPalettes();
    const eyedropper = new EyeDropper();

    // permanent binding
    pickButton.addEventListener('click', () => {
        useEyedropper(eyedropper);
    })

    copyButton.addEventListener('click', () => {
        copyColor();
    });

    paletteBtn.addEventListener('click', () => {
        createNewPalette();
        updateSavedPalettes();
    })

    // event delegation for palette buttons
    paletteContainer.addEventListener('click', (e) => {
        const pal = e.target.closest('.palette');
    
        if (!pal) {
            // accounting for clicking space of margin-bottom
            return;
        }
        // console.log(e.target);
        // console.log(pal);

        if (e.target.closest('.plus-btn')) {
            handlePlus(pal);
            updateSavedPalettes();
        } else if (e.target.closest('.edit-btn')) {
            handleEdit(pal);
        } else if (e.target.closest('.trash-btn')) {
            handleTrash(pal);
            updateSavedPalettes();
        }
    })
}