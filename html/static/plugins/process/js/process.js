var property={
    initLabelText: "OnlineFlowchart",
    width1:1200,
    heigh1t:600,
    toolBtns:["start","end","task","node","chat","state","plug","join","fork","complex"],
    haveHead:true,
    headBtns:["new","open","save","undo","redo","reload"],//IfhaveHead=true，DefinitionsHEADSector button
    haveTool:true,
    haveGroup:true,
    useOperStack:true
};
var remark={
    cursor:"SelectionPointer",
    direct:"Convert connection",
    start:"Start Node",
    end:"End Node",
    task:"TasksNode",
    node:"AutoNode",
    chat:"Decision Node",
    state:"Status Node",
    plug:"Attach Plugin",
    join:"Joint Node",
    fork:"Branch Node",
    complex:"Composite Node",
    group:"Organisation Box Edit Switches"
};
var process;
$(document).ready(function(){
    process=$.createGooFlow($("#process"),property);
    process.setNodeRemarks(remark);
});
function Export(){
    document.getElementById("result").value=JSON.stringify(process.exportData());
}