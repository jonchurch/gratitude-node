$(".alert").hide();
    $(".alert-success").hide();
    $(".alert-post-success").hide();
   $("#postMsgForm").submit(function(event) {
    
    // Prevent the form from submitting via the browser.
    event.preventDefault();
      var id = $("#id-hidden").val();
      
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
                
             
         }
         
      });
        
     
 });