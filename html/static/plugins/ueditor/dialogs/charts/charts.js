/*
 * PictureConvert对话框Script
 **/

var tableData = [],
    //Edit器Pagetable
    editorTable = null,
    chartsConfig = window.typeConfig,
    resizeTimer = null,
    //初始DefaultChartType
    currentChartType = 0;

window.onload = function () {

    editorTable = domUtils.findParentByTagName( editor.selection.getRange().startContainer, 'table', true);

    //未Found itTable， ShowErrorPage
    if ( !editorTable ) {
        document.body.innerHTML = "<div class='edui-charts-not-data'>未Found itData</div>";
        return;
    }

    //InitializeChartTypeSelection
    initChartsTypeView();
    renderTable( editorTable );
    initEvent();
    initUserConfig( editorTable.getAttribute( "data-chart" ) );
    $( "#scrollBed .view-box:eq("+ currentChartType +")" ).trigger( "click" );
    updateViewType( currentChartType );

    dialog.addListener( "resize", function () {

        if ( resizeTimer != null ) {
            window.clearTimeout( resizeTimer );
        }

        resizeTimer = window.setTimeout( function () {

            resizeTimer = null;

            renderCharts();

        }, 500 );

    } );

};

function initChartsTypeView () {

    var contents = [];

    for ( var i = 0, len = chartsConfig.length; i<len; i++ ) {

        contents.push( '<div class="view-box" data-chart-type="'+ i +'"><img width="300" src="images/charts'+ i +'.png"></div>' );

    }

    $( "#scrollBed" ).html( contents.join( "" ) );

}

//Rendertable， 以便UserModifyData
function renderTable ( table ) {

    var tableHtml = [];

    //构造Data
    for ( var i = 0, row; row = table.rows[ i ]; i++ ) {

        tableData[ i ] = [];
        tableHtml[ i ] = [];

        for ( var j = 0, cell; cell = row.cells[ j ]; j++ ) {

            var value = getCellValue( cell );

            if ( i > 0 && j > 0 ) {
                value = +value;
            }

            if ( i === 0 || j === 0 ) {
                tableHtml[ i ].push( '<th>'+ value +'</th>' );
            } else {
                tableHtml[ i ].push( '<td><input type="text" class="data-item" value="'+ value +'"></td>' );
            }

            tableData[ i ][ j ] = value;

        }

        tableHtml[ i ] = tableHtml[ i ].join( "" );

    }

    //draw Table
    $( "#tableContainer" ).html( '<table id="showTable" border="1"><tbody><tr>'+ tableHtml.join( "</tr><tr>" ) +'</tr></tbody></table>' );

}

/*
 * Based onTable已有_Other OrganiserPropertiesInitializeCurrentChartProperties
 */
function initUserConfig ( config ) {

    var parsedConfig = {};

    if ( !config ) {
        return;
    }

    config = config.split( ";" );

    $.each( config, function ( index, item ) {

        item = item.split( ":" );
        parsedConfig[ item[ 0 ] ] = item[ 1 ];

    } );

    setUserConfig( parsedConfig );

}

function initEvent () {

    var cacheValue = null,
        //ChartType数
        typeViewCount = chartsConfig.length- 1,
        $chartsTypeViewBox = $( '#scrollBed .view-box' );

    $( ".charts-format" ).delegate( ".format-ctrl", "change", function () {

        renderCharts();

    } )

    $( ".table-view" ).delegate( ".data-item", "focus", function () {

        cacheValue = this.value;

    } ).delegate( ".data-item", "blur", function () {

        if ( this.value !== cacheValue ) {
            renderCharts();
        }

        cacheValue = null;

    } );

    $( "#buttonContainer" ).delegate( "a", "click", function (e) {

        e.preventDefault();

        if ( this.getAttribute( "data-title" ) === 'prev' ) {

            if ( currentChartType > 0 ) {
                currentChartType--;
                updateViewType( currentChartType );
            }

        } else {

            if ( currentChartType < typeViewCount ) {
                currentChartType++;
                updateViewType( currentChartType );
            }

        }

    } );

    //ChartType变化
    $( '#scrollBed' ).delegate( ".view-box", "click", function (e) {

        var index = $( this ).attr( "data-chart-type" );
        $chartsTypeViewBox.removeClass( "selected" );
        $( $chartsTypeViewBox[ index ] ).addClass( "selected" );

        currentChartType = index | 0;

        //Pie Chart， DisablePartConfigure
        if ( currentChartType === chartsConfig.length - 1 ) {

            disableNotPieConfig();

        //启用CompleteConfigure
        } else {

            enableNotPieConfig();

        }

        renderCharts();

    } );

}

function renderCharts () {

    var data = collectData();

    $('#chartsContainer').highcharts( $.extend( {}, chartsConfig[ currentChartType ], {

        credits: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        title: {
            text: data.title,
            x: -20 //center
        },
        subtitle: {
            text: data.subTitle,
            x: -20
        },
        xAxis: {
            title: {
                text: data.xTitle
            },
            categories: data.categories
        },
        yAxis: {
            title: {
                text: data.yTitle
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            enabled: true,
            valueSuffix: data.suffix
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 1
        },
        series: data.series

    } ));

}

function updateViewType ( index ) {

    $( "#scrollBed" ).css( 'marginLeft', -index*324+'px' );

}

function collectData () {

    var form = document.forms[ 'data-form' ],
        data = null;

    if ( currentChartType !== chartsConfig.length - 1 ) {

        data = getSeriesAndCategories();
        $.extend( data, getUserConfig() );

    //Pie ChartDataFormat
    } else {
        data = getSeriesForPieChart();
        data.title = form[ 'title' ].value;
        data.suffix = form[ 'unit' ].value;
    }

    return data;

}

/**
 * AccessUserConfigureInformation
 */
function getUserConfig () {

    var form = document.forms[ 'data-form' ],
        info = {
            title: form[ 'title' ].value,
            subTitle: form[ 'sub-title' ].value,
            xTitle: form[ 'x-title' ].value,
            yTitle: form[ 'y-title' ].value,
            suffix: form[ 'unit' ].value,
            //DataAlignmentModalities
            tableDataFormat: getTableDataFormat (),
            //Pie ChartHint文字
            tip: $( "#tipInput" ).val()
        };

    return info;

}

function setUserConfig ( config ) {

    var form = document.forms[ 'data-form' ];

    config.title && ( form[ 'title' ].value = config.title );
    config.subTitle && ( form[ 'sub-title' ].value = config.subTitle );
    config.xTitle && ( form[ 'x-title' ].value = config.xTitle );
    config.yTitle && ( form[ 'y-title' ].value = config.yTitle );
    config.suffix && ( form[ 'unit' ].value = config.suffix );
    config.dataFormat == "-1" && ( form[ 'charts-format' ][ 1 ].checked = true );
    config.tip && ( form[ 'tip' ].value = config.tip );
    currentChartType = config.chartType || 0;

}

function getSeriesAndCategories () {

    var form = document.forms[ 'data-form' ],
        series = [],
        categories = [],
        tmp = [],
        tableData = getTableData();

    //反转Data
    if ( getTableDataFormat() === "-1" ) {

        for ( var i = 0, len = tableData.length; i < len; i++ ) {

            for ( var j = 0, jlen = tableData[ i ].length; j < jlen; j++ ) {

                if ( !tmp[ j ] ) {
                    tmp[ j ] = [];
                }

                tmp[ j ][ i ] = tableData[ i ][ j ];

            }

        }

        tableData = tmp;

    }

    categories = tableData[0].slice( 1 );

    for ( var i = 1, data; data = tableData[ i ]; i++ ) {

        series.push( {
            name: data[ 0 ],
            data: data.slice( 1 )
        } );

    }

    return {
        series: series,
        categories: categories
    };

}

/*
 * AccessData源DataAlignmentModalities
 */
function getTableDataFormat () {

    var form = document.forms[ 'data-form' ],
        items = form['charts-format'];

    return items[ 0 ].checked ? items[ 0 ].value : items[ 1 ].value;

}

/*
 * Disable非Pie ChartType的Configure项
 */
function disableNotPieConfig() {

    updateConfigItem( 'disable' );

}

/*
 * 启用非Pie ChartType的Configure项
 */
function enableNotPieConfig() {

    updateConfigItem( 'enable' );

}

function updateConfigItem ( value ) {

    var table = $( "#showTable" )[ 0 ],
        isDisable = value === 'disable' ? true : false;

    //tableMediuminputProcessing
    for ( var i = 2 , row; row = table.rows[ i ]; i++ ) {

        for ( var j = 1, cell; cell = row.cells[ j ]; j++ ) {

            $( "input", cell ).attr( "disabled", isDisable );

        }

    }

    //Other项Processing
    $( "input.not-pie-item" ).attr( "disabled", isDisable );
    $( "#tipInput" ).attr( "disabled", !isDisable )

}

/*
 * AccessPie ChartData
 * Pie Chart的Data只取第一行的
 **/
function getSeriesForPieChart () {

    var series = {
            type: 'pie',
            name: $("#tipInput").val(),
            data: []
        },
        tableData = getTableData();


    for ( var j = 1, jlen = tableData[ 0 ].length; j < jlen; j++ ) {

        var title = tableData[ 0 ][ j ],
            val = tableData[ 1 ][ j ];

        series.data.push( [ title, val ] );

    }

    return {
        series: [ series ]
    };

}

function getTableData () {

    var table = document.getElementById( "showTable" ),
        xCount = table.rows[0].cells.length - 1,
        values = getTableInputValue();

    for ( var i = 0, value; value = values[ i ]; i++ ) {

        tableData[ Math.floor( i / xCount ) + 1 ][ i % xCount + 1 ] = values[ i ];

    }

    return tableData;

}

function getTableInputValue () {

    var table = document.getElementById( "showTable" ),
        inputs = table.getElementsByTagName( "input" ),
        values = [];

    for ( var i = 0, input; input = inputs[ i ]; i++ ) {
        values.push( input.value | 0 );
    }

    return values;

}

function getCellValue ( cell ) {

    var value = utils.trim( ( cell.innerText || cell.textContent || '' ) );

    return value.replace( new RegExp( UE.dom.domUtils.fillChar, 'g' ), '' ).replace( /^\s+|\s+$/g, '' );

}


//dialogConfirmEvents
dialog.onok = function () {

    //收集Information
    var form = document.forms[ 'data-form' ],
        info = getUserConfig();

    //AddChartType
    info.chartType = currentChartType;

    //同步TableData到Edit器
    syncTableData();

    //ImplementationChartCommand
    editor.execCommand( 'charts', info );

};

/*
 * 同步ChartEdit视图的TableData到Edit器里的原始Table
 */
function syncTableData () {

    var tableData = getTableData();

    for ( var i = 1, row; row = editorTable.rows[ i ]; i++ ) {

        for ( var j = 1, cell; cell = row.cells[ j ]; j++ ) {

            cell.innerHTML = tableData[ i ] [ j ];

        }

    }

}