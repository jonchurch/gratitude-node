// method to get param(s) and return to call

$.urlParam = function(name){
    console.log("param: "+name);
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    console.log(window.location.href);
    console.log("value:"+results);
    return results[1] || 0;
}