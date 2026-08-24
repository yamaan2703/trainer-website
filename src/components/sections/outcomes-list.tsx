"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { staggerContainer } from "@/lib/animations/motion-variants";

export function OutcomesList({ items }: { items: readonly string[] }) {
  return (
    <motion.ul
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      variants={staggerContainer(0.08, 0.15)}
      className="mt-10 space-y-5"
    >
      {items.map((item) => (
        <motion.li
          key={item}
          variants={{
            hidden: { opacity: 0, x: -16 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
          }}
          className="flex items-start gap-4 border-t border-hairline pt-5 text-lg"
        >
          <Check className="mt-1 h-5 w-5 shrink-0 text-copper" aria-hidden />
          <span>{item}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
}
