class EmployeeCollection {
    constructor() {
        this.collections = {};
    }

    createCollection(collectionName) {
        if (!this.collections[collectionName]) {
            this.collections[collectionName] = [];
            console.log(`Collection '${collectionName}' created.`);
        } else {
            console.log(`Collection '${collectionName}' already exists.`);
        }
    }

    indexData(collectionName, excludeColumn) {

        const sampleData = [
            { id: 'E02001', name: 'Kasthuri', department: 'IT', gender: 'Female' },
            { id: 'E02002', name: 'kumar', department: 'HR', gender: 'Male' },
            { id: 'E02003', name: 'Sabari', department: 'IT', gender: 'Male' },
            { id: 'E02004', name: 'Arun', department: 'Finance', gender: 'Male' },
            { id: 'E02005', name: 'Ria', department: 'IT', gender: 'Female' },
        ];

        const indexedData = sampleData.map(employee => {
            const { [excludeColumn]: excluded, ...rest } = employee;
            return rest;
        });

        this.collections[collectionName].push(...indexedData);
        console.log(`Indexed data into '${collectionName}', excluding '${excludeColumn}'.`);
    }

    searchByColumn(collectionName, columnName, columnValue) {
        const results = this.collections[collectionName].filter(employee => employee[columnName] === columnValue);
        console.log(`Search results in '${collectionName}' for '${columnName}':`, results);
        return results;
    }

    getEmpCount(collectionName) {
        const count = this.collections[collectionName].length;
        console.log(`Employee count in '${collectionName}': ${count}`);
        return count;
    }

    delEmpById(collectionName, employeeId) {
        const originalLength = this.collections[collectionName].length;
        this.collections[collectionName] = this.collections[collectionName].filter(employee => employee.id !== employeeId);
        const newLength = this.collections[collectionName].length;
        console.log(`Deleted employee with ID '${employeeId}' from '${collectionName}'.`);
        console.log(`Employee count changed from ${originalLength} to ${newLength}.`);
    }

    getDepFacet(collectionName) {
        const departmentCount = this.collections[collectionName].reduce((acc, employee) => {
            acc[employee.department] = (acc[employee.department] || 0) + 1;
            return acc;
        }, {});

        console.log(`Department facet for '${collectionName}':`, departmentCount);
        return departmentCount;
    }
}

// Function executions
const employeeManager = new EmployeeCollection();

const v_nameCollection = 'Roobs'; 
const v_phoneCollection = '7236';   
employeeManager.createCollection(v_nameCollection);
employeeManager.createCollection(v_phoneCollection);
employeeManager.getEmpCount(v_nameCollection);
employeeManager.indexData(v_nameCollection, 'Department');
employeeManager.indexData(v_phoneCollection, 'Gender');
employeeManager.delEmpById(v_nameCollection, 'E02003');
employeeManager.getEmpCount(v_nameCollection);
employeeManager.searchByColumn(v_nameCollection, 'Department', 'IT');
employeeManager.searchByColumn(v_nameCollection, 'Gender', 'Male');
employeeManager.searchByColumn(v_phoneCollection, 'Department', 'IT');
employeeManager.getDepFacet(v_nameCollection);
employeeManager.getDepFacet(v_phoneCollection);
