$('#page_node_view').live('pageshow', actions);

function actions() {
    var nid = getUrlVars()["nid"];
    try {
        $
                .ajax({
                    url : "URL_DE_LA_APLICACION/?q=SERVICE_ENDPOINT/node/"
                            + encodeURIComponent(nid) + ".json",
                    type : 'get',
                    dataType : 'json',
                    error : function(XMLHttpRequest, textStatus, errorThrown) {
                        alert('Fallo al obtener la noticia, por favor reintente luego');
                        console.log(JSON.stringify(XMLHttpRequest));
                        console.log(JSON.stringify(textStatus));
                        console.log(JSON.stringify(errorThrown));
                    },
                    success : function(data) {
                        console.log(JSON.stringify(data));
                        $('#h1').html(data.title); // set the
                        // header
                        // title
                        $('#contenido').html(
                                data.body.und[0].safe_value); // display
                        // the
                        // body
                        // in
                        // the
                        // content
                        // div
                    }
                });
    } catch (error) {
        alert("page_node_view - " + error);
    }
}

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}