<script context="module" lang="ts">
	import { API_URL } from '../../utils/constants';

	interface Score {
		average: number;
		reviews: number;
		workmanship: number;
		tidiness: number;
		reliability: number;
		courtesy: number;
		accuracy: number;
	}

	const checkatradeScores: Score[] = await fetch(`${API_URL}/checkatrade`).then((response) =>
		response.json()
	);

	let average = 0;
	let reviews = 0;
	let workmanship = 0;
	let tidiness = 0;
	let reliability = 0;
	let courtesy = 0;
	let accuracy = 0;

	checkatradeScores.forEach((score: Score) => {
		average += score.average;
		reviews += score.reviews;
		workmanship += score.workmanship;
		tidiness += score.tidiness;
		reliability += score.reliability;
		courtesy += score.courtesy;
		accuracy += score.accuracy;
	});

	average = Math.round((average / 3) * 100) / 100;
	workmanship = Math.round((workmanship / 3) * 100) / 100;
	tidiness = Math.round((tidiness / 3) * 100) / 100;
	reliability = Math.round((reliability / 3) * 100) / 100;
	courtesy = Math.round((courtesy / 3) * 100) / 100;
	accuracy = Math.round((accuracy / 3) * 100) / 100;
</script>

<p>Average: {average}</p>
<p>Total reviews: {reviews}</p>
<p>Workmanship: {workmanship}</p>
<p>Tidiness: {tidiness}</p>
<p>Reliability: {reliability}</p>
<p>Courtesy: {courtesy}</p>
<p>Accuracy: {accuracy}</p>
