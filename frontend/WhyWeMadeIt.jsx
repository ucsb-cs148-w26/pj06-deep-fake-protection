const WhyWeMade = () => {
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
        Why We Made It
      </h1>
      <p style={{ fontSize: '30px', textAlign: 'center'}}>
        Deepfake technology has advanced to the point where anyone's image can
        be manipulated or misused with alarming realism. This raises serious
        concerns about privacy, consent, and trust in digital media.
      </p>
      <p style={{ fontSize: '25px', fontWeight: '300', textAlign: 'center'}}>
        We built our product to give people and organizations a simple way to
        protect their images before sharing them online. By subtly and
        intelligently altering pixels in the image, our system makes the images
        much harder for AI models to exploit for deepfake training or generation.
      </p>
      <p style={{ fontSize: '25px', fontWeight: '300', textAlign: 'center'}}>
        Our mission is to empower individuals to maintain control over their
        digital identity in an era where synthetic media is increasingly
        difficult to detect or regulate.
      </p>
    </section>
  );
};

export default WhyWeMade;