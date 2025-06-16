import React, { ReactNode } from 'react';
interface HomeProps {
  children: ReactNode;
}

function Home({ children }: HomeProps) {
  return (
    <>
      <main className="min-h-screen">
         {children}
         </main>
    </>
  );
}

export default Home;
