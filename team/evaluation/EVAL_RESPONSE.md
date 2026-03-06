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

**Feedback:** Reviewers liked the image library feature and the simple UI. One re
