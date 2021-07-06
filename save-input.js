document.getElementById('saveInputList').addEventListener('click', function () {
    // var pdf = new jsPDF('p', 'pt', 'letter');
    // pdf.addHTML($('#card-body')[0], function () {
    //     pdf.save('Test.pdf');
    // });

    // Code form KonvaJS wiki
    var list = new jsPDF();
    var img = new Image();
    // var myForm =

    img.src = 'assets/generic-input_list1024_1.jpg'
    list.addImage(img, 'JPEG', 0, 0, 209.55, 270.933333333)

    var band = $('#bandname').val();
    var venue = $('#venue').val();
    var date = $('#showdate').val();
    var input1 = $('#input1').val();
    var input2 = $('#input2').val();
    var input3 = $('#input3').val();
    var input4 = $('#input4').val();
    var input5 = $('#input5').val();
    var input6 = $('#input6').val();
    var input7 = $('#input7').val();
    var input8 = $('#input8').val();
    var input9 = $('#input9').val();
    var input10 = $('#input10').val();
    var input11 = $('#input11').val();
    var input12 = $('#input12').val();
    var input13 = $('#input13').val();
    var input14 = $('#input14').val();
    var input15 = $('#input15').val();
    var input16 = $('#input16').val();
    // var notes = $('#notes').val();
    // var notes = function (text, pdf, x, y, start, space, linePadding) {
    //     try {
    //         var end = space;
    //         while (text.length > end) {
    //             tail = text.lastIndexOf(' ', end);
    //             if (tail > -1) {
    //                 end = (tail + 1);
    //             }
    //             t = text.substring(start, end);
    //             pdf.text(t, x, y += linePadding);
    //             start = end;
    //             end = start + space;
    //         }
    //         if (text.length <= end && text.lastIndexOf(' ') > 0) {
    //             t = text.substring(start);
    //             pdf.text(t, x, y += linePadding);
    //         }

    //         return y;
    //     } catch (err) {
    //         alert(err);
    //     }
    // }

    list.text(35, 27, band);
    list.text(35, 36.5, venue);
    list.text(35, 46, date);
    list.text(35, 55, input1);
    list.text(35, 65, input2);
    list.text(35, 74, input3);
    list.text(35, 84, input4);
    list.text(35, 93, input5);
    list.text(35, 102.5, input6);
    list.text(35, 112, input7);
    list.text(35, 121.5, input8);
    list.text(35, 131, input9);
    list.text(35, 140.5, input10);
    list.text(35, 150, input11);
    list.text(35, 159.5, input12);
    list.text(35, 168.5, input13);
    list.text(35, 177.5, input14);
    list.text(35, 187, input15);
    list.text(35, 196.5, input16);
    // list.text(35, 206, notes);

    list.save('input-list.pdf')

});