(function($){

$.fn.geo = function(){

    var self = $(this);
    
    var inlocate = false;
    var inited = false;

    OpenLayers.ImgPath = "/repository/geo/openlayers/theme/absolution/img/";
    
    var switcher = new OpenLayers.Control.LayerSwitcher({roundedCorner : false});
    
    switcher._redraw_ = switcher.redraw;
    
    switcher.redraw = function() {
        var div = switcher._redraw_();
        $(div).find("input").each(function(){
            if (!this.uniformed) {
                $(this).uniform();
                $(this).parent().parent().css("margin-bottom", "0").css("margin-top", "0.4em");
                this.uniformed = true;
            }
        });
        return div;
    };

    var displayProjection = new OpenLayers.Projection("EPSG:4326");
    
    var _bounds = $("<input name='have:extent' type='hidden'/>").appendTo(self);
    
    var link = new OpenLayers.Control.Permalink(null, location.pathname);

    var onMoveEnd = function(event){
        var map = event.object;
        var extent = map.getExtent();
        if (extent == null) extent = map.maxExtent;
        _bounds.val(extent.transform(map.getProjectionObject(), displayProjection).toArray());
        link.updateLink();
        if (!inlocate && inited){
            History.pushState(null, null, link.element.search)
        }
    };

    var map = new OpenLayers.Map (self.get(0), {
    
        theme : "/repository/geo/openlayers/theme/absolution/style.css",
    
        maxExtent         : new OpenLayers.Bounds(455402, 4967657, 473295, 4984095),
        maxResolution     : 156543.0399,
        numZoomLevels     : 19,
        units             : 'm',
        projection        : new OpenLayers.Projection("EPSG:900913"),
        displayProjection : displayProjection,
        
        controls : [
            new OpenLayers.Control.Attribution(),
            new OpenLayers.Control.Navigation(),
            new OpenLayers.Control.PanZoomBar(),
            new OpenLayers.Control.ScaleLine(),
            switcher,
            link            
        ],
        
        layers : [
            // OpenStreetMap layer 
            new OpenLayers.Layer.OSM.Mapnik("OpenStreetMap")
        ],
        
        eventListeners : {
            "moveend" : onMoveEnd
        }
        
    });
    
    map.setCenter(new OpenLayers.LonLat(0,0), 8);
    
    try {
        // Microsoft bing layer
        map.addLayer(new OpenLayers.Layer.VirtualEarth("Bing Aerial", {type: VEMapStyle.Aerial}))
    } catch (e){};
    
    try {
        // Google streets layer
        map.addLayer(new OpenLayers.Layer.Google("Google Streets", {numZoomLevels: 20}));
        // Google satellite layer
        map.addLayer(new OpenLayers.Layer.Google("Google Satellite", {type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22}));
        // Google physical layer
        //map.addLayer(new OpenLayers.Layer.Google("Google Physical", {type: google.maps.MapTypeId.TERRAIN}));
        // Google hybrid layer
        //map.addLayer(new OpenLayers.Layer.Google("Google Hybrid", {type: google.maps.MapTypeId.HYBRID, numZoomLevels: 20}));
    } catch (e){};
    
    var LonLat = function(lon, lat){
        return new OpenLayers.LonLat(lon, lat).transform(displayProjection, map.getProjectionObject());
    };
    
    var Bounds = function(bounds){
        if (bounds instanceof Array){
            return new OpenLayers.Bounds(bounds[0], bounds[1], bounds[2], bounds[3])
                .transform(displayProjection, map.getProjectionObject());
        } else {
            var b = bounds.split(",");
            return new OpenLayers.Bounds(b[0], b[1], b[2], b[3])
                .transform(displayProjection, map.getProjectionObject());
        }
    };
    
    self.locate = function (lon, lat, zoom, bounds, layers) {
        inlocate = true;
        if (lon && lat){
            if (zoom && zoom !== "undefined"){
                map.setCenter(LonLat(lon, lat), zoom);
            } else {
                map.panTo(LonLat(lon, lat));
                if (bounds && bounds != "undefined"){
                    map.zoomToExtent(Bounds(bounds));
                }
            }
        };
        if (layers) {
            var l = map.layers[layers.indexOf("B")];
            if (l) {
                map.setBaseLayer(l);
            }
        }
        inlocate = false;
        return self;
    };
    
    var markersMap = [];
    
    var markers = function (key){
        var m = markersMap[key];
        if (m == null){
            m = new OpenLayers.Layer.Markers(key);
            markersMap[key] = m;
            addLayer(m);
        }
        return markers;
    };
    
    self.flag = function (key, lon, lat, icon) {
        var markers = markers(key); 
        markers.addMarker(new OpenLayers.Marker(LonLat(lon, lat)));
        markers.setVisibility(true);
        return self;
    };
    
    self.bind("locate", function(e, lon, lat, zoom, bounds, layers){
        self.locate(lon, lat, zoom, bounds, layers);
    });
    
    inited = true;
                    
    return self;
    
}
})(jQuery);
