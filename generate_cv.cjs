const fs = require('fs');
const { execSync } = require('child_process');

// 1. Read Markdown content
const mdContent = fs.readFileSync('CV_Sebastian_Strzalkowski.md', 'utf8');

// 2. Convert Markdown to HTML using pandoc
const pandocCmd = 'pandoc CV_Sebastian_Strzalkowski.md -f markdown -t html --section-divs';
let htmlBody = execSync(pandocCmd, { encoding: 'utf8' });

// 3. Clean up whitespace inside headers
htmlBody = htmlBody.replace(/<h3([^>]*)>([\s\S]*?)<\/h3>/g, (m, attrs, content) => {
  return `<h3${attrs}>${content.replace(/\r?\n\s*/g, ' ').trim()}</h3>`;
});

// 4. Uniformly transform all 12 job and project headers
const entryRegex = /<h3[^>]*><strong>(.*?)<\/strong>\s*(\(<a[^>]+>.*?<\/a>\))?\s*—\s*([\s\S]*?)<\/h3>\s*<p><em>([^<]+)<\/em>(\s*\|\s*([^<]+))?<\/p>/g;

htmlBody = htmlBody.replace(entryRegex, (match, company, link, role, date, locPipe, location) => {
  const companyClean = company.trim();
  const linkClean = link ? link.trim() : '';
  const roleClean = role.replace(/\r?\n\s*/g, ' ').trim();
  const dateClean = date.trim();
  const locClean = location ? location.trim() : '';

  let metaHtml = `<span class="date">${dateClean}</span>`;
  if (locClean) {
    metaHtml += ` <span class="divider">|</span> <span class="location">${locClean}</span>`;
  }

  let titleHtml = `<span class="company">${companyClean}</span>`;
  if (linkClean) {
    titleHtml += ` <span class="project-link">${linkClean}</span>`;
  }
  titleHtml += ` <span class="divider">—</span> <span class="role">${roleClean}</span>`;

  return `<div class="item-header"><div class="item-title">${titleHtml}</div><div class="item-meta">${metaHtml}</div></div>`;
});

// 5. Format Environment: and Tech Stack: inside bullet lists (clean plain text bold)
htmlBody = htmlBody.replace(
  /<li><strong>Environment:<\/strong>\s*([\s\S]*?)<\/li>/g,
  '<li class="tech-item"><strong class="tech-label">Environment:</strong> <span class="tech-desc">$1</span></li>'
);
htmlBody = htmlBody.replace(
  /<li><strong>Tech Stack:<\/strong>\s*([\s\S]*?)<\/li>/g,
  '<li class="tech-item"><strong class="tech-label">Tech Stack:</strong> <span class="tech-desc">$1</span></li>'
);

// 6. Format Conferences section into cards
htmlBody = htmlBody.replace(
  /<section id="public-speaking-conferences"[\s\S]*?<\/section>/,
  (fullMatch) => {
    const items = [];
    const itemRegex = /<li><strong>(.*?)<\/strong>\s*\((?:<em>)?([0-9.]+)(?:<\/em>)?\s*\|\s*([\s\S]*?)\)<br \/>\s*<em>([\s\S]*?)<\/em>\s*([\s\S]*?)<\/li>/g;
    let m;
    while ((m = itemRegex.exec(fullMatch)) !== null) {
      items.push({
        name: m[1].replace(/\r?\n\s*/g, ' ').trim(),
        date: m[2].trim(),
        location: m[3].replace(/\r?\n\s*/g, ' ').trim(),
        role: m[4].replace(/\r?\n\s*/g, ' ').trim(),
        desc: m[5].replace(/\r?\n\s*/g, ' ').trim()
      });
    }

    if (items.length === 0) return fullMatch;

    const cardsHtml = items.map(it => `
<div class="conf-item">
  <div class="conf-header">
    <div class="conf-name"><strong>${it.name}</strong></div>
    <div class="conf-meta"><span class="date">${it.date}</span> <span class="divider">|</span> <span class="location">${it.location}</span></div>
  </div>
  <div class="conf-body"><span class="conf-role">${it.role}</span> <span class="conf-desc">${it.desc}</span></div>
</div>`).join('\n');

    return `<section id="public-speaking-conferences" class="level2">
<h2>Public Speaking &amp; Conferences</h2>
<div class="conf-list">
${cardsHtml}
</div>
</section>`;
  }
);

// 7. Format Certifications section into cards (clean plain text, no colored pills)
htmlBody = htmlBody.replace(
  /<section id="continuous-professional-development-certifications"[\s\S]*?<\/section>/,
  (fullMatch) => {
    const items = [];
    const certRegex = /<li><strong>([\s\S]*?)<\/strong>\s*\|\s*([\s\S]*?)\s*\((?:<em>)?([0-9.]+)(?:<\/em>)?\s*•\s*([\s\S]*?)\s*•\s*<strong>Certified<\/strong>\s*\)<br \/>\s*<em>Focus:<\/em>\s*([\s\S]*?)<\/li>/g;
    let m;
    while ((m = certRegex.exec(fullMatch)) !== null) {
      items.push({
        title: m[1].replace(/\r?\n\s*/g, ' ').trim(),
        provider: m[2].replace(/\r?\n\s*/g, ' ').trim(),
        date: m[3].trim(),
        duration: m[4].replace(/\r?\n\s*/g, ' ').trim(),
        focus: m[5].replace(/\r?\n\s*/g, ' ').trim()
      });
    }

    if (items.length === 0) return fullMatch;

    const cardsHtml = items.map(it => `
<div class="cert-item">
  <div class="cert-header">
    <div class="cert-left">
      <span class="cert-title"><strong>${it.title}</strong></span>
      <span class="divider">•</span>
      <span class="cert-provider">${it.provider}</span>
      <span class="divider">•</span>
      <span class="cert-status">Certified</span>
    </div>
    <div class="cert-meta">${it.date} • ${it.duration}</div>
  </div>
  <div class="cert-focus"><strong class="focus-label">Focus:</strong> <span class="focus-desc">${it.focus}</span></div>
</div>`).join('\n');

    return `<section id="continuous-professional-development-certifications" class="level2">
<h2>Continuous Professional Development &amp; Certifications</h2>
<div class="cert-list">
${cardsHtml}
</div>
</section>`;
  }
);

// 8. Clean up Education section presentation
htmlBody = htmlBody.replace(
  /<section id="education"[\s\S]*?<\/section>/,
  `<section id="education" class="level2">
<h2>Education</h2>
<div class="edu-card">
  <div class="edu-header">
    <div class="edu-title"><strong>Military University of Technology in Warsaw</strong> <span class="edu-native">(Wojskowa Akademia Techniczna w Warszawie)</span></div>
    <div class="edu-location">Warsaw, Poland</div>
  </div>
  <div class="edu-degree"><strong>Bachelor of Science in Engineering (B.Sc. Eng.) — Electronics and Telecommunications</strong></div>
  <div class="edu-detail">Degree equivalent: <em>Inżynier Elektroniki i Telekomunikacji</em></div>
</div>
</section>`
);

const styledHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sebastian Strzałkowski - Senior DLT Engineer & Blockchain Architect - CV</title>
<style>
  @page {
    size: A4;
    margin: 11mm 15mm 11mm 15mm;
  }

  * {
    box-sizing: border-box;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 8.85pt;
    line-height: 1.36;
    color: #1e293b;
    background: #ffffff;
    margin: 0;
    padding: 0;
    text-align: left;
  }

  /* Candidate Top Header */
  section#sebastian-strzałkowski {
    text-align: left;
  }

  section#sebastian-strzałkowski > h1 {
    font-size: 23pt;
    font-weight: 800;
    color: #064e3b;
    margin: 0 0 2px 0;
    letter-spacing: -0.025em;
    line-height: 1.1;
    text-align: center;
  }

  section#sebastian-strzałkowski > h3 {
    font-size: 11.5pt;
    font-weight: 700;
    color: #047857;
    margin: 0 0 5px 0;
    letter-spacing: 0.01em;
    text-align: center;
  }

  section#sebastian-strzałkowski > p:nth-of-type(1) {
    font-size: 8.6pt;
    color: #475569;
    margin: 0 0 10px 0;
    line-height: 1.45;
    text-align: center;
    border-bottom: 2px solid #059669;
    padding-bottom: 8px;
  }

  section#sebastian-strzałkowski hr {
    display: none;
  }

  /* Section Headings */
  h2 {
    font-size: 9.7pt;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #065f46;
    border-bottom: 1.2px solid #059669;
    padding-bottom: 2px;
    margin-top: 10px;
    margin-bottom: 5px;
    text-align: left;
    break-after: avoid;
    page-break-after: avoid;
  }

  section.level2 {
    margin-bottom: 6px;
    text-align: left;
  }

  section.level2 hr {
    display: none;
  }

  /* Professional Summary */
  section#professional-summary p {
    font-size: 8.65pt;
    line-height: 1.38;
    color: #334155;
    margin: 0 0 4px 0;
    text-align: left;
  }

  /* Core Competencies */
  section#core-competencies-technical-skills ul {
    list-style: none;
    padding-left: 0;
    margin: 3px 0 5px 0;
  }

  section#core-competencies-technical-skills li {
    font-size: 8.4pt;
    line-height: 1.35;
    margin-bottom: 3px;
    padding-left: 12px;
    position: relative;
    text-align: left;
  }

  section#core-competencies-technical-skills li::before {
    content: "▪";
    position: absolute;
    left: 0;
    color: #059669;
    font-size: 9pt;
    top: -1px;
  }

  section#core-competencies-technical-skills strong {
    color: #064e3b;
    font-weight: 700;
  }

  /* PAGE BREAK CONTROL */
  /* Page 2 begins with Inetum - IoT */
  section#inetum---iot-software-developer {
    break-before: page;
    page-break-before: always;
  }

  /* Page 3 begins with Public Speaking & Conferences */
  section#public-speaking-conferences {
    break-before: page;
    page-break-before: always;
  }

  /* Job & Project Entries */
  section.level3 {
    break-inside: avoid;
    page-break-inside: avoid;
    margin-bottom: 6px;
    text-align: left;
  }

  .item-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-top: 5px;
    margin-bottom: 2px;
    border-bottom: 1px dashed #e2e8f0;
    padding-bottom: 2px;
  }

  .item-title {
    font-size: 9.2pt;
  }

  .item-title .company {
    font-weight: 750;
    color: #0f172a;
  }

  .item-title .role {
    font-weight: 650;
    color: #047857;
  }

  .item-title .divider, .item-meta .divider, .cert-left .divider {
    color: #94a3b8;
    font-weight: 400;
    margin: 0 3px;
  }

  .project-link a {
    font-size: 8.1pt;
    font-weight: 500;
    color: #0d9488;
  }

  .item-meta {
    font-size: 8.15pt;
    color: #64748b;
    white-space: nowrap;
  }

  .item-meta .date {
    font-style: italic;
    color: #475569;
    font-weight: 500;
  }

  .item-meta .location {
    color: #64748b;
  }

  ul {
    margin: 2px 0 3px 0;
    padding-left: 15px;
    text-align: left;
  }

  li {
    font-size: 8.35pt;
    line-height: 1.34;
    color: #334155;
    margin-bottom: 1.5px;
    text-align: left;
  }

  strong {
    font-weight: 650;
    color: #0f172a;
  }

  em {
    font-style: italic;
    color: #475569;
  }

  .tech-item {
    list-style-type: none;
    margin-top: 2px;
    margin-left: -15px;
    padding-left: 0;
    font-size: 8.1pt;
  }

  .tech-label {
    font-size: 8.1pt;
    color: #064e3b;
    font-weight: 700;
    margin-right: 4px;
  }

  .tech-desc, .focus-desc {
    color: #475569;
    font-size: 8.1pt;
  }

  /* Links */
  a {
    color: #047857;
    text-decoration: none;
    font-weight: 500;
  }

  a:hover {
    text-decoration: underline;
  }

  /* Conferences Cards */
  .conf-list {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin: 4px 0 8px 0;
  }
  .conf-item {
    break-inside: avoid;
    page-break-inside: avoid;
    padding: 2px 0;
  }
  .conf-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-size: 8.7pt;
    margin-bottom: 1.5px;
  }
  .conf-name strong {
    color: #0f172a;
    font-weight: 700;
  }
  .conf-meta {
    font-size: 8.15pt;
    color: #64748b;
    white-space: nowrap;
  }
  .conf-meta .date {
    font-style: italic;
    color: #475569;
  }
  .conf-body {
    font-size: 8.25pt;
    line-height: 1.34;
    color: #334155;
  }
  .conf-role {
    font-weight: 600;
    color: #047857;
    font-style: italic;
  }

  /* Certifications Cards */
  .cert-list {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin: 4px 0 8px 0;
  }
  .cert-item {
    break-inside: avoid;
    page-break-inside: avoid;
    padding: 2px 0;
  }
  .cert-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-size: 8.7pt;
    margin-bottom: 1.5px;
  }
  .cert-left {
    display: flex;
    align-items: center;
    gap: 3px;
  }
  .cert-title strong {
    color: #0f172a;
  }
  .cert-provider {
    color: #047857;
    font-weight: 600;
    font-size: 8.25pt;
  }
  .cert-status {
    color: #047857;
    font-weight: 600;
    font-size: 8.15pt;
  }
  .cert-meta {
    font-size: 8.15pt;
    color: #64748b;
    font-style: italic;
    white-space: nowrap;
  }
  .cert-focus {
    font-size: 8.2pt;
    line-height: 1.34;
  }
  .focus-label {
    font-size: 8.2pt;
    color: #064e3b;
    font-weight: 700;
    margin-right: 4px;
  }

  /* Education block */
  .edu-card {
    margin: 4px 0;
    padding: 4px 0;
  }
  .edu-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-size: 8.9pt;
  }
  .edu-native {
    font-size: 8.2pt;
    color: #64748b;
  }
  .edu-location {
    font-size: 8.2pt;
    color: #64748b;
  }
  .edu-degree {
    font-size: 8.6pt;
    color: #047857;
    margin-top: 1.5px;
  }
  .edu-detail {
    font-size: 8.15pt;
    color: #64748b;
    margin-top: 1.5px;
  }

  /* GDPR block */
  section#data-protection-clause-gdpr {
    margin-top: 14px;
    padding-top: 6px;
    border-top: 1px solid #cbd5e1;
    break-inside: avoid;
  }

  section#data-protection-clause-gdpr h2 {
    display: none;
  }

  section#data-protection-clause-gdpr p {
    font-size: 7pt;
    color: #64748b;
    line-height: 1.35;
    font-style: italic;
    margin: 0;
    text-align: justify;
  }

  @media screen {
    html {
      background: #0f172a;
      padding: 20px 12px;
    }
    body {
      max-width: 210mm;
      margin: 0 auto;
      padding: 14mm 16mm;
      background: #ffffff;
      border-radius: 6px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45);
    }
  }

  @media print {
    html, body {
      background: #ffffff;
      max-width: none;
      margin: 0;
      padding: 0;
      box-shadow: none;
      border-radius: 0;
    }
  }

</style>
</head>
<body>
${htmlBody}
</body>
</html>`;

fs.writeFileSync('CV_Sebastian_Strzalkowski.html', styledHtml);
fs.writeFileSync('src/data/cvHtml.js', `const cvHtml = ${JSON.stringify(styledHtml)};\n\nexport default cvHtml;\n`);

const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const pdfCmd = `"${chromePath}" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="CV_Sebastian_Strzalkowski.pdf" CV_Sebastian_Strzalkowski.html`;
execSync(pdfCmd);
fs.copyFileSync('CV_Sebastian_Strzalkowski.pdf', 'public/CV_Sebastian_Strzalkowski.pdf');

console.log('Successfully regenerated CV_Sebastian_Strzalkowski.pdf, public/CV_Sebastian_Strzalkowski.pdf, and src/data/cvHtml.js.');
