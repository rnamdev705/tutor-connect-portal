import { PortalHeader } from "@/components/layout/PortalHeader";
import { TutorCard } from "@/components/tutors/TutorCard";
import { Icon } from "@/components/ui/Icon";
import { tutors } from "@/lib/data";

export default function TutorsPage() {
  return (
    <div className="bg-background text-on-surface min-h-screen">
      <PortalHeader active="tutors" />
      <main className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-10">
        <aside className="w-full md:w-72 shrink-0">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 sticky top-16 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-headline-sm text-primary">Filters</h2>
              <button type="button" className="text-secondary text-label-sm hover:underline">
                Reset All
              </button>
            </div>
            <div className="space-y-10">
              <div>
                <label className="block text-label-md text-on-surface-variant mb-1">Keyword</label>
                <input
                  className="w-full border border-outline-variant rounded-lg px-3 py-1 focus:ring-secondary focus:border-secondary text-body-sm outline-none"
                  placeholder="e.g. Calculus"
                  type="text"
                />
              </div>
              <div>
                <label className="block text-label-md text-on-surface-variant mb-1">Subject</label>
                <select className="w-full border border-outline-variant rounded-lg px-3 py-1 text-body-sm bg-surface-container-lowest">
                  <option>All Subjects</option>
                  <option>Mathematics</option>
                  <option>Physics</option>
                  <option>Chemistry</option>
                </select>
              </div>
              <div>
                <label className="block text-label-md text-on-surface-variant mb-1">
                  Academic Level
                </label>
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
              </div>
              <div>
                <label className="block text-label-md text-on-surface-variant mb-1">Location</label>
                <div className="flex items-center bg-surface-container-low px-3 py-1 rounded-lg border border-outline-variant">
                  <Icon name="location_on" className="text-outline mr-1" size={20} />
                  <input
                    className="bg-transparent border-none focus:ring-0 text-body-sm p-0 w-full outline-none"
                    placeholder="Postal Code or City"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
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
              <select className="border-none bg-transparent text-label-md text-secondary focus:ring-0 cursor-pointer">
                <option>Most Experienced</option>
                <option>Highest Rating</option>
              </select>
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
