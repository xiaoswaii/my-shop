function register(){
    let username = $('#username').val();
    let password = $('#password').val();
    let email = $('#email').val();
    let data = {'username': username, 'password': password, 'email': email}
    $.ajax({ 
        type: 'POST',
        url: './register',
        data: data,
        dataType: 'json',
        success: function(data, status, xhr) {
            alert('注冊成功');
            if (xhr.status == 200){
                location.href= "/users/login";
            }
        },
        error: function(err) {
            console.log(err);
        }
    });
}