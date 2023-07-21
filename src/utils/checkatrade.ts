import { API_URL } from './constants';

const checkatrade = await fetch(`${API_URL}/checkatrade`).then((response) => response.json());

interface item {
	average: number;
	reviews: number;
	workmanship: number;
	tidiness: number;
	reliability: number;
	courtesy: number;
	accuracy: number;
}

export let average = 0;
export let reviews = 0;
export let workmanship = 0;
export let tidiness = 0;
export let reliability = 0;
export let courtesy = 0;
export let accuracy = 0;

checkatrade.forEach((item: item) => {
	average += item.average;
	reviews += item.reviews;
	workmanship += item.workmanship;
	tidiness += item.tidiness;
	reliability += item.reliability;
	courtesy += item.courtesy;
	accuracy += item.accuracy;
});

average = Math.round((average / 3) * 100) / 100;
workmanship = Math.round((workmanship / 3) * 100) / 100;
tidiness = Math.round((tidiness / 3) * 100) / 100;
reliability = Math.round((reliability / 3) * 100) / 100;
courtesy = Math.round((courtesy / 3) * 100) / 100;
accuracy = Math.round((accuracy / 3) * 100) / 100;
