$(function(){
  var targetTable = $('#target_table');
  function appendTable(table){
    var html = `
      <tr>
        <td> ${table.id} </td>
        <td> ${table.beginValue.toLocaleString()} </td>
        <td> ${table.depValue.toLocaleString()} </td>
        <td> ${table.endValue.toLocaleString()} </td>
      </tr>`
    targetTable.append(html);
  }
  function roundJudge( value , jadgement ){
    if (value === null || isNaN(value) || typeof jadgement != 'number') {
      return NaN;
    }
    switch(jadgement){
      case 0:
        return Math.floor(value);
        break;
      case 1:
        return Math.round(value);
        break;
      case 2:
        return Math.ceil(value);
        break;
    }
  }
  function straightLine( formObj , rateObj ){

    if (typeof rateObj != 'object'|| typeof formObj != 'object') return false;

    var table = {};
    if (formObj.startMonth > formObj.operationMonth){
      table.depMonth = formObj.startMonth - formObj.operationMonth;
    }else{
      table.depMonth = 12 - (formObj.operationMonth - formObj.startMonth);
    }
    let temp;

    for( var i = 1; i < formObj.serviceLife + 1; i++ ) {
      table.id = i;
      table.beginValue = table.endValue;

      if (i === 1){
        table.beginValue = formObj.price;
        table.depValue = table.beginValue * rateObj.straight_line; 
        table.depValue = roundJudge( table.depValue , formObj.round );
        temp = table.depValue;
        if (!isNaN(formObj.startMonth) || !isNaN(formObj.operationMonth)){
          table.depValue = (table.depValue / 12) * table.depMonth;
          table.depValue = roundJudge( table.depValue , formObj.round );
        };
      };

      if (table.depValue >= table.beginValue){ table.depValue = table.beginValue - 1;};

      table.endValue = table.beginValue - table.depValue; 

      appendTable(table);

      if (i === 1){
        table.depValue = temp;
      };

      if (i === formObj.serviceLife && table.endValue > 1){
        table.id = i + 1;
        table.beginValue = table.endValue;
        table.depValue = table.beginValue - 1;
        table.endValue = table.beginValue - table.depValue;
        appendTable(table);
      }
    }
  }
  function fiexdRate( formObj , rateObj ){

    if (typeof rateObj != 'object'|| typeof formObj != 'object') return false;

    var table = {};
    var compeJudg = Boolean('true');
    if (formObj.startMonth > formObj.operationMonth){
      table.depMonth = formObj.startMonth - formObj.operationMonth;
    }else{
      table.depMonth = 12 - (formObj.operationMonth - formObj.startMonth);
    }

    for( var i = 1; i < formObj.serviceLife + 1; i++ ) {
      table.id = i;
      table.beginValue = table.endValue;
      table.depValue = table.beginValue * rateObj.fixed_rate; 
      table.depValue = roundJudge( table.depValue , formObj.round );
      if (compeJudg){
      table.revPrice = table.endValue ;
      debugger
      }
      
      if (table.guaranteed > table.depValue) {
        compeJudg = Boolean('');
        table.depValue = table.revPrice * rateObj.revised_depreciation_rate; 
        table.depValue = roundJudge( table.depValue , formObj.round );
      }

      if (i === 1){
        table.beginValue = formObj.price;
        table.depValue = table.beginValue * rateObj.fixed_rate; 
        table.depValue = roundJudge( table.depValue , formObj.round );
        table.guaranteed = table.beginValue * rateObj.guarantee_rate; 
        table.guaranteed = roundJudge( table.guaranteed , formObj.round );
        if (!isNaN(formObj.startMonth) || !isNaN(formObj.operationMonth)){
          table.depValue = (table.depValue / 12) * table.depMonth;
          table.depValue = roundJudge( table.depValue , formObj.round );
        };
      };

      if (table.depValue >= table.beginValue){ table.depValue = table.beginValue - 1;};

      table.endValue = table.beginValue - table.depValue; 

      appendTable(table);

      if (i === formObj.serviceLife && table.endValue > 1){
        table.id = i + 1;
        table.beginValue = table.endValue;
        table.depValue = table.beginValue - 1;
        table.endValue = table.beginValue - table.depValue;
        appendTable(table);
      }
    }
  }
  var table = {};
  if (formObj.startMonth > formObj.operationMonth){
    table.depMonth = formObj.startMonth - formObj.operationMonth;
  }else{
    table.depMonth = 12 - (formObj.operationMonth - formObj.startMonth);
  }
  let temp;

  for( var i = 1; i < formObj.serviceLife + 1; i++ ) {
    table.id = i;
    table.beginValue = table.endValue;

    if (i === 1){
      table.beginValue = formObj.price;
      table.depValue = table.beginValue * rateObj.straight_line; 
      table.depValue = roundJudge( table.depValue , formObj.round );
      temp = table.depValue;
      if (!isNaN(formObj.startMonth) || !isNaN(formObj.operationMonth)){
        table.depValue = (table.depValue / 12) * table.depMonth;
        table.depValue = roundJudge( table.depValue , formObj.round );
      };
    };

    if (table.depValue >= table.beginValue){ table.depValue = table.beginValue - 1;};

    table.endValue = table.beginValue - table.depValue; 

    appendTable(table);

    if (i === 1){
      table.depValue = temp;
    };

    if (i === formObj.serviceLife && table.endValue > 1){
      table.id = i + 1;
      table.beginValue = table.endValue;
      table.depValue = table.beginValue - 1;
      table.endValue = table.beginValue - table.depValue;
      appendTable(table);
    }
  }
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
      var hashForm = {};
      hashForm.method = parseInt($('input[name = "method"]:checked').val(), 10);
      hashForm.round = parseInt($('input[name = "round"]:checked').val(), 10);
      hashForm.serviceLife = parseInt($('#ser_life').val(), 10);
      hashForm.price = Number($('.price-form-text').val().split(',').join(''));
      hashForm.price = parseInt(hashForm.price, 10);
      hashForm.startMonth = parseInt($('#sta_month').val(), 10);
      hashForm.operationMonth = parseInt($('#ope_month').val(), 10);

      switch (hashForm.method){
        case 0:
          straightLine( hashForm , rates[hashForm.serviceLife - 1] );
          break;
        case 1:
          fiexdRate( hashForm , rates[hashForm.serviceLife - 1] );
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