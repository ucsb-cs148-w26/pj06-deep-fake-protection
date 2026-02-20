import React, { useState } from 'react';
import { Shield, Eye, Zap, Lock, ArrowLeft } from 'lucide-react';
import WhyWeMade from '../WhyWeMadeIt.jsx'

const HowItWorks = ({ goBack }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: "01",
      title: "Upload Your Image",
      description: "You select an image you want to protect from deepfake algorithms.",
      technical: "FastAPI receives the image file and validates it's a proper format.",
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
      description: "You receive a high-quality image that looks identical to your original but is better protected from deepfake misuse.",
      technical: "The processed image is streamed back as a download with preserved visual quality while maintaining adversarial properties.",
      icon: Lock
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0d1231 0%, #1a1f39 50%, #1d1628 100%)',
      color: '#e8e9f3',
      fontFamily: '"Space Mono", "Courier New", monospace',
      padding: '80px 20px',
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* Back Button */}
      {goBack && (
        <button
          onClick={goBack}
          style={{
            position: 'fixed',
            top: '24px',
            left: '24px',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            background: 'rgba(139, 92, 246, 0.15)',
            border: '1px solid rgba(139, 92, 246, 0.4)',
            borderRadius: '10px',
            color: '#a78bfa',
            fontFamily: '"Space Mono", "Courier New", monospace',
            fontSize: '13px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            backdropFilter: 'blur(10px)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(139, 92, 246, 0.3)';
            e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.7)';
            e.currentTarget.style.color = '#ffffff';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(139, 92, 246, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.4)';
            e.currentTarget.style.color = '#a78bfa';
          }}
        >
          <ArrowLeft size={16} />
          Back to Home
        </button>
      )}

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

      <div style={{ maxWidth: '80%', margin: '0 auto', position: 'relative', zIndex: 1 }}>
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
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
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
                      <Icon size={24} color={isActive ? '#ffffff' : '#ffffff'} />
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
        <WhyWeMade/>
      </div>
    </div>
  );
};

export default HowItWorks;
