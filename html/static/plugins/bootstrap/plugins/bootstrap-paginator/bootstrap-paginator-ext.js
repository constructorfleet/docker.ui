var cpage = 1; // Current Page号
var tpage = 10;  // Total number of pages

// Access to press reviews
function showPageList(page,url,tableId,paginationId,rows) {
    $.ajax({
        type: "get",
        data: {},
        async: "false",
        url: url.replace("pageNum", page),
        success: function (info) {
            changeModel(info); // Update局部页面
            var totalpage = Math.ceil(info.total/rows);
            if(totalpage == 0) totalpage = 1;
            var curtpage = page;
            if (curtpage && totalpage) {
                cpage = curtpage;
                tpage = totalpage;
            }
            showPagination(page, tpage, url, tableId, paginationId); //Show comments
        },
        error: function () {
            alert("加载Failed！Please try again later！");
        }
    });
}

/* curreentpage: Current Page号； tpage: Total number of pages */
//Show news review
function showPagination(currentPage, totalPages, url, tableId, paginationId) {
    var options = {
        bootstrapMajorVersion: 3,
        currentPage: currentPage, //Current Page
        numberOfPages: 10,//One page shows a few buttons（在ulGenerate inside5个li）
        totalPages: totalPages, //Total pages
        itemTexts: function (type, page, current) {
            switch (type) {
                case "first":
                    return "Home Page";
                case "prev":
                    return "Previous Page";
                case "next":
                    return "Next Page";
                case "last":
                    return "End Page";
                case "page":
                    return page;
            }
        },
        onPageClicked: function(e,originalEvent,type,page){
            e.stopImmediatePropagation();
            var currentTarget = $(e.currentTarget);
            var pages = currentTarget.bootstrapPaginator("getPages");
            // Ajax calling
            showPageList(page,url,tableId,paginationId);
            currentTarget.bootstrapPaginator("show",page);
            //updatePagesInfo($("#totalRecord").val(), page);
        },
        pageUrl: function(type, page, current){
            return tableId; //After clicking Page Number，Position to anchortableIdLocation
            //return "#";
        }
    }
    $(paginationId).bootstrapPaginator(options);
}