import * as React from "react";
const Classification = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className=""
    {...props}
  >
    <path d="M3 3v18h18" />
    <rect width={12} height={4} x={7} y={5} rx={1} />
    <rect width={7} height={4} x={7} y={13} rx={1} />
  </svg>
);
export default Classification;
