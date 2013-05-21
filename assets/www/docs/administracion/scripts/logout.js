$('#button_logout')
        .live(
                "click",
                function() {
                    try {
                        $
                                .ajax({
                                    url : "URL_DE_LA_APLICACION/?q=SERVICE_ENDPOINT/user/logout.json",
                                    type : 'post',
                                    dataType : 'json',
                                    error : function(XMLHttpRequest,
                                            textStatus, errorThrown) {
                                        // alert('button_logout - failed to
                                        // logout');
                                        console.log(JSON
                                                .stringify(XMLHttpRequest));
                                        console.log(JSON.stringify(textStatus));
                                        console
                                                .log(JSON
                                                        .stringify(errorThrown));
                                    },
                                    success : function(data) {
                                        alert("Te has desconectado del sistema.");
                                        $.mobile.changePage("../index.html", {
                                            reloadPage : true
                                        }, {
                                            allowSamePageTranstion : true
                                        }, {
                                            transition : 'none'
                                        });
                                    }
                                });
                    } catch (error) { /* alert("button_logout - " + error); */
                    }
                    return false;
                });