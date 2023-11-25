import { clearStorage } from '../storage/clearStorage';

document.querySelector('button')?.addEventListener('click', () => {
  clearStorage();
});
