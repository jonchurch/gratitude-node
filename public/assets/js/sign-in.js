$(".pass-msg").show(); 
$(".pass-err-msg").hide();
$("#createUserForm").submit(function(event) {
    // Prevent the form from submitting via the browser.
    
    var email = $("#email").val();
    
    if($("#password").val()!= $("#confirmpassword").val()){
                
        $(".pass-msg").hide(); 
        $(".pass-err-msg").show();
     }
     else{
        //register user
        $(".pass-msg").hide(); 
        $(".pass-err-msg").hide();
     }
   
    event.preventDefault();
   
 });

