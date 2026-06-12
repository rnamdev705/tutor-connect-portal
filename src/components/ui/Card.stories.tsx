import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Card } from "./Card";
import { Badge } from "./Badge";

const meta = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Glass: Story = {
  args: {
    variant: "glass",
    children: (
      <>
        <Badge variant="open">Open</Badge>
        <h3 className="text-headline-sm mt-3">Weekly P5 Math Tuition</h3>
      </>
    ),
  },
};

export const WithAccent: Story = {
  render: () => (
    <Card variant="glass" accent="bg-on-surface-variant group-hover:bg-secondary" padding="lg">
      <Badge variant="open">Open</Badge>
      <h3 className="text-headline-sm mt-3">Weekly P5 Math Tuition</h3>
      <p className="text-body-sm text-on-surface-variant mt-2">Jurong East, SG</p>
    </Card>
  ),
};
