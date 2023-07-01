import ContactOptions from "./ContactOptions";
import ContactForm from "./ContactForm";
import ContactMap from "./ContactMap";

import "./ContactContainer.scss";

export const ContactContainer = () => {
  return (
    <div className="contact">
      <div className="contact__info">
        <ContactForm />
        <ContactOptions />
      </div>
      <ContactMap />
    </div>
  );
};
