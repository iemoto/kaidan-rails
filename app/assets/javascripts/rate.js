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
  };
  function roundJudge(value, jadgement){
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
    };
  };

  function firstYearUseMonths(startMonth, operationMonth){
    var depMonth;
    if (startMonth > operationMonth){
      depMonth = startMonth - operationMonth;
    }else{
      depMonth = 12 - (operationMonth - startMonth);
    }
    return depMonth;
  };

  function lastDepreciation(table, memoValue){
    table.id = table.id + 1;
    table.beginValue = table.endValue;
    table.depValue = table.beginValue - memoValue;
    table.endValue = table.beginValue - table.depValue;
    appendTable(table);
  };

  function straightLine( formObj , rateObj ){

    if (typeof rateObj != 'object'|| typeof formObj != 'object') return false;

    var table = {};
    let temp;

    table.depMonth = firstYearUseMonths(formObj.startMonth, formObj.operationMonth)

    for(var i = 1; i < formObj.serviceLife + 1; i++) {
      table.id = i;
      table.beginValue = table.endValue;

      if (i === 1){
        table.beginValue = formObj.price;
        table.depValue = table.beginValue * rateObj.straight_line; 
        table.depValue = roundJudge(table.depValue, formObj.round);
        temp = table.depValue;
        if (!isNaN(formObj.startMonth) || !isNaN(formObj.operationMonth)){
          table.depValue = (table.depValue / 12) * table.depMonth;
          table.depValue = roundJudge(table.depValue, formObj.round);
        };
      };

      if (table.depValue >= table.beginValue){table.depValue = table.beginValue - 1};

      table.endValue = table.beginValue - table.depValue; 

      appendTable(table);

      if (i === 1){
        table.depValue = temp;
      };

      if (i === formObj.serviceLife && table.endValue > 1){
        lastDepreciation(table , 1);
      }
    }
  }

  function fiexdRate(formObj, rateObj){

    if (typeof rateObj != 'object'|| typeof formObj != 'object') return false;

    var table = {};
    var compeJudg = Boolean('true');

    table.depMonth = firstYearUseMonths(formObj.startMonth, formObj.operationMonth)


    for(var i = 1; i < formObj.serviceLife + 1; i++) {
      table.id = i;
      table.beginValue = table.endValue;
      table.depValue = table.beginValue * rateObj.fixed_rate;
      table.depValue = roundJudge(table.depValue, formObj.round);
      if (compeJudg){table.revPrice = table.endValue};
      
      if (table.guaranteed > table.depValue){
        compeJudg = Boolean('');
        table.depValue = table.revPrice * rateObj.revised_depreciation_rate; 
        table.depValue = roundJudge(table.depValue, formObj.round);
      };

      if (i === 1){
        table.beginValue = formObj.price;
        table.depValue = table.beginValue * rateObj.fixed_rate; 
        table.depValue = roundJudge(table.depValue, formObj.round);
        table.guaranteed = table.beginValue * rateObj.guarantee_rate; 
        table.guaranteed = roundJudge(table.guaranteed, formObj.round);
        if (!isNaN(formObj.startMonth) || !isNaN(formObj.operationMonth)){
          table.depValue = (table.depValue / 12) * table.depMonth;
          table.depValue = roundJudge(table.depValue, formObj.round);
        };
      };

      if (table.depValue >= table.beginValue){table.depValue = table.beginValue - 1};

      table.endValue = table.beginValue - table.depValue; 

      appendTable(table);

      if (i === formObj.serviceLife && table.endValue > 1){
        lastDepreciation(table , 1);
      }
    }
  }
  function evenDepreciation(formObj){
    if (typeof formObj != 'object') return false;

    var table = {};
    let temp;

    table.depMonth = firstYearUseMonths(formObj.startMonth, formObj.operationMonth)
    
    for(var i = 1; i < formObj.serviceLife + 1; i++) {
      table.id = i;
      table.beginValue = table.endValue;

      if (i === 1){
        table.beginValue = formObj.price;
        table.depValue = table.beginValue / formObj.serviceLife; 
        temp = table.depValue;
        temp = roundJudge(temp, formObj.round);
        if (!isNaN(formObj.startMonth) || !isNaN(formObj.operationMonth)){
          table.depValue = (table.depValue / 12) * table.depMonth;
        };
        table.depValue = roundJudge(table.depValue, formObj.round);
      };

      if (table.depValue >= table.beginValue){table.depValue = table.beginValue;};

      table.endValue = table.beginValue - table.depValue; 

      appendTable(table);

      if (i === 1){
        table.depValue = temp;
      };

      if (i === formObj.serviceLife && table.endValue > 0){
        lastDepreciation(table , 0);
      };
    };
  };
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
          straightLine(hashForm, rates[hashForm.serviceLife - 1]);
          break;
        case 1:
          fiexdRate(hashForm, rates[hashForm.serviceLife - 1]);
          break;
        case 2:
          evenDepreciation(hashForm);
          break;
      }
      $('html').animate({ scrollTop:0})

    })
    .fail(function(){
      console.log('Error')
    })
  })
})