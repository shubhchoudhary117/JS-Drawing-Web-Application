const canvas = document.querySelector("canvas");
var brushes = document.querySelectorAll(".tool");
var colors = document.querySelectorAll(".colorCode");
const lineSelector = document.getElementById("lineSelector")
const colorPicker = document.getElementById("colorPicker");
const size_selector_box = document.getElementById("size-selector-box");
const lineselectorClose = false;
const eraser = document.getElementById("eraser");
const shapes = document.querySelectorAll(".shape-icon");
const activeColor = document.getElementById("activeColor")
const lines = document.querySelectorAll(".linesize");
const fontSize = document.getElementById("fontSize");
const addText = document.getElementById("addText");
var toolName;
var prevMouseX, prevMouseY;
var selectedTool, selectedBrush;
var ctx = canvas.getContext("2d");
var isStart = false;
var lineThin = 0;
var lineColor = "black";
var eraserClicked = false;


// set the values
var opt = "";
for (let i = 1; i <= 100; i++) {
    opt += "<option value=" + i + ">" + i + "</option><br></br>";
}
fontSize.innerHTML = opt;
// change the brush size
brushes.forEach((current) => {
    current.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active")
        current.classList.add("active");
        lineThin = current.id;
        selectedBrush = true;
        selectedTool = false;
        lineColor = "black";
        eraserClicked = false;

    })
})
// selected shape
// function drawRect(e){
//     ctx.strokeRect(e.offsetX,e.offsetY,prevMouseX - e.offsetX,prevMouseY - e.offsetY);
//     ctx.stroke();
// }
// // draw sercle
// function drawCircle(e){
//     ctx.arc(prevMouseX,prevMouseY,100, 0, 2 * Math.PI);
//     ctx.stroke();
// }

// shapes.forEach((shape)=>{
//     shape.addEventListener("click",()=>{
//       selectedTool=true;
//       toolName=shape.id;
//       selectedBrush=false;
//     })
// })
// change the pen color
colors.forEach((active) => {
    active.addEventListener("click", () => {
        lineColor = active.id;
        eraserClicked = false;
        activeColor.style.backgroundColor = lineColor;
    })
})
// get the color picker color code
colorPicker.addEventListener("input", (e) => {
    lineColor = e.target.value;
    activeColor.style.backgroundColor = lineColor;
})
// pen line size set
lines.forEach((currentLine) => {
    currentLine.addEventListener("click", () => {
        document.querySelector(".activeLine").classList.remove("activeLine");
        currentLine.classList.add("activeLine")
        lineThin = currentLine.id;
        eraserClicked = false;
    })
})

window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
})

// start the drawing
const startDrawing = (e) => {
    isStart = true;
    ctx.beginPath();
    ctx.lineWidth = lineThin;

}



// stop the drawing pen
const stopDrawing = () => {
    isStart = false;
}
// erase the line
eraser.addEventListener("click", () => {
    eraserClicked = true;

})
const drawing = (e) => {
    if (!isStart) return;
    if (eraserClicked) {
        lineColor = "#fff";
    }
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.strokeStyle = lineColor;
    ctx.stroke();
}

// set text on canvas after clicking apply button
var FontSize=16;
var fontColor="black";
// get the size and color when user selected
document.getElementById("fontSize").addEventListener("click",(e)=>{
    FontSize=e.target.value;
})
// get the color
document.getElementById("colorPicker").addEventListener("input",(e)=>{
    fontColor=e.target.value;
})
// get color from color box
const colorBox=document.querySelectorAll(".colorPoint");
colorBox.forEach((current)=>{
    current.addEventListener("click",()=>{
        fontColor=current.id;
    })
})
const setText_onCanvas = () => {
    let text = document.getElementById("textArea").value;
    let x = document.getElementById("xCordinate").value;
    let y = document.getElementById("yCordinate").value;
    ctx.font = FontSize + "px Comic Sans MS";
    ctx.fillStyle = fontColor;
    ctx.textAlign = "center";
    ctx.fillText(text, x, y);
    document.getElementById("Text-Layout").style.display = "none";
    // after set text
    document.getElementById("textArea").value="";
    document.getElementById("xCordinate").value="";
    document.getElementById("yCordinate").value="";
    document.getElementById("fontSize").value="";
    addText.style.border="none";

}
// set the text
const closeTextBox = () => {
    document.getElementById("Text-Layout").style.display = "none";
    addText.style.border="none";

}
// after clicking add text icon so we are show the text box
showTextBox = () => {
    document.getElementById("Text-Layout").style.display = "block";
    addText.style.border="1px solid #c9e0f7";
}
// call the drawing function
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup", stopDrawing);
addText.addEventListener("click", showTextBox);