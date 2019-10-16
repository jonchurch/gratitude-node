function getUserInfo(page){
    
    var _id= getUrlParameter("id");
     var passId=_id;
      $.ajax({
          url: '/users/'+_id,
          type: "GET",
          dataType: "json",
          data: {id: _id},
            success: function(data, textStatus, jqXHR) {
                   //set data for specifice page
                   $("#id").html(data._id); 
                   $("#uid").html(data._id); 
                   $("#id-hidden").val(data._id);

                   $("#avatar").attr("src","../"+data.avatar);
                      $("#bio").val(data.bio);
                      $("#location").val(data.location);
                      $("#url").val(data.url);
                   
                   
                   $("#name").html(data.firstname+" "+data.lastname);
                   $("#website").html(data.website);
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
                   else if(page="resetpassword"){


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
        
