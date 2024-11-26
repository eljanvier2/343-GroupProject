import ContactComponent from '@/components/Contact/contact';
import React from 'react';

interface ContactProps {
    isAuthenticated: boolean;
}

const Contact = ({
    isAuthenticated
}: ContactProps): JSX.Element => {
  return (
    <div>
        <ContactComponent isAuthenticated={isAuthenticated} />
    </div>
  );
}

export default Contact;