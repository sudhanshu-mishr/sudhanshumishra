
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useGame } from '../components/GameContext';
import { Testimonial as DesignTestimonial } from '../components/ui/design-testimonial';

const TestimonialsSection: React.FC = () => {
  const { markSectionVisited } = useGame();
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (inView) markSectionVisited('testimonials');
  }, [inView, markSectionVisited]);

  return (
    <section id="testimonials" ref={ref} className="border-b border-[var(--border)]">
      <DesignTestimonial />
    </section>
  );
};

export default TestimonialsSection;
