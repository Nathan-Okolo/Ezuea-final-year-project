// program to solve quadratic equation
// installing npm module that will prompt users to input field
const prompt = require('prompt-sync')();

let root1;

// take input from the user
let name = prompt('Good Day user please can u tell us your name?')
let a = prompt("Enter the Reciever power: ");
let b = prompt("Enter the Recicever antenna gain: ");
let c = prompt("Enter the Transmitter antenna gain: ");
let d = prompt("Enter the Reciever efficiency: ");
let e = prompt("Enter the Impendance mismatch coefficient: ");
let f = prompt("Enter the Polarization coefficent between reader and tag: ");
let g = prompt("Enter the Chip threshold power: ");
// calculate discriminant
let squareRoot = ((a*b*c*d*e*f)/g);
console.log(squareRoot)

// condition for real and different roots
if (squareRoot > 0) {
    root = ( Math.sqrt(squareRoot));}
    console.log(root)
pre = d/(4*Math.PI)
console.log(pre);

// final calculations
distanceBtwAntenna = pre * root;
R = distanceBtwAntenna
console.log(R)

// Result
console.log 