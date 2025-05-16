// Copyright (c) 2009, Baidu Inc. All rights reserved.
// 
// Licensed under the BSD License
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http:// tangram.baidu.com/license.html
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
 /**
 * @namespace T TangramZippo
 * @name T
 * @version 1.6.0
*/

/**
 * Statementbaidu包
 * @author: allstar, erik, meizz, berg
 */
var T,
    baidu = T = baidu || {version: "1.5.0"};
baidu.guid = "$BAIDU$";
baidu.$$ = window[baidu.guid] = window[baidu.guid] || {global:{}};

/**
 * Useflash资源Cover的SomeFunctions
 * @namespace baidu.flash
 */
baidu.flash = baidu.flash || {};

/**
 * Operationdom的Methodology
 * @namespace baidu.dom 
 */
baidu.dom = baidu.dom || {};


/**
 * 从in documentAccessAssignedDOMElements
 * @name baidu.dom.g
 * @function
 * @grammar baidu.dom.g(id)
 * @param {string|HTMLElement} id Elements的id或DOMElements.
 * @shortcut g,T.G
 * @meta standard
 * @see baidu.dom.q
 *
 * @return {HTMLElement|null} Access的Elements，Find不到时Backnull,IfParameters不合法，Direct ReturnParameters.
 */
baidu.dom.g = function(id) {
    if (!id) return null;
    if ('string' == typeof id || id instanceof String) {
        return document.getElementById(id);
    } else if (id.nodeName && (id.nodeType == 1 || id.nodeType == 9)) {
        return id;
    }
    return null;
};
baidu.g = baidu.G = baidu.dom.g;


/**
 * OperationArray的Methodology
 * @namespace baidu.array
 */

baidu.array = baidu.array || {};


/**
 * ThroughArray中AllElements
 * @name baidu.array.each
 * @function
 * @grammar baidu.array.each(source, iterator[, thisObject])
 * @param {Array} source YesThrougharray
 * @param {Function} iterator 对每个ArrayElementsCall的Functions，该Functions有两个Parameters，第一个为ArrayElements，第二个为Array索引值，function (item, index)。
 * @param {Object} [thisObject] FunctionsCall时的thisPointer，IfNothing此Parameters，Default isCurrentThrougharray
 * @remark
 * eachMethodology不Support对Object的Through,对Object的ThroughUsebaidu.object.each 。
 * @shortcut each
 * @meta standard
 *             
 * @returns {Array} Througharray
 */
 
baidu.each = baidu.array.forEach = baidu.array.each = function (source, iterator, thisObject) {
    var returnValue, item, i, len = source.length;
    
    if ('function' == typeof iterator) {
        for (i = 0; i < len; i++) {
            item = source[i];
            returnValue = iterator.call(thisObject || source, item, i);
    
            if (returnValue === false) {
                break;
            }
        }
    }
    return source;
};

/**
 * 对语言层面Envelope，包括TypeDecision、模块Extension、Succession基类andObject自DefinitionsEvents的Support。
 * @namespace baidu.lang
 */
baidu.lang = baidu.lang || {};


/**
 * DecisionObjectiveParametersIs itfunction或FunctionExample
 * @name baidu.lang.isFunction
 * @function
 * @grammar baidu.lang.isFunction(source)
 * @param {Any} source ObjectiveParameters
 * @version 1.2
 * @see baidu.lang.isString,baidu.lang.isObject,baidu.lang.isNumber,baidu.lang.isArray,baidu.lang.isElement,baidu.lang.isBoolean,baidu.lang.isDate
 * @meta standard
 * @returns {boolean} TypeDecisionResult
 */
baidu.lang.isFunction = function (source) {
    return '[object Function]' == Object.prototype.toString.call(source);
};

/**
 * DecisionObjectiveParametersWhether or notstringType或StringObject
 * @name baidu.lang.isString
 * @function
 * @grammar baidu.lang.isString(source)
 * @param {Any} source ObjectiveParameters
 * @shortcut isString
 * @meta standard
 * @see baidu.lang.isObject,baidu.lang.isNumber,baidu.lang.isArray,baidu.lang.isElement,baidu.lang.isBoolean,baidu.lang.isDate
 *             
 * @returns {boolean} TypeDecisionResult
 */
baidu.lang.isString = function (source) {
    return '[object String]' == Object.prototype.toString.call(source);
};
baidu.isString = baidu.lang.isString;


/**
 * DecisionBrowserType和特性的Properties
 * @namespace baidu.browser
 */
baidu.browser = baidu.browser || {};


/**
 * DecisionIs itoperaBrowser
 * @property opera operaVersion号
 * @grammar baidu.browser.opera
 * @meta standard
 * @see baidu.browser.ie,baidu.browser.firefox,baidu.browser.safari,baidu.browser.chrome
 * @returns {Number} operaVersion号
 */

/**
 * opera 从10StartNope用opera后面的Character串ConductVersion的Decision
 * 在Browser identification最后AddVersion + 数字ConductVersionIdentification
 * opera后面的数字Hold在9.80No change
 */
baidu.browser.opera = /opera(\/| )(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i.test(navigator.userAgent) ?  + ( RegExp["\x246"] || RegExp["\x242"] ) : undefined;


/**
 * 在ObjectiveElements的AssignLocationInsertHTMLCode
 * @name baidu.dom.insertHTML
 * @function
 * @grammar baidu.dom.insertHTML(element, position, html)
 * @param {HTMLElement|string} element ObjectiveElements或ObjectiveElements的id
 * @param {string} position InserthtmlLocationInformation，取Value asbeforeBegin,afterBegin,beforeEnd,afterEnd
 * @param {string} html 要Insert的html
 * @remark
 * 
 * YeahpositionParameters，Case insensitive<br>
 * Parameters的意思：beforeBegin&lt;span&gt;afterBegin   this is span! beforeEnd&lt;/span&gt; afterEnd <br />
 * Besides..，IfUse本FunctionsInsert带有scriptLabel的HTMLCharacter串，scriptLabelCorrespond的Script将不会被Implementation。
 * 
 * @shortcut insertHTML
 * @meta standard
 *             
 * @returns {HTMLElement} ObjectiveElements
 */
baidu.dom.insertHTML = function (element, position, html) {
    element = baidu.dom.g(element);
    var range,begin;
    if (element.insertAdjacentHTML && !baidu.browser.opera) {
        element.insertAdjacentHTML(position, html);
    } else {
        range = element.ownerDocument.createRange();
        position = position.toUpperCase();
        if (position == 'AFTERBEGIN' || position == 'BEFOREEND') {
            range.selectNodeContents(element);
            range.collapse(position == 'AFTERBEGIN');
        } else {
            begin = position == 'BEFOREBEGIN';
            range[begin ? 'setStartBefore' : 'setEndAfter'](element);
            range.collapse(begin);
        }
        range.insertNode(range.createContextualFragment(html));
    }
    return element;
};

baidu.insertHTML = baidu.dom.insertHTML;

/**
 * OperationflashobjectMethodology，包括CreateflashObject、AccessflashObjectandDecisionflashPlugin的Version号
 * @namespace baidu.swf
 */
baidu.swf = baidu.swf || {};


/**
 * BrowserSupport的flashPluginVersion
 * @property version BrowserSupport的flashPluginVersion
 * @grammar baidu.swf.version
 * @return {String} Version号
 * @meta standard
 */
baidu.swf.version = (function () {
    var n = navigator;
    if (n.plugins && n.mimeTypes.length) {
        var plugin = n.plugins["Shockwave Flash"];
        if (plugin && plugin.description) {
            return plugin.description
                    .replace(/([a-zA-Z]|\s)+/, "")
                    .replace(/(\s)+r/, ".") + ".0";
        }
    } else if (window.ActiveXObject && !window.opera) {
        for (var i = 12; i >= 2; i--) {
            try {
                var c = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.' + i);
                if (c) {
                    var version = c.GetVariable("$version");
                    return version.replace(/WIN/g,'').replace(/,/g,'.');
                }
            } catch(e) {}
        }
    }
})();

/**
 * OperationCharacter串的Methodology
 * @namespace baidu.string
 */
baidu.string = baidu.string || {};


/**
 * 对ObjectiveCharacter串ConducthtmlEncoded
 * @name baidu.string.encodeHTML
 * @function
 * @grammar baidu.string.encodeHTML(source)
 * @param {string} source ObjectiveCharacter串
 * @remark
 * EncodedCharacter有5个：&<>"'
 * @shortcut encodeHTML
 * @meta standard
 * @see baidu.string.decodeHTML
 *             
 * @returns {string} htmlEncodedAfterCharacter串
 */
baidu.string.encodeHTML = function (source) {
    return String(source)
                .replace(/&/g,'&amp;')
                .replace(/</g,'&lt;')
                .replace(/>/g,'&gt;')
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#39;");
};

baidu.encodeHTML = baidu.string.encodeHTML;

/**
 * CreateflashobjecthtmlCharacter串
 * @name baidu.swf.createHTML
 * @function
 * @grammar baidu.swf.createHTML(options)
 * 
 * @param {Object} 	options 					Createflash的OptionsParameters
 * @param {string} 	options.id 					要Create的flash的Identification
 * @param {string} 	options.url 				flashDocumentation的url
 * @param {String} 	options.errorMessage 		Not installedflash player或flash playerVersion号过低时的Hint
 * @param {string} 	options.ver 				最低Yes的flash playerVersion号
 * @param {string} 	options.width 				flash的Width
 * @param {string} 	options.height 				flash的Height
 * @param {string} 	options.align 				flash的AlignmentModalities，Allow值：middle/left/right/top/bottom
 * @param {string} 	options.base 				SettingsFor解析swfDocumentationMediumAll相对Path语句的Basic目录或URL
 * @param {string} 	options.bgcolor 			swfDocumentation的Background Colour
 * @param {string} 	options.salign 				Settings缩放的swfDocumentation在由width和heightSettingsDefinitions的区域内Location。Allow值：l/r/t/b/tl/tr/bl/br
 * @param {boolean} options.menu 				Whether or notShowRightMenu，Allow值：true/false
 * @param {boolean} options.loop 				播Put最后一帧时Whether or not重新播放，Allow值： true/false
 * @param {boolean} options.play 				flashWhether or not在Browser加载时就Start播放。Allow值：true/false
 * @param {string} 	options.quality 			SettingsflashPaint quality played，Allow值：low/medium/high/autolow/autohigh/best
 * @param {string} 	options.scale 				SettingsflashContents如何缩放来适应SettingsThe width height。Allow值：showall/noborder/exactfit
 * @param {string} 	options.wmode 				Settingsflash的ShowMode。Allow值：window/opaque/transparent
 * @param {string} 	options.allowscriptaccess 	Settingsflash与Page的通信权限。Allow值：always/never/sameDomain
 * @param {string} 	options.allownetworking 	SettingsswfDocumentation中AllowUse的NetworkAPI。Allow值：all/internal/none
 * @param {boolean} options.allowfullscreen 	Whether or notAllowflashFullscreen。Allow值：true/false
 * @param {boolean} options.seamlesstabbing 	AllowSettingsImplementation无缝跳格，从而Use户能跳出flashApply程序。该ParametersOnly安装Flash7及更高Version的Windows中Use。Allow值：true/false
 * @param {boolean} options.devicefont 			Settings静态TextObjectIs it by设备Fonts呈现。Allow值：true/false
 * @param {boolean} options.swliveconnect 		First Loadflash时BrowserWhether or not应启动Java。Allow值：true/false
 * @param {Object} 	options.vars 				To pass it toflash的Parameters，SupportJSON或stringType。
 * 
 * @see baidu.swf.create
 * @meta standard
 * @returns {string} flashobjecthtmlCharacter串
 */
baidu.swf.createHTML = function (options) {
    options = options || {};
    var version = baidu.swf.version, 
        needVersion = options['ver'] || '6.0.0', 
        vUnit1, vUnit2, i, k, len, item, tmpOpt = {},
        encodeHTML = baidu.string.encodeHTML;
    for (k in options) {
        tmpOpt[k] = options[k];
    }
    options = tmpOpt;
    if (version) {
        version = version.split('.');
        needVersion = needVersion.split('.');
        for (i = 0; i < 3; i++) {
            vUnit1 = parseInt(version[i], 10);
            vUnit2 = parseInt(needVersion[i], 10);
            if (vUnit2 < vUnit1) {
                break;
            } else if (vUnit2 > vUnit1) {
                return '';
            }
        }
    } else {
        return '';
    }
    
    var vars = options['vars'],
        objProperties = ['classid', 'codebase', 'id', 'width', 'height', 'align'];
    options['align'] = options['align'] || 'middle';
    options['classid'] = 'clsid:d27cdb6e-ae6d-11cf-96b8-444553540000';
    options['codebase'] = 'http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0';
    options['movie'] = options['url'] || '';
    delete options['vars'];
    delete options['url'];
    if ('string' == typeof vars) {
        options['flashvars'] = vars;
    } else {
        var fvars = [];
        for (k in vars) {
            item = vars[k];
            fvars.push(k + "=" + encodeURIComponent(item));
        }
        options['flashvars'] = fvars.join('&');
    }
    var str = ['<object '];
    for (i = 0, len = objProperties.length; i < len; i++) {
        item = objProperties[i];
        str.push(' ', item, '="', encodeHTML(options[item]), '"');
    }
    str.push('>');
    var params = {
        'wmode'             : 1,
        'scale'             : 1,
        'quality'           : 1,
        'play'              : 1,
        'loop'              : 1,
        'menu'              : 1,
        'salign'            : 1,
        'bgcolor'           : 1,
        'base'              : 1,
        'allowscriptaccess' : 1,
        'allownetworking'   : 1,
        'allowfullscreen'   : 1,
        'seamlesstabbing'   : 1,
        'devicefont'        : 1,
        'swliveconnect'     : 1,
        'flashvars'         : 1,
        'movie'             : 1
    };
    
    for (k in options) {
        item = options[k];
        k = k.toLowerCase();
        if (params[k] && (item || item === false || item === 0)) {
            str.push('<param name="' + k + '" value="' + encodeHTML(item) + '" />');
        }
    }
    options['src']  = options['movie'];
    options['name'] = options['id'];
    delete options['id'];
    delete options['movie'];
    delete options['classid'];
    delete options['codebase'];
    options['type'] = 'application/x-shockwave-flash';
    options['pluginspage'] = 'http://www.macromedia.com/go/getflashplayer';
    str.push('<embed');
    var salign;
    for (k in options) {
        item = options[k];
        if (item || item === false || item === 0) {
            if ((new RegExp("^salign\x24", "i")).test(k)) {
                salign = item;
                continue;
            }
            
            str.push(' ', k, '="', encodeHTML(item), '"');
        }
    }
    
    if (salign) {
        str.push(' salign="', encodeHTML(salign), '"');
    }
    str.push('></embed></object>');
    
    return str.join('');
};


/**
 * 在Page中Create一个flashObject
 * @name baidu.swf.create
 * @function
 * @grammar baidu.swf.create(options[, container])
 * 
 * @param {Object} 	options 					Createflash的OptionsParameters
 * @param {string} 	options.id 					要Create的flash的Identification
 * @param {string} 	options.url 				flashDocumentation的url
 * @param {String} 	options.errorMessage 		Not installedflash player或flash playerVersion号过低时的Hint
 * @param {string} 	options.ver 				最低Yes的flash playerVersion号
 * @param {string} 	options.width 				flash的Width
 * @param {string} 	options.height 				flash的Height
 * @param {string} 	options.align 				flash的AlignmentModalities，Allow值：middle/left/right/top/bottom
 * @param {string} 	options.base 				SettingsFor解析swfDocumentationMediumAll相对Path语句的Basic目录或URL
 * @param {string} 	options.bgcolor 			swfDocumentation的Background Colour
 * @param {string} 	options.salign 				Settings缩放的swfDocumentation在由width和heightSettingsDefinitions的区域内Location。Allow值：l/r/t/b/tl/tr/bl/br
 * @param {boolean} options.menu 				Whether or notShowRightMenu，Allow值：true/false
 * @param {boolean} options.loop 				播Put最后一帧时Whether or not重新播放，Allow值： true/false
 * @param {boolean} options.play 				flashWhether or not在Browser加载时就Start播放。Allow值：true/false
 * @param {string} 	options.quality 			SettingsflashPaint quality played，Allow值：low/medium/high/autolow/autohigh/best
 * @param {string} 	options.scale 				SettingsflashContents如何缩放来适应SettingsThe width height。Allow值：showall/noborder/exactfit
 * @param {string} 	options.wmode 				Settingsflash的ShowMode。Allow值：window/opaque/transparent
 * @param {string} 	options.allowscriptaccess 	Settingsflash与Page的通信权限。Allow值：always/never/sameDomain
 * @param {string} 	options.allownetworking 	SettingsswfDocumentation中AllowUse的NetworkAPI。Allow值：all/internal/none
 * @param {boolean} options.allowfullscreen 	Whether or notAllowflashFullscreen。Allow值：true/false
 * @param {boolean} options.seamlesstabbing 	AllowSettingsImplementation无缝跳格，从而Use户能跳出flashApply程序。该ParametersOnly安装Flash7及更高Version的Windows中Use。Allow值：true/false
 * @param {boolean} options.devicefont 			Settings静态TextObjectIs it by设备Fonts呈现。Allow值：true/false
 * @param {boolean} options.swliveconnect 		First Loadflash时BrowserWhether or not应启动Java。Allow值：true/false
 * @param {Object} 	options.vars 				To pass it toflash的Parameters，SupportJSON或stringType。
 * 
 * @param {HTMLElement|string} [container] 		flashobject父ContainersElements，不传递该Parameters时在CurrentCodeLocationCreateflashObject。
 * @meta standard
 * @see baidu.swf.createHTML,baidu.swf.getMovie
 */
baidu.swf.create = function (options, target) {
    options = options || {};
    var html = baidu.swf.createHTML(options) 
               || options['errorMessage'] 
               || '';
                
    if (target && 'string' == typeof target) {
        target = document.getElementById(target);
    }
    baidu.dom.insertHTML( target || document.body ,'beforeEnd',html );
};
/**
 * DecisionIs itieBrowser
 * @name baidu.browser.ie
 * @field
 * @grammar baidu.browser.ie
 * @returns {Number} IEVersion号
 */
baidu.browser.ie = baidu.ie = /msie (\d+\.\d+)/i.test(navigator.userAgent) ? (document.documentMode || + RegExp['\x241']) : undefined;

/**
 * 移除ArrayMedium项
 * @name baidu.array.remove
 * @function
 * @grammar baidu.array.remove(source, match)
 * @param {Array} source Yes移除项array
 * @param {Any} match Items to remove
 * @meta standard
 * @see baidu.array.removeAt
 *             
 * @returns {Array} 移除AfterArray
 */
baidu.array.remove = function (source, match) {
    var len = source.length;
        
    while (len--) {
        if (len in source && source[len] === match) {
            source.splice(len, 1);
        }
    }
    return source;
};

/**
 * DecisionObjectiveParametersWhether or notArrayObject
 * @name baidu.lang.isArray
 * @function
 * @grammar baidu.lang.isArray(source)
 * @param {Any} source ObjectiveParameters
 * @meta standard
 * @see baidu.lang.isString,baidu.lang.isObject,baidu.lang.isNumber,baidu.lang.isElement,baidu.lang.isBoolean,baidu.lang.isDate
 *             
 * @returns {boolean} TypeDecisionResult
 */
baidu.lang.isArray = function (source) {
    return '[object Array]' == Object.prototype.toString.call(source);
};



/**
 * 将一个VariablesConvert成array
 * @name baidu.lang.toArray
 * @function
 * @grammar baidu.lang.toArray(source)
 * @param {mix} source YesConvert成array的Variables
 * @version 1.3
 * @meta standard
 * @returns {array} ConvertAfterarray
 */
baidu.lang.toArray = function (source) {
    if (source === null || source === undefined)
        return [];
    if (baidu.lang.isArray(source))
        return source;
    if (typeof source.length !== 'number' || typeof source === 'string' || baidu.lang.isFunction(source)) {
        return [source];
    }
    if (source.item) {
        var l = source.length, array = new Array(l);
        while (l--)
            array[l] = source[l];
        return array;
    }

    return [].slice.call(source);
};

/**
 * AccessflashobjectExample
 * @name baidu.swf.getMovie
 * @function
 * @grammar baidu.swf.getMovie(name)
 * @param {string} name flashobjectName
 * @see baidu.swf.create
 * @meta standard
 * @returns {HTMLElement} flashobjectExample
 */
baidu.swf.getMovie = function (name) {
	var movie = document[name], ret;
    return baidu.browser.ie == 9 ?
    	movie && movie.length ? 
    		(ret = baidu.array.remove(baidu.lang.toArray(movie),function(item){
    			return item.tagName.toLowerCase() != "embed";
    		})).length == 1 ? ret[0] : ret
    		: movie
    	: movie || window[name];
};


baidu.flash._Base = (function(){
   
    var prefix = 'bd__flash__';

    /**
     * Create一个随机的Character串
     * @private
     * @return {String}
     */
    function _createString(){
        return  prefix + Math.floor(Math.random() * 2147483648).toString(36);
    };
   
    /**
     * InspectionflashStatus
     * @private
     * @param {Object} target flashObject
     * @return {Boolean}
     */
    function _checkReady(target){
        if(typeof target !== 'undefined' && typeof target.flashInit !== 'undefined' && target.flashInit()){
            return true;
        }else{
            return false;
        }
    };

    /**
     * CallBeforeConduct压栈的Functions
     * @private
     * @param {Array} callQueue Call队列
     * @param {Object} target flashObject
     * @return {Null}
     */
    function _callFn(callQueue, target){
        var result = null;
        
        callQueue = callQueue.reverse();
        baidu.each(callQueue, function(item){
            result = target.call(item.fnName, item.params);
            item.callBack(result);
        });
    };

    /**
     * 为Import的匿名FunctionsCreateFunctions名
     * @private
     * @param {String|Function} fun Import的匿名FunctionsOr..Functions名
     * @return {String}
     */
    function _createFunName(fun){
        var name = '';

        if(baidu.lang.isFunction(fun)){
            name = _createString();
            window[name] = function(){
                fun.apply(window, arguments);
            };

            return name;
        }else if(baidu.lang.isString){
            return fun;
        }
    };

    /**
     * Drawflash
     * @private
     * @param {Object} options CreateParameters
     * @return {Object} 
     */
    function _render(options){
        if(!options.id){
            options.id = _createString();
        }
        
        var container = options.container || '';
        delete(options.container);
        
        baidu.swf.create(options, container);
        
        return baidu.swf.getMovie(options.id);
    };

    return function(options, callBack){
        var me = this,
            autoRender = (typeof options.autoRender !== 'undefined' ? options.autoRender : true),
            createOptions = options.createOptions || {},
            target = null,
            isReady = false,
            callQueue = [],
            timeHandle = null,
            callBack = callBack || [];

        /**
         * 将flashDocumentationDraw到Page上
         * @public
         * @return {Null}
         */
        me.render = function(){
            target = _render(createOptions);
            
            if(callBack.length > 0){
                baidu.each(callBack, function(funName, index){
                    callBack[index] = _createFunName(options[funName] || new Function());
                });    
            }
            me.call('setJSFuncName', [callBack]);
        };

        /**
         * BackflashStatus
         * @return {Boolean}
         */
        me.isReady = function(){
            return isReady;
        };

        /**
         * CallflashInterface的统一入口
         * @param {String} fnName Call的Functions名
         * @param {Array} params Import的Parameters组成array,若不许要Parameters，需Import空Array
         * @param {Function} [callBack] 异步Call后将Back值作为Parameters的CallRevert function，如无Back值，Yeah不Import此Parameters
         * @return {Null}
        */
        me.call = function(fnName, params, callBack){
            if(!fnName) return null;
            callBack = callBack || new Function();

            var result = null;
    
            if(isReady){
                result = target.call(fnName, params);
                callBack(result);
            }else{
                callQueue.push({
                    fnName: fnName,
                    params: params,
                    callBack: callBack
                });
    
                (!timeHandle) && (timeHandle = setInterval(_check, 200));
            }
        };
    
        /**
         * 为Import的匿名FunctionsCreateFunctions名
         * @public
         * @param {String|Function} fun Import的匿名FunctionsOr..Functions名
         * @return {String}
         */
        me.createFunName = function(fun){
            return _createFunName(fun);    
        };

        /**
         * InspectionflashWhether or notready， 并Call
         * @private
         * @return {Null}
         */
        function _check(){
            if(_checkReady(target)){
                clearInterval(timeHandle);
                timeHandle = null;
                _call();

                isReady = true;
            }               
        };

        /**
         * CallBeforeConduct压栈的Functions
         * @private
         * @return {Null}
         */
        function _call(){
            _callFn(callQueue, target);
            callQueue = [];
        }

        autoRender && me.render(); 
    };
})();



/**
 * Createflash based imageUploader
 * @class
 * @grammar baidu.flash.imageUploader(options)
 * @param {Object} createOptions Createflash时Yes的Parameters，Please refer tobaidu.swf.createDocument
 * @config {Object} vars CreateimageUploader时所Yes的Parameters
 * @config {Number} vars.gridWidth 每一个PreviewPicture所占的Width，Should beflashThe full division of the plume
 * @config {Number} vars.gridHeight 每一个PreviewPicture所占的Height，Should beflashHigh division
 * @config {Number} vars.picWidth 单张PreviewPicture的Width
 * @config {Number} vars.picHeight 单张PreviewPicture的Height
 * @config {String} vars.uploadDataFieldName POSTRequest中PictureData的key,Default value'picdata'
 * @config {String} vars.picDescFieldName POSTRequest中PictureDescription的key,Default value'picDesc'
 * @config {Number} vars.maxSize Documentation的最大体积,Units'MB'
 * @config {Number} vars.compressSize Upload前IfPicture体积Over该值，It\'ll compress first
 * @config {Number} vars.maxNum:32 最大Upload多少个Documentation
 * @config {Number} vars.compressLength 能Accept的最大边长，Over该值会等比压缩
 * @config {String} vars.url Upload的urlAddress
 * @config {Number} vars.mode mode == 0时，是Use滚动条，mode == 1时，Pullflash, Default value为0
 * @see baidu.swf.createHTML
 * @param {String} backgroundUrl BackgroundPicturePath
 * @param {String} listBacgroundkUrl 布局ControlsBackground
 * @param {String} buttonUrl buttonPicture不Background
 * @param {String|Function} selectFileCallback Select File的Rewind
 * @param {String|Function} exceedFileCallbackDocumentation超出限制的最大体积时的Rewind
 * @param {String|Function} deleteFileCallback DeleteDocumentation的Rewind
 * @param {String|Function} startUploadCallback StartUpload某个Documentation时的Rewind
 * @param {String|Function} uploadCompleteCallback 某个DocumentationUpload完成的Rewind
 * @param {String|Function} uploadErrorCallback 某个DocumentationUploadFailed的Rewind
 * @param {String|Function} allCompleteCallback AllUpload完成时的Rewind
 * @param {String|Function} changeFlashHeight ChangeFlash的Height，mode==1When才有用
 */ 
baidu.flash.imageUploader = baidu.flash.imageUploader || function(options){
   
    var me = this,
        options = options || {},
        _flash = new baidu.flash._Base(options, [
            'selectFileCallback', 
            'exceedFileCallback', 
            'deleteFileCallback', 
            'startUploadCallback',
            'uploadCompleteCallback',
            'uploadErrorCallback',
            'allCompleteCallback',
            'changeFlashHeight'
        ]);
    /**
     * Start或回复UploadPicture
     * @public
     * @return {Null}
     */
    me.upload = function(){
        _flash.call('upload');
    };

    /**
     * 暂停UploadPicture
     * @public
     * @return {Null}
     */
    me.pause = function(){
        _flash.call('pause');
    };
    me.addCustomizedParams = function(index,obj){
        _flash.call('addCustomizedParams',[index,obj]);
    }
};

/**
 * Operation原生objectMethodology
 * @namespace baidu.object
 */
baidu.object = baidu.object || {};


/**
 * 将源objectAllProperties拷贝到ObjectiveObject
 * @author erik
 * @name baidu.object.extend
 * @function
 * @grammar baidu.object.extend(target, source)
 * @param {Object} target ObjectiveObject
 * @param {Object} source 源Object
 * @see baidu.array.merge
 * @remark
 * 
1.ObjectiveObject，与源ObjectkeySame的成员Will被覆盖。<br>
2.源objectprototypeMembers don\'t copy。
		
 * @shortcut extend
 * @meta standard
 *             
 * @returns {Object} ObjectiveObject
 */
baidu.extend =
baidu.object.extend = function (target, source) {
    for (var p in source) {
        if (source.hasOwnProperty(p)) {
            target[p] = source[p];
        }
    }
    
    return target;
};





/**
 * Createflash based fileUploader
 * @class
 * @grammar baidu.flash.fileUploader(options)
 * @param {Object} options
 * @config {Object} createOptions Createflash时Yes的Parameters，Please refer tobaidu.swf.createDocument
 * @config {String} createOptions.width
 * @config {String} createOptions.height
 * @config {Number} maxNum 最大OptionalDocumentation数
 * @config {Function|String} selectFile
 * @config {Function|String} exceedMaxSize
 * @config {Function|String} deleteFile
 * @config {Function|String} uploadStart
 * @config {Function|String} uploadComplete
 * @config {Function|String} uploadError
 * @config {Function|String} uploadProgress
 */
baidu.flash.fileUploader = baidu.flash.fileUploader || function(options){
    var me = this,
        options = options || {};
    
    options.createOptions = baidu.extend({
        wmod: 'transparent'
    },options.createOptions || {});
    
    var _flash = new baidu.flash._Base(options, [
        'selectFile',
        'exceedMaxSize',
        'deleteFile',
        'uploadStart',
        'uploadComplete',
        'uploadError', 
        'uploadProgress'
    ]);

    _flash.call('setMaxNum', options.maxNum ? [options.maxNum] : [1]);

    /**
     * Settings当MouseMove到flashUp，Whether or not变成手型
     * @public
     * @param {Boolean} isCursor
     * @return {Null}
     */
    me.setHandCursor = function(isCursor){
        _flash.call('setHandCursor', [isCursor || false]);
    };

    /**
     * SettingsMouse相应Functions名
     * @param {String|Function} fun
     */
    me.setMSFunName = function(fun){
        _flash.call('setMSFunName',[_flash.createFunName(fun)]);
    }; 

    /**
     * ImplementationUploadOperation
     * @param {String} url Upload的url
     * @param {String} fieldName Upload的Form字段名
     * @param {Object} postData 键Value pair，Upload的POSTData
     * @param {Number|Array|null|-1} [index]Upload的Documentation序列
     *                            Int值Upload该Documentation
     *                            Array一次串行Upload该序列Documentation
     *                            -1/nullUploadAllDocumentation
     * @return {Null}
     */
    me.upload = function(url, fieldName, postData, index){

        if(typeof url !== 'string' || typeof fieldName !== 'string') return null;
        if(typeof index === 'undefined') index = -1;

        _flash.call('upload', [url, fieldName, postData, index]);
    };

    /**
     * CancelUploadOperation
     * @public
     * @param {Number|-1} index
     */
    me.cancel = function(index){
        if(typeof index === 'undefined') index = -1;
        _flash.call('cancel', [index]);
    };

    /**
     * DeleteDocumentation
     * @public
     * @param {Number|Array} [index] 要Delete的index，不传则AllDelete
     * @param {Function} callBack
     * */
    me.deleteFile = function(index, callBack){

        var callBackAll = function(list){
                callBack && callBack(list);
            };

        if(typeof index === 'undefined'){
            _flash.call('deleteFilesAll', [], callBackAll);
            return;
        };
        
        if(typeof index === 'Number') index = [index];
        index.sort(function(a,b){
            return b-a;
        });
        baidu.each(index, function(item){
            _flash.call('deleteFileBy', item, callBackAll);
        });
    };

    /**
     * AddDocumentationType，SupportmacType
     * @public
     * @param {Object|Array[Object]} type {description:String, extention:String}
     * @return {Null};
     */
    me.addFileType = function(type){
        var type = type || [[]];
        
        if(type instanceof Array) type = [type];
        else type = [[type]];
        _flash.call('addFileTypes', type);
    };
    
    /**
     * SettingsDocumentationType，SupportmacType
     * @public
     * @param {Object|Array[Object]} type {description:String, extention:String}
     * @return {Null};
     */
    me.setFileType = function(type){
        var type = type || [[]];
        
        if(type instanceof Array) type = [type];
        else type = [[type]];
        _flash.call('setFileTypes', type);
    };

    /**
     * SettingsOptionalDocumentation的数量限制
     * @public
     * @param {Number} num
     * @return {Null}
     */
    me.setMaxNum = function(num){
        _flash.call('setMaxNum', [num]);
    };

    /**
     * SettingsOptionalDocumentation大小限制，It\'s a signM为Units
     * @public
     * @param {Number} num,0Unlimited
     * @return {Null}
     */
    me.setMaxSize = function(num){
        _flash.call('setMaxSize', [num]);
    };

    /**
     * @public
     */
    me.getFileAll = function(callBack){
        _flash.call('getFileAll', [], callBack);
    };

    /**
     * @public
     * @param {Number} index
     * @param {Function} [callBack]
     */
    me.getFileByIndex = function(index, callBack){
        _flash.call('getFileByIndex', [], callBack);
    };

    /**
     * @public
     * @param {Number} index
     * @param {function} [callBack]
     */
    me.getStatusByIndex = function(index, callBack){
        _flash.call('getStatusByIndex', [], callBack);
    };
};

/**
 * Use动态scriptLabelRequestServices器资源，包括由Services器端的Rewind和Browser端的Rewind
 * @namespace baidu.sio
 */
baidu.sio = baidu.sio || {};

/**
 * 
 * @param {HTMLElement} src scriptNodes
 * @param {String} url scriptNodes的Address
 * @param {String} [charset] Encoded
 */
baidu.sio._createScriptTag = function(scr, url, charset){
    scr.setAttribute('type', 'text/javascript');
    charset && scr.setAttribute('charset', charset);
    scr.setAttribute('src', url);
    document.getElementsByTagName('head')[0].appendChild(scr);
};

/**
 * Deletescript的Properties，再DeletescriptLabel，以SolveRehabilitation内存泄漏Issues
 * 
 * @param {HTMLElement} src scriptNodes
 */
baidu.sio._removeScriptTag = function(scr){
    if (scr.clearAttributes) {
        scr.clearAttributes();
    } else {
        for (var attr in scr) {
            if (scr.hasOwnProperty(attr)) {
                delete scr[attr];
            }
        }
    }
    if(scr && scr.parentNode){
        scr.parentNode.removeChild(scr);
    }
    scr = null;
};


/**
 * PassscriptLabel加载Data，加载完成由Browser端TriggerRewind
 * @name baidu.sio.callByBrowser
 * @function
 * @grammar baidu.sio.callByBrowser(url, opt_callback, opt_options)
 * @param {string} url 加载Data的url
 * @param {Function|string} opt_callback Data加载End时Call的Functions或Functions名
 * @param {Object} opt_options Other可Options
 * @config {String} [charset] script的Character集
 * @config {Integer} [timeOut] 超时Time，OverHereTime将不再响应本Request，并TriggeronfailureFunctions
 * @config {Function} [onfailure] timeOutEffective after setting，到达超时Time时Trigger本Functions
 * @remark
 * 1、与callByServerDifferent，callbackParameters只SupportFunctionType，不Supportstring。
 * 2、IfRequest了一个does not exist的Page，callbackFunctions在IE/opera下也会被Call，And so..Use者Yes在onsuccessFunctions中DecisionDataWhether or not正确加载。
 * @meta standard
 * @see baidu.sio.callByServer
 */
baidu.sio.callByBrowser = function (url, opt_callback, opt_options) {
    var scr = document.createElement("SCRIPT"),
        scriptLoaded = 0,
        options = opt_options || {},
        charset = options['charset'],
        callback = opt_callback || function(){},
        timeOut = options['timeOut'] || 0,
        timer;
    scr.onload = scr.onreadystatechange = function () {
        if (scriptLoaded) {
            return;
        }
        
        var readyState = scr.readyState;
        if ('undefined' == typeof readyState
            || readyState == "loaded"
            || readyState == "complete") {
            scriptLoaded = 1;
            try {
                callback();
                clearTimeout(timer);
            } finally {
                scr.onload = scr.onreadystatechange = null;
                baidu.sio._removeScriptTag(scr);
            }
        }
    };

    if( timeOut ){
        timer = setTimeout(function(){
            scr.onload = scr.onreadystatechange = null;
            baidu.sio._removeScriptTag(scr);
            options.onfailure && options.onfailure();
        }, timeOut);
    }
    
    baidu.sio._createScriptTag(scr, url, charset);
};

/**
 * PassscriptLabel加载Data，加载完成由Services器端TriggerRewind
 * @name baidu.sio.callByServer
 * @function
 * @grammar baidu.sio.callByServer(url, callback[, opt_options])
 * @param {string} url 加载Data的url.
 * @param {Function|string} callback Services器端Call的Functions或Functions名。IfNothingAssign本Parameters，YesURLCenter Searchoptions['queryField']Ascallback的Methodology名.
 * @param {Object} opt_options 加载Data时的Options.
 * @config {string} [charset] script的Character集
 * @config {string} [queryField] Services器端callbackRequest字段名，Default ascallback
 * @config {Integer} [timeOut] 超时Time(Units：ms)，OverHereTime将不再响应本Request，并TriggeronfailureFunctions
 * @config {Function} [onfailure] timeOutEffective after setting，到达超时Time时Trigger本Functions
 * @remark
 * Ifurl中已经Organisationkey为“options['queryField']”的query项，将It will be replaced withcallback中Parameters传递或AutoGenerate的Functions名。
 * @meta standard
 * @see baidu.sio.callByBrowser
 */
baidu.sio.callByServer = /**@function*/function(url, callback, opt_options) {
    var scr = document.createElement('SCRIPT'),
        prefix = 'bd__cbs__',
        callbackName,
        callbackImpl,
        options = opt_options || {},
        charset = options['charset'],
        queryField = options['queryField'] || 'callback',
        timeOut = options['timeOut'] || 0,
        timer,
        reg = new RegExp('(\\?|&)' + queryField + '=([^&]*)'),
        matches;

    if (baidu.lang.isFunction(callback)) {
        callbackName = prefix + Math.floor(Math.random() * 2147483648).toString(36);
        window[callbackName] = getCallBack(0);
    } else if(baidu.lang.isString(callback)){
        callbackName = callback;
    } else {
        if (matches = reg.exec(url)) {
            callbackName = matches[2];
        }
    }

    if( timeOut ){
        timer = setTimeout(getCallBack(1), timeOut);
    }
    url = url.replace(reg, '\x241' + queryField + '=' + callbackName);
    
    if (url.search(reg) < 0) {
        url += (url.indexOf('?') < 0 ? '?' : '&') + queryField + '=' + callbackName;
    }
    baidu.sio._createScriptTag(scr, url, charset);

    /*
     * Back一个Functions，For立即（Hang onwindow上）Or..超时（Hang onsetTimeout中）时Implementation
     */
    function getCallBack(onTimeOut){
        /*global callbackName, callback, scr, options;*/
        return function(){
            try {
                if( onTimeOut ){
                    options.onfailure && options.onfailure();
                }else{
                    callback.apply(window, arguments);
                    clearTimeout(timer);
                }
                window[callbackName] = null;
                delete window[callbackName];
            } catch (exception) {
            } finally {
                baidu.sio._removeScriptTag(scr);
            }
        }
    }
};

/**
 * PassRequest一个Picture的Modalities令Services器Storage一条Log
 * @function
 * @grammar baidu.sio.log(url)
 * @param {string} url 要Send的Address.
 * @author: int08h,leeight
 */
baidu.sio.log = function(url) {
  var img = new Image(),
      key = 'tangram_sio_log_' + Math.floor(Math.random() *
            2147483648).toString(36);
  window[key] = img;

  img.onload = img.onerror = img.onabort = function() {
    img.onload = img.onerror = img.onabort = null;

    window[key] = null;
    img = null;
  };
  img.src = url;
};



/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/json.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/02
 */


/**
 * OperationjsonobjectMethodology
 * @namespace baidu.json
 */
baidu.json = baidu.json || {};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/json/parse.js
 * author: erik, berg
 * version: 1.2
 * date: 2009/11/23
 */



/**
 * 将Character串解析成jsonObject。注：不会Auto祛除Space
 * @name baidu.json.parse
 * @function
 * @grammar baidu.json.parse(data)
 * @param {string} source Yes解析的Character串
 * @remark
 * 该Methodology的Achieved与ecma-262According to the fifth editionJSON.parseDifferent，暂时只SupportImport一个Parameters。后续会ConductFunctions丰富。
 * @meta standard
 * @see baidu.json.stringify,baidu.json.decode
 *             
 * @returns {JSON} 解析ResultjsonObject
 */
baidu.json.parse = function (data) {
    //2010/12/09：Update至不Use原生parse，不TestUser输入Whether or not正确
    return (new Function("return (" + data + ")"))();
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/json/decode.js
 * author: erik, cat
 * version: 1.3.4
 * date: 2010/12/23
 */



/**
 * 将Character串解析成jsonObject，为过时Interface，In the future, they willbaidu.json.parseReplace
 * @name baidu.json.decode
 * @function
 * @grammar baidu.json.decode(source)
 * @param {string} source Yes解析的Character串
 * @meta out
 * @see baidu.json.encode,baidu.json.parse
 *             
 * @returns {JSON} 解析ResultjsonObject
 */
baidu.json.decode = baidu.json.parse;
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/json/stringify.js
 * author: erik
 * version: 1.1.0
 * date: 2010/01/11
 */



/**
 * 将jsonObject序列化
 * @name baidu.json.stringify
 * @function
 * @grammar baidu.json.stringify(value)
 * @param {JSON} value Yes序列化的jsonObject
 * @remark
 * 该Methodology的Achieved与ecma-262According to the fifth editionJSON.stringifyDifferent，暂时只SupportImport一个Parameters。后续会ConductFunctions丰富。
 * @meta standard
 * @see baidu.json.parse,baidu.json.encode
 *             
 * @returns {string} 序列化AfterCharacter串
 */
baidu.json.stringify = (function () {
    /**
     * Character串Processing时YesConversion的Character表
     * @private
     */
    var escapeMap = {
        "\b": '\\b',
        "\t": '\\t',
        "\n": '\\n',
        "\f": '\\f',
        "\r": '\\r',
        '"' : '\\"',
        "\\": '\\\\'
    };
    
    /**
     * Character串序列化
     * @private
     */
    function encodeString(source) {
        if (/["\\\x00-\x1f]/.test(source)) {
            source = source.replace(
                /["\\\x00-\x1f]/g, 
                function (match) {
                    var c = escapeMap[match];
                    if (c) {
                        return c;
                    }
                    c = match.charCodeAt();
                    return "\\u00" 
                            + Math.floor(c / 16).toString(16) 
                            + (c % 16).toString(16);
                });
        }
        return '"' + source + '"';
    }
    
    /**
     * Array序列化
     * @private
     */
    function encodeArray(source) {
        var result = ["["], 
            l = source.length,
            preComma, i, item;
            
        for (i = 0; i < l; i++) {
            item = source[i];
            
            switch (typeof item) {
            case "undefined":
            case "function":
            case "unknown":
                break;
            default:
                if(preComma) {
                    result.push(',');
                }
                result.push(baidu.json.stringify(item));
                preComma = 1;
            }
        }
        result.push("]");
        return result.join("");
    }
    
    /**
     * ProcessingDate序列化时的补零
     * @private
     */
    function pad(source) {
        return source < 10 ? '0' + source : source;
    }
    
    /**
     * Date序列化
     * @private
     */
    function encodeDate(source){
        return '"' + source.getFullYear() + "-" 
                + pad(source.getMonth() + 1) + "-" 
                + pad(source.getDate()) + "T" 
                + pad(source.getHours()) + ":" 
                + pad(source.getMinutes()) + ":" 
                + pad(source.getSeconds()) + '"';
    }
    
    return function (value) {
        switch (typeof value) {
        case 'undefined':
            return 'undefined';
            
        case 'number':
            return isFinite(value) ? String(value) : "null";
            
        case 'string':
            return encodeString(value);
            
        case 'boolean':
            return String(value);
            
        default:
            if (value === null) {
                return 'null';
            } else if (value instanceof Array) {
                return encodeArray(value);
            } else if (value instanceof Date) {
                return encodeDate(value);
            } else {
                var result = ['{'],
                    encode = baidu.json.stringify,
                    preComma,
                    item;
                    
                for (var key in value) {
                    if (Object.prototype.hasOwnProperty.call(value, key)) {
                        item = value[key];
                        switch (typeof item) {
                        case 'undefined':
                        case 'unknown':
                        case 'function':
                            break;
                        default:
                            if (preComma) {
                                result.push(',');
                            }
                            preComma = 1;
                            result.push(encode(key) + ':' + encode(item));
                        }
                    }
                }
                result.push('}');
                return result.join('');
            }
        }
    };
})();
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/json/encode.js
 * author: erik, cat
 * version: 1.3.4
 * date: 2010/12/23
 */



/**
 * 将jsonObject序列化，为过时Interface，In the future, they willbaidu.json.stringifyReplace
 * @name baidu.json.encode
 * @function
 * @grammar baidu.json.encode(value)
 * @param {JSON} value Yes序列化的jsonObject
 * @meta out
 * @see baidu.json.decode,baidu.json.stringify
 *             
 * @returns {string} 序列化AfterCharacter串
 */
baidu.json.encode = baidu.json.stringify;
