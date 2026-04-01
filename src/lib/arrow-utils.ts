export function buildArrowHeadPath(tipX: number, tipY: number, cpX: number, cpY: number, size: number): string {
  const angle = Math.atan2(tipY - cpY, tipX - cpX);
  const h1x = tipX - size * Math.cos(angle - 0.4);
  const h1y = tipY - size * Math.sin(angle - 0.4);
  const h2x = tipX - size * Math.cos(angle + 0.4);
  const h2y = tipY - size * Math.sin(angle + 0.4);
  return `M${h1x.toFixed(1)} ${h1y.toFixed(1)} L${tipX} ${tipY} L${h2x.toFixed(1)} ${h2y.toFixed(1)}`;
}
