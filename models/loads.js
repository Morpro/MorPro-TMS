module.exports = function(sequelize, DataTypes) {
  var Loads= sequelize.define("Loads", {
    // Giving the Author model a name of type STRING
    "name": DataTypes.STRING,
    "Company": DataTypes.STRING,
    "LoadNumber": DataTypes.STRING,
    "PickUp": DataTypes.STRING,
    "Dropoff": DataTypes.STRING,
    "Weight": DataTypes.STRING,
    "Rate": DataTypes.INTEGER
  });

     Loads.associate = function(models) {
     Loads.belongsToMany(models.User, {through:'LoadsUser'});
         //Loads.belongsTo
   };

  return Loads;
};