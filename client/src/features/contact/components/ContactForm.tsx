import { FormEvent, useEffect, useState } from "react";

import Input from "../../../components/Input";
import Button from "../../../components/Button";
import ConfirmPopup from "../../../components/ConfirmPopup";

import useForm from "../../../hooks/useForm";
import useRequest from "../../../hooks/useRequest";

import "./ContactForm.scss";

import { ReqMethod } from "../../../ts/types";

const initialValue = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const ContactForm = () => {
  const [sent, setSent] = useState<boolean>(false);

  const { data: response, error: serverError, sendRequest } = useRequest();

  const { value, setValue, error, handleChange, handleSubmitWrap } = useForm({
    initialValue,
    requiredFields: Object.keys(initialValue),
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    handleSubmitWrap(async () => {
      await sendRequest({
        method: ReqMethod.Post,
        url: "contact/send",
        body: value,
      });
    });
  };

  useEffect(() => {
    if (response?.data) {
      setValue({ ...initialValue });
      setSent(true);
    }
  }, [response, setValue]);

  return (
    <>
      {sent ? (
        <ConfirmPopup
          header={response?.data}
          handleMethod={() => setSent(false)}
          confirmBtnTitle="Ok"
        />
      ) : null}
      <div className="contact__form">
        <div className="contact__form__header">
          <h1>Send a message</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Name"
            value={value.name}
            error={serverError?.name || error.name}
            name="name"
            handleChange={handleChange}
          />
          <Input
            placeholder="Phone"
            value={value.phone}
            error={serverError?.phone || error.phone}
            name="phone"
            handleChange={handleChange}
          />
          <Input
            placeholder="Email"
            value={value.email}
            error={serverError?.email || error.email}
            name="email"
            handleChange={handleChange}
          />
          <Input
            placeholder="Message"
            value={value.message}
            error={serverError?.message || error.message}
            isTextarea={true}
            name="message"
            handleChange={handleChange}
          />
          <Button isSubmit={true}>Send</Button>
        </form>
      </div>
    </>
  );
};

export default ContactForm;
