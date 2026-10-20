import Link from "next/link";
import { EMAIL_PROVIDER_ID, signIn } from "@/lib/auth";
import { getI18n } from "@/lib/i18n/server";
import { getCampaignTemplate } from "@/lib/templates/campaign-templates";
import { DemoNotice } from "@/components/demo-notice";
import { isPublicDemoHost } from "@/lib/env";

const LLAMPUKAQ_URL = "https://llampuakaq.com";

export async function generateMetadata() {
  const { t } = await getI18n();
  return {
    title: t("Login - OpenReply"),
    description: t("Sign in to manage Instagram comment-to-DM campaigns."),
  };
}

function BrandLockup({ centered = false }: { centered?: boolean }) {
  return (
    <div className={centered ? "text-center" : "text-left"}>
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">
        OpenReply
      </h1>
      <a
        href={LLAMPUKAQ_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 inline-block text-xs font-medium text-muted transition-colors hover:text-foreground"
      >
        by LLampukaq <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mt-0.5 h-4 w-4 shrink-0 text-accent"
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{
    checkEmail?: string;
    callbackUrl?: string;
    template?: string;
  }>;
}) {
  const { t } = await getI18n();

  if (await isPublicDemoHost()) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-md text-center">
          <BrandLockup centered />
          <div className="panel rounded p-8 mt-8 shadow-black/40 text-left">
            <h2 className="text-lg font-semibold text-foreground">
              {t("Sign-in is off on this demo")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {t("This is the public demo: it doesn't create real accounts or send DMs.")}
            </p>
            <a
              href={LLAMPUKAQ_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded bg-accent px-6 py-3.5 text-sm font-semibold text-white shadow-indigo-500/25 transition-all hover:shadow-indigo-500/30"
            >
              {t("Visit LLampukaq")} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  const params = await searchParams;
  const checkEmail = params.checkEmail === "1";
  const selectedTemplate = getCampaignTemplate(params.template);
  const templateCallbackUrl = selectedTemplate
    ? `/campaigns/new?template=${selectedTemplate.slug}`
    : null;
  const callbackUrl = params.callbackUrl ?? templateCallbackUrl ?? "/dashboard";

  async function sendMagicLink(formData: FormData) {
    "use server";
    await signIn(EMAIL_PROVIDER_ID, {
      email: String(formData.get("email") ?? ""),
      redirectTo: callbackUrl,
    });
  }

  const highlights = [
    t("Automatic private replies by keyword"),
    t("Inbox and delivery logs in real time"),
    t("Connect your professional Instagram account in minutes"),
  ];

  return (
    <div className="min-h-screen grid lg:grid-cols-[1.1fr_1fr]">
      <aside className="relative hidden lg:flex flex-col justify-between overflow-hidden border-r border-border bg-surface p-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-accent/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -right-16 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
        />

        <div className="relative">
          <BrandLockup />
        </div>

        <div className="relative max-w-md">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-foreground">
            {t("Turn comments into conversations.")}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {t(
              "Someone comments your keyword on a post or reel and OpenReply sends them the link by DM instantly."
            )}
          </p>
          <ul className="mt-10 space-y-5">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm leading-relaxed text-foreground"
              >
                <CheckIcon />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-muted">
          {t("Official Instagram API")} ·{" "}
          <a
            href={LLAMPUKAQ_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 transition-colors hover:text-foreground"
          >
            llampuakaq.com
          </a>
        </p>
      </aside>

      <main className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <BrandLockup centered />
          </div>

          <DemoNotice variant="panel" />

          <div className="panel rounded p-8 shadow-black/40">
            {selectedTemplate && !checkEmail && (
              <div className="mb-6 border border-accent/20 bg-accent/10 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                  {t("Template selected")}
                </p>
                <p className="mt-2 text-sm font-semibold text-foreground">
                  {selectedTemplate.title}
                </p>
              </div>
            )}

            {checkEmail ? (
              <div className="py-4 text-center">
                <span className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <CheckIcon />
                </span>
                <h2 className="mb-2 text-lg font-semibold text-foreground">
                  {t("Check your email")}
                </h2>
                <p className="text-sm leading-relaxed text-muted">
                  {t(
                    "We sent you a secure sign-in link. Open it on this device to continue."
                  )}
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-lg font-semibold text-foreground">
                  {selectedTemplate ? t("Almost there") : t("Welcome back")}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {selectedTemplate
                    ? t("Sign in to use the {name} template.", {
                        name: selectedTemplate.title,
                      })
                    : t(
                        "Enter your work email and we'll send you a magic link to sign in."
                      )}
                </p>

                <form action={sendMagicLink} className="mt-6 space-y-5">
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground"
                    >
                      {t("Work email")}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="w-full rounded border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-zinc-500 transition-colors focus:border-accent/40 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-3">
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 rounded bg-accent px-6 py-3.5 text-sm font-semibold text-white shadow-indigo-500/25 transition-all hover:shadow-indigo-500/30"
                    >
                      {t("Email me a magic link")}
                    </button>
                    <p className="text-center text-xs text-muted">
                      {t("No passwords: we send you a single-use link.")}
                    </p>
                  </div>
                </form>
              </>
            )}
          </div>

          <p className="mt-6 text-center text-xs leading-relaxed text-muted">
            {t("By continuing you accept the Terms and the Privacy Policy.")}
          </p>

        </div>
      </main>
    </div>
  );
}
