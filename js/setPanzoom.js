const panzoom = Panzoom(
    document.getElementById('routemap'),
    {
        contain: 'outside',
        initialZoom: 1,
        maxScale: 5,
        minScale: 1,
        startScale: 1,
    }
)

document.getElementById('routemap').parentElement.addEventListener("wheel", panzoom.zoomWithWheel);