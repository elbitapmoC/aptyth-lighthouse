import React from "react";
import { Meta, Story } from "@ladle/react";
import ThemeToggle from "@/components/ui/ThemeToggle";

const meta: Meta = {
  title: "Components/ThemeToggle",
  component: ThemeToggle,
};

export default meta;

export const Default: Story = () => <ThemeToggle />;
