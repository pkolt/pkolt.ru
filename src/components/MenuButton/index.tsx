import { Modal, ModalClose, ModalDialog } from '@mui/joy';
import cn from 'classnames';
import { useCallback, useState } from 'react';

import { MUIWrapper } from '../MUIWrapper';
import { Navigation } from '../Navigation';
import { SocialNav } from '../SocialNav';
import styles from './index.module.css';

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
      <i className={cn('bi-list', styles.icon, opened && styles.opened)} onClick={handleOpen} role="button" />
      <MUIWrapper>
        <Modal onClose={handleClose} open={openDialog}>
          <ModalDialog sx={{ height: '100%', width: '90%' }}>
            <div className={styles.modal}>
              <ModalClose />
              <Navigation />
              <SocialNav />
            </div>
          </ModalDialog>
        </Modal>
      </MUIWrapper>
    </>
  );
};
