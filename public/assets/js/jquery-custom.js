

var bioMaxLength = 500;
$('#bio').keyup(function() {
  var length = $(this).val().length;
  var length = bioMaxLength-length;
  $('#chars').text(length);
});

$('#postMsg').keyup(function() {
  var length = $(this).val().length;
  var length = bioMaxLength-length;
  $('#chars').text(length);
});
 
     
