const screenshots = [
  { key: 'bookshelves', title: 'Your bookshelves', alt: 'The Currently reading bookshelf in Epilogue, with a search field and barcode scan button.' },
  { key: 'book-details', title: 'A closer look at a book', alt: 'Jade City by Fonda Lee, with its cover, description, and bookshelf options.' },
  { key: 'reading-goals', title: 'Your reading goals', alt: 'Yearly reading goals and the covers of completed books from 2022 through 2026.' },
  { key: 'reading-calendar', title: 'Your reading calendar', alt: 'Finished books grouped by month, with illustrated headers, completion dates, and page counts.' },
  { key: 'discover', title: 'Find your next favorite', alt: 'Epilogue’s Discover screen, showing colorful covers of books recently shared on Micro.blog.' },
  { key: 'web-goals', title: 'At home on Micro.blog', alt: 'The Micro.blog website displaying yearly reading goals and completed book covers.' }
];
const dialog = document.querySelector('.screenshot-dialog');
const dialogImage = dialog.querySelector('.dialog-image');
const dialogTitle = dialog.querySelector('#screenshot-title');
const dialogCount = dialog.querySelector('.dialog-count');
let currentScreenshot = 0;

function showScreenshot(index) {
  currentScreenshot = (index + screenshots.length) % screenshots.length;
  const shot = screenshots[currentScreenshot];
  dialogImage.src = `assets/${shot.key}.webp`;
  dialogImage.alt = shot.alt;
  dialogTitle.textContent = shot.title;
  dialogCount.textContent = `${currentScreenshot + 1} / ${screenshots.length}`;
}

for (const button of document.querySelectorAll('[data-shot]')) {
  button.addEventListener('click', () => {
    showScreenshot(screenshots.findIndex(shot => shot.key === button.dataset.shot));
    document.body.classList.add('dialog-open');
    dialog.showModal();
  });
}
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.querySelector('.dialog-prev').addEventListener('click', () => showScreenshot(currentScreenshot - 1));
dialog.querySelector('.dialog-next').addEventListener('click', () => showScreenshot(currentScreenshot + 1));
dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
dialog.addEventListener('click', event => {
  if (event.target === dialog) {
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  }
});
dialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault();
    showScreenshot(currentScreenshot + (event.key === 'ArrowRight' ? 1 : -1));
  }
});
