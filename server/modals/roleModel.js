const mongoose = require('mongoose');
const { permissionSchema } = require('./permissionModel');
const { Schema } = mongoose;

const roleSchema = new Schema({
    name: { type: String, unique: true, },
    permissions: [permissionSchema],//read ,update
},{
    timestamps: true
})
const Role= mongoose.model('Role',roleSchema);
module.exports=Role;