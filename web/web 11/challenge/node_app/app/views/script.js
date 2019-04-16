$(function() {

  var usernameAndPassword = "Basic YWRtaW46c3VwZXJzZWNyZXQ=";

  $("#submit_comment").click(function() {
    $.ajax({
        url: window.location.protocol + "//" + window.location.hostname + ':' + window.location.port + '/admin/comment',
        type: 'post',
        data: {
            name: $("#name").val(),
            comment: $("#comment").val()
        },
        headers: {
            Authorization: usernameAndPassword
        },
        dataType: 'multipart/form-data',
        success: function (data) {
          $("#comment_form").addClass("hidden");
          $("#thanks").removeClass("hidden");
        }, error: function(data) {
          $("#comment_form").addClass("hidden");
          $("#thanks").removeClass("hidden");
        }
    });
    return false;
  });
});
