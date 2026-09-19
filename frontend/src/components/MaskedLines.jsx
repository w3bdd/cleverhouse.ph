import { motion } from "framer-motion";

export const MaskedLines = ({ lines, className = "", lineClassName = "", delay = 0 }) => (
  <div className={className}>
    {lines.map((line, i) => (
      <div key={i} className="overflow-hidden py-[0.06em]">
        <motion.div
          className={lineClassName}
          initial={{ y: "115%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 1, delay: delay + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
        >
          {line}
        </motion.div>
      </div>
    ))}
  </div>
);
