# User Feedback Needs

**Inter-Team Evaluation: 02/20/26**

The following are our top three feedback priorities, in order of importance. Evaluators: please use the live deployment at https://pj06-deep-fake-protection-git-main-mhaghighi04s-projects.vercel.app/ and share your honest impressions.

---

## 1. (Top Priority) Perceived Visual Quality of the Protected Image

**Question:** After uploading a photo and downloading the protected version, does the output image look visually indistinguishable from the original to you?

**Why this matters:** Our core promise is that the adversarial mask is *invisible* to the human eye. If users can notice artifacts, noise, or color shifts, the product fails its main value proposition — people won't use a tool that visibly degrades their photos.

**What we'd like you to do:**
1. Upload any portrait or selfie-style photo.
2. View the original and the protected image side-by-side (the UI shows both).
3. Answer: On a scale of 1–5, how visually similar do the two images look? (1 = very different, 5 = identical)
4. Note any specific artifacts you observe (color banding, blur, grain, etc.).

---

## 2. Overall UX Flow — Upload → Process → Download

**Question:** Is the end-to-end flow of uploading an image, waiting for it to be processed, and retrieving the result clear, fast, and frustration-free?

**Why this matters:** We have recently added a side-by-side view, similarity score display, and CAPTCHA verification. We want to know whether these additions help or hurt the experience, and whether the overall flow feels intuitive to a first-time user with no prior explanation.

**What we'd like you to do:**
1. Without reading any instructions, attempt to upload a photo and get back a protected version.
2. Note any point where you felt confused, had to pause, or weren't sure what to do next.
3. Answer: How many steps did the process feel like it required? Did the CAPTCHA feel necessary or annoying?
4. Rate your overall satisfaction with the UX flow: 1 (very frustrating) – 5 (smooth and obvious).

---

## 3. Trust & Clarity of the "How It Works" Explanation

**Question:** After reading the on-page description of how the masking technology works, do you feel confident that your photos are actually being protected — and do you understand *why*?

**Why this matters:** Deepfake protection is a novel concept. Users need to trust that something real is happening under the hood, not just a cosmetic filter. We recently added a section describing the masking process; we want to know if it builds that trust effectively or if it reads as too technical / too vague.

**What we'd like you to do:**
1. Read the "How It Works" / masking description section on the site.
2. In 1–2 sentences, describe in your own words what you think the app is doing to your image.
3. Answer: Does the explanation make you *trust* the protection is real? (Yes / Somewhat / No)
4. What single piece of information, if added, would most increase your confidence in the product?
