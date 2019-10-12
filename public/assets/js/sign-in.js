
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
        if( email != "" && password != "" ){
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
        }
    

       
     });
$("#sendRestForm").submit(function(event) {
       
        // Prevent the form from submitting via the browser.
        event.preventDefault();
        var password = $("#password").val();
        var confirmpassword = $("#confirmpassword").val();
        
            $.ajax({
                url: '/users/resetPassword',
                type: "POST",
                dataType: "json",
                data: {
                    password:  $("#password").val()
                },
                /**
                * A function to be called if the request succeeds.
                */
                success: function(data, textStatus, jqXHR) {
                    $(".alert-success").html('Check your inbox for instructions');
                    $(".alert-success").show();
                    $(".alert-reset").hide(); 
                    
                    //success - email user with instructions
                    // const nylas = Nylas.with('yCe3ohYdcfoCOqbA8vR0ZOFDTkAFvB');

                    //                 const draft = nylas.drafts.build({
                    //                     //from: 'GratitudeToday.io',
                    //                     subject: 'Reset your password',
                    //                     body:`Instructions to reset password  ` ,
                    //                     to: [{ name: 'GratitudeToday.io', email: 'adriannadeau.art@gmail.com' }]
                    //                 });
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
     
