const mongoose = require('mongoose');
const Schema= mongoose.Schema;
const adminRoleSchema= new({
    admin_role_id: { type: Number},
    role_name: { type: String}
},{
    timestamps: true
})
const AdminRole=mongoose.model('AdminRole',adminRoleSchema)
module.exports = AdminRole