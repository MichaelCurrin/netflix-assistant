# Netflix Assistant 📺 👀 🌐
> A tool to help search and filter shows and movies on Netflix using the ReelGood API

[![Netlify Status](https://api.netlify.com/api/v1/badges/e5dfdbec-c007-4323-a375-fc01798166e8/deploy-status)](https://app.netlify.com/sites/netflix-assistant/deploys "Netlify app deploy status")
[![GitHub tag](https://img.shields.io/github/tag/MichaelCurrin/netflix-assistant)](https://github.com/MichaelCurrin/netflix-assistant/releases/?include_prereleases&sort=semver "Latest tag")
[![License: MIT](https://img.shields.io/badge/License-MIT-blue)](#license)

<div align="center">

[![Site](https://img.shields.io/badge/View_site-Netflix_Assistant-2ea44f?style=for-the-badge)](https://netflix-assistant.netlify.com/)

</div>


## Purpose

[ReelGood](https://reelgood.com) is a site which provides listing of TV shows and movies across many online services, including [Netflix](netflix.com/).

ReelGood has a great GUI on their website which is easy to navigate for searching and filtering. They also use an API as part of this. I wanted to build my own show guide reports and recommendations list, so I pull data from their API with client-side JS and render it on a website. 

So far it just represents one page of results as text and images using templating - there is no fancy reporting or filtering.


## Preview

<div align="center">
    <a href="https://netflix-assistant.netlify.com">
        <img src="/sample.png" alt="sample screenshot" width="350" />
    </a>
</div>


## Installation

### Clone

Clone the repo.

```sh
$ git clone git@github.com:MichaelCurrin/netflix-assistant.git
$ cd netflix-assistant
```

There are no build or install steps, so continue.


## Infrastructure

Due to CORS errors caused by the API provider, the app no longer works using browser requests to the ReelGood API. 

It was redesigned to use Netlify's free Functions feature, which is similar to AWS Lambda.

A Function has been defined using a short JS script and this is hosted on Netlify. When a request is done to this endpoint, as request is done to the ReelGood API and the result is returned as a cached JSON response. 

This is much simpler than saying building a Python or Node API, as that needs a lot more code and cannot be hosted on Netlify.

### Using Function endpoin locally

The downside is that the Function only works in the cloud and not on a local server. 

There are some ways around this:

- Setup Python/Node server locally and access it on localhost. You can setup a server using a short script with `http` library maybe and just add an extra line to call the JS script on a certain endpoint - this means you only need one server and one port.
- Use Netlify CLI (maybe something like [netlify](https://www.npmjs.com/package/netlify) on NPM).
- Get the the HTML/JS code to run on localhost, but still reference the Netlify app's Function endpoint using a customized URL.


## Usage

Note the local usage is limited - see the the section above.

Start a web server in the root directory.

See approaches in this [gist](https://gist.github.com/MichaelCurrin/1a6116a4e0918c8468dc7e1a701a5f95) or use an approach below.

- Use VS Code's Live Server extension (with auto reloading).
- Start a Python web server (no auto reloading).
    ```sh
    $ python3 -m http.server
    ```

Open in the browser. e.g.

- https://localhost:8000


## Deploy
> Remote setup

This repo can be deployed on Netlify for free - as a static website plus Netlify Functions for the serverless backend calls to the external API.

The CORS header must be set for API requests and this is not possible to be set on Github Pages.


## Source of data

On ReelGood's website there is a view of TV shows and movies available to stream on Netflix.

- https://reelgood.com/source/netflix

The page supports filter parameters, ordering options and display format options.

The show data is retrieved from the ReelGood API.

- https://api.reelgood.com/v2/

This is done upon initial page load, when you apply filtering/sorting and also when you click _Load More_ at the bottom of the page.

The API is free to use and on their FAQ page they provide details for requesting API access. I found that without having to e-mail them that the API is easy to access. I have not found documentation for it yet, so I compare GUI choice I make with the API requests which are made and infer how the fields on the API requests work and what the response fields mean.


## Development

### Limitations

Note: This project no longer works when deployed on remote environments such as Netlify due to a CORS error. 

This was not present on initial development. It appears that ReelGood added a header to their site to prevent cross-origin requests.

Here is the error message:

> Access to XMLHttpRequest at 'https://api.reelgood.com/v2/browse/source/netflix?sort=4&sources=netflix&take=250' from origin 'https://netflix-assistant.netlify.app' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

The error happens even when setting `Access-Control-Allow-Origin` header in [netlify.toml](netlify.toml).

But, this app still works as a local app on localhost. 😄

### Lambda

To avoid CORS errors, this project uses a Function aka Lambda on Netlify to request data on the server side and then make the data available on the same domain as the browser request.

See [Netlify Function](https://www.netlify.com/products/functions/).

See also [blog post](https://dev.to/abusedmedia/using-netlify-functions-to-fetch-external-files-1a4b).

A local setup could use a Netlify library or just a fallback to using the original URL (which doesn't give CORS errors on localhost fortunately even though it does on Netlify) based on an flag like `ENV=dev` or local/remote.


## License

Released under [MIT](/LICENSE) by [@MichaelCurrin](https://github.com/MichaelCurrin).
