$(function(){
  $('#price').change(function(){
    var priceExport = $('#price').val();
    priceExport = priceExport.replace(/[^0-9]/g, "");
    priceExport = parseInt(priceExport,10).toLocaleString();
    $('#price').val(priceExport);
  })
})