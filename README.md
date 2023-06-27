# How to generate the places data

We're using the pagination feature of Astro to enable the creartion of all the static pages for each service and town.

This unfortunately doesn't support any sort of nested iteration so we have to mould the data into a structure that means we can achieve everything in one iteration.

To achieve this we need to run the `utils/buildData.js` which pulls togther places and services, places and reviews saves seperate files for each serice to `_data/[SERIVE_SLUG]-places.json` which is then used to generate the pages.

If any data is changed it has to be updated in the `utils` folder and the script rerun to update the master data file.

# To-do

Need to work out how to take the service related reviews and filter them by town in eleventyComputed.js so we can add backup reviews if there aren't enough, as follows:

## latest reviews for each service for a town

/api/reviews/service-town/{service_id}/{town_id}

- get reviews matching service and town
- if there arent enough specific reviews then fill with the latest by service and county
- if there arent enough specific reviews then fill with the latest by service
- as a last resort if there arent enough specific reviews then fill with the latest
- remove duplicate reviews caused by the merge

## latest reviews for each service for a county

/api/reviews/service-county/{service_id}/{county_id}

- get reviews matching service and county
- if there arent enough specific reviews then fill with the latest by service
- as a last resort if there arent enough specific reviews then fill with the latest
- remove duplicate reviews caused by the merge

~~## latest reviews for each service~~

~~/api/reviews/service/{service_id}~~
~~- get reviews matching service~~
~~- if there arent enough specific reviews then fill with the latest~~
~~- remove duplicate reviews caused by the merge~~

## latest reviews for a county

/api/{website}/reviews/county/{county_id}

- get reviews matching county
- as a last resort if there arent enough specific reviews then fill with the latest
- remove duplicate reviews caused by the merge

~~## latest reviews~~

~~/api/{website}/reviews~~
~~- get latest reviews~~

Add fallbacks to pad out where services/towns don't have 12 reviews
