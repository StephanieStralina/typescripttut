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
let level;
level = `;
level = 'a';
(Probelm - anti-pattern)

#### Arrays
let numbers = [1, 2, 3];
- Each element can be a different type
let numbers = [1, 2, '3'];
in TS
let numbers: number[] = [1, 2, 3];
let numbers: number[] = [];

#### Tuples
Fixed length, particular type, pair values
1, 'Steph'
let user: [number, string] = [1, 'Steph']; -> Correct
let user: [number, string] = [1, 'Steph', 0] -> Gives comp error
-> issue with .push, TS will let it work and it will mess things up!

Stict to 2 values when using tuples (best practices)

#### Enums
List of related const, like sizes of tshirts
const small = 1;
const medium = 2;
const large = 3;
ORRRR
enum Size { Small, Medium, Large }; -> default 0,1,2 indices
enum Size { Small = 's', Medium = 'm', Large = 'l' }; -> override method
enum Size { Small = '1', Medium = '2', Large = '3' }; -> override method

let mySize: Size = Size.Medium // 2
let mySize: Size = Size.Medium // 2

(Pro tip: adding const in from of enum Size makes prettier JS)

### Functions
function calculateTax(income: number, taxYear?: number): number {
    return 0;
}

(Add number after params to specify return type)

Must pass exact amount of args, add ? to make it optional and define inline
ORRRR (preferred method below)
taxYear = 2022 and arg if present will override it

### Objects
let employee: {
    id: number,
    name: string
} = { id: 1, name: '' };
employee.name = 'Mosh';

need to put name: '' or name?: string to initialize

Read Only Modifief
readononly id: number

### Advanced Types

- Type Aliases
- Unions and Intersections
- Type Narrowing
- Nullable Types
- The Unknown Type
- The Never Type

