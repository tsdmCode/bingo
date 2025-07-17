const bingoArray = [
  'Reholy goes POP',
  'Gus goes POP',
  'Random Mage Retardation',
  'Gus complains about X class',
  'Gus complains about resil keys',
  'Hitting instance cap',
  'Boomkin fails to bearform',
  'Dave misses stop',
  'Dave eats frontal',
  'Gus hyperfixates',
  'Pre-run yap lasts longer than key',
  'Gus learns something new',
  'R.io gained',
  'Gus references dbl rogue/warr comp',
  'Gus expecting team to mindread',
  'Reholy insta replies to Bloomi mid-run',
  'Dave ninjapull',
  'Random DPS does Z dam',
  'Skip fail',
  'Dave proc',
  'HKCP strat in low key',
  'Warmup key deplete',
  'Gus goes non-verbal',
  'Gus noises',
  'Missed count',
  'Slur',
  'Raccoon(Reikon) mentioned',
  'Karstinen/Zerocool/Muskel reference',
];
const field = document.getElementById('field');
let numberFields = 0;

while (numberFields < 25) {
  const randInt = Math.floor(Math.random() * bingoArray.length);

  const element = document.createElement('div');
  const para = document.createElement('p');
  element.classList.add('bingofields');
  para.textContent = bingoArray[randInt];
  element.append(para);
  field.append(element);
  bingoArray.splice(randInt, 1);
  numberFields++;
}

const fields = Array.from(document.getElementsByClassName('bingofields'));
let marked = Array(25).fill(false);

fields.forEach((f, i) => {
  f.addEventListener('click', () => {
    console.log(i);
    f.classList.toggle('valid');
    marked[i] = f.classList.contains('valid');
    if (checkBingo(marked)) {
      alert('Bingo!');
    }
  });
});

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
