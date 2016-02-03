/*\

title: $:/plugins/felixhayashi/tiddlymap/js/ViewAbstraction
type: application/javascript
module-type: library

@preserve

\*/
"use strict";module.exports=ViewAbstraction;var EdgeType=require("$:/plugins/felixhayashi/tiddlymap/js/EdgeType");var utils=require("$:/plugins/felixhayashi/tiddlymap/js/utils");function ViewAbstraction(t,e){e=e||{};this._edgeTypePath=$tm.path.edgeTypes;if(t instanceof ViewAbstraction){return t}this._registerPaths(t,e.isCreate);if(e.isCreate){this._createView(e)}else if(!this.exists()){return{exists:function(){return false}}}this.rebuildCache()}ViewAbstraction.prototype._noNeedToRebuildCache=false;ViewAbstraction.prototype._registerPaths=function(t,e){this.comp=this.comp||utils.makeHashMap();this.comp.config=this._getConfigPath(t,e);this.comp.map=this.comp.config+"/map";this.comp.nodeFilter=this.comp.config+"/filter/nodes";this.comp.edgeTypeFilter=this.comp.config+"/filter/edges"};ViewAbstraction.prototype._getConfigPath=function(t,e){if(t instanceof $tw.Tiddler){return t.fields.title}if(typeof t==="string"){t=utils.getWithoutPrefix(t,$tm.path.views+"/");if(t&&!utils.hasSubString(t,"/")){return $tm.path.views+"/"+t}}if(e){var i=$tm.path.views+"/"+utils.getRandomLabel({plural:true});return $tw.wiki.generateNewTitle(i)}};ViewAbstraction.prototype.getPaths=function(){return this.comp};ViewAbstraction.prototype._createView=function(t){if(this.exists()){if(!t.isForce)return;this.destroy()}var e=new ViewAbstraction(t.protoView);if(e.exists()){var i=utils.cp(e.getRoot(),this.comp.config,true)}var r={};r.title=this.comp.config;if(!t.isHidden){r[$tm.field.viewMarker]=true}r.id=utils.genUUID();$tw.wiki.addTiddler(new $tw.Tiddler(utils.getTiddler(this.comp.config),r));this.setEdgeTypeFilter($tm.filter.defaultEdgeTypeFilter)};ViewAbstraction.prototype.isLocked=function(){return $tw.wiki.isShadowTiddler(this.comp.config)};ViewAbstraction.prototype.update=function(t){var e=t.changedTiddlers;if(t[$tm.path.edgeTypes]||utils.hasKeyWithPrefix(e,this.comp.config)){this.rebuildCache();return true}};ViewAbstraction.prototype.rebuildCache=function(t){if(!t&&this._noNeedToRebuildCache){this._noNeedToRebuildCache=false;return}this.config=this.getConfig(null,true);this.nodeData=this.getNodeData(null,true);this.nodeFilter=this.getNodeFilter(null,true);this.edgeTypeFilter=this.getEdgeTypeFilter(null,true)};ViewAbstraction.prototype.addPlaceholder=function(t){utils.cp(t,this.getRoot()+"/snapshot",true)};ViewAbstraction.prototype.exists=function(){return utils.tiddlerExists(this.comp.config)};ViewAbstraction.prototype.getRoot=function(){return this.comp.config};ViewAbstraction.prototype.getCreationDate=function(t){var e=$tw.wiki.getTiddler(this.comp.config).fields["created"];if(t){return e instanceof Date?$tw.utils.formatDateString(e,"DDth MMM YYYY"):""}return e};ViewAbstraction.prototype.getLabel=function(){return utils.getBasename(this.comp.config)};ViewAbstraction.prototype.destroy=function(){var t="[prefix["+this.getRoot()+"]]";utils.deleteTiddlers(utils.getMatches(t))};ViewAbstraction.prototype.getOccurrences=function(){var t="[regexp:text[<\\$(tiddlymap|tmap).*?view=."+this.getLabel()+"..*?>]]";return utils.getMatches(t)};ViewAbstraction.prototype.rename=function(t){if(typeof t!=="string")return false;if(utils.inArray("/",t)){$tm.notify('A view name must not contain any "/"');return false}var e=this.getLabel();var i=$tm.path.views+"/"+t;var r=this.getRoot();var o=utils.mv(r,i,true);if($tm.config.sys.defaultView===e){utils.setEntry($tm.ref.sysUserConf,"defaultView",t)}if($tm.config.sys.liveTab.fallbackView===e){utils.setEntry($tm.ref.sysUserConf,"liveTab.fallbackView",t)}$tw.wiki.each(function(i,r){if(i.fields["tmap.open-view"]===e){utils.setField(r,"tmap.open-view",t)}else if(utils.startsWith(r,$tm.path.views)){var o=new ViewAbstraction(r);if(!o.exists())return;var s=o.getNodeData();for(var n in s){if(s[n]["open-view"]===e){s[n]["open-view"]=t}}o.saveNodeData(s)}});this._registerPaths(t);this.rebuildCache()};ViewAbstraction.prototype.isEnabled=function(t){return utils.isTrue(this.getConfig(t),false)};ViewAbstraction.prototype.getConfig=function(t,e,i){if(!e&&this.config){var r=this.config}else{var o=$tw.wiki.getTiddler(this.comp.config).fields;var r=utils.getPropertiesByPrefix(o,"config.")}return t?r[utils.startsWith(t,"config.")?t:"config."+t]:r};ViewAbstraction.prototype.getHierarchyEdgeTypes=function(){if(this.getConfig("layout.active")!=="hierarchical")return[];var t=utils.getPropertiesByPrefix(this.getConfig(),"config.layout.hierarchical.order-by-",true);var e=utils.makeHashMap();for(var i in t){if(t[i]==="true"){var r=utils.getTiddler($tm.indeces.tById[i]);if(r){e[utils.getBasename(r.fields.title)]=true}}}return e};ViewAbstraction.prototype.setConfig=function(){var t=arguments;if(t[0]==null)return;if(t.length===1&&typeof t[0]==="object"){for(var e in t[0]){this.setConfig(e,t[0][e])}}else if(t.length===2&&typeof t[0]==="string"){var e=utils.getWithoutPrefix(t[0],"config.");var i=t[1];if(i===undefined)return;if(i===null){$tm.logger("debug","Removing config",e);delete this.config["config."+e]}else{if(e==="edge_type_namespace"){var r=i.match(/[^:]+/);i=r?r[0]:""}}$tm.logger("log","Setting config",e,i);this.config["config."+e]=i}else{return}$tw.wiki.addTiddler(new $tw.Tiddler($tw.wiki.getTiddler(this.comp.config),this.config));this._noNeedToRebuildCache=true};ViewAbstraction.prototype.isExplicitNode=function(t){var e=$tw.utils.escapeRegExp(this._getAddNodeFilterPart(t));return this.getNodeFilter("raw").match(e)};ViewAbstraction.prototype.isLiveView=function(){return this.getLabel()===$tm.misc.liveViewLabel};ViewAbstraction.prototype._getAddNodeFilterPart=function(t){if(!t){throw"Supplied param is not a node!"}var e=typeof t==="object"?t.id:t;return"[field:tmap.id["+e+"]]"};ViewAbstraction.prototype.setNodeFilter=function(t,e){t=t.replace(/[\n\r]/g," ");if(this.getNodeFilter("raw")===t){return}if(this.isLiveView()&&!e){var i="You must not change the live view's node filter!";$tm.notify(i);return}utils.setField(this.comp.nodeFilter,"filter",t);$tm.logger("debug","Node filter set to",t);this.nodeFilter=this.getNodeFilter(null,true);this._noNeedToRebuildCache=true};ViewAbstraction.prototype.setEdgeTypeFilter=function(t){t=t.replace(/[\n\r]/g," ");if(this.getEdgeTypeFilter("raw")===t){return}utils.setField(this.comp.edgeTypeFilter,"filter",t);$tm.logger("debug","Edge filter set to",t);this.edgeTypeFilter=this.getEdgeTypeFilter(null,true);this._noNeedToRebuildCache=true};ViewAbstraction.prototype.addNode=function(t){if(this.isExplicitNode(t))return false;var e=this._getAddNodeFilterPart(t);this.setNodeFilter(this.getNodeFilter("raw")+" "+e);this.saveNodePosition(t)};ViewAbstraction.prototype.removeNode=function(t){if(!this.isExplicitNode(t))return false;var e=this._getAddNodeFilterPart(t);var i=this.getNodeFilter("raw").replace(e,"");this.setNodeFilter(i);return true};ViewAbstraction.prototype.getEdgeTypeFilter=function(t,e){if(!e&&this.edgeTypeFilter){var i=this.edgeTypeFilter}else{var i=utils.makeHashMap();var r=$tm.indeces.allETy;var o=Object.keys(r);var s=$tw.wiki.getTiddler(this.comp.edgeTypeFilter);i.raw=s&&s.fields.filter||"";i.pretty=utils.getPrettyFilter(i.raw);i.matches=utils.getEdgeTypeMatches(i.raw,r);i.whitelist=utils.getLookupTable(i.matches)}return t?i[t]:i};ViewAbstraction.prototype.isEdgeTypeVisible=function(t){var e={namespace:this.getConfig("edge_type_namespace")};var t=new EdgeType(t,null,e);return utils.isEdgeTypeMatch(t.id,this.edgeTypeFilter.raw)};ViewAbstraction.prototype.getNodeFilter=function(t,e){if(!e&&this.nodeFilter){var i=this.nodeFilter}else{var i=utils.makeHashMap();var r=$tw.wiki.getTiddler(this.comp.nodeFilter);i.raw=r&&r.fields.filter||"";i.pretty=utils.getPrettyFilter(i.raw);i.compiled=$tw.wiki.compileFilter(i.raw)}return t?i[t]:i};ViewAbstraction.prototype.getNodeData=function(t,e){var i=!e&&this.nodeData?this.nodeData:utils.parseFieldData(this.comp.map,"text",{});return t?i[t]:i};ViewAbstraction.prototype.equals=function(t){if(t===this)return true;var t=new ViewAbstraction(t);return t.exists()&&this.getRoot()===t.getRoot()};ViewAbstraction.prototype.saveNodeData=function(){var t=arguments;var e=this.getNodeData();if(t.length===2){if(typeof t[1]==="object"){if(t[1]===null){e[t[0]]=undefined}else{e[t[0]]=$tw.utils.extend(e[t[0]]||{},t[1])}}}else if(t.length===1&&typeof t[0]==="object"){$tm.logger("log","Storing data in",this.comp.map);$tw.utils.extend(e,t[0])}else{return}utils.writeFieldData(this.comp.map,"text",e);this.nodeData=e;this._noNeedToRebuildCache=true};ViewAbstraction.prototype.saveNodePosition=function(t){if(t.id&&t.x&&t.y){this.saveNodeData(t.id,{x:t.x,y:t.y})}};ViewAbstraction.prototype.saveNodeStyle=function(t,e){var i=this.getNodeData()[t];if(i){for(var r in i){if(r!=="x"&&r!=="y")i[r]=undefined}}this.saveNodeData(t,e)};