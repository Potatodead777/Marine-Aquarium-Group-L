const canvas = document.getElementById('canvas');
const toolbar = document.getElementById('toolbar');

const deleteButton = document.getElementById('deleteButton');
const saveButton = document.getElementById('saveButton');

const ctx = canvas.getContext('2d');
const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

const modalDelete = document.getElementById('modalDelete');
const modalSave = document.getElementById('modalSave');
const modalStart = document.getElementById('modalStart');
const modalWidth = document.getElementById('modalWidth');
const modalColour = document.getElementById('modalColour');

const dialogDelete = document.getElementById('dialogDelete');
const dialogSave = document.getElementById('saveYes');
const saveNo = document.getElementById('saveNo');
const dialogWidth = document.getElementById('widthButtons');
const dialogColour = document.getElementById('colourButtons');

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let selectedTool = 'brush'
let currentColour = "#000"
let isPainting = false;
let lineWidth = 5;
let startX;
let startY;


const setCanvasBackground = () => {
    // setting whole canvas background to white, so the downloaded img background will be white
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = selectedColor; // setting fillstyle back to the selectedColor, it'll be the brush color
}

window.addEventListener("load", () => {
    setCanvasBackground();
});

document.addEventListener('readystatechange', () => {    
    if (document.readyState == 'complete'){
        modalStart.showModal();
    };
  });

saveButton.addEventListener("click", () => {
    modalSave.showModal();
});

dialogSave.addEventListener("click", () => {
        const link = document.createElement("a");
        link.download = `${Date()}.jpg`;
        link.href = canvas.toDataURL();
        link.click();
        modalSave.close();
});

saveNo.addEventListener("click", () => {
        modalSave.close();
});

dialogWidth.addEventListener("click", e => {
    if(e.target.id === 'widthSmall'){
        lineWidth = 3;
        modalWidth.close();
    }else if (e.target.id === 'widthMedium'){
        lineWidth = 6;
        modalWidth.close();
    }else if (e.target.id === 'widthLarge'){
        lineWidth = 10;
        modalWidth.close();
    }
});

dialogColour.addEventListener("click", e => {
    if(e.target.id === 'colourRed'){
        currentColour = '#f00';
        ctx.strokeStyle = currentColour;
        modalColour.close();
    }if(e.target.id === 'colourYellow'){
        currentColour = '#ff0';
        ctx.strokeStyle = currentColour;
        modalColour.close();
    }if(e.target.id === 'colourBlack'){
        currentColour = '#000';
        ctx.strokeStyle = currentColour;
        modalColour.close();
    }if(e.target.id === 'colourBlue'){
        currentColour = '#00f';
        ctx.strokeStyle = currentColour;
        modalColour.close();
    }if(e.target.id === 'colourPink'){
        currentColour = '#f0f';
        ctx.strokeStyle = currentColour;
        modalColour.close();
    }if(e.target.id === 'colourCyan'){
        currentColour = '#0ff';
        ctx.strokeStyle = currentColour;
        modalColour.close();
    }if(e.target.id === 'colourGreen'){
        currentColour = '#00FF00';
        ctx.strokeStyle = currentColour;
        modalColour.close();
    }
});

toolbar.addEventListener('click', e => {
    if (e.target.id === 'erase') {
        ctx.strokeStyle = "#fff";
        selectedTool = 'eraser'
    }
    if(e.target.id === 'brush'){
        ctx.strokeStyle = currentColour;
        selectedTool = 'brush'
    }if(e.target.id === 'width'){
        modalWidth.showModal();
    }if(e.target.id === 'colour'){
        modalColour.showModal();
    }
});

deleteButton.addEventListener('click', e => {
    if(e.target.id === 'deleteButton'){
        modalDelete.showModal();
    }
});

dialogDelete.addEventListener('click', e => {
    if(e.target.id === 'deleteYes'){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        modalDelete.close();

        setCanvasBackground();
    }
    else if(e.target.id === 'deleteNo'){
        modalDelete.close();
    }
});

toolbar.addEventListener('change', e => {
    if(e.target.id === 'lineWidth') {
        lineWidth = e.target.value;
    }
});

const draw = (e) => {
    if(!isPainting) {
        return;
    }
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    ctx.lineTo(e.clientX - canvasOffsetX, e.clientY);
    ctx.stroke();
}

canvas.addEventListener('mousedown', (e) => {
    isPainting = true;
    startX = e.clientX;
    startY = e.clientY;
});

canvas.addEventListener('mouseup', e => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
});
canvas.addEventListener('mousemove', draw);

function storeDetails(){
    var storeAge = document.getElementById('userAge').value;
    var storeSchool = document.getElementById('userSchool').value;
    var storeYear = document.getElementById('userYear').value;
    date = new Date();
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
    localStorage.setItem("userAge", storeAge);
    localStorage.setItem("userSchool",storeSchool);
    localStorage.setItem("userYear", storeYear);
    localStorage.setItem("DeviceID", null);
    localStorage.setItem("Location", null);
}
