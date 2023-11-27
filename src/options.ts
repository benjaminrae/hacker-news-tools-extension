import { clearStorage } from './storage/clearStorage';

document.querySelector('button')?.addEventListener('click', () => {
  console.log('Clearing storage');

  clearStorage();
  // resetPosition
});
