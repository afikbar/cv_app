(() => {
  'use strict';

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function renderHeader(data) {
    const { name, tagline, contact } = data;
    return `
      <div class="header-left">
        <h1 class="header-name">${escapeHtml(name)}</h1>
        <span class="header-tagline">${escapeHtml(tagline)}</span>
      </div>
      <div class="header-right">
        <div class="contact-links">
          ${contact.email ? `
            <a href="mailto:${escapeHtml(contact.email)}" class="contact-item">
              <i class="material-icons">email</i>
              <span>${escapeHtml(contact.email)}</span>
            </a>` : ''}
          ${contact.phone ? `
            <a href="tel:${escapeHtml(contact.phone)}" class="contact-item">
              <i class="material-icons">call</i>
              <span>${escapeHtml(contact.phone)}</span>
            </a>` : ''}
          ${contact.github ? `
            <a href="${escapeHtml(contact.github)}" target="_blank" rel="noopener" class="contact-item">
              <i class="fa-brands fa-github"></i>
              <span>GitHub</span>
            </a>` : ''}
          ${contact.linkedin ? `
            <a href="${escapeHtml(contact.linkedin)}" target="_blank" rel="noopener" class="contact-item">
              <i class="fa-brands fa-linkedin"></i>
              <span>LinkedIn</span>
            </a>` : ''}
          ${contact.cvFile ? `
            <a href="${escapeHtml(contact.cvFile)}" target="_blank" rel="noopener" class="contact-item" title="Download CV">
              <i class="fa-regular fa-file-pdf"></i>
              <span>CV</span>
            </a>` : ''}
        </div>
      </div>`;
  }

  function renderSectionTitle(title, icon) {
    return `
      <h3 class="section-title">
        <i class="material-icons section-icon">${icon}</i>
        ${escapeHtml(title)}
      </h3>`;
  }

  function renderAbout(about) {
    return `
      ${renderSectionTitle('ME', 'person')}
      <div class="section-content">
        <span>${escapeHtml(about)}</span>
      </div>`;
  }

  function renderJob(job) {
    const desc = job.description
      ? `<div class="entry-description">${escapeHtml(job.description)}</div>`
      : '';
    return `
      <div class="entry">
        <h4 class="entry-header">
          <span>
            <b>${escapeHtml(job.company)}</b>
            <span class="entry-subtitle"> | ${escapeHtml(job.title)}</span>
          </span>
          <span class="entry-date">${escapeHtml(job.date)}</span>
        </h4>
        ${desc}
      </div>`;
  }

  function renderExperience(experience) {
    return `
      ${renderSectionTitle('EXPERIENCE', 'work')}
      <div class="section-content">
        ${experience.map(renderJob).join('')}
      </div>`;
  }

  function renderSchool(school) {
    const desc = school.description
      ? `<div class="entry-description">${escapeHtml(school.description)}</div>`
      : '';
    return `
      <div class="entry">
        <h4 class="entry-header">
          <span>
            <b>${escapeHtml(school.school)}</b>
            <span class="entry-subtitle"> | ${escapeHtml(school.program)}</span>
          </span>
          <span class="entry-date">${escapeHtml(school.date)}</span>
        </h4>
        ${desc}
      </div>`;
  }

  function renderEducation(education) {
    return `
      ${renderSectionTitle('EDUCATION', 'school')}
      <div class="section-content">
        ${education.map(renderSchool).join('')}
      </div>`;
  }

  function renderSkills(skills) {
    const rows = skills.map(row => `
      <tr>
        ${row.map(skill => `
          <td>
            <i class="material-icons skill-icon">bubble_chart</i>
            ${escapeHtml(skill)}
          </td>`).join('')}
      </tr>`).join('');

    return `
      ${renderSectionTitle('SKILLS', 'construction')}
      <div class="section-content">
        <table class="skills-table">${rows}</table>
      </div>`;
  }

  async function init() {
    const response = await fetch('data.json');
    const data = await response.json();

    document.getElementById('header').innerHTML = renderHeader(data);
    document.getElementById('about').innerHTML = renderAbout(data.about);
    document.getElementById('experience').innerHTML = renderExperience(data.experience);
    document.getElementById('education').innerHTML = renderEducation(data.education);
    document.getElementById('skills').innerHTML = renderSkills(data.skills);

    document.title = data.name;
  }

  document.addEventListener('DOMContentLoaded', init);
})();
