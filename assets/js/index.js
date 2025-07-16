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
  ' Dave ninjapull',
  'Random DPS does Z dam',
  'Skip fail',
  'Dave proc',
  'HKCP strat in low key',
  'Warmup key deplete',
  'Gus goes non-verbal',
  'Gus noises',
];
const field = document.getElementById('field');
let numberFields = 0;

while (numberFields < 16) {
  let randInt = Math.floor(Math.random() * bingoArray.length);

  let element = document.createElement('div');
  let para = document.createElement('p');
  element.classList.add('bingofields');
  para.textContent = bingoArray[randInt];
  element.append(para);
  field.append(element);
  bingoArray.splice(randInt, 1);
  numberFields++;
}

const fields = Array.from(document.getElementsByClassName('bingofields'));

fields.forEach((f) => {
  f.addEventListener('click', () => {
    f.classList.toggle('valid');
  });
});
