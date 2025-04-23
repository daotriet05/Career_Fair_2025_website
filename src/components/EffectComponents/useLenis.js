import Lenis from '@studio-freight/lenis';
import { useEffect } from 'react';

const useLenis = () => {
	useEffect(() => {
		const isMobile = window.innerWidth <= 768; // or use user-agent check if needed
		if (isMobile) return; // ❌ Skip Lenis on mobile

		const lenis = new Lenis({
			smooth: true,
			lerp: 0.05,
			direction: 'vertical',
		});

		function raf(time) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);

		return () => {
			lenis.destroy();
		};
	}, []);
};

export default useLenis;
