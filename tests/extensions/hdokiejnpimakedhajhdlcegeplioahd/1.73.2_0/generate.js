function oninitgenerate(){}
function onshowgenerate(){var a=getBG();document.getElementById("advanced").checked=parseInt(a.lpGetPref("generate_advanced",0));document.getElementById("length").value=parseInt(a.lpGetPref("generate_length",8));document.getElementById("upper").checked=parseInt(a.lpGetPref("generate_upper",1));document.getElementById("lower").checked=parseInt(a.lpGetPref("generate_lower",1));document.getElementById("digits").checked=parseInt(a.lpGetPref("generate_digits",1));document.getElementById("special").checked=parseInt(a.lpGetPref("generate_special",
0));document.getElementById("mindigits").value=parseInt(a.lpGetPref("generate_mindigits",1));document.getElementById("ambig").checked=parseInt(a.lpGetPref("generate_ambig",0));document.getElementById("reqevery").checked=parseInt(a.lpGetPref("generate_reqevery",1));if(document.getElementById("advanced").checked==0)document.getElementById("advancedoptions").style.display="none";create_combo("password",[]);dogenerate();a.g_checkgeneratepasswordcallback=function(){g_generate_found=true;sr(document,"generatesave",
"value","Accept");sr(document,"generateclose","value","Cancel")};if(g_ischrome)a.get_selected_tab(null,function(c){if(g_generate_url=="")g_generate_url=c.url;if(!g_tabid)g_tabid=c.id;a.sendCS(g_tabid,{cmd:"checkgeneratepassword"})});else if(g_issafari||g_isopera){if(g_isopera){g_generate_url=a.g_generate_url;if(g_generate_url=="")g_generate_url=a.g_generate_url_prev}a.checkgeneratepassword(g_tabid)}}
function onhidegenerate(){var a=getBG();a.lpPutUserPref("generate_advanced",document.getElementById("advanced").checked?1:0);a.lpPutUserPref("generate_length",document.getElementById("length").value);a.lpPutUserPref("generate_upper",document.getElementById("upper").checked?1:0);a.lpPutUserPref("generate_lower",document.getElementById("lower").checked?1:0);a.lpPutUserPref("generate_digits",document.getElementById("digits").checked?1:0);a.lpPutUserPref("generate_special",document.getElementById("special").checked?
1:0);a.lpPutUserPref("generate_mindigits",document.getElementById("mindigits").value);a.lpPutUserPref("generate_ambig",document.getElementById("ambig").checked?1:0);a.lpPutUserPref("generate_reqevery",document.getElementById("reqevery").checked?1:0);a.lpWriteAllPrefs();if(g_issafari||g_isopera)a.update_prefs("generate")}
function dogenerate(){var a=document.getElementById("length").value,c=document.getElementById("upper").checked,f=document.getElementById("lower").checked,h=document.getElementById("digits").checked,g=document.getElementById("special").checked,e=document.getElementById("mindigits").value,i=document.getElementById("ambig").checked,b=document.getElementById("reqevery").checked;document.getElementById("password").style.fontFamily="courier";document.getElementById("password").value=lpCreatePass(a,c,f,
h,g,e,i,b);getBG().g_genpws.unshift(document.getElementById("password").value);getBG().g_genpws.length>20&&getBG().g_genpws.splice(20,getBG().g_genpws.length-20);repopulate_combo("password",getBG().g_genpws);update_password_meter("",document.getElementById("password").value)}
function dosave(){var a=getBG(),c=document.getElementById("password").value;g_generate_found||(!g_ismenu&&typeof a.copytoclipboard=="function"?a.copytoclipboard(c):Clipboard.copy(c));a.savePassword(c,g_generate_url,g_tabid,!g_generate_found);g_ismenu?setTimeout(function(){window.close()},0):setTimeout(function(){getBG().closecurrenttab("")},0)}
function lpCreatePass(a,c,f,h,g,e,i,b){if(typeof a=="undefined")a=8+get_random(0,1);if(typeof c=="undefined")c=true;if(typeof f=="undefined")f=true;if(typeof h=="undefined")h=true;if(typeof g=="undefined")g=false;if(typeof e=="undefined")e=0;if(typeof i=="undefined")i=false;if(typeof b=="undefined")b=true;var j=0,l=0,m=0;if(b)j=l=m=1;b=[];if(f&&j>0)for(var d=0;d<j;d++)b[b.length]="L";if(c&&l>0)for(d=0;d<l;d++)b[b.length]="U";if(h&&e>0)for(d=0;d<e;d++)b[b.length]="D";if(g&&m>0)for(d=0;d<m;d++)b[b.length]=
"S";for(;b.length<a;)b[b.length]="A";b.sort(function(){return get_random(0,1)*2-1});e="";j="abcdefghjkmnpqrstuvwxyz";i||(j+="ilo");if(f)e+=j;f="ABCDEFGHJKMNPQRSTUVWXYZ";i||(f+="ILO");if(c)e+=f;c="23456789";i||(c+="10");if(h)e+=c;if(g)e+="!@#$%^&*";h="";for(g=0;g<a;g++){var k;switch(b[g]){case "L":k=j;break;case "U":k=f;break;case "D":k=c;break;case "S":k="!@#$%^&*";break;case "A":k=e}d=get_random(0,k.length-1);h+=k.charAt(d)}return h}
function showhideadv(){var a=document.getElementById("advancedoptions");a.style.display=a.style.display=="none"?"":"none"};