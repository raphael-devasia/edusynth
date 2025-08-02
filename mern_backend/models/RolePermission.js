const mongoose = require('mongoose');

const RolePermissionSchema = new mongoose.Schema({
  role_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
  permission: { type: String, required: true },
  is_allowed: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('RolePermission', RolePermissionSchema);
