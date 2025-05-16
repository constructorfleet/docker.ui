/**
 * ueditorCompleteConfigure项
 * Yeah在这里Configure整个Edit器的特性
 */
/**************************Hint********************************
 * All被Comment的Configure项均为UEditorDefault value。
 * ModifyDefaultConfigure请首先确保已经完全明确该Parameters的真实用途。
 * 主要有两种Modify方案，一种是Cancel此处Comment，然后Modify成CorrespondParameters；另一种Yes实例化Edit器时传入CorrespondParameters。
 * 当升级Edit器时，可直接Use旧版ConfigureDocumentation替换NewConfigureDocumentation,不用担心旧版ConfigureDocumentation中因缺少新Functions所需的Parameters而导致Script报错。
 **************************Hint********************************/

(function () {

    /**
     * Edit器资源Documentation根Path。它所Organisation的含义是：以Edit器实例化Page为当前Path，PointEdit器资源Documentation（即dialog等Documentation夹）的Path。
     * 鉴于很多同学在UseEdit器When出现的种种Path问题，此处强烈Recommendations大家Use"Relative to网站根目录的相对Path"ConductConfigure。
     * "Relative to网站根目录的相对Path"也就是以斜杠Start的形如"/myProject/ueditor/"这样的Path。
     * If站点中有Multiple不在同一层级的PageYes实例化Edit器，且References了同一UEditorWhen，HereURL可能不适For每个Page的Edit器。
     * And so..，UEditorProvision了Targeted不同Page的Edit器可单独Configure的根Path，Specifically，在Yes实例化Edit器的Page最顶部写上如下CodeYeah。Sure，Yes令HereURLequalsCorrespond的Configure。
     * window.UEDITOR_HOME_URL = "/xxxx/xxxx/";
     */
    var URL = window.UEDITOR_HOME_URL || getUEBasePath();
    /**
     * Configure项主体。Attention，此处All涉及到Path的Configure别遗漏URLVariables。
     */
    window.UEDITOR_CONFIG = {

        //为Edit器实例Add一个Path，HereI can\'t被Comment
        UEDITOR_HOME_URL: URL

        // Services器统一RequestInterfacePath
        //, serverUrl: URL + "jsp/controller.jsp"
		, serverUrl: _ctx+'json/config/config_1.json'

		//Toolbar上的All的Functionsbutton和Lower Frame，Yeah在newEdit器的实例时Selection自己Yes的重新Definitions
        , toolbars: [[
            'fullscreen', 'source', '|', 'undo', 'redo', '|',
            'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
            'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
            'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
            'directionalityltr', 'directionalityrtl', 'indent', '|',
            'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
            'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
            'simpleupload', 'insertimage', 'emotion', 'scrawl', 'insertvideo', 'music', 'attachment', 'map', 'gmap', 'insertframe', 'insertcode', 'webapp', 'pagebreak', 'template', 'background', '|',
            'horizontal', 'date', 'time', 'spechars', 'snapscreen', 'wordimage', '|',
            'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
            'print', 'preview', 'searchreplace', 'drafts', 'help'
        ]]
        //当Mouse放在ToolbarUpShow的tooltipHint,留空SupportAuto多语言Configure，否则以Configure值为准
        //,labelMap:{
        //    'anchor':'', 'undo':''
        //}

        //语言Configure项,Default iszh-cn。有Yes的话也YeahUse如下这样的Modalities来Auto多语言Switch，Sure，The condition is..langDocumentation夹下存在Correspond的语言Documentation：
        //lang值也YeahPassAutoAccess (navigator.language||navigator.browserLanguage ||navigator.userLanguage).toLowerCase()
        //,lang:"zh-cn"
        //,langPath:URL +"lang/"

        //主题Configure项,Default isdefault。有Yes的话也YeahUse如下这样的Modalities来Auto多主题Switch，Sure，The condition is..themesDocumentation夹下存在Correspond的主题Documentation：
        //There are the following skins:default
        //,theme:'default'
        //,themePath:URL +"themes/"

        ,zIndex : 9999     //Edit器层级的基数,Default is900

        //TargetedgetAllHtmlMethodology，会在Correspond的headLabel中Increase该编码Settings。
        //,charset:"utf-8"

        //若实例化Edit器的Page手动Modify的domain，此处YesSettings为true
        //,customDomain:false

        //常用Configure项目
        //,isShow : true    //DefaultShowEdit器

        //,textarea:'editorValue' // 提交Form时，Services器AccessEdit器提交Contents的所用的Parameters，多实例时Yeah给ContainersnameProperties，Will..nameKey value for the given value for each instance，不用每次实例化When都SettingsHere值

        //,initialContent:'欢迎Useueditor!'    //InitializeEdit器的Contents,也YeahPasstextarea/scriptValue，The example of the Internet

        //,autoClearinitialContent:true //是否AutoClearEdit器初始Contents，Attention：IffocusPropertiesSettings为true,Here也为真，那么Edit器一上来就会Trigger导致Initialize的Contents看不到了

        //,focus:false //Initialize时，是否让Edit器Access焦点true或false

        //If自Definitions，BetterpLabel如下的行高，When you want to enter Chinese，There\'s a beat
        //,initialStyle:'p{line-height:1em}'//Edit器层级的基数,Yeah用To changeFonts等

        //,iframeCssUrl: URL + '/themes/iframe.css' //给Edit区域的iframeIntroduction一个cssDocumentation

        //indentValue
        //First Line Indent Distance,Default is2em
        //,indentValue:'2em'

        //,initialFrameWidth:1000  //InitializeEdit器宽度,Default1000
        //,initialFrameHeight:320  //InitializeEdit器高度,Default320

        //,readonly : false //Edit器InitializeEnd后,Edit区域是否是只读的，Default isfalse

        //,autoClearEmptyNode : true //getContent时，是否Delete空的inlineElementNodes（Including nesting）

        //启用AutoSave
        //,enableAutoSave: true
        //AutoSave间隔Time， Unitsms
        //,saveInterval: 500

        //,fullscreen : false //是否OpenInitialize时即全屏，DefaultClose

        //,imagePopup:true      //PictureOperation的浮层开关，Default打开

        //,autoSyncData:true //Auto同步Edit器要提交的Data
        //,emotionLocalization:false //是否OpenEmoticonsLocal化，DefaultClose。若要Open请确保emotionDocumentation夹下Organisation官网ProvidedimagesEmoticonsDocumentation夹

        //Paste只保留Label，去除LabelAllProperties
        //,retainOnlyLabelPasted: false

        //,pasteplain:false  //是否Default as纯TextPaste。false为不Use纯TextPaste，true为Use纯TextPaste
        //纯TextPasteMode的Filter规则
        //'filterTxtRules' : function(){
        //    function transP(node){
        //        node.tagName = 'p';
        //        node.setStyle();
        //    }
        //    return {
        //        //直接Delete及其字NodesContents
        //        '-' : 'script style object iframe embed input select',
        //        'p': {$:{}},
        //        'br':{$:{}},
        //        'div':{'$':{}},
        //        'li':{'$':{}},
        //        'caption':transP,
        //        'th':transP,
        //        'tr':transP,
        //        'h1':transP,'h2':transP,'h3':transP,'h4':transP,'h5':transP,'h6':transP,
        //        'td':function(node){
        //            //NothingContents的tdJust delete it
        //            var txt = !!node.innerText();
        //            if(txt){
        //                node.parentNode.insertAfter(UE.uNode.createText(' &nbsp; &nbsp;'),node);
        //            }
        //            node.parentNode.removeChild(node,node.innerText())
        //        }
        //    }
        //}()

        //,allHtmlEnabled:false //提交到后台的Data是否Organisation整个htmlCharacter串

        //insertorderedlist
        //有序列表的下拉Configure,值留空时Support多语言Auto识别，若Configure值，This value will prevail
        //,'insertorderedlist':{
        //      //自定Styles
        //        'num':'1,2,3...',
        //        'num1':'1),2),3)...',
        //        'num2':'(1),(2),(3)...',
        //        'cn':'一,二,三....',
        //        'cn1':'一),二),三)....',
        //        'cn2':'(一),(二),(三)....',
        //     //System自带
        //     'decimal' : '' ,         //'1,2,3...'
        //     'lower-alpha' : '' ,    // 'a,b,c...'
        //     'lower-roman' : '' ,    //'i,ii,iii...'
        //     'upper-alpha' : '' , lang   //'A,B,C'
        //     'upper-roman' : ''      //'I,II,III...'
        //}

        //insertunorderedlist
        //无序列表的下拉Configure，值留空时Support多语言Auto识别，若Configure值，This value will prevail
        //,insertunorderedlist : { //自定Styles
        //    'dash' :'— Break', //-Break
        //    'dot':' 。 Small circle', //System自带
        //    'circle' : '',  // '○ Small circle'
        //    'disc' : '',    // '● Small dots'
        //    'square' : ''   //'■ Small diamonds'
        //}
        //,listDefaultPaddingLeft : '30'//Default的Left缩进的基数倍
        //,listiconpath : 'http://bs.baidu.com/listicon/'//自Definitions标号的Path
        //,maxListLevel : 3 //限制YeahtabLevel, Settings-1as unlimited

        //,autoTransWordToList:false  //Banword中Paste进来的列表Auto变成列表Label

        //fontfamily
        //FontsSettings label留空Support多语言AutoSwitch，若Configure，则以Configure值为准
        //,'fontfamily':[
        //    { label:'',name:'songti',val:'Song,SimSun'},
        //    { label:'',name:'kaiti',val:'italics,italics_GB2312, SimKai'},
        //    { label:'',name:'yahei',val:'. ,Microsoft YaHei'},
        //    { label:'',name:'heiti',val:'Bold, SimHei'},
        //    { label:'',name:'lishu',val:'Book, SimLi'},
        //    { label:'',name:'andaleMono',val:'andale mono'},
        //    { label:'',name:'arial',val:'arial, helvetica,sans-serif'},
        //    { label:'',name:'arialBlack',val:'arial black,avant garde'},
        //    { label:'',name:'comicSansMs',val:'comic sans ms'},
        //    { label:'',name:'impact',val:'impact,chicago'},
        //    { label:'',name:'timesNewRoman',val:'times new roman'}
        //]

        //fontsize
        //Character
        //,'fontsize':[10, 11, 12, 14, 16, 18, 20, 24, 36]

        //paragraph
        //段落Format 值留空时Support多语言Auto识别，若Configure，则以Configure值为准
        //,'paragraph':{'p':'', 'h1':'', 'h2':'', 'h3':'', 'h4':'', 'h5':'', 'h6':''}

        //rowspacingtop
        //Part Spacing 值和Show的Name相同
        //,'rowspacingtop':['5', '10', '15', '20', '25']

        //rowspacingBottom
        //Part Spacing 值和Show的Name相同
        //,'rowspacingbottom':['5', '10', '15', '20', '25']

        //lineheight
        //Line Inner Space 值和Show的Name相同
        //,'lineheight':['1', '1.5','1.75','2', '3', '4', '5']

        //customstyle
        //自DefinitionsStyles，不Support国际化，此处Configure值Yeah最后Show值
        //block的Elements是依据Settings段落的逻辑Settings的，inline的Elements依据BIU的逻辑Settings
        //尽量UseSome常用的Label
        //ParametersAnnotations
        //tag Use的LabelName
        //label Show的Name也是用来Identification不同Type的Identification符，AttentionHere值每个要不同，
        //style AddStyles
        //每一个Object就It\'s one自DefinitionsStyles
        //,'customstyle':[
        //    {tag:'h1', name:'tc', label:'', style:'border-bottom:#ccc 2px solid;padding:0 4px 0 0;text-align:center;margin:0 0 20px 0;'},
        //    {tag:'h1', name:'tl',label:'', style:'border-bottom:#ccc 2px solid;padding:0 4px 0 0;margin:0 0 10px 0;'},
        //    {tag:'span',name:'im', label:'', style:'font-style:italic;font-weight:bold'},
        //    {tag:'span',name:'hi', label:'', style:'font-style:italic;font-weight:bold;color:rgb(51, 153, 204)'}
        //]

        //打开RightMenuFunctions
        //,enableContextMenu: true
        //RightMenu的Contents，YeahReferencesplugins/contextmenu.js里边的DefaultMenuExamples，label留空Support国际化，否则以此Configure为准
        //,contextMenu:[
        //    {
        //        label:'',       //Show的Name
        //        cmdName:'selectall',//ImplementedcommandCommand，当ClickHereRightMenu时
        //        //execOptional，Got itexec就会在Click时执行Herefunction，Priority abovecmdName
        //        exec:function () {
        //            //this是当前Edit器的实例
        //            //this.ui._dialogs['inserttableDialog'].open();
        //        }
        //    }
        //]

        //快捷Menu
        //,shortcutMenu:["fontfamily", "fontsize", "bold", "italic", "underline", "forecolor", "backcolor", "insertorderedlist", "insertunorderedlist"]

        //elementPathEnabled
        //是否启用ElementsPath，Default isShow
        //,elementPathEnabled : true

        //wordCount
        //,wordCount:true          //是否Open字数统计
        //,maximumWords:10000       //Allow的最大Character数
        //字数统计Hint，{#count}For the current number of words，{#leave}代表还Yeah输入多少Character数,留空Support多语言AutoSwitch，否则按此ConfigureShow
        //,wordCountMsg:''   //Current Inputd {#count} 个Character，您还Yeah输入{#leave} 个Character
        //超出字数限制Hint  留空Support多语言AutoSwitch，否则按此ConfigureShow
        //,wordOverFlowMsg:''    //<span style="color:red;">你输入的Character个数已经超出最大Allow值，Services器可能会RejectSave！</span>

        //tab
        //Clicktab键时Move的距离,tabSizeMultiple，tabNode什么Character做为Units
        //,tabSize:4
        //,tabNode:'&nbsp;'

        //removeFormat
        //ClearFormat时YeahDelete的Label和Properties
        //removeForamtTagsLabel
        //,removeFormatTags:'b,big,code,del,dfn,em,font,i,ins,kbd,q,samp,small,span,strike,strong,sub,sup,tt,u,var'
        //removeFormatAttributesProperties
        //,removeFormatAttributes:'class,style,lang,width,height,align,hspace,valign'

        //undo
        //Yeah最多回退的次数,Default20
        //,maxUndoCount:20
        //当输入的Character数Over该值时，Save一次现场
        //,maxInputCount:1

        //autoHeightEnabled
        // 是否Auto长高,Defaulttrue
        //,autoHeightEnabled:true

        //scaleEnabled
        //是否Yeah拉伸长高,Defaulttrue(当Open时，Auto长高失效)
        //,scaleEnabled:false
        //,minFrameWidth:800    //Edit器Drag最小宽度,Default800
        //,minFrameHeight:220  //Edit器Drag最小高度,Default220

        //autoFloatEnabled
        //是否HoldtoolbarLocation不动,Defaulttrue
        //,autoFloatEnabled:true
        //浮动时Toolbar距离Browser顶部的高度，For某些具有固定头部的Page
        //,topOffset:30
        //Edit器底部距离Toolbar高度(IfParametersGreater thanequalsEdit器高度，则Settings无效)
        //,toolbarTopOffset:400

        //SettingsRemotePicture是否抓取到LocalSave
        //,catchRemoteImageEnable: true //Settings是否抓取RemotePicture

        //pageBreakTag
        //分页Identification符,Default is_ueditor_page_break_tag_
        //,pageBreakTag:'_ueditor_page_break_tag_'

        //autotypeset
        //Auto排版Parameters
        //,autotypeset: {
        //    mergeEmptyline: true,           //Merge空行
        //    removeClass: true,              //Get rid of the redundancyclass
        //    removeEmptyline: false,         //Get rid of the empty line
        //    textAlign:"left",               //段落的排版Modalities，It could be left,right,center,justify 去掉HerePropertiesOrganisation不执行排版
        //    imageBlockLine: 'center',       //Picture的浮动Modalities，It\'s the only play in the world,Left and Right Floating，Default: center,left,right,none 去掉HerePropertiesOrganisation不执行排版
        //    pasteFilter: false,             //Based on规则Filter没事Paste进来的Contents
        //    clearFontSize: false,           //去掉All的内嵌Character，UseEdit器Default的Character
        //    clearFontFamily: false,         //去掉All的内嵌Fonts，UseEdit器Default的Fonts
        //    removeEmptyNode: false,         // 去掉空Nodes
        //    //Yeah去掉的Label
        //    removeTagNames: {LabelName:1},
        //    indent: false,                  // Line indentation
        //    indentValue : '2em',            //Line indentation的大小
        //    bdc2sb: false,
        //    tobdc: false
        //}

        //tableDragable
        //表格是否YeahDrag
        //,tableDragable: true



        //sourceEditor
        //源码的ViewModalities,codemirror 是Code高亮，textarea是Text框,Default iscodemirror
        //AttentionDefaultcodemirrorOnlyie8+andie中Use
        //,sourceEditor:"codemirror"
        //IfsourceEditor是codemirror，还用Configure一下两个Parameters
        //codeMirrorJsUrl js加载的Path，Default is URL + "third-party/codemirror/codemirror.js"
        //,codeMirrorJsUrl:URL + "third-party/codemirror/codemirror.js"
        //codeMirrorCssUrl css加载的Path，Default is URL + "third-party/codemirror/codemirror.css"
        //,codeMirrorCssUrl:URL + "third-party/codemirror/codemirror.css"
        //Edit器Initialize完成后是否Enter源码Mode，Default as否。
        //,sourceEditorFirst:false

        //iframeUrlMap
        //dialogContents的Path ～It will be replaced withURL,垓Properties一旦打开，将覆盖All的dialog的DefaultPath
        //,iframeUrlMap:{
        //    'anchor':'~/dialogs/anchor/anchor.html',
        //}

        //allowLinkProtocol Allow的LinkAddress，有这些前缀的LinkAddress不会AutoAddhttp
        //, allowLinkProtocols: ['http:', 'https:', '#', '/', 'ftp:', 'mailto:', 'tel:', 'git:', 'svn:']

        //webAppKey It\'s a hundred degreesAPIkey，Each station chief must first sign up for one in the 100-degree networkkey后方能正常UseappFunctions，Registration Introduction，http://app.baidu.com/static/cms/getapikey.html
        //, webAppKey: ""

        //DefaultFilter规则相关Configure项目
        //,disabledTableInTable:true  //Ban表格嵌套
        //,allowDivTransToP:true      //AllowEnterEdit器的divLabelAuto变成pLabel
        //,rgb2Hex:true               //Default产出的DataMediumcolorAuto从rgbFormat变成16进制Format

		// xss Filter是否Open,inserthtml等Operation
		,xssFilterRules: true
		//input xssFilter
		,inputXssFilter: true
		//output xssFilter
		,outputXssFilter: true
		// xssFilter White List List sources: https://raw.githubusercontent.com/leizongmin/js-xss/master/lib/default.js
		,whitList: {
			a:      ['target', 'href', 'title', 'class', 'style'],
			abbr:   ['title', 'class', 'style'],
			address: ['class', 'style'],
			area:   ['shape', 'coords', 'href', 'alt'],
			article: [],
			aside:  [],
			audio:  ['autoplay', 'controls', 'loop', 'preload', 'src', 'class', 'style'],
			b:      ['class', 'style'],
			bdi:    ['dir'],
			bdo:    ['dir'],
			big:    [],
			blockquote: ['cite', 'class', 'style'],
			br:     [],
			caption: ['class', 'style'],
			center: [],
			cite:   [],
			code:   ['class', 'style'],
			col:    ['align', 'valign', 'span', 'width', 'class', 'style'],
			colgroup: ['align', 'valign', 'span', 'width', 'class', 'style'],
			dd:     ['class', 'style'],
			del:    ['datetime'],
			details: ['open'],
			div:    ['class', 'style'],
			dl:     ['class', 'style'],
			dt:     ['class', 'style'],
			em:     ['class', 'style'],
			font:   ['color', 'size', 'face'],
			footer: [],
			h1:     ['class', 'style'],
			h2:     ['class', 'style'],
			h3:     ['class', 'style'],
			h4:     ['class', 'style'],
			h5:     ['class', 'style'],
			h6:     ['class', 'style'],
			header: [],
			hr:     [],
			i:      ['class', 'style'],
			img:    ['src', 'alt', 'title', 'width', 'height', 'id', '_src', 'loadingclass', 'class', 'data-latex'],
			ins:    ['datetime'],
			li:     ['class', 'style'],
			mark:   [],
			nav:    [],
			ol:     ['class', 'style'],
			p:      ['class', 'style'],
			pre:    ['class', 'style'],
			s:      [],
			section:[],
			small:  [],
			span:   ['class', 'style'],
			sub:    ['class', 'style'],
			sup:    ['class', 'style'],
			strong: ['class', 'style'],
			table:  ['width', 'border', 'align', 'valign', 'class', 'style'],
			tbody:  ['align', 'valign', 'class', 'style'],
			td:     ['width', 'rowspan', 'colspan', 'align', 'valign', 'class', 'style'],
			tfoot:  ['align', 'valign', 'class', 'style'],
			th:     ['width', 'rowspan', 'colspan', 'align', 'valign', 'class', 'style'],
			thead:  ['align', 'valign', 'class', 'style'],
			tr:     ['rowspan', 'align', 'valign', 'class', 'style'],
			tt:     [],
			u:      [],
			ul:     ['class', 'style'],
			video:  ['autoplay', 'controls', 'loop', 'preload', 'src', 'height', 'width', 'class', 'style']
		}
    };

    function getUEBasePath(docUrl, confUrl) {

        return getBasePath(docUrl || self.document.URL || self.location.href, confUrl || getConfigFilePath());

    }

    function getConfigFilePath() {

        var configPath = document.getElementsByTagName('script');

        return configPath[ configPath.length - 1 ].src;

    }

    function getBasePath(docUrl, confUrl) {

        var basePath = confUrl;


        if (/^(\/|\\\\)/.test(confUrl)) {

            basePath = /^.+?\w(\/|\\\\)/.exec(docUrl)[0] + confUrl.replace(/^(\/|\\\\)/, '');

        } else if (!/^[a-z]+:/i.test(confUrl)) {

            docUrl = docUrl.split("#")[0].split("?")[0].replace(/[^\\\/]+$/, '');

            basePath = docUrl + "" + confUrl;

        }

        return optimizationPath(basePath);

    }

    function optimizationPath(path) {

        var protocol = /^[a-z]+:\/\//.exec(path)[ 0 ],
            tmp = null,
            res = [];

        path = path.replace(protocol, "").split("?")[0].split("#")[0];

        path = path.replace(/\\/g, '/').split(/\//);

        path[ path.length - 1 ] = "";

        while (path.length) {

            if (( tmp = path.shift() ) === "..") {
                res.pop();
            } else if (tmp !== ".") {
                res.push(tmp);
            }

        }

        return protocol + res.join("/");

    }

    window.UE = {
        getUEBasePath: getUEBasePath
    };

})();
