// Checkpoint explanations for Dynamic Planet, keyed by question id.
export const dynamicPlanet: Record<string, string> = {
  'dyn-u1-l1-q1':
    'Volume = area × depth. 1 km² = 1,000,000 m² and 1 mm = 0.001 m, so 1,000,000 × 0.001 = 1,000 m³. That is 1,000,000 liters, so "1,000 liters" misses a factor of 1,000.',
  'dyn-u1-l1-q2':
    'A water budget counts what crosses a defined boundary (such as a watershed outline) during a defined period. Without both, inputs, outputs and storage change cannot be measured or compared.',
  'dyn-u1-l1-q3':
    'Water that soaks into the ground can move slowly through soil and aquifers and seep into streams as baseflow. That is why many streams keep flowing between rains.',
  'dyn-u1-l1-q4':
    'Precipitation minus streamflow ignores water lost to evapotranspiration, changes in soil, groundwater or snow storage, and water entering or leaving across the boundary underground or through diversions. Any of these can be large.',
  'dyn-u1-l1-q5':
    'The share of rain that runs off changes from storm to storm. It is higher when soils are already wet, rain is intense, or surfaces are paved or bare, and lower on dry, vegetated or permeable ground.',
  'dyn-u1-l1-q6':
    'Residence time ≈ storage ÷ flow rate, giving the average time water stays in a reservoir. It assumes steady conditions and simple mixing; individual water parcels can stay much shorter or longer than the average.',
  'dyn-u1-l1-q7':
    'The lab keeps the total volume of direct runoff fixed and spreads it over the event’s duration. Changing the shape of the hydrograph moves water in time but does not create or remove any.',
  'dyn-u2-l1-q1':
    'No. Snow is mostly air, so its water equivalent depends on density. Fresh snow may be about 10% water (10 cm snow ≈ 1 cm water), while packed snow can be 30–50%.',
  'dyn-u2-l1-q2':
    'No. One storm reflects weather on one day. Climate is the long-term average and variability over decades, which needs long records and different processes than a single event.',
  'dyn-u2-l1-q3':
    'No. Two places with the same annual rainfall can differ in when it falls (one wet season versus all year), how much is stored, how much evaporates, water quality and how much people use, so their usable supply differs.',
  'dyn-u2-l1-q4':
    'Snow stores precipitation on the ground until temperatures rise enough to melt it. Streamflow from that snow can arrive weeks or months after it fell, often peaking in spring.',
  'dyn-u2-l1-q5':
    'A precipitation map should state its units (mm or inches), the time period covered, its spatial resolution and what statistic is shown (total, average or anomaly). Without these the numbers cannot be interpreted.',
  'dyn-u2-l1-q6':
    'Drought dries soil, groundwater and reservoirs. One rainstorm may only rewet the surface or run off; refilling deeper stores takes sustained rain over a long time.',
  'dyn-u2-l1-q7':
    'When moist air is forced up a mountain, it cools, its water vapor condenses and precipitation falls on the windward side. Wind direction and speed, moisture content, terrain height and shape, and atmospheric stability all matter.',
  'dyn-u3-l1-q1':
    'In Strahler ordering, when two streams of the same order join, the result is one order higher: 2 + 2 → 3. A lower-order stream joining a higher one does not raise the order.',
  'dyn-u3-l1-q2':
    'No. Surface divides follow topography, but groundwater flows according to underground geology and hydraulic head, so water can cross beneath a surface divide into a neighboring basin.',
  'dyn-u3-l1-q3':
    'In a radial pattern, streams flow outward in all directions from a central high point, such as a volcano or dome. The pattern hints at the landform, but other evidence should confirm it.',
  'dyn-u3-l1-q4':
    'A watershed is defined by its outlet: all land draining to that specific point. Moving the outlet upstream or downstream changes the basin area and which streams are included.',
  'dyn-u3-l1-q5':
    'Coarse maps leave out small first-order streams. Since order is counted from the smallest tributaries, missing them lowers the orders of the whole network, so the same river can have a different order on different maps.',
  'dyn-u3-l1-q6':
    'Load = concentration × discharge over time. You need the tributary’s flow (discharge) and the concentration of the substance, measured at matching times, preferably across different flow conditions.',
  'dyn-u3-l1-q7':
    'Drainage patterns reflect geology, but different conditions can make similar patterns. Rectangular patterns can come from joints or faults, and a pattern may be inherited from past landscapes, so other evidence is needed.',
  'dyn-u4-l1-q1':
    'Dissolved load is material carried in solution as ions and molecules, such as calcium, bicarbonate or chloride. It is invisible and does not settle. Sand and gravel travel as suspended or bed load.',
  'dyn-u4-l1-q2':
    'Competence is the size of the largest particle a flow can move, which depends mainly on velocity. Capacity is the total amount of sediment it can carry. A fast mountain stream can have high competence but low capacity.',
  'dyn-u4-l1-q3':
    'No. Discharge = velocity × cross-sectional area. The same discharge flows slowly through a wide, deep channel and fast through a narrow, shallow one.',
  'dyn-u4-l1-q4':
    'If a flow can carry more sediment than it receives, as below a dam that traps sediment, it picks up material from its bed and banks to make up the difference. This "hungry water" deepens and erodes the channel.',
  'dyn-u4-l1-q5':
    'Whether a river is straight, meandering or braided depends on slope, how resistant the banks are, vegetation, how much and what size sediment arrives and how variable the flow is. These factors interact.',
  'dyn-u4-l1-q6':
    'Turbidity measures how much the water scatters light, which depends on particle size, shape and color as well as amount. It misses dissolved and bed load, and load also requires discharge (flow) over time.',
  'dyn-u4-l1-q7':
    'The lab simplifies transport. It does not model the force of flow on the bed (shear stress), when individual grains start moving, how much sediment is supplied or how the channel changes shape over time.',
  'dyn-u5-l1-q1':
    'As a meander grows, its neck narrows until the river cuts across it, often during a flood. The abandoned loop is sealed off by sediment and becomes a crescent-shaped oxbow lake.',
  'dyn-u5-l1-q2':
    'No. Higher terraces are generally older, but the rate of downcutting varies, and terraces can form by different processes. Absolute ages need dating methods such as radiocarbon or luminescence, plus local context.',
  'dyn-u5-l1-q3':
    'Showing that a river moved requires comparing its position at different dates, using maps, aerial photos or satellite images at the same scale and reference. A single image or sample cannot show change.',
  'dyn-u5-l1-q4':
    'On the inside of a bend, water moves slower, so sediment drops out and builds a point bar. On the outside, faster flow erodes a cut bank. Together they make the meander migrate.',
  'dyn-u5-l1-q5':
    'During floods, rivers spread water, sediment, nutrients and organisms across the floodplain, and floodplains return water and organic matter to the channel. Changing one affects the other.',
  'dyn-u5-l1-q6':
    'A raised flat surface could be a river terrace, but it could also come from tectonic uplift, a change in base level, landslide deposits or uneven erosion. Some terraces are eroded away, so the record is incomplete.',
  'dyn-u5-l1-q7':
    'Past flows were not measured directly. They are estimated from preserved clues, such as channel size and the largest boulders moved, using hydraulic equations and assumptions about channel shape and roughness.',
  'dyn-u6-l1-q1':
    'A hydrograph plots discharge (volume per time) against time. The area under it is discharge × time, which equals the total volume of water that passed the gauge.',
  'dyn-u6-l1-q2':
    'No. A "100-year flood" has a 1% chance of being equaled or exceeded in any given year. Two can happen in back-to-back years, or none for centuries.',
  'dyn-u6-l1-q3':
    'Stage is the water surface height (in m or ft); discharge is the volume flowing per second (m³/s). A rating curve, built from field measurements, converts stage to discharge at a gauge.',
  'dyn-u6-l1-q4':
    'A rating curve assumes the channel’s shape stays the same. Erosion, deposition, vegetation, ice or backwater from a downstream river or tide change the stage–discharge relation, so the curve must be updated.',
  'dyn-u6-l1-q5':
    'A triangle’s area is ½ × base × height. Keeping the volume (area) fixed and doubling the duration (base) means the peak (height) must halve.',
  'dyn-u6-l1-q6':
    'Antecedent moisture is how wet the ground already is. Saturated soil absorbs little more water, so the same storm produces much more runoff and higher peaks than on dry ground.',
  'dyn-u6-l1-q7':
    'Flood frequency is estimated from limited records, often decades long, so rare events are uncertain. It also assumes floods are independent and that climate and land use stay the same over time (stationarity).',
  'dyn-u7-l1-q1':
    'No. Porosity is how much space is in the material; permeability is how easily water flows through it. Clay has high porosity but tiny, poorly connected pores, so its permeability is very low.',
  'dyn-u7-l1-q2':
    'Darcy flux q = Q ÷ A, the flow rate divided by the full cross-sectional area including solid grains. It is also K × hydraulic gradient. It is not the actual speed of water in the pores.',
  'dyn-u7-l1-q3':
    'Groundwater flows from higher to lower hydraulic head. Head combines elevation and pressure, so water can flow uphill or sideways if the pressure difference is large enough.',
  'dyn-u7-l1-q4':
    'In karst, dissolved limestone forms open channels and caves. Water flows through them fast, like pipes, with little filtering by soil or rock, so contaminants can travel kilometers in hours or days.',
  'dyn-u7-l1-q5':
    'Water moves only through the connected pore space, so its average velocity is the Darcy flux divided by the effective porosity: v = q ÷ nₑ. Uneven flow paths make some water move even faster.',
  'dyn-u7-l1-q6':
    'Pumping lowers the water level around the well, forming a cone of depression. That changes the gradient, so groundwater, and possibly water from a nearby stream or contaminated area, flows toward the well.',
  'dyn-u7-l1-q7':
    'Darcy’s law assumes slow (laminar) flow through saturated, uniform material. It can fail in fractures, karst conduits or coarse gravel where flow is fast or turbulent, or in unsaturated soil.',
  'dyn-u8-l1-q1':
    'No. Some lakes mix twice a year (dimictic), others once, many times or rarely. Mixing depends on climate, depth, size, wind exposure and salinity layering.',
  'dyn-u8-l1-q2':
    'Bogs are peatlands fed mainly by rain and snow rather than groundwater or streams. That makes them acidic and low in nutrients, favoring sphagnum moss. Fens, by contrast, receive groundwater.',
  'dyn-u8-l1-q3':
    'No. Wetlands can trap sediment and remove some nutrients, but they can become saturated or overloaded, and stored contaminants can be released again by disturbance, drying or chemical change.',
  'dyn-u8-l1-q4':
    'Lakes can be layered: warm, oxygen-rich water on top and cold, sometimes oxygen-poor water below. Measuring temperature and oxygen at several depths reveals that structure, which one surface reading would miss.',
  'dyn-u8-l1-q5':
    'Lakes form in basins created by glaciers (scouring or debris dams), tectonic movement (rift lakes), volcanoes (crater lakes), rivers (oxbow lakes from meander cutoffs) or dams built by landslides, beavers or people.',
  'dyn-u8-l1-q6':
    'A wetland can only treat so much: high loading, short residence times, unsuitable chemistry or water bypassing the wetland all reduce removal, and its storage capacity eventually fills.',
  'dyn-u8-l1-q7':
    'Predicting a reservoir needs the relationships between stored volume, water level and outflow, plus the operating rules for releases. Inflow forecasts then show how levels and downstream flows will change.',
  'dyn-u9-l1-q1':
    'When roofs, roads and parking lots drain directly into storm sewers and streams, rain reaches the channel much faster. Peaks become higher and arrive sooner, and less water soaks into the ground.',
  'dyn-u9-l1-q2':
    'Load is the mass of a pollutant carried per unit time: load = concentration × discharge. Concentration alone shows how polluted the water is, not how much pollutant is moving.',
  'dyn-u9-l1-q3':
    'No. Weather, flow and other activities may also have changed between the before and after periods. A control site or long records help separate the intervention’s effect from those confounders.',
  'dyn-u9-l1-q4':
    'Mapping which paved areas drain directly to streams shows where runoff travels fastest and carries pollutants with it. That identifies where disconnecting drainage, for example with rain gardens, would help most.',
  'dyn-u9-l1-q5':
    'Pumping lowers the water table near streams, reducing groundwater flow into them (baseflow), or even pulling water out of the stream. The effect can take months or years to appear.',
  'dyn-u9-l1-q6':
    'During high flow, concentration may drop because pollutants are diluted, but so much more water is moving that the total mass carried (load = concentration × discharge) can stay the same or rise.',
  'dyn-u9-l1-q7':
    'The lab is a simplified runoff model. It does not calculate real groundwater recharge, chemical reactions of pollutants or how well a specific intervention would work in a real watershed.',
  'dyn-u10-l1-q1':
    'A contour line on a topographic map connects points of equal elevation. Close spacing means steep slopes and wide spacing means gentle slopes. Other maps can use similar lines for different quantities, so check the legend.',
  'dyn-u10-l1-q2':
    'Vertical exaggeration stretches the vertical scale on a profile so relief is easier to see. Slopes look steeper than they are; the actual elevations and geology are unchanged.',
  'dyn-u10-l1-q3':
    'Start by defining the question, such as whether a culvert raises downstream sediment. The question determines which measurements, locations and timing are needed, avoiding data that cannot answer it.',
  'dyn-u10-l1-q4':
    'A useful map includes a scale, a legend explaining symbols and colors, the date of the data, the coordinate or reference system and how the data were collected or processed.',
  'dyn-u10-l1-q5':
    'Gauges record how much water flows and when; samples show what the water carries. Combining them gives loads and shows how concentrations change with flow during events.',
  'dyn-u10-l1-q6':
    'A Darcy groundwater estimate and a storm peak may describe different areas, flow paths and times. Some baseflow may already be part of the measured peak, so adding them could double-count water.',
  'dyn-u10-l1-q7':
    'A testable hypothesis predicts specific results that would differ if an alternative explanation were true. That way, an observation can support one explanation and rule out another.',
};
