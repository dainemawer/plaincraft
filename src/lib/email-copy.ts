/** State shared by the "email me a copy" forms and their server actions. */
export type EmailCopyState =
  | { status: "idle" }
  | { status: "invalid"; email: string; reason: "email" | "consent" }
  | { status: "failed"; email: string }
  | { status: "sent"; newsletter: boolean };
