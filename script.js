 // theme toggle (persist)
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const savedTheme = localStorage.getItem('ckp_theme');
    if (savedTheme === 'light') {
      body.classList.add('light-mode');
      themeToggle.textContent = '🌞';
    } else {
      themeToggle.textContent = '🌙';
    }
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('light-mode');
      const isLight = body.classList.contains('light-mode');
      themeToggle.textContent = isLight ? '🌞' : '🌙';
      localStorage.setItem('ckp_theme', isLight ? 'light' : 'dark');
    });

    // side menu + overlay logic
    const hamburger = document.getElementById('hamburger');
    const sideMenu = document.getElementById('sideMenu');
    const overlay = document.getElementById('overlay');

    function openMenu(){
      sideMenu.classList.add('open');
      overlay.classList.add('show');
      sideMenu.setAttribute('aria-hidden','false');
      // change hamburger to X
      hamburger.innerHTML = '&#10005;'; // ×
    }
    function closeMenu(){
      sideMenu.classList.remove('open');
      overlay.classList.remove('show');
      sideMenu.setAttribute('aria-hidden','true');
      // reset hamburger bars
      hamburger.innerHTML = '<span class="bar"></span><span class="bar"></span><span class="bar"></span>';
    }

    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      if (sideMenu.classList.contains('open')) closeMenu(); else openMenu();
    });

    // close when clicking overlay
    overlay.addEventListener('click', () => closeMenu());

    // close when clicking any side-menu link
    sideMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => closeMenu());
    });

    // ensure navLinks (desktop) links also close side menu if open (safety)
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.addEventListener('click', () => closeMenu());
    });

    // close on escape
    document.addEventListener('keydown', (e) => {
      if(e.key === 'Escape') closeMenu();
    });

    // IntersectionObserver for fade-up
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold:0.12});

    // observe elements that should animate
    document.querySelectorAll('section.card, .item-card, .skill-card, .contact-card').forEach(el => observer.observe(el));
