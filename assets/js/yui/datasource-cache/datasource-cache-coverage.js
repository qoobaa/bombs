if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/datasource-cache/datasource-cache.js']) {
   __coverage__['build/datasource-cache/datasource-cache.js'] = {"path":"build/datasource-cache/datasource-cache.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0,"20":0,"21":0,"22":0},"b":{"1":[0,0],"2":[0,0],"3":[0,0],"4":[0,0],"5":[0,0],"6":[0,0],"7":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":28},"end":{"line":1,"column":47}}},"2":{"name":"(anonymous_2)","line":14,"loc":{"start":{"line":14,"column":31},"end":{"line":14,"column":42}}},"3":{"name":"(anonymous_3)","line":50,"loc":{"start":{"line":50,"column":17},"end":{"line":50,"column":34}}},"4":{"name":"(anonymous_4)","line":68,"loc":{"start":{"line":68,"column":25},"end":{"line":68,"column":37}}},"5":{"name":"(anonymous_5)","line":111,"loc":{"start":{"line":111,"column":27},"end":{"line":111,"column":39}}},"6":{"name":"DataSourceCache","line":129,"loc":{"start":{"line":129,"column":0},"end":{"line":129,"column":33}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":166,"column":76}},"2":{"start":{"line":14,"column":0},"end":{"line":15,"column":2}},"3":{"start":{"line":17,"column":0},"end":{"line":40,"column":3}},"4":{"start":{"line":42,"column":0},"end":{"line":117,"column":2}},"5":{"start":{"line":51,"column":8},"end":{"line":51,"column":65}},"6":{"start":{"line":52,"column":8},"end":{"line":52,"column":67}},"7":{"start":{"line":70,"column":8},"end":{"line":71,"column":35}},"8":{"start":{"line":73,"column":8},"end":{"line":81,"column":9}},"9":{"start":{"line":74,"column":12},"end":{"line":74,"column":44}},"10":{"start":{"line":75,"column":12},"end":{"line":75,"column":46}},"11":{"start":{"line":76,"column":12},"end":{"line":76,"column":42}},"12":{"start":{"line":78,"column":12},"end":{"line":78,"column":55}},"13":{"start":{"line":80,"column":12},"end":{"line":80,"column":83}},"14":{"start":{"line":113,"column":8},"end":{"line":115,"column":9}},"15":{"start":{"line":114,"column":12},"end":{"line":114,"column":44}},"16":{"start":{"line":119,"column":0},"end":{"line":119,"column":74}},"17":{"start":{"line":129,"column":0},"end":{"line":135,"column":1}},"18":{"start":{"line":130,"column":4},"end":{"line":132,"column":43}},"19":{"start":{"line":133,"column":4},"end":{"line":133,"column":29}},"20":{"start":{"line":134,"column":4},"end":{"line":134,"column":23}},"21":{"start":{"line":137,"column":0},"end":{"line":160,"column":3}},"22":{"start":{"line":163,"column":0},"end":{"line":163,"column":56}}},"branchMap":{"1":{"line":70,"type":"binary-expr","locations":[{"start":{"line":70,"column":21},"end":{"line":70,"column":45}},{"start":{"line":70,"column":50},"end":{"line":70,"column":54}}]},"2":{"line":73,"type":"if","locations":[{"start":{"line":73,"column":8},"end":{"line":73,"column":8}},{"start":{"line":73,"column":8},"end":{"line":73,"column":8}}]},"3":{"line":73,"type":"binary-expr","locations":[{"start":{"line":73,"column":12},"end":{"line":73,"column":17}},{"start":{"line":73,"column":21},"end":{"line":73,"column":35}}]},"4":{"line":113,"type":"if","locations":[{"start":{"line":113,"column":8},"end":{"line":113,"column":8}},{"start":{"line":113,"column":8},"end":{"line":113,"column":8}}]},"5":{"line":113,"type":"binary-expr","locations":[{"start":{"line":113,"column":11},"end":{"line":113,"column":21}},{"start":{"line":113,"column":25},"end":{"line":113,"column":34}}]},"6":{"line":130,"type":"cond-expr","locations":[{"start":{"line":130,"column":41},"end":{"line":130,"column":53}},{"start":{"line":130,"column":56},"end":{"line":130,"column":63}}]},"7":{"line":130,"type":"binary-expr","locations":[{"start":{"line":130,"column":16},"end":{"line":130,"column":22}},{"start":{"line":130,"column":26},"end":{"line":130,"column":38}}]}},"code":["(function () { YUI.add('datasource-cache', function (Y, NAME) {","","/**"," * Plugs DataSource with caching functionality."," *"," * @module datasource"," * @submodule datasource-cache"," */","","/**"," * DataSourceCache extension binds Cache to DataSource."," * @class DataSourceCacheExtension"," */","var DataSourceCacheExtension = function() {","};","","Y.mix(DataSourceCacheExtension, {","    /**","     * The namespace for the plugin. This will be the property on the host which","     * references the plugin instance.","     *","     * @property NS","     * @type String","     * @static","     * @final","     * @value \"cache\"","     */","    NS: \"cache\",","","    /**","     * Class name.","     *","     * @property NAME","     * @type String","     * @static","     * @final","     * @value \"dataSourceCacheExtension\"","     */","    NAME: \"dataSourceCacheExtension\"","});","","DataSourceCacheExtension.prototype = {","    /**","    * Internal init() handler.","    *","    * @method initializer","    * @param config {Object} Config object.","    * @private","    */","    initializer: function(config) {","        this.doBefore(\"_defRequestFn\", this._beforeDefRequestFn);","        this.doBefore(\"_defResponseFn\", this._beforeDefResponseFn);","    },","","    /**","     * First look for cached response, then send request to live data.","     *","     * @method _beforeDefRequestFn","     * @param e {EventFacade} Event Facade with the following properties:","     * <dl>","     * <dt>tId (Number)</dt> <dd>Unique transaction ID.</dd>","     * <dt>request (Object)</dt> <dd>The request.</dd>","     * <dt>callback (Object)</dt> <dd>The callback object.</dd>","     * <dt>cfg (Object)</dt> <dd>Configuration object.</dd>","     * </dl>","     * @protected","     */","    _beforeDefRequestFn: function(e) {","        // Is response already in the Cache?","        var entry = (this.retrieve(e.request)) || null,","            payload = e.details[0];","","        if (entry && entry.response) {","            payload.cached   = entry.cached;","            payload.response = entry.response;","            payload.data     = entry.data;","","            this.get(\"host\").fire(\"response\", payload);","","            return new Y.Do.Halt(\"DataSourceCache extension halted _defRequestFn\");","        }","    },","","    /**","     * Adds data to cache before returning data.","     *","     * @method _beforeDefResponseFn","     * @param e {EventFacade} Event Facade with the following properties:","     * <dl>","     * <dt>tId (Number)</dt> <dd>Unique transaction ID.</dd>","     * <dt>request (Object)</dt> <dd>The request.</dd>","     * <dt>callback (Object)</dt> <dd>The callback object with the following properties:","     *     <dl>","     *         <dt>success (Function)</dt> <dd>Success handler.</dd>","     *         <dt>failure (Function)</dt> <dd>Failure handler.</dd>","     *     </dl>","     * </dd>","     * <dt>data (Object)</dt> <dd>Raw data.</dd>","     * <dt>response (Object)</dt> <dd>Normalized response object with the following properties:","     *     <dl>","     *         <dt>cached (Object)</dt> <dd>True when response is cached.</dd>","     *         <dt>results (Object)</dt> <dd>Parsed results.</dd>","     *         <dt>meta (Object)</dt> <dd>Parsed meta data.</dd>","     *         <dt>error (Object)</dt> <dd>Error object.</dd>","     *     </dl>","     * </dd>","     * <dt>cfg (Object)</dt> <dd>Configuration object.</dd>","     * </dl>","     * @protected","     */","     _beforeDefResponseFn: function(e) {","        // Add to Cache before returning","        if(e.response && !e.cached) {","            this.add(e.request, e.response);","        }","     }","};","","Y.namespace(\"Plugin\").DataSourceCacheExtension = DataSourceCacheExtension;","","","","/**"," * DataSource plugin adds cache functionality."," * @class DataSourceCache"," * @extends Cache"," * @uses Plugin.Base, DataSourceCachePlugin"," */","function DataSourceCache(config) {","    var cache = config && config.cache ? config.cache : Y.Cache,","        tmpclass = Y.Base.create(\"dataSourceCache\", cache, [Y.Plugin.Base, Y.Plugin.DataSourceCacheExtension]),","        tmpinstance = new tmpclass(config);","    tmpclass.NS = \"tmpClass\";","    return tmpinstance;","}","","Y.mix(DataSourceCache, {","    /**","     * The namespace for the plugin. This will be the property on the host which","     * references the plugin instance.","     *","     * @property NS","     * @type String","     * @static","     * @final","     * @value \"cache\"","     */","    NS: \"cache\",","","    /**","     * Class name.","     *","     * @property NAME","     * @type String","     * @static","     * @final","     * @value \"dataSourceCache\"","     */","    NAME: \"dataSourceCache\"","});","","","Y.namespace(\"Plugin\").DataSourceCache = DataSourceCache;","","","}, '@VERSION@', {\"requires\": [\"datasource-local\", \"plugin\", \"cache-base\"]});","","}());"]};
}
var __cov_AV4LTKOxS7vZZhd9moF81g = __coverage__['build/datasource-cache/datasource-cache.js'];
__cov_AV4LTKOxS7vZZhd9moF81g.s['1']++;YUI.add('datasource-cache',function(Y,NAME){__cov_AV4LTKOxS7vZZhd9moF81g.f['1']++;__cov_AV4LTKOxS7vZZhd9moF81g.s['2']++;var DataSourceCacheExtension=function(){__cov_AV4LTKOxS7vZZhd9moF81g.f['2']++;};__cov_AV4LTKOxS7vZZhd9moF81g.s['3']++;Y.mix(DataSourceCacheExtension,{NS:'cache',NAME:'dataSourceCacheExtension'});__cov_AV4LTKOxS7vZZhd9moF81g.s['4']++;DataSourceCacheExtension.prototype={initializer:function(config){__cov_AV4LTKOxS7vZZhd9moF81g.f['3']++;__cov_AV4LTKOxS7vZZhd9moF81g.s['5']++;this.doBefore('_defRequestFn',this._beforeDefRequestFn);__cov_AV4LTKOxS7vZZhd9moF81g.s['6']++;this.doBefore('_defResponseFn',this._beforeDefResponseFn);},_beforeDefRequestFn:function(e){__cov_AV4LTKOxS7vZZhd9moF81g.f['4']++;__cov_AV4LTKOxS7vZZhd9moF81g.s['7']++;var entry=(__cov_AV4LTKOxS7vZZhd9moF81g.b['1'][0]++,this.retrieve(e.request))||(__cov_AV4LTKOxS7vZZhd9moF81g.b['1'][1]++,null),payload=e.details[0];__cov_AV4LTKOxS7vZZhd9moF81g.s['8']++;if((__cov_AV4LTKOxS7vZZhd9moF81g.b['3'][0]++,entry)&&(__cov_AV4LTKOxS7vZZhd9moF81g.b['3'][1]++,entry.response)){__cov_AV4LTKOxS7vZZhd9moF81g.b['2'][0]++;__cov_AV4LTKOxS7vZZhd9moF81g.s['9']++;payload.cached=entry.cached;__cov_AV4LTKOxS7vZZhd9moF81g.s['10']++;payload.response=entry.response;__cov_AV4LTKOxS7vZZhd9moF81g.s['11']++;payload.data=entry.data;__cov_AV4LTKOxS7vZZhd9moF81g.s['12']++;this.get('host').fire('response',payload);__cov_AV4LTKOxS7vZZhd9moF81g.s['13']++;return new Y.Do.Halt('DataSourceCache extension halted _defRequestFn');}else{__cov_AV4LTKOxS7vZZhd9moF81g.b['2'][1]++;}},_beforeDefResponseFn:function(e){__cov_AV4LTKOxS7vZZhd9moF81g.f['5']++;__cov_AV4LTKOxS7vZZhd9moF81g.s['14']++;if((__cov_AV4LTKOxS7vZZhd9moF81g.b['5'][0]++,e.response)&&(__cov_AV4LTKOxS7vZZhd9moF81g.b['5'][1]++,!e.cached)){__cov_AV4LTKOxS7vZZhd9moF81g.b['4'][0]++;__cov_AV4LTKOxS7vZZhd9moF81g.s['15']++;this.add(e.request,e.response);}else{__cov_AV4LTKOxS7vZZhd9moF81g.b['4'][1]++;}}};__cov_AV4LTKOxS7vZZhd9moF81g.s['16']++;Y.namespace('Plugin').DataSourceCacheExtension=DataSourceCacheExtension;__cov_AV4LTKOxS7vZZhd9moF81g.s['17']++;function DataSourceCache(config){__cov_AV4LTKOxS7vZZhd9moF81g.f['6']++;__cov_AV4LTKOxS7vZZhd9moF81g.s['18']++;var cache=(__cov_AV4LTKOxS7vZZhd9moF81g.b['7'][0]++,config)&&(__cov_AV4LTKOxS7vZZhd9moF81g.b['7'][1]++,config.cache)?(__cov_AV4LTKOxS7vZZhd9moF81g.b['6'][0]++,config.cache):(__cov_AV4LTKOxS7vZZhd9moF81g.b['6'][1]++,Y.Cache),tmpclass=Y.Base.create('dataSourceCache',cache,[Y.Plugin.Base,Y.Plugin.DataSourceCacheExtension]),tmpinstance=new tmpclass(config);__cov_AV4LTKOxS7vZZhd9moF81g.s['19']++;tmpclass.NS='tmpClass';__cov_AV4LTKOxS7vZZhd9moF81g.s['20']++;return tmpinstance;}__cov_AV4LTKOxS7vZZhd9moF81g.s['21']++;Y.mix(DataSourceCache,{NS:'cache',NAME:'dataSourceCache'});__cov_AV4LTKOxS7vZZhd9moF81g.s['22']++;Y.namespace('Plugin').DataSourceCache=DataSourceCache;},'@VERSION@',{'requires':['datasource-local','plugin','cache-base']});
