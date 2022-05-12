let sport: string = 'football';
let id: number = 5;
let myself: string = 'Ryan';
let unit: number;
unit = 17;
// best not to explicitly state the type of variable, as Typescript knows this in advance.

// union types are also available, which are variables that are capable of being multiple different data types...
let age: string | number;
age = 31;
age = '31';

// we can also state what kind of data an array will contain:
let ids: number[] = [1,2,3,4,5];
let names: string[] = ['Ryan', 'Katherine', 'Jared'];
let options: boolean[] = [true, false, false];
let books: object[] = [
  { name: 'Fooled by Randomness', author: 'Nassim Taleb' },
  { name: 'Sapiens', author: 'Yuval Noah Harari'}
];
let arr: any[] = ['hello', 1, true];

ids.push(6);
ids.push('7'); // ERROR

// use union types to define arrays with multiple data types
let person: (string | number | boolean)[] = ['Danny', 1, true];
person[0] = 100;
person[1] = {name: 'Brent'}; // ERROR

// REMEMBER, it is not necessary to initialize a variable with defined data types, as Typescript will infer it/them.

/**************************************/

// There is a special type of array in Typescript known as a Tuple. Tuples are arrays with fixed sizes and datatypes. They are more strict than regular arrays.

let array: [string, number, boolean] = ['Barb', 6, false];
array[0] = 100; // ERROR, value at index 0 can ONLY be a string


// Objects can be declared with data types defined and TypeScript will ask you to adhere to them. Notice the syntax for the declaration.

let human: {
  name: string;
  location: string;
  isProgrammer: boolean;
};

human = {
  name: 'Jake',
  location: 'Squamish',
  isProgrammer: false
};

human.isProgrammer = 'Yes'; // ERROR, wrong data type.

human = {
  name: 'Cody',
  location: 'Chilliwack'
}; // ERROR, variable from the initial declaration is missing.

/* When defining the signature of an object, you will usually use an 'Interface'. This is useful if we want to check that multiple objects have the same specific properties and value types. */

interface Person {
  name: string;
  location: string;
  isProgrammer: boolean;
};

let person1: Person = {
  name: 'Danny',
  location: 'Vancouver',
  isProgrammer: true
};

let person2: Person = {
  name: 'Sarah',
  location: 'Toronto',
  isProgrammer: false
};

/* We can declare functions properties in a similar way, using OG Javascript function syntax or ES6 arrows functions. */

interface Speech {
  sayHi(name: string): string;
  sayBye: (name: string) => string;
};

let sayStuff: Speech = {
  sayHi: function (name: string) {
    return `Hi ${name}.`;
  },
  sayBye: (name: string) => `Bye ${name}.`
};

console.log(sayStuff.sayHi('Ryan'));
console.log(sayStuff.sayBye('Sean'));

/* We can define the data type of function arguments, as well as the data type of what the function returns. */

function circle(diam: number): string {
  return 'The circumference is ' + Math.PI * diam;
};

console.log(circle(10));

// Now with an arrow function...

const circleFunc = (diam: number): string => {
  return 'The circumference is ' + Math.PI * diam;
};

console.log(circleFunc(9));

/* The two functions above were not explicitly defined as functions because, once again, TypeScript is able to infer that information. It can also infer the type of the returned data, so it isn't necessary to state that explicitly either. However, if the function is large enough, it can be useful to state the return value data type for readability. */

// Using explicit typing:

const circleExplicit: Function = (diam: number): string => {
  return 'The circumference is ' + Math.PI * diam;
};

// Using inferred typing:

const circleInfer = (diam: number) => {
  return 'The circumference is ' + Math.PI * diam;
};

// We can add a question mark (?) after a parameter to make it optional.
// ALSO: Notice that 'c' is a union type that can be a number or string.

const add = (a: number, b: number, c?: number | string) => {
  console.log(c);
  return a + b;
};

console.log(add(5, 4, 'I can pass a number, string, or nothing here!'));

/* A function with no actual return value is said to return void. Again, we can state this explicitly or not, Typscript will know the difference, but it can be useful for readability. */

const logMessage = (msg: string): void => {
  console.log(`This is the message: ${msg}`)
};

logMessage("TypeScript is dope!");

/* If we want to declare a function variable, but not define it (state what it does), then use a function signature. Below, the function sayHello must follow the signature after the colon: */

/* declare the sayHello function and give it a function signature that takes a string and returns nothing: */
let sayHello: (name: string) => void;

// Define the function, satisying it's signature:

sayHello = (name) => {
  console.log(`Hello ${name}.`);
};

sayHello('Danny');

/* Using the 'any' type, we can basically revert TypeScript back to JS. However, this makes TypeScript useless so itt's not recommended. */

let variable: any = '100';
variable = 100;
variable = {a: 100};

/*******************************************/

/* Type Aliases are similar to classes. They help keep our code DRY. Below, the PersonObject type alias has prevented repetition and acts as a single source of truth for what a person object should contain. */

type StringOrNumber = string | number;

type PersonObject = {
  name: string;
  id: StringOrNumber;
};

const personA: PersonObject = {
  name: 'John',
  id: 1
};

const personB: PersonObject = {
  name: 'Delia',
  id: 2
};

const sayHey = (person: PersonObject) => {
  return 'Hi ' + person.name;
};

const sayGoodbye = (person: PersonObject) => {
  return 'Seeya ' + person.name;
};

/************************************************/

/* TypeScript doesn't have access to the DOM like Javascript does. Therefore, whenever we try to access DOM elements, TypeScript can't verify that they exist. */

// const link = document.querySelector('a');
// console.log(link.href); 
// ^^ ERROR: Object is possible null. TypeScript can't be sure that the anchor tag actually exists

/* However we can use the non-null assertion operator(!) to tell the compiler explicitly that an expression has a value other than null or undefined. */

// const link = document.querySelector('a')!;
// console.log(link.href); 
// Output: www.freecodecamp.org

/* The type of the link variable didn't require explicit definition because TypeScript (once again) is able to infer that it is a HTMLAnchorElement. */

/* What if we're trying to select an element by class or id? In this case, we need to use type casting. It allows us to tell TypeScript that we are certain that an element exists and that we know what type it is. */

const form = document.getElementById('signup-form') as HTMLFormElement;
// console.log(form.method)
// Output: POST