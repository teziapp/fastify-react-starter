export const contactsAndSocialsTypes = ["email", "phone", "mobile"] as const;
export type ContactsAndSocialsType = (typeof contactsAndSocialsTypes)[number];
