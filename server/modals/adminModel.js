 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;
 const AdminSchema=new Schema({
    name: { type: String },
    email: { type: String },
    role: {
      type: String,
      default: "Admin"
  },
    admin_roles: { type: [Number] },
    address: { type: String },
    ip_location: { type: String },
    ip_address: { type: String }
 },
{timestamps:true})
const Admin = mongoose.model('Admin',AdminSchema)
module.exports = Admin;