import React from "react";

const About = () => {
  return (
    <div className="about-page">
      <h1>About This Project</h1>

      <section>
        <h2>Transparency</h2>
        <p>
          Our team is committed to transparency. We never store your uploaded
          photos ourselves. It is up to the user to decide whether to store
          them locally on their machine.
        </p>
      </section>

      <section>
        <h2>Our Mission</h2>
        <p>
          We created this app to poison the training data of future deepfake
          algorithms. Our algorithm does not protect individual images from
          deepfakes, but as more and more people use it, it will undermine the
          training of future deepfake models.
        </p>
        <p>
          New models are constantly being trained and created, and our
          algorithm is adversarial, designed to corrupt new datasets for
          future deepfake models.
        </p>
      </section>
    </div>
  );
};

export default About;
