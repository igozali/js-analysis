function doexport(A){if(!A){get_data("export",function(){doexport(true)});return}var B=document.createElement("pre");B.innerHTML=getBG().g_export_output;getBG().g_export_output="";document.body.appendChild(B)};