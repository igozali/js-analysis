var g_fromwelcome=document.location.href.indexOf("?fromwelcome=1")!=-1;var g_results=null;function onLoad(){populate()}function populate(){var C=getBG();if(C.have_nplastpass(true)&&typeof(C.g_nplastpass.get_chrome_passwords)=="function"){g_results=C.g_nplastpass.get_chrome_passwords()}else{document.getElementById("needbinaryspan").style.display=""}var B=new Array();for(var A=0;A<g_results.length;A++){if((typeof(g_results[A].username)!="undefined"&&g_results[A].username!="")||(typeof(g_results[A].password)!="undefined"&&g_results[A].password!="")){B[B.length]=g_results[A]
}}g_results=B;var D=[];for(var A in g_results){D.push(getsitehtml(g_results,A))}D.push('<div id="gridclear" class="clear"/>');$("#gridsite").html(D.join(""));D=null}function sp(A,B){if(A.innerHTML==gs("Show")){A.innerHTML=g_results[B].password}else{A.innerHTML=gs("Show")}}var MAX_SITENAME_LEN=30;var MAX_SITEUSERNAME_LEN=15;function getsitehtml(C,A,B){id=A;name=trunc(C[A].url,MAX_SITENAME_LEN);username=(typeof(C[A].username)!="undefined"?trunc(C[A].username,MAX_SITEUSERNAME_LEN):"");return'<div class="site" id="site'+id+'"><div class="border"><div class="sitename"><span class="content">'+name+'</span></div><div class="siteusername"><span class="content">'+username+'</span></div><div class="sitepassword"><span class="content"><a href="#" onclick="return sp(this, \''+id+"')\">"+gs("Show")+'</a></span></div><div class="siteimport"><input type="checkbox" id="import'+id+'" checked></div></div></div>'
}function trunc(B,A){if(B.length<=A){return B}return B.substr(0,A)+"..."}function select_all(){for(var A=0;A<g_results.length;A++){document.getElementById("import"+A).checked=true}}function unselect_all(){for(var A=0;A<g_results.length;A++){document.getElementById("import"+A).checked=false}}function checkdup(E,C){if(E.url=="http://sn"){return false}var A=getBG().getsites(C);for(var D in A){var B=getBG().g_sites[D];if(B&&B.unencryptedUsername==E.username&&getBG().lpmdec(B.password,true)==E.password){return true
}}return false}function lpimport(){var H=new Array();var E="cmd=uploadaccounts&username="+getBG().en(getBG().g_username);var A=0;for(var D=0;D<g_results.length;D++){if(document.getElementById("import"+D).checked){var G=g_results[D];var F=lp_gettld_url(G.url);if(checkdup(G,F)){continue}E+="&url"+A+"="+getBG().en(getBG().bin2hex(G.url));E+="&username"+A+"="+getBG().en(getBG().lpenc(G.username));E+="&password"+A+"="+getBG().en(getBG().lpenc(G.password));E+="&type"+A+"=ie";E+="&usernamefield"+A+"="+getBG().en(G.username_field);
E+="&passwordfield"+A+"="+getBG().en("*"+G.password_field);for(var C=1;C<=1000;C++){var B=F;if(C>1){B+=" ("+C+")"}if(!lp_in_array(B,H)){H[H.length]=B;break}}E+="&name"+A+"="+getBG().en(getBG().lpenc(B));A++;if(getBG().LPISLOC){lpImportChromePasswordLocal(G)}}}if(getBG().LPISLOC){getBG().g_local_accts_version++;getBG().rewritelocalfile()}E+=getBG().get_identity_param();getBG().lpMakeRequest(base_url+"lastpass/api.php",E,lpUploadAccountsResponse)}function lpImportChromePasswordLocal(G){var D=getBG();
var H=D.createNewAcct();H.aid=get_new_id();H.name=lp_gettld_url(G.url);H.url=G.url;var C=lp_gettld_url(H.url);H.tld=C;H.unencryptedUsername=G.username;H.username=D.lpmenc(G.username,true);H.password=D.lpmenc(G.password,true);var F=get_new_id();H.urid=F;addfield(H,G.username_field,"text",D.lpmenc(G.username,true),F);addfield(H,G.password_field,"password",D.lpmenc(G.password,true),F);if(typeof(D.g_tlds[H.tld])=="undefined"){D.g_tlds[H.tld]=new Array()}D.g_tlds[H.tld][H.aid]=true;D.add_ident_aid(H.aid);
if(typeof(D.g_equivalentdomains[C])!="undefined"){var A=D.g_equivalentdomains[C];if(typeof(D.g_equivalentdomains[A])!="undefined"){for(var B=0;B<D.g_equivalentdomains[A].length;B++){var E=D.g_equivalentdomains[A][B];if(typeof(D.g_tlds[E])=="undefined"){D.g_tlds[E]=new Array()}D.g_tlds[E][aid]=true}}}D.g_sites[H.aid]=H}function addfield(F,A,B,D,C){var E=new Object();E.otherfield=false;E.name=A;E.type=B;E.value=D;E.formname="";E.checked=false;E.urid=C;E.otherlogin="0";E.url="";F.fields[F.fields.length]=E
}function lpUploadAccountsResponse(A){if(!A){return}if(A.readyState==4){if(A.status==200){if(A.responseText.indexOf("OK")>0){getBG().get_accts();getBG().refresh_windows();alert(gs("Your Google Chrome passwords have been imported successfully."));if(g_fromwelcome){document.location.href="configure_formfill.html"}else{getBG().closecurrenttab("import.html")}}else{alert(gs("An error occurred while importing your Google Chrome passwords."))}}}}function cancel(){if(g_fromwelcome){document.location.href="configure_formfill.html"
}else{getBG().closecurrenttab("import.html")}}function getbinary(){var A=getBG();if(A){A.openURL(A.base_url+"lpchrome_bin.crx")}window.close()};