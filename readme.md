# downloader

```
  youtube-dl nEpF6ISYdM0 -o 'test.%(ext)s' -x --audio-format mp3 --audio-quality 320k
```

# dev

## typescript

```
  npm i typescript ts-node-dev -s
  npx tsc --init
```

  - add tsc/dev/prod command in package.json script part

# libs

  * dev:
    - dev's playground
  * [x] samples:
    - batchMetaFiler
  * [x] batchMetaFiler:
    - each file in dir
      - metaLoader
      - filer
  * [x] metaLoader:
    - [x] get meta
    - [x] login(once)
      - configurable token
    - [x] empty title
      - query by file name
    - [x] non empty title
      - query by artist/title field
    - [ ] chinese GB/BIG5 -> UTF8
  * [x] filer:
    - get title from meta(pass in)
    - if title parsed
      - write other meta back
      - re-org: move/rename file
    - if title not parsed
      - keep, notice user to adjust it
      
# ref

  - spotify api
    * https://developer.spotify.com/console/get-search-item/?q=孤單心事&type=track&market=&limit=1&offset= 

