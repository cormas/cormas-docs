import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import CodeBlock from '@theme/CodeBlock';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HeroCarousel from '../components/HeroCarousel';

import styles from './index.module.css';

const heroScreens = [
  '/img/models/firefighters.png',
  '/img/models/robot-forager.png',
  '/img/models/conway.png',
];

export default function Home() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Layout
      title={siteConfig.title}
      description="Open-source platform for companion modelling; multi-agent simulations of common-pool resources and collective action.">
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <img
            src="/img/logo.svg"
            alt="Cormas logo"
            className={styles.logo}
            loading="eager"
          />
          <h1 className={styles.title}>Companion Modelling, Powered by Agents</h1>
          <p className={styles.tagline}>
            Cormas is an open-source platform for companion modelling, focused on multi-agent simulations of
            common-pool resources and collective action.
          </p>
          <div className={styles.ctaRow}>
            <Link className={`${styles.primaryBtn} button button--lg`} to="/download">
              Download
            </Link>
            <Link className={`${styles.secondaryBtn} button button--lg`} to="/docs/tutorials">
              Quickstart
            </Link>
            <Link className={`${styles.secondaryBtn} button button--lg`} to="/docs/models">
              Models
            </Link>
          </div>
        </div>
        <div className={styles.heroRight}>
          {/* Replace src with real screenshots or illustrations */}
          <HeroCarousel images={heroScreens} />
        </div>
      </section>

      {/* PHOTO STRIP — minimal & responsive */}
      <section className={styles.section}>
        <h2>In the field & in the lab</h2>
        <p style={{fontSize: 16, margin: '0 auto 24px', opacity: 0.85}}>
          Drawing on decades of field experience, Cormas has grown into a powerful platform for participatory modelling. It enables researchers and stakeholders to co-create simulations, fostering dialogue, learning, and empowering communities to drive their own social transformations.
        </p>
        <div className={styles.photoGrid}>
          <div className={styles.photoItem}>
            <img
              src="/img/photos/photo1.png"
              alt="Companion modelling workshop"
              className={styles.photoImg}
              loading="lazy"
              decoding="async"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              srcSet="/img/photos/photo1.png 900w, /img/photos/photo1@2x.png 1800w"
            />
          </div>
          <div className={styles.photoItem}>
            <img
              src="/img/photos/photo2.jpg"
              alt="Agent-based model in action"
              className={styles.photoImg}
              loading="lazy"
              decoding="async"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              srcSet="/img/photos/photo2.jpg 900w, /img/photos/photo2@2x.jpg 1800w"
            />
          </div>
          <div className={styles.photoItem}>
            <img
              src="/img/photos/photo3.png"
              alt="Fieldwork on CPRs"
              className={styles.photoImg}
              loading="lazy"
              decoding="async"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              srcSet="/img/photos/photo3.png 900w, /img/photos/photo3@2x.png 1800w"
            />
          </div>
        </div>
      </section>

      {/* PHARO SECTION */}
      <section className={styles.section}>
        <h2>Powered by Pharo</h2>
        <p style={{fontSize: 16, margin: '0 auto 24px', opacity: 0.85}}>
          Cormas models are built in <strong>Pharo</strong> — a modern, pure object-oriented programming language and a live immersive environment. Pharo empowers modellers with immediate feedback, exploratory programming, and elegant syntax.
        </p>
        <CodeBlock language="smalltalk">
{`step
    <action>
    self consumeEnergy; move; eat.

    self energy >= self class fertilityThreshold
        ifTrue: [ self reproduce ].
		
    self energy <= 0
        ifTrue: [ self die ]`}
      </CodeBlock>
      </section>

      {/* FEATURES */}
      <section className={styles.section} style={{paddingBottom: 64}}>
        <h2>Why Cormas?</h2>
        <div className={styles.features}>
          <article className={styles.featureCard}>
            <h3>Different Points of View</h3>
            <p>
              Built to support Companion Modelling (ComMod) approaches where researchers and stakeholders co-create
              models to explore scenarios, trade-offs, and collective action.
            </p>
            <div className={styles.photoItem}>
              <img
                src="/img/features/pov.png"
                alt="Different points of view"
                className={styles.photoImg}
                loading="lazy"
                decoding="async"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                srcSet="/img/features/pov.png 900w, /img/features/pov@2x.png 1800w"
              />
            </div>
          </article>
          <article className={styles.featureCard}>
            <h3>Live Inspection & Interaction</h3>
            <p>
              A modern, open platform for agent-based simulations of common-pool resources with transparent,
              inspectable models and reproducible workflows.
            </p>
            <div className={styles.photoItem}>
              <img
                src="/img/features/inspect.png"
                alt="Live inspection and interaction"
                className={styles.photoImg}
                loading="lazy"
                decoding="async"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                srcSet="/img/features/inspect.png 900w, /img/features/inspect@2x.png 1800w"
              />
            </div>
          </article>
          <article className={styles.featureCard}>
            <h3>Stepping Back in Time</h3>
            <p>
              Connect models to interactive serious-game interfaces for workshops, teaching, and decision support.
            </p>
            <div className={styles.photoItem}>
              <img
                src="/img/features/stepBack.png"
                alt="Stepping back in time"
                className={styles.photoImg}
                loading="lazy"
                decoding="async"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                srcSet="/img/features/stepBack.png 900w, /img/features/stepBack@2x.png 1800w"
              />
            </div>
          </article>
        </div>
      </section>

      {/* CTA BAND */}
      {/* <section style={{background: '#1E6E2B', color: 'white', padding: '40px 0'}}>
        <div style={styles.section}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16}}>
            <div style={{flex: '1 1 420px'}}>
              <h2 style={{margin: 0}}>Ready to build your model?</h2>
              <p style={{margin: '8px 0 0', opacity: 0.9}}>Follow the Quickstart or browse examples to jump in.</p>
            </div>
            <div style={{display: 'flex', gap: 12}}>
              <Link className="button button--lg" style={{...styles.primaryBtn, background: '#D71971'}} to="/docs/examples">Examples</Link>
              <Link className="button button--lg" style={styles.secondaryBtn} to="/docs">Documentation</Link>
            </div>
          </div>
        </div>
      </section> */}
    </Layout>
  );
}