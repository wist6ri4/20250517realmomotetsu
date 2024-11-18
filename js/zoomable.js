// const svgFrame = document.querySelector('.svg-container');
// const zoomable = document.querySelector('.zoomable');
// let scale = 1;
// const maxScale = 5;
// const minScale = 1;
// let translateX = 0;
// let translateY = 0;
// let isDragging = false;
// let lastX = 0;
// let lastY = 0;

// // 画像の高さをフレームの高さに設定
// function setSvgFrameHeight() {
//     svgFrame.style.height = `${zoomable.getBoundingClientRect().height}px`;
// }

// // ページロード時とリサイズ時に高さを設定
// window.addEventListener('load', setSvgFrameHeight);
// window.addEventListener('resize', setSvgFrameHeight);

// // マウスホイールでズーム
// zoomable.addEventListener('wheel', (event) => {
//     event.preventDefault();
//     const delta = event.deltaY > 0 ? -0.25 : 0.25;
//     scale = Math.min(maxScale, Math.max(minScale, scale + delta));
//     applyTransform();
// });

// // ピンチイン・ピンチアウト用の距離計算関数
// function getDistance(touch1, touch2) {
//     return Math.sqrt(
//         Math.pow(touch2.pageX - touch1.pageX, 2) +
//         Math.pow(touch2.pageY - touch1.pageY, 2)
//     );
// }

// // スマホのピンチ操作
// let initialDistance = null;
// zoomable.addEventListener('touchstart', (event) => {
//     if (event.touches.length === 2) {
//         initialDistance = getDistance(event.touches[0], event.touches[1]);
//     } else if (event.touches.length === 1) {
//         isDragging = true;
//         lastX = event.touches[0].pageX;
//         lastY = event.touches[0].pageY;
//         zoomable.style.cursor = 'grabbing';
//     }
// });

// zoomable.addEventListener('touchmove', (event) => {
//     if (event.touches.length === 2 && initialDistance !== null) {
//         const currentDistance = getDistance(event.touches[0], event.touches[1]);
//         const deltaScale = currentDistance / initialDistance;
//         scale = Math.min(maxScale, Math.max(minScale, scale * deltaScale));
//         applyTransform();
//         initialDistance = currentDistance;
//     } else if (event.touches.length === 1 && isDragging) {
//         const deltaX = event.touches[0].pageX - lastX;
//         const deltaY = event.touches[0].pageY - lastY;
//         translateX += deltaX;
//         translateY += deltaY;
//         applyTransform();
//         lastX = event.touches[0].pageX;
//         lastY = event.touches[0].pageY;
//     }
// });

// zoomable.addEventListener('touchend', () => {
//     isDragging = false;
//     zoomable.style.cursor = 'grab';
//     initialDistance = null;
// });

// // PC用のドラッグイベント
// zoomable.addEventListener('mousedown', (event) => {
//     isDragging = true;
//     lastX = event.pageX;
//     lastY = event.pageY;
//     zoomable.style.cursor = 'grabbing';
// });

// document.addEventListener('mousemove', (event) => {
//     if (isDragging) {
//         const deltaX = event.pageX - lastX;
//         const deltaY = event.pageY - lastY;
//         translateX += deltaX;
//         translateY += deltaY;
//         applyTransform();
//         lastX = event.pageX;
//         lastY = event.pageY;
//     }
// });

// document.addEventListener('mouseup', () => {
//     isDragging = false;
//     zoomable.style.cursor = 'grab';
// });

// // 画像の変形を適用する関数
// function applyTransform() {
//     const svgFrameWidth = svgFrame.offsetWidth;
//     const svgFrameHeight = svgFrame.offsetHeight;
//     const zoomableWidth = svgFrameWidth * scale;
//     const zoomableHeight = svgFrameHeight * scale;

//     const maxTranslateX = (zoomableWidth - svgFrameWidth) / 2;
//     const maxTranslateY = (zoomableHeight - svgFrameHeight) / 2;

//     translateX = Math.min(maxTranslateX, Math.max(-maxTranslateX, translateX));
//     translateY = Math.min(maxTranslateY, Math.max(-maxTranslateY, translateY));

//     zoomable.style.transform = `scale(${scale}) translate(${translateX / scale}px, ${translateY / scale}px)`;
// }