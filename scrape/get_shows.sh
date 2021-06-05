#!/usr/bin/env bash

set -e

URL='https://api.reelgood.com/v3.0/content/browse/filtered'

# First page. Note skip=0.
PARAMS='availability=onSources&content_kind=show&free=false&hide_seen=false&hide_tracked=false&hide_watchlisted=false&imdb_end=10&imdb_start=5.0&region=us&rg_end=100&rg_start=50&skip=0&sort=0&sources=netflix&take=50&year_end=2021&year_start=1900'

curl "$URL?$PARAMS" \
  -H 'User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:88.0) Gecko/20100101 Firefox/88.0' \
  -H 'Accept: */*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://reelgood.com/tv?filter-imdb_start=5.2&filter-rg_start=53' -H 'x-platform: web' -H 'Origin: https://reelgood.com' -H 'DNT: 1' -H 'Connection: keep-alive' -H 'Pragma: no-cache' -H 'Cache-Control: no-cache' -H 'TE: Trailers' |
  python3 -m json.tool \
    >out/shows.json

# Second page. Note skip=50.
PARAMS='availability=onSources&content_kind=show&free=false&hide_seen=false&hide_tracked=false&hide_watchlisted=false&imdb_end=10&imdb_start=5.0&region=us&rg_end=100&rg_start=50&skip=50&sort=0&sources=netflix&take=50&year_end=2021&year_start=1900'

curl "$URL?$PARAMS" \
  -H 'User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:88.0) Gecko/20100101 Firefox/88.0' -H 'Accept: */*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://reelgood.com/tv?filter-imdb_start=5.2&filter-rg_start=51' -H 'x-platform: web' -H 'Origin: https://reelgood.com' -H 'DNT: 1' -H 'Connection: keep-alive' -H 'Pragma: no-cache' -H 'Cache-Control: no-cache' -H 'TE: Trailers' |
  python3 -m json.tool \
    >out/shows2.json

# Keep going while has_more is `true`.
