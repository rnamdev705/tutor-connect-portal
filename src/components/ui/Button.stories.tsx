import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Icon } from "./Icon";
import { Button } from "./Button";

const meta = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Button",
    variant: "secondary",
    size: "md",
    shape: "default",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Secondary: Story = {
  args: { children: "Sign In", variant: "secondary", uppercase: true, fullWidth: true },
};

export const Primary: Story = {
  args: { children: "View Profile", variant: "primary", uppercase: true },
};

export const Outline: Story = {
  args: { children: "Invite", variant: "outline", uppercase: true },
};

export const OutlineNeutral: Story = {
  args: {
    children: (
      <>
        <Icon name="apps" className="text-primary" />
        Apple
      </>
    ),
    variant: "outline-neutral",
    shape: "xl",
    fullWidth: true,
  },
};

export const Pill: Story = {
  args: { children: "Post a Case", shape: "pill" },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        Sign In as Parent
        <Icon name="arrow_forward" className="text-sm" />
      </>
    ),
    variant: "secondary",
    shape: "xl",
    size: "lg",
    uppercase: true,
    fullWidth: true,
  },
};
