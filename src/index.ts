let sales = 123_456_789;
let course = 'TypeScript';
let is_published = true;
let level;

// function render(document: any) {
//     console.log(document);
// }

function calculateTax(income: number, taxYear = 2022): number {
    if (taxYear < 2022)
        return income * 1.2;
    return income * 1.3;
}

calculateTax(10_000, 2024);

let employee: {
    readonly id: number,
    name: string
    retire: (date: Date) => void
} = { 
    id: 1, 
    name: '', 
    retire: (date: Date) => {
        console.log(date);
    }
};
employee.name = 'Mosh';

