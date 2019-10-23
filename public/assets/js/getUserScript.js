function getUserInfo(page){
    
    var _id= getUrlParameter("id");
     
      $.ajax({
          url: '/users/'+_id,
          type: "GET",
          dataType: "json",
          data: {id: _id},
            success: function(data, textStatus, jqXHR) {
                   //set data for specifice page
                  //  HTML Values
                  
                  $("#name").html(data.firstname+" "+data.lastname);
                   $("#website").html(data.website);
                   $("#id").html(data._id); 
                   $("#uid").html(data._id); 
                   
                  // input values
                  $("#id-hidden").val(data._id);
                  $("#avatar").attr("src","../"+data.avatar);
                  $("#bio").val(data.bio);
                  $("#url").val(data.url);
                  $("#firstname").val(data.firstname);
                  $("#lastname").val(data.lastname);
                  $("#email").val(data.email);
                  $("#email").html(data.email);
                  $("#visit-profile").attr("href","/profile/?id="+_id);
                  $("#location").html(data.location);
                  $("#location").val(data.location);

                  $("#info-link").attr("href","/info/?id="+_id);
                  
                   
                   if(page=='page'){
                         $("#name").html(data.firstname+" "+data.lastname);
                        $("#bio").html(data.bio);
                        
                        $("#location").val(data.location);
                        $("id").val(data._id);
                   }else if(page=='profile'){
                      $("#firstname").html(data.firstname)
                      
                      $("#lastname").html(data.lastname)
                      $("#email").html(data.email);
                      $("#account-link").attr("href","/account/?id="+_id);
                      $("#support-link").attr("href","/support/?id="+_id);
                      $("#journal-link").attr("href","/journal/?id="+_id);
                      
                      $("#url").html(data.url);
                      $("#bio").html(data.bio);
                      $("#location").html(data.location);
                      if(data.avatar==null){
                        //user default avatar
                       
                        $("avatar").html('<img src="/assets/img/avatar.png>');
                      }
                  
                      emailAddress= data.email;


                      //jquery datepicker plugin
                      var dateFormat = data.createDate;
                      var dateFormat = $.datepicker.formatDate('MM dd, yy', new Date(dateFormat));
                      //alert(dateFormat);
                      $("#reg-date").html(dateFormat);
                   }          
            },
            error: function(jqXHR, textStatus, errorThrown) {
                    console.log('Error occurred');
                    
            }
        }); 
        $("#btn_skip").click(function() {
            event.preventDefault();
            window.location.assign("/profile/?id="+ _id);
            
        });
}
        
