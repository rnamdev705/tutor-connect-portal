import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { SegmentedControl } from "./SegmentedControl";

const roleOptions = [
  { value: "parent" as const, label: "Parent" },
  { value: "tutor" as const, label: "Tutor" },
];

function PillDemo() {
  const [value, setValue] = useState<"parent" | "tutor">("parent");
  return <SegmentedControl options={roleOptions} value={value} onChange={setValue} shape="pill" />;
}

function RoundedDemo() {
  const [value, setValue] = useState<"parent" | "tutor">("parent");
  return (
    <SegmentedControl
      options={roleOptions}
      value={value}
      onChange={setValue}
      shape="rounded"
      activeVariant="secondary-container"
    />
  );
}

const meta = {
  title: "UI/SegmentedControl",
  component: SegmentedControl,
  tags: ["autodocs"],
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pill: Story = { render: () => <PillDemo /> };
export const Rounded: Story = { render: () => <RoundedDemo /> };
