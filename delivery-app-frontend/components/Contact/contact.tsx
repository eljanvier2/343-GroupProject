import React from "react";
import InputWithTitle from "../Global/InputWithTitle";
import SelectWithTitle from "../Global/SelectWithTitle";
import RoundButton from "../Global/RoundButton";
import { useRouter } from "next/router";

interface ContactComponentProps {
  isAuthenticated: boolean;
}

const ContactComponent = ({
  isAuthenticated,
}: ContactComponentProps): JSX.Element => {
  const router = useRouter();
  const [success, setSuccess] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
    subject: "",
    deliveryId: "",
  });

  return (
    <div className="h-full">
      {!success && (
        <div className="flex flex-col items-center mt-16 py-16 space-y-8 bg-white shadow-lg rounded-3xl">
          <div className="text-header2 pb-2">Get in touch 👋</div>
          <div className="flex space-x-16 w-2/3">
            <div className="flex flex-col w-1/2 space-y-8">
              <InputWithTitle
                title="Name"
                placeholder="Your name"
                onChange={(e) => {
                  setFormData({ ...formData, name: e });
                }}
              />
              <SelectWithTitle
                title="Subject of your message"
                onChange={() => {}}
                placeholder="Select a subject"
                options={["General", "Delivery", "Other"]}
              />
              <InputWithTitle
                title="Message"
                placeholder="Your message"
                type="area"
                onChange={(e) => {
                  setFormData({ ...formData, message: e });
                }}
              />
            </div>
            <div className="flex flex-col w-1/2 space-y-8">
              <InputWithTitle
                title="Email"
                placeholder="Your email"
                type="email"
                onChange={(e) => {
                  setFormData({ ...formData, email: e });
                }}
              />
              <InputWithTitle
                title="Delivery ID"
                placeholder="Your delivery ID"
                onChange={(e) => {
                  setFormData({ ...formData, deliveryId: e });
                }}
              />
            </div>
          </div>
          <div className="pt-8">
            <RoundButton
              text="Send"
              onClick={() => {
                if (
                  formData.name === "" ||
                  formData.email === "" ||
                  formData.message === ""
                ) {
                  alert("Please fill all fields");
                  return;
                }
                setSuccess(true);
              }}
            />
          </div>
        </div>
      )}
      {success && (
        <div className="h-full w-full flex-col justify-center items-center text-header2 text-center">
          <div className="">{"Your message has been sent successfully"}</div>
          <RoundButton
            text={isAuthenticated ? "Go back to dashboard" : "Go back to Home page"}
            onClick={() => {
              void router.push(isAuthenticated ? "/dashboard" : "/");
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ContactComponent;
