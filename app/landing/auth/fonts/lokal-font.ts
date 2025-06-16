import localFont from 'next/font/local';

const Rubik = localFont({
  src: [
    {
      path: '../public/fonts/Rubik-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Rubik-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-rubik',
});
export default Rubik