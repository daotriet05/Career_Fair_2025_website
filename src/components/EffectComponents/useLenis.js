// src/components/EffectComponents/useLenis.js
import Lenis from '@studio-freight/lenis';
import { useEffect } from 'react';

const useLenis = () => {
	useEffect(() => {
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
			lenis.destroy(); // dọn dẹp khi component unmount
		};
	}, []);
};

export default useLenis;
