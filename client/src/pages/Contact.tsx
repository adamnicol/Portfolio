import SpinButton from "../components/button/SpinButton";
import { Form } from "react-bootstrap";
import { IMessage } from "../api/interfaces";
import { useContact } from "../api/queries/contact.queries";
import { useEffect, useState } from "react";

const MessageDefaults: IMessage = {
  name: "",
  email: "",
  content: "",
};

function Contact() {
  const [message, setMessage] = useState<IMessage>(MessageDefaults);

  const contact = useContact();

  useEffect(() => setMessage(MessageDefaults), [contact.isSuccess]);

  function handleFieldChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMessage((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    contact.mutate(message);
  }

  return (
    <div className="contact-form">
      <h2>Contact</h2>

      <Form onSubmit={handleSubmit} className="mt-3">
        <Form.Group controlId="email" className="mb-3">
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
            name="content"
            as="textarea"
            required
            rows={6}
            placeholder="Message"
            value={message.content}
            onChange={handleFieldChange}
            disabled={contact.isLoading}
          />
        </Form.Group>

        <SpinButton text="Send" loading={contact.isLoading} />
      </Form>

      {contact.isSuccess && <p className="mt-4">Your message has been sent</p>}
      {contact.isError && <p className="mt-4">An unknown error occurred</p>}
    </div>
  );
}

export default Contact;
