import React from "react";
import { Meta, Story } from "@ladle/react";
import { Button } from "@/components/ui/button";

const meta: Meta = {
  title: "Components/Button",
  component: Button,
};

export default meta;

export const Default: Story = () => (
  <Button variant="default" size="default">
    Default Button
  </Button>
);

export const Destructive: Story = () => (
  <Button variant="destructive" size="default">
    Destructive Button
  </Button>
);

export const Outline: Story = () => (
  <Button variant="outline" size="default">
    Outline Button
  </Button>
);

export const Secondary: Story = () => (
  <Button variant="secondary" size="default">
    Secondary Button
  </Button>
);

export const Ghost: Story = () => (
  <Button variant="ghost" size="default">
    Ghost Button
  </Button>
);

export const Link: Story = () => (
  <Button variant="link" size="default">
    Link Button
  </Button>
);

export const Small: Story = () => (
  <Button variant="default" size="sm">
    Small Button
  </Button>
);

export const Large: Story = () => (
  <Button variant="default" size="lg">
    Large Button
  </Button>
);

export const Icon: Story = () => (
  <Button variant="default" size="icon">
    <span role="img" aria-label="icon">
      🌟
    </span>
  </Button>
);
