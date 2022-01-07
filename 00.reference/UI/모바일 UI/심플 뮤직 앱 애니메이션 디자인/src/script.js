console.clear();
const buttons = Array.from(document.querySelectorAll("button"));

buttons.forEach(btn => {
	btn.addEventListener("click", () => {
		btn.classList.toggle("active");
	});
});

$('.btn').click( function() {
    $(".bigPlay img").toggleClass("active");
} );
