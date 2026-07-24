// Geometry: R = circle radius, D = R√2 (half-distance between centers).
// Tangent lines cross at exactly 90° at the center point.
//
// Crossing effect: path split into 4 segments drawn in two layers with a bgColor
// gap eraser at the crossing point.
//
// Dot animation: <animateMotion> drives position, <animate fill> drives color.
// Color keyTimes are derived from arc-length proportions so the fill matches
// the gradient exactly as the dot travels the path.
//
// Path arc-length breakdown (R=100, line=200, arc=150π≈471.24, total≈1342.48):
//   Right arc  : 0.000 → 0.351  (peak at t=0.175, x=511.42 → 100% purple)
//   Crossing ↙ : 0.351 → 0.500  (midpoint t=0.426, x=270 → 50% pink)
//   Left arc   : 0.500 → 0.851  (trough t=0.676, x=28.58 → 0% orange)
//   Crossing ↗ : 0.851 → 1.000  (midpoint t=0.926, x=270 → 50% pink)

const R   = 100
const D   = R * Math.SQRT2
const T   = R / Math.SQRT2
const W   = 540
const H   = 256
const CX  = W / 2
const CY  = H / 2

const f = v => v.toFixed(2)

const RT = [CX + T, CY - T]
const RB = [CX + T, CY + T]
const LT = [CX - T, CY - T]
const LB = [CX - T, CY + T]

// 10:30 / 7:30 on left circle, 1:30 / 4:30 on right circle (±45° from 9/3 o'clock)
const S45  = Math.SQRT2 / 2
const NLT  = [CX - D - R * S45, CY - R * S45]
const NLB  = [CX - D - R * S45, CY + R * S45]
const NRT  = [CX + D + R * S45, CY - R * S45]
const NRB  = [CX + D + R * S45, CY + R * S45]

const RIGHT_ARC  = `M ${f(RT[0])} ${f(RT[1])} A ${R} ${R} 0 1 1 ${f(RB[0])} ${f(RB[1])}`
const OVER_LINE  = `M ${f(RB[0])} ${f(RB[1])} L ${f(LT[0])} ${f(LT[1])}`
const LEFT_ARC   = `M ${f(LT[0])} ${f(LT[1])} A ${R} ${R} 0 1 0 ${f(LB[0])} ${f(LB[1])}`
const UNDER_LINE = `M ${f(LB[0])} ${f(LB[1])} L ${f(RT[0])} ${f(RT[1])}`
const FIG8       = `M ${f(RT[0])} ${f(RT[1])} A ${R} ${R} 0 1 1 ${f(RB[0])} ${f(RB[1])} L ${f(LT[0])} ${f(LT[1])} A ${R} ${R} 0 1 0 ${f(LB[0])} ${f(LB[1])} Z`

const GX1 = f(CX - (D + R))
const GX2 = f(CX + (D + R))

// Gradient color values at each keyframe, pre-interpolated from the 5 gradient stops.
// Stops: 0%=#FF8C00  28%=#FF3B2E  52%=#FF85BB  76%=#CC3DB4  100%=#7233D4
const DOT_KEY_TIMES  = '0;0.088;0.175;0.263;0.351;0.426;0.5;0.588;0.676;0.763;0.851;0.926;1'
const DOT_KEY_COLORS = [
  '#E45FB7', // t=0.000 — RT  (64.6%)
  '#A238C3', // t=0.088 — right arc 25%  (87.2%)
  '#7233D4', // t=0.175 — rightmost peak (100%)
  '#A238C3', // t=0.263 — right arc 75%  (87.2%)
  '#E45FB7', // t=0.351 — RB  (64.6%)
  '#FF7FAF', // t=0.426 — crossing ↙ mid (50%)
  '#FF5259', // t=0.500 — LT/LB (35.4%)
  '#FF6715', // t=0.588 — left arc 25%   (12.8%)
  '#FF8C00', // t=0.676 — leftmost trough (0%)
  '#FF6715', // t=0.763 — left arc 75%   (12.8%)
  '#FF5259', // t=0.851 — LB  (35.4%)
  '#FF7FAF', // t=0.926 — crossing ↗ mid (50%)
  '#E45FB7', // t=1.000 — back to RT     (64.6%)
].join(';')

export default function LoopSymbol({
  strokeWidth  = 3,
  crossing     = true,
  bgColor      = 'white',
  dotDur       = '12s',
  dotR         = null,
  leftLabel    = '',
  rightLabel   = '',
  nodeLabels   = null,
  className    = '',
}) {
  const gapHalf   = strokeWidth * 2
  const gapStroke = strokeWidth + 4
  const dx        = gapHalf / Math.SQRT2
  const resolvedDotR = dotR ?? strokeWidth * 1.8
  const dotBorder = Math.max(1.2, strokeWidth * 0.4)
  const dotRadius = resolvedDotR

  const strokeProps = {
    stroke:         'url(#loop-symbol-grad)',
    strokeWidth,
    strokeLinecap:  'round',
    strokeLinejoin: 'round',
    fill:           'none',
  }

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      overflow="visible"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient
          id="loop-symbol-grad"
          gradientUnits="userSpaceOnUse"
          x1={GX1} y1={CY} x2={GX2} y2={CY}
        >
          <stop offset="0%"   stopColor="#FF8C00" />
          <stop offset="28%"  stopColor="#FF3B2E" />
          <stop offset="52%"  stopColor="#FF85BB" />
          <stop offset="76%"  stopColor="#CC3DB4" />
          <stop offset="100%" stopColor="#7233D4" />
        </linearGradient>

        <path id="loop-symbol-motion-path" d={FIG8} />
      </defs>

      {crossing ? (
        <>
          <path d={LEFT_ARC}   {...strokeProps} />
          <path d={UNDER_LINE} {...strokeProps} />
          <line
            x1={f(CX - dx)} y1={f(CY + dx)}
            x2={f(CX + dx)} y2={f(CY - dx)}
            stroke={bgColor}
            strokeWidth={gapStroke}
            strokeLinecap="butt"
          />
          <path d={RIGHT_ARC} {...strokeProps} />
          <path d={OVER_LINE} {...strokeProps} />
        </>
      ) : (
        <path d={FIG8} {...strokeProps} />
      )}

      {/* Static node ticks + labels at the 4 positions */}
      {nodeLabels && (() => {
        const hw    = 4
        const nodes = [
          { cx: NLT[0], cy: NLT[1], color: '#FF8C00', label: nodeLabels.topLeft,     rdx: -S45, rdy: -S45 },
          { cx: NLB[0], cy: NLB[1], color: '#FF8C00', label: nodeLabels.bottomLeft,  rdx: -S45, rdy:  S45 },
          { cx: NRT[0], cy: NRT[1], color: '#7233D4', label: nodeLabels.topRight,    rdx:  S45, rdy: -S45 },
          { cx: NRB[0], cy: NRB[1], color: '#7233D4', label: nodeLabels.bottomRight, rdx:  S45, rdy:  S45 },
        ]
        return nodes.map((n, i) => {
          const isLeft   = n.cx < W / 2
          const lineEndX = n.cx + hw * n.rdx
          const textX    = isLeft ? lineEndX - 28 : lineEndX + 28
          return (
            <g key={i}>
              <text
                x={f(textX)} y={f(n.cy)}
                textAnchor={isLeft ? 'end' : 'start'} dominantBaseline="middle"
                fill="#061b31" fontSize={14} fontWeight={300}
                fontFamily="Inter, -apple-system, sans-serif"
              >{n.label}</text>
              <line
                x1={f(n.cx - hw * n.rdx)} y1={f(n.cy - hw * n.rdy)}
                x2={f(n.cx + hw * n.rdx)} y2={f(n.cy + hw * n.rdy)}
                stroke="white" strokeWidth={Math.max(1.5, strokeWidth * 0.4)} strokeLinecap="round"
              />
            </g>
          )
        })
      })()}

      {/* Circle labels */}
      {leftLabel && (
        <text
          x={f(CX - D)} y={CY}
          textAnchor="middle" dominantBaseline="middle"
          fill="#061b31" fontSize={18} fontWeight={350}
          fontFamily="Inter, -apple-system, sans-serif"
        >
          {leftLabel}
        </text>
      )}
      {rightLabel && (
        <text
          x={f(CX + D)} y={CY}
          textAnchor="middle" dominantBaseline="middle"
          fill="#061b31" fontSize={18} fontWeight={350}
          fontFamily="Inter, -apple-system, sans-serif"
        >
          {rightLabel}
        </text>
      )}

      {/* Dot: position from animateMotion, fill color from animate — both share the same dur */}
      <circle r={dotRadius} fill="#E45FB7" stroke="white" strokeWidth={dotBorder} opacity="0">
        <animateMotion dur={dotDur} repeatCount="indefinite" calcMode="paced">
          <mpath href="#loop-symbol-motion-path" />
        </animateMotion>
        <animate
          attributeName="fill"
          values={DOT_KEY_COLORS}
          keyTimes={DOT_KEY_TIMES}
          dur={dotDur}
          repeatCount="indefinite"
          calcMode="linear"
        />
        {/* hide dot at (0,0) until animateMotion has positioned it */}
        <animate
          attributeName="opacity"
          from="0" to="1"
          dur="0.001s"
          begin="0.08s"
          fill="freeze"
        />
      </circle>
    </svg>
  )
}
