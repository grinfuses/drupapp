$('#page_node_create_submit').live('click',function(){

  var title = $('#page_node_title').val();
  if (!title) { alert('Por favor, introduzca un título.'); return false; }

  var body = $('#page_node_body').val();
  if (!body) { alert('Por favor, introduzca un cuerpo.'); return false; }

  $.ajax({
      url: "URL_DE_LA_APLICACION/?q=SERVICE_ENDPOINT/node.json",
      type: 'post',
      data: 'node[type]=article&node[title]=' + encodeURIComponent(title) + '&node[language]=und&node[body][und][0][value]=' + encodeURIComponent(body),
      dataType: 'json',
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert('Error al crear el artículo, reinténtelo más tarde');
        console.log(JSON.stringify(XMLHttpRequest));
        console.log(JSON.stringify(textStatus));
        console.log(JSON.stringify(errorThrown));
      },
      success: function (data) {
       alert('Artículo creado.');
       $.mobile.changePage("panel_de_control.html", "slideup");
      }
            });
  // END: drupal services node create

  return false;

});