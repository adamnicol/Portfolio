import SpinButton from "../components/button/SpinButton";
import { ContactSchema, Message } from "../schemas";
import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNetlifyContact } from "../api/queries/contact.queries";
import { zodResolver } from "@hookform/resolvers/zod";

function Contact() {
  const [botfield, setBotfield] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Message>({
    resolver: zodResolver(ContactSchema),
    reValidateMode: "onChange",
  });

  const contact = useNetlifyContact();

  useEffect(() => {
    if (contact.isSuccess) {
      reset();
    }
  }, [contact.isSuccess]);

  const onSubmit = handleSubmit((message) => {
    contact.mutate({ message, botfield });
  });

  return (
    <div className="contact-form">
      <h1>Contact</h1>

      <Form name="contact" method="post" className="mt-3" onSubmit={onSubmit}>
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
            type="text"
            placeholder="Your name"
            disabled={contact.isLoading}
            {...register("name")}
          />
          <Form.Text className="text-danger">{errors.name?.message}</Form.Text>
        </Form.Group>

        <Form.Group controlId="email" className="mb-3">
          <Form.Control
            type="email"
            placeholder="Your email address"
            disabled={contact.isLoading}
            {...register("email")}
          />
          <Form.Text className="text-danger">{errors.email?.message}</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            rows={6}
            placeholder="Message"
            disabled={contact.isLoading}
            {...register("message")}
          />
          <Form.Text className="text-danger">
            {errors.message?.message}
          </Form.Text>
        </Form.Group>

        <SpinButton text="Send" loading={contact.isLoading} />
      </Form>

      {contact.isSuccess && <p className="mt-4">Your message has been sent</p>}
      {contact.isError && <p className="mt-4">An unknown error occurred</p>}
    </div>
  );
}

export default Contact;
