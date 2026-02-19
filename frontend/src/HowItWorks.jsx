import React, { useState } from 'react';
import { Shield, Eye, Zap, Lock, ChevronRight } from 'lucide-react';

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: "01",
      title: "Upload Your Image",
      description: "You select a JPEG image you want to protect from deepfake algorithms.",
      technical: "FastAPI receives the image file and validates it's a proper JPEG format.",
      icon: Shield
    },
    {
      number: "02",
      title: "Gaussian Noise Application",
      description: "We apply carefully calibrated Gaussian noise to your image - tiny, imperceptible changes to pixel values.",
      technical: "The apply_gauss() function from our Masks module adds mathematically-computed noise that disrupts AI model feature extraction.",
      icon: Zap
    },
    {
      number: "03",
      title: "Adversarial Masking",
      description: "These subtle changes are invisible to human eyes but create 'adversarial examples' that confuse deepfake neural networks.",
      technical: "The noise pattern targets the specific features that deepfake models rely on, causing them to misclassify or fail during training.",
      icon: Eye
    },
    {
      number: "04",
      title: "Protected Image Download",
      description: "You receive a high-quality JPEG (95% quality) that looks identical to your original but is protected from deepfake misuse.",
      technical: "The processed image is streamed back as a download with preserved visual quality while maintaining adversarial properties.",
      icon: Lock
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #2a1f3a 100%)',
      color: '#e8e9f3',
      fontFamily: '"Space Mono", "Courier New", monospace',
      padding: '80px 20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background grid */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        opacity: 0.4,
        animation: 'gridMove 20s linear infinite'
      }} />

      {/* Floating orbs */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'float 8s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '15%',
        width: '250px',
        height: '250px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'float 10s ease-in-out infinite reverse'
      }} />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -30px); }
        }
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes slideIn {
          from { 
            opacity: 0;
            transform: translateX(-20px);
          }
          to { 
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div style={{
            display: 'inline-block',
            padding: '8px 20px',
            background: 'rgba(139, 92, 246, 0.2)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            borderRadius: '20px',
            fontSize: '12px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '24px',
            color: '#a78bfa'
          }}>
            Technical Overview
          </div>
          <h1 style={{
            fontSize: '64px',
            fontWeight: '700',
            margin: '0 0 24px 0',
            lineHeight: 1.1,
            background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            How It Works
          </h1>
          <p style={{
            fontSize: '20px',
            color: '#94a3b8',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Gaussian noise masking creates adversarial examples that protect your images from deepfake algorithms
          </p>
        </div>

        {/* Process Steps */}
        <div style={{ marginBottom: '80px' }}>
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = activeStep === index;
            
            return (
              <div
                key={index}
                onMouseEnter={() => setActiveStep(index)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr',
                  gap: '40px',
                  marginBottom: '60px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  animation: `slideIn 0.6s ease ${index * 0.1}s backwards`
                }}
              >
                {/* Step Number */}
                <div style={{ textAlign: 'right', paddingTop: '8px' }}>
                  <div style={{
                    fontSize: '48px',
                    fontWeight: '700',
                    background: isActive 
                      ? 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)'
                      : 'rgba(148, 163, 184, 0.3)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    transition: 'all 0.3s ease'
                  }}>
                    {step.number}
                  </div>
                </div>

                {/* Step Content */}
                <div style={{
                  background: isActive 
                    ? 'rgba(139, 92, 246, 0.1)' 
                    : 'rgba(255, 255, 255, 0.02)',
                  border: isActive 
                    ? '1px solid rgba(139, 92, 246, 0.3)' 
                    : '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '16px',
                  padding: '32px',
                  transition: 'all 0.3s ease',
                  transform: isActive ? 'translateX(10px)' : 'translateX(0)',
                  boxShadow: isActive 
                    ? '0 8px 32px rgba(139, 92, 246, 0.2)' 
                    : 'none'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      background: isActive 
                        ? 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)'
                        : 'rgba(148, 163, 184, 0.1)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease'
                    }}>
                      <Icon size={24} color={isActive ? '#ffffff' : '#94a3b8'} />
                    </div>
                    <h3 style={{
                      fontSize: '24px',
                      fontWeight: '600',
                      margin: 0,
                      color: isActive ? '#e8e9f3' : '#94a3b8',
                      transition: 'all 0.3s ease'
                    }}>
                      {step.title}
                    </h3>
                  </div>
                  
                  <p style={{
                    fontSize: '16px',
                    lineHeight: 1.8,
                    color: '#cbd5e1',
                    marginBottom: '16px'
                  }}>
                    {step.description}
                  </p>
                  
                  <div style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(139, 92, 246, 0.2)',
                    borderRadius: '8px',
                    padding: '16px',
                    fontFamily: '"Fira Code", "Courier New", monospace',
                    fontSize: '13px',
                    color: '#a78bfa',
                    lineHeight: 1.6
                  }}>
                    <div style={{ 
                      fontSize: '10px', 
                      textTransform: 'uppercase', 
                      letterSpacing: '1px',
                      color: '#64748b',
                      marginBottom: '8px'
                    }}>
                      Technical Detail
                    </div>
                    {step.technical}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Key Concepts */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          padding: '48px',
          marginBottom: '80px'
        }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '600',
            marginBottom: '32px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <ChevronRight size={32} color="#8b5cf6" />
            Key Concepts
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            <div>
              <h4 style={{
                color: '#8b5cf6',
                fontSize: '16px',
                marginBottom: '12px',
                fontWeight: '600'
              }}>
                Gaussian Noise
              </h4>
              <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
                Random variations added to pixel values following a bell curve distribution. Imperceptible to humans but disruptive to AI models.
              </p>
            </div>
            
            <div>
              <h4 style={{
                color: '#3b82f6',
                fontSize: '16px',
                marginBottom: '12px',
                fontWeight: '600'
              }}>
                Adversarial Examples
              </h4>
              <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
                Modified inputs designed to fool machine learning models while appearing unchanged to humans.
              </p>
            </div>
            
            <div>
              <h4 style={{
                color: '#8b5cf6',
                fontSize: '16px',
                marginBottom: '12px',
                fontWeight: '600'
              }}>
              Feature Extraction Disruption
              </h4>
              <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
                Deepfake models rely on extracting facial features. Our noise targets these features, causing model confusion and failure.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Stack */}
        <div style={{ textAlign: 'center' }}>
          <h3 style={{
            fontSize: '20px',
            color: '#64748b',
            marginBottom: '24px',
            fontWeight: '400',
            letterSpacing: '1px'
          }}>
            Powered By
          </h3>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '32px',
            flexWrap: 'wrap'
          }}>
            {['FastAPI', 'PyTorch', 'Python', 'React'].map((tech, i) => (
              <div
                key={i}
                style={{
                  padding: '12px 24px',
                  background: 'rgba(139, 92, 246, 0.1)',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#a78bfa',
                  transition: 'all 0.3s ease',
                  cursor: 'default'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(139, 92, 246, 0.2)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
