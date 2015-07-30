//<SCRIPT>
window.isCordysApplication = true;
var headTag = document.head || document.getElementsByTagName("head")[0];
if (!document.defaultView) document.defaultView = document.parentWindow; //NOMBV
findCordysRoot(window);

var _baseTag = headTag.getElementsByTagName("base")[0] || headTag.appendChild(document.createElement("base")); //NOMBV
if ( ! CordysRoot.baseURL )
{
	var loc = document.location.href;
	CordysRoot.baseURL = loc.split('/').slice(0,(loc.split('/')[3] == 'cordys' ? 4 : 5)).join('/') + '/';  // protocol://domain[:port]/virtualroot/organization/  or (compatible protocol://domain[:port]/cordys/
	CordysRoot.baseURL = encodeURI(decodeURI(CordysRoot.baseURL)); // Avoid double encoding when href is already encoded (standard browsers vs IE)
	CordysRoot.organizationPath = '/' + CordysRoot.baseURL.split('/').slice(3).join('/');
}
_baseTag.href = CordysRoot.baseURL;

if ( window.location.pathname.indexOf(".caf") == -1 )
{
	var defaultStyle = headTag.appendChild(document.createElement("link")); //NOMBV
	defaultStyle.setAttribute("rel", "stylesheet");
	defaultStyle.setAttribute("type","text/css");
	defaultStyle.setAttribute("media","screen,print");
	defaultStyle.setAttribute("href", document.compatMode == "BackCompat" ? "wcp/style/default.css" : "wcp/theme/default/style/default.css" ); //NOMBV
}
function findCordysRoot(ancestorWindow)
{
	if(ancestorWindow!=window && ancestorWindow.closed)	return;
	// Check cross domain window access. This is implemented in system.isWindowAccessible as well.
	try { var p1 = ancestorWindow.document._undefined; } //NOMBV
	catch (e)
	{
		var ancestorWP = ancestorWindow.parent;
		if (ancestorWP!=ancestorWindow) findCordysRoot(ancestorWP);
		else
		{
			try{ var op = ancestorWindow.opener } catch(e){ return; }
			if (op) findCordysRoot(op);
		}
		return;
	}
	if (ancestorWindow.isCordysApplication) CordysRoot = ancestorWindow;
	try{ op = ancestorWindow.opener } catch(e){} if (op) findCordysRoot(op);
	if (ancestorWindow.dialogArguments && ancestorWindow.dialogArguments.system) CordysRoot = ancestorWindow.dialogArguments.system.document.defaultView; //NOMBV
	if (ancestorWindow.parent==ancestorWindow) return;
	findCordysRoot(ancestorWindow.parent);
}

if( document.compatMode == "BackCompat" && !window.navigator.appVersion.match(/MSIE ([0-9]+.)[A-Za-z0-9.]+;/))
{
	window.location.replace("wcp/unsupportedwebcontent.htm");
}
else if (CordysRoot==window)
{
	var iframeObject = document.createElement("iframe");
	iframeObject.style.display = "none";
	iframeObject.src = "wcp/library/system/framework.htm";
	headTag.appendChild(iframeObject); //NOMBV
}
else
{
	CordysRoot.system.framework.attachApplicationLibrary(window.document.documentElement);
}