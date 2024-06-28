import { LazyMotion, domMax } from "framer-motion";
import { ReactNode } from "react";

// eslint-disable-next-line import/extensions
const loadFeatures = domMax;

interface MotionLazyContainerProps {
  children: ReactNode;
}

export default function MotionLazyContainer({
  children,
}: MotionLazyContainerProps) {
  return (
    <LazyMotion strict features={loadFeatures}>
      {children}
    </LazyMotion>
  );
}
