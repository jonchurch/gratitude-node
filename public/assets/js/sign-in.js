$(".pass-msg").show(); 
$(".pass-err-msg").hide();
$("#createUserForm").submit(function(event) {
    // Prevent the form from submitting via the browser.
    event.preventDefault();
    var email = $("#email").val();
    var firstname = $("#firstname").val();
    var lastname = $("#lastname").val();
    var password = $("#password").val();
    if($("#password").val()!= $("#confirmpassword").val()){
         
        $(".pass-msg").hide(); 
        $(".pass-err-msg").show();
     }
     else{
        //register user
        $(".pass-msg").hide(); 
        $(".pass-err-msg").hide();
        
        $.ajax({
         type : "POST",
         data: {
                firstname: firstname,
                lastname: lastname,
                email :  email,
                password : password,
               
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
                alert("email exists");
                 $(".err-container").show();
                 $(".err-msg").html("Email already in use. Try again");
                $(".err-msg").show();
               
             }
             else{
               alert("error");  
               $(".err-container").show();
                $(".err-msg").html("Error registering. Please try again later.");
                $(".err-msg").show();
                
             }
         }
         
      });
        
     }
 });

