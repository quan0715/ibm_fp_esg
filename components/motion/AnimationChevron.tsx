import { motion } from "framer-motion";
import { LuChevronRight } from "react-icons/lu";

export function AnimationChevron({
  className,
  style,
  isExpanded,
}: React.HTMLAttributes<HTMLDivElement> & {
  isExpanded: boolean;
}) {
  return (
    <motion.div
      initial={false}
      animate={{ rotate: isExpanded ? 90 : 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <LuChevronRight />
    </motion.div>
  );
}
