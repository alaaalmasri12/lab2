'use strict'
//constructor sad
var horns = [];
var horns2 = [];

function Horn(data) {

    this.image = data.image_url;
    this.title = data.title;
    this.description = data.description;
    this.keyword = data.keyword;
    this.horns = data.horns;
    horns.push(this);
}
function Horn2(data2) {

    this.image = data2.image_url;
    this.title = data2.title;
    this.description2 = data2.description;
    this.keyword = data2.keyword;
    this.horns = data2.horns;
    horns2.push(this);
    console.log(horns2);
}

Horn.prototype.hornerender = function () {
    let hournresult = $('<div></div>');
    hournresult.addClass("hourse-box");
    hournresult.addClass(this.keyword);


    let horn = $('#photo-template').clone();
    let div = $('#photo-template');

    hournresult.html(horn);
    hournresult.find('h2').text(this.title);
    hournresult.find('img').attr('src', this.image);
    hournresult.find('p').text(this.description);

    $('main').append(hournresult);

}
function fillhornitems() {
    $('section:first').remove();
    $('.alaa').css('display', 'block');

    var seenPhoto = [];
    horns.forEach((horn) => {
        if (!seenPhoto[horn.keyword]) {
            var hornoption = `<option value="${horn.keyword}"> ${horn.keyword}</option>`;
            seenPhoto[horn.keyword] = true;
        }

        $('select:first').append(hornoption);
    })
}
function fillhornitems2() {
    $('section:first').remove();
    var seenPhoto2 = [];

    horns2.forEach((horn2) => {
        if (!seenPhoto2[horn2.keyword]) {
            var hornoption2 = `<option value="${horn2.keyword}"> ${horn2.keyword}</option>`;
            seenPhoto2[horn2.keyword] = true;
        }
        $('option:first')
            .empty()
            .append(hornoption2);
    })
}

$('select').on('change', function () {
    let selectitem = $(this).val();
    console.log(selectitem);

    $('div').hide();
    $(`.${selectitem}`).fadeIn();

})
Horn.prototype.renderimages = function () {
    let hournresult = $('.page-box');
    for(let i=0;i<horns.length;i++)
    {
        console.log(horns[i].keyword);
        hournresult.attr('class',(this.keyword)); 
    }
          
        


    hournresult.addClass('page-boxs');
    let template = $('#template').html();
    let html = Mustache.render(template, this);
    $('#page-images').append(html);


};

Horn2.prototype.renderimages2 = function () {
    let hournresult = $('.page-box');
        hournresult.attr('class',(this.keyword)); 


    hournresult.addClass('page-boxs');
    let template = $('#template').html();

    let html = Mustache.render(template, this);
    $('main').append(html);
};

$.get("../data/page-1.json")
    .then(data => {
        data.forEach((val) => {
            var hornitem = new Horn(val);
            hornitem.hornerender();
            $("#page1").on("click", function () {
                 
                

                var renderedObj = hornitem.renderimages()
                $('.page-box').addClass('alaa');
                $(".hourse-box").remove();

                $('.alaa2').css("display", "none");
                $('#page-images').append(renderedObj);
            })

        });

        fillhornitems();
    });
$("#page2").on("click", function () {

    $.get("../data/page-2.json")
        .then(data2 => {
            data2.forEach((val2) => {
                var hornitem2 = new Horn2(val2);
                $(".hourse-box").remove();
                var renderedObj = hornitem2.renderimages2()
                $('.page-box').addClass('alaa2');


                $('.alaa').css("display", "none");
                $('#page-images').append(renderedObj);

            });

            fillhornitems2();
        })
});
