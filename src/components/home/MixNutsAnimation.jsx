import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MixNutsAnimation = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Configuration settings
  const config = {
    frameCount: 200,
    folderPath: "/mixnuts-frames", // Make sure folder name has NO spaces in 'public'
    imagePrefix: "ezgif-frame-",   // Aapka file prefix
    imageSuffix: ".jpg",
    scrollHeight: 6000, 
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const images = [];
    const sequence = { frame: 0 };

    // --- 1. RENDER FUNCTION ---
    const render = () => {
      const img = images[Math.round(sequence.frame)];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      context.clearRect(0, 0, canvas.width, canvas.height);

      // Image fitting logic (Contain)
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.min(hRatio, vRatio);
      
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;

      context.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShift_x,
        centerShift_y,
        img.width * ratio,
        img.height * ratio
      );
    };

    // --- 2. RESIZE HANDLER ---
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };

    // --- 3. IMAGE PATH LOGIC (UPDATED FOR 001, 002...) ---
    const currentFrame = (index) => {
      // (index + 1) -> 1
      // .toString() -> "1"
      // .padStart(3, "0") -> "001" (Agar 10 hota to "010", 100 hota to "100")
      const paddedIndex = (index + 1).toString().padStart(3, "0");
      
      const fileName = `${config.imagePrefix}${paddedIndex}${config.imageSuffix}`;
      return `${config.folderPath}/${fileName}`;
    };

    let loadedCount = 0;
    const loadImages = () => {
      // Debug log to check first path
      console.log(`Looking for: ${currentFrame(0)}`); 

      for (let i = 0; i < config.frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        
        img.onload = () => {
          loadedCount++;
          if (loadedCount === config.frameCount) {
            setImagesLoaded(true);
            render();
          }
        };
        
        img.onerror = () => {
          if (i === 0) console.error(`Error loading: ${img.src}. Check folder path!`);
        };
        
        images.push(img);
      }
    };

    // --- EXECUTION START ---
    window.addEventListener("resize", updateCanvasSize);
    updateCanvasSize();
    loadImages();

    // --- GSAP ANIMATION ---
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${config.scrollHeight}`,
        scrub: 0.5,
        pin: true,
        anticipatePin: 1,
      },
    });

    tl.to(sequence, {
      frame: config.frameCount - 1,
      snap: "frame",
      ease: "none",
      onUpdate: render,
    });

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        height: "100vh", 
        width: "100%", 
        position: "relative", 
        backgroundColor: "#000" 
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          position: "relative",
          zIndex: 1,
        }}
      />
      {!imagesLoaded && (
        <div style={{
            position: 'absolute', top: '50%', left: '50%', 
            transform: 'translate(-50%, -50%)', color: 'white'
        }}>
           Loading...
        </div>
      )}
    </div>
  );
};

export default MixNutsAnimation;