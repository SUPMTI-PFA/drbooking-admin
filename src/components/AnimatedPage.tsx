import React from 'react';
import { motion, MotionProps } from 'framer-motion';

type AnimatedPageProps = React.PropsWithChildren<MotionProps>;

const AnimatedPage: React.FC<AnimatedPageProps> = ({
  children,
  initial = { opacity: 0, y: 20 },
  animate = { opacity: 1, y: 0 },
  transition = { duration: 0.5 },
  ...rest
}) => (
  <motion.div
    initial={initial}
    animate={animate}
    transition={transition}
    {...rest}
  >
    {children}
  </motion.div>
);

export default AnimatedPage;
