// LIS comms support based on the 4 row spelling system

// first state = show rows 1,2,3,4
//    - select right number of row by tapping
// second state = cycle letters
//    - bottom to go to the next (does not loop, last letter rejected returns to first state)
//    - top to type the letter

var letters = [
  ['A','B','C','D','E','F','G'],
  ['H','I','J','K','L','M','N'],
  ['O','P','Q','R','S','T'],
  ['U','V','W','X','Y','Z']
];

var msg = '';
var state = 0;
var index = 0;
var row = 0;

var w = window.innerWidth;
var h = window.innerHeight-200;

function setup(){
  createCanvas(w,h+200);
  noStroke();
}

function draw(){

  if (state === 0) {
    selectRow();
  } else {
    selectLetter();
  }

  showMsg()
}

// Shows 1 2 3 4 to be selected
function selectRow() {

  // draw rect 1
  fill(50);
  rect(0,0,w/2,h/2);

  // draw rect 2
  fill(75);
  rect(w/2,0,w/2,h/2);

  // draw rect 3
  fill(100);
  rect(0,h/2,w/2,h/2);

  // draw rect 4
  fill(125);
  rect(w/2,h/2,w/2,h/2);

  // draw text
  textSize(h/4);
  textAlign(CENTER,CENTER);
  fill(255);
  text('1', w/4, h/4);
  text('2', w*3/4, h/4);
  text('3', w/4, h*3/4);
  text('4', w*3/4, h*3/4);
}

// Shows a letter and gives the option to accept or deny it
function selectLetter() {

  // top part green (accept)
  fill(40,100,40);
  rect(0,0,w,h/2);

  // bottom part red (deny)
  fill(100,40,40);
  rect(0,h/2,w,h/2);

  // display letter
  fill(255);
  textSize(h/2);
  textAlign(CENTER,CENTER);
  text(letters[row][index], w/2, h/2);

}

function mouseClicked(){

  // Cliccked on the bottom part displaying the message
  if (mouseY > h){
    // left is backspace
    if (mouseX>w/2){
      msg = msg + ' ';

    // right is space
    } else {
      msg = msg.slice(0, -1);
    }

  // clicked on the main part
  } else {
    if (state === 0){
      // determine which number is pressed
      if (mouseX < w/2){
        if (mouseY < h/2){
          state = 1;
          row = 0;
        } else {
          state = 1;
          row = 2;
        }
      } else {
        if (mouseY < h/2){
          state = 1;
          row = 1;
        } else {
          state = 1;
          row = 3;
        }
      }
    } else {
      // if accepted, add letter to msg
      if (mouseY < h/2){
        state = 0;
        if (msg.length%24==0){ msg = msg + ' '}
        msg = msg + letters[row][index];
        index = 0;
        console.log(msg);
      // if denied go to the next letter or back to rows if it is the last
      } else {
        if (index < letters[row].length-1){
          index++
        }else{
          index = 0;
        }
      }
    }
  }
}

// Displays the currently spelled message
function showMsg () {
  // background
  fill(10);
  rect(0,h,w,200);

  // arrows for backspace and space
  fill(80);
  textSize(150);
  text('<',w/4,h+100);
  text('>',w*3/4,h+100);

  // display the message
  fill(255);
  textAlign(LEFT,TOP);
  textSize(60);
  text(msg,20,h+20,w-40,180);
}
