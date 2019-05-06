# Netflix Assistant
> A tool to help search and filter shows and movies on Netflix using the ReelGood API.

ReelGood is a site which provides listing of TV shows and movies across many online services, including Netflix. They have a great GUI on their website which is easy to navigate and they also use an API as part of this. I wanted to build my own show guide reports, so I pull data from their API with client-side JS and render it on a website. The application can be run locally and on Github Pages.

## Source of data

On ReelGood's website there is a view of TV shows and movies available to stream on Netflix.

https://reelgood.com/source/netflix

The page supports filter parameters, ordering options and display format options.

The show data is retrieved from the ReelGood API.

https://api.reelgood.com/v2/

This is done upon initial page load, when you apply filtering/sorting and also when you click _Load More_ at the bottom of the page.

The API is free to use and on their FAQ page they provide details for requesting API access. I found that without having to e-mail them that the API is easy to access. I have not found documentation for it yet, so I compare GUI choice I make with the API requests which are made and infer how the fields on the API requests work and what the response fields mean.
