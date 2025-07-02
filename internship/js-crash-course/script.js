// VARIABLES
let name = "Jamal";
const age = 21;
var university = "SSUET";

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

console.log(getGrade(85));
console.log(getGrade(95));

function canVote(age) {
    if (age >= 18) {
        return true;
    } else {
        return false;
    }
}

console.log("Can 20-year-old vote?", canVote(20));
console.log("Can 16-year-old vote?", canVote(16));

// ARRAYS
let fruits = ["apple", "banana", "orange"];
console.log("First fruit:", fruits[0]);
console.log(fruits.length);

// MODIFYING ARRAYS
fruits.push("grapes");
fruits.unshift("mango");
fruits.pop();
console.log(fruits);

// LOOPING THROUGH ARRAYS
for (let i = 0; i < fruits.length; i++) {
    console.log("Fruit" + (i + 1) + ":", fruits[i]);
}

fruits.forEach((fruits, index) => {
    console.log(`Index ${index}: ${fruits}`);
});

const upperFruits = fruits.map(fruits => fruits.toUpperCase());
console.log("Uppercase fruits:", upperFruits);

// OBJECT BASICS
const student = {
    name: "Jamal Nadeem",
    age: 21,
    isEnrolled: true,
    subjects: ["JavaScript", "React", "Next.js"]
};

console.log("Name:", student.name);
console.log("Age:", student["age"]);
console.log("First Subject:", student.subjects[0]);

student.city = "Karachi";

// NESTED OBJECT
const course = {
    title: "Web Dev Bootcamp",
    duration: "6 weeks",
    instructor: {
        name: "Nexium",
        experience: "5 months"
    }
};

console.log("Instructor Name:", course.instructor.name);

for (let key in student) {
    console.log(`${key}: ${student[key]}`);
}

const book = {
    title: "JavaScript Basics",
    author: "John Doe",
    pages: 300,
    genre: ["Programming", "Web Development"],
    publisher: {
        name: "Tech Books Publishing",
        year: 2023
    }
};

for (let key in book) {
    if (key !== "publisher") {
        console.log(`${key}: ${book[key]}`);
    }
}

console.log("Publisher Name:", book.publisher.name);
console.log("Publishing Year:", book.publisher.year);

const car = {
  brand: "Toyota",
  model: "Corolla",
  year: 2022
};

console.log(car["brand"]);

const user = {
  name: "Ali",
  skills: ["HTML", "CSS", "JavaScript"]
};

console.log(user.skills[1]);

const laptop = {
    brand: "Hewlett-Packard",
    price: "$1200",
    specs: {
        ram: "16GB",
        cpu: "Intel(R) Core(TM) i5-8250U CPU @ 1.60GHz   1.80 GHz",
    }
};

console.log("CPU:", laptop.specs.cpu);

// DOM ACCESS
//const heading = document.getElementById("main-heading");
//console.log(heading.innerText);

// EVENT LISTENER
//const greetBtn = document.getElementById("greetBtn");
//const nameInput = document.getElementById("nameInput");
//const output = document.getElementById("output");

//greetBtn.addEventListener("click", () => {
//    const name = nameInput.value;
//    output.innerText = `Welcome, ${name}!`;
//});

const addBtn = document.getElementById("addBtn");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const deleteBtn = document.getElementById("deleteBtn");

let tasks = [];

addBtn.addEventListener("click", () => {
    const task = todoInput.value.trim();
    if (task === "") return;
    
    tasks.push(task);
    todoInput.value = "";
    renderTasks();
});

function renderTasks() {
    todoList.innerHTML = "";
    
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerText = task;
        
        const deleteBtn = document.createElement("deleteBtn");
        deleteBtn.innerText = "❌";
        deleteBtn.onclick = () => {
            tasks.splice(index, 1);
            renderTasks();
        };

        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
}

deleteBtn.addEventListener("click", () => {
  tasks = [];
  renderTasks();
});