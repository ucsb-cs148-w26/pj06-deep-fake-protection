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

## 2. Image Processing Time (Quantitative Measurement)

**Question:** How long does it actually take — in seconds — for the app to process and return a protected image, and does that wait time feel acceptable?

**Why this matters:** Processing time is a hard performance metric we can benchmark against user tolerance thresholds. If users are waiting more than ~10–15 seconds without feedback, they may assume the app is broken and abandon it. We need concrete timing data across different evaluators and image sizes to identify whether our backend latency is a usability problem.

**What we'd like you to do:**
1. Upload a photo and start a stopwatch (phone timer is fine) the moment you click the process/submit button.
2. Stop the timer when the protected image appears on screen.
3. Record the exact time in seconds (e.g., 8.4s).
4. Repeat with a second photo if possible and record that time too.
5. Answer: At that wait time, did the processing feel fast, acceptable, or too slow?

**Data we're collecting:** Raw processing time in seconds per run, and a 3-point acceptability rating (fast / acceptable / too slow).

---

## 3. Trust & Clarity of the "How It Works" Explanation

**Question:** After reading the on-page description of how the masking technology works, do you feel confident that your photos are actually being protected — and do you understand *why*?

**Why this matters:** Deepfake protection is a novel concept. Users need to trust that something real is happening under the hood, not just a cosmetic filter. We recently added a section describing the masking process; we want to know if it builds that trust effectively or if it reads as too technical / too vague.

**What we'd like you to do:**
1. Read the "How It Works" / masking description section on the site.
2. In 1–2 sentences, describe in your own words what you think the app is doing to your image.
3. Answer: Does the explanation make you *trust* the protection is real? (Yes / Somewhat / No)
4. What single piece of information, if added, would most increase your confidence in the product?
