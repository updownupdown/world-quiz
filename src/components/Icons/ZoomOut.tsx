import * as React from "react";

export function ZoomOut(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="#000000"
      xmlns="https://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.9716 14.4716H15.1816L14.9016 14.2016C16.1016 12.8016 16.7216 10.8916 16.3816 8.86157C15.9116 6.08157 13.5916 3.86157 10.7916 3.52157C6.56157 3.00157 3.00157 6.56157 3.52157 10.7916C3.86157 13.5916 6.08157 15.9116 8.86157 16.3816C10.8916 16.7216 12.8016 16.1016 14.2016 14.9016L14.4716 15.1816V15.9716L18.7316 20.2216C19.1416 20.6316 19.8016 20.6316 20.2116 20.2216L20.2216 20.2116C20.6316 19.8016 20.6316 19.1416 20.2216 18.7316L15.9716 14.4716ZM9.97157 14.4716C7.48157 14.4716 5.47157 12.4616 5.47157 9.97157C5.47157 7.48157 7.48157 5.47157 9.97157 5.47157C12.4616 5.47157 14.4716 7.48157 14.4716 9.97157C14.4716 12.4616 12.4616 14.4716 9.97157 14.4716ZM12.4716 9.97157C12.4716 9.69157 12.2516 9.47157 11.9716 9.47157H7.97157C7.69157 9.47157 7.47157 9.69157 7.47157 9.97157C7.47157 10.2516 7.69157 10.4716 7.97157 10.4716H11.9716C12.2516 10.4716 12.4716 10.2516 12.4716 9.97157Z"
      />
    </svg>
  );
}
