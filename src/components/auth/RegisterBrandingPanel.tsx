import Image from "next/image";
import { Icon } from "@/components/ui/Icon";

const pillars = [
  {
    icon: "verified_user",
    title: "Verified Academic Network",
    description:
      "Every tutor undergoes rigorous credential verification and background checks to ensure institutional-grade quality.",
  },
  {
    icon: "lock",
    title: "Secure Credential Vault",
    description:
      "Data privacy is our priority. Your documents are stored in an encrypted environment protected by advanced security protocols.",
  },
  {
    icon: "handshake",
    title: "Seamless Matchmaking",
    description:
      "Our intelligent algorithms pair students with the perfect subject matter experts based on specific learning objectives.",
  },
];

const trustAvatars = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBz2f4dfmI34Af8AoDg_ECkenBaEJSqwfnSS0UYB0HDmEQBo30d6DxLiHqd-8VsoDtOoNydAffgWEgFhvD7JZtmenqWRP1G0mjgviGOPXTdTINPAOqI918r6TWCo1utyyLT46HUlqt6rrd4LEHmhUx_Jr3PYJ0riKt5_WCI4YZWTIPhkC5mTMJQxsQMFzF_doMp6q279N5ImuN3ge9YEHmQEDFjBiBVezyb7NmfkHk1fG9bxDmvF8DpqaKFvgYDl93Zm7DQq3e2rGg",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuARcT4pBr7mJxedWQkFjIIyk9uuHy-yXm_ZATIoChcNPIoZaiCZLxmedwnzeeX_MYjk66lOtJ5f8Wt2_-gjRl4aneQxgZujNu9YrELuomca3xfE_-voFsMQFFdVbqnQhl0PwmpIq6pzPo1_ByrwkmdCECK9W2ONAH59VLQ4NftOXtibjGVzfP-4dr4O1p5kNWAJu40NreNTvhs05HHezUTFzbpD66vaOaUQnkBN8gYvBP2PheHg_5Xgeq2a2EtCzAR6l8PD8AqLruc",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCTpOwbzsMx72kUxGdNoKbW-NkD_XP3H6K_9SXiwflLtBK51X-pUXeH9o_SQ838vDqkQcAoRGYyzTgtB_sH4zFzkEwXR39kFgVHANRHtLRxUgK3i8j6nF76h_4tH29WRqoZQEPA_IeyzMk_volYTVZHKVnTBv2QmArS46wPkA8CEvfsS7RzPndScYl1Yx6Uy9_T-7vYoyU2cYmEbOl7Y4CXdiA_dmseQVRC4fsM9tOIRLAClG9TTRwNJPcqq0_eT4phHLx07LKRQdU",
];

export function RegisterBrandingPanel() {
  return (
    <section className="hidden lg:flex lg:w-1/2 bg-on-primary-fixed relative flex-col justify-between p-16 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-surface-dim rounded-full blur-[100px]" />
      </div>
      <div className="relative z-10">
        <h1 className="text-display-lg text-surface-bright tracking-tight mb-1">EduMatch</h1>
        <p className="text-body-lg text-on-primary-container max-w-md">
          Bridging the gap between academic potential and professional expertise through a secure,
          curated marketplace.
        </p>
      </div>
      <div className="relative z-10 grid grid-cols-1 gap-6">
        {pillars.map((pillar) => (
          <div
            key={pillar.title}
            className="glass-panel p-6 rounded-xl flex items-start gap-6 group hover:bg-white/10 transition-colors"
          >
            <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center shrink-0">
              <Icon name={pillar.icon} className="text-white" filled />
            </div>
            <div>
              <h3 className="text-headline-sm text-surface-bright mb-1">{pillar.title}</h3>
              <p className="text-body-sm text-on-primary-container">{pillar.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="relative z-10 pt-10 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-3">
            {trustAvatars.map((src, i) => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-on-primary-fixed bg-surface-dim relative overflow-hidden">
                <Image src={src} alt={`Trust user ${i + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
          <p className="text-label-sm text-surface-dim uppercase tracking-widest">
            Trusted by 10,000+ Active Members
          </p>
        </div>
      </div>
    </section>
  );
}
