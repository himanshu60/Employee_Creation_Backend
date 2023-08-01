const Employee = require("../models/employeeModel");

// Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({ isDeleted: false });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: "Unable to fetch employees" });
  }
};

// Create an employee
exports.createEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Unable to create employee", err: err.message });
  }
};

// Update an employee
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: "Unable to update employee" });
  }
};

// Delete an employee
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndDelete(
      id,
      { isDeleted: true },
      { new: true }
    );
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: "Unable to delete employee" });
  }
};
