
$("#postMsgForm").submit(function(event) {
    
    // Prevent the form from submitting via the browser.
    event.preventDefault();
//    console.log("try to post:  "+$("#id").val());
    
        //create post
        $.ajax({
         type : "POST",
         data: {
            userid: "5d9e52459896ba2f680a37a4",
            postMsg: $("#postMsg").val(),
            postMediaType :  "",
            postMedia :   ""
         },
         
         url : "/posts/",
         success : function(customer) {
            $(".alert-success").html("Post submitted successfully, click here to view your Journal!");
            $(".alert-success").show();
         },
         error : function(error) {
             $(".alert-danger").html("Error Submitting Post");
            $(".alert-danger").show();
                
             
         }
         
      });
        
     
 });