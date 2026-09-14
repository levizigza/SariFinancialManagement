export type ContactActionState = {
  ok: boolean;
  message: string;
  fieldErrors?: Partial<
    Record<"name" | "email" | "phone" | "service" | "message", string>
  >;
};
