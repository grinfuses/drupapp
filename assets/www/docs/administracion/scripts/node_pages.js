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

$('#page_node_update').live('pageshow',function(){
    try {
      $.ajax({
        url: "URL_DE_LA_APLICACION/?q=SERVICE_ENDPOINT/node/" + encodeURIComponent(nid) + ".json",
        type: 'get',
        dataType: 'json',
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          alert('page_node_update - failed to retrieve page node');
          console.log(JSON.stringify(XMLHttpRequest));
          console.log(JSON.stringify(textStatus));
          console.log(JSON.stringify(errorThrown));
        },
        success: function (data) {
         console.log(JSON.stringify(data));
         $('#page_node_update_title').val(data.title);
         $('#page_node_update_body').val(data.body.und[0].value);
        }
      });
    }
    catch (error) { alert("page_node_update - " + error); }
  });

  $('#page_node_update_submit').live('click',function(){
    
    var title = $('#page_node_update_title').val();
    if (!title) { alert('Por favor, introduzca un título.'); return false; }
    
    var body = $('#page_node_update_body').val();
    if (!body) { alert('Por favor, introduzca un cuerpo.'); return false; }

    $.ajax({
        url: "URL_DE_LA_APLICACION/?q=SERVICE_ENDPOINT/node/" + encodeURIComponent(nid) + ".json",
        type: 'put',
        data: 'node[type]=article&node[title]=' + encodeURIComponent(title) + '&node[language]=und&node[body][und][0][value]=' + encodeURIComponent(body),
        dataType: 'json',
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          alert('page_node_update_submit - failed to update node');
          console.log(JSON.stringify(XMLHttpRequest));
          console.log(JSON.stringify(textStatus));
          console.log(JSON.stringify(errorThrown));
        },
        success: function (data) {
         $.mobile.changePage("#page_node_view", "slideup");
        }
    });
    return false;
  });
  
  $('#button_node_delete').live("click",function(){
      if (confirm("¿Estás seguro de eliminar el nodo")) {
        try {
          $.ajax({
            url: "URL_DE_LA_APLICACION/?q=SERVICE_ENDPOINT/node/" + encodeURIComponent(nid) + ".json",
            type: 'delete',
            dataType: 'json',
            error: function (XMLHttpRequest, textStatus, errorThrown) {
              alert('page_node_view - failed to delete page node');
              console.log(JSON.stringify(XMLHttpRequest));
              console.log(JSON.stringify(textStatus));
              console.log(JSON.stringify(errorThrown));
            },
            success: function (data) {
              console.log(JSON.stringify(data));
              $.mobile.changePage("panel_de_control.html", "slideup");
            }
          });
        }
        catch (error) { alert("button_node_delete - " + error); }
      }
      else {
        return false;
      }
    });