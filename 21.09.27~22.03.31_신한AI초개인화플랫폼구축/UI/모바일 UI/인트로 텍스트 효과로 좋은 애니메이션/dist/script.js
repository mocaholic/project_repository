var listHTML = $(".Title").html();
var listItems = listHTML.split("<br>");
$(".Title").html("");
$.each(listItems, function(i, v) {
  var item =
    '<div class="Title-mask"><span class="Title-line">' + v + "</span></div>";
  $(".Title").append(item);
});