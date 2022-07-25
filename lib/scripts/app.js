// SET YEAR
document.querySelector(".date").innerText = new Date().getFullYear();

// SLIDER/COLOR BAR
let colorBar = document.querySelector(".slider");
let selectedColor = document.querySelector(".selected-color");
let values = document.querySelector(".rgb-values");
let picker = document.querySelector(".picker");
let context = picker.getContext("2d");
let r = 255;
let g = 0;
let b = 0;

context.fillStyle = `rgb(${r}, ${g}, ${b})`;
context.fillRect(0, 0, picker.clientWidth, picker.clientHeight);
console.log(picker.clientWidth);
if (colorBar.value == 0) {
  selectedColor.style.backgroundColor = `rgb(${r},${g},${b})`;
  values.innerHTML = getRGBValues();
}
setColors();

colorBar.oninput = function () {
  colorBar.innerHTML = this.value;
  if (this.value <= 255) {
    r = 255;
    g = this.value;
    b = 0;
  } else if (this.value <= 255 * 2) {
    r = 255 - (this.value - 255);
    g = 255;
    b = 0;
  } else if (this.value <= 255 * 3) {
    r = 0;
    g = 255;
    b = this.value - 255 * 2; // going up
  } else if (this.value <= 255 * 4) {
    r = 0;
    g = 255 * 3 - (this.value - 255); // down
    b = 255;
  } else if (this.value <= 255 * 5) {
    r = this.value - 255 * 4; // going up
    g = 0;
    b = 255;
  } else if (this.value <= 255 * 6) {
    r = 255;
    g = 0;
    b = 255 * 5 - (this.value - 255);
  }
  selectedColor.style.backgroundColor = `rgb(${r},${g},${b})`;
  values.innerHTML = getRGBValues();

  setColors();
};

function getRGBValues() {
  return `
    <p class="rgb-values"><span class="bolded">R:</span> ${r}</p>
    <p class="rgb-values"><span class="bolded">G:</span> ${g}</p>
    <p class="rgb-values"><span class="bolded">B:</span> ${b}</p>
  `;
}

// CHANGE 1 PIXEL

function setColors() {
  let xWidth = picker.clientWidth;
  let yHeight = picker.clientHeight;
  let r2 = 255;
  let g2 = 255;
  let b2 = 255;
  console.log(r, g, b);

  for (let h = 0; h < yHeight; h++) {
    for (let x = 0; x < xWidth; x++) {
      if (!isPrimary(r) && r2 > r) r2--;
      if (!isPrimary(g) && g2 > g) g2--;
      if (!isPrimary(b) && b2 > b) b2--;

      for (y = h; y < h + 1; y++) {
        context.fillStyle = `rgb(${r2}, ${g2}, ${b2})`;
        context.fillRect(x, y, 1, 1); // should be 1 later
      }
    }

    // TODO: Need to keep secondary and tertiary numbers at their values longer.. if they don't reach 0
    if (isPrimary(r) && r2 <= r) {
      r2--;
      b2 = r2;
      g2 = r2;
    } else if (isPrimary(g) && g2 <= g) {
      g2--;
      r2 = g2;
      b2 = g2;
    } else if (isPrimary(b) && b2 <= b) {
      b2--;
      r2 = b2;
      g2 = b2;
    }
  }
}

function isPrimary(val) {
  if (val != 255) return false;
  return true;
}

picker.addEventListener("click", function (e) {
  console.log("hello");
  let data = context.getImageData(e.offsetX, e.offsetY, 1, 1).data;
  console.log(data[0], data[1], data[2]);
});
