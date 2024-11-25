import ContactComponent from '@/components/Contact/contact';
import React from 'react';

interface ContactProps {
}

const Contact = ({}: ContactProps): JSX.Element => {
  return (
    <div>
        <ContactComponent />
    </div>
  );
}

export default Contact;