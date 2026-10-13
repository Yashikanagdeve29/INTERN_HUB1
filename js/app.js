/**
 * InternHub — Main Application Logic
 * Pure Vanilla JavaScript (ES6+) with Zero Frameworks or External Libraries.
 * Robust State Management, Safe DOM Creation, Accessible Dialogs, and LocalStorage Persistence.
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // Application State
  // --------------------------------------------------------------------------
  const state = {
    allInternships: [],
    filteredInternships: [],
    savedIds: new Set(),
    activeSearch: '',
    activeDomain: 'all',
    activeWorkMode: 'all',
    activeSort: 'newest',
    showSavedOnly: false,
    hasSimulatedError: false,
    isLoading: true,
    lastActiveElement: null,
    currentTheme: 'light'
  };

  // --------------------------------------------------------------------------
  // DOM Elements Cache
  // --------------------------------------------------------------------------
  let elements = {};

  function cacheElements() {
    elements = {
      // Announcers & Live Regions
      liveRegion: document.getElementById('results-live-region'),
      resultsCount: document.getElementById('results-count'),
      activeFiltersSummary: document.getElementById('active-filters-summary'),

      // Grid Container & States
      internshipsContainer: document.getElementById('internships-container'),
      emptyState: document.getElementById('empty-state'),
      errorState: document.getElementById('error-state'),
      loadingState: document.getElementById('loading-state'),

      // Forms & Inputs
      heroSearchForm: document.getElementById('hero-search-form'),
      searchInput: document.getElementById('search-input'),
      btnClearSearch: document.getElementById('btn-clear-search'),
      domainFilter: document.getElementById('domain-filter'),
      workmodeFilter: document.getElementById('workmode-filter'),
      sortFilter: document.getElementById('sort-filter'),
      btnResetFilters: document.getElementById('btn-reset-filters'),
      btnResetEmpty: document.getElementById('btn-reset-empty'),
      btnRetryError: document.getElementById('btn-retry-error'),
      btnSimulateError: document.getElementById('btn-simulate-error'),

      // Bookmarks & Counters
      btnSavedCounter: document.getElementById('btn-saved-counter'),
      btnSavedMobile: document.getElementById('btn-saved-mobile'),
      savedCountBadges: document.querySelectorAll('.saved-count-badge'),

      // Quick Tag Buttons
      quickTagButtons: document.querySelectorAll('.quick-tag-btn'),

      // Navigation & Theme
      themeToggleBtn: document.getElementById('theme-toggle-btn'),
      mobileMenuBtn: document.getElementById('mobile-menu-btn'),
      mobileNavDrawer: document.getElementById('mobile-nav-drawer'),

      // Dialog Modal
      internshipModal: document.getElementById('internship-modal'),
      modalTitle: document.getElementById('modal-title'),
      modalCompany: document.getElementById('modal-company'),
      modalDomain: document.getElementById('modal-domain'),
      modalAvatar: document.getElementById('modal-avatar'),
      modalStipend: document.getElementById('modal-stipend'),
      modalDuration: document.getElementById('modal-duration'),
      modalWorkMode: document.getElementById('modal-workmode'),
      modalLocation: document.getElementById('modal-location'),
      modalPosted: document.getElementById('modal-posted'),
      modalDescription: document.getElementById('modal-description'),
      modalResponsibilities: document.getElementById('modal-responsibilities'),
      modalQualifications: document.getElementById('modal-qualifications'),
      modalSkills: document.getElementById('modal-skills'),
      modalPerks: document.getElementById('modal-perks'),
      modalApplyContainer: document.getElementById('modal-apply-container'),
      modalSaveBtn: document.getElementById('modal-save-btn'),
      modalCloseBtns: document.querySelectorAll('.btn-close-modal-trigger'),

      // Toasts
      toastContainer: document.getElementById('toast-container')
    };
  }

  // --------------------------------------------------------------------------
  // Safe Storage Helpers (Handles private browsing / disabled cookies)
  // --------------------------------------------------------------------------
  const STORAGE_KEYS = {
    BOOKMARKS: 'internhub_saved_ids',
    THEME: 'internhub_theme_preference'
  };

  function loadSavedIds() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return new Set(parsed);
        }
      }
    } catch (e) {
      console.warn('LocalStorage unavailable or restricted:', e);
    }
    return new Set();
  }

  function persistSavedIds() {
    try {
      localStorage.setItem(
        STORAGE_KEYS.BOOKMARKS,
        JSON.stringify(Array.from(state.savedIds))
      );
    } catch (e) {
      console.warn('Failed to save bookmarks to localStorage:', e);
    }
  }

  function loadThemePreference() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.THEME);
      if (stored === 'dark' || stored === 'light') {
        return stored;
      }
    } catch (e) {
      console.warn('Failed to read theme from localStorage:', e);
    }
    // Default to system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  function persistThemePreference(theme) {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
    } catch (e) {
      console.warn('Failed to persist theme:', e);
    }
  }

  // --------------------------------------------------------------------------
  // SVG Icon Helpers (Safe inline icons for dynamic DOM elements)
  // --------------------------------------------------------------------------
  function createSvgIcon(name) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.style.width = '1rem';
    svg.style.height = '1rem';

    let pathD = '';
    switch (name) {
      case 'map-pin':
        pathD = 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z';
        break;
      case 'clock':
        pathD = 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 6v6l4 2';
        break;
      case 'banknote':
        pathD = 'M2 6h20v12H2z M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M6 12h.01 M18 12h.01';
        break;
      case 'bookmark':
        pathD = 'M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z';
        break;
      case 'arrow-right':
        pathD = 'M5 12h14 M12 5l7 7-7 7';
        break;
      case 'external-link':
        pathD = 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6 M15 3h6v6 M10 14L21 3';
        break;
      case 'check':
        pathD = 'M20 6L9 17l-5-5';
        break;
      default:
        pathD = 'M12 5v14 M5 12h14';
    }

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathD);
    svg.appendChild(path);
    return svg;
  }

  // --------------------------------------------------------------------------
  // Core Component: createInternshipCard (Mandatory Requirement)
  // Uses safe DOM APIs: document.createElement, textContent, setAttribute
  // --------------------------------------------------------------------------
  function createInternshipCard(internship) {
    const card = document.createElement('article');
    card.className = 'internship-card';
    card.setAttribute('data-id', internship.id);
    card.setAttribute('aria-labelledby', `card-title-${internship.id}`);

    // --- Top Row: Company Avatar, Company Name, Domain Badge, Bookmark Button ---
    const topRow = document.createElement('div');
    topRow.className = 'card-top-row';

    const companyGroup = document.createElement('div');
    companyGroup.className = 'card-company-group';

    const avatar = document.createElement('div');
    avatar.className = 'company-avatar';
    avatar.textContent = internship.companyInitials || internship.company.substring(0, 2).toUpperCase();
    avatar.style.backgroundColor = internship.companyColor || '#4F46E5';

    const companyDetails = document.createElement('div');
    companyDetails.className = 'company-details';

    const companyName = document.createElement('span');
    companyName.className = 'company-name';
    companyName.textContent = internship.company;

    const domainBadge = document.createElement('span');
    domainBadge.className = 'domain-badge';
    domainBadge.textContent = internship.domain;

    companyDetails.appendChild(companyName);
    companyDetails.appendChild(domainBadge);

    companyGroup.appendChild(avatar);
    companyGroup.appendChild(companyDetails);

    // Bookmark Action Button
    const isSaved = state.savedIds.has(internship.id);
    const bookmarkBtn = document.createElement('button');
    bookmarkBtn.type = 'button';
    bookmarkBtn.className = `btn-bookmark ${isSaved ? 'saved' : ''}`;
    bookmarkBtn.setAttribute('data-action', 'bookmark');
    bookmarkBtn.setAttribute('data-id', internship.id);
    bookmarkBtn.setAttribute(
      'aria-label',
      isSaved
        ? `Remove ${internship.title} at ${internship.company} from saved internships`
        : `Save ${internship.title} at ${internship.company} to bookmarks`
    );
    bookmarkBtn.setAttribute('aria-pressed', isSaved ? 'true' : 'false');
    bookmarkBtn.appendChild(createSvgIcon('bookmark'));

    topRow.appendChild(companyGroup);
    topRow.appendChild(bookmarkBtn);
    card.appendChild(topRow);

    // --- Title (Semantic H3) ---
    const title = document.createElement('h3');
    title.id = `card-title-${internship.id}`;
    title.className = 'card-title';
    title.textContent = internship.title;
    card.appendChild(title);

    // --- Metadata List (Location, Work Mode, Duration, Stipend) ---
    const metaList = document.createElement('ul');
    metaList.className = 'card-meta-list';
    metaList.setAttribute('aria-label', 'Internship summary details');

    // Location Pill
    const locItem = document.createElement('li');
    locItem.className = 'meta-pill';
    locItem.appendChild(createSvgIcon('map-pin'));
    const locText = document.createElement('span');
    locText.textContent = internship.location;
    locItem.appendChild(locText);
    metaList.appendChild(locItem);

    // Work Mode Pill
    const workModeItem = document.createElement('li');
    workModeItem.className = 'meta-pill';
    const workModeBadge = document.createElement('span');
    const modeClass = (internship.workMode || 'Remote').toLowerCase();
    workModeBadge.className = `workmode-badge ${modeClass}`;
    workModeBadge.textContent = internship.workMode;
    workModeItem.appendChild(workModeBadge);
    metaList.appendChild(workModeItem);

    // Duration Pill
    const durItem = document.createElement('li');
    durItem.className = 'meta-pill';
    durItem.appendChild(createSvgIcon('clock'));
    const durText = document.createElement('span');
    durText.textContent = internship.duration;
    durItem.appendChild(durText);
    metaList.appendChild(durItem);

    // Stipend Pill
    const stipendItem = document.createElement('li');
    stipendItem.className = 'meta-pill';
    stipendItem.appendChild(createSvgIcon('banknote'));
    const stipendText = document.createElement('span');
    stipendText.textContent = internship.stipend;
    stipendItem.appendChild(stipendText);
    metaList.appendChild(stipendItem);

    card.appendChild(metaList);

    // --- Short Description ---
    const desc = document.createElement('p');
    desc.className = 'card-description';
    desc.textContent = internship.description;
    card.appendChild(desc);

    // --- Skills Badges List ---
    const skillsWrapper = document.createElement('div');
    skillsWrapper.className = 'card-skills-wrapper';

    const skillsList = document.createElement('ul');
    skillsList.className = 'skills-list';
    skillsList.setAttribute('aria-label', `Required skills for ${internship.title}`);

    // Show up to 4 prominent skill tags on card
    const displaySkills = (internship.skills || []).slice(0, 4);
    displaySkills.forEach(function (skill) {
      const skillItem = document.createElement('li');
      skillItem.className = 'skill-tag';
      skillItem.textContent = skill;
      skillsList.appendChild(skillItem);
    });

    if (internship.skills && internship.skills.length > 4) {
      const moreTag = document.createElement('li');
      moreTag.className = 'skill-tag';
      moreTag.textContent = `+${internship.skills.length - 4} more`;
      skillsList.appendChild(moreTag);
    }

    skillsWrapper.appendChild(skillsList);
    card.appendChild(skillsWrapper);

    // --- Card Footer (Posted Date & View Details Button) ---
    const footer = document.createElement('div');
    footer.className = 'card-footer';

    const postedDate = document.createElement('time');
    postedDate.className = 'card-posted-date';
    postedDate.dateTime = internship.postedDate;
    postedDate.textContent = formatRelativeDate(internship.postedDate);

    const detailsBtn = document.createElement('button');
    detailsBtn.type = 'button';
    detailsBtn.className = 'btn-details';
    detailsBtn.setAttribute('data-action', 'details');
    detailsBtn.setAttribute('data-id', internship.id);
    detailsBtn.setAttribute('aria-haspopup', 'dialog');
    detailsBtn.setAttribute('aria-label', `View details for ${internship.title} at ${internship.company}`);

    const btnText = document.createElement('span');
    btnText.textContent = 'View Details';
    detailsBtn.appendChild(btnText);
    detailsBtn.appendChild(createSvgIcon('arrow-right'));

    footer.appendChild(postedDate);
    footer.appendChild(detailsBtn);
    card.appendChild(footer);

    return card;
  }

  // --------------------------------------------------------------------------
  // Relative Date Formatting Helper
  // --------------------------------------------------------------------------
  function formatRelativeDate(dateString) {
    if (!dateString) return 'Recently posted';
    try {
      const posted = new Date(dateString);
      const now = new Date();
      const diffDays = Math.max(0, Math.round((now - posted) / (1000 * 60 * 60 * 24)));

      if (diffDays === 0) return 'Posted today';
      if (diffDays === 1) return 'Posted yesterday';
      if (diffDays < 7) return `Posted ${diffDays} days ago`;
      if (diffDays < 30) return `Posted ${Math.floor(diffDays / 7)} weeks ago`;
      return `Posted on ${posted.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}`;
    } catch (e) {
      return 'Recently posted';
    }
  }

  // --------------------------------------------------------------------------
  // Toast Notifications
  // --------------------------------------------------------------------------
  function showToast(message) {
    if (!elements.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');

    const icon = createSvgIcon('check');
    toast.appendChild(icon);

    const text = document.createElement('span');
    text.textContent = message;
    toast.appendChild(text);

    elements.toastContainer.appendChild(toast);

    setTimeout(function () {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      toast.style.transition = 'all 0.2s ease-in';
      setTimeout(function () {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 200);
    }, 2400);
  }

  // --------------------------------------------------------------------------
  // Filter, Search, and Sort Engine
  // --------------------------------------------------------------------------
  function applyFiltersAndRender() {
    // Check error state first
    if (state.hasSimulatedError) {
      renderErrorState();
      return;
    }

    try {
      const searchTerm = state.activeSearch.trim().toLowerCase();
      const domainFilter = state.activeDomain;
      const workModeFilter = state.activeWorkMode;
      const showSavedOnly = state.showSavedOnly;

      const results = state.allInternships.filter(function (internship) {
        // 1. Saved-only filter
        if (showSavedOnly && !state.savedIds.has(internship.id)) {
          return false;
        }

        // 2. Domain filter
        if (domainFilter !== 'all' && internship.domain.toLowerCase() !== domainFilter.toLowerCase()) {
          return false;
        }

        // 3. Work mode filter
        if (workModeFilter !== 'all' && internship.workMode.toLowerCase() !== workModeFilter.toLowerCase()) {
          return false;
        }

        // 4. Search query (matches title, company, or any skill in skills array)
        if (searchTerm.length > 0) {
          const matchTitle = (internship.title || '').toLowerCase().includes(searchTerm);
          const matchCompany = (internship.company || '').toLowerCase().includes(searchTerm);
          const matchSkills = (internship.skills || []).some(function (skill) {
            return skill.toLowerCase().includes(searchTerm);
          });
          const matchDomain = (internship.domain || '').toLowerCase().includes(searchTerm);

          if (!matchTitle && !matchCompany && !matchSkills && !matchDomain) {
            return false;
          }
        }

        return true;
      });

      // 5. Sorting
      results.sort(function (a, b) {
        if (state.activeSort === 'newest') {
          return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
        }
        if (state.activeSort === 'stipend-high') {
          return (b.stipendAmount || 0) - (a.stipendAmount || 0);
        }
        if (state.activeSort === 'duration-short') {
          const durA = parseInt(a.duration, 10) || 0;
          const durB = parseInt(b.duration, 10) || 0;
          return durA - durB;
        }
        return 0;
      });

      state.filteredInternships = results;
      renderInternships(results);
      updateSummaryAndLiveRegion(results.length);
    } catch (err) {
      console.error('Error during filtering and rendering:', err);
      renderErrorState();
    }
  }

  // --------------------------------------------------------------------------
  // Render Internship Cards to DOM
  // --------------------------------------------------------------------------
  function renderInternships(items) {
    // Hide state boxes
    if (elements.loadingState) elements.loadingState.style.display = 'none';
    if (elements.errorState) elements.errorState.style.display = 'none';

    if (items.length === 0) {
      // Show empty state
      if (elements.internshipsContainer) elements.internshipsContainer.style.display = 'none';
      if (elements.emptyState) elements.emptyState.style.display = 'block';
      return;
    }

    if (elements.emptyState) elements.emptyState.style.display = 'none';
    if (elements.internshipsContainer) {
      elements.internshipsContainer.style.display = 'grid';
      // Clear container cleanly
      while (elements.internshipsContainer.firstChild) {
        elements.internshipsContainer.removeChild(elements.internshipsContainer.firstChild);
      }

      // Append fresh cards using DocumentFragment for maximum rendering efficiency
      const fragment = document.createDocumentFragment();
      items.forEach(function (item) {
        fragment.appendChild(createInternshipCard(item));
      });
      elements.internshipsContainer.appendChild(fragment);
    }
  }

  // --------------------------------------------------------------------------
  // Update Live Region & Results Counter (WCAG 2.2 AA)
  // --------------------------------------------------------------------------
  function updateSummaryAndLiveRegion(count) {
    const total = state.allInternships.length;
    const countText = `${count} ${count === 1 ? 'internship' : 'internships'}`;

    if (elements.resultsCount) {
      elements.resultsCount.textContent = countText;
    }

    // Build active filters summary description
    const filtersUsed = [];
    if (state.activeSearch.trim()) {
      filtersUsed.push(`keyword "${state.activeSearch.trim()}"`);
    }
    if (state.activeDomain !== 'all') {
      filtersUsed.push(`domain "${state.activeDomain}"`);
    }
    if (state.activeWorkMode !== 'all') {
      filtersUsed.push(`mode "${state.activeWorkMode}"`);
    }
    if (state.showSavedOnly) {
      filtersUsed.push('saved only');
    }

    let summaryText = `of ${total} total opportunities`;
    if (filtersUsed.length > 0) {
      summaryText += ` (Filtered by: ${filtersUsed.join(', ')})`;
    }

    if (elements.activeFiltersSummary) {
      elements.activeFiltersSummary.textContent = summaryText;
    }

    // ARIA Live Region announcement
    if (elements.liveRegion) {
      if (count === 0) {
        elements.liveRegion.textContent = 'No internships found matching your search and filter criteria.';
      } else {
        elements.liveRegion.textContent = `Showing ${count} ${count === 1 ? 'internship' : 'internships'}. ${summaryText}`;
      }
    }
  }

  // --------------------------------------------------------------------------
  // Error State Rendering
  // --------------------------------------------------------------------------
  function renderErrorState() {
    if (elements.internshipsContainer) elements.internshipsContainer.style.display = 'none';
    if (elements.emptyState) elements.emptyState.style.display = 'none';
    if (elements.loadingState) elements.loadingState.style.display = 'none';
    if (elements.errorState) elements.errorState.style.display = 'block';

    if (elements.resultsCount) {
      elements.resultsCount.textContent = '0 internships';
    }
    if (elements.activeFiltersSummary) {
      elements.activeFiltersSummary.textContent = 'Error loading opportunities';
    }
    if (elements.liveRegion) {
      elements.liveRegion.textContent = 'Alert: Something went wrong while loading internships. Please try again.';
    }
  }

  // --------------------------------------------------------------------------
  // Reset Filters Functionality
  // --------------------------------------------------------------------------
  function resetAllFilters() {
    state.activeSearch = '';
    state.activeDomain = 'all';
    state.activeWorkMode = 'all';
    state.activeSort = 'newest';
    state.showSavedOnly = false;
    state.hasSimulatedError = false;

    // Reset Form Fields
    if (elements.searchInput) elements.searchInput.value = '';
    if (elements.domainFilter) elements.domainFilter.value = 'all';
    if (elements.workmodeFilter) elements.workmodeFilter.value = 'all';
    if (elements.sortFilter) elements.sortFilter.value = 'newest';

    if (elements.btnClearSearch) {
      elements.btnClearSearch.classList.remove('visible');
    }

    if (elements.btnSavedCounter) {
      elements.btnSavedCounter.classList.remove('active');
    }
    if (elements.btnSavedMobile) {
      elements.btnSavedMobile.classList.remove('active');
    }

    applyFiltersAndRender();

    if (elements.searchInput) {
      elements.searchInput.focus();
    }
  }

  // --------------------------------------------------------------------------
  // Bookmark Toggle Engine
  // --------------------------------------------------------------------------
  function toggleBookmark(id) {
    if (!id) return;
    const internship = state.allInternships.find(function (item) {
      return item.id === id;
    });

    if (state.savedIds.has(id)) {
      state.savedIds.delete(id);
      persistSavedIds();
      updateSavedBadges();
      showToast(`Removed from saved internships`);
    } else {
      state.savedIds.add(id);
      persistSavedIds();
      updateSavedBadges();
      const title = internship ? internship.title : 'Internship';
      showToast(`Saved "${title}" to bookmarks`);
    }

    // Update in-place cards without disrupting scroll position or focus
    const cardBookmarkBtns = document.querySelectorAll(`.btn-bookmark[data-id="${id}"]`);
    const isSaved = state.savedIds.has(id);
    cardBookmarkBtns.forEach(function (btn) {
      if (isSaved) {
        btn.classList.add('saved');
        btn.setAttribute('aria-pressed', 'true');
        btn.setAttribute('aria-label', `Remove from saved internships`);
      } else {
        btn.classList.remove('saved');
        btn.setAttribute('aria-pressed', 'false');
        btn.setAttribute('aria-label', `Save to bookmarks`);
      }
    });

    // Update modal save button if open
    if (elements.modalSaveBtn && elements.modalSaveBtn.getAttribute('data-id') === id) {
      updateModalSaveButton(isSaved);
    }

    // If currently filtering by saved items, re-render
    if (state.showSavedOnly) {
      applyFiltersAndRender();
    }
  }

  function updateSavedBadges() {
    const count = state.savedIds.size;
    elements.savedCountBadges.forEach(function (badge) {
      badge.textContent = count.toString();
    });
  }

  function updateModalSaveButton(isSaved) {
    if (!elements.modalSaveBtn) return;
    elements.modalSaveBtn.textContent = '';
    const icon = createSvgIcon('bookmark');
    elements.modalSaveBtn.appendChild(icon);

    const span = document.createElement('span');
    span.textContent = isSaved ? 'Remove from Saved' : 'Save to Bookmarks';
    elements.modalSaveBtn.appendChild(span);

    if (isSaved) {
      elements.modalSaveBtn.classList.add('active');
      elements.modalSaveBtn.style.color = 'var(--accent-warning)';
    } else {
      elements.modalSaveBtn.classList.remove('active');
      elements.modalSaveBtn.style.color = '';
    }
  }

  // --------------------------------------------------------------------------
  // Accessible Modal Dialog Management (Native <dialog> element)
  // Follows WAI-ARIA Dialog (Modal) Pattern: Focus trapping & restoration
  // --------------------------------------------------------------------------
  function openInternshipModal(id, triggerElement) {
    const internship = state.allInternships.find(function (item) {
      return item.id === id;
    });
    if (!internship || !elements.internshipModal) return;

    // Remember trigger element to restore focus on close
    state.lastActiveElement = triggerElement || document.activeElement;

    // Populate Modal Content using safe textContent
    elements.modalTitle.textContent = internship.title;
    elements.modalCompany.textContent = internship.company;
    elements.modalDomain.textContent = internship.domain;
    elements.modalAvatar.textContent = internship.companyInitials || internship.company.substring(0, 2).toUpperCase();
    elements.modalAvatar.style.backgroundColor = internship.companyColor || '#4F46E5';

    elements.modalStipend.textContent = internship.stipend;
    elements.modalDuration.textContent = internship.duration;
    elements.modalWorkMode.textContent = internship.workMode;
    elements.modalLocation.textContent = internship.location;
    elements.modalPosted.textContent = formatRelativeDate(internship.postedDate);
    elements.modalDescription.textContent = internship.description;

    // Responsibilities List
    while (elements.modalResponsibilities.firstChild) {
      elements.modalResponsibilities.removeChild(elements.modalResponsibilities.firstChild);
    }
    (internship.responsibilities || []).forEach(function (resp) {
      const li = document.createElement('li');
      li.textContent = resp;
      elements.modalResponsibilities.appendChild(li);
    });

    // Qualifications List
    while (elements.modalQualifications.firstChild) {
      elements.modalQualifications.removeChild(elements.modalQualifications.firstChild);
    }
    (internship.qualifications || []).forEach(function (qual) {
      const li = document.createElement('li');
      li.textContent = qual;
      elements.modalQualifications.appendChild(li);
    });

    // Skills List
    while (elements.modalSkills.firstChild) {
      elements.modalSkills.removeChild(elements.modalSkills.firstChild);
    }
    (internship.skills || []).forEach(function (skill) {
      const li = document.createElement('li');
      li.className = 'skill-tag';
      li.textContent = skill;
      elements.modalSkills.appendChild(li);
    });

    // Perks List
    while (elements.modalPerks.firstChild) {
      elements.modalPerks.removeChild(elements.modalPerks.firstChild);
    }
    (internship.perks || []).forEach(function (perk) {
      const li = document.createElement('li');
      li.textContent = perk;
      elements.modalPerks.appendChild(li);
    });

    // Modal Save Button Setup
    const isSaved = state.savedIds.has(internship.id);
    elements.modalSaveBtn.setAttribute('data-id', internship.id);
    updateModalSaveButton(isSaved);

    // Modal Apply Button Setup
    // Prompt requirement: "Provide an Apply Now link only when a genuine application URL is available.
    // For sample listings without a verified application link, show 'Demo listing — application unavailable.'"
    while (elements.modalApplyContainer.firstChild) {
      elements.modalApplyContainer.removeChild(elements.modalApplyContainer.firstChild);
    }

    if (internship.applyUrl && internship.applyUrl.trim() !== '' && internship.applyUrl !== '#') {
      const applyLink = document.createElement('a');
      applyLink.href = internship.applyUrl;
      applyLink.target = '_blank';
      applyLink.rel = 'noopener noreferrer';
      applyLink.className = 'btn-modal-apply';
      applyLink.setAttribute('aria-label', `Apply for ${internship.title} (opens in a new tab)`);

      const linkText = document.createElement('span');
      linkText.textContent = 'Apply on Company Site';
      applyLink.appendChild(linkText);
      applyLink.appendChild(createSvgIcon('external-link'));

      elements.modalApplyContainer.appendChild(applyLink);
    } else {
      const disabledBtn = document.createElement('button');
      disabledBtn.type = 'button';
      disabledBtn.disabled = true;
      disabledBtn.className = 'btn-modal-disabled';
      disabledBtn.textContent = 'Demo listing — application unavailable.';
      disabledBtn.setAttribute('aria-disabled', 'true');
      elements.modalApplyContainer.appendChild(disabledBtn);
    }

    // Open using native HTML5 dialog method
    if (typeof elements.internshipModal.showModal === 'function') {
      elements.internshipModal.showModal();
    } else {
      // Fallback for older browsers
      elements.internshipModal.setAttribute('open', '');
    }

    // Set focus to the close button inside modal
    const closeBtn = elements.internshipModal.querySelector('.btn-close-modal');
    if (closeBtn) {
      closeBtn.focus();
    }
  }

  function closeInternshipModal() {
    if (!elements.internshipModal) return;

    if (typeof elements.internshipModal.close === 'function') {
      elements.internshipModal.close();
    } else {
      elements.internshipModal.removeAttribute('open');
    }

    // Restore focus to the element that triggered the modal
    if (state.lastActiveElement && typeof state.lastActiveElement.focus === 'function') {
      state.lastActiveElement.focus();
    }
  }

  // --------------------------------------------------------------------------
  // Theme Toggle Engine (Light / Dark)
  // --------------------------------------------------------------------------
  function applyTheme(theme) {
    state.currentTheme = theme;
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (elements.themeToggleBtn) {
        elements.themeToggleBtn.setAttribute('aria-label', 'Switch to light theme');
      }
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (elements.themeToggleBtn) {
        elements.themeToggleBtn.setAttribute('aria-label', 'Switch to dark theme');
      }
    }
    persistThemePreference(theme);
  }

  function toggleTheme() {
    const nextTheme = state.currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    showToast(`Switched to ${nextTheme} theme`);
  }

  // --------------------------------------------------------------------------
  // Event Listeners Registration
  // --------------------------------------------------------------------------
  function setupEventListeners() {
    // 1. Search Form Submission
    if (elements.heroSearchForm) {
      elements.heroSearchForm.addEventListener('submit', function (e) {
        e.preventDefault();
        state.activeSearch = elements.searchInput.value;
        applyFiltersAndRender();
        // Scroll smoothly to results on search form submit
        const filterSection = document.getElementById('explore-internships');
        if (filterSection) {
          filterSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    // 2. Real-time Search Input (Instant feedback + Clear button visibility)
    if (elements.searchInput) {
      elements.searchInput.addEventListener('input', function (e) {
        state.activeSearch = e.target.value;
        if (state.activeSearch.trim().length > 0) {
          elements.btnClearSearch.classList.add('visible');
        } else {
          elements.btnClearSearch.classList.remove('visible');
        }
        applyFiltersAndRender();
      });
    }

    // 3. Clear Search Button
    if (elements.btnClearSearch) {
      elements.btnClearSearch.addEventListener('click', function () {
        elements.searchInput.value = '';
        state.activeSearch = '';
        elements.btnClearSearch.classList.remove('visible');
        applyFiltersAndRender();
        elements.searchInput.focus();
      });
    }

    // 4. Domain Filter Dropdown
    if (elements.domainFilter) {
      elements.domainFilter.addEventListener('change', function (e) {
        state.activeDomain = e.target.value;
        applyFiltersAndRender();
      });
    }

    // 5. Work Mode Filter Dropdown
    if (elements.workmodeFilter) {
      elements.workmodeFilter.addEventListener('change', function (e) {
        state.activeWorkMode = e.target.value;
        applyFiltersAndRender();
      });
    }

    // 6. Sort Filter Dropdown
    if (elements.sortFilter) {
      elements.sortFilter.addEventListener('change', function (e) {
        state.activeSort = e.target.value;
        applyFiltersAndRender();
      });
    }

    // 7. Reset Filters Buttons
    if (elements.btnResetFilters) {
      elements.btnResetFilters.addEventListener('click', resetAllFilters);
    }
    if (elements.btnResetEmpty) {
      elements.btnResetEmpty.addEventListener('click', resetAllFilters);
    }

    // 8. Error Recovery & Test Simulation
    if (elements.btnRetryError) {
      elements.btnRetryError.addEventListener('click', function () {
        state.hasSimulatedError = false;
        applyFiltersAndRender();
        showToast('Successfully reloaded internships');
      });
    }

    if (elements.btnSimulateError) {
      elements.btnSimulateError.addEventListener('click', function () {
        state.hasSimulatedError = !state.hasSimulatedError;
        if (state.hasSimulatedError) {
          renderErrorState();
        } else {
          applyFiltersAndRender();
        }
      });
    }

    // 9. Quick Domain Tags
    elements.quickTagButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        const domain = button.getAttribute('data-domain');
        if (domain && elements.domainFilter) {
          elements.domainFilter.value = domain;
          state.activeDomain = domain;
          applyFiltersAndRender();
          const filterSection = document.getElementById('explore-internships');
          if (filterSection) {
            filterSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });

    // 10. Saved Bookmarks Header Button
    function handleSavedToggle() {
      state.showSavedOnly = !state.showSavedOnly;
      if (elements.btnSavedCounter) {
        elements.btnSavedCounter.classList.toggle('active', state.showSavedOnly);
      }
      if (elements.btnSavedMobile) {
        elements.btnSavedMobile.classList.toggle('active', state.showSavedOnly);
      }
      applyFiltersAndRender();
      const filterSection = document.getElementById('explore-internships');
      if (filterSection) {
        filterSection.scrollIntoView({ behavior: 'smooth' });
      }
    }

    if (elements.btnSavedCounter) {
      elements.btnSavedCounter.addEventListener('click', handleSavedToggle);
    }
    if (elements.btnSavedMobile) {
      elements.btnSavedMobile.addEventListener('click', function () {
        handleSavedToggle();
        if (elements.mobileNavDrawer) {
          elements.mobileNavDrawer.classList.remove('open');
          elements.mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // 11. Delegated Event Listener for Dynamic Cards (Details & Bookmark)
    if (elements.internshipsContainer) {
      elements.internshipsContainer.addEventListener('click', function (e) {
        const target = e.target;

        // Bookmark button click
        const bookmarkBtn = target.closest('[data-action="bookmark"]');
        if (bookmarkBtn) {
          e.stopPropagation();
          const id = bookmarkBtn.getAttribute('data-id');
          toggleBookmark(id);
          return;
        }

        // Details button click
        const detailsBtn = target.closest('[data-action="details"]');
        if (detailsBtn) {
          e.stopPropagation();
          const id = detailsBtn.getAttribute('data-id');
          openInternshipModal(id, detailsBtn);
          return;
        }
      });
    }

    // 12. Modal Close Buttons
    elements.modalCloseBtns.forEach(function (btn) {
      btn.addEventListener('click', closeInternshipModal);
    });

    // 13. Modal Bookmark Button
    if (elements.modalSaveBtn) {
      elements.modalSaveBtn.addEventListener('click', function () {
        const id = elements.modalSaveBtn.getAttribute('data-id');
        toggleBookmark(id);
      });
    }

    // 14. Dialog Backdrop Click and Escape Key
    if (elements.internshipModal) {
      // Backdrop click closes dialog
      elements.internshipModal.addEventListener('click', function (e) {
        if (e.target === elements.internshipModal) {
          closeInternshipModal();
        }
      });

      // Escape key event handling
      elements.internshipModal.addEventListener('cancel', function (e) {
        e.preventDefault();
        closeInternshipModal();
      });
    }

    // 15. Theme Toggle
    if (elements.themeToggleBtn) {
      elements.themeToggleBtn.addEventListener('click', toggleTheme);
    }

    // 16. Mobile Menu Navigation Drawer
    if (elements.mobileMenuBtn && elements.mobileNavDrawer) {
      elements.mobileMenuBtn.addEventListener('click', function () {
        const isOpen = elements.mobileNavDrawer.classList.toggle('open');
        elements.mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });

      // Close mobile drawer on navigation link click
      const mobileLinks = elements.mobileNavDrawer.querySelectorAll('.mobile-nav-link');
      mobileLinks.forEach(function (link) {
        link.addEventListener('click', function () {
          elements.mobileNavDrawer.classList.remove('open');
          elements.mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
      });
    }
  }

  // --------------------------------------------------------------------------
  // Application Bootstrap
  // --------------------------------------------------------------------------
  function initialize() {
    cacheElements();

    // Load saved bookmarks and theme from localStorage
    state.savedIds = loadSavedIds();
    const savedTheme = loadThemePreference();
    applyTheme(savedTheme);
    updateSavedBadges();

    setupEventListeners();

    // Load data from global INTERNSHIPS_DATA defined in js/data.js
    if (typeof window !== 'undefined' && Array.isArray(window.INTERNSHIPS_DATA)) {
      state.allInternships = window.INTERNSHIPS_DATA;
    } else {
      console.error('Internship dataset not found on window.INTERNSHIPS_DATA.');
      state.hasSimulatedError = true;
    }

    // Brief realistic initial animation state before instant render
    setTimeout(function () {
      state.isLoading = false;
      applyFiltersAndRender();
    }, 180);
  }

  // Run initialization once DOM is fully parsed
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }
})();
