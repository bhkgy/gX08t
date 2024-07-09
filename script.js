const キャンバス = document.getElementById("ゲームキャンバス");
const コンテキスト = キャンバス.getContext("2d");
const ボックス = 20;
const キャンバスサイズ = キャンバス.width;

let ヘビ = [{ x: ボックス * 5, y: ボックス * 5 }];
let 方向 = "右";
let 食べ物 = {
    x: Math.floor(Math.random() * キャンバスサイズ / ボックス) * ボックス,
    y: Math.floor(Math.random() * キャンバスサイズ / ボックス) * ボックス,
};
const リンゴ画像 = new Image();
リンゴ画像.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABhElEQVR42q2SMU/TUBCG/7n5gtRQpKRhLoZKSkhShEKVbBRG2WSbSjkHjwGl7Gxotugow8ldY3oYiSwU6WeRDaiA0UjR06GgTTovLBV1DUrb1bbpfXs0EN7nd8/j8zv3vff7QxtMOve2EYAxyKcX/ulSTydhZxAvROAioLRb5T8rwUBiAIAZVQwrgx8WI8HyCPw1b3WiKyNqkRcuIr1VJWpN5ELrdvI1prcKKRtQiKpEDACs5QwE0AMMn3H3a4k+E1+KbQWsZbuNRXKNNp8IEuEn0zi0XmvszbI2tsJrL7S20TiHpBSPYZDOjgzj2EnqsRYagZFtBbBsg4fKOIQqO53B0Hk8PzhjLpqBf9ONuYWhBvlZ1yYhsc+J/yb1/g82YJfH9A5Q0P1L8u+kBO2e0NiyLkMN2q7SoLDp77G19K+pgeBAk/gCyfaOcsPVZOV9AMAzXzIKrAwCvj+yxpaeVpqd0KgJpRQm2K0RCPTXsl9tfDkJS4ocJH1omLO+5qRwvHJ+UQ4gWhl/UfYX6YnddBBHkmNYAAAAASUVORK5CYII=';

document.addEventListener("keydown", 方向を設定);

function 方向を設定(event) {
    if (event.keyCode === 37 && 方向 !== "右") 方向 = "左";
    else if (event.keyCode === 38 && 方向 !== "下") 方向 = "上";
    else if (event.keyCode === 39 && 方向 !== "左") 方向 = "右";
    else if (event.keyCode === 40 && 方向 !== "上") 方向 = "下";
}

function ゲームを描画() {
    コンテキスト.clearRect(0, 0, キャンバスサイズ, キャンバスサイズ);

    for (let i = 0; i < ヘビ.length; i++) {
        コンテキスト.fillStyle = i === 0 ? "green" : "white";
        コンテキスト.fillRect(ヘビ[i].x, ヘビ[i].y, ボックス, ボックス);
        コンテキスト.strokeStyle = "red";
        コンテキスト.strokeRect(ヘビ[i].x, ヘビ[i].y, ボックス, ボックス);

        if (i === 0) {
            コンテキスト.fillStyle = "black";
            コンテキスト.beginPath();
            コンテキスト.arc(ヘビ[i].x + ボックス / 2, ヘビ[i].y + ボックス / 2, ボックス / 4, 0, 2 * Math.PI);
            コンテキスト.fill();
        }
    }

    コンテキスト.drawImage(リンゴ画像, 食べ物.x, 食べ物.y, ボックス, ボックス);

    let ヘビX = ヘビ[0].x;
    let ヘビY = ヘビ[0].y;

    if (方向 === "左") ヘビX -= ボックス;
    if (方向 === "上") ヘビY -= ボックス;
    if (方向 === "右") ヘビX += ボックス;
    if (方向 === "下") ヘビY += ボックス;

    if (ヘビX === 食べ物.x && ヘビY === 食べ物.y) {
        食べ物 = {
            x: Math.floor(Math.random() * キャンバスサイズ / ボックス) * ボックス,
            y: Math.floor(Math.random() * キャンバスサイズ / ボックス) * ボックス,
        };
    } else {
        ヘビ.pop();
    }

    let 新しい頭 = { x: ヘビX, y: ヘビY };

    if (ヘビX < 0 || ヘビY < 0 || ヘビX >= キャンバスサイズ || ヘビY >= キャンバスサイズ || 衝突(新しい頭, ヘビ)) {
        clearInterval(ゲーム);
        alert("ゲームオーバー");
    }

    ヘビ.unshift(新しい頭);
}

function 衝突(頭, array) {
    for (let i = 0; i < array.length; i++) {
        if (頭.x === array[i].x && 頭.y === array[i].y) {
            return true;
        }
    }
    return false;
}

let ゲーム = setInterval(ゲームを描画, 200);
