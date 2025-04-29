"use strict";
let sales = 123456789;
let course = 'TypeScript';
let is_published = true;
let level;
function calculateTax(income, taxYear = 2022) {
    if (taxYear < 2022)
        return income * 1.2;
    return income * 1.3;
}
calculateTax(10000, 2024);
let employee = {
    id: 1,
    name: '',
    retire: (date) => {
        console.log(date);
    }
};
employee.name = 'Mosh';
class Account {
    constructor(id, owner, balance) {
        this.id = id;
        this.owner = owner;
        this.balance = balance;
    }
    deposit(amount) {
        if (amount <= 0)
            throw new Error('Invalid amount');
        this.balance += amount;
    }
}
//# sourceMappingURL=index.js.map