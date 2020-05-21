function init() {
    // load_animation()
    $( document ).ready(function() {
        console.log( "ready!" );
        loadList();
    });
}

function insertRecord () {
    const webhook = {
        payload_url: $("#url").val(),
        description:  $("#description").val(),
        content_type:  $("#content_type").val(),
    }

    console.log(webhook);
    $.post( server_url+"/api/webhook", webhook, function( data ) {
        console.log(data);
        alert("successfully added record");
        loadList();
    }).fail(function() {
        alert("api error")
    });
}

function deleteRecord(uuid){
    // alert(uuid);
    $.ajax({
        url: server_url+"/api/webhook/"+uuid,
        type: 'DELETE',
        success: function(data) {
            console.log(data);
            alert("successfully removed record");
            loadList();
        }
    });
}

let updating_uuid=null;

function getRecordForUpdate(uuid){
    $.get( server_url+"/api/webhook/"+uuid, function( data ) {
        $("#update_url").val(data.webhook.payload_url),
        $("#update_description").val(data.webhook.description),
        $("#update_content_type").val(data.webhook.content_type),

        updating_uuid=uuid;
        console.log(data);
    });
}

function submitUpdate(){
    $("#submit_update").prop('disabled', true);
    $.ajax({
        url: server_url+"/api/webhook/"+updating_uuid,
        type: 'PUT',
        data: {
            payload_url: $("#update_url").val(),
            description:  $("#update_description").val(),
            content_type:  $("#update_content_type").val(),
        },
        success: function(data) {
            console.log(data);
            alert("successfully updated record");
            loadList();
            $("#modalButtonClose").click();
            $("#submit_update").prop('disabled', false);
        }
    });
}



function load_animation() {
    setTimeout(function() {

    }, 500);
}

window.addEventListener("DOMContentLoaded", init, false);

