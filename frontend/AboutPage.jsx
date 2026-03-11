const About = () => {
  return (
    <section className="why-we-made">
      <h1 style={{
            fontSize: '65px',
            fontWeight: '700',
            margin: '0 0 24px 0',
            lineHeight: 1.1,
            background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textAlign: 'center'
      }}>
        About
      </h1>
      
      <section>
        <h2>Transparency</h2>
        <p style={{ fontSize: '30px', textAlign: 'center'}}>
          Our team is committed to transparency and we never store your uploaded
          photos. It is up to the user to decide whether they want to store
          their images locally on their machine.
        </p>
        
        <h2>Our Mission</h2>
        <p style={{ fontSize: '25px', fontWeight: '300', textAlign: 'center'}}>
          We created this app to poison the training data of future deepfake
          algorithms. Our algorithm does not protect individual images from
          deepfakes, but as more and more people use it, it will undermine the
          training of future deepfake models.
        </p>
        <p style={{ fontSize: '25px', fontWeight: '300', textAlign: 'center'}}>
          New models are constantly being trained and created, and our
          algorithm is adversarial, designed to corrupt new datasets for
          future deepfake models.
        </p>
      </section>
    </section>
  );
};

export default About;
