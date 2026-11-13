// Build-time documents for crawlers and agents: <head> tags, JSON-LD, Markdown and llms.txt.
// Everything is derived from developerData and the translations, so the HTML, the Markdown
// and the structured data always state the same facts.
import i18n from '../i18n';
import developerData, { toIsoDate } from '../data/developerData';

export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://sebastian.i-can-do.it').replace(/\/$/, '');

export const PAGES = {
  en: { path: '/', markdown: '/index.md', locale: 'en_US' },
  pl: { path: '/pl/', markdown: '/pl/index.md', locale: 'pl_PL' },
};

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const CV_PDF_URL = `${SITE_URL}${developerData.cvUrl}`;

export const SAME_AS = [
  `https://www.${developerData.contact.linkedin}`,
  `https://${developerData.contact.github}`,
  `https://x.com/${developerData.contact.x.replace('@', '')}`,
];

const KNOWS_ABOUT = [
  'Distributed ledger technology',
  'Blockchain architecture',
  'Tokenised deposits',
  'Real-world asset tokenization',
  'Hyperledger Fabric',
  'Hyperledger Besu',
  'Ethereum',
  'Solidity',
  'Smart contracts',
  'Java',
  'Spring Boot',
  'Distributed systems',
];

const escapeAttr = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// JSON inside <script> must not be able to close the tag.
const safeJson = (value) => JSON.stringify(value, null, 2).replace(/</g, '\\u003c');

const withLanguage = async (lng, build) => {
  const previous = i18n.language;
  await i18n.changeLanguage(lng);
  try {
    return build(i18n.getFixedT(lng));
  } finally {
    await i18n.changeLanguage(previous);
  }
};

const currentJob = () => developerData.experience[0];

// "Warsaw, Poland" -> PostalAddress; Google's Event report wants an address, not just a place name.
const COUNTRY_CODES = { poland: 'PL', polska: 'PL' };
const toPostalAddress = (location) => {
  const [locality, country] = location.split(',').map((part) => part.trim());
  const addressCountry = country && (COUNTRY_CODES[country.toLowerCase()] || country);
  return { '@type': 'PostalAddress', addressLocality: locality, ...(addressCountry && { addressCountry }) };
};

const buildJsonLd = (lng, t, modified) => {
  const page = PAGES[lng];
  const pageUrl = `${SITE_URL}${page.path}`;
  const job = currentJob();

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${pageUrl}#profilepage`,
        url: pageUrl,
        name: t('seo.title'),
        description: t('seo.description'),
        inLanguage: lng,
        dateModified: modified,
        isPartOf: { '@id': WEBSITE_ID },
        mainEntity: { '@id': PERSON_ID },
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: `${SITE_URL}/`,
        name: developerData.name,
        inLanguage: Object.keys(PAGES),
      },
      {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: developerData.name,
        alternateName: 'Sebastian Strzalkowski',
        givenName: 'Sebastian',
        familyName: 'Strzałkowski',
        url: `${SITE_URL}/`,
        image: `${SITE_URL}/images/sebastian-photo.jpg`,
        jobTitle: job.position,
        description: t('seo.bio'),
        email: `mailto:${developerData.contact.email}`,
        worksFor: { '@type': 'Organization', name: job.company, url: 'https://www.gft.com' },
        hasOccupation: {
          '@type': 'Occupation',
          name: job.position,
          occupationLocation: { '@type': 'City', name: 'Warsaw' },
          skills: developerData.skills.map((skill) => skill.name).join(', '),
        },
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'Wojskowa Akademia Techniczna',
          alternateName: 'Military University of Technology in Warsaw',
          url: 'https://www.wat.edu.pl',
        },
        homeLocation: {
          '@type': 'Place',
          address: { '@type': 'PostalAddress', addressLocality: 'Warsaw', addressCountry: 'PL' },
        },
        knowsAbout: KNOWS_ABOUT,
        knowsLanguage: ['pl', 'en'],
        sameAs: SAME_AS,
        performerIn: developerData.conferences.map((conference) => ({
          '@type': 'Event',
          name: conference.name,
          startDate: toIsoDate(conference.date),
          endDate: toIsoDate(conference.date),
          eventStatus: 'https://schema.org/EventScheduled',
          eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
          description: conference.description,
          image: `${SITE_URL}${conference.image}`,
          location: {
            '@type': 'Place',
            name: conference.location,
            address: toPostalAddress(conference.location),
          },
          performer: { '@type': 'Person', '@id': PERSON_ID, name: developerData.name },
          ...(conference.organizers && {
            organizer: conference.organizers.map(({ name, url }) => ({ '@type': 'Organization', name, url })),
          }),
        })),
        hasCredential: developerData.trainings
          .filter((training) => training.certificate)
          .map((training) => ({
            '@type': 'EducationalOccupationalCredential',
            name: training.name,
            credentialCategory: 'certificate',
            dateCreated: toIsoDate(training.date),
            recognizedBy: { '@type': 'Organization', name: training.provider },
          })),
      },
    ],
  };
};

// Everything that goes between <head> tags except charset, viewport, icons and assets.
export const buildHead = (lng, { modified }) =>
  withLanguage(lng, (t) => {
    const page = PAGES[lng];
    const pageUrl = `${SITE_URL}${page.path}`;
    const title = t('seo.title');
    const description = t('seo.description');
    const otherLocales = Object.entries(PAGES).filter(([code]) => code !== lng);

    const tags = [
      `<title>${escapeAttr(title)}</title>`,
      `<meta name="description" content="${escapeAttr(description)}" />`,
      `<link rel="canonical" href="${pageUrl}" />`,
      ...Object.entries(PAGES).map(
        ([code, p]) => `<link rel="alternate" hreflang="${code}" href="${SITE_URL}${p.path}" />`
      ),
      `<link rel="alternate" hreflang="x-default" href="${SITE_URL}${PAGES.en.path}" />`,
      ...Object.entries(PAGES).map(
        ([code, p]) => `<link rel="alternate" type="text/markdown" hreflang="${code}" href="${SITE_URL}${p.markdown}" title="${escapeAttr(developerData.name)} (Markdown, ${code})" />`
      ),
      `<meta property="og:type" content="profile" />`,
      `<meta property="og:site_name" content="${escapeAttr(developerData.name)}" />`,
      `<meta property="og:title" content="${escapeAttr(title)}" />`,
      `<meta property="og:description" content="${escapeAttr(description)}" />`,
      `<meta property="og:url" content="${pageUrl}" />`,
      `<meta property="og:image" content="${SITE_URL}/images/og-image.jpg" />`,
      `<meta property="og:image:width" content="1200" />`,
      `<meta property="og:image:height" content="630" />`,
      `<meta property="og:image:alt" content="${escapeAttr(`${developerData.name}, ${developerData.title}`)}" />`,
      `<meta property="og:locale" content="${page.locale}" />`,
      ...otherLocales.map(([, p]) => `<meta property="og:locale:alternate" content="${p.locale}" />`),
      `<meta property="profile:first_name" content="Sebastian" />`,
      `<meta property="profile:last_name" content="Strzałkowski" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:site" content="${escapeAttr(developerData.contact.x)}" />`,
      `<meta name="twitter:title" content="${escapeAttr(title)}" />`,
      `<meta name="twitter:description" content="${escapeAttr(description)}" />`,
      `<meta name="twitter:image" content="${SITE_URL}/images/og-image.jpg" />`,
      `<script type="application/ld+json">\n${safeJson(buildJsonLd(lng, t, modified))}\n</script>`,
    ];

    return tags.map((tag) => `  ${tag}`).join('\n');
  });

// One Markdown document per language with the same facts as the page.
export const buildMarkdown = (lng, { lastmod }) =>
  withLanguage(lng, (t) => {
    const pl = lng === 'pl';
    const L = pl
      ? {
          contact: 'Kontakt', experience: 'Doświadczenie zawodowe', projects: 'Projekty',
          talks: 'Wystąpienia', trainings: 'Szkolenia i certyfikaty', education: 'Wykształcenie',
          skills: 'Technologie', role: 'Rola', tech: 'Technologie', provider: 'Organizator',
          updated: 'Aktualizacja', otherLang: 'English version', pdf: 'CV (PDF, po angielsku)', web: 'Strona',
        }
      : {
          contact: 'Contact', experience: 'Experience', projects: 'Projects',
          talks: 'Talks and conferences', trainings: 'Trainings and certificates', education: 'Education',
          skills: 'Technologies', role: 'Role', tech: 'Tech', provider: 'Provider',
          updated: 'Updated', otherLang: 'Wersja polska', pdf: 'CV (PDF, English)', web: 'Website',
        };
    const otherLng = pl ? 'en' : 'pl';
    const page = PAGES[lng];
    const c = developerData.contact;

    const lines = [
      `# ${developerData.name}`,
      '',
      `> ${t('seo.bio')}`,
      '',
      `${L.updated}: ${lastmod} · ${L.web}: ${SITE_URL}${page.path} · ${L.otherLang}: ${SITE_URL}${PAGES[otherLng].markdown} · ${L.pdf}: ${CV_PDF_URL}`,
      '',
      t('developerData.about', { years: developerData.yearsOfExperience }),
      '',
      `## ${L.contact}`,
      '',
      `- Email: ${c.email}`,
      `- LinkedIn: https://www.${c.linkedin}`,
      `- GitHub: https://${c.github}`,
      `- X: https://x.com/${c.x.replace('@', '')}`,
      `- Telegram: ${c.telegram}`,
      '',
      `## ${L.experience}`,
      '',
      ...developerData.experience.flatMap((exp) => [
        `### ${exp.position} · ${exp.company} (${exp.period})`,
        '',
        developerData.getExperienceDescription(exp.company),
        '',
      ]),
      `## ${L.projects}`,
      '',
      ...developerData.projects.flatMap((project) => [
        `### ${project.title}${project.role ? ` · ${project.role}` : ''} (${project.period})`,
        '',
        ...(project.url ? [project.url, ''] : []),
        developerData.getProjectDescription(project.title),
        '',
        `${L.tech}: ${developerData.getProjectTechnologies(project.title).join(', ')}`,
        '',
      ]),
      `## ${L.talks}`,
      '',
      ...developerData.conferences.flatMap((conference) => [
        `### ${conference.name} (${conference.date}, ${conference.location})`,
        '',
        conference.description,
        '',
      ]),
      `## ${L.trainings}`,
      '',
      ...developerData.trainings.map(
        (training) => `- **${training.name}**, ${training.provider} (${training.date}${training.duration ? `, ${training.duration}` : ''}): ${training.skills.join(', ')}`
      ),
      '',
      `## ${L.education}`,
      '',
      ...developerData.education.map((edu) => `- ${edu.degree}, ${edu.school}`),
      '',
      `## ${L.skills}`,
      '',
      [...developerData.skills.map((skill) => skill.name), ...developerData.additionalTech].join(', '),
      '',
    ];

    return lines.join('\n');
  });

// llms.txt (llmstxt.org): a short index pointing agents at the Markdown and the PDF.
export const buildLlmsTxt = () =>
  withLanguage('en', (t) => [
    `# ${developerData.name}`,
    '',
    `> ${t('seo.bio')}`,
    '',
    'Personal CV and portfolio. The same facts are on the HTML pages, in the Markdown versions below and in the PDF CV.',
    '',
    '## Profile',
    '',
    `- [CV in English (Markdown)](${SITE_URL}${PAGES.en.markdown}): experience, projects, talks, trainings, education and contact`,
    `- [CV po polsku (Markdown)](${SITE_URL}${PAGES.pl.markdown}): the same content in Polish`,
    `- [CV (PDF, English)](${CV_PDF_URL}): printable three-page CV`,
    `- [Website (English)](${SITE_URL}${PAGES.en.path})`,
    `- [Strona (polski)](${SITE_URL}${PAGES.pl.path})`,
    '',
    '## Elsewhere',
    '',
    ...SAME_AS.map((url) => `- ${url}`),
    '',
    '## Contact',
    '',
    `- Email: ${developerData.contact.email}`,
    '',
  ].join('\n'));
