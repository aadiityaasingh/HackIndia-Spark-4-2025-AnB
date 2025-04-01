import React from 'react';
import { animations } from '../animations';

const About = () => {
  const themeColors = {
    primary: '#0ea5e9',
    secondary: '#0284c7',
    accent: '#38bdf8',
    text: '#0f172a',
    textLight: '#475569',
    white: '#ffffff',
  };

  return (
    <div style={{
      padding: '40px 20px',
      maxWidth: '1200px',
      margin: '0 auto',
      ...animations.fadeIn
    }}>
      <h1 style={{ 
        fontSize: '3em', 
        marginBottom: '40px',
        color: themeColors.text,
        textAlign: 'center',
        fontWeight: '700',
      }}>
        About ZK-SEAL
      </h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '32px',
        marginBottom: '60px',
      }}>
        <div style={{
          background: themeColors.white,
          padding: '32px',
          borderRadius: '16px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}>
          <h2 style={{ 
            fontSize: '1.5em', 
            marginBottom: '16px', 
            color: themeColors.primary,
            fontWeight: '600'
          }}>
            Zero-Knowledge Proof Technology
          </h2>
          <div style={{ flex: 1 }}>
            <p style={{ 
              fontSize: '1.1em', 
              lineHeight: '1.6', 
              color: themeColors.textLight,
              marginBottom: '16px'
            }}>
              Our platform leverages cutting-edge Zero-Knowledge Proof technology to verify your identity
              without exposing sensitive information. This ensures maximum privacy while maintaining
              security and trust.
            </p>
            <p style={{ 
              fontSize: '1.1em', 
              lineHeight: '1.6', 
              color: themeColors.textLight 
            }}>
              ZKP allows us to prove the validity of your information without revealing the actual data,
              making it perfect for secure identity verification and transaction validation.
            </p>
          </div>
        </div>

        <div style={{
          background: themeColors.white,
          padding: '32px',
          borderRadius: '16px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}>
          <h2 style={{ 
            fontSize: '1.5em', 
            marginBottom: '16px', 
            color: themeColors.primary,
            fontWeight: '600'
          }}>
            Ethereum Blockchain Integration
          </h2>
          <div style={{ flex: 1 }}>
            <p style={{ 
              fontSize: '1.1em', 
              lineHeight: '1.6', 
              color: themeColors.textLight,
              marginBottom: '16px'
            }}>
              Built on the Ethereum blockchain, our verification system ensures:
            </p>
            <ul style={{ 
              listStyle: 'none', 
              padding: '0', 
              marginTop: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              marginBottom: '16px'
            }}>
              <li style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                color: themeColors.textLight
              }}>
                <span>🔒</span> Complete privacy of your transaction data
              </li>
              <li style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                color: themeColors.textLight
              }}>
                <span>⚡</span> Lightning-fast verification on the Ethereum network
              </li>
              <li style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                color: themeColors.textLight
              }}>
                <span>🛡️</span> Immutable and secure transaction records
              </li>
            </ul>
            <p style={{ 
              fontSize: '1.1em', 
              lineHeight: '1.6', 
              color: themeColors.textLight
            }}>
              By leveraging Ethereum's smart contracts and ZKP technology, we provide a secure and
              efficient verification system that's both transparent and private.
            </p>
          </div>
        </div>

        <div style={{
          background: themeColors.white,
          padding: '32px',
          borderRadius: '16px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}>
          <h2 style={{ 
            fontSize: '1.5em', 
            marginBottom: '16px', 
            color: themeColors.primary,
            fontWeight: '600'
          }}>
            Security & Privacy
          </h2>
          <div style={{ flex: 1 }}>
            <p style={{ 
              fontSize: '1.1em', 
              lineHeight: '1.6', 
              color: themeColors.textLight,
              marginBottom: '16px'
            }}>
              Your data is protected by state-of-the-art encryption and verification protocols.
              We never store sensitive information, ensuring your privacy is maintained
              throughout the verification process.
            </p>
            <p style={{ 
              fontSize: '1.1em', 
              lineHeight: '1.6', 
              color: themeColors.textLight 
            }}>
              Our system uses advanced cryptographic techniques to ensure that your personal
              information remains secure and private, while still allowing for seamless
              verification and transaction processing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 