# Leaflet.Locate

A useful control to geolocate the user with many options.

Tested with [Leaflet](http://leafletjs.com/) 1.9.2 and [Mapbox.js](https://docs.mapbox.com/mapbox.js/) 3.3.1 in Firefox, Chrome and Safari.

## Basic Usage

### Set up:

1. Get CSS and JavaScript files
2. Include CSS and JavaScript files
3. Initialize plugin

#### Download JavaScript and CSS files

For testing purposes and development, you can use the latest version directly from my repository.

For production environments, use [Bower](http://bower.io/) and run `bower install --save tete-chercheuse/leaflet-locatecontrol-capacitor` or [download the files from this repository](https://github.com/tete-chercheuse/leaflet-locatecontrol-capacitor/archive/gh-pages.zip). Bower will always download the latest version and keep the code up to date. The original JS and CSS files are in [`\src`](https://github.com/tete-chercheuse/leaflet-locatecontrol-capacitor/tree/gh-pages/src) and the minified versions suitable for production are in [`\dist`](https://github.com/tete-chercheuse/leaflet-locatecontrol-capacitor/tree/gh-pages/dist).

You can also get the latest version of the plugin with [npm](https://www.npmjs.org/). Just run `npm install --save tete-chercheuse/leaflet-locatecontrol-capacitor`.

#### Add the JavaScript and CSS files

Then include the CSS and JavaScript files.

##### With `npm`

```ts
import 'leaflet-locatecontrol-capacitor' // Import plugin
import 'leaflet-locatecontrol-capacitor/dist/L.Control.Locate.css' // Import styles
import L from 'leaflet' // Import L from leaflet to start using the plugin
```

#### Add the following snippet to your map initialization:

This snippet adds the control to the map. You can pass also pass a configuration.

```js
L.control.locate().addTo(map);
```

### Possible options

The locate controls inherits options from [Leaflet Controls](http://leafletjs.com/reference.html#control-options).

To customize the control, pass an object with your custom options to the locate control.

```js
L.control.locate(OPTIONS).addTo(map);
```

Possible options are listed in the following table. More details are [in the code](https://github.com/domoritz/leaflet-locatecontrol/blob/gh-pages/src/L.Control.Locate.js#L31).

<!-- prettier-ignore-start -->

| Option     | Type      | Description       |  Default |
|------------|-----------|-------------------|----------|
| `position` | `string`  | Position of the control | `topleft` |
| `layer` | [`ILayer`](http://leafletjs.com/reference.html#ilayer)  | The layer that the user's location should be drawn on. | a new layer |
| `setView` | `boolean`  or `string`  | Set the map view (zoom and pan) to the user's location as it updates. Options are `false`, `'once'`, `'always'`, `'untilPan'`, or `'untilPanOrZoom'` | `'untilPanOrZoom'` |
| `flyTo` | `boolean` | Smooth pan and zoom to the location of the marker. Only works in Leaflet 1.0+. | `false` |
| `keepCurrentZoomLevel` | `boolean`  | Only pan when setting the view. | `false` |
| `initialZoomLevel` | `false` or `integer` | After activating the plugin by clicking on the icon, zoom to the selected zoom level, even when keepCurrentZoomLevel is true. Set to `false` to disable this feature. | `false` |
| `clickBehavior` | `object`  | What to do when the user clicks on the control. Has three options `inView`, `inViewNotFollowing` and `outOfView`. Possible values are `stop` and `setView`, or the name of a behaviour to inherit from. | `{inView: 'stop', outOfView: 'setView', inViewNotFollowing: 'inView'}` |
| `returnToPrevBounds` | `boolean`  | If set, save the map bounds just before centering to the user's location. When control is disabled, set the view back to the bounds that were saved. | `false` |
| `cacheLocation` | `boolean` | Keep a cache of the location after the user deactivates the control. If set to false, the user has to wait until the locate API returns a new location before they see where they are again. | `true` |
| `drawCircle` | `boolean`  | If set, a circle that shows the location accuracy is drawn. | `true` |
| `drawMarker` | `boolean`  | If set, the marker at the users' location is drawn. | `true` |
| `markerClass` | `class`  | The class to be used to create the marker. | `LocationMarker` |
| `circleStyle` | [`Path options`](http://leafletjs.com/reference.html#path-options) | Accuracy circle style properties. | see code |
| `markerStyle` | [`Path options`](http://leafletjs.com/reference.html#path-options) | Inner marker style properties. Only works if your marker class supports `setStyle`. | see code |
| `followCircleStyle` | [`Path options`](http://leafletjs.com/reference.html#path-options)  | Changes to the accuracy circle while following. Only need to provide changes. | `{}` |
| `followMarkerStyle` | [`Path options`](http://leafletjs.com/reference.html#path-options)  | Changes to the inner marker while following. Only need to provide changes. | `{}` |
| `icon` | `string`  | The CSS class for the icon. | `leaflet-control-locate-location-arrow` |
| `iconLoading` | `string`  | The CSS class for the icon while loading. | `leaflet-control-locate-spinner` |
| `iconElementTag` | `string`  | The element to be created for icons. | `span` |
| `circlePadding` | `array`  | Padding around the accuracy circle. | `[0, 0]` |
| `createButtonCallback` | `function`  | This callback can be used in case you would like to override button creation behavior. | see code |
| `getLocationBounds` | `function`  | This callback can be used to override the viewport tracking behavior. | see code |
| `onLocationError` | `function`  | This even is called when the user's location is outside the bounds set on the map. | see code |
| `metric` | `boolean` | Use metric units. | `true` |
| `onLocationOutsideMapBounds` | `function`  | Called when the user's location is outside the bounds set on the map. Called repeatedly when the user's location changes. | see code |
| `showPopup` | `boolean`  | Display a pop-up when the user click on the inner marker. | `true` |
| `strings` | `object`  | Strings used in the control. Options are `title`, `text`, `metersUnit`, `feetUnit`, `popup` and `outsideMapBoundsMsg` | see code |
| `strings.popup` | `string` or `function`  | The string shown as popup. May contain the placeholders `{distance}` and `{unit}`. If this option is specified as function, it will be executed with a single parameter `{distance, unit}` and expected to return a string. | see code |
| `locateOptions` | [`Locate options`](http://leafletjs.com/reference.html#map-locate-options)  | The default options passed to leaflets locate method. | see code |

<!-- prettier-ignore-end -->

For example, to customize the position and the title, you could write

```js
var lc = L.control
  .locate({
    position: "topright",
    strings: {
      title: "Show me where I am, yo!"
    }
  })
  .addTo(map);
```

## Screenshot

![screenshot](https://raw.github.com/tete-chercheuse/leaflet-locatecontrol-capacitor/gh-pages/screenshot.png "Screenshot showing the locate control")

## Advanced Usage

### Methods

You can call `start()` or `stop()` on the locate control object to set the location on page load for example.

```js
// create control and add to map
var lc = L.control.locate().addTo(map);

// request location update and set location
lc.start();
```

You can keep the plugin active but stop following using `lc.stopFollowing()`.

### Events

You can leverage the native Leaflet events `locationfound` and `locationerror` to handle when geolocation is successful or produces an error. You can find out more about these events in the [Leaflet documentation](http://leafletjs.com/examples/mobile.html#geolocation).

Additionally, the locate control fires `locateactivate` and `locatedeactivate` events on the map object when it is activated and deactivated, respectively.

### Extending

To customize the behavior of the plugin, use L.extend to override `start`, `stop`, `_drawMarker` and/or `_removeMarker`. Please be aware that functions may change and customizations become incompatible.

```js
L.Control.MyLocate = L.Control.Locate.extend({
  _drawMarker: function() {
    // override to customize the marker
  }
});

var lc = new L.Control.MyLocate();
```

### FAQ

#### How do I set the maximum zoom level?

Set the `maxZoom` in `locateOptions` (`keepCurrentZoomLevel` must not be set to true).

```js
map.addControl(
  L.control.locate({
    locateOptions: {
      maxZoom: 10
    }
  })
);
```

#### How do I enable high accuracy?

To enable [high accuracy (GPS) mode](http://leafletjs.com/reference.html#map-enablehighaccuracy), set the `enableHighAccuracy` in `locateOptions`.

```js
map.addControl(
  L.control.locate({
    locateOptions: {
      enableHighAccuracy: true
    }
  })
);
```

#### Safari does not work with Leaflet 1.7.1

This is a bug in Leaflet. Disable tap to fix it for now. See [this issue](https://github.com/Leaflet/Leaflet/issues/7255) for details.

```js
let map = new L.Map('map', {
  tap: false,
  ...
});
```

## Developers

Run the demo locally with `yarn start` or `npm run start` and then open [localhost:9000/demo/index.html](http://localhost:9000/demo/index.html).

To generate the minified JS and CSS files, use [grunt](http://gruntjs.com/getting-started) and run `grunt`. However, don't include new minified files or a new version as part of a pull request. If you need SASS, install it with `brew install sass/sass/sass`.

## Prettify and linting

Before a Pull Request please check the code style.

Run `npm run lint` to check if there are code style or linting issues.

Run `npm run:fix` to automatically fix style and linting issues.

## Making a release (only core developer)

A new version is released with `npm run bump:minor`. Then push the new code with `git push && git push --tags` and publish to npm with `npm publish`.

### Terms

*active*: After we called `map.locate()` and before `map.stopLocate()`. Any time, the map can fire the `locationfound` or `locationerror` events.

*following*: Following refers to whether the map zooms and pans automatically when a new location is found.

## License

MIT

SVG icons from [Font Awesome v5.15.4](https://github.com/FortAwesome/Font-Awesome/releases/tag/5.15.4): [Creative Commons Attribution 4.0](https://fontawesome.com/license/free)
