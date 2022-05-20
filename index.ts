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
// ids.push('7'); 
// ERROR: Cannot assign string to array of numbers

// use union types to define arrays with multiple data types
let person: (string | number | boolean)[] = ['Danny', 1, true];
person[0] = 100;
// person[1] = {name: 'Brent'}; 
// ERROR: Cannot reassign variable to an object

// REMEMBER, it is not necessary to initialize a variable with defined data types, as Typescript will infer it/them.

/**************************************/

// There is a special type of array in Typescript known as a Tuple. Tuples are arrays with fixed sizes and datatypes. They are more strict than regular arrays.

let array: [string, number, boolean] = ['Barb', 6, false];
// array[0] = 100; 
// ERROR, value at index 0 can ONLY be a string


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

// human.isProgrammer = 'Yes'; 
// ERROR, wrong data type.

// human = {
//   name: 'Cody',
//   location: 'Chilliwack'
// }; 
// ERROR, variable from the initial declaration is missing.

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

// const form = document.getElementById('signup-form') as HTMLFormElement;
// console.log(form.method)
// Output: POST

/* Typescript has en Event object built in. If we add a submit event listener, TypeScript will give us an error if we call any methods that aren't associated with the Event object. Below I call the target method on the event object, but there's a spelling mistake. TypeScript will notify us of the error. */

// const form = document.getElementById('signup-form') as HTMLFormElement;

// form.addEventListener('submit', (e: Event) => {
//   e.preventDefault();

//   console.log(e.tarrget);
// });
// ERROR: Property 'tarrget' does not exist on type 'Event'. Did you mean 'target'?

/************************************************************************************/

// CLASSES

// We can define all of the different types of data that make up a class.

class Person {
  name: string;
  isCool: boolean;
  pets: number;

  constructor(n: string, c: boolean, p: number) {
    this.name = n;
    this.isCool = c;
    this.pets = p;
  }

  sayWhatsUp() {
    return `What's up? My name is ${this.name} and I have ${this.pets} pets`;
  }
}

const personX = new Person('Danny', false, 1);
// const personY = new Person('Sarah', 'yes', 6);
// ERROR: Argument of type 'string' is not assignable to the parameter type 'boolean'.

console.log(personX.sayWhatsUp());

/* We could then create a people array that only includes objects constructed from the Person class */

let People: Person[] = [personX, person2];

/* We can add access modifiers that manage permissions for properties of a class. TypeScript comes with a unique access modifer called 'readonly' */

class AnotherPerson {
  readonly name: string; // this property is immutable. read-only.
  private isCool: boolean; // can only access/modify from methods within this class
  protected email: string; // can access/modify from this class and subclasses
  public pets: number; // can access/modify from anywhere, including outside the class

  constructor(n: string, c: boolean, e: string, p: number) {
    this.name = n;
    this.isCool = c;
    this.email = e;
    this.pets = p;
  }
    sayMyName() {
      console.log(`Your not Heisenberg, you're ${this.name}!`);
    }
};



const personJ = new AnotherPerson('Danny', false, 'dan@email.com', 1);
console.log(personJ.name); // this will work fine

// personJ.name = 'James';
// Error: read only

// console.log(personJ.isCool); Error: private property - only accessible within AnotherPerson class
// console.log(personJ.email); Error: protected property - only accessible within AnotherPerson class
// console.log(personJ.pets); // Public property - works fine.

/* To be maximally concise, we should construct our classes with the types and constructor combined. */

class Human {
  constructor(
    readonly name: string,
    private isCool: boolean,
    protected email: string,
    public pets: number
  ) {}

  sayMyName() {
    console.log(`You're not Heisenberg, you're ${this.name}!`);
  }
}

const personK = new Human('Katherine', true, 'kat@email.com', 0);
console.log(personK.name); // Output: Katherine

// Classes can be extended, just like vanilla Javascript.

class Programmer extends Human {
  programmingLanguages: string[];

  constructor(
    name: string,
    isCool: boolean,
    email: string,
    pets: number,
    pL: string[]
    ) {
      /* The super call must supply all parameters for base (Human) class,
      as the constructor is not inherited. */
      super(name, isCool, email, pets);
      this.programmingLanguages = pL
    }
};

/*********************************************************/

// Interfaces define how an object should look.

interface Person {
  name : string;
  age: number;
}

function sayHi(person: Person) {
  console.log(`Hi ${person.name}`);
}

sayHi({
  name: 'John',
  age: 48,
});
// Output: Hi John

// You can also define an object type using a type alias.

