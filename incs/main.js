$(document).ready(function() {
  function mongoGetDocs(){
    //var q = {"csvDays":"1"}
    $.ajax({
      url: 'https://api.mongohq.com/databases/oseDB/collections/gvcsDetails/documents',
      type: 'GET',
      dataType: 'json',
      data: {
        "_apikey":"xoxqi26x0rwv9loxhdfa",
        
      },
      success: function(r) {
        console.log("Mongo: success",r[1].title);
        
      },
      error: function(data) {
        console.log("Mongo: fail",data);
        return false;
      }
     });
  }
  
  function mongoCreateDocument(){
  //return false;
	var obj = {  "title" : "Universal Power Supply",
	             "status" : "Pre-Prototyping",
  	           "imgSrc" : "img/ene/universalPowerSupply.png",
  	           "ovrView" : "Forms the backbone of an off-grid electrical system.",
  	           "video" : "",
  	           "uses" : "",
  	           "works" : "" 
	}
	
	$.ajax({
    url: 'https://api.mongohq.com/databases/oseDB/collections/gvcsDetails/documents',
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




  mongoCreateDocument();
});

