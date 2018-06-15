var db = require("../models");

module.exports = function(app) {

    app.get("/api/loads", function(req,res){
        db.Loads.findAll({})
        .then(function(roles){
            res.json(roles);
        });
    });
// Tested works

    app.get("/api/loads/:id", function(req,res){
        db.Loads.findOne({where:{id:req.params.id}})
        .then(function(role){
            res.json(role);
        });
    });
////////
    app.post("/api/loads", (req,res)=>{
        db.Loads.create(req.body)
        .then(loads=>{
            res.json(loads);
        });
    });

    app.put("/api/loads", (req,res)=>{
        db.Loads.update(req.body, {where:{id:req.body.id}})
        .then(function(role){
            res.json(role);
        });
    });

    app.delete("/api/loads/:id", (req,res)=>{
        db.Loads.destroy({where:{id:req.params.id}})
        .then(load=>{
            res.json(load);
        });
    });
   
    //takes an object {roleId, [groupIds]}
    app.post("/api/loads/assignloads", (req,res)=>{
        db.LoadsUser.create(req.body)
        .then(assignload=>{
            res.json(assignload)
        });
    });

    //takes an object {roleId, [groupIds]}
    app.post("/api/roles/deletegroups", (req,res)=>{
        db.Loads.findById(req.body.roleId)
        .then(role=>{
            role.removeGroups(req.body.groupIds);
        });
    });

    app.get("/api/roles/:id/groups", (req,res)=>{
        db.Loads.findById(req.params.id)
        .then(role=>{
            role.getGroups()
            .then(groups=>{
                res.json(groups);
            });
        });
    });

    // ---------------------------date search info--------------------------//
    

   

    app.get("/api/loads/date/:date", (req,res)=>{
        db.Loads.findAll({where:{date:req.params.date}})
        .then(loads=>{
            res.json(loads);
        });
    });

    app.get("/api/loads/users/:usersid/date/:date", (req,res)=>{
        db.Loads.findAll({where:{date:req.params.date,UserId:req.params.userid}})
        .then(loads=>{
            res.json(loads);
        });
    });

    app.get("/api/loads/users/:usersid/date/:date/loads/:Loadsid", (req,res)=>{
        db.Loads.findOne({where:{date:req.params.date,UserId:req.params.usersid,LoadsId:req.params.loadid}})
        .then(entry=>{
            res.json(entry);
        });
    });

    app.get("/api/users/:userid/loads/daterange/:startdate/:enddate", (req,res)=>{
        db.Loads.findAll({where:{date:{between: [req.params.startdate,req.params.enddate]},UserId:req.params.userid},order:["date"]})
        .then(entries=>{
            res.json(entries);
        });
    });

    app.get("/api/loads/users/:usersid/daterange/:startdate/:enddate", (req,res)=>{
        db.Loads.findAll({where:{date:{between: [req.params.startdate,req.params.enddate]},UserId:req.params.userid},order:["date"]})
        .then(loads=>{
            res.json(loads);
        });
    });
}