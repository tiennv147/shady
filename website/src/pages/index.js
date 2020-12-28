import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: 'Fast, scalable',
    imageUrl: 'img/shady_scalable.svg',
    description: (
      <>
        • Distributed (multi-process) architecture, can be easily scale up<br></br>
        • Flexible server extension<br></br>
        • Full performance optimization and test<br></br>
      </>
    ),
  },
  {
    title: 'Easy to Use',
    imageUrl: 'img/shady_easy_to_use.svg',
    description: (
      <>
        • Simple API: request, response, broadcast, etc.<br></br>
        • Lightweight: high development efficiency based on Golang.<br></br>
        • Convention over configuration: almost zero config.<br></br>
      </>
    ),
  },
  {
    title: 'Complete support of game server',
    imageUrl: 'img/shady_support_game.svg',
    description: (
      <>
        • Multiple-player game: mobile, social, web, MMO rpg(middle size).<br></br>
        • Realtime application: chat, message push, etc.<br></br>
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`${siteConfig.title} - ${siteConfig.tagline}`}
      description={`${siteConfig.tagline}`}>
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/')}>
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
