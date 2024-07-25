<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Ams_ViewerRptReqForm.aspx.cs" Inherits="ITSM.Report.WebForm1" %>

<%@ Register assembly="Microsoft.ReportViewer.WebForms, Version=15.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" namespace="Microsoft.Reporting.WebForms" tagprefix="rsweb" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>
            <%--<rsweb:reportviewer id="RptReqForm" runat="server" height="768px" processingmode="Remote" showparameterprompts="true"
                width="100%">
            </rsweb:reportviewer>--%>
            <rsweb:reportviewer id="RptReqForm" runat="server" ShowParameterPrompts="true" Width="100%">
                <%--<serverreport reportpath="" reportserverurl="" />--%>
            </rsweb:reportviewer>
        </div>
    </form>
</body>
</html>
