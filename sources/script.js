document.addEventListener('DOMContentLoaded', function () {
  const headings = document.querySelectorAll('.animated-heading');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay || '0';
        setTimeout(() => {
          el.classList.add('visible', el.dataset.animation);
        }, parseFloat(delay) * 1000);
        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.5
  });

  headings.forEach(h => observer.observe(h));
});
