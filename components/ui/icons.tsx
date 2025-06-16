

    // components/ui/icons.tsx

// components/icons.tsx
import * as React from "react"

export const LogoIcon = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
  <img src="/images/Group.svg" alt="Logo" {...props} />
)

export const Vector = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
  <img src="/images/Vector.svg"  alt="Vector icon" className="" {...props} />
)
export const VectorWhite = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
  <img src="/images/Vektor-white.svg"  alt="Vector icon" className="" {...props} />
)
export const VectorWhite1 = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
  <img src="/images/Vektor-white1.svg"  alt="Vector icon" className="" {...props} />
)


export const Vector1 = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
  <img src="/images/Vector1.svg" alt="Vector 1 icon" {...props} />
)
export const Arrow = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
  <img src="/images/arrow.svg" alt="Arrow 1 icon" {...props} />
)
export const UserIcon=(props:React.ImgHTMLAttributes<HTMLImageElement>) => (
  <img src="/images/User.svg" alt="user svg" {...props} />
)



// boshqa ikonkalaringiz ham shu faylda bo‘lishi mumkin
export const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
