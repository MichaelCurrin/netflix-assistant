# Netflix Assistant 📺 👀 🌐
> A tool to help search and filter shows and movies on Netflix using the ReelGood API.

[![GitHub tag](https://img.shields.io/github/tag/MichaelCurrin/netflix-assistant)](https://github.com/MichaelCurrin/netflix-assistant/releases/?include_prereleases&sort=semver)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue)](#license)


## Purpose

[ReelGood](https://reelgood.com) is a site which provides listing of TV shows and movies across many online services, including [Netflix](netflix.com/).

ReelGood has a great GUI on their website which is easy to navigate and they also use an API as part of this. I wanted to build my own show guide reports and recommendations list, so I pull data from their API with client-side JS and render it on a website. 

So far it just represents one page of results as text and images using templating - there is no fancy reporting or filtering.


## Limitations

Note: This project no longer works when deployed on remote environments such as Netlify due to a CORS error. 

This was not present on initial development. It appears that ReelGood added a header to their site to prevent cross-origin requests.

Here is the error message:

> Access to XMLHttpRequest at 'https://api.reelgood.com/v2/browse/source/netflix?sort=4&sources=netflix&take=250' from origin 'https://netflix-assistant.netlify.app' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

The error happens even when setting `Access-Control-Allow-Origin` header in [netlify.toml](netlify.toml).

But, this app still works as a local app on localhost. 😄

This can also be rebuilt as a server-side app to avoid the CORS errors in the browser. Or using a [Netlify Function](https://www.netlify.com/products/functions/).


## Sample

<div align="center">
    <a href="https://netflix-assistant.netlify.com">
        <img src="sample.png" alt="sample" width="600" height="600" />
    </a>
</div>


## Setup and run locally

### Clone

Clone the repo.

```sh
$ git clone git@github.com:MichaelCurrin/netflix-assistant.git
$ cd netflix-assistant
```

There are no build or install steps, so contnue.

### Run

Start a web server in the root directory.

Use VS Code Live server (it auto reloads).

Or the command-line. e.g.

```sh
python3 -m http.server
```

Open the browser

- https://localhost:8000


## Remote setup

This repo can be deployed on Netlify. The CORS header must be set for API requests and this is not possible to be set on Github Pages.

UPDATE: This project no longer works on Netlify due to CORS error - due to a change on the API site and not the app or Netlify.


## Source of data

On ReelGood's website there is a view of TV shows and movies available to stream on Netflix.

- https://reelgood.com/source/netflix

The page supports filter parameters, ordering options and display format options.

The show data is retrieved from the ReelGood API.

- https://api.reelgood.com/v2/

This is done upon initial page load, when you apply filtering/sorting and also when you click _Load More_ at the bottom of the page.

The API is free to use and on their FAQ page they provide details for requesting API access. I found that without having to e-mail them that the API is easy to access. I have not found documentation for it yet, so I compare GUI choice I make with the API requests which are made and infer how the fields on the API requests work and what the response fields mean.


## License

Released under [MIT](/LICENSE).
