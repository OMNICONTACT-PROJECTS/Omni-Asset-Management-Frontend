import React, { useState } from 'react';
import { Table } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faUserEdit, faPlus, faSort } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';

function EmployeeTable() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [nationalityFilter, setNationalityFilter] = useState("");
  const [provinceFilter, setProvinceFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });
  const [theme, setTheme] = useState('dark');

  const [employees, setEmployees] = useState([
    { firstName: "Macdonald", surname: "Chiroro", department: "Web Developers", role: "User", idNumber: "58-2039008 V77", nationality: "Zimbabwean", province: "Midlands" },
    { firstName: "Sarah", surname: "Johnson", department: "Marketing", role: "User", idNumber: "78-3050409 F22", nationality: "Zimbabwean", province: "Midlands" },
    { firstName: "Ahmed", surname: "Alfarsi", department: "Sales", role: "User", idNumber: "92-1050789 S99", nationality: "Zimbabwean", province: "Midlands" },
    { firstName: "Linda", surname: "Kim", department: "Human Resources", role: "User", idNumber: "84-4532107 B11", nationality: "Zimbabwean", province: "Midlands" },
    { firstName: "John", surname: "Smith", department: "Finance", role: "User", idNumber: "63-6721345 D33", nationality: "Zimbabwean", province: "Midlands" },
    { firstName: "Anya", surname: "Ivanova", department: "Engineering", role: "User", idNumber: "45-9876543 E88", nationality: "Zimbabwean", province: "Midlands" },
    { firstName: "Lisa", surname: "Kun", department: "Web Developer", role: "User", idNumber: "99-2345678 T77", nationality: "South African", province: "Gauteng" }
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [newEmployee, setNewEmployee] = useState({ firstName: '', surname: '', department: '', role: 'User', idNumber: '', nationality: '', province: '' });
  const [editingIndex, setEditingIndex] = useState(null);

  const filteredData = employees
    .filter(item =>
      (departmentFilter === "" || item.department === departmentFilter) &&
      (roleFilter === "" || item.role === roleFilter) &&
      (nationalityFilter === "" || item.nationality === nationalityFilter) &&
      (provinceFilter === "" || item.province === provinceFilter) &&
      (`${item.firstName} ${item.surname}`.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortConfig.key) {
        const order = sortConfig.direction === 'ascending' ? 1 : -1;
        return a[sortConfig.key].localeCompare(b[sortConfig.key]) * order;
      }
      return 0;
    });
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
      };

  const handleAddOrUpdateEmployee = () => {
    if (newEmployee.firstName && newEmployee.surname) {
      if (editingIndex !== null) {
        const updatedEmployees = employees.map((employee, index) =>
          index === editingIndex ? newEmployee : employee
        );
        setEmployees(updatedEmployees);
        setEditingIndex(null);
      } else {
        setEmployees([...employees, newEmployee]);
      }
      setNewEmployee({ firstName: '', surname: '', department: '', role: 'User', idNumber: '', nationality: '', province: '' });
      setIsAdding(false);
    }
  };

  const handleDelete = (index) => {
    const updatedEmployees = employees.filter((_, i) => i !== index);
    setEmployees(updatedEmployees);
  };

  const handleEdit = (index) => {
    const employeeToEdit = employees[index];
    setNewEmployee(employeeToEdit);
    setEditingIndex(index);
    setIsAdding(true);
  };

  const handleChangeRole = (index) => {
    const updatedEmployees = [...employees];
    updatedEmployees[index].role = updatedEmployees[index].role === "User" ? "Admin" : "User";
    setEmployees(updatedEmployees);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="flex h-screen min-h-screen bg-gray-900">
      {/* <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
      
      {/* Main content area */}
           <div className="flex flex-col w-full p-4 ml-4 space-y-4 bg-gray-800 rounded-lg shadow-lg">
        {/* Header Component */}
        {/* <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} toggleTheme={toggleTheme} /> */}
        {/* Top Controls (Filters and Search) */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex gap-4">
            <select className="p-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-lg" value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)}>
              <option value="">All Departments</option>
              <option value="Web Developers">Web Developers</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Finance">Finance</option>
              <option value="Engineering">Engineering</option>
            </select>
            <select className="p-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-lg" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
              <option value="">All Roles</option>
              <option value="User">User</option>
            </select>
            <select className="p-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-lg" value={nationalityFilter} onChange={(e) => setNationalityFilter(e.target.value)}>
              <option value="">All Nationalities</option>
              <option value="Zimbabwean">Zimbabwean</option>
              <option value="South African">South African</option>
            </select>
            <select className="p-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-lg" value={provinceFilter} onChange={(e) => setProvinceFilter(e.target.value)}>
              <option value="">All Provinces</option>
              <option value="Midlands">Midlands</option>
              <option value="Gauteng">Gauteng</option>
            </select>
          </div>

          {/* Search and Add Employee Button */}
          <input
            type="text"
            placeholder="Search by name"
            className="p-2 text-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-600"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={() => { setIsAdding(true); setEditingIndex(null); }} className="flex items-center p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-800">
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add Employee
          </button>
        </div>

        {/* Add Employee Input Row */}
        {(isAdding || editingIndex !== null) && (
          <div className="p-4 mb-4 bg-gray-700 rounded-lg">
            <input
              type="text"
              placeholder="First Name"
              className="p-2 mr-2 text-gray-400 bg-gray-600 border border-gray-500 rounded-lg"
              value={newEmployee.firstName}
              onChange={(e) => setNewEmployee({ ...newEmployee, firstName: e.target.value })}
            />
            <input
              type="text"
              placeholder="Surname"
              className="p-2 mr-2 text-gray-400 bg-gray-600 border border-gray-500 rounded-lg"
              value={newEmployee.surname}
              onChange={(e) => setNewEmployee({ ...newEmployee, surname: e.target.value })}
            />
            <input
              type="text"
              placeholder="Department"
              className="p-2 mr-2 text-gray-400 bg-gray-600 border border-gray-500 rounded-lg"
              value={newEmployee.department}
              onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
            />
            <input
              type="text"
              placeholder="ID Number"
              className="p-2 mr-2 text-gray-400 bg-gray-600 border border-gray-500 rounded-lg"
              value={newEmployee.idNumber}
              onChange={(e) => setNewEmployee({ ...newEmployee, idNumber: e.target.value })}
            />
            <input
              type="text"
              placeholder="Nationality"
              className="p-2 mr-2 text-gray-400 bg-gray-600 border border-gray-500 rounded-lg"
              value={newEmployee.nationality}
              onChange={(e) => setNewEmployee({ ...newEmployee, nationality: e.target.value })}
            />
            <input
              type="text"
              placeholder="Province"
              className="p-2 mr-2 text-gray-400 bg-gray-600 border border-gray-500 rounded-lg"
              value={newEmployee.province}
              onChange={(e) => setNewEmployee({ ...newEmployee, province: e.target.value })}
            />
            <button onClick={handleAddOrUpdateEmployee} className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-700">
              {editingIndex !== null ? "Update" : "Add"}
            </button>
          </div>
        )}

        {/* Table */}
        <div className={`overflow-x-auto border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'} rounded-lg`}>
        <Table striped className={`w-full ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
            <Table.Head className={theme === 'dark' ? 'bg-blue-700' : 'bg-blue-300'}>
              <Table.HeadCell
                onClick={() => handleSort("firstName")}
                className="px-4 py-2 font-semibold tracking-wider text-gray-200 uppercase cursor-pointer bg-gradient-to-r from-blue-600 to-blue-300"
              >
                First Name
                <FontAwesomeIcon icon={faSort} className="ml-1" />
              </Table.HeadCell>
              <Table.HeadCell
                onClick={() => handleSort("surname")}
                className="px-4 py-2 font-semibold tracking-wider text-gray-200 uppercase cursor-pointer bg-gradient-to-r from-blue-600 to-blue-300"
              >
                Surname
                <FontAwesomeIcon icon={faSort} className="ml-1" />
              </Table.HeadCell>
              <Table.HeadCell className="px-4 py-2 font-semibold tracking-wider text-gray-200 uppercase bg-gradient-to-r from-blue-600 to-blue-300">Department</Table.HeadCell>
              <Table.HeadCell className="px-4 py-2 tracking-wider text-gray-200 uppercase ffont-semibold bg-gradient-to-r from-blue-600 to-blue-300">Role</Table.HeadCell>
              <Table.HeadCell className="px-4 py-2 font-semibold tracking-wider text-gray-200 uppercase bg-gradient-to-r from-blue-600 to-blue-300">ID Number</Table.HeadCell>
              <Table.HeadCell className="px-4 py-2 font-semibold tracking-wider text-gray-200 uppercase bg-gradient-to-r from-blue-600 to-blue-300">Nationality</Table.HeadCell>
              <Table.HeadCell className="px-4 py-2 font-semibold tracking-wider text-gray-200 uppercase bg-gradient-to-r from-blue-600 to-blue-300">Province</Table.HeadCell>
              <Table.HeadCell className="px-4 py-2 font-semibold tracking-wider text-gray-200 uppercase bg-gradient-to-r from-blue-600 to-blue-300">Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body className={theme === 'dark' ? 'divide-y divide-gray-700 bg-gray-800' : 'divide-y divide-gray-300 bg-white'}>
                  {filteredData.map((item, index) => (
             <Table.Row key={index} className="bg-gray-800 hover:bg-gray-700">
                   <Table.Cell className="px-4 py-2">{item.firstName}</Table.Cell>
                   <Table.Cell className="px-4 py-2">{item.surname}</Table.Cell>
                   <Table.Cell className="px-4 py-2">{item.department}</Table.Cell>
                   <Table.Cell className="px-4 py-2">{item.role}</Table.Cell>
                   <Table.Cell className="px-4 py-2">{item.idNumber}</Table.Cell>
                   <Table.Cell className="px-4 py-2">{item.nationality}</Table.Cell>
                   <Table.Cell className="px-4 py-2">{item.province}</Table.Cell>
                   <Table.Cell className="px-4 py-2">
              <div className="flex justify-center">
                 <button onClick={() => handleEdit(index)} className="text-blue-200 hover:text-blue-500" title="Edit Employee details">
            <FontAwesomeIcon icon={faEdit} />
                 </button>
                 <button onClick={() => handleDelete(index)} className="ml-2 text-red-200 hover:text-red-500" title="Delete Employee Details">
                 <FontAwesomeIcon icon={faTrash} />
                 </button>
                 <button onClick={() => handleChangeRole(index)} className="ml-2 text-green-200 hover:text-green-500" title="Change Roles">
            <FontAwesomeIcon icon={faUserEdit} />
          </button>
        </div>
      </Table.Cell>
    </Table.Row>
  ))}
</Table.Body>

          </Table>
        </div>
      </div>
    </div>
  );
}

export default EmployeeTable;
