import { UPDATE_PWA_DIALOG_ID, ACCEPT_UPDATE_PWA_TYPE } from './constants';

export const showUpdatePwaDialog = () => {
  const dialog = document.getElementById(UPDATE_PWA_DIALOG_ID) as HTMLDialogElement | null;
  if (dialog && !dialog.open) {
    dialog.showModal();
  }
};

export const sendAcceptUpdatePwa = () => {
  window.postMessage({ type: ACCEPT_UPDATE_PWA_TYPE }, location.origin);
};

export const subscribeAcceptUpdatePwa = (callback: () => void) => {
  window.addEventListener('message', (event) => {
    if (event.origin === location.origin && event.data.type === ACCEPT_UPDATE_PWA_TYPE) {
      callback();
    }
  });
};
