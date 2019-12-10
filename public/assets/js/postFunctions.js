$(".alert").hide();
$(".alert-success").hide();
// $(".alert-post-success").hide();
$(".alert-post-danger").hide();
$('.alert-success-account').hide();
$('.alert-danger-account').hide();


$("#postMsgForm").submit(function(event) {
    var id = $("#id-hidden").val();
   
    // Prevent the form from submitting via the browser.
    event.preventDefault();
      
  
        //create post
        $.ajax({
         url : "/posts/",
         type : "POST",
         data: {
            userid:id,
            postedBy: $("#postedBy").val(),
            postMsg: $("#postMsg").val(),
            postMediaType :  "",
            postMedia :   ""
         },
         
         
         success : function(posts) {
            
            $(".alert-post-success").show();
            $(".alert-post-danger").hide();
            window.location.assign("/profile/?id="+posts.user);
            
            
         },
         error : function(error) {
            $(".alert-post-success").hide();
            $(".alert-post-danger").show();
         
         }
         
      });


});
$("#updateProfile").submit(function(event) {
   event.preventDefault();
       var id = $("#id-hidden").val();
         var email = $("#info-email").val();
        
         var firstname = $("#info-firstname").val();
         var lastname = $("#info-lastname").val();
         var location = $("#info-location").val();
         var url = $("#info-url").val();
         var bio = $("#info-bio").val();
         
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
function loadPosts() {
   try{ 
        $.ajax({
            url: '/posts/',
            type: "GET",
            dataType: "json",
            data: {
                
            },
            /**
            * A function to be called if the request succeeds.
            */
            success: function(data, textStatus, jqXHR) {
                $(".alert-post-danger").hide();
                
                let recentPostsHTML="";
               
                $.each( data, function( key, value ) {
                        if(this.user){

                        var dateFormat = value.createDate;
                        dateFormat = $.datepicker.formatDate('MM dd, yy', new Date(value.createDate));
                        recentPostsHTML+="<div class='cardbox'>"+
            
                        "<div class='cardbox-heading'>"+
                        "<div class='media m-0'>"+
                        "<div class='d-flex mr-3'>"+
                        "<img class='img-responsive img-circle' src='"+this.user.avatar+"' alt='User'/></div>"+
                        "<div class='media-body'>"+
                        "<p class='m-0'>"+this.user.firstname+ ' '+this.user.lastname+"</p>"+
                        "<small><span>"+dateFormat+"</span></small><br/><br/>"+
                        this.postMsg+
                        
                        "</div>"+
                        "</div>"+
                        "</div>"+
                        "</div>";
                        }
                    
                    });
                   
                    $("#recentPosts").html(recentPostsHTML);
            
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $(".alert-post-success").hide();
                $(".alert-post-danger").show();
            }
        });
    }
    catch(err) {
        $(".alert-post-success").hide();
        $(".alert-post-danger").show();
   }

}
$( "btn-return-profile" ).click(function() {
   
    window.location.assign("/");
});


