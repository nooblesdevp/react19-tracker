import React from 'react'

import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';

import './SocialLink.scss'

const SocialLink = () => {
    return (
        <div className="socialLink">
            <a href="https://www.instagram.com/nuzulzen/" 
            target="_blank" rel="noopener noreferrer">
          <InstagramIcon className="socialLink__icon"/>
            </a>
            <a href="https://web.facebook.com/nuzulzen/" target="_blank" rel="noopener noreferrer">
              <FacebookIcon className="socialLink__icon"/>
            </a>
            <a href="https://www.linkedin.com/in/nuzul-zen-alfian-828297184/" target="_blank" rel="noopener noreferrer">
               <LinkedInIcon className="socialLink__icon"/>
            </a>
            <a href=" https://api.whatsapp.com/send?phone=6281476637363&text=Hallo%20Nuzul%20Saya%20tertarik%20berkerja%20sama%20dengan%20anda" target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="socialLink__icon"/>
            </a>
        </div>
    )
}

export default SocialLink
