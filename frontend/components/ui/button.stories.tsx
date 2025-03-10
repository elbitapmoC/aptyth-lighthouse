import React from "react";
import { Button } from "./button";

export default {
  title: "UI/Button",
  component: Button,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    size: {
      control: { type: "select" },
      options: ["default", "sm", "lg", "icon"],
    },
    disabled: { control: "boolean" },
    asChild: { control: "boolean" },
  },
};

const Template = (args) => <Button {...args}>Button</Button>;

export const Default = Template.bind({});
Default.args = {
  variant: "default",
  size: "default",
  disabled: false,
};

export const Destructive = Template.bind({});
Destructive.args = {
  variant: "destructive",
  size: "default",
  disabled: false,
};

export const Outline = Template.bind({});
Outline.args = {
  variant: "outline",
  size: "default",
  disabled: false,
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "secondary",
  size: "default",
  disabled: false,
};

export const Ghost = Template.bind({});
Ghost.args = {
  variant: "ghost",
  size: "default",
  disabled: false,
};

export const Link = Template.bind({});
Link.args = {
  variant: "link",
  size: "default",
  disabled: false,
};

export const Small = Template.bind({});
Small.args = {
  variant: "default",
  size: "sm",
  disabled: false,
};

export const Large = Template.bind({});
Large.args = {
  variant: "default",
  size: "lg",
  disabled: false,
};

export const Icon = Template.bind({});
Icon.args = {
  variant: "default",
  size: "icon",
  disabled: false,
};
