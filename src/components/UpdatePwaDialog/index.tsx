

import { useCallback, useRef, useState } from 'react';
import styles from './index.module.css';
import { UPDATE_PWA_DIALOG_ID } from './constants';
import { sendAcceptUpdatePwa } from './utils';

export const UpdatePwaDialog = () => {
  const [disabled, setDisabled] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleClickYes = useCallback(() => {
    setDisabled(true); // Waited process
    sendAcceptUpdatePwa();
  }, []);

  const handleClickNo = useCallback(() => {
    const dialogElem = dialogRef.current;
    if (dialogElem) {
      dialogElem.close();
    }
  }, []);

  return (
    <dialog className={styles.container} id={UPDATE_PWA_DIALOG_ID} ref={dialogRef}>
      <p>Update your PWA?</p>
      <div className={styles.buttons}>
        <button data-primary onClick={handleClickYes} disabled={disabled}>
          Yes
        </button>
        <button onClick={handleClickNo} disabled={disabled}>
          No
        </button>
      </div>
    </dialog>
  );
};
