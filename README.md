


var requestBody = ""; 

var client=new XMLHttpRequest();
client.open("get","https://sshaw.service-now.com/api/sn_codesearch/code_search/search");

client.setRequestHeader('Accept','application/json');
client.setRequestHeader('Content-Type','application/json');

//Eg. UserName="admin", Password="admin" for this code sample.
client.setRequestHeader('Authorization', 'Basic '+btoa('admin'+':'+'admin'));

client.onreadystatechange = function() { 
	if(this.readyState = this.DONE) {
		document.getElementById("response").innerHTML=this.status + this.response; 
	}
}; 
client.send(requestBody);

{
  "result": [
    {
      "sys_replace_on_upgrade": "false",
      "applies_catalog": "true",
      "applies_extended": "false",
      "description": "",
      "global": "true",
      "sys_updated_on": "2015-08-28 07:51:58",
      "type": "onLoad",
      "cat_variable": "",
      "sys_class_name": "catalog_script_client",
      "applies_req_item": "false",
      "sys_id": "0aee20529f8102002920bde8132e70a7",
      "ui_type": "0",
      "view": "",
      "sys_updated_by": "admin",
      "variable_set": "",
      "applies_to": "item",
      "sys_created_on": "2015-07-06 13:44:57",
      "sys_domain": {
        "link": "https://sshaw.service-now.com/api/now/table/sys_user_group/global",
        "value": "global"
      },
      "sys_name": "Pre-populate Proposal to Modify ",
      "sys_scope": {
        "link": "https://sshaw.service-now.com/api/now/table/sys_scope/global",
        "value": "global"
      },
      "sys_created_by": "admin",
      "table": "",
      "order": "",
      "sys_mod_count": "11",
      "active": "true",
      "sys_overrides": "",
      "sys_domain_path": "/",
      "sys_tags": "",
      "script": "function onLoad() {\n\tvar stdChangeProducerSysId = getParmVal('std_change_producer');\n\tif (stdChangeProducerSysId) {\n\t\tg_form.setValue('variables.std_change_producer', stdChangeProducerSysId);\n\t\tpopulateValsFromMod(stdChangeProducerSysId);\n\n\t\tpopulateAttachments(stdChangeProducerSysId, false);\n\t}\n}\n\nfunction populateValsFromMod(newValue) {\n\t//Populate Template Values From 'Template to modify'\n\tga = new GlideAjax('StdChangeUtils');\n\tga.addParam('sysparm_name', 'getTemplNCategoryForModify');\n\tga.addParam('sysparm_tableName', 'std_change_record_producer');\n\tga.addParam('sysparm_sysid', newValue);\n\tga.setWantSessionMessages(false);\n\tga.getXML(function(resp) {\n\t\tvar parsedResp = toJson(resp);\n\t\tg_form.setValue('variables.category', parsedResp.category);\n\t});\n}\n\nfunction tagToObj(tag, detectValue) {\n\tvar ans = {};\n\tvar attrs = tag.attributes;\n\tif (attrs.length == 1 && tag.getAttribute('value')) {\n\t\tans = tag.getAttribute('value');\n\t} else {\n\t\tfor (var i = 0; i < attrs.length; i++) {\n\t\t\tvar attr = attrs.item(i);\n\t\t\tans[attr.name] = attr.value;\n\t\t}\n\t}\n\treturn ans;\n}\n\nfunction toJson(resp) {\n\tvar ans = {};\n\tvar tags = resp.responseXML.documentElement.childNodes;\n\tfor (var i = 0; i < tags.length; i++) {\n\t\tvar tag = tags.item(i);\n\t\tvar tagName = tag.nodeName;\n\t\tif (tag.getAttribute('idx')) { //Then this is array\n\t\t\tif (!ans[tagName])\n\t\t\t\tans[tagName] = [];\n\t\t\tans[tagName].push(tagToObj(tag, false));\n\t\t} else {\n\t\t\tans[tagName] = tagToObj(tag, true);\n\t\t}\n\t}\n\treturn ans;\n}\n\nfunction getParmVal(name) {\n\tname = name.replace(/[\\[]/, \"\\\\\\[\").replace(/[\\]]/, \"\\\\\\]\");\n\tvar regexS = \"[\\\\?&]\" + name + \"=([^&#]*)\";\n\tvar regex = new RegExp(regexS);\n\tvar results = regex.exec(window.location.href);\n\tif (results) {\n\t\treturn unescape(results[1]);\n\t} else {\n\t\treturn '';\n\t}\n}\n\nfunction populateAttachments(stdChangeProducerSysId, removeExisting){\n\n\tvar itemGUID = gel('sysparm_item_guid');\n\n\tvar copyAttAj = new GlideAjax('StdChangeUtils');\n\tcopyAttAj.addParam('sysparm_name', 'copyAttachments');\n\tcopyAttAj.addParam('sysparm_srcTable', 'std_change_record_producer');\n\tcopyAttAj.addParam('sysparm_srcSysId', stdChangeProducerSysId);\n\tcopyAttAj.addParam('sysparm_targetTable', 'std_change_proposal');\n\tcopyAttAj.addParam('sysparm_targetSysId', itemGUID.value);\n\tcopyAttAj.addParam('sysparm_removeExisting', removeExisting);\n\tcopyAttAj.getXML(processAttachments);\n}\n\nfunction processAttachments(response) {\n\t// get attachmentInfo elements\n\tvar attachments = response.responseXML.getElementsByTagName(\"attachmentInfo\");\n\tvar deletedAttachmentIds = '';\n\n\tfor ( var i = 0; i < attachments.length; i++) {\n\t\tvar id = attachments[i].getAttribute(\"id\");\n\t\tvar name = attachments[i].getAttribute(\"name\");\n\t\tvar imgSrc = attachments[i].getAttribute(\"imgSrc\");\n\t\tvar action = attachments[i].getAttribute(\"action\");\n\n\t\tif ('delete' == action) {\n\t\t\tdeletedAttachmentIds += ';' + id;\n\t\t}\n\t\telse if ('add' == action) {\n\t\t\taddAttachmentNameToForm(id, name, \"New\", imgSrc, \"true\", \"true\");\n\t\t}\n\t}\n\n\tif(deletedAttachmentIds != '')\n\t\tdeleteExistingAttachments(deletedAttachmentIds);\n}\n\n// this get called after attachments are deleted to update the display\nfunction deleteExistingAttachments(sysIds) {\n\tvar itemGUID = gel('sysparm_item_guid');\n\n\tvar modified = $(\"attachments_modified\");\n\tif (modified)\n\t\tmodified.value = \"true\";\n\tvar header_attachment = $('header_attachment');\n\n\tvar idArray = sysIds.split(\";\");\n\tfor (var i=0; i<idArray.length; i++) {\n\t\tvar id = idArray[i];\n\t\tif(id)\n\t\t\tchangeCount(itemGUID.value, 'decrease');\n\n\t\te = gel(\"attachment_\" + id);\n\t\tif (e)\n\t\t\trel(e);\n\t}\n\n\tvar more_attachments = $('more_attachments');\n\tif (more_attachments && header_attachment)\n\t\tif( (computeAttachmentWidth() - 20) >= (header_attachment.getWidth() - more_attachments.getWidth()))\n\t\tmore_attachments.style.display = 'block';\n\telse\n\t\tmore_attachments.style.display = 'none';\n}",
      "applies_sc_task": "false",
      "sys_package": {
        "link": "https://sshaw.service-now.com/api/now/table/sys_package/4bc9884313a0320037ba3192e144b0fd",
        "value": "4bc9884313a0320037ba3192e144b0fd"
      },
      "condition": "",
      "cat_item": {
        "link": "https://sshaw.service-now.com/api/now/table/sc_cat_item/32b19f3b9fb002002920bde8132e7024",
        "value": "32b19f3b9fb002002920bde8132e7024"
      },
      "sys_update_name": "catalog_script_client_0aee20529f8102002920bde8132e70a7",
      "field": "",
      "name": "Pre-populate Proposal to Modify ",
      "messages": "",
      "sys_customer_update": "false",
      "sys_policy": ""
    }
  ]
}
