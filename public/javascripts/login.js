async function login() {
    let username = $('#username').val();
    let password = $('#password').val();
    let data = {'username': username, 'password': password}
    try {
      result = await $.ajax({
          url: './login',
          type: 'POST',
          data: data,
          success: function(e, status, xhr){
            if (xhr.status == 200) {
                location.href = '/'
            }
          }
      });
    } 
    catch (error) {
        console.log(error)
    }
  }