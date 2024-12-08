/*========== 固有定数の設定 ==========*/
// 対象の画像のid
const imageElem = 'routemap';

// zoomスケールの設定
const panzoomMaxScale = 4;
const panzoomMinScale = 1;

// panzoomオブジェクトの親要素を取得
const panzoomParent = document.getElementById(imageElem).parentElement;

// panzoomオブジェクトの定義
const panzoom = Panzoom(
    document.getElementById(imageElem),
    {
        animate: true,
        contain: 'outside',
        initialZoom: 1,
        maxScale: panzoomMaxScale,
        minScale: panzoomMinScale,
        pinchAndPan: true,
        startScale: 1,
        step: 0.6,
    }
);

/*========== リスナーの設定 ==========*/
/* マウスホイールでのズームを有効化 */
panzoomParent.addEventListener("wheel", panzoom.zoomWithWheel);
/* ダブルクリックでのズームを有効化 */
panzoomParent.addEventListener('dblclick', (event) => {
    if(panzoom.getScale() === panzoomMaxScale) {
        panzoom.reset();
    } else {
        panzoom.zoomIn();
    };
});
/* ダブルタップでのズームを有効化 */
let lastTapTime = 0;
panzoomParent.addEventListener('touchend', (event) => {
    const currentTime = new Date().getTime();
    const tapInterval = currentTime - lastTapTime;

    if (tapInterval < 250 && tapInterval > 100) {
        if (event.touches.length > 0 || event.changedTouches.length > 1) {
            return;
        };
        if(panzoom.getScale() === panzoomMaxScale) {
            panzoom.reset();
        } else {
            panzoom.zoomIn();
        };
    };
    lastTapTime = currentTime;
});

window.addEventListener("resize", function() {
    panzoom.zoom(1);
})