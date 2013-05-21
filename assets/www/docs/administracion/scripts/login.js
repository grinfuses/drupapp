$('#page_login_submit')
        .live(
                'click',
                function() {
                    var name = $('#page_login_name').val();
                    if (!name) {
                        alert('Por favor, introduzca su nombre de usuario.');
                        return false;
                    }
                    var pass = $('#page_login_pass').val();
                    if (!pass) {
                        alert('Por favor, introduzca su contraseña.');
                        return false;
                    }
                    $
                            .ajax({
                                url : "URL_DE_LA_APLICACION/?q=SERVICE_ENDPOINT/user/login.json",
                                type : 'post',
                                data : 'username=' + encodeURIComponent(name)
                                        + '&password='
                                        + encodeURIComponent(pass),
                                dataType : 'json',
                                error : function(XMLHttpRequest, textStatus,
                                        errorThrown) {
                                    alert('Error de conexión, compruebe datos o conexión');
                                    console.log(JSON.stringify(XMLHttpRequest));
                                    console.log(JSON.stringify(textStatus));
                                    console.log(JSON.stringify(errorThrown));
                                },
                                success : function(data) {
                                    $.mobile.changePage(
                                            "panel_de_control.html", "slideup");
                                }
                            });
                    return false;
                });