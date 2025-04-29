# TypeScript Exercises

Practicing TypeScript and TypeScript Notes

## Notes

Built on top of JavaScript (add static typing, code completion, refactoring, shorthand notations)

Statically-Typed Languages (C++, C#, Java)
int num = 10; will always be number
num = "a"; won't work

let x: number = 10;

Drawbacks:
Transpilation/Compilation step
Strictness

### Built In Types
- Extends JS number, string boolean, null, undefined, object
- TS: any, unknown, never, enum, tuple

#### Any Type 
If not defined, can reassign to different parts
```
let level;
level = `;
level = 'a';
```
(Problem - anti-pattern)

#### Arrays
```
let numbers = [1, 2, 3];
```
- Each element can be a different type
```
let numbers = [1, 2, '3'];
```
in TS
```
let numbers: number[] = [1, 2, 3];
let numbers: number[] = [];
```

#### Tuples
Fixed length, particular type, pair values
1, 'Steph'
```
let user: [number, string] = [1, 'Steph']; -> Correct
let user: [number, string] = [1, 'Steph', 0] -> Gives comp error
```
-> issue with .push, TS will let it work and it will mess things up!

Stict to 2 values when using tuples (best practices)

#### Enums
List of related const, like sizes of tshirts
```
const small = 1;
const medium = 2;
const large = 3;
```
ORRRR
```
enum Size { Small, Medium, Large }; -> default 0,1,2 indices
enum Size { Small = 's', Medium = 'm', Large = 'l' }; -> override method
enum Size { Small = '1', Medium = '2', Large = '3' }; -> override method

let mySize: Size = Size.Medium // 2
let mySize: Size = Size.Medium // 2
```

(Pro tip: adding const in from of enum Size makes prettier JS)

### Functions
```
function calculateTax(income: number, taxYear?: number): number {
    return 0;
}
```

(Add number after params to specify return type)

Must pass exact amount of args, add ? to make it optional and define inline
ORRRR (preferred method below)
taxYear = 2022 and arg if present will override it

### Objects
```
let employee: {
    id: number,
    name: string
} = { id: 1, name: '' };
employee.name = 'Mosh';
```

need to put name: '' or name?: string to initialize

Read Only Modifief
readononly id: number

### Advanced Types

- Type Aliases
    - Define custom type
    ```
    type Employee = {
        readonly id: number,
        name: string
        retire: (date: Date) => void
    }

    let employee: Employee = {
        id: 1, 
        name: '', 
        retire: (date: Date) => {
            console.log(date);  
    }
    ```
- Unions and Intersections
    - Union Types : variable or function parameter more than one type
    ```
    function kgToLbs(weight: number | string) {
        //Narrowing
        if (type of weight === 'number')
            return weight * 2.2;
        else 
            return parseInt(weight) * 2.2;
    }
    kgToLbs(10);
    kgToLbs('10kg');
    ```
    - Intersection Types : Other technique for combing types (at the same time)
    ```
    let weight: number & string; // <- not realistic, just example

    type Draggable = {
        drag: () => void
    };

    type Resizeable = {
        resize: () => void
    };

    type UIWidget = Draggable & Resizeable; // more realistic

    let textBox: UIWidget = {
        drag: () => {},
        resize: () => {}
    };
    ```
- Literal Types
    - Exact or specific value
    ```
    let quantity: 50;
    ```
    - Combine with Union/Intersection Types
    ```
    let quanitity: 50 | 100 = 100;

    type Quantity = 50 | 100
    let quantity: Quantity = 100;

    type Metric = 'cm' | 'inch';
    ```
- Nullable Types
    - TS strict about null type
    ```
    function greet(name: string) {
        console.log(name.toUpperCase());
    }

    greet(null); // doesn't work in TS due to strictNullChecks
    ```
    - Same with undefined. Workaround is Union operator.
    ```
        ```
    function greet(name: string | null | undefined) {
        if (name)
            console.log(name.toUpperCase());
        else
            console.log('Hola!');
    }

    greet(null); // log "Hola!"
    ```
- Optional Chaining
    - Verbose way
    ```
    type Customer = {
        birthday: Date
    };

    function getCustomer(id: number): Customer | null | undefined {
        return id === 0 ? null : { birthday: new Date() };
    }

    let customer = getCustomer(0);
    if (customer !== null && customer !== undefined)
        console.log(customer.birthday);
    ```
    - Optional Property Access Operator
    ```
    let customer = getCustomer(0);
        console.log(customer?.birthday);
    ```
    - Optional element access operator & Optional call
    ```
    //Opt. el access op
    customers?.[0]

    //Opt call
    let log: any = null;
    log?.('a');
    ```
- The Unknown Type
    - type-safe counterpart of any type
        - let value: unknown; instead of let value: any;
    - Combine with narrowing/Unions
- The Never Type
    - Value types that will never occur
        - ex: function that will never return or condition that will always throw an error, infinite loops, false type guards, etc.

