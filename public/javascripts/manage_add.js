async function add() {
    let title = $('#title').val();
    let amount = $('#amount').val();
    let price = $('#price').val();
    let photo_path = $('#path').val();
    let description = $('#description').val();
    let data = {title: title, amount: amount, price: price, picture: photo_path, description: description}
    try {
      result = await $.ajax({
          url: '/shop',
          type: 'POST',
          data: data,
          success: function(e, status, xhr){
            if (xhr.status == 200) {
                alert('新增成功')
            }
          }
      });
    } 
    catch (error) {
        console.log(error)
    }
  }