$(".alert").hide();
$(".alert-success").hide();
// $(".alert-post-success").hide();
$(".alert-post-danger").hide();
$('.alert-success-account').hide();
$('.alert-danger-account').hide();

console.log('in postfunctions')




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
         
         
         success : function(customer) {
            $(".alert-post-success").show();
            $(".alert-post-danger").hide();
            $("#postMsg").val('');
            
            
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
              
              window.location.assign("/profile/?id="+data._id);
               
           },
           error: function(jqXHR, textStatus, errorThrown) {
               
               $(".alert-danger").html('Error updating information. Please try again from your profile.');
               $(".alert-danger").show();
               
           }
       });
 
});

function loadPosts() {
    
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
        
            let recentPostsHTML=$("#recentPosts");
            // console.table(data);
           
            $.each( data, function( key, value ) {
                
                    recentPostsHTML+="<div class='cardbox'>"+
		 
                    "<div class='cardbox-heading'>"+
                    
                    "<div class='dropdown pull-right'>"+
                    "<button class='btn btn-secondary btn-flat btn-flat-icon' type='button' data-toggle='dropdown' aria-expanded='false'>"+
                    "<em class='fa fa-ellipsis-h'></em>"+
                    "</button>"+
                    "<div class='dropdown-menu dropdown-scale dropdown-menu-right' role='menu' style='position: absolute; transform: translate3d(-136px, 28px, 0px); top: 0px; left: 0px; will-change: transform;'>"+
                    "<a class='dropdown-item' href='#'>Like</a>"+
                    "<a class='dropdown-item' href='#'>Re-Post</a>"+
                    "<a class='dropdown-item' href='#'>Report</a>"+
                    "</div>"+
                    "</div>"+
                 
                
                    "<div class='media m-0'>"+
                    "<div class='d-flex mr-3'>"+
                    "<a href='#'><img class='img-responsive img-circle' src='assets/img/users/18.jpg' alt='User'/></a></div>"+
                    "<div class='media-body'>"+
                    "<p class='m-0'>Benjamin Robinson</p>"+
                    "<small><span>10 hours ago</span></small>"+
                    "</div>"+
                    "</div>"+
                    "</div>"+
                    "</div>";
                 
                });
                $("#recentPosts").html(recentPostsHTML);
            
           
           
                // var dateFormat = value.createDate;
                // var postedName=value.postedBy;
                // name = postedName.replace("Welcome","");
                
                // dateFormat = $.datepicker.formatDate('MM dd, yy', new Date(dateFormat));
                // postsHTML += "<p>"+value.postMsg+
                // "<ul class=\"meta-post\">"+
                // "<li><i class=\"icon-calendar\"></i> "+dateFormat+"</a></li>"+
                //  "<li><i class=\"icon-user\"></i>"+name+"</a></li>"+
                // "</ul></p><br/><hr/>" ;
                
                
           
            
            // $("#recent-posts-list").html(postsHTML);

       
        },
        error: function(jqXHR, textStatus, errorThrown) {
              $(".alert-post-success").show();
            
            
        }
    });

}