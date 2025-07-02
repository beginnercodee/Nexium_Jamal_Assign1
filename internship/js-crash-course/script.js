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

// CONDITIONS

let score = 72;

if (score >= 90) {
    console.log("Grade: A");
} else if (score >= 75) {
    console.log("Grade: B");
} else if (score >= 60) {
    console.log("Grade: C");
} else {
    console.log("Grade: F");
}

// LOGICAL OPERATORS
let isLoggedIn = true;
let isAdmin = false;

if (isLoggedIn && isAdmin) {
    console.log("Welcome, Admin!");
} else if (isLoggedIn) {
    console.log("Welcome back!");
} else {
    console.log("Please log in.");
}

// FUNCTIONS
function greet(name) {
    return "Hello, " + name + "!";
}

console.log(greet("Jamal"));

// ARROW FUNCTION
const isEven = (num) => {
    return num % 2 === 0;
};

console.log("Is 10 even?", isEven(10));
console.log("Is 5 even?", isEven(5));


function getGrade(score) {
    if (score >= 90) {
        return "A";
    } else if (score >= 75) {
        return "B";
    } else if (score >= 60) {
        return "C";
    } else {
        return "F";
    }
}

function canVote(age) {
    if (age >= 18) {
        return true;
    } else {
        return false;
    }
}