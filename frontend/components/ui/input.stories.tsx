import React from "react";
import { Input } from "./input";

export default {
  title: "UI/Input",
  component: Input,
  argTypes: {
    label: {
      control: "text",
      description: "The label for the input field.",
    },
    error: {
      control: "text",
      description: "Error message to display for the input field.",
    },
    type: {
      control: { type: "select" },
      options: ["text", "email", "password", "number"],
      description: "The type of the input field.",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input field is disabled.",
    },
  },
};

const Template = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Default Input",
  type: "text",
  error: "",
  disabled: false,
};

export const WithError = Template.bind({});
WithError.args = {
  label: "Input with Error",
  type: "text",
  error: "This field is required.",
  disabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Disabled Input",
  type: "text",
  error: "",
  disabled: true,
};

export const Email = Template.bind({});
Email.args = {
  label: "Email Input",
  type: "email",
  error: "",
  disabled: false,
};

export const Password = Template.bind({});
Password.args = {
  label: "Password Input",
  type: "password",
  error: "",
  disabled: false,
};
