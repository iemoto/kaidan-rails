$(function(){
  var targetTable = $('#target_table');
  function buildTable(tabel){
    var html = `
      <tr>
        <td>${tabel}</td>
        <td>${tabel}</td>
        <td>${tabel}</td>
        <td>${tabel}</td>
      </tr>
      `
      targetTable.append(html);
  }

  function straightLine( serviceLife , price ){
    

  }


  $('#trial_cal').on('click',function(e){
    e.preventDefault();
    $.ajax({
      method: 'GET',
      url: 'api/rates',
      dataType: 'json'
    })
    .done(function(rates){
      $('#target_table').children().remove();
      console.log(rates[0]);
      buildTable(1);
      buildTable(2);
      var hashForm = {};
      hashForm.method = parseInt($('input[name = "method"]:checked').val(), 10);
      hashForm.serviceLife = parseInt($('#ser_life').val(), 10);
      hashForm.price = parseInt($('.price-form-text').val(), 10);
      hashForm.startMonth = parseInt($('#sta_month').val(), 10);
      hashForm.operationMonth = parseInt($('#ope_month').val(), 10);

      switch (hashForm.method){
        case 0:
          console.log(0);
          break;
        case 1:
          break;
        case 2:
          break;
      }
    })
    .fail(function(){
      console.log('Error')
    })
  })
})