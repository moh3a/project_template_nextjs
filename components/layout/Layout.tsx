import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="container px-2 py-4">
      {/**
        followed this blog to add page transitions
        https://dev.to/jameswallis/animating-next-js-page-transitions-with-framer-motion-1g9j
        but it doesnt work
        ---------------
        next-page-transitions worked but used deprecated method
       */}
      {children}
    </main>
  );
}
