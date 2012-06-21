/*-------------------------------Information------------------------------
Author: Rachael Hill
Date: 06/21/2012
Project: OSE Mobile App
Client: Open Source Ecology
*/
$(document).ready(function() {
  var gvcsRawData;
  var allData;
  var clickedCategory;
  
//List of GVCS
  function createGVCSList(l){
    $('.gvcsList').empty();
    $(l).each(function(){
      $('.gvcsList').append('<li data-theme="c" data-transition="fade" class="gvcsData"><a href="#" data-id="'+this._id.$oid+'"><img src="'+this.imgSrc+'" alt="Thumbnail" width="100" height="100" /><h3>'+this.name+'</h3><p>'+this.status+'</p></a></li>'); 
    });
    
    $('.gvcsList').listview('refresh');
    
//On Click Details    
    $('.gvcsData a').on('tap', function(){
        var clickedOn = $(this).data('id');
      $(gvcsRawData).each(function(){
        if(this._id.$oid == clickedOn){
          createGVCSDetail(this);
          $.mobile.changePage('#itemDetails');
        }
      });
      return false;   
    });
  }  
  
//Detail page of GVCS
  function createGVCSDetail(d){   
    var headingItems = $('#headingItem');
    var imgItems = $('#imgItem');
    var ovrView = $('#ovrView');
    var use = $('#usesList');
    var worksWith = $('#worksWith');
    var title1 = $('#listTitle1');
    var title2 = $('#listTitle2');
    var video = $('#videoPlayer');
      
    imgItems.attr('src', ''+d.largeImg+''); 
    headingItems.html('<h3>'+d.name+'</h3><p>'+d.status+'</p>');
    ovrView.html('<p>'+d.ovrView+'</p>');
    video.html('<iframe src="'+d.video+'" frameborder="0" allowfullscreen></iframe>');
    /* console.log(d.use); */
      
    /*
$(d.use).each(function(i, value){
      $(allData).each(function(){
        console.log('ALL: ',this);
        console.log('VALUE:', value);
        if(this._id.$oid == value){
          console.log('NAME: ',this.name);
          $(this).each(function(){
            use.append('<li data-theme="c" data-transition="fade" class="usesData"><a href="#" data-id="'+this._id.$oid+'"><img src="'+this.imgSrc+'" alt="Thumbnail" width="100" height="100" /><h3>'+this.name+'</h3><p>'+this.status+'</p></a></li>'); 
          });
*/
        
      //On Click Details    
         /*
 console.log("at this very moment I am attacking the click to *ALL* list items");
          $('.usesData a').on('tap', function(){
              console.log('clicked');
              use.listview('refresh');
              var clickedOn = $(this).data('id');
              console.log('Value: ',value);
              
            $(allData).each(function(){
              console.log('#######',this);
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
      });
    });
*/
  }
   
//******************************************** Start Category ***********************************  
//Returns Data From Selected Category
  function mongoGetGVCSList(){
    $.ajax({
      url: 'https://api.mongohq.com/databases/oseDB/collections/gvcsList/documents',
      type: 'GET',
      headers: {'Content-Type':'application/json'},
      dataType: 'json',
      data: {
        '_apikey':'xoxqi26x0rwv9loxhdfa',
        'q':JSON.stringify({
            'cat': clickedCategory
        })
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

//Returns All Data From The Collection  
  function mongoGetGVCSAll(){
    $.ajax({
      url: 'https://api.mongohq.com/databases/oseDB/collections/gvcsList/documents',
      type: 'GET',
      headers: {'Content-Type':'application/json'},
      dataType: 'json',
      data: {
        '_apikey':'xoxqi26x0rwv9loxhdfa'
      },
      success: function(r) {
/*         console.log("Mongo: success",r); */
        allData = r;
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
    clickedCategory = 'agri';
    mongoGetGVCSAll();
    mongoGetGVCSList();
    $.mobile.changePage('#gvcsDetails');
    return false;   
  });
  
//On Click Energy
  $('#ener').on('tap', function(){
    $('.title').html('<h1>Energy</h1>');
    clickedCategory = 'ene';
    mongoGetGVCSAll();
    mongoGetGVCSList();
    $.mobile.changePage('#gvcsDetails');
    return false;   
  });
 
//On Click Habitat
  $('#habi').on('tap', function(){
    $('.title').html('<h1>Habitat</h1>');
    clickedCategory = 'hab';
    mongoGetGVCSAll();
    mongoGetGVCSList();
    $.mobile.changePage('#gvcsDetails');
    return false;   
  }); 
 
//On Click Industry
  $('#indu').on('tap', function(){
    $('.title').html('<h1>Industry</h1>');
    clickedCategory = 'ind';
    mongoGetGVCSAll();
    mongoGetGVCSList();
    $.mobile.changePage('#gvcsDetails');
    return false;   
  });

//On Click Materials
  $('#mate').on('tap', function(){
    $('.title').html('<h1>Materials</h1>');
    clickedCategory = 'mat';
    mongoGetGVCSAll();
    mongoGetGVCSList();
    $.mobile.changePage('#gvcsDetails');
    return false;   
  });  

//On Click Transportation
  $('#tran').on('tap', function(){
    $('.title').html('<h1>Transportation</h1>');
    clickedCategory = 'tran';
    mongoGetGVCSAll();
    mongoGetGVCSList();
    $.mobile.changePage('#gvcsDetails');
    return false;   
  });         
    
//******************************************** End Category ***********************************    

//******************************************** End Email ***********************************    
//Email PHP AJAX Call
  function phpSendEmail(){
    $.ajax({
      url: '../incs/emailForm.php',
      type: 'POST',
      dataType: 'json',
      data: {
        name: $('#name').val(),
        email: $('#email').val(),
        mess: $('#mess').val()
      },
      success: function(r) {
        console.log("Email: success",r);
        setTimeout(function(){
          $.mobile.changePage('#thanks'); 
          $('#name').val('');
          $('#email').val('');
          $('#mess').val('');
        }, 1000)
      },
      error: function(data) {
        console.log("Email: fail",data);
        return false;
      }
     });
  }
  
//Clears input fields when clicking back btn  
  $('#back').on('click', function(){
    $('#name').val('');
    $('#email').val('');
    $('#mess').val('');
  });

//******************************************** End Email ***********************************    
  
//******************************************** Creates Changes to DB ***********************************      
  function mongoAdd(){
    $.ajax({
      url: 'https://api.mongohq.com/databases/oseDB/collections/gvcsEne/documents',
      type: 'GET',
      dataType: 'json',
      data: {
        "_apikey":"xoxqi26x0rwv9loxhdfa"
      },
      success: function(r) {
        console.log("Mongo: success",r);
        $(r).each(function(){
/*           console.log(this); */
          this.cat = 'ene';
          delete this._id;
          mongoCreateDocument(this);
        })
      },
      error: function(data) {
        console.log("Mongo: fail",data);
        return false;
      }
     });
  }
  /* mongoAdd(); */
  
//Add to MongoHQ
  function mongoCreateDocument(obj){
	$.ajax({
    url: 'https://api.mongohq.com/databases/oseDB/collections/gvcsList/documents',
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

