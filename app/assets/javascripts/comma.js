$(function(){
  $('#price').change(function(){
    var price = $('#price');
    if (price.val())
    var priceExport = parseInt($('#price').val(),10).toLocaleString();
    $('#price').val(priceExport);
  })
})