---
layout: default
title: Home
---

<main id="main" class="wrap">
  <section id="about">
    <div class="hero">
      <div class="avatar-wrap">
        <img src="UC.jpeg" alt="Portrait of Mahdi Najafi-Ziyazi" class="avatar" />
        <div class="logo-row" aria-hidden="true">
          <img src="/logos/KUL.png" alt="" class="logo" loading="lazy"/>
          <img src="/logos/ERC.jpeg" alt="" class="logo" loading="lazy"/>
          <img src="/logos/EU.jpeg" alt="" class="logo" loading="lazy"/>
          <img src="/logos/OpenSesame.jpeg" alt="" class="logo" loading="lazy"/>
        </div>
      </div>
      <div>
        <p class="subtitle">
         Hi, I’m Mahdi - a PhD researcher at the Centre for mathematical Plasma Astrophysics (CmPA), KU Leuven. I'm part of an international research team   led by Prof. Dr. Stefaan Poedts, dedicated to developing realistic computational models of the solar atmosphere. My research specifically targets the lower solar atmosphere, where I am working to create a multi-fluid model of the solar chromosphere.
        </p>
        <div class="badges">
          <span class="badge">Solar plasma</span>
          <span class="badge">MHD</span>
          <span class="badge">Numerical modelling</span>
        </div>
        
      </div>
    </div>
  </section>

  

  <section id="solar-video">
    <div class="media-card card card--sunrise card--compact">
      <div class="media-card__media">
        <h2 class="media-card__title">Solar Wind In Motion</h2>
        <video class="media-card__video" src="{{ '/assets/vid/WISPRWithSun_H264.mp4' | relative_url }}" autoplay loop muted playsinline>
          <source src="{{ '/assets/vid/WISPRWithSun_H264.mp4' | relative_url }}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        <p class="media-card__credit">Video: Parker Solar Probe / WISPR (NASA)</p>
      </div>
      <div class="media-card__text">
        <p>Captured during Parker Solar Probe’s record-breaking perihelion on 25 December 2024, this sequence from the Wide-field Imager for Solar Probe (WISPR) shows the spacecraft traveling through the inner heliosphere less than five solar radii from the surface.</p>
        <p>The video shows bright coronal streamers, swirls of dust-scattered sunlight, and the fine structures of the solar wind flowing outward at high speed. These outflowing material and the solar magnetic currents can lead to aurora events on Earth and induce electric current that can disrupt the power grids and the communications. Therefore, our project can paly an important role to accurately simulate these phenomena well in advance to protect our infrustucure here on Earth.</p>
      </div>
    </div>
  </section>

  

</main>
