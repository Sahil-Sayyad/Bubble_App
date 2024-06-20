const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const resetButton = document.getElementById("resetButton");

const circles = [
  { x: 100, y: 50, radius: 40, color: "yellow" },
  { x: 100, y: 150, radius: 40, color: "blue" },
  { x: 100, y: 250, radius: 40, color: "red" },
  { x: 100, y: 350, radius: 40, color: "green" },
];

const arrows = [
  {
    startX: 600,
    startY: 50,
    endX: 500,
    endY: 50,
    color: "black",
    speed: 4,
    moving: false,
  },
  {
    startX: 600,
    startY: 150,
    endX: 500,
    endY: 150,
    color: "black",
    speed: 4,
    moving: false,
  },
  {
    startX: 600,
    startY: 250,
    endX: 500,
    endY: 250,
    color: "black",
    speed: 4,
    moving: false,
  },
  {
    startX: 600,
    startY: 350,
    endX: 500,
    endY: 350,
    color: "black",
    speed: 4,
    moving: false,
  },
];

// Here getRandomColor function returns random color in hex code .
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Here drawCircles function drwas circles with color
function drawCircles() {
  circles.forEach((circle) => {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = circle.color;
    ctx.fill();
    ctx.closePath();
  });
}

// Here drawArrow function drwas arrow with black color
function drawArrow(arrow) {
  const headlen = 10;
  const angle = Math.atan2(
    arrow.endY - arrow.startY,
    arrow.endX - arrow.startX
  );

  ctx.beginPath();
  ctx.moveTo(arrow.startX, arrow.startY);
  ctx.lineTo(arrow.endX, arrow.endY);
  ctx.lineTo(
    arrow.endX + headlen * Math.cos(angle + Math.PI - Math.PI / 6),
    arrow.endY + headlen * Math.sin(angle + Math.PI - Math.PI / 6)
  );
  ctx.moveTo(arrow.endX, arrow.endY);
  ctx.lineTo(
    arrow.endX + headlen * Math.cos(angle - Math.PI + Math.PI / 6),
    arrow.endY + headlen * Math.sin(angle - Math.PI + Math.PI / 6)
  );
  ctx.strokeStyle = arrow.color;
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.closePath();
}

function drawArrows() {
  arrows.forEach((arrow) => {
    drawArrow(arrow);
  });
}

// here this moveArrows function moves arrow right direction to left at circle destination.
function moveArrows() {
  arrows.forEach((arrow, index) => {
    if (arrow.moving) {
      const distanceToCircle =
        arrow.endX - (circles[index].x + circles[index].radius);
      if (distanceToCircle > 0) {
        arrow.startX -= arrow.speed;
        arrow.endX -= arrow.speed;
      } else {
        arrow.moving = false;
        circles[index].color = getRandomColor();
        arrow.endX = circles[index].x + circles[index].radius;
        arrow.startX = arrow.endX + 100;
      }
    }
  });
}

// here this reset function resets arrow with its initial position.
function reset() {
  arrows.forEach((arrow) => {
    arrow.startX = 600;
    arrow.endX = 500;
    arrow.moving = false;
  });
  circles[0].color = "yellow";
  circles[1].color = "blue";
  circles[2].color = "red";
  circles[3].color = "green";
}

//Here clearCanvas function resets with its initial position.
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
  clearCanvas();
  drawCircles();
  drawArrows();
  moveArrows();
  requestAnimationFrame(draw);
}

canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  circles.forEach((circle, index) => {
    const distance = Math.sqrt(
      (mouseX - circle.x) ** 2 + (mouseY - circle.y) ** 2
    );
    if (distance < circle.radius) {
      arrows[index].moving = true;
    }
  });
});

resetButton.addEventListener("click", () => {
  reset();
});

draw();
