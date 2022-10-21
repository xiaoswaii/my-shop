async function getStock() {
    try {
      result = await $.ajax({
          url: './shop',
          type: 'GET',
          xhrFields: {withCredentials: true},
          success: function(e, status, xhr){
            console.log(e)
          }
      });
    } 
    catch (error) {
        console.log(error)
    }
  }

getStock();

async function show_detail(stock_id){
  try {
    result = await $.ajax({
        url: './shop/findItem',
        type: 'POST',
        data: {stock_id: stock_id},
        xhrFields: {withCredentials: true},
        success: function(data, status, xhr){
          // console.log(e)
          // $('#ModalCenter').css('display','block');
          // $('#ModalCenter').css('opacity','1');
          $('#ModalCenter').modal('show');
          $('#title').text(`${data['title']}`)
          $('#price').text(`${data['price']}`); 
          $('#description').text(`${data['description']}`);
          $('#left_amount').text(`${data['left_amount']}`);
          $('#buy_stock_id').val(`${data['_id']}`); 
        }
    });
  } 
  catch (error) {
      console.log(error)
  }
}

async function buy(){
  const stock_id = $('#buy_stock_id').val();
  const purchase_amount = $('#purchase_amount').val();
  try {
    result = await $.ajax({
        url: '/shop/purchaseItem',
        type: 'POST',
        data: {stock_id: stock_id, amount: purchase_amount},
        xhrFields: {withCredentials: true},
        success: function(data, status, xhr){
          alert('恭喜您已經購買成功');
        }
    });
  } 
  catch (error) {
      console.log(error)
  }
}

async function close_modal(){
  $('#title').text(``)
  $('#price').text(``); 
  $('#description').text(``);
  $('#left_amount').text(``);
  $('#buy_stock_id').val(``); 
  $('#ModalCenter').modal('hide'); 
}