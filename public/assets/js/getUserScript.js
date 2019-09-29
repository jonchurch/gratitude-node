
    $(document).ready(function() {
        
    var _id= getUrlParameter("id");
     var passId=_id;
      $.ajax({
          url: '/users/'+_id,
          type: "GET",
          dataType: "json",
          data: {id: _id},
            success: function(data, textStatus, jqXHR) {
                   //set first name, lastname, email, avatar 
                   
                    $("#name").html(data.firstname+" "+data.lastname);
                    $("#bio").html(data.bio);
                    
                    $("#location").val(data.location);
                    $("id").val(data._id);
                   
            },
            error: function(jqXHR, textStatus, errorThrown) {
                    console.log('Error occurred on info.ejs');
                    
            }
        }); 
        $("#btn_skip").click(function() {
            event.preventDefault();
            window.location.assign("/profile/?id="+ _id);
            
        });
        $("#updateUserInfo").submit(function(event) {
          // Prevent the form from submitting via the browser.
          console.log('in function: '+_id);
         
          // PREPARE FORM DATA
           var bio = $("#bio").val();
            var location = $("#location").val();
            
              $.ajax({
                type : "PUT",
                data: {
                    bio: bio,
                    location: location
                },
                url : "/users/"+passId,
              
              success : function(customer) {
                      //forward page with id to fill in optional information
                      
                    console.log("id : "+customer._id);
                    window.location.assign("/profile/?id="+customer._id);
                    
              },
                  error : function(error) {
                      console.log(error);
                      // if(error.status==410){
                      //    $(".err-msg").html("Error.");
                      //   $(".err-msg").show(); 
                      // }
              }
            });
              
    	
            
         });
        
        });
        
