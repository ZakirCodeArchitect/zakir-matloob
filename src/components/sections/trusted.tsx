import {
  siDocker,
  siGit,
  siGithubactions,
  siLangchain,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siSap,
  siStripe,
  siTypescript,
  siVercel,
  type SimpleIcon,
} from "simple-icons";
import { skills } from "@/lib/data";

const icons: Record<(typeof skills)[number]["icon"], SimpleIcon> = {
  nextdotjs: siNextdotjs,
  react: siReact,
  typescript: siTypescript,
  nodedotjs: siNodedotjs,
  postgresql: siPostgresql,
  python: siPython,
  langchain: siLangchain,
  sap: siSap,
  docker: siDocker,
  githubactions: siGithubactions,
  stripe: siStripe,
  vercel: siVercel,
  nestjs: siNestjs,
  git: siGit,
};

export function Trusted() {
  const row = [...skills, ...skills];
  return (
    <section className="border-b border-black/8 bg-white py-8 md:py-10">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-5 md:flex-row md:items-center md:px-8">
        <p className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/70">
          Skills &amp; tools
        </p>
        <div className="relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
          <div className="marquee flex w-max items-center gap-10 pr-10 md:gap-12 md:pr-12">
            {row.map((skill, i) => {
              const icon = icons[skill.icon];
              return (
                <span
                  key={`${skill.name}-${i}`}
                  className="inline-flex items-center gap-2.5 text-ink/55 transition hover:text-ink"
                  title={skill.name}
                >
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    aria-hidden
                    className="size-6 shrink-0 md:size-7"
                    fill="currentColor"
                  >
                    <path d={icon.path} />
                  </svg>
                  <span className="sr-only">{skill.name}</span>
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
