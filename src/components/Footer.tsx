import React from 'react';
import { Heart, Github, Linkedin, Lock } from "lucide-react";
import '../index.css'; // Ensure styling integration if needed specifically

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/kartikeykumar09",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com/in/kartikeykumar09",
    }
  ];

  return (
    <footer className="footer-container" style={{
        marginTop: 'auto',
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
        padding: '24px',
        fontSize: '0.85rem',
        color: 'var(--text-muted)'
    }}>
      <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
      }}>
        {/* Top Row: Links and Branding */}
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Lock size={14} className="text-secondary" />
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Cupcake Playground</span>
                <span>by Kartikey Kumar</span>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
                {socialLinks.map(({ name, icon: Icon, url }) => (
                    <a 
                        key={name} 
                        href={url} 
                        target="_blank" 
                        rel="noreferrer"
                        style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '6px',
                            color: 'var(--text-secondary)',
                            textDecoration: 'none',
                            transition: 'color 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-blue)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                    >
                        <Icon size={14} />
                        <span>{name}</span>
                    </a>
                ))}
            </div>
        </div>

        {/* Bottom Row: Copyright */}
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid var(--border-color)',
            paddingTop: '16px',
            fontSize: '0.75rem'
        }}>
            <div>
                 © {currentYear} Open Source Demo.
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span>Made with</span>
                <Heart size={12} className="text-accent-red" fill="currentColor" />
                <span>for the AI Community</span>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
