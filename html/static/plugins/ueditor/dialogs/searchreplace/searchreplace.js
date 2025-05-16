/**
 * Created with JetBrains PhpStorm.
 * User: xuheng
 * Date: 12-9-26
 * Time: Afternoon12:29
 * To change this template use File | Settings | File Templates.
 */

//Clear上次查选的痕迹
editor.firstForSR = 0;
editor.currentRangeForSR = null;
//给tabRegistrationSwitchEvents
/**
 * tabClickProcessingEvents
 * @param tabHeads
 * @param tabBodys
 * @param obj
 */
function clickHandler( tabHeads,tabBodys,obj ) {
    //headStylesChange
    for ( var k = 0, len = tabHeads.length; k < len; k++ ) {
        tabHeads[k].className = "";
    }
    obj.className = "focus";
    //bodyVisibility
    var tabSrc = obj.getAttribute( "tabSrc" );
    for ( var j = 0, length = tabBodys.length; j < length; j++ ) {
        var body = tabBodys[j],
            id = body.getAttribute( "id" );
        if ( id != tabSrc ) {
            body.style.zIndex = 1;
        } else {
            body.style.zIndex = 200;
        }
    }

}

/**
 * TABSwitch
 * @param tabParentId  tab的父NodesIDOr..Object本身
 */
function switchTab( tabParentId ) {
    var tabElements = $G( tabParentId ).children,
        tabHeads = tabElements[0].children,
        tabBodys = tabElements[1].children;

    for ( var i = 0, length = tabHeads.length; i < length; i++ ) {
        var head = tabHeads[i];
        if ( head.className === "focus" )clickHandler(tabHeads,tabBodys, head );
        head.onclick = function () {
            clickHandler(tabHeads,tabBodys,this);
        }
    }
}
$G('searchtab').onmousedown = function(){
    $G('search-msg').innerHTML = '';
    $G('replace-msg').innerHTML = ''
}
//Whether or notCase sensitive
function getMatchCase(id) {
    return $G(id).checked ? true : false;
}
//Find
$G("nextFindBtn").onclick = function (txt, dir, mcase) {
    var findtxt = $G("findtxt").value, obj;
    if (!findtxt) {
        return false;
    }
    obj = {
        searchStr:findtxt,
        dir:1,
        casesensitive:getMatchCase("matchCase")
    };
    if (!frCommond(obj)) {
        var bk = editor.selection.getRange().createBookmark();
        $G('search-msg').innerHTML = lang.getEnd;
        editor.selection.getRange().moveToBookmark(bk).select();


    }
};
$G("nextReplaceBtn").onclick = function (txt, dir, mcase) {
    var findtxt = $G("findtxt1").value, obj;
    if (!findtxt) {
        return false;
    }
    obj = {
        searchStr:findtxt,
        dir:1,
        casesensitive:getMatchCase("matchCase1")
    };
    frCommond(obj);
};
$G("preFindBtn").onclick = function (txt, dir, mcase) {
    var findtxt = $G("findtxt").value, obj;
    if (!findtxt) {
        return false;
    }
    obj = {
        searchStr:findtxt,
        dir:-1,
        casesensitive:getMatchCase("matchCase")
    };
    if (!frCommond(obj)) {
        $G('search-msg').innerHTML = lang.getStart;
    }
};
$G("preReplaceBtn").onclick = function (txt, dir, mcase) {
    var findtxt = $G("findtxt1").value, obj;
    if (!findtxt) {
        return false;
    }
    obj = {
        searchStr:findtxt,
        dir:-1,
        casesensitive:getMatchCase("matchCase1")
    };
    frCommond(obj);
};
//Replace
$G("repalceBtn").onclick = function () {
    var findtxt = $G("findtxt1").value.replace(/^\s|\s$/g, ""), obj,
        replacetxt = $G("replacetxt").value.replace(/^\s|\s$/g, "");
    if (!findtxt) {
        return false;
    }
    if (findtxt == replacetxt || (!getMatchCase("matchCase1") && findtxt.toLowerCase() == replacetxt.toLowerCase())) {
        return false;
    }
    obj = {
        searchStr:findtxt,
        dir:1,
        casesensitive:getMatchCase("matchCase1"),
        replaceStr:replacetxt
    };
    frCommond(obj);
};
//AllReplace
$G("repalceAllBtn").onclick = function () {
    var findtxt = $G("findtxt1").value.replace(/^\s|\s$/g, ""), obj,
        replacetxt = $G("replacetxt").value.replace(/^\s|\s$/g, "");
    if (!findtxt) {
        return false;
    }
    if (findtxt == replacetxt || (!getMatchCase("matchCase1") && findtxt.toLowerCase() == replacetxt.toLowerCase())) {
        return false;
    }
    obj = {
        searchStr:findtxt,
        casesensitive:getMatchCase("matchCase1"),
        replaceStr:replacetxt,
        all:true
    };
    var num = frCommond(obj);
    if (num) {
        $G('replace-msg').innerHTML = lang.countMsg.replace("{#count}", num);
    }
};
//Implementation
var frCommond = function (obj) {
    return editor.execCommand("searchreplace", obj);
};
switchTab("searchtab");