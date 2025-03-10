import React from "react";
import { Meta, Story } from "@ladle/react";
import PWAInstallPrompt from "@/components/ui/PWAInstallPrompt";

const meta: Meta = {
  title: "Components/PWAInstallPrompt",
  component: PWAInstallPrompt,
};

export default meta;

export const Default: Story = () => <PWAInstallPrompt />;
