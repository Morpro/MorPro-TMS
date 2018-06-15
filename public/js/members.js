
$(document).ready(function() {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $('#date-select').val(moment().format("YYYY-MM-DD"));
    $("#prev-date-button").click(event=>{
        var prevDate = moment($('#date-select').val(),"YYYY-MM-DD").subtract(1,"days");
        $("#date-select").val(prevDate.format("YYYY-MM-DD"));
        $("#date-select").trigger("change");
    });
    $("#next-date-button").click(event=>{
        var nextDate = moment($('#date-select').val(),"YYYY-MM-DD").add(1,"days");
        $("#date-select").val(nextDate.format("YYYY-MM-DD"));
        $("#date-select").trigger("change");
    });



    // $("#user-select").on("change", event=>{


/// bottom is original code for page

    var taskIds = [];

    $.get("/api/currentuserid")
    .then(id=>{
        $("#date-select").on("change", event=>{
            $.get("/api/loads/users/"+id+"/date/"+$("#date-select").val())
            .then(entries=>{
                taskIds.forEach(id=>{
                    var qty = 0;
                    var taskEntry = entries.find(entry=>(entry.TaskId===id));
                    if(!!taskEntry){
                        qty = taskEntry.quantity;
                    }
                    $("#task"+id+"qty").val(qty);
                });
            });
        });

        $.get("/api/users/"+id+"/roles")
        .then(roles=>{
            console.log("Is admin:");
            console.log(roles.find(role=>(role.name === "Admin")));
            console.log("Is payroll:");
            console.log(roles.find(role=>(role.name === "Payroll")));
            if(!roles.find(role=>(role.name === "Admin"))) {
                console.log("user is not an admin");
                $("#admin-link").remove();
            }
            if(!roles.find(role=>(role.name === "Payroll"))) {
                console.log("user is not a payroll");
                $("#payroll-link").remove();
            }
        });


         $.get("/api/users/"+id)
        .then(user=>{
            $("#username").text(user.firstName + " " + user.lastName);
            console.log(user.firstName)
        });

       
        $.get("/api/loads")
        .then(loads=>{
            console.log("got all loads",loads)
            loads.forEach(load =>{
                    //pushing all rate nto an array.
                //total.push(load.Rate);   
                var $entryRow = $("<tr>");
                $entryRow.append($("<td>").text(load.name))
                    .append($("<td>").text(load.Company))
                    .append($("<td>").text(load.LoadNumber))
                    .append($("<td>").text(load.PickUp))
                    .append($("<td>").text(load.Dropoff))
                    .append($("<td>").text(load.Weight))
                    .append($("<td>").text(load.Rate))
                    .append($("<td>").text(load.quantity));
                    //.append($("<td>").text(parseInt(loads.quantity)*parseFloat(Loads.commission)));
                $entryRow.appendTo("tbody");
                // var total = ($("#total").text(parseInt(loads.Rate)*parseFloat(loads)));
              // console.log("total inside",total);
            });
        });
    });
});
