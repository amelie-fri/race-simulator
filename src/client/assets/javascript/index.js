// PROVIDED CODE BELOW (LINES 1 - 80) DO NOT REMOVE

// The store will hold all information needed globally
var store = {
	track_id: undefined,
	player_id: undefined,
	race_id: undefined,
	test: 'hei',
}



	// Just some test code :) --------
	const gummibaum = store.test;
	console.log(gummibaum);
	const newtest = {test: 'bonjour'};
	Object.assign(store, newtest);
	console.log(store.test);
	// -------------------------------
	
	// Update the store
	const updateStore = (store, newStore) => {
		store = Object.assign(store, newStore)
	}


// We need our javascript to wait until the DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
	onPageLoad()
	setupClickHandlers()
})

async function onPageLoad() {
	try {
		getTracks()
			.then(tracks => {
				const html = renderTrackCards(tracks)
				renderAt('#tracks', html)
			})
			

		getRacers()
			// .then(racers => console.log(racers))
			.then((racers) => {
				const html = renderRacerCars(racers)
				renderAt('#racers', html)
			})
	} catch(error) {
		console.log("Problem getting tracks and racers ::", error.message)
		console.error(error)
	}
}

function setupClickHandlers() {
	document.addEventListener('click', function(event) {
		const { target } = event

		// Race track form field
		if (target.matches('.card.track')) {
			handleSelectTrack(target)
		}

		// Podracer form field
		if (target.matches('.card.podracer')) {
			handleSelectPodRacer(target)
		}

		// Submit create race form
		if (target.matches('#submit-create-race')) {
			event.preventDefault()
	
			// start race
			handleCreateRace()
		}

		// Handle acceleration click
		if (target.matches('#gas-peddle')) {
			handleAccelerate(target)
		}

	}, false)
}

async function delay(ms) {
	try {
		return await new Promise(resolve => setTimeout(resolve, ms));
	} catch(error) {
		console.log("an error shouldn't be possible here")
		console.log(error)
	}
}
// ^ PROVIDED CODE ^ DO NOT REMOVE

// This async function controls the flow of the race, add the logic and error handling
async function handleCreateRace() {
	// render starting UI
	const track_id = store.track_id;
	renderAt('#race', renderRaceStartView(store.track_id))
		
	// TODO - Get player_id and track_id from the store

		const player_id = store.player_id;
		console.log('player_id')
		console.log(player_id);
		
	
	// const race = TODO - invoke the API call to create the race, then save the result
	const race = async (player_id, track_id) => {
		try {
			const raceData = await createRace(player_id, track_id);
			// Promise pending
			const raceid = raceData.ID;
			return raceid;
		} catch (error) {
			console.log(error)
		}
};
		const newRaceId = {race_id: await race(player_id, track_id)};
	// TODO - update the store with the race id
		updateStore(store, newRaceId);
		console.log(store);
		const race_id = store.race_id-1;
		// const race_id = store.race_id;
		// console.log(race_id);
	// The race has been created, now start the countdown
	// TODO - call the async function runCountdown
		await runCountdown();

	// TODO - call the async function startRace
		startRace(race_id);

	// TODO - call the async function runRace
		runRace(race_id);
}

async function runRace(raceID) {
	// const response = await getRace(raceID)
	// console.log(response)
	try {
	return new Promise(resolve => {
	// TODO - use Javascript's built in setInterval method to get race info every 500ms
		let raceInterval = setInterval(async function(){
			const res = await getRace(raceID)
			console.log(res)

	 
		// TODO - if the race info status property is "in-progress", update the leaderboard by calling:

		if (res.status === "in-progress") {
			renderAt('#leaderBoard', raceProgress(res.positions))
		}


	// /* 
		// TODO - if the race info status property is "finished", run the following:

		if (res.status === "finished") {
			renderAt('#leaderBoard', raceProgress(res.positions))
			clearInterval(raceInterval) // to stop the interval from repeating
			renderAt('#race', resultsView(res.positions)) // to render the results view
		}
		resolve(res) // resolve the promise
		},500)
		// resolve(res)
	})
	.then(data => {
		return data;
	})
	// remember to add error handling for the Promise
	}catch(error) {
	console.log(error);
	}
}

async function runCountdown() {
	try {
		// wait for the DOM to load
		await delay(1000)
		let timer = 3

		return new Promise(resolve => {
			// TODO - use Javascript's built in setInterval method to count down once per second
			let minusTimer = setInterval(function(){

			// run this DOM manipulation to decrement the countdown for the user
			// Anführungszeichen geändert

			// TODO - if the countdown is done, clear the interval, resolve the promise, and return
			if(timer <= 0){
				clearInterval(minusTimer);
				resolve(timer);
				return;
			}else{
				document.getElementById("big-numbers").innerHTML = --timer
				console.log(timer);
			}
			// document.getElementById('big-numbers').innerHTML = --timer}, 1000)
		  },1000)
			
	  })
	// .then(data => {
	// 	return data;
	// })
	}catch(error) {
		console.log(error);
	}
}

function handleSelectPodRacer(target) {
	console.log("selected a pod", target.id)

	// remove class selected from all racer options
	const selected = document.querySelector('#racers .selected')
	if(selected) {
		selected.classList.remove('selected')
	}

	// add class selected to current target
	target.classList.add('selected')

	// TODO - save the selected racer to the store
	const newracer = {player_id: target.id};
	updateStore(store, newracer);
	console.log(store);
}

function handleSelectTrack(target) {
	console.log("selected a track", target.id)

	// remove class selected from all track options
	const selected = document.querySelector('#tracks .selected')
	if(selected) {
		selected.classList.remove('selected')
	}

	// add class selected to current target
	target.classList.add('selected')

	// TODO - save the selected track id to the store
	const newtrack = {track_id: target.id};
	updateStore(store, newtrack);
	console.log(store);
	return store.track_id

}

function handleAccelerate() {
	console.log("accelerate button clicked")
	// TODO - Invoke the API call to accelerate
	// console.log('please')
	// console.log(store.player_id)
	// accelerate(store.player_id)
}
// HTML VIEWS ------------------------------------------------
// Provided code - do not remove

function renderRacerCars(racers) {
	console.log('here in the suspicious function')
	console.log(racers)
	console.log(racers[0].driver_name)
	if (!racers.length) {
		return `
			<h4>Loading Racers...</4>
		`
	}
	// Typo here: results, reuslts
	const results = racers.map(renderRacerCard).join('')

	return `
		<ul id="racers">
			${results}
		</ul>
	`
}

function renderRacerCard(racer) {
	const { id, driver_name, top_speed, acceleration, handling } = racer

	return `
		<li class="card podracer" id="${id}">
			<h3>${driver_name}</h3>
			<p>${top_speed}</p>
			<p>${acceleration}</p>
			<p>${handling}</p>
		</li>
	`
}

function renderTrackCards(tracks) {
	if (!tracks.length) {
		return `
			<h4>Loading Tracks...</4>
		`
	}

	const results = tracks.map(renderTrackCard).join('')

	return `
		<ul id="tracks">
			${results}
		</ul>
	`
}

function renderTrackCard(track) {
	const { id, name } = track

	return `
		<li id="${id}" class="card track">
			<h3>${name}</h3>
		</li>
	`
}

function renderCountdown(count) {
	return `
		<h2>Race Starts In...</h2>
		<p id="big-numbers">${count}</p>
	`
}

function renderRaceStartView(track, racers) {
	return `
		<header>
			<h1>Race: ${track.name}</h1>
		</header>
		<main id="two-columns">
			<section id="leaderBoard">
				${renderCountdown(3)}
			</section>

			<section id="accelerate">
				<h2>Directions</h2>
				<p>Click the button as fast as you can to make your racer go faster!</p>
				<button id="gas-peddle">Click Me To Win!</button>
			</section>
		</main>
		<footer></footer>
	`
}

function resultsView(positions) {
	positions.sort((a, b) => (a.final_position > b.final_position) ? 1 : -1)

	return `
		<header>
			<h1>Race Results</h1>
		</header>
		<main>
			${raceProgress(positions)}
			<a href="/race">Start a new race</a>
		</main>
	`
}

function raceProgress(positions) {
	// changing to two equal signs
	let userPlayer = positions.find(e => e.id == store.player_id)
	userPlayer.driver_name += " (you)"

	positions = positions.sort((a, b) => (a.segment > b.segment) ? -1 : 1)
	let count = 1

	const results = positions.map(p => {
		return `
			<tr>
				<td>
					<h3>${count++} - ${p.driver_name}</h3>
				</td>
			</tr>
		`
	})

	return `
		<main>
			<h3>Leaderboard</h3>
			<section id="leaderBoard">
				${results}
			</section>
		</main>
	`
}

function renderAt(element, html) {
	const node = document.querySelector(element)

	node.innerHTML = html
}

// ^ Provided code ^ do not remove


// API CALLS ------------------------------------------------

const SERVER = 'http://localhost:8000'

function defaultFetchOpts() {
	return {
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin' : SERVER,
		},
	}
}

// TODO - Make a fetch call (with error handling!) to each of the following API endpoints 

function getTracks() {
	// GET request to `${SERVER}/api/tracks`
	return fetch(`${SERVER}/api/tracks`)
	.then(res => res.json())
	.catch(err => console.log("Problem with getTracks request::", err))
}

function getRacers() {
	// GET request to `${SERVER}/api/cars`
	return fetch(`${SERVER}/api/cars`)
	.then(res => res.json())
	.catch(err => console.log("Problem with getRacers request::", err))
}

function createRace(player_id, track_id) {
	player_id = parseInt(player_id)
	track_id = parseInt(track_id)
	const body = { player_id, track_id }
	
	return fetch(`${SERVER}/api/races`, {
		method: 'POST',
		...defaultFetchOpts(),
		dataType: 'jsonp',
		body: JSON.stringify(body)
	})
	.then(res => res.json())
	.then(data => {console.log(data); return data;})
	.catch(err => console.log("Problem with createRace request::", err))
}

function getRace(id) {
	// GET request to `${SERVER}/api/races/${id}`
	return fetch(`${SERVER}/api/races/${id}`)
	.then(res => res.json())
	.catch(err => console.log("Problem with getRacers request::", err))
}

function startRace(id) {
	return fetch(`${SERVER}/api/races/${id}/start`, {
		method: 'POST',
		...defaultFetchOpts(),
	})
	// .then(res => res.json())
	.then(res => console.log(res))
	.catch(err => console.log("Problem with startRace request::", err))
}

function accelerate(id) {
	// POST request to `${SERVER}/api/races/${id}/accelerate`
	// options parameter provided as defaultFetchOpts
	// no body or datatype needed for this request
	
	return fetch(`${SERVER}/api/races/${id}/accelerate`, {
		method: 'POST',
		...defaultFetchOpts(),
	})
	// .then(res => res.json())
	//.then(res => console.log(res))
	.catch(err => console.log("Problem with accelerate request::", err))
}
