import { Button, Form } from "react-bootstrap";
import { IMessage } from "../api/interfaces";
import { useState } from "react";

const MessageDefaults: IMessage = {
  name: "",
  email: "",
  message: "",
};

function Contact() {
  const [message, setMessage] = useState<IMessage>(MessageDefaults);

  function handleFieldChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMessage((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <div className="contact-form">
      <h2>Contact</h2>

      <Form name="contact" method="post" className="mt-3">
        {/* Required for Netlify forms */}
        <input type="hidden" name="form-name" value="contact" />

        <Form.Group controlId="name" className="mb-3">
          <Form.Control
            name="name"
            type="text"
            required
            placeholder="Your name"
            value={message.name}
            onChange={handleFieldChange}
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
          />
        </Form.Group>

        <Button type="submit">Send</Button>
      </Form>
    </div>
  );
}

export default Contact;
