# Evaluation Response
**Team: Deep Fake Protection**

---

## Overview

Overall, the responses were encouraging, reviewers found the UI clean and easy to navigate, and visual quality of protected images was rated highly. The feedback also explained clear, actionable opportunities to improve user trust and comprehension. Below we respond to each area of feedback in order.

---

## Section 1 — Feedback from our user needs

### Priority 1: Perceived Visual Quality

Reviewers rated visual similarity at 4.5/5, noting the protected image looks nearly identical to the original, with only slight blurriness that is not noticeable from a distance. This affirms that our core value proposition, an imperceptible adversarial mask, is being met.

**Decision:** No immediate changes to the image processing pipeline are required for visual quality. We will, however, add tooltips to make it easier to understand what the masking level actually does to the image.

### Priority 2: Image Processing Time

Most runs completed in approximately 3 seconds, which reviewers found fast or acceptable. One outlier was reported at ~20 seconds for maximum protection level.

**Decision:** We will investigate the cause of the 20-second outlier, likely tied to backend cold starts or image size at the maximum alteration setting.

### Priority 3: Trust & Clarity of "How It Works"

This was the weakest area. Reviewers said the explanation gave them only some confidence, and multiple reviewers explicitly asked for a demo or visual proof that the protection defeats a real deepfake model.

**Decision (Primary):** We will add the About page to the app so that all users can understand how it works and what is happening. We will also add tooltips to any confusing sections of the app so that users can better understand what it means when they adjust their settings.

---

## Section 2 — Feature Feedback

**Feedback:** Reviewers liked the image library feature and the simple UI. One reviewer asked what "special noun" means in the app, suggesting some terminology is unclear. Another asked what PSNR and imperceptibility mean.

**Decision:** We will audit the technical terminology in the UI and utilize the About page to better explain the things which seem unclear. For example, the Gaussian noise algorithms may sound like technical jargon, but the About page breaks down how they simply are applying noise to the image in a targeted manner. This can improve user confidence with the app because they can better understand what is happening.

---

## Section 3 — Robustness & UI/UX

**Feedback:** The app was noted as smooth and comfortable to use. One reviewer suggested that the "Protection Complete" page should explain why the filter applied actually protects the image (e.g., why does Gaussian blur help against deepfakes?). Another suggested changing the verification question if a user fails it.

**Decision:** This is again something we intend to tackle by implementing the About page in the app. It would be able to explain everything in one centralized location.

**Decision:** We will revisit the verification question logic. If a user fails, we will either randomize a new question or provide a clearer hint, rather than showing the same question repeatedly. This improves accessibility and reduces user frustration.

---

## Section 4 — Deployment & Repo Feedback

No explicit complaints were raised about the deployment instructions or repository organization in the feedback provided. We take this as a positive signal but will continue to keep the README and Kanban Board up to date as we implement the changes described above.

---

## Section 5 — Closing Thoughts

**Something they liked:** Clean, intuitive UI and the image library feature.

**Most impactful opportunity for improvement:** Adding a demo that shows a deepfake failing on a protected image — multiple reviewers cited this independently as the single thing that would most increase their confidence.

**Decision:** We are treating the deepfake demo feature as our top stretch goal for the remainder of the project, given that it was the most commonly requested improvement and directly targets user trust, which is central to our product's mission.
