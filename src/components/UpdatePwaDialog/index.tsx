import { useCallback, useRef, useState } from 'react';
import { Button } from '@mui/joy';
import styles from './index.module.css';
import { UPDATE_PWA_DIALOG_ID } from './constants';
import { sendAcceptUpdatePwa } from './utils';
import { Typography } from '../Typography';
import { MUIWrapper } from '../MUIWrapper';

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
      <MUIWrapper>
        <Typography className={styles.text}>
          <h2>Обновление сайта</h2>
          <p>Обновить сайт и перезагрузить страницу?</p>
        </Typography>
        <div className={styles.buttons}>
          <Button onClick={handleClickYes} loading={disabled} loadingPosition="start">
            Обновить
          </Button>
          <Button color="neutral" onClick={handleClickNo} disabled={disabled}>
            Отмена
          </Button>
        </div>
      </MUIWrapper>
    </dialog>
  );
};
