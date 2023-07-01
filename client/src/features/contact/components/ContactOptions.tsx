import "./ContactOptions.scss";

const ContactOptions = () => {
  return (
    <div className="contact__options">
      <ul>
        <li>
          <div className="contact__options__title">
            <h1>Address</h1>
          </div>
          <div className="contact__options__value">
            <h4>1475 Newell Avenue Walnut Creek, CA, 94521</h4>
          </div>
        </li>
        <li>
          <div className="contact__options__title">
            <h1>Phone</h1>
          </div>
          <div className="contact__options__value">
            <h4>(925) 210-0779</h4>
          </div>
        </li>
        <li>
          <div className="contact__options__title">
            <h1>Mail</h1>
          </div>
          <div className="contact__options__value">
            <h4>info@babushkamarket.com</h4>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ContactOptions;
