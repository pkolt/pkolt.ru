import cn from 'classnames';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { Navigation } from '../Navigation';
import { SocialNav } from '../SocialNav';
import styles from './index.module.css';

export const MenuButton = (): JSX.Element => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [opened, setOpened] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const handleOpen = useCallback(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
      setOpened(true);
      document.body.style.overflow = 'hidden';
    }
  }, []);

  const handleClose = useCallback(() => {
    if (dialogRef.current) {
      dialogRef.current.close();
      setOpened(false);
      document.body.style.overflow = '';
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <i className={cn('bi-list', styles.icon, opened && styles.opened)} onClick={handleOpen} role="button" />
      {isMounted &&
        createPortal(
          <dialog className={styles.dialog} ref={dialogRef}>
            <i className={cn('bi-x', styles.close)} role="button" onClick={handleClose} tabIndex={-1} />
            <Navigation />
            <SocialNav />
          </dialog>,
          document.body,
        )}
    </>
  );
};
