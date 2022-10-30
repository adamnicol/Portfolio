import SpinButton from "../components/button/SpinButton";
import { Form } from "react-bootstrap";
import { IMessage } from "../api/interfaces";
import { useNetlifyContact } from "../api/queries/contact.queries";
import { useEffect, useState } from "react";

const MessageDefaults: IMessage = {
  name: "",
  email: "",
  message: "",
};

function Contact() {
  const [message, setMessage] = useState<IMessage>(MessageDefaults);
  const [botfield, setBotfield] = useState<string>("");

  function handleFieldChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMessage((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const contact = useNetlifyContact();

  useEffect(() => setMessage(MessageDefaults), [contact.isSuccess]);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    contact.mutate({ message, botfield });
  }

  return (
    <div className="contact-form">
      <h2>Contact</h2>

      <Form name="contact" method="post" className="mt-3" onSubmit={submit}>
        <Form.Group className="d-none mb-3">
          <Form.Control
            name="bot-field"
            value={botfield}
            onChange={(e) => setBotfield(e.target.value)}
            placeholder="Don't fill this out"
          />
        </Form.Group>

        <Form.Group controlId="name" className="mb-3">
          <Form.Control
            name="name"
            type="text"
            required
            placeholder="Your name"
            value={message.name}
            onChange={handleFieldChange}
            disabled={contact.isLoading}
          />
        </Form.Group>

        <Form.Group controlId="email" className="mb-3">
          <Form.Control
            name="email"
            type="email"
            required
            placeholder="Your email address"
            value={message.email}
            onChange={handleFieldChange}
            disabled={contact.isLoading}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid email address
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            name="message"
            as="textarea"
            required
            rows={6}
            placeholder="Message"
            value={message.message}
            onChange={handleFieldChange}
            disabled={contact.isLoading}
          />
        </Form.Group>

        <SpinButton text="Send" loading={contact.isLoading} />
      </Form>

      <div data-netlify-recaptcha="true" className="mt-4" />

      {contact.isSuccess && <p className="mt-4">Your message has been sent</p>}
      {contact.isError && <p className="mt-4">An unknown error occurred</p>}
    </div>
  );
}

export default Contact;
