# Netflix Assistant
> A tool to help search and filter shows and movies on Netflix using the ReelGood API.

ReelGood is a site which provides listing of TV shows and movies across many online services, including Netflix. They have a great GUI on their website which is easy to navigate and they also use an API as part of this. I wanted to build my own show guide reports, so I pull data from their API with client-side JS and render it on a website. The application can be run locally and on Github Pages.

## Sourcing data

The ReelGood site's [source page with Netflix filter](https://reelgood.com/source/netflix) TV shows or movies available to stream on Netfix. The page supports filter parameters, ordering options and display options.

The show data is retrieved from the ReelGood API at `https://api.reelgood.com/v2`. This is done initial page load, when you apply filtering/sorting and also when you click _Load More_ at the bottom of the page. The API is free to use and on their FAQ page they provide details for requesting API access. I found that without having to e-mail them that the API is easy to access - I just have to figure out the request details by inspecting the existing GUI's requests.
