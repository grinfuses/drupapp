var nid; // global node id variable
$('#page_node_pages').live('pageshow', actions_pages);

function actions_pages() {
    try {
        $
                .ajax({
                    url : "URL_DE_LA_APLICACION/?q=URL_DE_LA_VISTA_QUE_DEVUELVE_UN_JSON",
                    type : 'get',
                    dataType : 'json',
                    error : function(XMLHttpRequest, textStatus, errorThrown) {
                        alert('Fallo al obtener las últimas noticias');
                        console.log(JSON.stringify(XMLHttpRequest));
                        console.log(JSON.stringify(textStatus));
                        console.log(JSON.stringify(errorThrown));
                    },
                    success : function(data) {
                        $("#page_node_pages_list").html("");
                        $
                                .each(
                                        data.nodes,
                                        function(node_index, node_value) {
                                            console.log(JSON
                                                    .stringify(node_value));
                                            $("#page_node_pages_list")
                                                    .append(
                                                            $(
                                                                    "<li></li>",
                                                                    {
                                                                        "html" : "<a href='#page_node_view' data-nid='"
                                                                                + node_value.node.Nid
                                                                                + "' class='page_node_pages_list_title'>"
                                                                                + node_value.node.title
                                                                                + "</a>"
                                                                    }));
                                            
                                        });
                        $("#page_node_pages_list").listview("destroy")
                                .listview();
                       
                    }
                });
    } catch (error) {
        alert("page_node_pages - " + error);
    }
}

$('a.page_node_pages_list_title').live("click", function() {
    nid = $(this).data('nid'); // set the global nid to the node that was just clicked 
    //alert(nid);
    $.mobile.changePage(
            "noticia.html", "slideup");
});
$('#page_node_view').live('pageshow', actions);

function actions() {
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
                        $('#page_node_view h1').html(data.title); // set the header title
                        $('#page_node_view .content').html(data.body.und[0].safe_value); // display the body in the content div
                    }
                });
    } catch (error) {
        alert("page_node_view - " + error);
    }
}