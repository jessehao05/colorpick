// loads history onto page

let history = JSON.parse(localStorage.getItem('history'));
const histContainer = document.querySelector('.hist-container');

function getColorFromEvent(event) {
    const parent = event.target.closest('.color-container');
    const colorSquare = parent.querySelector('.color-square');
    const color = colorSquare.style.backgroundColor;
    return rgbToHex(color);
}

function rgbToHex(rgbString) {
  const result = rgbString.match(/\d+/g);
  if (!result || result.length !== 3) return null;
  const [r, g, b] = result.map(Number);

  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

if (history === null || history.length == 0) {
    histContainer.innerHTML = `<h1>Nothing here yet!</h1>`
} else {
    
    for (let i = history.length - 1; i >= 0; i--) {
        // create an element and take history[i] for the hex code
        const colorBox = document.createElement('div');
        colorBox.className = 'color-container';
        colorBox.innerHTML = `
        <div class="color-square"></div>
        <div class="right-col">
            <div class="top-row">HEX Code: ${history[i]}</div>
            <div class="bottom-row">
                <button class="copy-btn"><img src="icons/copy.svg"></button>
                <button class="trash-btn"><img src="icons/trash.svg"></button>
            </div>
        </div>`;


        colorBox.querySelector('.color-square').style.backgroundColor = history[i];
        histContainer.appendChild(colorBox);

        // console.log('one child added')
    }

    const trashBtns = document.querySelectorAll('.trash-btn');
    trashBtns.forEach(btn => btn.addEventListener('click', (e) => {
        const hex = getColorFromEvent(e);

        // remove element from array
        const parent = e.target.closest('.color-container');
        parent.remove();

        history = history.filter(color => color !== hex);

        localStorage.setItem('history', JSON.stringify(history)); 
    }));

    const copyBtns = document.querySelectorAll('.copy-btn');
    copyBtns.forEach(btn => btn.addEventListener('click', (e) => {
        const hex = getColorFromEvent(e);
        navigator.clipboard.writeText(hex);
    }))
}