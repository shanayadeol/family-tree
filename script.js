// 1. Define your Family Tree Data
const familyData = {
  name: "Arthur Pendelton",
  dates: "1930 - 2012",
  bio: "Patriarch of the family. Loved gardening, carpentry, and tellling long stories.",
  children: [
    {
      name: "Eleanor Vance",
      dates: "1958 - Present",
      bio: "Retired architect who designed several civic buildings downtown.",
      children: [
        {
          name: "Maya Vance",
          dates: "1988 - Present",
          bio: "Software developer based in Seattle."
        },
        {
          name: "Leo Vance",
          dates: "1992 - Present",
          bio: "Graphic designer and avid rock climber."
        }
      ]
    },
    {
      name: "Julian Pendelton",
      dates: "1962 - Present",
      bio: "High school history teacher and classical guitar musician.",
      children: [
        {
          name: "Clara Pendelton",
          dates: "1995 - Present",
          bio: "Biomedical researcher currently pursuing her Ph.D."
        }
      ]
    }
  ]
};

// 2. Recursive function to render tree
function buildTree(node) {
  const ul = document.createElement('ul');
  const li = document.createElement('li');

  const card = document.createElement('div');
  card.className = 'person-card';
  card.innerHTML = `
    <div class="name">${node.name}</div>
    <div class="dates">${node.dates}</div>
  `;

  card.addEventListener('click', () => openModal(node));
  li.appendChild(card);

  if (node.children && node.children.length > 0) {
    const childrenUl = document.createElement('ul');
    node.children.forEach(child => {
      const childLi = buildTree(child).querySelector('li');
      childrenUl.appendChild(childLi);
    });
    li.appendChild(childrenUl);
  }

  ul.appendChild(li);
  return ul;
}

// 3. Modal Functionality
const modal = document.getElementById('details-modal');
const closeBtn = document.getElementById('close-btn');

function openModal(person) {
  document.getElementById('modal-name').textContent = person.name;
  document.getElementById('modal-dates').textContent = person.dates;
  document.getElementById('modal-bio').textContent = person.bio || "No biography provided.";
  modal.classList.remove('hidden');
}

closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
window.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.add('hidden');
});

// 4. Initialize
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('tree-container');
  container.appendChild(buildTree(familyData));
});