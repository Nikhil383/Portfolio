import { useState, useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { cn } from '../lib/utils'

export default function MacDock({ apps, open, active, onLaunch, onClose }) {
  const mouseX = useMotionValue(Infinity)
  const reduced = false // Should use useReducedMotion(), assuming standard motion for dock

  return (
    <motion.nav
      className="mac-dock-container"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200, delay: 0.2 }}
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
    >
      <div className="mac-dock">
        {apps.map((app) => {
          const isOpen = open.includes(app.id)
          const isActive = active === app.id

          return (
            <DockIcon
              key={app.id}
              app={app}
              mouseX={mouseX}
              isOpen={isOpen}
              isActive={isActive}
              onClick={() => {
                if (isActive && isOpen) onClose(app.id)
                else onLaunch(app.id)
              }}
            />
          )
        })}
      </div>
    </motion.nav>
  )
}

function DockIcon({ app, mouseX, isOpen, isActive, onClick }) {
  const ref = useRef(null)
  const [hovered, setHovered] = useState(false)

  // Calculate distance from mouse to center of this icon
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  // Compute scale based on distance
  const scaleSync = useTransform(distance, [-150, 0, 150], [1, 1.8, 1])
  
  // Apply spring physics
  const scale = useSpring(scaleSync, { damping: 18, mass: 0.1, stiffness: 350 })

  return (
    <div className="mac-dock-item-wrapper" ref={ref}>
      <motion.button
        className={cn(
          "mac-dock-item",
          isOpen && "is-open",
          isActive && "is-active"
        )}
        style={{ scale }}
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={app.title}
      >
        <div 
          className="mac-dock-icon"
          style={{ 
            '--app-color': app.color,
            background: `linear-gradient(135deg, ${app.color}ee, ${app.color}99)`
          }}
        >
          <app.icon size={22} color="#fff" strokeWidth={1.8} />
        </div>
        
        {/* Active/Open Indicator */}
        <div className={cn(
          "mac-dock-indicator", 
          isOpen && "opacity-100", 
          !isOpen && "opacity-0",
          isActive && "is-active"
        )} />
      </motion.button>
      
      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="mac-dock-tooltip"
          >
            {app.title}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
