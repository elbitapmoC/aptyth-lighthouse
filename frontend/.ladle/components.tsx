import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table } from "@/components/ui/table";
import { Loading } from "@/components/ui/loading";
import { ErrorBoundary } from "@/components/ui/error-boundary";

export const components = {
  Button: {
    component: Button,
    description: "A versatile button component with multiple variants and sizes.",
    props: {
      variant: {
        type: "string",
        description: "The style variant of the button.",
        options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
      },
      size: {
        type: "string",
        description: "The size of the button.",
        options: ["default", "sm", "lg", "icon"],
      },
      asChild: {
        type: "boolean",
        description: "Whether to render the button as a child component.",
      },
    },
  },
  Input: {
    component: Input,
    description: "A styled input field for forms.",
    props: {
      label: {
        type: "string",
        description: "The label for the input field.",
      },
      error: {
        type: "string",
        description: "Error message to display for the input field.",
      },
    },
  },
  Select: {
    component: Select,
    description: "A styled select dropdown for forms.",
    props: {
      label: {
        type: "string",
        description: "The label for the select field.",
      },
      error: {
        type: "string",
        description: "Error message to display for the select field.",
      },
      options: {
        type: "array",
        description: "Array of options for the select dropdown.",
      },
    },
  },
  Dialog: {
    component: Dialog,
    description: "A modal dialog component using Radix UI primitives.",
    props: {
      open: {
        type: "boolean",
        description: "Whether the dialog is open.",
      },
      onOpenChange: {
        type: "function",
        description: "Callback when the dialog open state changes.",
      },
    },
    children: {
      DialogTrigger: {
        component: DialogTrigger,
        description: "The trigger button for opening the dialog.",
      },
      DialogContent: {
        component: DialogContent,
        description: "The content area of the dialog.",
        children: {
          DialogHeader: {
            component: DialogHeader,
            description: "The header section of the dialog.",
          },
          DialogFooter: {
            component: DialogFooter,
            description: "The footer section of the dialog.",
          },
        },
      },
    },
  },
  Tabs: {
    component: Tabs,
    description: "A tabbed navigation component using Radix UI primitives.",
    props: {
      defaultValue: {
        type: "string",
        description: "The default active tab.",
      },
    },
    children: {
      TabsList: {
        component: TabsList,
        description: "The list of tab triggers.",
      },
      TabsTrigger: {
        component: TabsTrigger,
        description: "A trigger for switching tabs.",
      },
      TabsContent: {
        component: TabsContent,
        description: "The content area for a specific tab.",
      },
    },
  },
  Table: {
    component: Table,
    description: "A table component for displaying data.",
    props: {
      headers: {
        type: "array",
        description: "Array of column headers.",
      },
      data: {
        type: "array",
        description: "Array of row data objects.",
      },
    },
  },
  Loading: {
    component: Loading,
    description: "A loading spinner with an optional message.",
    props: {
      message: {
        type: "string",
        description: "The loading message to display.",
      },
    },
  },
  ErrorBoundary: {
    component: ErrorBoundary,
    description: "A component for catching and displaying UI errors.",
    props: {
      fallback: {
        type: "node",
        description: "The fallback UI to display when an error occurs.",
      },
    },
  },
};
