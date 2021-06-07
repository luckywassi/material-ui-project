//https://spicyyoghurt.com/tutorials/javascript/store-data-html5-local-storage

export const getDepartmentCollecion = () => [
	{ id: '1', title: 'Development' },
	{ id: '2', title: 'Marketing' },
	{ id: '3', title: 'Accounting' },
	{ id: '4', title: 'HR' },
];

//good practice to store keys in a const.
const KEYS = {
	employees: 'employees',
	employeeIdCounter: 'employeeIdCounter',
};
export function insertEmployee(data) {
	let allEmployees = getAllEmployees();
	data.id = generateEmployeeId();
	allEmployees.push(data);
	localStorage.setItem(KEYS.employees, JSON.stringify(allEmployees));
}

export function getAllEmployees() {
	if (localStorage.getItem(KEYS.employees) === null)
		localStorage.setItem(KEYS.employees, JSON.stringify([]));
	let allEmployees = JSON.parse(localStorage.getItem(KEYS.employees));
	//add a new property of departmentTitle to each employee using getDepartmentCollection()
	let allDepartments = getDepartmentCollecion();
	//map function returns new array; old array remains unchanged
	return allEmployees.map(eachEmployee => ({
		...eachEmployee,
		//add a new property to each employee
		departmentTitle:
			allDepartments[Number(eachEmployee.departmentId) - 1].title,
	}));
}

function generateEmployeeId() {
	if (localStorage.getItem(KEYS.employeeIdCounter) === null)
		localStorage.setItem(KEYS.employeeIdCounter, '0');
	let id = Number(localStorage.getItem(KEYS.employeeIdCounter));
	localStorage.setItem(KEYS.employeeIdCounter, (++id).toString());
	return id;
}
