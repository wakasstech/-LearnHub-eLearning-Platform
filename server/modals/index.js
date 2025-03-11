// const { Sequelize, DataTypes, Op } = require('sequelize');
//   // Passing parameters separately (other dialects)
//   const sequelize = new Sequelize('acadmy', 'root', '12345'
//  ,
//   {
//     host: 'localhost',
//     dialect: 'mysql',
//     operationsAliases: false,
//     logging: false,
//      pool: {
//      max: 5,
//      min: 0,
//      acquire: 30000,
//      idle: 1000 }
//   },
//   {query:{raw:true}},
//   );
//   const  db={};
//   db.Sequelize=Sequelize;
//   db.sequelize=sequelize;
//   try {
//     db.sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
//   db.userModel = require('./userModel')(sequelize,DataTypes, Op);
//   //db.companyModel =  require('./companyModel')(sequelize,DataTypes,Op);
//   db.sequelize.sync({alter:true})
//   .then(() => {
//     console.log('Table .... are syncronized');
//   })
//   .catch((err) => {
//     console.error('Error creating table:', err);
//   });     
//     module.exports = db;  
const { Sequelize, DataTypes, Op } = require('sequelize');
const sequelize = new Sequelize('academy-app', 'root', '', {
  host: 'localhost',
     dialect: 'mysql',
     logging: false,
     operationsAliases: false,
      pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 1000 }},
      {query:{raw:true}},
      );
  // const sequelize = new Sequelize('referral_leads', 'root', 'root', {
  //   host: 'localhost',
  //   dialect: 'mysql',
  //   logging: false,
  //   port : 3307,
  //   operationsAliases: false,
  //    pool: {
  //    max: 5,
  //    min: 0,
  //    acquire: 30000,
  //    idle: 1000 }},
  //    {query:{raw:true}},
  //    );
  // const models = {
  //   Category: require('./categoryModel')(sequelize, Sequelize.DataTypes),
  //   Brand: require('./brandModel')(sequelize, Sequelize.DataTypes),
  // }; 
  const  db={};
db.userModel =  require('./userModel')(sequelize,DataTypes,Op);
db.categoryModel =  require('./categoryModel')(sequelize,DataTypes,Op);
db.subcategoryModel =  require('./subcategoryModel')(sequelize,DataTypes,Op);
db.Enrollment =  require('./StudEnTeachAsModel')(sequelize,DataTypes,Op);
db.courseModel =  require('./courseModel')(sequelize,DataTypes,Op);
db.lectureModel =  require('./lectureModel')(sequelize,DataTypes,Op);
db.videoModel =  require('./videoModel')(sequelize,DataTypes,Op);
db.faqModel =  require('./faqModel')(sequelize,DataTypes,Op);
db.suggestedfaqModel =  require('./suggestedfaqModel')(sequelize,DataTypes,Op);
console.log(db,"db")
  db.Sequelize=Sequelize;
  db.sequelize=sequelize;
  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
  try {
    db.sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  db.sequelize.sync({alter:true})
  .then(() => {
    console.log('Table .... are syncronized');
  })
  .catch((err) => {
    console.error('Error creating table:', err);
  });     
    module.exports = db;  