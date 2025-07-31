'use client';
import React, { useEffect, useRef } from 'react';
import Head from 'next/head'; 
import '../style/home.css'; // Assuming you have a CSS file for styles

const VisualBoard = () => {
  const boardElementsRef = useRef(null);

  useEffect(() => {
    // Professional board elements configuration (เดิม)
    const boardElements = [
      {
        type: 'note-card',
        class: 'note-blue',
        icon: 'fas fa-lightbulb',
        title: 'Ideation',
        desc: 'Capture & organize',
        x: 50,
        y: 80,
        delay: 0
      },
      {
        type: 'note-card',
        class: 'note-coral',
        icon: 'fas fa-users',
        title: 'Collaboration',
        desc: 'Real-time sync',
        x: 320,
        y: 150,
        delay: 200
      },
      {
        type: 'note-card',
        class: 'note-glass',
        icon: 'fas fa-project-diagram',
        title: 'Workflow',
        desc: 'Process mapping',
        x: 180,
        y: 300,
        delay: 400
      },
      {
        type: 'note-card',
        class: 'note-blue',
        icon: 'fas fa-chart-line',
        title: 'Analytics',
        desc: 'Track progress',
        x: 420,
        y: 350,
        delay: 600
      },
      {
        type: 'note-card',
        class: 'note-coral',
        icon: 'fas fa-share-alt',
        title: 'Integration',
        desc: 'Connect tools',
        x: 100,
        y: 450,
        delay: 800
      }
    ];

    const connections = [
      { x: 230, y: 140, width: 90, angle: 25 },
      { x: 360, y: 270, width: 60, angle: -35 },
      { x: 200, y: 420, width: 220, angle: -15 }
    ];

    // ฟังก์ชัน initializeBoard เดิม
    function initializeBoard() {
      const container = boardElementsRef.current;
      if (!container) return;
      
      // Create note cards
      boardElements.forEach((element, index) => {
        setTimeout(() => {
          const noteElement = document.createElement('div');
          noteElement.className = `board-element note-card ${element.class}`;
          noteElement.style.left = `${element.x}px`;
          noteElement.style.top = `${element.y}px`;
          noteElement.style.opacity = '0';
          noteElement.style.transform = 'translateY(20px)';
          
          noteElement.innerHTML = `
            <div class="note-icon">
              <i class="${element.icon}"></i>
            </div>
            <div class="note-title">${element.title}</div>
            <div class="note-desc">${element.desc}</div>
          `;
          
          container.appendChild(noteElement);
          
          // Animate in
          requestAnimationFrame(() => {
            noteElement.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            noteElement.style.opacity = '1';
            noteElement.style.transform = 'translateY(0)';
          });
          
        }, element.delay);
      });
      
      // Create connection lines
      connections.forEach((conn, index) => {
        setTimeout(() => {
          const line = document.createElement('div');
          line.className = 'connector-line';
          line.style.left = `${conn.x}px`;
          line.style.top = `${conn.y}px`;
          line.style.width = `${conn.width}px`;
          line.style.transform = `rotate(${conn.angle}deg)`;
          line.style.opacity = '0';
          
          container.appendChild(line);
          
          requestAnimationFrame(() => {
            line.style.transition = 'opacity 1s ease';
            line.style.opacity = '0.4';
          });
          
        }, 1200 + (index * 200));
      });
    }

    // ฟังก์ชัน handleNavbarScroll เดิม
    function handleNavbarScroll() {
      const navbar = document.querySelector('.navbar');
      if (!navbar) return;
      
      let lastScrollY = window.scrollY;
      
      const scrollHandler = () => {
        if (window.scrollY > 100) {
          navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
        } else {
          navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.8)';
        }
        
        lastScrollY = window.scrollY;
      };
      
      window.addEventListener('scroll', scrollHandler);
      return () => window.removeEventListener('scroll', scrollHandler);
    }

    // ฟังก์ชัน addInteractiveEffects เดิม
    function addInteractiveEffects() {
      const boardContainer = boardElementsRef.current;
      if (!boardContainer) return;
      
      const mouseMoveHandler = (e) => {
        const rect = boardContainer.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        const noteCards = boardContainer.querySelectorAll('.note-card');
        
        noteCards.forEach(card => {
          const cardRect = card.getBoundingClientRect();
          const containerRect = boardContainer.getBoundingClientRect();
          const cardX = cardRect.left - containerRect.left + cardRect.width / 2;
          const cardY = cardRect.top - containerRect.top + cardRect.height / 2;
          
          const distance = Math.sqrt(
            Math.pow(mouseX - cardX, 2) + Math.pow(mouseY - cardY, 2)
          );
          
          if (distance < 150) {
            const intensity = Math.max(0, 1 - distance / 150);
            card.style.transform = `translateY(-${intensity * 8}px) scale(${1 + intensity * 0.05})`;
          } else {
            card.style.transform = 'translateY(0) scale(1)';
          }
        });
      };
      
      const mouseLeaveHandler = () => {
        const noteCards = boardContainer.querySelectorAll('.note-card');
        noteCards.forEach(card => {
          card.style.transform = 'translateY(0) scale(1)';
        });
      };
      
      boardContainer.addEventListener('mousemove', mouseMoveHandler);
      boardContainer.addEventListener('mouseleave', mouseLeaveHandler);
      
      return () => {
        boardContainer.removeEventListener('mousemove', mouseMoveHandler);
        boardContainer.removeEventListener('mouseleave', mouseLeaveHandler);
      };
    }

    // ฟังก์ชัน repositionBoardElements เดิม
    function repositionBoardElements() {
      const container = boardElementsRef.current;
      if (!container) return;
      
      const boardWidth = container.parentElement.offsetWidth;
      const boardHeight = container.parentElement.offsetHeight;
      
      // Responsive positioning based on screen size
      const screenWidth = window.innerWidth;
      let scaleFactor = 1;
      
      if (screenWidth <= 360) {
        scaleFactor = 0.4;
      } else if (screenWidth <= 480) {
        scaleFactor = 0.5;
      } else if (screenWidth <= 640) {
        scaleFactor = 0.6;
      } else if (screenWidth <= 768) {
        scaleFactor = 0.7;
      } else if (screenWidth <= 1024) {
        scaleFactor = 0.8;
      } else if (screenWidth <= 1200) {
        scaleFactor = 0.9;
      }
      
      // Update positions for each element
      const noteCards = container.querySelectorAll('.note-card');
      const originalPositions = [
        { x: 50, y: 80 },   // Ideation
        { x: 320, y: 150 }, // Collaboration
        { x: 180, y: 300 }, // Workflow
        { x: 420, y: 350 }, // Analytics
        { x: 100, y: 450 }  // Integration
      ];
      
      noteCards.forEach((card, index) => {
        if (originalPositions[index]) {
          const newX = originalPositions[index].x * scaleFactor;
          const newY = originalPositions[index].y * scaleFactor;
          
          // Ensure elements stay within bounds
          const maxX = boardWidth - (card.offsetWidth || 90);
          const maxY = boardHeight - (card.offsetHeight || 70);
          
          card.style.left = `${Math.min(newX, maxX)}px`;
          card.style.top = `${Math.min(newY, maxY)}px`;
        }
      });
      
      lines.forEach((line, index) => {
        if (originalConnections[index]) {
          const conn = originalConnections[index];
          line.style.left = `${conn.x * scaleFactor}px`;
          line.style.top = `${conn.y * scaleFactor}px`;
          line.style.width = `${conn.width * scaleFactor}px`;
        }
      });
    }

    // Initialize everything (เดิม)
    initializeBoard();
    const cleanupScroll = handleNavbarScroll();
    const cleanupEffects = addInteractiveEffects();
    
    // Add animation classes with delay
    const animateElements = document.querySelectorAll('.animate-in');
    animateElements.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Initialize responsive positioning
    const positionTimeout = setTimeout(() => {
      repositionBoardElements();
    }, 1000);

    // Resize handler for responsive board
    let resizeTimeout;
    const resizeHandler = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        repositionBoardElements();
      }, 100);
    };
    
    window.addEventListener('resize', resizeHandler);

    // Cleanup
    return () => {
      if (cleanupScroll) cleanupScroll();
      if (cleanupEffects) cleanupEffects();
      clearTimeout(positionTimeout);
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return (
    <>

      <div className="bg-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      {/* Navigation */}
      <nav className="navbar">
        <a href="#" className="nav-logo">noote</a>
        <div className="nav-links">
          <a href="/auth/signin" className="nav-button secondary">
            <i className="fas fa-sign-in-alt"></i>
            Sign In
          </a>
          <a href="/auth/signup" className="nav-button primary">
            <i className="fas fa-rocket"></i>
            Get Started
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text animate-in">
            <div className="hero-badge">
              <i className="fas fa-sparkles"></i>
              Visual Collaboration Platform
            </div>
            
            <h1 className="hero-title">Transform ideas into visual reality</h1>
            
            <p className="hero-subtitle">
              Professional brainstorming and visual collaboration platform that helps teams organize thoughts, connect ideas, and drive innovation through intuitive digital workspaces.
            </p>
            
            <div className="hero-cta">
              <a href="/auth/signup" className="cta-primary">
                <i className="fas fa-play"></i>
                Start Creating
              </a>
              <a href="#demo" className="cta-secondary">
                <i className="fas fa-eye"></i>
                Watch Demo
              </a>
            </div>
            
            <div className="hero-contacts">
              <a href="#" className="contact-link" onClick={() => alert('Add your Discord invite link here')}>
                <div className="contact-icon">
                  <i className="fab fa-discord"></i>
                </div>
                <div className="contact-label">Join Discord</div>
              </a>
              <a href="https://github.com/ffoster007/noote" className="contact-link">
                <div className="contact-icon">
                  <i className="fab fa-github"></i>
                </div>
                <div className="contact-label">View on GitHub</div>
              </a>
            </div>
          </div>
          
          <div className="visual-board animate-in">
            <div className="board-grid"></div>
            <div ref={boardElementsRef}></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VisualBoard;