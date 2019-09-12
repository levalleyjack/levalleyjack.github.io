
$('#siteNav').affix({
	offset: {
		top: 100
	}
})

// Can also be included with a regular script tag

var options = {
  strings: ["<i>First</i> sentence.", "&amp; a second sentence."],
  typeSpeed: 40
}

var typed = new Typed(".element", options);
