---
layout: post
title: "PhD Project: Towards Multifluid Modeling of the Solar Atmosphere"
date: 2025-09-22
---

The Sun provides a unique opportunity to study stellar structure and dynamics at close range. Its proximity of about 150 million kilometers to Earth also makes our planet highly vulnerable to powerful solar storms. These eruptions can disrupt ground-based power grids and interfere with communication and GPS satellites in orbit.

<div style="text-align: center;">
    <a href="{{ '/assets/img/Space_weather_effects.jpg' | relative_url }}" target="_blank" rel="noopener noreferrer">
        <img src="{{ '/assets/img/Space_weather_effects.jpg' | relative_url }}" alt="Solar storm effects" style="max-width:550px; width:100%; height:auto; border-radius:6px;">
    </a>
    <div style="font-size:0.9em; color:#888; margin-top:0.3em;">Image credit: ESA</div>
</div>


To mitigate these risks, reliable forecasting of solar storms and flaring events is essential. This need has driven the development of space weather prediction platforms supported by advanced magnetohydrodynamic modelling of the solar atmosphere and heliosphere. One such development is the [Open Sesame project](https://perswww.kuleuven.be/~u0002601/index.php?page=projects), led by Prof. Dr. Stefaan Poedts. This project focuses on accurately modelling the plasma from the Sun to Earth using state-of-the-art computational codes. For the solar corona, we rely on the global coronal modelling code COCONUT, which is built on the COOLFluiD architecture and uses data-driven magnetograms ([Perri et al. 2022](https://doi.org/10.3847/1538-4357/ac7237)).
Although these models have produced promising results, they still face significant limitations.
### Corona Dependence on Lower Layers

Empirical coronal models rely on the properties of the lower layers of the solar atmosphere, specifically the chromosphere and transition region. To accurately represent these regions, single-fluid MHD models are insufficient and must be enhanced or replaced by multifluid approaches. Brchnelova et al. (2023) explored the integration of multifluid formalism into the COCONUT model for two data-driven scenarios: solar minimum (using data from the 2008 solar eclipse) and solar maximum (using data from 2016).

We already suspect that the concentration of neutrals in the corona is low, since this region of the atmosphere is almost entirely ionized. However, Brchnelova et al. (2023) assumed a small neutral concentration in the corona ($10^{-6}$), which enables the inclusion of collisional, chemical, and charge exchange terms. 

This study shows that the accounting for the neutrals in the corona, led to lower velocities and higher temperature compared to the single fluid. 

I have used the same setup of Brchnelova simulations to reproduce the results on the paper with the AUSM+ flux constructor. Once looking up the dimensional residuals of the parameters of (<span class="math-inline">&#92;(\mathbf{u}_{i,n}&#92;)</span>) and (<span class="math-inline">&#92;(\mathbf{T}_{i,n}&#92;)</span>), we can notice that the log of the residulas does not decrease any further than 2. In order to improve the residual to arrive at better solution, we opted for a more diffusive scheme, namely Harten-Lax-van Leer (HLL). The scheme uses only two largest bounding wave speed of the Riemann fan makes it more diffusive but less accurate compared to the AUSM+ scheme.

$$
F_{\mathrm{HLL}} = \frac{F_L S_R - F_R S_L + S_R S_L (U_R - U_L)}{S_R - S_L}
$$

In the following I display the perofrmance of the defeault case of the Brchnelova et al. 2023, where they implement the full coupling between the ions and neutrals by including the collisional terms, ionisation and recombination terms and the charge exchange. The details of these set of equations are shown in the literature as well. 


<div style="display: flex; gap: 16px; justify-content: center;">
  <div style="display: flex; flex-direction: column; align-items: center;">
    <img src="/assets/img/MAP_AUSM_two_fluid_Vr.png" alt="AUSM+ two-fluid velocity profile" style="width: 300px; height: auto;">
    <div style="font-size: 0.95em; color: #888; margin-top: 0.3em; text-align: center;">MF AUSM+ ion velocity profile</div>
  </div>
  <div style="display: flex; flex-direction: column; align-items: center;">
    <img src="/assets/img/MAP_HLL_two_fluid_Vr.png" alt="HLL two-fluid velocity profile" style="width: 300px; height: auto;">
    <div style="font-size: 0.95em; color: #888; margin-top: 0.3em; text-align: center;">MF HLL ion velocity profile</div>
  </div>
  <div style="display: flex; flex-direction: column; align-items: center;">
    <img src="/assets/img/SF-HLL_Scheme.png" alt="HLL single fluid velocity profile" style="width: 300px; height: auto;">
    <div style="font-size: 0.95em; color: #888; margin-top: 0.3em; text-align: center;">SF HLL ion velocity profile</div>
  </div>
</div>
The velocity range of the ion for the both of the flux schemes is very close and both show larger range compared to the single fluid MHD simulation. Brachnelova 2023 argues that this lower velocity is due to the ohmic resistivity and the the sources terms that affect the velocity through the momentum equation. 

<div style="display: flex; gap: 16px; justify-content: center;">
  <div style="display: flex; flex-direction: column; align-items: center;">
    <img src="/assets/img/HLL_single_fluid_Vr.png" alt="Single-fluid ion's velocity" style="width: 400px; height: auto;">
    <div style="font-size: 0.95em; color: #888; margin-top: 0.3em; text-align: center;">Single-fluid ion's velocity</div>
  </div>
  <div style="display: flex; flex-direction: column; align-items: center;">
    <img src="/assets/img/HLLvsAUSM.png" alt="Two-fluid ion's radial velocity for AUSM+ and HLL " style="width: 400px; height: auto;">
    <div style="font-size: 0.95em; color: #888; margin-top: 0.3em; text-align: center;">Two-fluid ion's radial velocity for AUSM+ and HLL</div>
  </div>
</div>

In solar forecasting, we opt for a fast convergence of the solution while maintaing the accuracy. Using AUSM+ scheme, we can maintain a good accuracy but the convergence can still be improved. The reason we tried the same model with HLL, is due its robustness and better convergece but it comes at the cost of the accuracy. We can see this difference in the the comparison of the radial velocity profiles, where AUSM+ captures more features in the streamers, while HLL has smoother feathure, due its diffusiveness. However, if we look at the numerical performance of the two schemes, we can see that HLL fares slightly better by reaching to log(res) of zero for temperature and velocity parameters