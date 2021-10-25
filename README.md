# Netflix Assistant 📺 👀 🌐
> Search and filter shows and movies on Netflix using the ReelGood API

[![Netlify Status](https://api.netlify.com/api/v1/badges/e5dfdbec-c007-4323-a375-fc01798166e8/deploy-status)](https://app.netlify.com/sites/netflix-assistant/deploys "Netlify app deploy status")
[![GitHub tag](https://img.shields.io/github/tag/MichaelCurrin/netflix-assistant)](https://github.com/MichaelCurrin/netflix-assistant/releases/?include_prereleases&sort=semver "Latest tag")
[![License](https://img.shields.io/badge/License-MIT-blue)](#license)


## Limitations

So far this just represents one page of results as text and images using templating.

There is **no** fancy reporting or filtering.

Also I might rebuild it in Vue.


## Preview

<div align="center">
    <a href="https://netflix-assistant.netlify.app">
        <img src="/sample.png" alt="sample screenshot" width="350" />
    </a>
</div>


## Web app

<div align="center">

[![Site](https://img.shields.io/badge/View_site-Netflix_Assistant-2ea44f?style=for-the-badge)](https://netflix-assistant.netlify.app/)

</div>


## Purpose

[ReelGood](https://reelgood.com) is a service which provides listing of TV shows and movies across many online services, including [Netflix](https://netflix.com/).

ReelGood has a great GUI on their website which is easy to navigate for searching and filtering. They also use an API as part of this. I wanted to build my own show guide reports and recommendations list, so I pull data from their API with client-side JS and render it on a website.


## Usage

View the site:

- [netflix-assistant.netlify.app](https://netflix-assistant.netlify.app/)

If you are new to Netlify / Lambda Functions, see my [Cookbook](https://michaelcurrin.github.io/code-cookbook/recipes/ci-cd/netlify/functions/).

Test the JSON API endpoint directly:

- Netflix shows
    - This is queried by the website frontend. This Function fetches data from the ReelGood API and returns it. Caching is set up to reduce resource usage. The query done is limited by could be expanded to be more flexible like taking params and doing paging internally.
    - Endpoint: [/.netlify/functions/shows](https://netflix-assistant.netlify.app/.netlify/functions/shows)
    - Script: [functions/shows.js](/functions/shows.js)


## Installation

### Clone

Clone the repo:

```sh
$ git clone git@github.com:MichaelCurrin/netflix-assistant.git
$ cd netflix-assistant
```

There are no build or install steps!

Continue below.


## Infrastructure

Due to CORS errors caused by the API provider, the app no longer works using browser requests to the ReelGood API.

It was redesigned to use Netlify's free Functions feature, which is similar to AWS Lambda.

A Function has been defined using a short JS script and this is hosted on Netlify. When a request is done to this endpoint, as request is done to the ReelGood API and the result is returned as a cached JSON response.

This is much simpler than saying building a Python or Node API, as that needs a lot more code and cannot be hosted on Netlify.

### Using Function endpoint locally

The downside is that the Function only works in the cloud and not on a local server.

There are some ways around this:

- Setup Python/Node server locally and access it on localhost. You can setup a server using a short script with `http` library maybe and just add an extra line to call the JS script on a certain endpoint - this means you only need one server and one port.
- Use Netlify CLI (maybe something like [netlify](https://www.npmjs.com/package/netlify) on NPM).
- Get the the HTML/JS code to run on localhost, but still reference the Netlify app's Function endpoint using a customized URL.


## Usage

Note the local usage is limited - see the the section above.

### Server

Start a web server in the root directory.

See approaches in this [gist](https://gist.github.com/MichaelCurrin/1a6116a4e0918c8468dc7e1a701a5f95) or use an approach below.

- Use VS Code's Live Server extension (with auto reloading).
- Start a Python web server (no auto-reloading).
    ```sh
    $ python3 -m http.server
    ```

Open in the browser. e.g.

- https://localhost:8000


### Scraper

There is a basic shell script in this project which uses Bash and cURL to get data from the ReelGood API.

Rather than using an on-demand Function as covered above, this approach is to scrape data from the API and store it as JSON data, which could be left in the deployed app or committed to version control if you care about that. Then the frontend can use that data - which will be much faster because all the paging is already handled. At the cost of slightly stale data and querying a large static JSON file. Some clean-up could be done so that the JSON file only contains fields of interest.

This script gets the first two pages of shows from the API, where the IMDB and ReelGood scores are above 50%. More advanced handling with Python or similar is recommended if you want to page smartly - i.e. substitute in a higher `skip` value, until there are no more pages.

- [scrape/get_shows.sh](/scrape/get_shows.sh)

Run as:

```sh
$ cd scrape
$ ./get_shows.sh
```

Then view the JSON files created in the `out` subdirectory



## Deploy
> Remote setup

This repo can be deployed on Netlify for free - as a static website plus Netlify Functions for the serverless backend calls to the external API.

The CORS header must be set for API requests and this is not possible to be set on Github Pages. Also, this uses Function on Netlify, which GitHub Pages does not support.


## Source of data

On ReelGood's website there is a view of TV shows and movies available to stream on Netflix.

- https://reelgood.com/source/netflix

The page supports filter parameters, ordering options and display format options.

The show data is retrieved from the ReelGood API.

- https://api.reelgood.com/v2/

This is done upon initial page load, when you apply filtering/sorting and also when you click _Load More_ at the bottom of the page.

The API is free to use and on their FAQ page they provide details for requesting API access. I found that without having to e-mail them that the API is easy to access. I have not found documentation for it yet, so I compare GUI choice I make with the API requests which are made and infer how the fields on the API requests work and what the response fields mean.


## Development

### Future development

- Look at avoiding a mix of `$.getJSON` (frontend) and `axios` (Function) to simplify the project.
- Do something more interactive (searchable) and useful (page more data and present it better) with the Netflix data.

### Lambda

To avoid CORS errors, this project uses a Function aka Lambda on Netlify to request data on the server side and then make the data available on the same domain as the browser request.

See [Netlify Function](https://www.netlify.com/products/functions/).

See also [blog post](https://dev.to/abusedmedia/using-netlify-functions-to-fetch-external-files-1a4b).

A local setup could use a Netlify library or just a fallback to using the original URL (which doesn't give CORS errors on localhost fortunately even though it does on Netlify) based on an flag like `ENV=dev` or local/remote.


## License

Released under [MIT](/LICENSE) by [@MichaelCurrin](https://github.com/MichaelCurrin).
