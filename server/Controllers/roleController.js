const Role = require('../modals/roleModel');
const { asyncHandler } = require("../utils/asyncHandler.js");


const createRole = asyncHandler(async (req, res) => {
  const { name, permissions } = req.body;

  try {
    const role = new Role({ name, permissions });
    const savedRole = await role.save();
    
    res.status(201).json({
      message: 'Role created successfully',
      role: savedRole
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


const updateRole = asyncHandler(async (req, res) => {
  const { name } = req.params;
  const { permissions } = req.body;

  try {
    const updatedRole = await Role.findOneAndUpdate(
      { name },
      { permissions },
      { new: true, upsert: true }
    );

    res.status(200).json({
      message: 'Role updated successfully',
      role: updatedRole
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


const deleteRole = asyncHandler(async (req, res) => {
  const { name } = req.params;

  try {
    await Role.findOneAndDelete({ name });
    res.status(200).json({ message: 'Role deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


const getRoles = asyncHandler(async (req, res) => {
  try {
    const roles = await Role.find({});
    res.status(200).json({ roles });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = {
  createRole,
  updateRole,
  deleteRole,
  getRoles
};
