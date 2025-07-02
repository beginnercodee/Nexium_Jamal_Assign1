// VARIABLES
let name = "Jamal";
const age = 21;
var university = "SSUET";

name = "Nadeem";

// DATA TYPES
let isStudent = true;           // boolean
let marks = 85.5;               // number
let grade = "A+";                // string
let nothing = null;             // null
let notDefined;                // undefined

// Logging values
console.log("Name:", name);
console.log("Age:", age);
console.log("Is Student:", isStudent);
console.log("Marks:", marks);
console.log("Not Defined:", notDefined);

// TYPE CHECKING

console.log(typeof grade);          // string
console.log(typeof marks);          // number
console.log(typeof notDefined);     // undefined
console.log(typeof nothing);       // object (this is a known JavaScript quirk)

var myFavoriteNumber = 58;
var isDarkModeEnabled = false;
var no_thing = null;
var undefinedVariable = undefined;
const universityName = "SSUET";

console.log("My favorite number:", myFavoriteNumber);
console.log("Is dark mode enabled?", isDarkModeEnabled);
console.log("No thing:", no_thing);
console.log("Undefined variable:", undefinedVariable);
console.log("University name:", universityName);

// CHALLENGE

let a = 5;
let b = "5";
console.log(a == b);  // ?
console.log(a === b); // ?