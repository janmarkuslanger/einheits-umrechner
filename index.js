const densities = {
  water: { name: 'Wasser', density: 1 },
  milk: { name: 'Milch', density: 1.03 },
  oil: { name: 'Sonnenblumenöl', density: 0.92 },
  'olive-oil': { name: 'Olivenöl', density: 0.91 },
  honey: { name: 'Honig', density: 1.42 },
  flour: { name: 'Weizenmehl', density: 0.59 },
  sugar: { name: 'Zucker', density: 0.85 },
  cream: { name: 'Sahne', density: 1.01 },
  butter: { name: 'Butter, geschmolzen', density: 0.90 }
};

const form = document.getElementById('converter-form');
const ingredientSelect = document.getElementById('ingredient');
const directionSelect = document.getElementById('direction');
const amountInput = document.getElementById('amount');
const resultBox = document.getElementById('result');
const densityList = document.getElementById('density-list');

const normalizeNumber = (value) => {
  if (typeof value !== 'string') return value;
  return value.replace(',', '.');
};

const formatNumber = (value) => {
  return Number.parseFloat(value).toLocaleString('de-DE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
};

const updatePlaceholder = () => {
  const direction = directionSelect.value;
  amountInput.placeholder = direction === 'g-to-ml' ? 'z.B. 250 g' : 'z.B. 200 ml';
};

directionSelect.addEventListener('change', updatePlaceholder);
updatePlaceholder();

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const rawValue = normalizeNumber(amountInput.value.trim());

  if (rawValue === '') {
    resultBox.textContent = 'Bitte gib eine Zahl ein.';
    return;
  }

  const value = Number(rawValue);
  if (Number.isNaN(value) || value < 0) {
    resultBox.textContent = 'Ungültige Eingabe. Bitte nur positive Zahlen verwenden.';
    return;
  }

  const ingredient = ingredientSelect.value;
  const { name, density } = densities[ingredient];
  const direction = directionSelect.value;
  let result;

  if (direction === 'g-to-ml') {
    result = value / density;
    resultBox.textContent = `${formatNumber(value)} g ${name} entsprechen ${formatNumber(result)} ml.`;
  } else {
    result = value * density;
    resultBox.textContent = `${formatNumber(value)} ml ${name} entsprechen ${formatNumber(result)} g.`;
  }
});

const renderDensityList = () => {
  densityList.innerHTML = '';
  Object.values(densities).forEach(({ name, density }) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${name}</strong><br>1 ml ≈ ${density.toFixed(2)} g`;
    densityList.appendChild(li);
  });
};

renderDensityList();
