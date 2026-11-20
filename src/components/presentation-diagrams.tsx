import type { ReactNode } from 'react';
import type { DiagramId } from '@/lib/presentation-types';

// Schematic diagrams for presentation slides. Colors come from presentations.css classes so the
// drawings follow the light and dark themes: ink (lines/text), accent, veg, soil, water, warm, cool.

function Frame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <svg className="presentation-diagram" viewBox="0 0 640 300" role="img" aria-label={title}>
      <title>{title}</title>
      <defs>
        <marker
          id="pd-arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0 0L10 5L0 10z" className="pd-ink-fill" />
        </marker>
      </defs>
      {children}
    </svg>
  );
}

const line = { className: 'pd-ink', fill: 'none', strokeWidth: 2 } as const;
const arrow = { ...line, markerEnd: 'url(#pd-arrow)' } as const;
function Label({
  x,
  y,
  children,
  anchor = 'middle',
  small,
}: {
  x: number;
  y: number;
  children: ReactNode;
  anchor?: 'start' | 'middle' | 'end';
  small?: boolean;
}) {
  return (
    <text x={x} y={y} textAnchor={anchor} className={small ? 'pd-text pd-small' : 'pd-text'}>
      {children}
    </text>
  );
}
const Cloud = ({ x, y }: { x: number; y: number }) => (
  <g className="pd-cloud">
    <circle cx={x} cy={y} r="22" />
    <circle cx={x + 24} cy={y + 4} r="18" />
    <circle cx={x - 20} cy={y + 6} r="16" />
  </g>
);

function MeasurementChain() {
  return (
    <Frame title="Measurement chain from Sun to processed product">
      <circle cx="60" cy="70" r="30" className="pd-warm" />
      <rect x="140" y="30" width="100" height="240" rx="10" className="pd-cool pd-soft" />
      <rect x="260" y="200" width="100" height="60" rx="8" className="pd-veg" />
      <rect x="380" y="40" width="100" height="50" rx="8" className="pd-accent" />
      <rect x="500" y="120" width="120" height="60" rx="8" className="pd-panel" />
      <path d="M90 80 L300 198" {...arrow} />
      <path d="M320 198 L420 95" {...arrow} />
      <path d="M480 70 C520 70 540 90 555 118" {...arrow} />
      <Label x={60} y={125}>
        Sun
      </Label>
      <Label x={190} y={22}>
        Atmosphere
      </Label>
      <Label x={310} y={285}>
        Target
      </Label>
      <Label x={430} y={30}>
        Sensor
      </Label>
      <Label x={560} y={200}>
        Processing
      </Label>
      <Label x={190} y={150} small>
        scatter
      </Label>
      <Label x={190} y={168} small>
        absorb
      </Label>
      <Label x={560} y={146} small>
        calibrate
      </Label>
      <Label x={560} y={164} small>
        correct
      </Label>
      <Label x={310} y={235} small>
        reflects part
      </Label>
    </Frame>
  );
}

function ActivePassive() {
  return (
    <Frame title="Passive sensors receive natural energy; active sensors transmit and receive">
      <Label x={160} y={24}>
        Passive
      </Label>
      <Label x={480} y={24}>
        Active
      </Label>
      <line x1="320" y1="10" x2="320" y2="290" className="pd-ink pd-dash" />
      <circle cx="50" cy="70" r="24" className="pd-warm" />
      <rect x="200" y="50" width="70" height="36" rx="6" className="pd-accent" />
      <rect x="40" y="240" width="240" height="30" rx="6" className="pd-veg" />
      <path d="M70 90 L150 235" {...arrow} />
      <path d="M165 235 L225 92" {...arrow} />
      <path
        d="M110 238 C120 200 150 180 205 90"
        className="pd-warm-line"
        fill="none"
        strokeWidth={2}
        strokeDasharray="5 5"
        markerEnd="url(#pd-arrow)"
      />
      <Label x={70} y={200} small>
        sunlight
      </Label>
      <Label x={225} y={170} small>
        reflected
      </Label>
      <Label x={120} y={150} small>
        emitted heat
      </Label>
      <rect x="440" y="50" width="80" height="36" rx="6" className="pd-accent" />
      <rect x="360" y="240" width="240" height="30" rx="6" className="pd-soil" />
      <path d="M465 90 L440 235" {...arrow} />
      <path d="M455 235 L480 92" {...arrow} strokeDasharray="6 4" />
      <Label x={405} y={170} small>
        pulse out
      </Label>
      <Label x={530} y={170} small>
        echo back
      </Label>
      <Label x={480} y={115} small>
        radar / lidar
      </Label>
    </Frame>
  );
}

function LidarReturns() {
  const returns: [number, string][] = [
    [72, 'First return: canopy top'],
    [165, 'Intermediate return'],
    [262, 'Last return: ground'],
  ];
  return (
    <Frame title="Lidar pulse returning from canopy layers and ground">
      <rect x="290" y="12" width="60" height="28" rx="6" className="pd-accent" />
      <path d="M320 42 L320 262" {...line} strokeDasharray="4 4" />
      <ellipse cx="320" cy="110" rx="110" ry="40" className="pd-veg" />
      <ellipse cx="320" cy="170" rx="80" ry="26" className="pd-veg pd-soft" />
      <rect x="312" y="190" width="16" height="72" className="pd-soil" />
      <rect x="60" y="262" width="520" height="16" className="pd-soil" />
      {returns.map(([y, label]) => (
        <g key={label}>
          <circle cx="320" cy={y} r="6" className="pd-accent" />
          <path d={`M330 ${y} L450 ${y}`} {...line} />
          <Label x={455} y={y + 5} anchor="start" small>
            {label}
          </Label>
        </g>
      ))}
      <path d="M150 168 L150 76" {...arrow} />
      <path d="M150 168 L150 258" {...arrow} />
      <Label x={140} y={172} anchor="end" small>
        canopy height
      </Label>
    </Frame>
  );
}

function RadarBackscatter() {
  return (
    <Frame title="Radar backscatter from smooth water, rough ground, and a building">
      {[110, 320, 510].map((x) => (
        <rect key={x} x={x - 20} y="20" width="40" height="22" rx="5" className="pd-accent" />
      ))}
      <rect x="30" y="240" width="160" height="20" className="pd-water" />
      <rect x="240" y="240" width="160" height="20" className="pd-soil" />
      <path
        d="M250 240 l12 -10 l12 10 l12 -12 l12 12 l12 -8 l12 8 l12 -10 l12 10 l12 -9 l12 9 l12 -11 l12 11"
        className="pd-ink"
        fill="none"
        strokeWidth={2}
      />
      <rect x="450" y="240" width="160" height="20" className="pd-soil" />
      <rect x="520" y="150" width="50" height="90" className="pd-panel" />
      <path d="M100 45 L110 236" {...arrow} />
      <path d="M112 238 L180 120" {...arrow} />
      <path d="M318 45 L320 226" {...arrow} />
      <path d="M300 228 L280 120" {...arrow} strokeDasharray="5 4" />
      <path d="M340 228 L360 120" {...arrow} strokeDasharray="5 4" />
      <path d="M496 45 L500 236" {...arrow} />
      <path d="M500 238 L518 238" {...line} />
      <path d="M518 230 L510 60" {...arrow} />
      <Label x={110} y={285}>
        Smooth water: dark
      </Label>
      <Label x={320} y={285}>
        Rough soil: moderate
      </Label>
      <Label x={530} y={285}>
        Building: bright
      </Label>
      <Label x={180} y={110} small>
        reflected away
      </Label>
      <Label x={560} y={140} small>
        double bounce
      </Label>
    </Frame>
  );
}

function Orbits() {
  return (
    <Frame title="Geostationary and near-polar orbits around Earth">
      <circle cx="320" cy="150" r="70" className="pd-water" />
      <ellipse cx="320" cy="150" rx="230" ry="40" {...line} strokeDasharray="6 5" />
      <circle cx="550" cy="150" r="10" className="pd-accent" />
      <Label x={600} y={195} anchor="end" small>
        geostationary (~36,000 km, above equator)
      </Label>
      <ellipse cx="320" cy="150" rx="22" ry="115" {...line} />
      <circle cx="320" cy="35" r="8" className="pd-warm" />
      <Label x={335} y={30} anchor="start" small>
        near-polar, low orbit (~700 km)
      </Label>
      <path d="M180 262 C220 282 260 286 300 280" {...arrow} />
      <Label x={130} y={272} small>
        Earth turns
      </Label>
      <Label x={320} y={155}>
        Earth
      </Label>
    </Frame>
  );
}

function SwathRevisit() {
  return (
    <Frame title="Satellite ground tracks with swaths and clouds">
      <rect x="20" y="20" width="600" height="250" rx="10" className="pd-veg pd-soft" />
      {[60, 200, 340, 480].map((x, i) => (
        <g key={x}>
          <polygon
            points={`${x},20 ${x + 60},20 ${x + 110},270 ${x + 50},270`}
            className="pd-accent pd-soft"
          />
          <Label x={x + 80} y={290} small>
            pass {i + 1}
          </Label>
        </g>
      ))}
      <Cloud x={120} y={110} />
      <Cloud x={280} y={190} />
      <Cloud x={430} y={90} />
      <Label x={320} y={42} small>
        swath = ground width seen per pass · clouds block optical views
      </Label>
    </Frame>
  );
}

function RgbComposite() {
  const bands: [string, string][] = [
    ['Blue', 'pd-b'],
    ['Green', 'pd-g'],
    ['Red', 'pd-r'],
    ['NIR', 'pd-nir'],
  ];
  const channels: [string, string][] = [
    ['R channel', 'pd-r'],
    ['G channel', 'pd-g'],
    ['B channel', 'pd-b'],
  ];
  return (
    <Frame title="Assigning measured bands to display channels">
      <Label x={110} y={24}>
        Measured bands
      </Label>
      <Label x={520} y={24}>
        Display (color-infrared)
      </Label>
      {bands.map(([band, cls], i) => (
        <g key={band}>
          <rect x="40" y={40 + i * 56} width="140" height="42" rx="8" className={cls} />
          <Label x={110} y={66 + i * 56}>
            {band}
          </Label>
        </g>
      ))}
      {channels.map(([channel, cls], i) => (
        <g key={channel}>
          <rect x="450" y={50 + i * 72} width="140" height="48" rx="8" className={cls} />
          <Label x={520} y={79 + i * 72}>
            {channel}
          </Label>
        </g>
      ))}
      <path d="M180 229 L448 76" {...arrow} />
      <path d="M180 173 L448 148" {...arrow} />
      <path d="M180 117 L448 220" {...arrow} />
      <Label x={320} y={285} small>
        NIR→R, Red→G, Green→B: healthy vegetation looks red
      </Label>
    </Frame>
  );
}

function SpectralSignatures() {
  const x = (nm: number) => 70 + ((nm - 400) / 2100) * 540;
  const y = (r: number) => 260 - r * 380;
  const curve = (points: [number, number][]) =>
    points.map(([nm, r], i) => `${i ? 'L' : 'M'}${x(nm)} ${y(r)}`).join(' ');
  const ticks: [number, string][] = [
    [450, 'blue'],
    [550, 'green'],
    [660, 'red'],
    [850, 'NIR'],
    [1650, 'SWIR'],
  ];
  return (
    <Frame title="Spectral reflectance curves for vegetation, soil, and water">
      <path d="M70 20 L70 260 L610 260" {...line} />
      {ticks.map(([nm, label]) => (
        <Label key={label} x={x(nm)} y={280} small>
          {label}
        </Label>
      ))}
      <rect x={x(630)} y="20" width={x(690) - x(630)} height="240" className="pd-r pd-soft" />
      <rect x={x(770)} y="20" width={x(900) - x(770)} height="240" className="pd-nir pd-soft" />
      <path
        d={curve([
          [400, 0.04],
          [500, 0.06],
          [550, 0.12],
          [620, 0.05],
          [680, 0.04],
          [720, 0.3],
          [800, 0.5],
          [1100, 0.48],
          [1400, 0.22],
          [1650, 0.3],
          [1900, 0.12],
          [2200, 0.18],
          [2500, 0.1],
        ])}
        className="pd-veg-line"
        fill="none"
        strokeWidth={3}
      />
      <path
        d={curve([
          [400, 0.1],
          [600, 0.18],
          [800, 0.25],
          [1200, 0.32],
          [1650, 0.38],
          [2200, 0.36],
          [2500, 0.34],
        ])}
        className="pd-soil-line"
        fill="none"
        strokeWidth={3}
      />
      <path
        d={curve([
          [400, 0.08],
          [500, 0.07],
          [600, 0.04],
          [700, 0.02],
          [850, 0.01],
          [1200, 0],
          [2500, 0],
        ])}
        className="pd-water-line"
        fill="none"
        strokeWidth={3}
      />
      <Label x={x(1000)} y={y(0.53)} small>
        vegetation
      </Label>
      <Label x={x(2050)} y={y(0.41)} small>
        soil
      </Label>
      <Label x={x(1200)} y={y(0.04)} small>
        water
      </Label>
      <Label x={36} y={140} small>
        reflect.
      </Label>
    </Frame>
  );
}

function MixedPixel() {
  return (
    <Frame title="One pixel footprint containing vegetation and soil">
      {Array.from({ length: 64 }, (_, i) => {
        const r = Math.floor(i / 8);
        const c = i % 8;
        return (
          <rect
            key={i}
            x={40 + c * 28}
            y={30 + r * 28}
            width="28"
            height="28"
            className={c + r < 8 ? 'pd-veg' : 'pd-soil'}
          />
        );
      })}
      <rect x="40" y="30" width="224" height="224" {...line} strokeWidth={4} />
      <rect x="70" y="60" width="18" height="18" className="pd-accent" />
      <Label x={79} y={54} small>
        plot
      </Label>
      <Label x={152} y={280} small>
        one pixel footprint (e.g. 30 m × 30 m = 900 m²)
      </Label>
      <path d="M280 140 L330 140" {...arrow} />
      <Label x={480} y={70}>
        Mixed value per band
      </Label>
      <Label x={480} y={110} small>
        NIR = f·NIRveg + (1−f)·NIRsoil
      </Label>
      <Label x={480} y={140} small>
        red = f·redveg + (1−f)·redsoil
      </Label>
      <Label x={480} y={180} small>
        then NDVI = (NIR − red)/(NIR + red)
      </Label>
      <Label x={480} y={225} small>
        mix bands first — ratios don’t average linearly
      </Label>
    </Frame>
  );
}

function ResolutionTypes() {
  const panel = (x: number, title: string, caption: string, body: ReactNode) => (
    <g key={title}>
      <rect x={x} y="20" width="140" height="250" rx="10" className="pd-panel" />
      <Label x={x + 70} y={46}>
        {title}
      </Label>
      {body}
      <Label x={x + 70} y={250} small>
        {caption}
      </Label>
    </g>
  );
  const spectral = ['pd-b', 'pd-g', 'pd-r', 'pd-nir', 'pd-nir', 'pd-soil', 'pd-warm'];
  return (
    <Frame title="Spatial, spectral, temporal and radiometric resolution">
      {panel(
        15,
        'Spatial',
        'ground detail',
        Array.from({ length: 16 }, (_, i) => (
          <rect
            key={i}
            x={35 + (i % 4) * 25}
            y={70 + Math.floor(i / 4) * 25}
            width="24"
            height="24"
            className={(i + Math.floor(i / 4)) % 3 ? 'pd-veg' : 'pd-soil'}
          />
        )),
      )}
      {panel(
        170,
        'Spectral',
        'wavelengths',
        spectral.map((cls, i) => (
          <rect key={i} x={185 + i * 16} y={80} width="12" height="120" className={cls} />
        )),
      )}
      {panel(
        325,
        'Temporal',
        'how often',
        [0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <circle
              cx={351 + i * 22}
              cy={140}
              r="8"
              className={i === 2 ? 'pd-cloud' : 'pd-accent'}
            />
            <Label x={351 + i * 22} y={172} small>
              {`d${i * 4}`}
            </Label>
          </g>
        )),
      )}
      {panel(
        480,
        'Radiometric',
        'signal levels',
        [0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <rect
            key={i}
            x={498 + i * 13}
            y={80}
            width="13"
            height="120"
            className="pd-ink-fill"
            style={{ opacity: 0.1 + i * 0.12 }}
          />
        )),
      )}
    </Frame>
  );
}

function EmSpectrum() {
  const regions: [string, string][] = [
    ['Gamma', 'pd-panel'],
    ['X-ray', 'pd-panel'],
    ['UV', 'pd-b'],
    ['Visible', 'pd-g'],
    ['Near-IR', 'pd-nir'],
    ['Thermal', 'pd-warm'],
    ['Microwave', 'pd-accent'],
    ['Radio', 'pd-panel'],
  ];
  return (
    <Frame title="Electromagnetic spectrum from gamma rays to radio waves">
      <path
        d="M30 50 q10 -30 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0"
        className="pd-ink"
        fill="none"
        strokeWidth={2}
      />
      <path d="M340 50 q60 -30 120 0 t120 0" className="pd-ink" fill="none" strokeWidth={2} />
      <Label x={160} y={88} small>
        short λ, high f, high energy
      </Label>
      <Label x={480} y={88} small>
        long λ, low f, low energy
      </Label>
      {regions.map(([label, cls], i) => (
        <g key={label}>
          <rect x={20 + i * 75} y="100" width="72" height="56" rx="6" className={cls} />
          <Label x={56 + i * 75} y={133} small>
            {label}
          </Label>
        </g>
      ))}
      <path d="M30 185 L610 185" {...arrow} />
      <Label x={320} y={208} small>
        wavelength increases →
      </Label>
      <Label x={320} y={245} small>
        optical: visible–SWIR · thermal sensors: thermal IR · radar: microwave
      </Label>
      <Label x={320} y={275}>
        c = λ × f E = h × f
      </Label>
    </Frame>
  );
}

function Snell() {
  return (
    <Frame title="Refraction at a boundary with the normal drawn">
      <rect x="40" y="150" width="560" height="130" className="pd-water pd-soft" />
      <line x1="40" y1="150" x2="600" y2="150" {...line} />
      <line x1="320" y1="20" x2="320" y2="280" className="pd-ink pd-dash" />
      <path d="M200 30 L318 148" {...arrow} />
      <path d="M320 150 L390 278" {...arrow} />
      <path d="M320 150 L440 30" className="pd-ink pd-dash" fill="none" strokeWidth={1.5} />
      <path d="M320 95 A55 55 0 0 0 281 111" {...line} />
      <path d="M320 205 A55 55 0 0 0 346 198" {...line} />
      <Label x={292} y={88} small>
        θ₁
      </Label>
      <Label x={345} y={226} small>
        θ₂
      </Label>
      <Label x={60} y={140} anchor="start" small>
        medium 1: n₁ (air ≈ 1.0)
      </Label>
      <Label x={60} y={270} anchor="start" small>
        medium 2: n₂ (water ≈ 1.33)
      </Label>
      <Label x={328} y={32} anchor="start" small>
        normal
      </Label>
      <Label x={520} y={100}>
        n₁ sin θ₁ = n₂ sin θ₂
      </Label>
      <Label x={470} y={42} small>
        reflected
      </Label>
    </Frame>
  );
}

function EnergyPartition() {
  return (
    <Frame title="Incident energy split into reflected, absorbed, and transmitted parts">
      <rect x="200" y="130" width="240" height="60" className="pd-veg pd-soft" />
      <path d="M140 30 L300 128" {...arrow} strokeWidth={4} />
      <path d="M320 130 L470 40" {...arrow} />
      <path d="M330 190 L400 280" {...arrow} />
      <circle cx="330" cy="160" r="12" className="pd-warm" />
      <Label x={140} y={22}>
        incident (1.0)
      </Label>
      <Label x={520} y={36}>
        reflected ρ
      </Label>
      <Label x={470} y={285}>
        transmitted τ
      </Label>
      <Label x={330} y={215} small>
        absorbed α (heats material)
      </Label>
      <Label x={110} y={250}>
        ρ + α + τ = 1
      </Label>
      <Label x={110} y={275} small>
        (one wavelength, one geometry)
      </Label>
    </Frame>
  );
}

function AlbedoBalance() {
  return (
    <Frame title="Shortwave in, reflected by albedo, absorbed, and longwave emitted">
      <circle cx="60" cy="60" r="32" className="pd-warm" />
      <rect x="40" y="230" width="560" height="40" className="pd-soil" />
      <rect x="140" y="218" width="160" height="14" className="pd-cloud" />
      <path d="M90 80 L230 216" {...arrow} strokeWidth={5} />
      <path d="M245 216 L330 90" {...arrow} strokeWidth={2.5} />
      {[420, 470].map((x) => (
        <path
          key={x}
          d={`M${x} 228 C${x + 10} 190 ${x - 10} 150 ${x + 20} 110`}
          className="pd-warm-line"
          fill="none"
          strokeWidth={3}
          strokeDasharray="7 5"
          markerEnd="url(#pd-arrow)"
        />
      ))}
      <Label x={130} y={150} small>
        incoming shortwave S
      </Label>
      <Label x={330} y={80} small>
        reflected = α·S
      </Label>
      <Label x={320} y={256} small>
        absorbed = (1−α)·S
      </Label>
      <Label x={470} y={95} small>
        longwave emitted (thermal)
      </Label>
      <Label x={220} y={210} small>
        snow: high α
      </Label>
      <Label x={560} y={40} small>
        planet average: S(1−α)/4
      </Label>
    </Frame>
  );
}

function WaterCycle() {
  return (
    <Frame title="Water cycle: evaporation, condensation, precipitation, runoff, infiltration">
      <rect x="20" y="220" width="250" height="60" className="pd-water" />
      <polygon points="270,280 270,220 420,140 620,140 620,280" className="pd-soil" />
      <rect x="270" y="262" width="350" height="18" className="pd-water pd-soft" />
      <Cloud x={330} y={60} />
      <circle cx="560" cy="120" r="18" className="pd-veg" />
      <path d="M120 215 C130 160 210 100 290 72" {...arrow} />
      <path d="M555 100 C540 70 470 60 375 62" {...arrow} />
      {[330, 360, 390].map((x) => (
        <path key={x} d={`M${x} 92 L${x + 20} 150`} {...arrow} />
      ))}
      <path d="M470 150 C400 175 330 200 275 222" {...arrow} />
      <path d="M520 160 L520 250" {...arrow} strokeDasharray="5 4" />
      <Label x={130} y={150}>
        evaporation
      </Label>
      <Label x={540} y={55}>
        transpiration
      </Label>
      <Label x={330} y={22}>
        condensation
      </Label>
      <Label x={430} y={120}>
        precipitation
      </Label>
      <Label x={370} y={205}>
        runoff
      </Label>
      <Label x={570} y={240}>
        infiltration
      </Label>
      <Label x={445} y={275} small>
        groundwater (not seen by optical sensors)
      </Label>
    </Frame>
  );
}

function CarbonCycle() {
  return (
    <Frame title="Carbon cycle between atmosphere, vegetation, soil, and ocean">
      <rect x="220" y="20" width="200" height="50" rx="10" className="pd-panel" />
      <Label x={320} y={50}>
        Atmosphere CO₂
      </Label>
      <rect x="40" y="170" width="170" height="60" rx="10" className="pd-veg" />
      <Label x={125} y={205}>
        Vegetation biomass
      </Label>
      <rect x="240" y="230" width="160" height="50" rx="10" className="pd-soil" />
      <Label x={320} y={260}>
        Soil carbon
      </Label>
      <rect x="440" y="170" width="160" height="60" rx="10" className="pd-water" />
      <Label x={520} y={205}>
        Ocean
      </Label>
      <path d="M235 70 L140 166" {...arrow} />
      <Label x={140} y={110} small>
        photosynthesis
      </Label>
      <path d="M175 166 L270 74" {...arrow} strokeDasharray="5 4" />
      <Label x={255} y={135} small>
        respiration, fire
      </Label>
      <path d="M200 232 L238 248" {...arrow} />
      <Label x={195} y={262} small>
        litter
      </Label>
      <path d="M330 226 L330 74" {...arrow} strokeDasharray="5 4" />
      <Label x={370} y={150} small>
        decomposition
      </Label>
      <path d="M410 70 L500 166" {...arrow} />
      <path d="M520 166 L430 72" {...arrow} />
      <Label x={540} y={110} small>
        ocean exchange
      </Label>
    </Frame>
  );
}

function HazardRisk() {
  return (
    <Frame title="Risk as the overlap of hazard, exposure, and vulnerability">
      <circle cx="250" cy="120" r="90" className="pd-water pd-soft" />
      <circle cx="390" cy="120" r="90" className="pd-warm pd-soft" />
      <circle cx="320" cy="200" r="90" className="pd-accent pd-soft" />
      <Label x={215} y={90}>
        Hazard
      </Label>
      <Label x={215} y={110} small>
        flood, fire, ash
      </Label>
      <Label x={425} y={90}>
        Exposure
      </Label>
      <Label x={425} y={110} small>
        people, buildings
      </Label>
      <Label x={320} y={255}>
        Vulnerability
      </Label>
      <Label x={320} y={273} small>
        susceptibility to harm
      </Label>
      <Label x={320} y={160}>
        RISK
      </Label>
      <Label x={90} y={250} small>
        satellites map hazard best
      </Label>
    </Frame>
  );
}

function PhenologyCurve() {
  const pts: [number, number][] = [
    [0, 0.15],
    [1, 0.18],
    [2, 0.3],
    [3, 0.55],
    [4, 0.75],
    [5, 0.8],
    [6, 0.72],
    [7, 0.45],
    [8, 0.2],
    [9, 0.15],
  ];
  const x = (m: number) => 70 + m * 58;
  const y = (v: number) => 260 - v * 260;
  return (
    <Frame title="Seasonal vegetation index curve for a crop">
      <path d="M70 20 L70 260 L610 260" {...line} />
      <path
        d={pts.map(([m, v], i) => `${i ? 'L' : 'M'}${x(m)} ${y(v)}`).join(' ')}
        className="pd-veg-line"
        fill="none"
        strokeWidth={3}
        strokeDasharray="0"
      />
      {pts.map(([m, v]) =>
        m === 6 ? null : <circle key={m} cx={x(m)} cy={y(v)} r="4" className="pd-veg" />,
      )}
      <circle cx={x(6)} cy={y(0.72)} r="8" className="pd-cloud" />
      <Label x={x(6) + 12} y={y(0.72) - 12} anchor="start" small>
        cloudy gap (interpolated)
      </Label>
      <Label x={x(1)} y={y(0.3)} small>
        planting
      </Label>
      <Label x={x(3) - 10} y={y(0.66)} small>
        green-up
      </Label>
      <Label x={x(5)} y={y(0.88)} small>
        peak
      </Label>
      <Label x={x(8) + 10} y={y(0.36)} small>
        senescence / harvest
      </Label>
      <Label x={340} y={288} small>
        season →
      </Label>
      <Label x={36} y={140} small>
        index
      </Label>
    </Frame>
  );
}

function MapScale() {
  return (
    <Frame title="Map scale bar and conversion from map to ground distance">
      <rect x="40" y="40" width="300" height="200" rx="8" className="pd-veg pd-soft" />
      {[1, 2, 3, 4, 5].map((i) => (
        <line
          key={`v${i}`}
          x1={40 + i * 50}
          y1="40"
          x2={40 + i * 50}
          y2="240"
          className="pd-ink pd-faint"
        />
      ))}
      {[1, 2, 3].map((i) => (
        <line
          key={`h${i}`}
          x1="40"
          y1={40 + i * 50}
          x2="340"
          y2={40 + i * 50}
          className="pd-ink pd-faint"
        />
      ))}
      <path d="M60 32 L60 8" {...arrow} />
      <Label x={74} y={26} small>
        N
      </Label>
      <circle cx="90" cy="190" r="6" className="pd-accent" />
      <circle cx="240" cy="190" r="6" className="pd-accent" />
      <path d="M90 190 L240 190" {...line} strokeDasharray="5 4" />
      <Label x={165} y={180} small>
        3 cm on the map
      </Label>
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={60 + i * 50}
          y="258"
          width="50"
          height="10"
          className={i % 2 ? 'pd-panel' : 'pd-ink-fill'}
        />
      ))}
      <Label x={60} y={290} small>
        0
      </Label>
      <Label x={260} y={290} small>
        2 km
      </Label>
      <Label x={490} y={80}>
        Scale 1 : 50,000
      </Label>
      <Label x={490} y={115} small>
        1 cm = 50,000 cm = 500 m
      </Label>
      <Label x={490} y={145} small>
        3 cm × 500 m = 1.5 km
      </Label>
      <Label x={490} y={190} small>
        area: 10 m pixel = 100 m²
      </Label>
      <Label x={490} y={215} small>
        100 pixels = 1 hectare
      </Label>
    </Frame>
  );
}

function StretchHistogram() {
  const bars = [2, 5, 12, 22, 30, 24, 14, 6, 3];
  return (
    <Frame title="A linear contrast stretch mapping a narrow value range to the full display range">
      <Label x={170} y={24}>
        Stored values (narrow range)
      </Label>
      <Label x={490} y={24}>
        Displayed brightness
      </Label>
      {bars.map((h, i) => (
        <rect
          key={`a${i}`}
          x={110 + i * 14}
          y={200 - h * 5}
          width="12"
          height={h * 5}
          className="pd-accent"
        />
      ))}
      <path d="M40 200 L300 200" {...line} />
      {bars.map((h, i) => (
        <rect
          key={`b${i}`}
          x={362 + i * 29}
          y={200 - h * 5}
          width="25"
          height={h * 5}
          className="pd-accent pd-soft"
        />
      ))}
      <path d="M350 200 L630 200" {...line} />
      <path d="M110 212 L360 238" {...arrow} />
      <path d="M234 212 L620 238" {...arrow} />
      {Array.from({ length: 13 }, (_, i) => (
        <rect
          key={`r${i}`}
          x={360 + i * 20}
          y="246"
          width="20"
          height="16"
          className="pd-ink-fill"
          style={{ opacity: 0.05 + i * 0.075 }}
        />
      ))}
      <Label x={320} y={288} small>
        the stored values do not change — only how they are drawn
      </Label>
    </Frame>
  );
}

function NdviScale() {
  const x = (v: number) => 60 + ((v + 1) / 2) * 520;
  const marks: [number, string][] = [
    [-0.4, 'water'],
    [0.1, 'bare soil, rock'],
    [0.35, 'sparse vegetation'],
    [0.75, 'dense green canopy'],
  ];
  return (
    <Frame title="NDVI number line from −1 to +1 with typical surfaces">
      <rect x={x(-1)} y="120" width={x(0) - x(-1)} height="30" className="pd-water" />
      <rect x={x(0)} y="120" width={x(0.25) - x(0)} height="30" className="pd-soil" />
      <rect x={x(0.25)} y="120" width={x(1) - x(0.25)} height="30" className="pd-veg" />
      {[-1, -0.5, 0, 0.5, 1].map((v) => (
        <g key={v}>
          <line x1={x(v)} y1="150" x2={x(v)} y2="165" {...line} />
          <Label x={x(v)} y={182} small>
            {String(v)}
          </Label>
        </g>
      ))}
      {marks.map(([v, label], i) => (
        <g key={label}>
          <path d={i % 2 ? `M${x(v)} 230 L${x(v)} 156` : `M${x(v)} 72 L${x(v)} 114`} {...arrow} />
          <Label x={x(v)} y={i % 2 ? 248 : 62} small>
            {label}
          </Label>
        </g>
      ))}
      <Label x={320} y={28}>
        NDVI = (NIR − red) / (NIR + red)
      </Label>
      <Label x={320} y={285} small>
        typical values only — no universal threshold for health or species
      </Label>
    </Frame>
  );
}

const diagrams: Record<DiagramId, () => ReactNode> = {
  'measurement-chain': MeasurementChain,
  'active-passive': ActivePassive,
  'lidar-returns': LidarReturns,
  'radar-backscatter': RadarBackscatter,
  orbits: Orbits,
  'swath-revisit': SwathRevisit,
  'rgb-composite': RgbComposite,
  'spectral-signatures': SpectralSignatures,
  'mixed-pixel': MixedPixel,
  'resolution-types': ResolutionTypes,
  'em-spectrum': EmSpectrum,
  snell: Snell,
  'energy-partition': EnergyPartition,
  'albedo-balance': AlbedoBalance,
  'water-cycle': WaterCycle,
  'carbon-cycle': CarbonCycle,
  'hazard-risk': HazardRisk,
  'phenology-curve': PhenologyCurve,
  'map-scale': MapScale,
  'stretch-histogram': StretchHistogram,
  'ndvi-scale': NdviScale,
};

export function PresentationDiagram({ id }: { id: DiagramId }) {
  const Diagram = diagrams[id];
  return <Diagram />;
}
