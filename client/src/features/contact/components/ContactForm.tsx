import { FormEvent, useState, useRef } from "react";

import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";

import useForm from "../../../hooks/useForm";

import { useLazySendMessageQuery } from "../../../api/services/products";

import "./ContactForm.scss";

const initialValue = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const ContactForm = () => {
  const [sent, setSent] = useState<boolean>(false);

  const [sendMessage] = useLazySendMessageQuery();

  const {
    value,
    setValue,
    error,
    setError,
    handleChange,
    handleFocus,
    handleSubmitWrap,
  } = useForm({
    initialValue,
    requiredFields: Object.keys(initialValue),
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    handleSubmitWrap(async () => {
      const data = await sendMessage({ ...value }).unwrap();

      if (data.success) {
        setValue({ ...initialValue });
        setError({ ...initialValue });
        setSent(true);
      }
    });
  };

  return (
    <>
      {sent ? (
        <Modal
          cancelButton={false}
          confirmBtnTitle="Ok"
          isForm={false}
          handleClick={() => setSent(false)}
        >
          <div
            style={{
              padding: "10px 10px 0 10px",
              textAlign: "center",
              color: "#fff",
              lineHeight: "23px",
            }}
          >
            <h4>
              Your message has been sent. We will get in touch with you soon.
            </h4>
          </div>
        </Modal>
      ) : null}
      <div className="contact__form">
        <div className="contact__form__header">
          <h1>Send a message</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Name"
            value={value.name}
            error={error.name}
            name="name"
            handleChange={handleChange}
            handleFocus={handleFocus}
          />
          <Input
            placeholder="Phone"
            value={value.phone}
            error={error.phone}
            name="phone"
            handleChange={handleChange}
            handleFocus={handleFocus}
          />
          <Input
            placeholder="Email"
            value={value.email}
            error={error.email}
            name="email"
            handleChange={handleChange}
            handleFocus={handleFocus}
          />
          <Input
            placeholder="Message"
            value={value.message}
            error={error.message}
            isTextarea={true}
            name="message"
            handleChange={handleChange}
            handleFocus={handleFocus}
          />
          <Button isSubmit={true}>Send</Button>
        </form>

        {/* <ReCAPTCHA
          ref={recapRef as React.RefObject<ReCAPTCHA>}
          size="invisible"
          sitekey={recapPublic}
        /> */}
      </div>
    </>
  );
};

export default ContactForm;
