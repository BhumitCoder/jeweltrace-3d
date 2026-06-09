---
name: SEO structured data policy — aggregateRating
description: Google policy violation rules for ratings in JSON-LD; what was removed and why
---

## Rule
Never include `aggregateRating` in JSON-LD schemas unless the ratings are real and the numeric values are visible on the rendered page. Fabricated numbers (e.g. "4.9 stars / 1247 reviews") constitute a Google Structured Data policy violation and can trigger a manual penalty or suppress indexing.

**Why:** Google's Rich Results guidelines explicitly ban misleading structured data. The site previously had fake aggregateRating in 4 places: `index.html` LocalBusiness, `seo.ts` localBusiness(), `seo.ts` reviewsSchema(), and `index.tsx` ProfessionalService.

**How to apply:** If the client ever collects real reviews (e.g. from Google My Business API or a review platform), re-add aggregateRating using only the true count and average. Until then, leave it out entirely.
