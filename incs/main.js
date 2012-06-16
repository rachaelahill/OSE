$(document).ready(function() {
  var gvcsDetailID;
  
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
        console.log("Mongo: success",r[1].title);
        createGVCSList(r);
      },
      error: function(data) {
        console.log("Mongo: fail",data);
        return false;
      }
     });
  }
  
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
        console.log("Mongo: success",r[1].title);
        createGVCSList(r);
      },
      error: function(data) {
        console.log("Mongo: fail",data);
        return false;
      }
     });
  }
  
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
        console.log("Mongo: success",r[1].title);
        createGVCSList(r);
      },
      error: function(data) {
        console.log("Mongo: fail",data);
        return false;
      }
     });
  }
  
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
        console.log("Mongo: success",r[1].title);
        createGVCSList(r);
      },
      error: function(data) {
        console.log("Mongo: fail",data);
        return false;
      }
     });
  }
  
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
      },
      error: function(data) {
        console.log("Mongo: fail",data);
        return false;
      }
     });
  }

//Returns GVCSDetails  
  function mongoGetGVCSDetails(){
    $.ajax({
      url: 'https://api.mongohq.com/databases/oseDB/collections/gvcsDetails/documents',
      type: 'GET',
      dataType: 'json',
      data: {
        "_apikey":"xoxqi26x0rwv9loxhdfa"
      },
      success: function(r) {
/*         console.log("Mongo: success",r); */
        createGVCSDetail(r);
        gvcsDetailID = r;
      },
      error: function(data) {
        console.log("Mongo: fail",data);
        return false;
      }
     });
  }
  
//List of GVCS
  function createGVCSList(l){
    $('.gvcsList').empty();
    $(l).each(function(){
      $('.gvcsList').append('<li data-theme="c" data-transition="fade" class="gvcsData"><a href="#" data-id="'+this._id+'"><img src="'+this.imgSrc+'" alt="Thumbnail" width="100" height="100" /><h3>'+this.name+'</h3><p>'+this.status+'</p></a></li>'); 
    });
    $('.gvcsList').listview('refresh');
  }
  
//On Click Agriculture  
  $('#agri').on('tap', function(){
    $('.title').html('<h1>Agriculture</h1>');
    mongoGetGVCSList();
    $.mobile.changePage('#gvcsDetails');
    return false;   
  });
  
//On Click Energy
  $('#ener').on('tap', function(){
    $('.title').html('<h1>Energy</h1>');
    mongoGetGVCSEne();
    $.mobile.changePage('#gvcsDetails');
    return false;   
  });
  
//On Click Industry
  $('#indu').on('tap', function(){
    $('.title').html('<h1>Industry</h1>');
    mongoGetGVCSInd();
    $.mobile.changePage('#gvcsDetails');
    return false;   
  });
  
//On Click Materials
  $('#mate').on('tap', function(){
    $('.title').html('<h1>Materials</h1>');
    mongoGetGVCSMat();
    $.mobile.changePage('#gvcsDetails');
    return false;   
  });
  
//On Click Transportation
  $('#tran').on('tap', function(){
    $('.title').html('<h1>Transportation</h1>');
    mongoGetGVCSTran();
    $.mobile.changePage('#gvcsDetails');
    return false;   
  });
  
//Detail page of GVCS
  function createGVCSDetail(d){ 
    $(d).each(function(){
      $('.gvcsItemDetail').append('<img src="'+this.imgSrc+'" alt="Large Image" width="140" height="90" />');
    });
  }
  
//On Click Details  
  $('.gvcsList').on('tap', function(){
    mongoGetGVCSDetails();
    console.log('ID: '+this._id);
    console.log('gvcsDetailID: '+gvcsDetailID);
    /*
if(gvcsDetailID == this._id){
      
      $.mobile.changePage('#itemDetails');
    }
*/
    return false;   
  });
  
//Thank you page for Email 
  $('#emailForm').submit(function(){
    $('#send').on('tap', function(){
      $.mobile.changePage('#thanks');
      $('#name').val(''); 
      $('#email').val('');  
      $('#mess').val('');  
   
    });
    return false;
   }); 
  
//Add to MongoHQ
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




/*   mongoCreateDocument(); */
});

