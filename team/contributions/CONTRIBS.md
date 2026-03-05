COPY PASTE NEWEST WORK INTO THIS MD FILE FROM OUR GOOGLE DOC

# Team Contributions

## Rohil Jain:  

### Code Contributions:  
Collaborative member of working on the design doc to provide the project summary, frontend details, future improvements, and ideal formatting/structuring
Major frontend restructuring and development
Developed the frontend landing page and applied the cohesion to combine different team member’s components onto the page (this was later passed on to Srish who then made the commit with his additions added, so mine may not be as apparent)
Developed the About page based on user feedback (many people requested a page to help them understand what was happening and why we even need this). I also developed the state-based linking of this page to the landing page so that users could navigate through the site.

### Non-Coding Roles:  
I often served as a sprint leader or scrum captain to help the team document their plans and progress
A number of scrums/standups were led and authored by me
I often organized the team by assigning tasks, highlighting our current to-do items, and developing strategies to approach our ideas
UI styling and distribution. I was responsible for determining who did what on the frontend and how they should do that to prevent merge conflicts. As a result, we see the code has a number of component files which can then be assembled in our central App file.
UX planning. I was responsible for organizing our ideas after receiving user feedback to determine what we would pivot our app with. As a result, we now have a captcha to confirm human users after requesting to process an image, a desktop application, and a number of tooltips where needed, as Prof. K suggested.


## Henry Bartz: 

### Code Contributions: At the start of the course, when our team was still making a web application, I created React components for our front end. I wrote guidelines for users to follow when submitting their images.

When we pivoted to a desktop executable, I pair-programmed with Milad to create the desktop executable for macOS. Specifically, I created a database that stores the user’s previously masked images in our app (Pull Request #120). 

I also created a React component for our about page. I wrote about how we never store the user’s images. It is up to the user to decide whether they want their images stored locally on their machine. I also explained how our app works. It does not prevent individual images from being deepfaked. It adds adversarial noise to images, which will throw off new deepfake models when they are trained on our poisoned images. We hope that if enough people start using our app, there will be enough poisoned data on the internet, so that it will be very hard to train new models.

### Non-Coding Roles:
I led my team’s first retro.
I am the user manual coordinator, and I have overseen the creation of our team’s user manual.
I have served as a sprint leader and documented my team’s plans and progress
