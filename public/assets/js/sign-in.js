
// $('.alert').hide();
$('.login-alert').hide();
$('.pass-err-msg').hide();

$('.alert-signup').hide();
$('.alert-signin').hide();
$('.alert-reset').hide();
$('.alert-success').hide();

 $('.alert-danger').hide();
 
$("#createUserForm").submit(function(event) {
    // Prevent the form from submitting via the browser.
    event.preventDefault();
   
    if($("#password").val()!= $("#confirmpassword").val()){
         $(".alert").html('Password and Confirm Password must be same.');
        $(".alert").show();

     }
     else{
        //register user
        
        $.ajax({
         type : "POST",
         data: {
                
                email :  $("#email").val(),
                password : $("#password").val(),
                firstname: "",
                lastname: "",
                location :  "",
                public:1,
                admin: false,
                 bio: "",
                 avatar: "",
                 url: "",
                 activated: "n"
                },
         
         url : "/users/",
         success : function(customer) {
             
             window.location.assign("/activate/?id="+customer._id);
         },
         error : function(error) {
              
            $(".alert-signin").hide();
             if(error.status==410){
                
                $(".alert-signup").html("Email already in use. Try again");
                $(".alert-signup").show();
                
             }
             else{
                $(".alert-signup").html("Error registering. Please try again later.");
                $(".alert-signup").show();
                
             }
         }
         
      });
        
     }
 });
 $("#loginUserForm").submit(function(event) {
       
        // Prevent the form from submitting via the browser.
        event.preventDefault();
        var email = $("#loginemail").val();
        var password = $("#loginpassword").val();
        console.log("password: "+password);
        console.log("email: "+email);
        $.ajax({
                url: '/users/login',
                type: "POST",
                dataType: "json",
                data: {
                    email: email,
                    password: password
                },
                /**
                * A function to be called if the request succeeds.
                */
                success: function(data, textStatus, jqXHR) {
                    
                    window.location.assign("/profile/?id="+data._id);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    $(".alert-signon").hide();
                    $(".alert-signin").html('Error logging in, please confirm username and password are correct');
                    $(".alert-signin").show();
                }
        });
        
});
$("#updateUserInfo").submit(function(event) {
       
        // Prevent the form from submitting via the browser.
        event.preventDefault();
        var id = $("#id-hidden").val();
        var firstname = $("#info-firstname").val();
        var lastname = $("#info-lastname").val();
        var location = $("#info-location").val();
        var url = $("#info-url").val();
        var bio = $("#info-bio").val();
       
        
            $.ajax({
                url: '/users/updateAccount',
                type: "POST",
                dataType: "json",
                data: {
                    id:id,
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
$("#acvitateUser").submit(function(event) {
       
    // Prevent the form from submitting via the browser.
    event.preventDefault();
    var url_string = window.location.href; //window.location.href
    var url = new URL(url_string);
    var id = url.searchParams.get("id");
    console.log(id);
   
        // $.ajax({
        //     url: '/users/activateAccount',
        //     type: "POST",
        //     dataType: "json",
        //     data: {
        //         id:id,
        //         activated: "y"
        //     },
        //     /**
        //     * A function to be called if the request succeeds.
        //     */
        //     success: function(data, textStatus, jqXHR) {
        //        //window.location.assign("/profile/?id="+data._id);
               
        //         $(".alert-success").show();
                
        //     },
        //     error: function(jqXHR, textStatus, errorThrown) {
                
        //         $(".alert-danger").html('Error updating information. Please try again from your profile.');
        //         $(".alert-danger").show();
                
        //     }
        // });
  
});

     
$("#sendRestForm").submit(function(event) {
       
        // Prevent the form from submitting via the browser.
        event.preventDefault();
        var resetEmail = $("#resetEmail").val();
        console.log("SEND TO: "+resetEmail);
        
            $.ajax({
                url: '/users/sendReset/',
                type: "POST",
                dataType: "json",
                data: {
                    email:  resetEmail
                },
                /**
                * A function to be called if the request succeeds.
                */
                success: function(data, textStatus, jqXHR) {
                    
                    $(".alert-success").html('Check your inbox for instructions');
                    $(".alert-success").show();
                    $(".alert-reset").hide(); 
                    
                    //success - email user with instructions
                    
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    $(".alert-reset").hide();
                    $(".alert-reset").html('Email not found, please try another');
                    $(".alert-reset").show();
                    $(".resetEmail").html('');

                }
                
            });
           
        
    

       
     });
$("#updateUserPassword").submit(function(event) {
    // Prevent the form from submitting via the browser.
    event.preventDefault();
   
    if($("#password").val()!= $("#confirmpassword").val()){
         $(".alert-danger").html('Password and Confirm Password must be same.');
        $(".alert-danger").show();

     }
     else{
        //update password
        
        var id = $("#id-hidden").val()
        console.log(id);
        $.ajax({
         type : "POST",
         url : "/users/resetPassword",
         data: {
                id: $("#id-hidden").val(),
                password: $("#password").val()
                
        },
         
         
         success : function(customer) {
            
            $(".alert-password-change").html("Password updated successfully. <a href='#'>Login</a>");
            $(".alert-password-change").show();
             //window.location.assign("/info/?id="+customer._id);
         },
         error : function(error) {
            $(".alert-signin").hide();
            $(".alert-signup").html("Error updating password. Please try again later.");
            $(".alert-signup").show();
                
             
         }
         
      });
        
     }
 });
 function activateUser() {
   //update to activated
  var _id= getUrlParameter("id");
  console.log("id: "+_id);
  $.ajax({ 
      url: '/users/activateAccount',
      type : "POST",
      data: {
          _id:_id,
          activated: "y"
      },
      success : function(user) {
            
            $("#info-url").hide();
            //window.location.assign("/info/?id="+user._id);
          
      },
      error : function(error) {
          
          $(".alert-signin").hide();
          if(error.status==410){
              
              $(".alert-signup").html("Email already in use. Try again");
              $(".alert-signup").show();
              
          }
          else{
              $(".alert-signup").html("Error registering. Please try again later.");
              $(".alert-signup").show();
              
          }
      }
  });
  
  }
 
     
