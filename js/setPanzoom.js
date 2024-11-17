const instance = panzoom(
    document.getElementById('routemap'),
    {
        smoothScroll: true,
        //transformOrigin: {x: 0.5, y: 0.5}, // change center point of wheel zoom.
        bounds: true,
        boundsPadding: 0.05,
        maxZoom: 5,
        minZoom: 1,
        initialZoom: 1,
        zoomDoubleClickSpeed: 1 // disable doubleclick zoom
        //beforeWheel: function(e) {return true;} // disable wheel zoom
    }
)

document.getElementById('routemap').parentElement.addEventListener("wheel", panzoom.zoomWithWheel);
document.getElementById('routemap').parentElement.addEventListener("panzoomchange", () => {
    const panzoomState = panzoom.getPan(); // 現在のパン位置
    const scale = panzoom.getScale(); // 現在のズーム倍率

    const containerRect = container.getBoundingClientRect(); // 親の div の境界
    const imgRect = imgElement.getBoundingClientRect(); // img 要素の境界
    const imgWidth = imgElement.offsetWidth * scale; // 拡大後の画像の幅
    const imgHeight = imgElement.offsetHeight * scale; // 拡大後の画像の高さ

    const minX = Math.min(0, containerRect.width - imgWidth);
    const maxX = Math.max(0, containerRect.width - imgWidth);
    const minY = Math.min(0, containerRect.height - imgHeight);
    const maxY = Math.max(0, containerRect.height - imgHeight);

    // パンの座標を制限
    const limitedX = Math.max(minX, Math.min(maxX, panzoomState.x));
    const limitedY = Math.max(minY, Math.min(maxY, panzoomState.y));

    // パンを更新
    if (limitedX !== panzoomState.x || limitedY !== panzoomState.y) {
        panzoom.pan(limitedX, limitedY, { animate: false });
    }
});