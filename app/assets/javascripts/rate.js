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
  function lastBuildTable(tabel){
    var html = `
      <tr>
        <td>合計</td>
        <td>${tabel}</td>
        <td>${tabel}</td>
        <td>${tabel}</td>
      </tr>
      `
      targetTable.append(html);
  }
  $('#trial_cal').on('click',function(e){
    e.preventDefault();
    var hashForm = {};
    hashForm.test = $('input[name = "method"]:checked').val();


    $.ajax({
      method: 'GET',
      url: 'api/rates',
      dataType: 'json'
    })
    .done(function(rates){
      $('#target_table').children().remove();
      buildTable(1);
      buildTable(2);
      lastBuildTable(3);

      console.log(rates);
      console.log(hashForm.test);
      console.log($('input[name = "method"]:checked').val());
      console.log($('.price-form-text').val());
      console.log($('#sta_month').val());
      console.log($('#ope_month').val());  
    })
    .fail(function(){
      console.log('Error')
    })
  })
})