
	
	// SUBMIT FORM
    $("#createUserForm").submit(function(event) {
		// Prevent the form from submitting via the browser.
		event.preventDefault();
		ajaxPost();
	});
    
    
    function ajaxPost(){
    	alert("in ajax");
    	// PREPARE FORM DATA
    	var formData = {
    		firstname : $("#firstname").val(),
    		lastname :  $("#lastname").val()
    	}
    	
    	// DO POST
    	$.ajax({
			type : "POST",
			contentType : "application/json",
			url : window.location + "http//localhost:3000/users/",
			data : JSON.stringify(formData),
			dataType : 'json',
			success : function(customer) {
				$(".err-msg").html("<p>" + 
					"Post Successfully! <br>" + JSON.stringify(customer)); 
					$(".err-msg").show();
			},
			error : function(e) {
				$(".err-msg").html("<p>" + 
					"Post Failed! <br>" );
					$(".err-msg").show(); 
			}
			
		});
    	
    	// Reset FormData after Posting
    	

    }
    
