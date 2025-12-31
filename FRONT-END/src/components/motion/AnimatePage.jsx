import { motion } from "framer-motion";

// constance pour les animations de page, utilise les propriétés d'opacité et de position Y pour créer des transitions fluides entre les pages
const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
};

// Définition de la transition de la page, utilise un type de tween avec une courbe d'accélération/décélération et une durée de 0.5 secondes
const pageTransition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.5,
}

// Composant fonctionnel qui enveloppe les enfants avec des animations de page, utilisant les variantes et la transition définies ci-dessus, et les applique aux propriétés initiales, d'animation et de sortie du composant motion.div

export default function AnimatePage({ children }) {
    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
        >
            {children}
        </motion.div>
    )
}