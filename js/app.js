'use strict'
//constructor sad
var horns=[];

function Horn(data)
{

    this.image=data.image_url;
    this.title=data.title;
    this.description=data.description;
    this.keyword=data.keyword;
    this.horns=data.horns;
horns.push(this);
}
Horn.prototype.hornerender=function()
{
    let hournresult=$('<div></div>');
    hournresult.addClass("hourse-box");
    hournresult.addClass(this.keyword);


   let horn = $('#photo-template').clone();
  let div= $('#photo-template');

    hournresult.html(horn);
    hournresult.find('h2').text(this.title);
    hournresult.find('img').attr('src',this.image);
    hournresult.find('p').text(this.description);

    $('main').append(hournresult);
}
function fillhornitems()
{
    let seenPhoto=[];
    horns.forEach((horn)=>{
        if(!seenPhoto[horn.keyword])
        {
            console.log(seenPhoto[horn.keyword]);
            var hornoption=`<option value="${horn.keyword}"> ${horn.keyword}</option>`;
            seenPhoto[horn.keyword]=true;
        }
        
      $('select').append(hornoption);
    })
}
$('select').on('change',function(){
    let selectitem=$(this).val();
    $('div').hide();
    $(`.${selectitem}`).fadeIn(3000);
    
})

$.get("../data/page-1.json")
.then(data=>{
    data.forEach((val) => {
        let hornitem=new Horn(val);
        hornitem.hornerender();
        
    });
    fillhornitems();
});

    