import React from 'react';
import { motion } from "motion/react"

export type ActivityIndicatorProps = {
  /** Diameter of the spinner in pixels */
  size?: number;
  /** CSS color of the spinner border */
  color?: string;
  /** Optional additional Tailwind or custom classes */
  className?: string;
};

/**
 * A simple loading spinner using Framer Motion.
 */
const ActivityIndicator: React.FC<ActivityIndicatorProps> = ({
  size = 32,
  color = '#04be94',
  className = '',
}) => {
  const borderWidth = size / 8;

  return (
    <motion.div
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        border: `${borderWidth}px solid ${color}`,
        borderTopColor: 'transparent',
      }}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
    />
  );
};

export default ActivityIndicator;
