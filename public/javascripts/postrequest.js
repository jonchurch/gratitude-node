//CREATE NEW USER
function ajaxCreateUserPost(formData){
    	// DO POST
        
    	$.ajax({
                  type : "POST",
                  data : JSON.stringify(formData),
                  contentType : "application/json",
                  url : "/users/",
                  success : function(customer) {
                      //forward page with id to fill in optional information
                      console.log("id : "+customer._id);
                    window.location.assign("/info/?id="+customer._id);
                    
                  },
                  error : function(e) {
                     $(".err-msg").html("<p>" + 
                        "Post Failed! <br>"+e );
                        $(".err-msg").show(); 
                  }
               });
    	

    }
    
