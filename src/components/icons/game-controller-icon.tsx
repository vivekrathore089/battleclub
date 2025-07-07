export default function GameControllerIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15.5 2a3.5 3.5 0 0 0-3.5 3.5v1.5h-4V5.5A3.5 3.5 0 0 0 4.5 2h-2v4h2" />
        <path d="M8.5 22a3.5 3.5 0 0 0 3.5-3.5v-1.5h4v1.5a3.5 3.5 0 0 0 3.5 3.5h2v-4h-2" />
        <path d="M4 14s1-2 4-2 4 2 4 2" />
        <path d="M12 12v4" />
        <path d="M10 14h4" />
        <circle cx="17" cy="7" r="1" />
        <circle cx="19" cy="9" r="1" />
      </svg>
    );
  }
  