import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "./Badge";

const meta = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = { args: { children: "Open", variant: "open" } };
export const Matched: Story = { args: { children: "Matched", variant: "matched" } };
export const Verified: Story = {
  args: { children: "Verified", variant: "verified", icon: "verified", filledIcon: true },
};
export const Secure: Story = {
  args: { children: "SECURE CASE", variant: "secure", icon: "lock", filledIcon: true },
};
