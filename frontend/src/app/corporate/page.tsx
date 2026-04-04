'use client';

import React from 'react';
import styles from './page.module.css';

export default function CorporatePage() {
  return (
    <div className={styles.container}>
        {/* Animated Synthethic Grid Layer */}
        <div className={styles.ambientGrid} />
        <div className={styles.ambientGlow} />

        <nav className={styles.nav}>
            <div className={styles.logo}>QuantX<span>OS</span></div>
            <a href="http://iqxos.com" className={styles.secondaryBtn} style={{ padding: '0.5rem 1.5rem', fontSize: '0.85rem' }}>
                Foundry Access
            </a>
        </nav>

        <section className={styles.hero}>
            <div className={styles.badge}>Next-Gen Infrastructure</div>
            <h1 className={styles.title}>The Institutional<br />Intelligence Layer</h1>
            <p className={styles.subtitle}>
                QuantX is a hyper-scalable, glassmorphic analytics framework engineered 
                for elite hedge funds and systemic algorithmic generation.
            </p>
            <div className={styles.ctaContainer}>
                <a href="#early-access" className={styles.primaryBtn}>Request Early Access</a>
                <a href="http://iqxos.com" className={styles.secondaryBtn}>View Live Matrix</a>
            </div>
        </section>

        <section className={styles.features}>
            <div className={styles.glassCard}>
                <div className={styles.cardIcon}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
                        <circle cx="12" cy="12" r="3" />
                        <path d="M12 22V15M12 2v7M2 8.5l6 3.5M22 8.5l-6 3.5M2 15.5l6-3.5M22 15.5l-6-3.5" />
                    </svg>
                </div>
                <h3 className={styles.cardTitle}>Gemini Auto-Alphas</h3>
                <p className={styles.cardDesc}>
                    Tap into Google's Gemini 1.5 Pro directly inside your matrix. Issue natural language prompts and instantly receive complex statistical trading formulas mapped to real-world anomalies.
                </p>
            </div>
            <div className={styles.glassCard}>
                <div className={styles.cardIcon}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                        <path d="M2 12h4l3-8 5 16 3-8h5" strokeLinejoin="round" strokeLinecap="round"/>
                    </svg>
                </div>
                <h3 className={styles.cardTitle}>Sub-Second Latency</h3>
                <p className={styles.cardDesc}>
                    Our Next.js Turbopack Edge interface pulls from FastAPI WebSockets, streaming OHLCV orderbook data to the screen natively in sub-millisecond intervals.
                </p>
            </div>
            <div className={styles.glassCard}>
                <div className={styles.cardIcon}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        <circle cx="12" cy="16" r="1.5" fill="currentColor"/>
                    </svg>
                </div>
                <h3 className={styles.cardTitle}>Federated Security</h3>
                <p className={styles.cardDesc}>
                    Powered by zero-trust Workload Identity Federation, QuantX never stores long-lived keys. Continuous integration ensures bleeding edge updates safely reach the cluster.
                </p>
            </div>
        </section>

        <section id="early-access" className={styles.waitlist}>
            <h2 className={styles.waitlistTitle}>Join The Protocol</h2>
            <p className={styles.subtitle} style={{ marginBottom: '1rem'}}>
                Reserve your slot for the closed beta deployment of QuantX Phase II.
            </p>
            <form className={styles.waitlistForm} onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="institutional@email.com" className={styles.inputField} required />
                <button type="submit" className={styles.primaryBtn}>Initialize</button>
            </form>
        </section>
    </div>
  )
}
