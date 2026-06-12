import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Field } from "./Field";
import { Input } from "./Input";

const meta = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Field label="Full Name" htmlFor="name">
      <Input id="name" placeholder="Enter your full name" />
    </Field>
  ),
};

export const AuthWithIcon: Story = {
  render: () => (
    <Field label="Email Address" htmlFor="email" labelUppercase labelSize="sm">
      <Input
        id="email"
        variant="auth"
        leftIcon="mail"
        type="email"
        placeholder="sarah@example.com"
      />
    </Field>
  ),
};

export const Password: Story = {
  render: () => (
    <Field label="Password" htmlFor="password" labelUppercase labelSize="sm">
      <Input id="password" variant="auth" leftIcon="lock" type="password" placeholder="••••••••" />
    </Field>
  ),
};
