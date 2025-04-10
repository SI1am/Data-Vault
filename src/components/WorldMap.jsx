"use client";

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const WorldMap = () => {
    const canvasRef = useRef(null);
    const dots = useRef([]);
    const connections = useRef([]);
    const animationFrame = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Initialize dots
        const initDots = () => {
            dots.current = Array.from({ length: 30 }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
            }));
        };

        // Update connections
        const updateConnections = () => {
            connections.current = [];
            for (let i = 0; i < dots.current.length; i++) {
                for (let j = i + 1; j < dots.current.length; j++) {
                    const dx = dots.current[i].x - dots.current[j].x;
                    const dy = dots.current[i].y - dots.current[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 150) {
                        connections.current.push({
                            from: i,
                            to: j,
                            opacity: 1 - distance / 150,
                        });
                    }
                }
            }
        };

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Update dot positions
            dots.current.forEach(dot => {
                dot.x += dot.vx;
                dot.y += dot.vy;
                
                // Bounce off walls
                if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1;
                if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1;
            });
            
            // Draw connections
            ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)';
            ctx.lineWidth = 1;
            
            connections.current.forEach(conn => {
                const from = dots.current[conn.from];
                const to = dots.current[conn.to];
                
                ctx.beginPath();
                ctx.moveTo(from.x, from.y);
                ctx.lineTo(to.x, to.y);
                ctx.strokeStyle = `rgba(59, 130, 246, ${conn.opacity})`;
                ctx.stroke();
            });
            
            // Draw dots
            ctx.fillStyle = '#3b82f6';
            dots.current.forEach(dot => {
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
                ctx.fill();
            });
            
            updateConnections();
            animationFrame.current = requestAnimationFrame(animate);
        };

        initDots();
        updateConnections();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (animationFrame.current) {
                cancelAnimationFrame(animationFrame.current);
            }
        };
    }, []);

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative w-full h-full overflow-hidden"
        >
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
            />
        </motion.div>
    );
};

export default WorldMap; 