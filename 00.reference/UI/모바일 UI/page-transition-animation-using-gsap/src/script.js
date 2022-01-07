console.clear();

const fromLeftButton = document.querySelector("button#from-left");
const fromTopButton = document.querySelector("button#from-top");

fromLeftButton.addEventListener("click", animateFromLeft);
fromTopButton.addEventListener("click", animateFromTop);

function animateFromLeft() {
	let tl = gsap.timeline({ ease: "power4.inOut" });

	tl.set(fromLeftButton, {pointerEvents: 'none'})
	tl.to(".from-left .tile", {
		duration: 0.4,
		width: "100%",
		left: "0%",
		delay: 0.2,
		stagger: 0.05,
	});
	tl.to(".from-left .tile", {
		duration: 0.4,
		width: "100%",
		left: "100%",
		delay: 0.2,
		stagger: -0.05,
	});
	tl.set(".from-left .tile", { left: "0", width: "0" });
	tl.set(fromLeftButton, {pointerEvents: 'all'})
}

function animateFromTop() {
	let tl = gsap.timeline({ ease: "power4.inOut" });

	tl.set(fromLeftButton, {pointerEvents: 'none'})
	tl.to(".from-top .tile", {
		duration: 0.4,
		height: "100%",
		top: "0%",
		delay: 0.2,
		stagger: 0.05,
	});
	tl.to(".from-top .tile", {
		duration: 0.4,
		height: "100%",
		top: "100%",
		delay: 0.2,
		stagger: -0.05,
	});
	tl.set(".from-top .tile", { top: "0", height: "0" });
	tl.set(fromLeftButton, {pointerEvents: 'all'})
}
