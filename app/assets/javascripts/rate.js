$(function(){
  $('#trial_cal').on('click',function(e){
    e.preventDefault();
    console.log('ok');
    console.log($('input[name = "method"]:checked').val());
    console.log($('.price-form-text').val());
    console.log($('#sta_month').val());
    console.log($('#ope_month').val());
  })
})