import { useCallback, useState } from 'react';
import cn from 'classnames';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import styles from './index.module.css';
import { SocialNav } from '../SocialNav';
import { Navigation } from '../Navigation';

const DELAY_MS = 250;

export const MenuButton = (): JSX.Element => {
  const [opened, setOpened] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpen = useCallback(() => {
    setOpened(true);
    setTimeout(() => setOpenDialog(true), DELAY_MS);
  }, []);

  const handleClose = useCallback(() => {
    setOpenDialog(false);
    setTimeout(() => setOpened(false), DELAY_MS);
  }, []);

  //! Replace Modal to Drawer (https://mui.com/joy-ui/react-drawer/)
  return (
    <>
      <div className={cn(styles.container, opened && styles.opened)} onClick={handleOpen} role="button">
        <i className={cn('bi-list', styles.icon)} />
      </div>
      <Modal open={openDialog} onClose={handleClose}>
        <ModalDialog sx={{ width: '90%', height: '100%' }}>
          <div className={styles.modal}>
            <ModalClose />
            <Navigation />
            <SocialNav />
          </div>
        </ModalDialog>
      </Modal>
    </>
  );
};
