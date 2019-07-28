// DO GET USER BY ID
function ajaxGetUser(userId){
		$.ajax({
          url: '/users/'+userId,
          type: "GET",
          dataType: "json",
          data: {id: userId},
            success: function(data, textStatus, jqXHR) {
                   //set first name, lastname, email, avatar 
                   return data;
                   
            },
            error: function(jqXHR, textStatus, errorThrown) {
                    alert('An error occurred!');
                    
            }
        }); 
}