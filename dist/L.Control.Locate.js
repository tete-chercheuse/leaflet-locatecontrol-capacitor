import{Geolocation}from"@capacitor/geolocation";!function(t,i){"function"==typeof define&&define.amd?define(["leaflet"],t):"object"==typeof exports&&(void 0!==i&&i.L?module.exports=t(L):module.exports=t(require("leaflet"))),void 0!==i&&i.L&&(i.L.Control.Locate=t(L))}(function(a){const o=(i,o,t)=>{(t=t.split(" ")).forEach(function(t){a.DomUtil[i].call(this,o,t)})},i=(t,i)=>o("addClass",t,i),e=(t,i)=>o("removeClass",t,i);var t=a.Marker.extend({initialize(t,i){a.Util.setOptions(this,i),this._latlng=t,this.createIcon()},createIcon(){var t=this.options;let i="";void 0!==t.color&&(i+=`stroke:${t.color};`),void 0!==t.weight&&(i+=`stroke-width:${t.weight};`),void 0!==t.fillColor&&(i+=`fill:${t.fillColor};`),void 0!==t.fillOpacity&&(i+=`fill-opacity:${t.fillOpacity};`),void 0!==t.opacity&&(i+=`opacity:${t.opacity};`);t=this._getIconSVG(t,i);this._locationIcon=a.divIcon({className:t.className,html:t.svg,iconSize:[t.w,t.h]}),this.setIcon(this._locationIcon)},_getIconSVG(t,i){var o=t.radius,t=o+t.weight,e=2*t;return{className:"leaflet-control-locate-location",svg:`<svg xmlns="http://www.w3.org/2000/svg" width="${e}" height="${e}" viewBox="-${t} -${t} ${e} ${e}">`+'<circle r="'+o+'" style="'+i+'" /></svg>',w:e,h:e}},setStyle(t){a.Util.setOptions(this,t),this.createIcon()}}),t=a.Control.extend({options:{position:"topleft",layer:void 0,setView:"untilPanOrZoom",keepCurrentZoomLevel:!1,initialZoomLevel:!1,getLocationBounds(t){return t.bounds},flyTo:!1,clickBehavior:{inView:"stop",outOfView:"setView",inViewNotFollowing:"inView"},returnToPrevBounds:!1,cacheLocation:!0,drawCircle:!0,drawMarker:!0,markerClass:t,circleStyle:{className:"leaflet-control-locate-circle",color:"#136AEC",fillColor:"#136AEC",fillOpacity:.15,weight:0},markerStyle:{className:"leaflet-control-locate-marker",color:"#fff",fillColor:"#2A93EE",fillOpacity:1,weight:3,opacity:1,radius:9},followCircleStyle:{},followMarkerStyle:{},icon:"leaflet-control-locate-location-arrow",iconLoading:"leaflet-control-locate-spinner",iconElementTag:"span",textElementTag:"small",circlePadding:[0,0],metric:!0,createButtonCallback(t,i){var t=a.DomUtil.create("a","leaflet-bar-part leaflet-bar-part-single",t),o=(t.title=i.strings.title,t.href="#",t.setAttribute("role","button"),a.DomUtil.create(i.iconElementTag,i.icon,t));return void 0!==i.strings.text&&(a.DomUtil.create(i.textElementTag,"leaflet-locate-text",t).textContent=i.strings.text,t.classList.add("leaflet-locate-text-active"),t.parentNode.style.display="flex",0<i.icon.length)&&o.classList.add("leaflet-locate-icon"),{link:t,icon:o}},onLocationError(t,i){alert(t.message)},onLocationOutsideMapBounds(t){t.stop(),alert(t.options.strings.outsideMapBoundsMsg)},showPopup:!0,strings:{title:"Show me where I am",metersUnit:"meters",feetUnit:"feet",popup:"You are within {distance} {unit} from this point",outsideMapBoundsMsg:"You seem located outside the boundaries of the map"},locateOptions:{maxZoom:1/0,watch:!0,setView:!1}},initialize(t){for(const i in t)"object"==typeof this.options[i]?a.extend(this.options[i],t[i]):this.options[i]=t[i];this.options.followMarkerStyle=a.extend({},this.options.markerStyle,this.options.followMarkerStyle),this.options.followCircleStyle=a.extend({},this.options.circleStyle,this.options.followCircleStyle)},onAdd(t){var i=a.DomUtil.create("div","leaflet-control-locate leaflet-bar leaflet-control"),t=(this._container=i,this._map=t,this._layer=this.options.layer||new a.LayerGroup,this._layer.addTo(t),this._event=void 0,this._prevBounds=null,this.options.createButtonCallback(i,this.options));return this._link=t.link,this._icon=t.icon,a.DomEvent.on(this._link,"click",function(t){a.DomEvent.stopPropagation(t),a.DomEvent.preventDefault(t),this._onClick()},this).on(this._link,"dblclick",a.DomEvent.stopPropagation),this._resetVariables(),this._map.on("unload",this._unload,this),i},_onClick(){this._justClicked=!0;var i=this._isFollowing();if(this._userPanned=!1,this._userZoomed=!1,this._active&&!this._event)this.stop();else if(this._active){var o=this.options.clickBehavior;let t=o.outOfView;switch(t=o[t=this._map.getBounds().contains(this._event.latlng)?i?o.inView:o.inViewNotFollowing:t]?o[t]:t){case"setView":this.setView();break;case"stop":this.stop(),this.options.returnToPrevBounds&&(this.options.flyTo?this._map.flyToBounds:this._map.fitBounds).bind(this._map)(this._prevBounds)}}else this.options.returnToPrevBounds&&(this._prevBounds=this._map.getBounds()),this.start();this._updateContainerStyle()},start(){this._activate(),this._event&&(this._drawMarker(this._map),this.options.setView)&&this.setView(),this._updateContainerStyle()},stop(){this._deactivate(),this._cleanClasses(),this._resetVariables(),this._removeMarker()},stopFollowing(){this._userPanned=!0,this._updateContainerStyle(),this._drawMarker()},async _activate(){if(!this._active&&this._map){try{var t=await Geolocation.getCurrentPosition({enableHighAccuracy:!0});this._event={latlng:{lat:t.coords.latitude,lng:t.coords.longitude},accuracy:t.coords.accuracy},this._onLocationFound(coords)}catch(t){this._onLocationError(t)}this.options.locateOptions.watch&&(this.geolocationWatcherId=await Geolocation.watchPosition({enableHighAccuracy:!0},t=>{try{this._onLocationFound({latlng:{lat:t.coords.latitude,lng:t.coords.longitude},accuracy:t.coords.accuracy})}catch(t){this._onLocationError(t)}})),this._active=!0,this._map.on("dragstart",this._onDrag,this),this._map.on("zoomstart",this._onZoom,this),this._map.on("zoomend",this._onZoomEnd,this)}},_deactivate(){this._active&&this._map&&(this.options.locateOptions.watch&&this.geolocationWatcherId&&Geolocation.clearWatch({id:this.geolocationWatcherId}),this._active=!1,this.options.cacheLocation||(this._event=void 0),this._map.off("dragstart",this._onDrag,this),this._map.off("zoomstart",this._onZoom,this),this._map.off("zoomend",this._onZoomEnd,this))},setView(){var t;this._drawMarker(),this._isOutsideMapBounds()?(this._event=void 0,this.options.onLocationOutsideMapBounds(this)):this._justClicked&&!1!==this.options.initialZoomLevel?(this.options.flyTo?this._map.flyTo:this._map.setView).bind(this._map)([this._event.latitude,this._event.longitude],this.options.initialZoomLevel):this.options.keepCurrentZoomLevel?(this.options.flyTo?this._map.flyTo:this._map.panTo).bind(this._map)([this._event.latitude,this._event.longitude]):(t=this.options.flyTo?this._map.flyToBounds:this._map.fitBounds,this._ignoreEvent=!0,t.bind(this._map)(this.options.getLocationBounds(this._event),{padding:this.options.circlePadding,maxZoom:this.options.initialZoomLevel||this.options.locateOptions.maxZoom}),a.Util.requestAnimFrame(function(){this._ignoreEvent=!1},this))},_drawMarker(){void 0===this._event.accuracy&&(this._event.accuracy=0);var t,i=this._event.accuracy,o=this._event.latlng;this.options.drawCircle&&(t=this._isFollowing()?this.options.followCircleStyle:this.options.circleStyle,this._circle?this._circle.setLatLng(o).setRadius(i).setStyle(t):this._circle=a.circle(o,i,t).addTo(this._layer));let e,s;s=this.options.metric?(e=i.toFixed(0),this.options.strings.metersUnit):(e=(3.2808399*i).toFixed(0),this.options.strings.feetUnit),this.options.drawMarker&&(t=this._isFollowing()?this.options.followMarkerStyle:this.options.markerStyle,this._marker?(this._marker.setLatLng(o),this._marker.setStyle&&this._marker.setStyle(t)):this._marker=new this.options.markerClass(o,t).addTo(this._layer));const n=this.options.strings.popup;this.options.showPopup&&n&&this._marker&&this._marker.bindPopup("string"==typeof n?a.Util.template(n,{distance:e,unit:s}):"function"==typeof n?n({distance:e,unit:s}):n)._popup.setLatLng(o)},_removeMarker(){this._layer.clearLayers(),this._marker=void 0,this._circle=void 0},_unload(){this.stop(),this._map.off("unload",this._unload,this)},_onLocationError(t){this.geolocationWatcherId||(this.stop(),this.options.onLocationError(t,this))},_onLocationFound(t){if((!this._event||this._event.latlng.lat!==t.latlng.lat||this._event.latlng.lng!==t.latlng.lng||this._event.accuracy!==t.accuracy)&&this._active){switch(this._event=t,this._drawMarker(),this._updateContainerStyle(),this.options.setView){case"once":this._justClicked&&this.setView();break;case"untilPan":this._userPanned||this.setView();break;case"untilPanOrZoom":this._userPanned||this._userZoomed||this.setView();break;case"always":this.setView()}this._justClicked=!1}},_onDrag(){this._event&&!this._ignoreEvent&&(this._userPanned=!0,this._updateContainerStyle(),this._drawMarker())},_onZoom(){this._event&&!this._ignoreEvent&&(this._userZoomed=!0,this._updateContainerStyle(),this._drawMarker())},_onZoomEnd(){this._event&&!this._ignoreEvent&&this._marker&&!this._map.getBounds().pad(-.3).contains(this._marker.getLatLng())&&(this._userPanned=!0,this._updateContainerStyle(),this._drawMarker())},_isFollowing(){return!!this._active&&("always"===this.options.setView||("untilPan"===this.options.setView?!this._userPanned:"untilPanOrZoom"===this.options.setView?!this._userPanned&&!this._userZoomed:void 0))},_isOutsideMapBounds(){return void 0!==this._event&&this._map.options.maxBounds&&!this._map.options.maxBounds.contains(this._event.latlng)},_updateContainerStyle(){this._container&&(this._active&&!this._event?this._setClasses("requesting"):this._isFollowing()?this._setClasses("following"):this._active?this._setClasses("active"):this._cleanClasses())},_setClasses(t){"requesting"===t?(e(this._container,"active following"),i(this._container,"requesting"),e(this._icon,this.options.icon),i(this._icon,this.options.iconLoading)):"active"===t?(e(this._container,"requesting following"),i(this._container,"active"),e(this._icon,this.options.iconLoading),i(this._icon,this.options.icon)):"following"===t&&(e(this._container,"requesting"),i(this._container,"active following"),e(this._icon,this.options.iconLoading),i(this._icon,this.options.icon))},_cleanClasses(){a.DomUtil.removeClass(this._container,"requesting"),a.DomUtil.removeClass(this._container,"active"),a.DomUtil.removeClass(this._container,"following"),e(this._icon,this.options.iconLoading),i(this._icon,this.options.icon)},_resetVariables(){this._active=!1,this._justClicked=!1,this._userPanned=!1,this._userZoomed=!1}});return a.control.locate=t=>new a.Control.Locate(t),t},window);
//# sourceMappingURL=L.Control.Locate.js.map