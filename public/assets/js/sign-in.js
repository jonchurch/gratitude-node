
$('.alert').hide();
$('.login-alert').hide();
$('.pass-err-msg').hide();

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
            
             if(error.status==410){
                
                $(".alert").html("Email already in use. Try again");
                $(".alert").show();
                
             }
             else{
                $(".alert").html("Error registering. Please try again later.");
                $(".alert").show();
                
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
                    $(".alert").html('Error logging in, please confirm username and password are correct');
                    $(".alert").show();
                }
            });
        }
    

       
     });
$("#sendRestForm").submit(function(event) {
       
        // Prevent the form from submitting via the browser.
        event.preventDefault();
        var email = $("#resetemail").val();
        
        
        console.log("email: "+email);
        if( email != "" && password != "" ){
            $.ajax({
                url: '/users/reset',
                type: "POST",
                dataType: "json",
                data: {
                    email: email
                
                },
                /**
                * A function to be called if the request succeeds.
                */
                success: function(data, textStatus, jqXHR) {
                    //success - email user with instructions
                    const nylas = Nylas.with('yCe3ohYdcfoCOqbA8vR0ZOFDTkAFvB');

                                    const draft = nylas.drafts.build({
                                        //from: 'GratitudeToday.io',
                                        subject: 'Reset your password',
                                        body:`Instructions to reset password  ` ,
                                        to: [{ name: 'GratitudeToday.io', email: 'adriannadeau.art@gmail.com' }]
                                    });
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    $(".alert").html('Error);
                    $(".alert").show();
                }
            });
        }
    

       
     });

     
