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

## Built In Types
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

## Functions
```
function calculateTax(income: number, taxYear?: number): number {
    return 0;
}
```

(Add number after params to specify return type)

Must pass exact amount of args, add ? to make it optional and define inline
ORRRR (preferred method below)
taxYear = 2022 and arg if present will override it

## Objects
```
let employee: {
    id: number,
    name: string
} = { id: 1, name: '' };
employee.name = 'Mosh';
```

need to put name: '' or name?: string to initialize

- Read Only Modifier
    - readononly id: number

## Advanced Types

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
- Nullish Coalescing Operator
    - Uses ?? allows for null or undefined or use the default value
    ```
    let speed: number | null = null;
    let ride = {
        speed: speed ?? 30
    }
    ```
- Type Assertions
    - When you know more about the type than the program
    ```
    let phone = document.getElementByID('phone') as HTMLInputElement
    // because we know it isn't null which is an option in the event the
    // program can't find it
    ```
    - other syntax instead of as keyword is to prefix w/ angle brackets
    ```
    let phone = <HTMLInputElement> document.getElementByID('phone')
    ```
- The Unknown Type
    - type-safe counterpart of any type
        - let value: unknown; instead of let value: any;
        - unknown leads to errors, soooo:
    - Combine with narrowing/Unions
        - might need to use instanceof if not primitive type
- The Never Type
    - Value types that will never occur
        - ex: function that will never return or condition that will always throw an error, infinite loops, false type guards, etc.

## Classes, Interfaces, OOP

- OOP Notes:
    - State & Behavior
    - Properties in Person Object might be name, email
    - Methods in a Person object might be talk(), dance()

#### Classes & Objects

- Creating Classes
    - Blueprint for creating objects (inheritance)
    ```
    class Account {
        id: number;
        owner: string;
        balance: number;

        constructor(id: number, owner: string, balance: number) {
            this.id = id;
            this.owner = owner;
            this.balance = balance;
        }

        deposit(amount: number): void {
            if (amount <= 0)
                throw new Error('Invalid amount');
            this.balance += amount;
        }
    }
    ```

- Creating Objects via Classes
    ```
    let account = new Account(1, 'Steph', 0);
    account.deposit(100);
    console.log(account.balance);

    console.log(account instanceof Account); // for custom types/classes
    ```

#### Properties & Keywords
 - Read-only and Optional Properties
    - prefix property with readonly to avoid resetting values
    - optional properties have ? (nickname?: string)

- Access Control Keywords/Access Modifiers
    - 3 Types: Public, Private, Protected
        - Public is default
        - preface property with private to only be able to access within class
            - add underscore to name to disable access the property in an object
            - only use when absolutely necessary (not passwords, etc.)
    ```
    class Account {
        id: number;
        owner: string;
        private _balance: number;

        constructor(id: number, owner: string, balance: number) {
            this.id = id;
            this.owner = owner;
            this.balance = balance;
        }
        deposit(amount: number): void {
            if (amount <= 0)
                throw new Error('Invalid amount');
            this._balanace += amount;
        }

        private calculateTax() {
            //also works this way
        }

        getBalance(): number {
            return this._balance;
        }
    }
    ```

- Parameter Properties
    - More concise code
    ```
        class Account {
        //readonly id: number;
        //owner: string;
        //balance: number;
        nickname?: string;

        constructor(public readonly id: number, public owner: string, private _balance: number) {
            //this.id = id;
            //this.owner = owner;
            //this.balance = balance;
        }
    }

    //now looks like
    class Account {
        nickname?: string;

        constructor(
            public readonly id: number, 
            public owner: string, 
            private _balance: number) {
        }
    ```

- Getters & Setters
    - method inside a class for getting value of a property
        - gets but cannot set (readonly by nature)
    ```
        class Account {
        nickname?: string;

        constructor(
            public readonly id: number, 
            public owner: string, 
            private _balance: number) {}
            
            get balance(): number {
                return this._balance;
        }
    }
    ```
    - Needs a setter for access!
        ```
        class Account {
        nickname?: string;

        constructor(
            public readonly id: number, 
            public owner: string, 
            private _balance: number) {
            
            get balance(): number {
                return this._balance;
            }

            set balance(value: number) {
                if(value < 0)
                    throw new Error('Invalid value');
                this._balance = value;
            }
        }
    ```

- Index Signatures
    ```
    class SeatAssignment {
        //A1, A2, ...
        //Steph, John, ...
        [seatNumber: string]: string; //Index Sig Prop
    }

    let seats = new SeatAssignment();
    seats.A1 = 'Steph'
    seats['A2'] = 'John' // also works
    ```

- Static Members
    - Used where a single instance of a class member property/method is needed in memory
    - Below are 2 separate entities
    ```
    class Ride {
        // passenger
        // pickupLocation
        // dropOffLocation
        activeRides: number = 0;

        start() { this.activeRides++; }
        stop() { this.activeRides--; }
    }

    let ride1 = new Ride();
    ride1.start();

    let ride2 = new Ride();
    ride2.start();

    console.log(ride1.activeRides)
    console.log(ride2.activeRides)
    ```
    - need global place to keep track of active rides
    ```
    class Ride {
        // passenger
        // pickupLocation
        // dropOffLocation
        static activeRides: number = 0; // now belongs to global

        start() { Ride.activeRides++; } // now belongs to Ride Class
        stop() { Ride.activeRides--; }
    }

    let ride1 = new Ride();
    ride1.start();

    let ride2 = new Ride();
    ride2.start();

    console.log(Ride.activeRides) // now belongs to Ride class
    ```
    -issue w/ this implementation lets active override, needs to be private
    and use getters/setters to avoid something like Ride.activeRides = 10;
    ```
    class Ride {
        private static _activeRides: number = 0;

        start() { Ride.activeRides++; } // now belongs to Ride Class
        stop() { Ride.activeRides--; }

        static get activeRides() { // implement getter
            return Ride._activeRides;
        }
    }

    let ride1 = new Ride();
    ride1.start();

    let ride2 = new Ride();
    ride2.start();

    console.log(Ride.activeRides)
    ```

- Inheritance
    - Student and Teacher classes might have shared properties and methods
    - Utilize inheritance like Person, who Student and Teacher inherit from
        - Known as Parent/Base/Super Class and Child/Derived/Sub Class
    ```
    class Person {
        
    constructor(public firstName: string, public lastName:string){}
        get fullName() {
            return this.firstName + ' ' + this.lasName;
        }

        walk() {
            console.log('Walking');
        }
    }

    class Student extends Person {
        constructor(
            public studentId: number, 
            firstName: string, 
            lastName:string) {
                super(firstName, lastName);
        }

        takeTest() {
            console.log('Taking a Test')
        }
    }

    let student = new Student(1, 'John', 'Smith');
    ```
    - Best practices, classes should be in separate files

- Method Overriding
    - Changing a methods implementation
    - Needs override keyword
    ```
    class Teacher extends Person {
        override get fullName() { //keyword
            //return 'Professor' + this.firstName + ' ' + this.lasName;
            return 'Professor' + super.fullName; // same but concise
        }
    }

    let teacher = new Teacher('Stephanie', 'Stralina');
    console.log(teacher.fullName);
    ```

- Polymorphism
    ```
    printNames([
        new Student(1, 'Stephanie', 'Stralina');
        new Teacher('John', 'Smith');
    ])

    function printNames(people: Person[]) {
        for (let person of people)
            console.log(person.fullName);
    }
    ```
    - Can continue extending person in different ways and if it's an extension it will continue adding their names to the print
    - Should follow Open Closed Principle (best practice)
        - Classes should be open for extension and closed for modification

- Private vs Protected Members
    - Protected are inherited, Private is not
        - so if we have protected walk() on Person, it will be available on Student
    - Can create coupling, use very rarely/specifically

- Abstract Classes & Methods
    ```
    abstract class Shape {
        constructor(public color: string) {}

        abstract render(): void; // remove {} and add type for abstract method, can only exist in abstract classes
    }

    class Circle extends Shape {
        constructor(public radius: number, color: string) {
            super(color)
        }

        override render(): void {
            console.log('Rendering a circle')
        }
    }

    // shouldn't be available, which is why we use abstract
    //  let shape = new Shape('red');
    //  shape.render()
    ```
    - Abstract class like uncooked meal, not ready before extending

- Interfaces
    - Define the shape of objects
    - Calendars can be Google, iCal, Outlook, etc.
    ```
    <!-- abstract class Calendar {
        constructor(public name: string) {}

        abstract addEvent(): void;
        abstract removeEvent(): void;
    } -->

    interface Calendar {
        name: string;
        addEvent(): void;
        removeEvent(): void;
    }
    ```
    - When to use interface vs abstract
        - Use if no logic/algo/method implementation (only method declarations)
    - Can use inheritance ex. interface CloudCal extendes Calendar {}
    - to Implement in class: (shortcut cmd+. and click on class name)
    ```
    class GoogleCalendar implements Calendar {
        // name: string; //switch with constructor below
        constructor(public name: string) {}
        addEvent(): void {
            throw new Error("Method not implemented.");
        }
        removeEvent(): void {
            throw new Error("Method not implemented.");
        }
    }
    ```

## Generics

- Common/Reusable without anti-pattern behavior

#### Generic Classes
- Called template classes in C++
    ```
    class KeyValuePair<T> { 
        constructor(public key: T, public value: string) {}
    }

    let pair = new KeyValuePair<number>(1, 'a');
    let pair2 = new KeyValuePair<string>(1, 'a');
    ```
- Can also make value generic
    ```
    class KeyValuePair<K, V> { 
        constructor(public key: K, public value: V) {}
    }

    let pair = new KeyValuePair<number, string>(1, 'a');
    ```

#### Generic Functions
    ```
    function wrapInArray<T>(value: T) {
        return [value];
    }

    let numbers = wrapInArray(1);
    ```

- Can put inside classes as well, use w/ static, etc. 
    
    ```
    class ArrayUtils{
        wrapInArray<T>(value: T) {
            return [value];
        }
    }
    ```

#### Generic Interfaces
```
interface Result<T> {
    data: T | null,
    error: string | null
}

function fetch<T>(url: string): Result<T> {
    returns { data: null, error: null }
}

interface User {
    username: string;
}

interfact Product {
    title: string;
}

let result = fetch<User>('url')
result.data.username

let result = fetch<Product>('url')
result.data.title
```

#### Generic Constraints
- Can add constraints w/ extends
    ```
    function echo<T extends number | string >(value: T): T {
        return value;
    }

    echo('1')
    ```
- Can be more specific
    ```
    function echo<T extends { name: string } >(value: T): T {
        return value;
    }

    echo({ name: 'a'})
    ```
- Can use w/ interface
    ```
    interface Person {
        name: String
    }

    function echo<T extends Person >(value: T): T {
        return value;
    }
    ```
- Can use w/ class
    ```
    class Person {
        constructor(public name: string) {}
    }

    function echo<T extends Person >(value: T): T {
        return value;
    }

    echo(new Person('a'))
    ```

#### Extending Generic Classes
- 
    ```
    interface Product {
        name: string;
        price: number;
    }

    class Store<T> {
        private _objects: T[] = [];

        add(obj: T): void {
            this.objects.push(obj);
        }
    }

    let store = new Store<Product>();

    class CompressibleStore<T> extends Store<T>{ //passing on generic type param
        compress() {}
    }

    let store = new CompressibleStore<Product>();
    store.compress();

    // Restricting generic type param
    class SearachableStore<T extends { name: string }> extends Store<T> {
        find(name: string): T | undefined {
            return this._objects.find(obj => obj.name === name); //would require protected instead of private above
        }
    }

    //Fixing/Terminating generic type param
    class ProductStore extends Store<Product> {
        filterByCategory(category: string): Product[] {
            return [];
        }
    }
    ```

#### Keyof Operator

```
find(property: string, value: unknown): T | undefined {
    return this._objects.find(obj => obj[property] === value);
}

let store = new Store<Product>();
store.add({ name: 'a', price: 1 });
store.find('name', 'a')
store.find('price', 1)
// program will crash if you look for something not present

//Keyof fixes this issue
//If T is Product
// keyof T => 'name' or 'price'
find(property: keyof T, value: unknown): T | undefined {
    return this._objects.find(obj => obj[property] === value);
}
```

#### Type Mapping

```
interfact Product {
    name: string;
    price: number;
}

type ReadOnlyProduct = {
    //Index sig
    //keyof op
    readonly [Property in keyof Product]: Product[Property] //similar to forloop
}

let product: ReadOnlyProduct = {
    name: 'a',
    price: 1
}

// Can make this generic
type ReadOnly<T> = {
    //Index sig
    //keyof op
    readonly [K in keyof T]: T[K] //similar to forloop
}

//Optional generics
type Optional<T> = {
    [K in keyof T]?: T[K]
}

//Nullable generics
type Nullable<T> = {
    [K in keyof T]: T[K] | null
}
```
- Built in to TS via Utility Types


## Decorators
- Function that gets called by JS runtime
- No built in decorators, have to build out own
    - Must change config settings experimentaldecorators: true
    ```
    @Component
    class ProfileComponent{
        
    }
    ```
    - This would kick an error because we haven't built it yet!

#### Class Decorators

    ```
    function Component(constructor: Function) {
        console.log('Component decorator called');
        constructor.prototype.uniqueId = Date.now();
        constructor.prototype.insertInDOM = () => {
            console.log('Inserting the component in the DOM');
        }
    }
    ```
- Similar to extension

#### Parametized Decorators
- Some decorators need args
    ```
    //Decorator factory
    function Component(value: number) {
        return (constructor: Function) => {
        console.log('Component decorator called');
        constructor.prototype.options = value;
        constructor.prototype.uniqueId = Date.now();
        constructor.prototype.insertInDOM = () => {
            console.log('Inserting the component in the DOM');
        }
    }

    @Component(1)
    class ....
    ```

#### Decorator Composition
- Applied in reverse order (closest to class)
    ```
    function Pipe(constructor: Function) {
        console.log('Pipe decorator called');
        constructor.prototype.pipe = true;
    }

    @Component({ selector: '#my-profile' })
    @Pipe
    class ProfileComponent {
        
    }
    ```

#### Method Decorators
- Take 3 params: target, name of target method, Descriptor
    ```
    function Log(target: any, methodName: string, descriptor: PropertyDescriptor) {
        const original = descriptor.value as Function;
        descriptor.value = function(message: string) {
            console.log('Before');
            original.call(this, message);
            console.log('After');
        }
    }

    class Person {
        @Log
        say(message: string) {
            console.log('Person says ' + message);
        }
    }

    let person = new Person();
    person.say = "hello"
    ```
    - need to turn off nounusedparameters temp for this to work

#### Accessor Decorators
- Getters/Setters
    ```
    function Capitalize(target: any, methodName: string, descriptor: PropertyDescriptor) {
        const original = descriptor.get;
        descriptor.get = function() {
            const result = original?.call(this);
            if (typeof result === 'string) ?
                return result.toUpperCase() :
                return result
        }
    }

    class Person {
        constructor(public firstName: string, public lastName: string) {}

        @Capitalize
        get fullName() {
            return `${this.firsName} ${this.lastName}`'
        }
    }
    ```

#### Property Decorators

    ```
    function MinLength(length: number) {
        return (target: any, propertyName: string) => {
            let value: string;


            const descriptor: PropertyDescriptor = {
                get() { return value; },
                set(newValue: string){
                    if (newValue.length < length)
                        throw new Error(`${propertyName} to be at least ${length} char long`);
                    value = newValue;
                }
            };

            Object.defineProperty(target, propertyName, descriptor);
        }
    }

    class User {
        @MinLength(4)
        password: string;

        constructor(password: string) {
            this.password = password;
        }
    }

    let user = new User('1234');
    console.log(user.password);
    ```

#### Param Decorators
- Not frequently used outside of defining frameworks
    ```
    type WatchedParam = {
        methodName: string,
        parameterIndex: number
    }

    const watchedParameters: WatchParam[] = [];

    function Watch(target: any, methodName: string, parameterIndex: number){
        watchedParam.push({
            methodName,
            parameterIndex
        });
    }

    class Vehicle {
        move(@Watch speed: number) {}
    }

    console.log(watchedParameters)
    ```

## Modules
- Organizing TS code
    - Split into different files by purpose (shapes, colors, etc.)
- Exporting & Importing
    - add export before class
    - add import { Circle } from './relativePath' at top to utilize in other files
        -can rename using {Circle as MyCircle} to prevent name overlap
    - let circle = new Circle (VS code auto import)
    - cmd + . to move to new file (VS code shortcut)
    
#### Module Formats and Defaults
- module in config is commonjs
    - ctrl + space to see options
- Weighing concise code vs breakable code (remote control theory, less interdependency between modules)
    - export default class Store(){}
    - can export defaults like enum
- Wildcard Imports
    - import * as Shapes from "./shapes";
    - Cuts down on manual imports when using many classes
- ReExporting
    - Combines modules for concise code
    - shapes/index.ts
        -import circle, square
        - export at end
    - import circle, square from ./shapes IF
        -config file moduleResolution: node

## JS Integration