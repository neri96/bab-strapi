import { FormEvent, useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";

import { useSendCateringRequestMutation } from "../../../../api/services/catering";

import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import DatePicker from "../../../../components/DatePicker";
import Modal from "../../../../components/Modal";
import ErrorMessage from "../../../../components/ErrorMessage";

import useForm from "../../../../hooks/useForm";
import useServerError from "../../../../hooks/useServerError";

import "./CateringForm.scss";

const initialValue = {
  name: "",
  email: "",
  phone: "",
  guests: "",
  location: "",
  date: "",
  message: "",
};

const CateringForm = () => {
  const [sendCateringRequest, { data }] = useSendCateringRequestMutation();

  const [sent, setSent] = useState<boolean>(false);
  const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false);

  const {
    value,
    setValue,
    error,
    handleChange,
    handleFocus,
    handleSubmitWrap,
  } = useForm({
    initialValue,
    requiredFields: Object.keys(initialValue),
  });

  const { serverError, handleServerError } = useServerError();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    handleSubmitWrap(async () => {
      try {
        const data = await sendCateringRequest({ ...value });

        if (data) {
          setValue({ ...initialValue });

          setSent(true);
        }
      } catch (err) {
        handleServerError(err);
      }
    });
  };

  return (
    <>
      {sent && data ? (
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
              Your catering request has been sent. Our team will review it as
              soon as possible.
            </h4>
          </div>
        </Modal>
      ) : null}
      <AnimatePresence initial={false}>
        {datePickerOpen && (
          <DatePicker
            closeModal={() => setDatePickerOpen(false)}
            handleDate={(date) => setValue({ ...value, date })}
            settings={{
              monthsAvailable: 5,
              dayInterval: 7,
              timeFrom: 10,
              timeMax: 22,
            }}
          />
        )}
      </AnimatePresence>

      <div className="catering__form">
        {serverError && typeof serverError === "string" ? (
          <ErrorMessage error={serverError} />
        ) : null}
        <form onSubmit={handleSubmit}>
          <div className="catering__form__body">
            <div className="catering__form__body__inputs">
              <Input
                placeholder="Name"
                name="name"
                value={value.name}
                error={error.name}
                handleChange={handleChange}
                handleFocus={handleFocus}
              />
              <Input
                placeholder="Email"
                name="email"
                value={value.email}
                error={error.email}
                handleChange={handleChange}
                handleFocus={handleFocus}
              />
              <Input
                placeholder="Phone"
                name="phone"
                value={value.phone}
                error={error.phone}
                handleChange={handleChange}
                handleFocus={handleFocus}
              />
              <Input
                placeholder="Guests"
                name="guests"
                value={value.guests}
                error={error.guests}
                handleChange={handleChange}
                handleFocus={handleFocus}
              />
              <Input
                placeholder="Location"
                name="location"
                value={value.location}
                error={error.location}
                handleChange={handleChange}
                handleFocus={handleFocus}
              />
              <Input
                placeholder="Date"
                name="date"
                readOnly={true}
                value={value.date}
                error={error.date}
                handleChange={handleChange}
                handleClick={() => setDatePickerOpen((dp: boolean) => !dp)}
                handleFocus={handleFocus}
              />
            </div>

            <Input
              placeholder="Message"
              name="message"
              isTextarea={true}
              value={value.message}
              error={error.message}
              handleChange={handleChange}
              handleFocus={handleFocus}
            />
          </div>
          <Button isSubmit={true}>Submit</Button>
        </form>
      </div>
    </>
  );
};

export default CateringForm;
