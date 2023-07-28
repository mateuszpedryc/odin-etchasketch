let currentColor = '#000000';
let currentMode = 'color';
let currentSize = 16;

const gridSizeSlider = document.getElementById('gridSizeSlider');
const gridSizeValue = document.getElementById('gridSizeValue');
const btnColor = document.getElementById('btnColor');
const btnRainbow = document.getElementById('btnRainbow');
const btnEraser = document.getElementById('btnEraser');
const btnClear = document.getElementById('btnClear');
const colorPicker = document.getElementById('colorPicker');
const grid = document.getElementById('grid');

btnColor.onclick = () => setNewMode('color');
btnRainbow.onclick = () => setNewMode('rainbow');
btnEraser.onclick = () => setNewMode('eraser');
btnClear.onclick = () => reloadGrid();

// Change color

colorPicker.oninput = (e) => newColor(e.target.value);

function newColor (newColor) {
    currentColor = newColor;
    //console.log(newColor);
}

// Size change

gridSizeSlider.onmousemove = (e) => changeSizeValue(e.target.value);
gridSizeSlider.onchange = (e) => changeSize(e.target.value);

function setNewSize (newSize) {
    currentSize = newSize;
}

function changeSizeValue (value) {
    gridSizeValue.innerHTML = `${value} x ${value}`;
}

function changeSize (value) {
    setNewSize(value);
    changeSizeValue(value);
    reloadGrid();
}

// Mode change
function setNewMode (newMode) {
    activateButton(newMode);
    currentMode = newMode;
}

function activateButton (newMode) {
    if (currentMode === 'color') {
        btnColor.classList.remove('active');
    } else if (currentMode === 'rainbow') {
        btnRainbow.classList.remove('active');
    } else if (currentMode === 'eraser') {
        btnEraser.classList.remove('active');
    }

    if (newMode === 'color') {
        btnColor.classList.add('active');
    } else if (newMode === 'rainbow') {
        btnRainbow.classList.add('active');
    } else if (newMode === 'eraser') {
        btnEraser.classList.add('active');
    }
}

// Grid chage

function reloadGrid() {
    clearGrid();
    changeGrid(currentSize);
}

function clearGrid() {
    grid.innerHTML = '';
}

function changeGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`

    for (let i = 0; i < size * size; i++) {
      const gridElement = document.createElement('div');
      gridElement.classList.add('grid-element');
      gridElement.addEventListener('mouseover', changeColor);
      grid.appendChild(gridElement);
    }
  }

function changeColor(e) {
    if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor;
    } else if (currentMode === 'rainbow') {
        const R = Math.floor(Math.random() * 256)
        const G = Math.floor(Math.random() * 256)
        const B = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${R}, ${G}, ${B})`
    } else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = '#fefefe';
    }
  }

// Start on window load
window.onload = () => {
    changeGrid(currentSize);
    activateButton('color');
}