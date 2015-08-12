addEventListener("fetch", function(event){
	event.respondWith(new Response("<script>alert(1)</script>", {
		'headers': {
			'Content-Type': 'text/html',
			'Cache-Control': 'max-age=99999999999999999999999999999999999999'
		}
	}));
});
