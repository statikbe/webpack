# Webpack

## How to start

```
yarn
yarn run takeoff:install
yarn run watch
```

## Purgecss

### Selectize
In order to keep selectize working whitelist these classes:

`whitelistPatterns: [//selectize/, /selectize-input dropdown-active/],`

### Modaal
In order to keep modaal working whitelist these classes:

`whitelistPatterns: [/modaal/, /modaal-*/],`

## Configure hot reloading
With hot reloading enabled, the browser updates automatically when .js or .scss/.css file changes are detected.
### Important!
`yarn run watch` and `yarn run dev` will not work when the .env file contains a DEV_SERVER_URL

### Add environment variables to your local .env file
```env
./.env
DEV_SERVER_URL=https://[project code].local.statik.be:3000/
DEV_SERVER_PORT=3000
DEV_SERVER_HOST=[project code].local.statik.be
```

### Update all references to js and css in the blade templates

```php
./resources/views/layouts/base.blade.php
@if (env('DEV_SERVER_URL')) 
<script type="text/javascript" src="{{env('DEV_SERVER_URL')}}js/main.js"></script>
@else
<script type="text/javascript" src="js/main.js"></script>
@endif
```

### Start the dev server
```bash
yarn hot
```

