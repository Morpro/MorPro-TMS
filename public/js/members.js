
$(document).ready(function() {
    // // This file just does a GET request to figure out which user is logged in
    // // and updates the HTML on the page
    // $('#date-select').val(moment().format("YYYY-MM-DD"));
    // $("#prev-date-button").click(event=>{
    //     var prevDate = moment($('#date-select').val(),"YYYY-MM-DD").subtract(1,"days");
    //     $("#date-select").val(prevDate.format("YYYY-MM-DD"));
    //     $("#date-select").trigger("change");
    // });
    // $("#next-date-button").click(event=>{
    //     var nextDate = moment($('#date-select').val(),"YYYY-MM-DD").add(1,"days");
    //     $("#date-select").val(nextDate.format("YYYY-MM-DD"));
    //     $("#date-select").trigger("change");
    // });


    $('tbody').delegate('td button').click(function(e){
                            e.preventDefault();

                            $(e.target).parent().parent().next().toggle("slow");
                        });
    // $("#user-select").on("change", event=>{


/// bottom is original code for page


    $.get("/api/currentuserid")
    .then(id=>{

        $.get("/api/users/"+id+"/roles")
        .then(roles=>{
            // console.log("Is admin:");
            // console.log(roles.find(role=>(role.name === "Admin")));
            // console.log("Is payroll:");
            // console.log(roles.find(role=>(role.name === "Payroll")));
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

       // gets loadboard with value of true[1] or by unasigned
        $.get("api/loads/status/false")
        .then(loads=>{
            console.log("got all loads",loads)
            loads.forEach(load =>{
                var $entryRow = $("<tr>");
                $entryRow.append($("<td>").text(load.name))
                    .append($("<td>").text(load.Company))
                    .append($("<td>").text(load.LoadNumber))
                    .append($("<td>").text(load.PickUp))
                    .append($("<td>").text(load.Dropoff))
                    .append($("<td>").text(load.Weight))
                    .append($("<td>").text(load.Rate))
                    .append($("<td>").append("<button class='btn btn-info'>+</button>"))
                var $childRow = $('<tr class="child">')
                $childRow.append($('<td colspan="1">').text(load.Rate)).hide()
                         .append($('<td colspan="1">').text(load.Weight)).hide()



                $entryRow.appendTo("tbody");
                $childRow.appendTo("tbody");

             });


        });
    });
});
