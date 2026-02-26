import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Github, Linkedin, Twitter, MapPin, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import { personal, social } from '../data/portfolio';

const socialLinks = [
  { icon: <Github size={20} />, href: social.github, label: 'GitHub' },
  { icon: <Linkedin size={20} />, href: social.linkedin, label: 'LinkedIn' },
  { icon: <Twitter size={20} />, href: social.twitter, label: 'Twitter' },
  { icon: <Mail size={20} />, href: `mailto:${personal.email}`, label: 'Email' },
].filter(s => s.href);

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null); // 'sending' | 'success' | 'error'

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate form submission (replace with your backend/EmailJS/Formspree)
    await new Promise(r => setTimeout(r, 1500));
    setStatus('success');
    setTimeout(() => {
      setForm({ name: '', email: '', subject: '', message: '' });
      setStatus(null);
    }, 3000);
  };

  return (
    <section id="contact" style={{ padding: 'clamp(80px, 10vw, 120px) 24px', position: 'relative' }}>
      <div className="glow-orb-cyan" style={{
        position: 'absolute', left: '40%', top: '0%',
        width: '500px', height: '500px', opacity: 0.15, pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '64px', textAlign: 'center' }}
        >
          <span className="section-label">
            <MessageSquare size={12} />
            Get in Touch
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginTop: '12px',
          }}>
            Let's <span className="gradient-text-cyan">work together</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', marginTop: '14px', maxWidth: '480px', margin: '14px auto 0' }}>
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>
        </motion.div>

        {/* Two-column: Form + Info */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
          alignItems: 'start',
        }}>
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="glass-card"
            style={{ padding: '36px' }}
          >
            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <CheckCircle size={52} style={{ color: '#22c55e', margin: '0 auto 16px' }} />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, marginBottom: '8px' }}>Message Sent!</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>Thanks for reaching out. I'll get back to you soon!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: '8px', letterSpacing: '0.04em' }}>
                      NAME
                    </label>
                    <input
                      className="form-input"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: '8px', letterSpacing: '0.04em' }}>
                      EMAIL
                    </label>
                    <input
                      className="form-input"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: '8px', letterSpacing: '0.04em' }}>
                    SUBJECT
                  </label>
                  <input
                    className="form-input"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Project Collaboration"
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: '8px', letterSpacing: '0.04em' }}>
                    MESSAGE
                  </label>
                  <textarea
                    className="form-input"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    rows={5}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary"
                  style={{
                    justifyContent: 'center',
                    opacity: status === 'sending' ? 0.7 : 1,
                    cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                  }}
                >
                  {status === 'sending' ? (
                    <>
                      <div style={{ width: 16, height: 16, border: '2px solid rgba(0,0,0,0.3)', borderTopColor: '#000', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Info + Socials */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          >
            {/* Info Card */}
            <div className="glass-card" style={{ padding: '28px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '20px' }}>
                Contact Information
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '10px',
                    background: 'rgba(76,230,255,0.08)', border: '1px solid rgba(76,230,255,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--accent-cyan)', flexShrink: 0,
                  }}>
                    <Mail size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '2px' }}>Email</div>
                    <a href={`mailto:${personal.email}`} style={{ color: '#fff', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>
                      {personal.email}
                    </a>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '10px',
                    background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--accent-purple)', flexShrink: 0,
                  }}>
                    <MapPin size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '2px' }}>Location</div>
                    <span style={{ color: '#fff', fontSize: '14px', fontWeight: 500 }}>{personal.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links Card */}
            <div className="glass-card" style={{ padding: '28px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '20px' }}>
                Find Me Online
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', gap: '12px',
                      padding: '12px 16px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: '100px', // Updated to match other pills
                      color: 'rgba(255,255,255,0.7)',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontWeight: 500,
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(76,230,255,0.06)';
                      e.currentTarget.style.borderColor = 'rgba(76,230,255,0.2)';
                      e.currentTarget.style.color = '#fff';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                      e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                    }}
                  >
                    <span style={{ color: 'var(--accent-cyan)' }}>{link.icon}</span>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="glass-card" style={{
              padding: '20px 24px',
              background: 'linear-gradient(135deg, rgba(76,230,255,0.05), rgba(99,102,241,0.05))',
              border: '1px solid rgba(76,230,255,0.15)',
              borderRadius: '24px' // Consistent radius
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: 10, height: 10, borderRadius: '50%', background: '#22c55e',
                  boxShadow: '0 0 8px rgba(34,197,94,0.5)',
                  animation: 'pulse 2s infinite',
                }} />
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>Available for new opportunities</span>
              </div>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', marginTop: '8px', marginLeft: '20px' }}>
                Open to full-time roles and freelance projects.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px rgba(34,197,94,0.5); }
          50% { opacity: 0.7; box-shadow: 0 0 16px rgba(34,197,94,0.8); }
        }
      `}</style>
    </section>
  );
}
