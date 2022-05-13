var sport = 'football';
var id = 5;
var myself = 'Ryan';
var unit;
unit = 17;
// best not to explicitly state the type of variable, as Typescript knows this in advance.
// union types are also available, which are variables that are capable of being multiple different data types...
var age;
age = 31;
age = '31';
// we can also state what kind of data an array will contain:
var ids = [1, 2, 3, 4, 5];
var names = ['Ryan', 'Katherine', 'Jared'];
var options = [true, false, false];
var books = [
    { name: 'Fooled by Randomness', author: 'Nassim Taleb' },
    { name: 'Sapiens', author: 'Yuval Noah Harari' }
];
var arr = ['hello', 1, true];
ids.push(6);
// ids.push('7'); 
// ERROR: Cannot assign string to array of numbers
// use union types to define arrays with multiple data types
var person = ['Danny', 1, true];
person[0] = 100;
// person[1] = {name: 'Brent'}; 
// ERROR: Cannot reassign variable to an object
// REMEMBER, it is not necessary to initialize a variable with defined data types, as Typescript will infer it/them.
/**************************************/
// There is a special type of array in Typescript known as a Tuple. Tuples are arrays with fixed sizes and datatypes. They are more strict than regular arrays.
var array = ['Barb', 6, false];
// array[0] = 100; 
// ERROR, value at index 0 can ONLY be a string
// Objects can be declared with data types defined and TypeScript will ask you to adhere to them. Notice the syntax for the declaration.
var human;
human = {
    name: 'Jake',
    location: 'Squamish',
    isProgrammer: false
};
;
var person1 = {
    name: 'Danny',
    location: 'Vancouver',
    isProgrammer: true
};
var person2 = {
    name: 'Sarah',
    location: 'Toronto',
    isProgrammer: false
};
;
var sayStuff = {
    sayHi: function (name) {
        return "Hi " + name + ".";
    },
    sayBye: function (name) { return "Bye " + name + "."; }
};
console.log(sayStuff.sayHi('Ryan'));
console.log(sayStuff.sayBye('Sean'));
/* We can define the data type of function arguments, as well as the data type of what the function returns. */
function circle(diam) {
    return 'The circumference is ' + Math.PI * diam;
}
;
console.log(circle(10));
// Now with an arrow function...
var circleFunc = function (diam) {
    return 'The circumference is ' + Math.PI * diam;
};
console.log(circleFunc(9));
/* The two functions above were not explicitly defined as functions because, once again, TypeScript is able to infer that information. It can also infer the type of the returned data, so it isn't necessary to state that explicitly either. However, if the function is large enough, it can be useful to state the return value data type for readability. */
// Using explicit typing:
var circleExplicit = function (diam) {
    return 'The circumference is ' + Math.PI * diam;
};
// Using inferred typing:
var circleInfer = function (diam) {
    return 'The circumference is ' + Math.PI * diam;
};
// We can add a question mark (?) after a parameter to make it optional.
// ALSO: Notice that 'c' is a union type that can be a number or string.
var add = function (a, b, c) {
    console.log(c);
    return a + b;
};
console.log(add(5, 4, 'I can pass a number, string, or nothing here!'));
/* A function with no actual return value is said to return void. Again, we can state this explicitly or not, Typscript will know the difference, but it can be useful for readability. */
var logMessage = function (msg) {
    console.log("This is the message: " + msg);
};
logMessage("TypeScript is dope!");
/* If we want to declare a function variable, but not define it (state what it does), then use a function signature. Below, the function sayHello must follow the signature after the colon: */
/* declare the sayHello function and give it a function signature that takes a string and returns nothing: */
var sayHello;
// Define the function, satisying it's signature:
sayHello = function (name) {
    console.log("Hello " + name + ".");
};
sayHello('Danny');
/* Using the 'any' type, we can basically revert TypeScript back to JS. However, this makes TypeScript useless so itt's not recommended. */
var variable = '100';
variable = 100;
variable = { a: 100 };
var personA = {
    name: 'John',
    id: 1
};
var personB = {
    name: 'Delia',
    id: 2
};
var sayHey = function (person) {
    return 'Hi ' + person.name;
};
var sayGoodbye = function (person) {
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
var Person = /** @class */ (function () {
    function Person(n, c, p) {
        this.name = n;
        this.isCool = c;
        this.pets = p;
    }
    Person.prototype.sayWhatsUp = function () {
        return "What's up? My name is " + this.name + " and I have " + this.pets + " pets";
    };
    return Person;
}());
var personX = new Person('Danny', false, 1);
// const personY = new Person('Sarah', 'yes', 6);
// ERROR: Argument of type 'string' is not assignable to the parameter type 'boolean'.
console.log(personX.sayWhatsUp());
/* We could then create a people array that only includes objects constructed from the Person class */
var People = [personX, person2];
