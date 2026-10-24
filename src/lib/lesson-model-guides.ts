import type { ModelId } from './lesson-models';

/** Interpretation and experiment design accompany every core generated model. */
export const modelGuides: Record<ModelId, { observe: string; compare: string; limit: string }> = {
  feedback: {
    observe:
      'Read deviation relative to the zero set point. The curve traces successive correction steps; the highlighted point is the selected step.',
    compare:
      'Hold the initial disturbance and elapsed steps fixed. Compare weak and strong correction gains, then test zero gain and full correction.',
    limit:
      'Each step removes a fixed fraction of the remaining error. Real feedback can include delays, overshoot, saturation, and changing gain.',
  },
  airway: {
    observe:
      'Compare the current lumen with the dashed baseline radius. Flow responds to pressure and to the fourth power of radius, so equal percentage changes do not have equal effects.',
    compare:
      'Keep driving pressure at baseline. Reduce radius and record flow, then restore radius and vary pressure to distinguish the two effects.',
    limit:
      'This is an idealized laminar-flow comparison with constant tube length and fluid viscosity. It does not represent all airway mechanics.',
  },
  ventilation: {
    observe:
      'Separate the air moved per breath from the dead-space portion. Only the difference contributes to modeled alveolar ventilation; breathing rate scales that difference.',
    compare:
      'Compare deeper, slower breaths with shallower, faster breaths. Record both minute ventilation and alveolar ventilation; equal total ventilation need not mean equal useful exchange.',
    limit:
      'Dead space is treated as fixed for each setting. The model does not predict blood oxygen, perfusion, or the work of breathing.',
  },
  diffusion: {
    observe:
      'Trace exchange area, pressure gradient, and membrane thickness. Area and gradient increase the modeled transfer rate; thickness opposes it.',
    compare:
      'Record baseline transfer. Double one factor at a time while holding the other two fixed; compare proportional changes in the output.',
    limit:
      'This relative model holds the diffusion coefficient constant. It omits changes in perfusion and the gradient during exchange.',
  },
  digestion: {
    observe:
      'Track lactose entering the intestine, the amount hydrolyzed, and the amount remaining. Hydrolysis cannot exceed either the incoming load or available capacity.',
    compare:
      'Hold capacity fixed and raise the load through the capacity threshold. Identify when unprocessed lactose first appears.',
    limit:
      'Capacity summarizes enzyme activity and transit in one number. Remaining lactose is not a direct prediction of symptoms.',
  },
  immune: {
    observe:
      'Compare the modeled response at the same day with and without antigen-specific memory. The curves illustrate response timing and relative magnitude.',
    compare:
      'Choose early, middle, and late days. At each day, toggle memory while holding time fixed and record the difference.',
    limit:
      'The curves are schematic teaching responses. They do not predict an individual immune response or clinical protection.',
  },
  density: {
    observe:
      'Compare sample density with liquid density. A less dense sample floats, a denser one sinks, and equal densities mark the neutral-buoyancy boundary.',
    compare:
      'Hold liquid density fixed. Move sample density from below to above it, recording the density difference on both sides of the boundary.',
    limit:
      'The sample is treated as uniform and nonreactive. Surface tension, trapped air, and mixing can affect real observations.',
  },
  chromatography: {
    observe:
      'Measure both spot migration and solvent-front distance from the same origin. Their ratio is Rf; the solvent front is the reference, not the top of the paper.',
    compare:
      'Keep Rf fixed and increase front distance. Both distances scale together. Then hold front distance fixed and compare different Rf values.',
    limit:
      'Rf depends on the solvent and stationary phase. Similar Rf values alone do not prove that two samples contain the same substance.',
  },
  bloodstain: {
    observe:
      'Identify the major and minor axes of the ideal ellipse. The width-to-length ratio determines the modeled impact angle; scaling both axes preserves the angle.',
    compare:
      'Hold the ratio fixed while changing length, then hold length fixed while changing the ratio. Separate size from shape.',
    limit:
      'The inverse-sine relationship assumes an ideal elliptical stain. Surface texture, distortion, and measurement uncertainty limit real inferences.',
  },
  thermal: {
    observe:
      'Read the temperature above the development threshold and multiply that excess by elapsed time. Temperatures below the threshold contribute no accumulated degree-hours.',
    compare:
      'Hold the threshold fixed. Compare temperatures below, at, and above it, then vary duration at one temperature above the threshold.',
    limit:
      'Temperature is constant in each trial. Real thermal histories vary, and biological development may cease to be linear outside a suitable temperature range.',
  },
};
