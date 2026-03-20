# Team Contributions

This document records the roles and contributions of each team member throughout the project. It supplements the GitHub Insights Contributors graph with context and commentary, particularly where automated commit attribution does not fully reflect individual effort (e.g., pair programming, administrative work, or use of alternate accounts).

---

## Anit

### Code Contributions

Throughout the project, I made consistent contributions to the codebase and project documentation. My early work helped lay the foundation of the project by contributing to team norms, personal descriptions, and project ideas (PR #3), followed by building the Hello World app to establish the initial project structure (PR #13). I also contributed to the learning documentation (PR #43) and implemented a file upload feature that allows users to add images to the site (PR #51). Later, I cleaned up the repository by removing duplicate frontend files (PR #72) and added lecture notes documentation (PR #75). I also completed retrospective documentation for Retro 1 (PR #64) and updated the project README (PR #127).

One of my larger contributions was pair programming with Milad on PR #120, which added a macOS desktop executable version of the application. This PR touched 27 files and closed 8 issues (#112–#119), converting many of the features we had already developed to work in the desktop app, including image uploads, a download button, and image modifications. We also added new features such as a database for previously masked images and a view to display those images. Although the commit appears under Milad's account, the work was completed collaboratively through pair programming.

### Non-Coding Roles

I actively participated in team discussions and helped brainstorm new features throughout the project. I wrote the Scrum Notes for Wed 01/28, led the retrospective on Fri 02/13, and served as the Testing/QA Coordinator. I also supported teammates by helping troubleshoot issues and assisting with tasks when needed.

### Context for GitHub Stats

A significant portion of my work on the desktop executable (PR #120) was pair-programmed with Milad and appears under his GitHub account. My actual contribution level is better reflected by the scope of the features I helped build rather than raw commit counts.

---

## Arman Sajjadian

### Code Contributions

In the early stages of the project, I researched protection algorithms to determine what masking strategies could effectively prevent deepfake model training on user images. This led me to implement a Projected Gradient Descent (PGD) adversarial attack as our core masking method (PR #47, `Masks/PGD.py`), along with a Gaussian noise mask as a complementary approach (PR #86, `Masks/Gauss.py`). I also wrote backend tests for the masking pipeline (PR #85).

When our Vercel builds began failing due to memory constraints from heavy ML dependencies, I refactored the codebase to remove PyTorch and other bloated libraries, which stabilized both the web and desktop applications (PR #92).

For the desktop executable, I implemented a similarity score panel that computes PSNR and a visual similarity percentage after masking, giving users a quantitative measure of image degradation (PR #125). I also added PNG export format support and a format selection modal so users can choose how their protected images are saved (PR #140).

### Non-Coding Roles

As Project Owner, I was responsible for the initial conceptualization of the deepfake protection idea and managing the overall project trajectory to ensure all weekly lab criteria were met. I led several scrum meetings and retrospectives, maintaining detailed notes on team progress. I also frequently served as PR reviewer and merger for teammates' contributions throughout the project.

---

## Henry Bartz

### Code Contributions

At the start of the course, when our team was still making a web application, I created React components for our front end. I wrote guidelines for users to follow when submitting their images. I ensured that our frontend connected seamlessly with the other components built by other team members. I also spent a ton of time with John researching and developing the math and logic beneath our protection algorithms, which form the core of our application.

When we pivoted to a desktop executable, I pair-programmed with Milad to create the macOS desktop executable (PR #120). Specifically, I created a database that stores the user's previously masked images in our app (PR #118). I also helped add info buttons (PR #148) and worked with Milad to ensure the app installs correctly (PR #112).

I also created a React component for our About page. I wrote about how we never store the user's images; it is up to the user to decide whether they want their images stored locally on their machine. I also explained how our app works: it does not prevent individual images from being deepfaked, but rather adds adversarial noise to images, which will throw off new deepfake models when they are trained on our poisoned images. We hope that if enough people start using our app, there will be enough poisoned data on the internet that it will be very hard to train new models.

### Non-Coding Roles

I led my team's first retrospective. I led an important Start/Stop/Continue retro during the start of our project, which set us up for success for the rest of the quarter. Also, I am the User Manual Coordinator and have overseen the creation of our team's user manual. This was a vital component of our project and required significant effort. I have also served as a sprint leader and documented my team's plans and progress.

---

## John Vu

### Code Contributions

I played a significant role in researching and developing the math, logic, and underlying techniques behind our protection algorithms, which form the core mechanism our application uses to disrupt deepfake models.

In the early phases of the project, I laid the groundwork by setting up the initial Hello World architecture and scaffolding for our first labs. As we built out the web application, I implemented critical client-side validation for our image upload system (PR #66), including MIME-type checks to restrict uploads strictly to JPEG formats, managing error states, clearing invalid selections, and providing direct UI feedback to the user.

Later, I led a major codebase cleanup by removing duplicate frontend files and obsolete directories (PR #72 and related commits), successfully deleting over 700 lines of redundant code to streamline our repository. During our pivot to the macOS desktop executable, I was assigned to and responsible for the image modification features (Issue #114). I pair-programmed this functionality, which was successfully integrated into the desktop executable overhaul (PR #120).

### Non-Coding Roles

I served as the team's primary Git authority and repository manager, responsible for maintaining version-control hygiene — merging multiple pull requests, keeping feature branches synced with main, and reverting or reapplying commits to undo unnecessary changes (such as accidental retrospective notes being pushed). I was also responsible for the initial system design and application flow of the product, and managed our project's open-source compliance by authoring and implementing the MIT License (`LICENSE.md`), ensuring proper permissions and contributor attribution were established early on.

### Context for GitHub Stats

My GitHub contribution graph may not fully reflect my workload, particularly during the later stages of the project. A significant portion of my development work during the pivot to the desktop app (specifically the image modification logic for Issue #114) was pair-programmed and ultimately pushed and merged under Milad's account in PR #120. Furthermore, because a large part of my role involved repository maintenance, resolving Git issues, and system design, my contributions were often administrative or architectural rather than purely generating raw lines of code.

---

## Milad Haghighi

### Code Contributions

At the start of the course, when we were working on the web application, I created the frontend and backend deployments on Vercel and Render respectively and updated our code to use the proper endpoints. I created the confirmation popup for when a user uploaded an image to ensure they abided by the image guidelines.

When we pivoted to the desktop application, I pair-programmed with others to create the executable for macOS, importing all features from our web app and creating new ones like a photo library, as well as a full frontend overhaul to make the interface more intuitive and pleasing to end users. I then created the About page and info buttons over certain features in the desktop app. I also fixed a number of issues such as CORS links and updating dependencies to prevent version conflicts.

### Non-Coding Roles

I led Retro 3 and have served as a sprint/scrum leader, documenting team progress and leading our group towards our goals. I designed the UI for the desktop application with the different tabs, especially for the image library. I also contributed to various documentation files, including team agreements, the leadership markdown, and various scrums.

---

## Rohil Jain

### Code Contributions

I was a collaborative member working on the design doc, providing the project summary, frontend details, future improvements, and ideal formatting/structuring. I performed major frontend restructuring and development, including developing the frontend landing page and adding the cohesion to combine different team members' components onto the page (this was later passed on to Srish who then made the commit with his additions added, so my contributions may not be as apparent in the commit history). I also developed the About page based on user feedback — many people requested a page to help them understand what was happening and why we even need this — and implemented state-based linking of this page to the landing page so that users could navigate through the site.

### Non-Coding Roles

I often served as a sprint leader or scrum captain to help the team document plans and progress; a number of scrums/standups were led and authored by me. I frequently organized the team by assigning tasks, highlighting current to-do items, and developing strategies to approach our ideas. I was responsible for UI styling and distribution, determining who did what on the frontend and how they should do it to prevent merge conflicts — as a result, the code has a number of component files which can then be assembled in our central App file. I also handled UX planning, organizing our ideas after receiving user feedback to determine what we would pivot our app with. As a result, we now have a CAPTCHA to confirm human users after requesting to process an image, a desktop application, and a number of tooltips where needed as Prof. K suggested. I also made a number of tweaks to various `.md` documents we produced in order to polish, correct, or further develop our documentation.

---

## Sharanya Gehlot

### Code Contributions

My primary focus was on frontend development and user experience. I created the About page template (PR #107) that displays educational components explaining our deepfake protection technology, and developed the basic landing page (PR #36) that serves as users' first interaction with our application. I integrated the frontend layout with guidelines and button components (PR #58), and added a comprehensive section (PR #95) describing how the Gaussian noise masking process works in accessible terms for non-technical users. I also implemented the file upload interface (PR #51) with drag-and-drop functionality.

Beyond feature development, I contributed to documentation by filling out our design documentation (PR #143) detailing UI/UX decisions and component architecture, creating the `DESIGN.md` file (PR #131) that documents our design philosophy and tech stack choices, and contributing to the `AI_CODING.md` file (PR #94). I also worked on combining page components onto the main page and adjusting the layout format (PR #74) for better user experience and visual hierarchy.

### Non-Coding Roles

I contributed to the UI/UX design direction for the frontend, focusing on creating a clean, intuitive interface that builds user trust. This included designing the information architecture for the About page to effectively communicate complex technical concepts like adversarial examples to non-technical users. I wrote portions of our design documentation, created user-facing content explaining how our deepfake protection works, and participated extensively in pair programming sessions with team members, particularly Rohil, to accelerate development and ensure code quality.

### Context for GitHub Stats

My GitHub contribution graph does not fully reflect the extent of my work on this project due to pair programming with Rohil (RohilJainUCSB), who pushed most of our collaborative code from his machine. During many coding sessions, we worked on Rohil's laptop to facilitate real-time collaboration and screen sharing, resulting in commits being pushed under his GitHub account rather than mine. Our team adopted an agile, collaborative approach where multiple team members would contribute to the same features simultaneously, which improved code quality and development speed but meant that individual commit counts don't reflect individual effort. I was present and actively coding during all sessions where these features were developed, participated in code review and testing for all frontend components, and contributed to architectural decisions that shaped our React component structure.

---

## Srish Nigam

### Code Contributions

I set up the FastAPI backend and restructured the project repository (PR #71), moving the frontend out of `team/`, wiring the backend to the shared `Masks` module for image processing, and introducing `backend/main.py` (later renamed to `app.py`). I also added CORS configuration and port 5174 for frontend compatibility. Early on, I contributed to the initial project setup (PR #9) and added `team/Srish.md`.

For the frontend, I implemented a modern drag-and-drop file upload component (PR #53) with a styled upload area and file validation, replacing the previous upload flow with a more usable, visually clear interface. I also integrated Google reCAPTCHA verification before image upload on the web app (PR #110), adding modal flow, error handling for expired/failed verification, and styling for the CAPTCHA UI. For the Electron desktop app, I added an arithmetic CAPTCHA (e.g., "What is 7 + 3?") before "Apply Protection" (PR #129), implementing the modal, input validation, and styling in `UploadPage.jsx` and `App.css`.

I also contributed to backend testing and documentation (PR #103) by adding a pytest health check for the FastAPI `/health` endpoint, updating `backend/requirements.txt` for test dependencies, and creating `team/TESTING.md` to document the testing approach. I expanded the README with a detailed Tech Stack section (PR #79) describing the project's technologies and structure, and authored the initial user manual in `docs/MANUAL.md` with product purpose, intended audience, and section headings for web and desktop workflows.

### Non-Coding Roles

I wrote scrum notes for team meetings on Mon 02/02 and Mon 02/18 (see `team/LEADERSHIP.md`). I was assigned as Design Document Coordinator (Mon 02/23) and responsible for coordinating the design documentation. I reviewed teammates' pull requests in a timely way to keep merges and feedback cycles moving, stayed in touch with the team on messages and in meetings to align on tasks, blockers, and priorities, and helped others debug issues, answered questions about the FastAPI backend and upload flow, and shared context when onboarding new contributors.
