// import React, { useEffect, useRef, useState } from 'react';
// import { gsap } from 'gsap';

// const Cursor = () => {
//   const cursorRef = useRef(null);
//   const followerRef = useRef(null);
//   const [isHovering, setIsHovering] = useState(false);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // --- 1. Movement Physics (The "Engaging" Part) ---
      
//       // Dot: Instant movement (no lag)
//       const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.1, ease: "power3" });
//       const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.1, ease: "power3" });
      
//       // Follower: Increased duration to 0.9 for a smoother, more fluid "lag" effect.
//       // This feels more premium than a fast jerky follower.
//       const xToFollower = gsap.quickTo(followerRef.current, "x", { duration: 0.9, ease: "power3" });
//       const yToFollower = gsap.quickTo(followerRef.current, "y", { duration: 0.9, ease: "power3" });

//       window.addEventListener('mousemove', (e) => {
//         xTo(e.clientX);
//         yTo(e.clientY);
//         xToFollower(e.clientX);
//         yToFollower(e.clientY);
//       });

//       // --- 2. Hover Detection Logic ---
//       const handleMouseOver = (e) => {
//         const target = e.target;
//         // Check for clickable elements
//         const isLink = target.closest('a') || target.closest('button') || target.closest('input') || target.closest('.cursor-hover');
//         setIsHovering(!!isLink);
//       };

//       window.addEventListener('mouseover', handleMouseOver);
//     });

//     return () => ctx.revert();
//   }, []);

//   // --- 3. Hover State Animations ---
//   useEffect(() => {
//     if (isHovering) {
//       // HOVER STATE: Bada ho jaye aur SOLID fill ho jaye
//       gsap.to(followerRef.current, {
//         scale: 3, 
//         backgroundColor: "white", // Solid white fill
//         borderWidth: 0, // Border hata do
//         duration: 0.3,
//         ease: "power2.out"
//       });
//     } else {
//       // NORMAL STATE: Wapas normal size aur sirf BORDER
//       gsap.to(followerRef.current, {
//         scale: 1,
//         backgroundColor: "transparent", // Fill hata do
//         borderWidth: "1.5px", // Thoda sa mota border taaki clear dikhe
//         borderColor: "white", // Border color white (for mix-blend)
//         duration: 0.3,
//         ease: "power2.out"
//       });
//     }
//   }, [isHovering]);

//   return (
//     <>
//       {/* NOTE: Dono elements pe 'mix-blend-difference' laga hai.
//           Iska matlab ye auto-invert honge (Black pe White, White pe Black).
//       */}

//       {/* 1. Main Dot (Center Point) */}
//       <div 
//         ref={cursorRef}
//         // CHANGE: Size badha kar w-3 h-3 (12px) kar diya hai.
//         className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[99999] mix-blend-difference -translate-x-1/2 -translate-y-1/2 will-change-transform"
//       />
      
//       {/* 2. Follower Ring (Peeche wala circle) */}
//       <div 
//         ref={followerRef}
//         // Initial size w-10 h-10. Iska border/bg hum GSAP se control kar rahe hain.
//         className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[99998] mix-blend-difference -translate-x-1/2 -translate-y-1/2 will-change-transform"
//       />
//     </>
//   );
// };

// export default Cursor;