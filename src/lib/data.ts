export type Tutor = {
  id: string;
  name: string;
  title: string;
  rate: string;
  rating: number;
  reviews: number;
  experience: string;
  subjects: string[];
  image: string;
  verified: boolean;
  location?: string;
  degree?: string;
  bio?: string;
};

export type CaseItem = {
  id: string;
  title: string;
  status: "Open" | "Matched" | "Closed";
  caseId: string;
  level: string;
  subject: string;
  location: string;
  rate: string;
  accent: string;
  closed?: boolean;
};

export const tutors: Tutor[] = [
  {
    id: "sarah-jenkins",
    name: "Dr. Sarah Jenkins",
    title: "PhD in Pure Mathematics, Oxford",
    rate: "$65/hr",
    rating: 4.9,
    reviews: 124,
    experience: "8 years experience",
    subjects: ["Further Maths", "AP Calculus", "Linear Algebra"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD2nlLNe5n8NKJuabpFdMwjvOKLy8hPDohQHqIhs0ySUdR5hCq3pA4ZKgFjQoA5G7zw9iLBYNU4FPlOfXLjlo2d7wvwLEYVJcCxhq5fqUUqXGfTT32L2G3UW5ULFiUyCTA7vrY5fJFyVvETBhJZuhky1oAjQ3WQI3NulTsS1DgOypFksToxxP4Ipf5wKLb29v5x-NIfG1nsER0yQfJITvbq8H_7wJwTo0t3GkvGdDOareaQqXW1WFdiWAMs546seUkZBzFEKXy4z7g",
    verified: true,
    location: "London, UK (Remote Available)",
    degree: "PHD IN MATHEMATICS",
    bio: "With a doctorate from Imperial College London, I have spent the last decade bridging the gap between theoretical mathematics and practical student achievement.",
  },
  {
    id: "marcus-thorne",
    name: "Marcus Thorne",
    title: "BSc Physics, Imperial College London",
    rate: "$50/hr",
    rating: 4.8,
    reviews: 89,
    experience: "5 years experience",
    subjects: ["Quantum Physics", "GCSE Science"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCmW109BgLrcK16hmt37Wdj52MU2bWLfUeWECt76yqBwPBS6qcxZ-lhnVtlvbjvd6bI4WjFdZ3ZCKEENx2WZlkbrYgyt7A6ZTDE0agwCPCzcSLvEc3dTiQJ_CNd1CYVu5XuJqVbziyBvvTwp5Gzu79sTcEleJd4uj9umgpidqsMSGflQaJ4m08D4LOZuM4nfK-xMqNPjjr3wOWMSwMFkjGxp5W_vuRTMxhqqzoNfRb3WxwBSk5FAZDi1G7n7327PpF2B2ivQQ62tRY",
    verified: true,
  },
  {
    id: "elena-rodriguez",
    name: "Elena Rodriguez",
    title: "MA Applied Linguistics, Stanford",
    rate: "$45/hr",
    rating: 5.0,
    reviews: 56,
    experience: "6 years experience",
    subjects: ["Spanish", "ESL", "SAT English"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCwgzTQLr39FzTj4-gyOFJNmTPCWEnDJFjd_EMuZ5PExFHmkV4vVboDKIgW53g9ZFIjrUksIoSGIT3YJUfGRQn9mIKf_QTMIs1c6KIOMLFkAkcGQJx1XM4vUQLBqKfExOh1BZiXBKPiIRGLaS8KtrT4WhAme7spi0TG_Xy7B8GG5d3Cpntz4z5MiGUHjgvMWGrLe0ezDhHfXKR8YF-Nfxk4_g4XrseaF6C6zivVlkvsOOlmqos9AqVBDY3aQP9YDLwbBg6XARCim28",
    verified: true,
  },
  {
    id: "simon-wu",
    name: "Simon Wu",
    title: "MSc Computer Science, NUS",
    rate: "$55/hr",
    rating: 4.7,
    reviews: 42,
    experience: "4 years experience",
    subjects: ["Python", "Data Science"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCBWg31csJGDYiAYr8hbKzkqSdVuNtMh3gs7qUU8wL51pvA0pULfonmDVv1t_MAkEax23Z2xXZDQBZF6aSGLaLKOWUgz3FJ0a_SWjhvqXILmhGLSACbAeY6OFNLQ3QS_WkZFP32gTiL_SwdRobzj-zPyeHlwxgSIdUCz72S0VHzrj7mUdk9oFttpJOsdi5DgJTOk5ixKcjqofhZl1J8PdVlTngp7LHHae5WBfDoeCi96w-_gs8ZSGpQ2JQaDpoB4k2KzWnioqE4TtY",
    verified: false,
  },
];

export const cases: CaseItem[] = [
  {
    id: "49281",
    title: "Weekly P5 Math Tuition",
    status: "Open",
    caseId: "#49281",
    level: "Primary 5",
    subject: "Mathematics",
    location: "Jurong East, SG",
    rate: "$45/hr",
    accent: "bg-on-surface-variant",
  },
  {
    id: "48102",
    title: "Intensive O-Level Physics",
    status: "Matched",
    caseId: "#48102",
    level: "Secondary 4",
    subject: "Physics",
    location: "Bishan, SG",
    rate: "$60/hr",
    accent: "bg-tertiary-fixed",
  },
  {
    id: "47993",
    title: "Creative Writing Workshop",
    status: "Closed",
    caseId: "#47993",
    level: "Primary 3-4",
    subject: "English",
    location: "Online",
    rate: "$35/hr",
    accent: "bg-outline-variant",
    closed: true,
  },
];

export function getTutor(id: string): Tutor | undefined {
  return tutors.find((t) => t.id === id);
}
