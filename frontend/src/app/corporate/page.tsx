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
                <div className={styles.cardIcon}>🧠</div>
                <h3 className={styles.cardTitle}>Gemini Auto-Alphas</h3>
                <p className={styles.cardDesc}>
                    Tap into Google's Gemini 1.5 Pro directly inside your matrix. Issue natural language prompts and instantly receive complex statistical trading formulas mapped to real-world anomalies.
                </p>
            </div>
            <div className={styles.glassCard}>
                <div className={styles.cardIcon}>⚡</div>
                <h3 className={styles.cardTitle}>Sub-Second Latency</h3>
                <p className={styles.cardDesc}>
                    Our Next.js Turbopack Edge interface pulls from FastAPI WebSockets, streaming OHLCV orderbook data to the screen natively in sub-millisecond intervals.
                </p>
            </div>
            <div className={styles.glassCard}>
                <div className={styles.cardIcon}>🛡️</div>
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
