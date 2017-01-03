window.print = (function() {

    //private
    var canvas, image_base64;
    canvas = document.getElementById("canvas");

    function canvasAsImage() {
        image_base64 = canvas.toDataURL("image/png", 1.0);
    }

    //public
    return ({
        toPDF: function(data) {
            var schedule = textSerialize.dataToTextArray(data);
            var stats = statistics.getStats(data);

            canvasAsImage();

            var doc = new PDFDocument();
            var stream = doc.pipe(blobStream());

            doc.image(image_base64, 25, 50, {scale:0.75});

            var startHeight = 350/2 - 0.5 * (28 + schedule.length*16);
            doc.fontSize(24);
            doc.text("Schedule:",360,startHeight);
            doc.fontSize(16);
            for (item of schedule) {
                doc.text(item);
            }
            doc.fontSize(16);
            doc.text("Sleep time:", 75, 400);
            doc.fontSize(24);
            doc.text(stats.sleep, {indent:10, lineGap:6});
            doc.moveDown();
            doc.fontSize(16);
            doc.text("Free time:");
            doc.fontSize(24);
            doc.text(stats.free, {indent:10, lineGap:6});
            doc.end();
            stream.on('finish', () => {
                var pdf = stream.toBlobURL('application/pdf');
                var win = window.open(pdf, '_blank');
                win.focus();
            });
        }
    });
}());
