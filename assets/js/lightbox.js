// Minimal lightbox for images and iframes
(function(){
  const lb = document.getElementById('lightbox');
  if(!lb) return;
  const content = lb.querySelector('.lb__content');

  function openLightbox(node){
    const typeAttr = node.getAttribute('data-lb-type');
    const src = node.getAttribute('data-lb-src') || node.getAttribute('href');
    if(!src) return;

    // Infer type if not explicitly set
    let type = typeAttr || 'iframe';
    if(!typeAttr && /\.pdf($|[?#])/i.test(src)) type = 'pdf';

    // Clear previous
    content.innerHTML = '';

    if(type === 'image'){
      const img = document.createElement('img');
      img.src = src;
      img.alt = node.getAttribute('data-lb-alt') || '';
      content.appendChild(img);
    } else if(type === 'pdf'){
      const embed = document.createElement('embed');
      embed.src = src;
      embed.type = 'application/pdf';
      embed.className = 'pdf-embed';
      content.appendChild(embed);
    } else {
      const iframe = document.createElement('iframe');
      iframe.src = src;
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      content.appendChild(iframe);
    }

    lb.classList.remove('hidden');
    lb.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox(){
    lb.classList.add('hidden');
    lb.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
    content.innerHTML = '';
  }

  // Delegated click handler
  document.addEventListener('click', (e)=>{
    if(e.defaultPrevented) return;
    if(e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;

    const trigger = e.target.closest('[data-lightbox]');
    if(trigger){
      e.preventDefault();
      openLightbox(trigger);
      return;
    }

    const imageLink = e.target.closest('a');
    if(imageLink){
      const nestedImage = imageLink.querySelector('img');
      const href = imageLink.getAttribute('href');
      if(nestedImage && href && /\.(jpe?g|png|gif|webp|avif|svg)([?#].*)?$/i.test(href)){
        e.preventDefault();
        imageLink.dataset.lightbox = '';
        imageLink.dataset.lbType = 'image';
        imageLink.dataset.lbSrc = href;
        if(!imageLink.dataset.lbAlt && nestedImage.alt) imageLink.dataset.lbAlt = nestedImage.alt;
        openLightbox(imageLink);
        return;
      }
    }

    if(e.target.closest('[data-lb-close]')){
      closeLightbox();
    }
  });

  // ESC to close
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape' && !lb.classList.contains('hidden')) closeLightbox();
  });
})();
