// Details for /impressum and /privacy.
// TODO(Hiki): replace the placeholder address before deploying — § 5 DDG
// requires a full postal address (no P.O. box) in the Impressum.
export const legal = {
  addressLines: ["[Street and house number]", "[Postcode] Munich", "Germany"],
  // VAT ID (USt-IdNr.) — only if you have one; leave null otherwise.
  vatId: null as string | null,
  updated: "30 September 2026",
};
