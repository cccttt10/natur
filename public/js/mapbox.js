

export const displayMap = locations => {
	mapboxgl.accessToken =
		'pk.eyJ1IjoiaGVpaGVnYW8iLCJhIjoiY2p6OXNubDI0MDE2dDNocGRuazRha2F4ayJ9.5iExGXIBdxkBCKH6SLVISg';

	var map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/heihegao/cjz9swnge072z1cp6kfncgegt',
		scrollZoom: false
	});

	const bounds = new mapboxgl.LngLatBounds();

	locations.forEach(loc => {
		// Create marker
		const el = document.createElement('div');
		el.className = 'marker';

		// Add marker
		new mapboxgl.Marker({
			element: el,
			anchor: 'bottom'
		})
			.setLngLat(loc.coordinates)
			.addTo(map);

		// Add popup
		new mapboxgl.Popup({ offset: 30 })
			.setLngLat(loc.coordinates)
			.setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
			.addTo(map);

		// Extend map to include current location
		bounds.extend(loc.coordinates);
	});

	map.fitBounds(bounds, {
		padding: {
			top: 200,
			bottom: 150,
			left: 100,
			right: 100
		}
	});
};
