var sceneWidth = 1050;
var sceneHeight = 400;

var stage = new Konva.Stage({
    container: 'container',
    width: sceneWidth,
    height: sceneHeight,
});
var layer = new Konva.Layer();

stage.add(layer);

var imageObj = new Image();

imageObj.onload = function () {
    var vanStage = new Konva.Image({
        x: 250,
        y: 25,
        image: imageObj,
        width: 550,
        height: 292,
    });

    // add the background image to the layer
    layer.add(vanStage);
};
imageObj.src = '/assets/vanStage.png';

// what is url of dragging element?
var itemURL = '';
document
    .getElementById('drag-items')
    .addEventListener('dragstart', function (e) {
        itemURL = e.target.src;
    });

// create transformer
var tr = new Konva.Transformer();

// create stage
var con = stage.container();

// initiate drag
con.addEventListener('dragover', function (e) {
    e.preventDefault(); // !important
});

// add drop 
con.addEventListener('drop', function (e) {
    e.preventDefault();
    // now we need to find pointer position
    // we can't use stage.getPointerPosition() here, because that event
    // is not registered by Konva.Stage
    // we can register it manually:
    stage.setPointersPositions(e);

    Konva.Image.fromURL(itemURL, function (image) {
        layer.add(image);

        image.position(stage.getPointerPosition());
        image.draggable(true);

        // get image size
        var size = image.size();
        var width = size.width;
        var height = size.height;

        // set size
        image.size({
            width: 150,
            height: 150
        });

        image.addEventListener('mouseover', function (e) {
            // add transformer to layer
            layer.add(tr);

            // get transformer nodes
            const nodes = tr.nodes();

            // set transformer nodes
            tr.nodes([image]);

            // get transformer rotate
            var rotateEnabled = tr.rotateEnabled();

            // set transformer rotate
            tr.rotateEnabled(true);
        });

        // remove transformer nodes 
        stage.on('click', function (e) {
            tr.nodes([]);
        });
    });
});

document.getElementById('savePDF').addEventListener('click', function () {
    // Code form KonvaJS wiki
    var plot = new jsPDF('l', 'px', [stage.width() * 1.3, stage.height() * 1.4]);
    plot.setTextColor('#000000');
    // first add texts
    stage.find('Text').forEach((text) => {
        const size = text.fontSize() / 0.75; // convert pixels to points
        plot.setFontSize(size);
        plot.text(text.text(), text.x(), text.y(), {
            baseline: 'top',
            angle: -text.getAbsoluteRotation(),
        });
    });

    // then put image on top of texts (so texts are not visible)
    plot.addImage(
        stage.toDataURL({ pixelRatio: 2 }),
        // 0, 0, 600, 350
        0,
        0,
        stage.width(),
        stage.height(),
    );

    plot.save('stage-plot.pdf');
});

// document.getElementById('clear').addEventListener('click', function () {
//     alert('clear')

// });

function fitStageIntoParentContainer() {
    var container = document.querySelector('#stage-parent');

    // now we need to fit stage into parent container
    var containerWidth = container.offsetWidth;

    // but we also make the full scene visible
    // so we need to scale all objects on canvas
    var scale = containerWidth / sceneWidth;

    stage.width(sceneWidth * scale);
    stage.height(sceneHeight * scale);
    stage.scale({ x: scale, y: scale });
}

fitStageIntoParentContainer();
// adapt the stage on any window resize
window.addEventListener('resize', fitStageIntoParentContainer);