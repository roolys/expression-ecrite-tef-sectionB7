
// Sélectionne tous les éléments textarea dans le document
const textareas = Array.from(document.querySelectorAll('textarea'));

// Sélectionne tous les éléments affichant le nombre de mots
const wordCountElements = Array.from(document.querySelectorAll('.word-count'));

// Sélectionne l'élément affichant le chronomètre
const timerElement = document.querySelector('#timer');

// Variables pour le chronomètre
let timer;
let minutes = 35;
let seconds = 0;

// Fonction pour démarrer le chronomètre
function startTimer() {
  if (!timer) {
    // Démarre l'intervalle du chronomètre
    timer = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          // Arrête le chronomètre lorsque le temps est écoulé
          clearInterval(timer);
          timer = null;

          // Désactive tous les textareas
          textareas.forEach(textarea => {
            textarea.disabled = true;
          });

          // Affiche le message de temps écoulé
          timerElement.textContent = `Temps écoulé !!`;
          return;
        }
        minutes--;
        seconds = 59;
      } else {
        seconds--;
      }

      // Met à jour l'affichage du chronomètre
      timerElement.textContent = `Temps restant : ${minutes}:${seconds.toString().padStart(2, '0')}`;

    }, 1000);
  }
}

// Ajoute les écouteurs d'événements aux textareas
textareas.forEach((textarea, index) => {
  textarea.addEventListener('click', startTimer);

  textarea.addEventListener('input', () => {
    // Compte le nombre de mots dans le contenu du textarea
    const wordCount = textarea.value.trim().split(/\s+/).length;

    // Met à jour l'affichage du nombre de mots
    wordCountElements[index].textContent = `Nombre de mots : ${wordCount}`;
  });
});

// Récupérer le titre de niveau h1
const h1Title = document.querySelector('h1').textContent.trim(); // Récupère le texte du titre de niveau h1 et le nettoie des espaces inutiles
const h5Title = document.querySelector('h5').textContent.trim(); // Récupère le texte du titre de niveau h5 et le nettoie des espaces inutiles


function downloadContent() {
  const content = [];
  content.push(h1Title); // Ajouter le titre de niveau h1
  content.push(h5Title); // Ajouter le titre de niveau h5
  content.push('');


  // Fonction utilitaire pour ajouter une section de contenu
  function addContent(header, paragraph, textarea, wordCount) {
    content.push(`${header}`);
    content.push(paragraph);
    //content.push('');
    if (textarea !== null) {
      content.push(textarea);
      content.push('');
    }
    content.push(wordCount); // Ajouter le nombre de mots sans saut de ligne après
    content.push('');
  }

  // Récupère les textarea, les titres h2 et les titres h3 associés
  const container = document.querySelector('.container');
  const textAreas = container.querySelectorAll('.text-area textarea');
  const h2Headings = container.querySelectorAll('.text-area h2');
  const h3Headings = container.querySelectorAll('.text-area h3');
  const wordCountElements = container.querySelectorAll('.word-count');

  // Parcours chaque textarea et ajoute son contenu
  textAreas.forEach((textarea, index) => {
    const h2Heading = h2Headings[index];
    const h2Paragraph = h2Heading.nextElementSibling;
    const wordCount = wordCountElements[index];

    addContent(h2Heading.textContent.trim(), '', textarea.value.trim(), wordCount.textContent); // Ignorer le paragraphe suivant le titre h2

    // Vérifie s'il y a des titres h3 associés
    const h3s = Array.from(h3Headings).filter(h3 => h3.closest('.text-area') === h2Heading.parentElement);
    h3s.forEach(h3 => {
      const h3Paragraph = h3.nextElementSibling;
      addContent(h3.textContent.trim(), h3Paragraph.textContent.trim(), null); // Ne pas ajouter le nombre de mots pour les titres h3
    });
  });

  // Crée le texte final à enregistrer
  const textToSave = content.join('\n');

  // Crée un lien de téléchargement
  const element = document.createElement('a');
  const file = new Blob([textToSave], { type: 'text/plain' });
  element.href = URL.createObjectURL(file);
  element.download = 'expression-ecrite-TEFCanada-sectionB.txt';

  // Ajoute le lien au corps du document et déclenche le téléchargement
  document.body.appendChild(element);
  element.click();
}
//KeyBoard

function insertCharacter(character) {
  // Récupère l'élément textarea actif
  const activeTextarea = document.querySelector('.text-area.active textarea');
  
  if (activeTextarea) {
    // Ajoute le caractère au textarea actif
    activeTextarea.value += character;

    // Ajoute le focus au textarea actif
    activeTextarea.focus();
  }
}

// Ajoute un gestionnaire d'événements aux textareas pour les marquer comme actifs au clic
document.querySelectorAll('.text-area textarea').forEach(textarea => {
  textarea.addEventListener('click', function() {
    // Retire la classe 'active' de tous les textareas
    document.querySelectorAll('.text-area').forEach(textAreaContainer => {
      textAreaContainer.classList.remove('active');
    });

    // Ajoute la classe 'active' à la div parent du textarea actuel
    this.closest('.text-area').classList.add('active');
    
    // Ajoute le focus au textarea actuel
    this.focus();
  });
});

//End KeyBoard

// Sélectionne les premiers textareas
const firstTextarea = document.querySelector('#textarea1');
const secondTextarea = document.querySelector('#textarea2');
const thirdTextarea = document.querySelector('#textarea3');

// Ajoute les écouteurs d'événements aux premiers textareas
firstTextarea.addEventListener('click', startTimer);
secondTextarea.addEventListener('click', startTimer);
thirdTextarea.addEventListener('click', startTimer);