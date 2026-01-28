Deep Fake Protection

Create an app that will take a user's photo and make small changes to it such that a malicious third party cannot make a deep fake on it.

Arman Sajjadian: ArmanSajjadian\
Rohil Jain: RohilJainUCSB\
Milad Haghighi: mHaghighi04\
John Vu: jjohnvu\
Anit Annadi: AnitAnnadi\
Srish Nigam: EpicSRN021\
Sharanya Gehlot: sharanya444\
Henry Bartz: Bartz36\

Tech Stack: (for MVP)\
Vercel for deployment\
Python: FastAPI, pytorch, torchattack library \
JavaScript: React.jsx

https://pj06-deep-fake-protection-git-main-mhaghighi04s-projects.vercel.app/


User Roles:
We have a single user role: anyone who wants to post images online and protect them from malicious actors who may create deepfakes.

How does your app allow them to accomplish their goal?
Our app will include a masking feature that alters the user's image in a way that is undetectable to the human eye, but throws off a deepfake algorithm.
Installation

Prerequisites

A browser and search engine of chocie

Dependencies

React for frontend, FastAPI for creating a backend endpoint, Torch Attack for adding adversarial noise to images, pytorch to implement Torch Attack, Vercel to deploy our app

Installation Steps

TODO: Describe the installation process (making sure you give complete instructions to get your project going from scratch). Instructions need to be such that a user can just copy/paste the commands to get things set up and running. Note that with the use of GitHub Actions, these instructions can eventually be fully automated (e.g. with act, you can run GitHub Actions locally).

Functionality

Click the select image button, then select and image you would like to protect. Ensure you image follows the guidelines, and then select the upload button. You will then be given the image with the filter placed on it.

Known Problems

We do not yet have the best image protection algoirthm in place.
