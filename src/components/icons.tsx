import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function ChevronDown16(props: IconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.5312 5.52729C3.79155 5.26694 4.21366 5.26694 4.47401 5.52729L8.0026 9.05589L11.5312 5.52729C11.7915 5.26694 12.2137 5.26694 12.474 5.52729C12.7344 5.78764 12.7344 6.20975 12.474 6.4701L8.47401 10.4701C8.21366 10.7305 7.79155 10.7305 7.5312 10.4701L3.5312 6.4701C3.27085 6.20975 3.27085 5.78764 3.5312 5.52729Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ChevronRight12(props: IconProps) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.14645 2.64645C4.34171 2.45118 4.65829 2.45118 4.85355 2.64645L7.85355 5.64645C8.04882 5.84171 8.04882 6.15829 7.85355 6.35355L4.85355 9.35355C4.65829 9.54882 4.34171 9.54882 4.14645 9.35355C3.95118 9.15829 3.95118 8.84171 4.14645 8.64645L6.79289 6L4.14645 3.35355C3.95118 3.15829 3.95118 2.84171 4.14645 2.64645Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ChevronLeft24(props: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.29289 5.29289C8.68342 4.90237 9.31658 4.90237 9.70711 5.29289L15.7071 11.2929C16.0976 11.6834 16.0976 12.3166 15.7071 12.7071L9.70711 18.7071C9.31658 19.0976 8.68342 19.0976 8.29289 18.7071C7.90237 18.3166 7.90237 17.6834 8.29289 17.2929L13.5858 12L8.29289 6.70711C7.90237 6.31658 7.90237 5.68342 8.29289 5.29289Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ChevronRight24(props: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: "rotate(180deg)" }}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.29289 5.29289C8.68342 4.90237 9.31658 4.90237 9.70711 5.29289L15.7071 11.2929C16.0976 11.6834 16.0976 12.3166 15.7071 12.7071L9.70711 18.7071C9.31658 19.0976 8.68342 19.0976 8.29289 18.7071C7.90237 18.3166 7.90237 17.6834 8.29289 17.2929L13.5858 12L8.29289 6.70711C7.90237 6.31658 7.90237 5.68342 8.29289 5.29289Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Globe20(props: IconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#globe-clip)">
        <path
          d="M10 19.375C15.1777 19.375 19.375 15.1777 19.375 10C19.375 4.82233 15.1777 0.625 10 0.625C4.82233 0.625 0.625 4.82233 0.625 10C0.625 15.1777 4.82233 19.375 10 19.375Z"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.74083 19.1008C6.4725 17.2408 5.625 13.8608 5.625 10C5.625 6.13917 6.4725 2.75917 7.74083 0.89917"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M0.625 10H19.375"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.06836 15H17.9317"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.06836 5H17.9317"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.2588 0.89917C13.5271 2.75917 14.3746 6.13917 14.3746 10C14.3746 13.8608 13.5271 17.2408 12.2588 19.1008"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="globe-clip">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function LinkedIn20(props: IconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#li-clip)">
        <path
          d="M18.5195 0H1.47656C0.660156 0 0 0.644531 0 1.44141V18.5547C0 19.3516 0.660156 20 1.47656 20H18.5195C19.3359 20 20 19.3516 20 18.5586V1.44141C20 0.644531 19.3359 0 18.5195 0ZM5.93359 17.043H2.96484V7.49609H5.93359V17.043ZM4.44922 6.19531C3.49609 6.19531 2.72656 5.42578 2.72656 4.47656C2.72656 3.52734 3.49609 2.75781 4.44922 2.75781C5.39844 2.75781 6.16797 3.52734 6.16797 4.47656C6.16797 5.42188 5.39844 6.19531 4.44922 6.19531ZM17.043 17.043H14.0781V12.4023C14.0781 11.2969 14.0586 9.87109 12.5352 9.87109C10.9922 9.87109 10.7578 11.0781 10.7578 12.3242V17.043H7.79688V7.49609H10.6406V8.80078H10.6797C11.0742 8.05078 12.043 7.25781 13.4844 7.25781C16.4883 7.25781 17.043 9.23438 17.043 11.8047V17.043Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="li-clip">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function MarocLogo(props: IconProps) {
  return (
    <svg
      width="160"
      height="32"
      viewBox="0 0 160 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <text
        x="0"
        y="24"
        fill="currentColor"
        fontFamily="Inter, sans-serif"
        fontSize="22"
        fontWeight="700"
        letterSpacing="-0.5"
      >
        Maroc 360
      </text>
    </svg>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8 1.5L9.854 5.6L14.5 6.156L11 9.5L11.854 14L8 11.7L4.146 14L5 9.5L1.5 6.156L6.146 5.6L8 1.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
