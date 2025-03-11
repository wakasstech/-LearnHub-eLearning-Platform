const mongoose = require('mongoose');
const { Schema } = mongoose;

const permissionSchema = new Schema({
  resource: { type: String, required: true },
  actions: { type: [String], required: true },
}, {
  timestamps: true
});

const Permission = mongoose.model('Permission', permissionSchema);
module.exports = { Permission, permissionSchema };