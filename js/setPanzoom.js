const panzoomParent = document.getElementById('routemap').parentElement;

const panzoom = Panzoom(
    document.getElementById('routemap'),
    {
        contain: 'outside',
        initialZoom: 1,
        maxScale: 5,
        minScale: 1,
        startScale: 1,
        step: 0.6,
    }
)

function dblzoom() {
    panzoom.zoomIn();
    alert('doubleClick')
}

panzoomParent.addEventListener("wheel", panzoom.zoomWithWheel);
panzoomParent.addEventListener("dblclick", function() {
    panzoom.zoomIn();
});