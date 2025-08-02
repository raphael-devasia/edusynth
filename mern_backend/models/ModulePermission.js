const mongoose = require('mongoose');

const ModulePermissionSchema = new mongoose.Schema({
  module_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: true },
  role_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
  can_view: { type: Boolean, default: false },
  can_add: { type: Boolean, default: false },
  can_edit: { type: Boolean, default: false },
  can_delete: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('ModulePermission', ModulePermissionSchema);
