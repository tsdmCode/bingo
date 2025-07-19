import { sets } from './arrays.js';

//DON'T TOUCH ANYTHING IN HERE REHOLY
const field = document.getElementById('field');
const generateBtn = document.getElementById('generate-btn');

const selection = document.getElementById('selection');

sets.forEach((set, index) => {
  if (set && set.name) {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = set.name;
    selection.appendChild(option);
  }
});

generateBtn.addEventListener('click', () => {
  field.innerHTML = '';
  const option = parseInt(document.getElementById('selection').value);
  const formatOption = parseInt(document.getElementById('format').value);

  generateField(sets[option].array, formatOption);
});

function generateField(arr, formatInt) {
  const header = document.getElementById('global-header');
  header.textContent = "POPE'S BINGO BONANZA";
  let numberFields = 0;
  let newArray = [...arr];
  field.className = '';

  if (formatInt === 3) {
    field.classList.add('three');
  } else {
    field.classList.add('five');
  }

  const middleField = Math.floor((formatInt * formatInt) / 2);

  while (numberFields < formatInt * formatInt) {
    //Just putting this in here so people don't accidentally trigger an infinite WITH TEENY TINY ARRAYS
    if (newArray.length === 0) {
      throw new Error('Insufficient array');
    }

    const randInt = Math.floor(Math.random() * newArray.length);

    const element = document.createElement('div');
    const para = document.createElement('p');
    element.classList.add('bingofields');
    para.textContent = formatInt === 5 && numberFields === middleField ? 'FREE SPACE' : newArray[randInt];
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
        if (checkBingo(marked, formatInt)) {
          header.innerText = 'YOU ARE WINNER!';
          bingoFlag = true;
        }
      }
    });
  });
}

function checkBingo(marked, formatInt) {
  for (let r = 0; r < formatInt; r++) {
    if (marked.slice(r * formatInt, r * formatInt + formatInt).every(Boolean)) return true;
  }

  for (let c = 0; c < formatInt; c++) {
    if (Array.from({ length: formatInt }, (_, r) => marked[r * formatInt + c]).every(Boolean)) return true;
  }

  if (Array.from({ length: formatInt }, (_, i) => marked[i * (formatInt + 1)]).every(Boolean)) return true;
  if (Array.from({ length: formatInt }, (_, i) => marked[(i + 1) * (formatInt - 1)]).every(Boolean)) return true;

  return false;
}
