/**
 * Architecture diagram drawn as inline SVG from columns of nodes, read left
 * to right. From lg it is one wide drawing; below lg the same columns stack
 * as bands read top to bottom, so the text stays legible on a phone.
 * Colours come from the site tokens through Tailwind fill and stroke classes.
 */

export type FlowNode = {
  label: string;
  /** One short line each. */
  detail: string[];
  /** Draws the node in the accent colour (the step that matters most). */
  accent?: boolean;
};

export type FlowColumn = {
  title: string;
  nodes: FlowNode[];
};

type Props = {
  columns: FlowColumn[];
  /** Read by screen readers in place of the drawing. */
  summary: string;
};

const LABEL = 13;
const LINE = 15;
const PAD_Y = 12;
const NODE_GAP = 12;

const nodeHeight = (n: FlowNode) => PAD_Y * 2 + LABEL + 4 + n.detail.length * LINE;
const columnHeight = (c: FlowColumn) =>
  c.nodes.reduce((h, n) => h + nodeHeight(n), 0) + (c.nodes.length - 1) * NODE_GAP;

/** Top edge of each node in a column whose first node starts at `top`. */
function nodeTops(col: FlowColumn, top: number): number[] {
  const tops: number[] = [];
  let y = top;
  for (const node of col.nodes) {
    tops.push(y);
    y += nodeHeight(node) + NODE_GAP;
  }
  return tops;
}

function Node({ node, x, y, w }: { node: FlowNode; x: number; y: number; w: number }) {
  const h = nodeHeight(node);
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={10}
        className={
          node.accent
            ? "fill-accent/[0.08] stroke-accent/50"
            : "fill-bg-elevated stroke-white/10"
        }
        strokeWidth={1}
      />
      <text
        x={x + 12}
        y={y + PAD_Y + LABEL - 2}
        className={node.accent ? "fill-accent" : "fill-white"}
        style={{ fontFamily: "var(--font-geist)", fontSize: LABEL, fontWeight: 600 }}
      >
        {node.label}
      </text>
      {node.detail.map((line, i) => (
        <text
          key={line}
          x={x + 12}
          y={y + PAD_Y + LABEL + 4 + (i + 1) * LINE - 3}
          className="fill-white/55"
          style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11.5 }}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

function Title({ x, y, children }: { x: number; y: number; children: string }) {
  return (
    <text
      x={x}
      y={y}
      className="fill-accent"
      style={{
        fontFamily: "var(--font-jetbrains-mono)",
        fontSize: 10,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </text>
  );
}

function Arrow({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  const horizontal = y1 === y2;
  const head = horizontal
    ? `M ${x2 - 6} ${y2 - 4} L ${x2} ${y2} L ${x2 - 6} ${y2 + 4}`
    : `M ${x2 - 4} ${y2 - 6} L ${x2} ${y2} L ${x2 + 4} ${y2 - 6}`;
  return (
    <g className="stroke-accent/70" fill="none" strokeWidth={1.5} strokeLinecap="round">
      <path d={`M ${x1} ${y1} L ${x2} ${y2}`} strokeDasharray="3 4" />
      <path d={head} strokeLinejoin="round" />
    </g>
  );
}

function Wide({ columns }: { columns: FlowColumn[] }) {
  const W = 960;
  const GAP = 34;
  const colW = (W - GAP * (columns.length - 1)) / columns.length;
  const TOP = 28;
  const body = Math.max(...columns.map(columnHeight));
  const H = TOP + body + 4;
  const mid = TOP + body / 2;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="hidden h-auto w-full lg:block" aria-hidden>
      {columns.map((col, ci) => {
        const x = ci * (colW + GAP);
        const tops = nodeTops(col, TOP + (body - columnHeight(col)) / 2);
        return (
          <g key={col.title}>
            <Title x={x} y={12}>
              {col.title}
            </Title>
            {col.nodes.map((node, ni) => (
              <Node key={node.label} node={node} x={x} y={tops[ni]} w={colW} />
            ))}
            {ci < columns.length - 1 ? (
              <Arrow x1={x + colW + 6} y1={mid} x2={x + colW + GAP - 6} y2={mid} />
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}

function Tall({ columns }: { columns: FlowColumn[] }) {
  const W = 340;
  const BAND_GAP = 44;
  const bandTops: number[] = [];
  let top = 0;
  for (const col of columns) {
    bandTops.push(top);
    top += 24 + columnHeight(col) + BAND_GAP;
  }
  const H = top - BAND_GAP + 2;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto h-auto w-full max-w-[400px] lg:hidden" aria-hidden>
      {columns.map((col, ci) => {
        const y = bandTops[ci];
        const tops = nodeTops(col, y + 24);
        const bottom = y + 24 + columnHeight(col);
        return (
          <g key={col.title}>
            <Title x={0} y={y + 12}>
              {col.title}
            </Title>
            {col.nodes.map((node, ni) => (
              <Node key={node.label} node={node} x={0} y={tops[ni]} w={W} />
            ))}
            {ci < columns.length - 1 ? (
              <Arrow x1={W / 2} y1={bottom + 8} x2={W / 2} y2={bottom + BAND_GAP - 8} />
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}

export function FlowDiagram({ columns, summary }: Props) {
  return (
    <figure
      className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-bg-surface p-5 md:p-8 lg:-mx-24 xl:-mx-32"
      style={{
        boxShadow:
          "0 24px 60px -28px rgba(0, 229, 192, 0.18), 0 0 0 1px rgba(255, 255, 255, 0.02) inset",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,229,192,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,192,1) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="relative">
        <Wide columns={columns} />
        <Tall columns={columns} />
      </div>
      <figcaption className="sr-only">{summary}</figcaption>
    </figure>
  );
}
