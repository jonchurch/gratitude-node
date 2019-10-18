
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
                firstname: $("#firstname").val(),
                lastname: $("#lastname").val(),
                email :  $("#email").val(),
                password : $("#password").val(),
                location :  "",
                 bio: "",
                 avatar: ""
                },
         
         url : "/users/",
         success : function(customer) {
             
             window.location.assign("/info/?id="+customer._id);
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
                url: '/users/updateAccount',
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
        var bio = $("#bio").val();
        var location = $("#location").val();
        var url = $("#url").val();
        console.log("id: "+id);
        console.log("bio: "+bio);
        console.log("location: "+location);
        console.log("url: "+url);
        
            $.ajax({
                url: '/users/updateAccount',
                type: "POST",
                dataType: "json",
                data: {
                    id:id,
                    bio: bio,
                    location: location,
                    url:url

                },
                /**
                * A function to be called if the request succeeds.
                */
                success: function(data, textStatus, jqXHR) {
                   window.location.assign("/profile/?id="+data._id);
                    
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    
                    $(".alert-danger").html('Error updating information. Please try again from your profile.');
                    $(".alert-danger").show();
                    
                }
            });
      
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
     
