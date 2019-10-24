$(".alert").hide();
$(".alert-success").hide();
$(".alert-post-success").hide();
$('.alert-success-account').hide();
$('.alert-danger-account').hide();

var id = $("#id-hidden").val();
$("#postMsgForm").submit(function(event) {
    
    // Prevent the form from submitting via the browser.
    event.preventDefault();
      
      
        //create post
        $.ajax({
         url : "/posts/",
         type : "POST",
         data: {
            userid:id,
            postMsg: $("#postMsg").val(),
            postMediaType :  "",
            postMedia :   ""
         },
         
         
         success : function(customer) {
            $(".alert-post-success").show();
            $("#postMsg").val('');
            
            
         },
         error : function(error) {
           
            $(".alert-post-danger").show();
            $("#postMsg").val('');
                
             
         }
         
      });


});




$("#updateProfile").submit(function(event) {
   event.preventDefault();
       var id = $("#id-hidden").val();
         var email = $("#info-email").val();
         console.log("email: "+email);
         var firstname = $("#info-firstname").val();
         var lastname = $("#info-lastname").val();
         var location = $("#info-location").val();
         var url = $("#info-url").val();
         var bio = $("#info-bio").val();
         console.log("in profile update: "+id);
         // Prevent the form from submitting via the browser.
         
   
  
   
       $.ajax({
           url: '/posts/updateProfileAccount',
           type: "POST",
           dataType: "json",
           data: {
               id:id,
               email:email,
               firstname: firstname,
               lastname: lastname,
               location: location,
               url:url,
               bio: bio
           },
           /**
           * A function to be called if the request succeeds.
           */
           success: function(data, textStatus, jqXHR) {
              //window.location.assign("/profile/?id="+data._id);
              
               $(".alert-success").show();
               
           },
           error: function(jqXHR, textStatus, errorThrown) {
               
               $(".alert-danger").html('Error updating information. Please try again from your profile.');
               $(".alert-danger").show();
               
           }
       });
 
});
               
//            },
//            error: function(jqXHR, textStatus, errorThrown) {
               
               
//                $(".alert-danger").show();
               
//            }
//        });
 
// });