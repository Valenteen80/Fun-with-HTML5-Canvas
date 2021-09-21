// ----------------------------------------переключение класса activ:
const settings = document.querySelectorAll(".settings");
for (let i = 0; i < settings.length; i++) {
  let setting = settings[i];
  setting.addEventListener("click", addActiv);
}
function addActiv() {
  for (let i = 0; i < settings.length; i++) {
    let setting = settings[i];
    setting.classList.remove("active");
  }
  this.classList.toggle("active");
}
// --------------------------------------- установка плавающей ширины:
let GodObj = {};
const floatingWidth = document.getElementById("floating-width");
floatingWidth.addEventListener("click", changeWidth);
function changeWidth() {
  let floating = true;
  GodObj.floating = floating;
}
// ----------------------------------------изменение цвета кнопками:
const buttons = document.querySelectorAll(".button-color");
for (let i = 0; i < buttons.length; i++) {
  let button = buttons[i];
  button.addEventListener("click", changeColor);
}
function changeColor() {
  let colorIsButton = this.dataset.key;
  GodObj.colorIsButton = colorIsButton;

  if (GodObj.colorInputControl) {
    GodObj.colorInputControl = "";
  }
}

// -----------------------------------------измение цвета c инпутом:

const colorInputControl = document.getElementById("base");
colorInputControl.addEventListener("change", colorInputUpdate);
function colorInputUpdate() {
  let colorInputControl = this.value;
  GodObj.colorInputControl = colorInputControl;
}
//----------------------------------------измение ширины с инпутом:
const widthInputControl = document.getElementById("spacing");
widthInputControl.addEventListener("change", widthInputUpdate);
function widthInputUpdate() {
  let widthInputControl = this.value;
  GodObj.widthInputControl = widthInputControl;
  if (GodObj.floating) {
    GodObj.floating = false;
  }
}
//-------------------------------------------глобальные переменные:
const canvas = document.querySelector("#draw");
const ctx = canvas.getContext("2d");
canvas.width = (document.documentElement.clientWidth / 100) * 70;
canvas.height = document.documentElement.clientHeight;
ctx.strokeStyle = "#BADASS";
ctx.linejoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 100;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;
// ---------------------------------------------главная функция:
function draw(e) {
  if (!isDrawing) return;

  if (!GodObj.colorInputControl || !GodObj.colorIsButton) {
    ctx.strokeStyle = "#ff0000";
  }
  if (GodObj.colorIsButton) {
    ctx.strokeStyle = GodObj.colorIsButton;
    if (GodObj.colorIsButton === "rainbow") {
      ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    }
  }
  if (GodObj.colorInputControl) {
    ctx.strokeStyle = GodObj.colorInputControl;
  }

  if (GodObj.floating) {
    if (ctx.lineWidth >= 100) {
      direction = false;
    } else if (ctx.lineWidth <= 1) {
      direction = true;
    }

    if (direction) {
      ctx.lineWidth++;
    } else {
      ctx.lineWidth--;
    }
  } else {
    if (!GodObj.widthInputControl) {
      ctx.lineWidth = 50;
    }
    if (GodObj.widthInputControl) {
      ctx.lineWidth = GodObj.widthInputControl;
    }
  }
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
  hue++;
  if (hue >= 360) {
    hue = 0;
  }
}

canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));
