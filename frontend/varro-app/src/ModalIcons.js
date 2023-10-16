import React, { useState } from 'react';
import { Modal, Box, Typography } from '@mui/material';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import GroupsIcon from '@mui/icons-material/Groups';

function HelpContent() {
  return (
    <>
      <Typography variant="h6" component="h2">
        <strong>Help</strong>
      </Typography>
      <Typography variant="body1">
        1. Insert your prompt
        <br />
        2. Review your summary
        <br />
        3. Explore your sources
      </Typography>
    </>
  );
}

function AboutUsContent() {
  return (
    <>
      <Typography variant="h6" component="h2">
        <strong>About Us</strong>
      </Typography>
      <Typography variant="body1">
        Our system analyzes the given prompt and uses generative AI to form research-oriented data. With the retrieved information from the given input, we provide a summary of the query, 10 relevant sources, and an analysis of the input. Varro.ai helps academics to find reliable data with ease.
      </Typography>
    </>
  );
}

function ModalIcons() {
  const [openHelp, setOpenHelp] = useState(false);
  const [openAboutUs, setOpenAboutUs] = useState(false);

  const handleOpen = (setOpen) => {
    setOpen(true);
  };

  const handleClose = (setOpen) => {
    setOpen(false);
  };

  return (
    <div
      style={{
        position: 'fixed',
        right: 10,
        top: 10,
        padding: '10px',
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
        zIndex: 999
      }}
    >
      <HelpCenterIcon onClick={() => handleOpen(setOpenHelp)} fontSize='large' />
      <Modal
        open={openHelp}
        onClose={() => handleClose(setOpenHelp)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
         <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: '#B1B9FF',
            boxShadow: 24,
            p: 4,
            borderRadius: 10,
          }}
         >
           <HelpContent />
         </Box>
      </Modal>

      <GroupsIcon onClick={() => handleOpen(setOpenAboutUs)} fontSize='large' />
      <Modal
        open={openAboutUs}
        onClose={() => handleClose(setOpenAboutUs)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
         <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: '#B1B9FF',
            boxShadow: 24,
            p: 4,
            borderRadius: 10,
          }}
         >
           <AboutUsContent />
         </Box>
      </Modal>
    </div>
  );
}

export default ModalIcons;
