$(function(){
    $("#webWorker").hide();
    $("#warningLabel").hide();
    $("a").on("click",function(){
        var name = $(this).attr("href");
        $("section").slideUp("slow");
        $(name).delay(500).slideDown("slow");
    });
    $("#submitButton").click(function(){
        var flag = emptyValidation();
        if(flag)
            saveInfo();
        else
            $("#warningLabel").show();
    });
});

function emptyValidation(){
    if($("#inputTitle").val() == '') {
        return false;
    }
    if($("#inputMessage").val() == '') {
        return false;
    }
    return true;
}

function saveInfo(){
    var title = $("#inputTitle").val();
    var message = $("#inputMessage").val();
    var processed = false;
    var message = new Message(title,message,processed);

    addRow(message);

    var worker = new Worker("js/worker.js");

    worker.postMessage(message.processed);

    worker.onmessage = function(e){
        console.log("hola que tal");
        message.processed = e.data;
        setTimeout(function(){
            editRow(message)
        }, 1500);
    };
}

function Message(title,message,processed){
    this.title = title;
    this.message = message;
    this.processed = processed;
    this.concatAll = function(){
        return this.title + " " + this.message + " " + this.processed;
    }
}

function addRow(message){
    $("table tbody").append("<tr>" + appendRowString(message) + "</tr>");
}
function editRow(message){
    console.log("Entro Aqui Edit");
    $("table tbody tr:last").html(appendRowString(message)).delay(2000);
}

function appendRowString(message){
    return "<td>"+message.title+"</td><td>"+message.message+"</td><td>"+message.processed+"</td><td>"+message.concatAll()+"</td>";
}