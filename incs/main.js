$(document).ready(function() {
  var gvcsRawData;
  
//List of GVCS
  function createGVCSList(l){
    $('.gvcsList').empty();
    $(l).each(function(){
      $('.gvcsList').append('<li data-theme="c" data-transition="fade" class="gvcsData"><a href="#" data-id="'+this._id.$oid+'"><img src="'+this.imgSrc+'" alt="Thumbnail" width="100" height="100" /><h3>'+this.name+'</h3><p>'+this.status+'</p></a></li>'); 
    });
    
    console.log('Name: '+l[0].name);
    console.log('ID: '+l[0]._id.$oid);
    
    $('.gvcsList').listview('refresh');
    
//On Click Details    
    console.log("at this very moment I am attacking the click to *ALL* list items");
    $('.gvcsData a').on('tap', function(){
        console.log('clicked');
        var clickedOn = $(this).data('id');
      $(gvcsRawData).each(function(){
        if(this._id.$oid == clickedOn){
          console.log(this.name);
          console.log('item details would show here', this);
          createGVCSDetail(this);
          $.mobile.changePage('#itemDetails');
        }
      });
      return false;   
    });
  }  
  
//Detail page of GVCS
  function createGVCSDetail(d){ 
      console.log('Details: ');
      console.log(d);
      console.log(d.largeImg);
      var headingItems = $('#headingItem');
      var imgItems = $('#imgItem');
      var ovrView = $('#ovrView');
      var use = $('#useItem');
      var worksWith = $('#worksItem');
      var title1 = $('#listTitle1');
      var title2 = $('#listTitle2');
      var video = $('#vimeoPlayer');
      
     /*
 if($('#titleDetail').text().length >= 15)
      {
        console.log('TOO LONG!');
        ovrView.css('padding-top', '.625em');
      }
*/
      imgItems.attr('src', ''+d.largeImg+''); 
      headingItems.html('<h3>'+d.name+'</h3><p>'+d.status+'</p>');
      ovrView.html('<p>'+d.ovrView+'</p>');
      video.attr('src',''+d.video+'');
      console.log(d.video);
      
      
      
      
      /* title1.html('<h2>'+d.listingTitle1+'</h2>'); */
     /*
 console.log(d.listing1.name);
      use.html('<li data-theme="c" data-transition="fade" class="gvcsData"><a href="#" data-id="'+d._id.$oid+'"><img src="'+d.imgSrc+'" alt="Thumbnail" width="100" height="100" /><h3>'+d.name+'</h3><p>'+d.status+'</p></a></li>');
*/
      
  };
  
//Vimeo
/*
function vimeoGetVideo(v){
  console.log('THIS IS WHEN THE VIDEO SHOULD PLAY');
  var vimeoURL=''+v.video+'';
  var vimeoObj={
    width:300,
    height:169,
    byline:false,
    title:false,
    portrait:false,
    color:'a3bd40'
  };
  
  $.getJSON(vimeoURL, vimeoObj, function(vidData){
    var vimeoHTML = $(document.createElement('iframe').attr({src:vidData[0].url, width:vimeoObj.width, height:vimeoObj.height, frameborder:0}));
    $('#vimeoBox').append(vimeoHTML);
      console.log('HTML: ',vimeoHTML);
  });
  console.log(vimeoURL);
  console.log(vimeoObj); 
};
*/  
  
  
  
  /*
function vimeoGetVideo(){
    $.ajax({
      url: 'http://vimeo.com/api/v2/video/',
      type: 'GET',
      dataType: 'json',
      data: {
          'video_id':'29562529',
          'output':'json'
      },
      success: function(r) {
        console.log("Vimeo: success",r);
      },
      error: function(data) {
        console.log("Vimeo: fail",data);
        return false;
      }
     });
  }
*/
   
//******************************************** Start Agriculture ***********************************  
//Returns gvcsList(Agri) from MongoHQ
  function mongoGetGVCSList(){
    $.ajax({
      url: 'https://api.mongohq.com/databases/oseDB/collections/gvcsList/documents',
      type: 'GET',
      dataType: 'json',
      data: {
        "_apikey":"xoxqi26x0rwv9loxhdfa"
      },
      success: function(r) {
/*         console.log("Mongo: success",r); */
        createGVCSList(r);
        gvcsRawData = r;
      },
      error: function(data) {
        console.log("Mongo: fail",data);
        return false;
      }
     });
  }
  
//On Click Agriculture  
  $('#agri').on('tap', function(){
    $('.title').html('<h1>Agriculture</h1>');
    mongoGetGVCSList();
    $.mobile.changePage('#gvcsDetails');
    return false;   
  });
  
//******************************************** End Agriculture ***********************************  
  
//******************************************** Start Energy ***********************************  
//Returns gvcsEne from MongoHQ
  function mongoGetGVCSEne(){
    $.ajax({
      url: 'https://api.mongohq.com/databases/oseDB/collections/gvcsEne/documents',
      type: 'GET',
      dataType: 'json',
      data: {
        "_apikey":"xoxqi26x0rwv9loxhdfa"
      },
      success: function(r) {
/*         console.log("Mongo: success",r[1].title); */
        createGVCSList(r);
        gvcsRawData = r;
      },
      error: function(data) {
        console.log("Mongo: fail",data);
        return false;
      }
     });
  }
  
//On Click Energy
  $('#ener').on('tap', function(){
    $('.title').html('<h1>Energy</h1>');
    mongoGetGVCSEne();
    $.mobile.changePage('#gvcsDetails');
    return false;   
  });   
  
//******************************************** End Energy ***********************************  
  
//******************************************** Start Habitat *********************************** 
//Returns gvcsEne from MongoHQ
  function mongoGetGVCSHab(){
    $.ajax({
      url: 'https://api.mongohq.com/databases/oseDB/collections/gvcsHab/documents',
      type: 'GET',
      dataType: 'json',
      data: {
        "_apikey":"xoxqi26x0rwv9loxhdfa"
      },
      success: function(r) {
/*         console.log("Mongo: success",r[1].title); */
        createGVCSList(r);
        gvcsRawData = r;
      },
      error: function(data) {
        console.log("Mongo: fail",data);
        return false;
      }
     });
  }
  
//On Click Energy
  $('#habi').on('tap', function(){
    $('.title').html('<h1>Habitat</h1>');
    mongoGetGVCSHab();
    $.mobile.changePage('#gvcsDetails');
    return false;   
  });  

//******************************************** End Habitat ***********************************   
 
//******************************************** Start Industry ***********************************   
//Returns gvcsInd from MongoHQ
  function mongoGetGVCSInd(){
    $.ajax({
      url: 'https://api.mongohq.com/databases/oseDB/collections/gvcsInd/documents',
      type: 'GET',
      dataType: 'json',
      data: {
        "_apikey":"xoxqi26x0rwv9loxhdfa"
      },
      success: function(r) {
/*         console.log("Mongo: success",r[1].title); */
        createGVCSList(r);
        gvcsRawData = r;
      },
      error: function(data) {
        console.log("Mongo: fail",data);
        return false;
      }
     });
  }

//On Click Industry
$('#indu').on('tap', function(){
    $('.title').html('<h1>Industry</h1>');
    mongoGetGVCSInd();
    $.mobile.changePage('#gvcsDetails');
    return false;   
  })  

//******************************************** End Industry ***********************************   

//******************************************** Start Materials *********************************** 
//Returns gvcsMat from MongoHQ
  function mongoGetGVCSMat(){
    $.ajax({
      url: 'https://api.mongohq.com/databases/oseDB/collections/gvcsMat/documents',
      type: 'GET',
      dataType: 'json',
      data: {
        "_apikey":"xoxqi26x0rwv9loxhdfa"
      },
      success: function(r) {
/*         console.log("Mongo: success",r[1].title); */
        createGVCSList(r);
        gvcsRawData = r;
      },
      error: function(data) {
        console.log("Mongo: fail",data);
        return false;
      }
     });
  }
  
//On Click Materials
  $('#mate').on('tap', function(){
    $('.title').html('<h1>Materials</h1>');
    mongoGetGVCSMat();
    $.mobile.changePage('#gvcsDetails');
    return false;   
  });  

//******************************************** End Materials ***********************************   

//******************************************** End Transportation ***********************************   
//Returns gvcsTran from MongoHQ
  function mongoGetGVCSTran(){
    $.ajax({
      url: 'https://api.mongohq.com/databases/oseDB/collections/gvcsTran/documents',
      type: 'GET',
      dataType: 'json',
      data: {
        "_apikey":"xoxqi26x0rwv9loxhdfa"
      },
      success: function(r) {
        console.log("Mongo: success",r[1].title);
        createGVCSList(r);
        gvcsRawData = r;
      },
      error: function(data) {
        console.log("Mongo: fail",data);
        return false;
      }
     });
  }
  
//On Click Transportation
  $('#tran').on('tap', function(){
    $('.title').html('<h1>Transportation</h1>');
    mongoGetGVCSTran();
    $.mobile.changePage('#gvcsDetails');
    return false;   
  });  

//******************************************** End Transportation ***********************************  

















//Thank you page for Email 
  $('#emailForm').submit(function(){
    $('#send').on('tap', function(){
      $.mobile.changePage('#thanks');
    });
     /* return false; */
   });
   
 /*
  $('#send').on('tap', function(){
      $('#name').val('');
      $('#email').val('');
      $('#mess').val('');
   });
*/ 
  
//Add to MongoHQ
 /*
 function mongoCreateDocument(){
	var obj = {  "imgSrc" : "img/mat/thumb/bioplasticExtruder",
	             "name" : "Bioplastic Extractor",
  	           "status" : "Research"
	}
	
	$.ajax({
    url: 'https://api.mongohq.com/databases/oseDB/collections/gvcsMat/documents',
    type: 'POST',
    dataType: 'json',
    data: {
      "_apikey":"xoxqi26x0rwv9loxhdfa",
      "document": obj
    },
    success: function(r) {
      console.log("Mongo: success",r);
    },
    error: function(data) {
      console.log("Mongo: fail",data);
    }
   });
  }
*/




/*   mongoCreateDocument(); */
});

