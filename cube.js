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

let currentX = 0;
let currentY = 0;
let rotating = false;

// マウスの動きに基づいてキューブを回転させる関数
function onMouseMove(e) {
    if (rotating) return;
    const rect = cubeContainer.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;
    currentX = mouseX / rect.width * 180; // キューブの回転角度を調整
    currentY = -mouseY / rect.height * 180; // キューブの回転角度を調整
    cube.style.transform = `rotateX(${currentY}deg) rotateY(${currentX}deg)`;
}

// マウスオーバー時に回転を有効にする
cube.addEventListener('mouseover', () => {
    rotating = false;
});

// マウスアウト時に回転を無効にする
cube.addEventListener('mouseout', () => {
    rotating = true;
});

// マウスムーブイベントを追加
cubeContainer.addEventListener('mousemove', onMouseMove);

// タッチイベントの処理はそのまま
cube.addEventListener('touchstart', touchStart, { passive: false });
cube.addEventListener('touchmove', touchMove, { passive: false });
cube.addEventListener('touchend', touchEnd, { passive: false });

function touchStart(e) {
    rotating = false;
    dragStart(e.touches[0]);
}

function touchMove(e) {
    if (rotating) return;
    drag(e.touches[0]);
    e.preventDefault();
}

function touchEnd(e) {
    rotating = true;
    e.preventDefault();
}

function dragStart(e) {
    rotating = true;
}

function drag(e) {
    if (rotating) {
        const rect = cubeContainer.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - rect.width / 2;
        const mouseY = e.clientY - rect.top - rect.height / 2;
        currentX = mouseX / rect.width * 180; // キューブの回転角度を調整
        currentY = -mouseY / rect.height * 180; // キューブの回転角度を調整
        cube.style.transform = `rotateX(${currentY}deg) rotateY(${currentX}deg)`;
    }
}
