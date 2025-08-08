import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Typography from '@mui/material/Typography';
import './style.css';

const Footer: React.FC = () => (
  <div className="footer-container">
    <div className="icons">
      <FacebookIcon className="icon" />
      <TwitterIcon className="icon" />
      <InstagramIcon className="icon" />
      <WhatsAppIcon className="icon" />
    </div>
    <div className="copy_right">
      <Typography variant="body1" gutterBottom className="paragraph-description">
        Copyright © 2025 Techbids.com. All rights reserved.
      </Typography>
    </div>
  </div>
);
export default Footer;
