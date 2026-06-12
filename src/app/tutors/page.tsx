import { PortalHeader } from "@/components/layout/PortalHeader";
import { TutorCard } from "@/components/tutors/TutorCard";
import { Button, Card, Field, Icon, Input, Select } from "@/components/ui";
import { tutors } from "@/lib/data";

export default function TutorsPage() {
  return (
    <div className="bg-background text-on-surface min-h-screen">
      <PortalHeader active="tutors" />
      <main className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-10">
        <aside className="w-full md:w-72 shrink-0">
          <Card className="sticky top-16 shadow-sm" padding="md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-headline-sm text-primary">Filters</h2>
              <Button variant="ghost" className="text-secondary text-label-sm h-auto px-0 hover:bg-transparent hover:underline">
                Reset All
              </Button>
            </div>
            <div className="space-y-10">
              <Field label="Keyword" htmlFor="keyword">
                <Input id="keyword" placeholder="e.g. Calculus" className="[&_input]:h-9 [&_input]:text-body-sm" />
              </Field>
              <Field label="Subject" htmlFor="subject">
                <Select id="subject" className="h-9 text-body-sm">
                  <option>All Subjects</option>
                  <option>Mathematics</option>
                  <option>Physics</option>
                  <option>Chemistry</option>
                </Select>
              </Field>
              <Field label="Academic Level">
                <div className="space-y-2">
                  {["Primary", "Secondary", "Tertiary / University"].map((level, i) => (
                    <label key={level} className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked={i === 1}
                        className="rounded text-secondary focus:ring-secondary"
                      />
                      <span className="text-body-sm text-on-surface">{level}</span>
                    </label>
                  ))}
                </div>
              </Field>
              <Field label="Location" htmlFor="location">
                <Input
                  id="location"
                  leftIcon="location_on"
                  placeholder="Postal Code or City"
                  className="[&_input]:h-9 [&_input]:text-body-sm [&_input]:bg-surface-container-low"
                />
              </Field>
            </div>
          </Card>
        </aside>
        <section className="grow">
          <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-10 gap-6">
            <div>
              <h1 className="text-headline-lg text-primary">Tutor Directory</h1>
              <p className="text-body-md text-on-surface-variant">
                Showing {tutors.length} qualified educators for your search
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-label-md text-on-surface-variant">Sort by:</span>
              <Select className="w-auto border-none bg-transparent text-label-md text-secondary h-auto py-0">
                <option>Most Experienced</option>
                <option>Highest Rating</option>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
            {tutors.map((tutor) => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
        </section>
      </main>
      <footer className="bg-surface-container-highest border-t border-outline-variant mt-16">
        <div className="w-full py-10 px-6 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <span className="text-headline-sm text-primary">EduMatch</span>
            <p className="text-body-sm text-on-surface-variant mt-1">
              © 2024 EduMatch. Encrypted &amp; Secure.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {["Privacy Policy", "Terms of Service", "Support"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-label-sm text-on-surface-variant hover:text-primary hover:underline"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
