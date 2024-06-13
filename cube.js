// 立方体の面の要素を生成する関数
function createCubeFace(className, imageSrc) {
    const face = document.createElement('div');
    face.className = `cube-face ${className}`;
    if (imageSrc) {
        const img = document.createElement('img');
        img.src = imageSrc;
        face.appendChild(img);
    }
    return face;
}

// 立方体の要素を生成する関数
function createCube() {
    const cube = document.createElement('div');
    cube.className = 'cube';

    const front = createCubeFace('front', 'images/cube/sunny.jpg');
    const back = createCubeFace('back', 'images/cube/play.jpg');
    const right = createCubeFace('right', 'images/cube/rainy.jpg');
    const left = createCubeFace('left', 'images/cube/school.jpg');
    const top = createCubeFace('top', 'images/cube/date.jpg');
    const bottom = createCubeFace('bottom', 'images/cube/camp.jpg');

    cube.appendChild(front);
    cube.appendChild(back);
    cube.appendChild(right);
    cube.appendChild(left);
    cube.appendChild(top);
    cube.appendChild(bottom);

    return cube;
}

// 立方体の要素を追加し、回転を開始する
const cubeContainer = document.getElementById('cubeContainer');
const cube = createCube();
cubeContainer.appendChild(cube);

let startX, startY, currentX = 30, currentY = -30; // 初期角度を設定
let dragging = false;
let inertiaX = 0;
let inertiaY = 0;
let lastX = 0;
let lastY = 0;
let threshold = 0.1;
let inertia = 0.95; // 慣性の減衰率

// マウスの動きに基づいてキューブを回転させる関数
function onMouseMove(e) {
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    currentX += dx * 0.5;
    currentY -= dy * 0.5;
    cube.style.transform = `rotateX(${currentY}deg) rotateY(${currentX}deg)`;
    startX = e.clientX;
    startY = e.clientY;
    lastX = dx;
    lastY = dy;
}

// マウスドラッグ開始
cubeContainer.addEventListener('mousedown', (e) => {
    dragging = true;
    startX = e.clientX;
    startY = e.clientY;
    document.addEventListener('mousemove', onMouseMove);
});

document.addEventListener('mouseup', () => {
    dragging = false;
    document.removeEventListener('mousemove', onMouseMove);
    inertiaX = lastX * inertia;
    inertiaY = lastY * inertia;
    requestAnimationFrame(decelerate);
});

// 立方体上でのマウス移動を検出
cubeContainer.addEventListener('mouseover', (e) => {
    startX = e.clientX;
    startY = e.clientY;
    document.addEventListener('mousemove', onMouseMove);
});

cubeContainer.addEventListener('mouseout', () => {
    document.removeEventListener('mousemove', onMouseMove);
    inertiaX = lastX * inertia;
    inertiaY = lastY * inertia;
    requestAnimationFrame(decelerate);
});

// タッチイベントの処理
function onTouchMove(e) {
    if (!dragging) return;
    const touch = e.touches[0];
    const dx = touch.clientX - startX;
    const dy = touch.clientY - startY;
    currentX += dx * 0.5;
    currentY -= dy * 0.5;
    cube.style.transform = `rotateX(${currentY}deg) rotateY(${currentX}deg)`;
    startX = touch.clientX;
    startY = touch.clientY;
    lastX = dx;
    lastY = dy;
    e.preventDefault();
}

cubeContainer.addEventListener('touchstart', (e) => {
    dragging = true;
    const touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
    document.addEventListener('touchmove', onTouchMove, { passive: false });
});

document.addEventListener('touchend', () => {
    dragging = false;
    document.removeEventListener('touchmove', onTouchMove);
    inertiaX = lastX * inertia;
    inertiaY = lastY * inertia;
    requestAnimationFrame(decelerate);
});

// 慣性で減速する処理
function decelerate() {
    if (!dragging) {
        currentX += inertiaX;
        currentY -= inertiaY; // 慣性方向が逆になるので、符号を逆にする
        cube.style.transform = `rotateX(${currentY}deg) rotateY(${currentX}deg)`;
        inertiaX *= inertia;
        inertiaY *= inertia;
        if (Math.abs(inertiaX) > threshold || Math.abs(inertiaY) > threshold) {
            requestAnimationFrame(decelerate);
        }
    }
}
