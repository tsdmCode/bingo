import { bingoArray, testArr } from './arrays.js';

//DON'T TOUCH ANYTHING IN HERE REHOLY
const field = document.getElementById('field');
const generateBtn = document.getElementById('generate-btn');
const arrays = [bingoArray, testArr];

generateBtn.addEventListener('click', () => {
  field.innerHTML = '';
  const option = parseInt(document.getElementById('selection').value);
  const formatOption = parseInt(document.getElementById('format').value);

  generateField(arrays[option], formatOption);
});

function generateField(arr, formatInt) {
  let numberFields = 0;
  let newArray = [...arr];
  field.className = '';

  if (formatInt === 3) {
    field.classList.add('three');
  } else {
    field.classList.add('five');
  }

  while (numberFields < formatInt * formatInt) {
    //Just putting this in here so people don't accidentally trigger an infinite WITH TEENY TINY ARRAYS
    if (newArray.length === 0) {
      throw new Error('Insufficient array');
    }

    const randInt = Math.floor(Math.random() * newArray.length);

    const element = document.createElement('div');
    const para = document.createElement('p');
    element.classList.add('bingofields');
    para.textContent = numberFields != 12 ? newArray[randInt] : 'FREE SPACE';
    element.append(para);
    field.append(element);
    newArray.splice(randInt, 1);
    numberFields++;
  }

  const fields = Array.from(document.getElementsByClassName('bingofields'));

  const marked = Array(formatInt * formatInt).fill(false);
  let bingoFlag = false;

  fields.forEach((f, i) => {
    f.addEventListener('click', () => {
      if (!bingoFlag) {
        f.classList.toggle('valid');
        marked[i] = f.classList.contains('valid');
        if (checkBingo(marked)) {
          document.getElementById('global-header').innerText = 'YOU ARE WINNER!';
          bingoFlag = true;
        }
      }
    });
  });
}

//TODO: make the checkbingo also work for a 3x3 grid
function checkBingo(marked) {
  for (let r = 0; r < 5; r++) {
    if (marked.slice(r * 5, r * 5 + 5).every(Boolean)) return true;
  }

  for (let c = 0; c < 5; c++) {
    if ([0, 1, 2, 3, 4].map((r) => marked[r * 5 + c]).every(Boolean)) return true;
  }

  if ([0, 6, 12, 18, 24].map((i) => marked[i]).every(Boolean)) return true;
  if ([4, 8, 12, 16, 20].map((i) => marked[i]).every(Boolean)) return true;
  return false;
}

generateField(bingoArray, 5);
