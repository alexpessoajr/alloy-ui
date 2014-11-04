AUI.add("aui-tree-data",function(o){var i=o.Lang,n=i.isArray,l=i.isBoolean,m=i.isObject,c=i.isUndefined,z="boundingBox",g="children",p="container",r=".",j="id",x="index",u="lazyLoad",e="leaf",w="nextSibling",C="node",d="ownerTree",h="parentNode",t="prevSibling",q="previousSibling",v="tree",s="tree-node",b="tree-data",k=function(A){return(o.instanceOf(A,o.TreeNode));},f=function(A){return(o.instanceOf(A,o.TreeView));},y=o.getClassName,a=y(v,C);var B=function(){};B.ATTRS={container:{setter:o.one},children:{value:[],validator:n,setter:"_setChildren"},index:{value:{}}};o.mix(B.prototype,{_indexPrimed:false,childrenLength:0,initTreeData:function(){var A=this;A.publish("move");A.publish("append",{defaultFn:A._appendChild});A.publish("remove",{defaultFn:A._removeChild});},destructor:function(){var A=this;A.eachChildren(function(D){D.destroy();},true);},getNodeById:function(D){var A=this;if(!A._indexPrimed){A.refreshIndex();}return A.get(x)[D];},isRegistered:function(D){var A=this;return !!(A.get(x)[D.get(j)]);},updateReferences:function(F,G,J){var K=this;var I=F.get(h);var A=F.get(d);var H=I&&(I!==G);if(I){if(H){var D=I.get(g);o.Array.removeItem(D,F);I.set(g,D);}I.unregisterNode(F);}if(A){A.unregisterNode(F);}F.set(h,G);F.set(d,J);if(G){G.registerNode(F);}if(J){J.registerNode(F);}if(A!=J){F.eachChildren(function(L){K.updateReferences(L,L.get(h),J);});}if(H){var E=K.getEventOutputMap(F);if(!I.get(g).length){I.collapse();I.hideHitArea();}E.tree.oldParent=I;E.tree.oldOwnerTree=A;K.bubbleEvent("move",E);}},refreshIndex:function(){var A=this;A.updateIndex({});A.eachChildren(function(D){A.registerNode(D);},true);},registerNode:function(F){var A=this;var E=F.get(j);var D=A.get(x);if(E){D[E]=F;}if(f(A)){F.addTarget(A);F.set(d,A);}F._inheritOwnerTreeAttrs();A.updateIndex(D);},updateIndex:function(D){var A=this;if(D){A._indexPrimed=true;A.set(x,D);}},unregisterNode:function(E){var A=this;var D=A.get(x);delete D[E.get(j)];if(f(A)){E.removeTarget(A);}A.updateIndex(D);},collapseAll:function(){var A=this;A.eachChildren(function(D){D.collapse();},true);},expandAll:function(){var A=this;A.eachChildren(function(D){D.expand();},true);},selectAll:function(){var A=this;A.eachChildren(function(D){D.select();},true);},unselectAll:function(){var A=this;A.eachChildren(function(D){D.unselect();},true);},eachChildren:function(F,D){var A=this;var E=A.getChildren(D);o.Array.each(E,function(G){if(G){F.apply(A,arguments);}});},eachParent:function(E){var D=this;var A=D.get(h);while(A){if(A){E.call(D,A);}A=A.get(h);}},bubbleEvent:function(G,F,H,E){var D=this;D.fire(G,F);if(!H){var A=D.get(h);F=F||{};if(c(E)){E=true;}F.stopActionPropagation=E;while(A){A.fire(G,F);A=A.get(h);}}},createNode:function(D){var A=this;var E=o.TreeNode.nodeTypes[m(D)?D.type:D]||o.TreeNode;return new E(m(D)?D:{});},appendChild:function(F,E){var A=this;var D=A.getEventOutputMap(F);A.bubbleEvent("append",D,E);},_appendChild:function(J){if(J.stopActionPropagation){return false;}var A=this;var I=J.tree.node;var D=A.get(d);var G=A.get(g);A.updateReferences(I,A,D);var H=G.push(I);A.childrenLength=G.length;var F=H-2;var E=A.item(F);I._nextSibling=null;I._prevSibling=E;I.render(A.get(p));},item:function(D){var A=this;return A.get(g)[D];},indexOf:function(D){var A=this;return o.Array.indexOf(A.get(g),D);},hasChildNodes:function(){var A=this;return(A.getChildrenLength()>0);},getChildren:function(D){var A=this;var F=[];var E=A.get(g);F=F.concat(E);if(D){A.eachChildren(function(G){F=F.concat(G.getChildren(D));});}return F;},getChildrenLength:function(){var A=this;return(A.childrenLength||A.get(g).length);},getEventOutputMap:function(D){var A=this;return{tree:{instance:A,node:D||A}};},removeChild:function(E){var A=this;var D=A.getEventOutputMap(E);A.bubbleEvent("remove",D);},_removeChild:function(G){if(G.stopActionPropagation){return false;}var A=this;var F=G.tree.node;var D=A.get(d);if(A.isRegistered(F)){F.set(h,null);A.unregisterNode(F);F.set(d,null);if(D){D.unregisterNode(F);}F.get(z).remove();var E=A.get(g);o.Array.removeItem(E,F);A.set(g,E);}},empty:function(){var A=this;A.eachChildren(function(E){var D=E.get(h);if(D){D.removeChild(E);}});},insert:function(J,G,H){var N=this;G=G||this;if(G===J){return false;}var A=G.get(h);if(J&&A){var I=J.get(z);var O=G.get(z);var M=G.get(d);if(H==="before"){O.placeBefore(I);}else{if(H==="after"){O.placeAfter(I);}}var D=[];var L=A.get(z).all("> ul > li");L.each(function(P){D.push(P.getData(s));});var K=I.get(w);J.set(w,K&&K.getData(s));var F=I.get(q);J.set(t,F&&F.getData(s));G.updateReferences(J,A,M);A.set(g,D);}J.render();var E=G.getEventOutputMap(J);E.tree.refTreeNode=G;G.bubbleEvent("insert",E);},insertAfter:function(E,D){var A=this;A.insert(E,D,"after");},insertBefore:function(E,D){var A=this;A.insert(E,D,"before");},getNodeByChild:function(E){var A=this;var D=E.ancestor(r+a);if(D){return D.getData(s);}return null;},_inheritOwnerTreeAttrs:i.emptyFn,_setChildren:function(F){var D=this;var I=[];var E=D.get(p);if(!E){E=D._createNodeContainer();}D.childrenLength=F.length;var G=D;if(k(D)){G=D.get(d);}var A=f(G);var H=true;if(A){H=G.get(u);}D.updateIndex({});if(D.childrenLength>0){D.set(e,false);}o.Array.each(F,function(N,K){if(N){if(!k(N)&&m(N)){var M=N[g];var J=M&&M.length;N[d]=G;N[h]=D;if(J&&H){delete N[g];}var L=N;N=D.createNode(N);if(J&&H){L.children=M;N.childrenLength=M.length;o.setTimeout(function(){N.set(g,M);},50);}}D.registerNode(N);if(A){G.registerNode(N);}N.render(E);if(o.Array.indexOf(I,N)===-1){I.push(N);}}});return I;}});o.TreeData=B;},"@VERSION@",{requires:["aui-base","aui-task-manager"],skinnable:false});AUI.add("aui-tree-node",function(ag){var V=ag.Lang,aJ=V.isString,aA=V.isBoolean,aS="alwaysShowHitArea",R="",t="boundingBox",g="children",aF="clearfix",y="collapsed",a="container",ae="content",w="contentBox",n="draggable",j="expanded",q="helper",Y="hidden",f="hitAreaEl",K="hitarea",W="icon",aR="iconEl",c="invalid",au="id",al="label",Z="labelEl",U="lastSelected",aE="leaf",r="node",an="over",ab="ownerTree",e="parentNode",ay="radio",aP="rendered",aD="selected",u=" ",h="tree",L="tree-node",aN=function(){return Array.prototype.slice.call(arguments).join(u);
},aq=function(A){return(A instanceof ag.TreeNode);},aL=function(A){return(A instanceof ag.TreeView);},J=ag.getClassName,ai=J(q,aF),C=J(h,y),b=J(h,a),az=J(h,w),aT=J(h,j),v=J(h,Y),av=J(h,K),I=J(h,W),k=J(h,al),aB=J(h,r),H=J(h,r,ae),D=J(h,r,ae,c),aw=J(h,r,Y,K),i=J(h,r,aE),aI=J(h,r,an),M=J(h,r,aD),af='<div class="'+av+'"></div>',s='<div class="'+I+'"></div>',d='<div class="'+k+'"></div>',aQ="<ul></ul>",x='<li class="'+aB+'"></li>',ac='<div class="'+aN(ai,H)+'"></div>';var P=ag.Component.create({NAME:L,ATTRS:{alwaysShowHitArea:{validator:aA,value:true},boundingBox:{valueFn:function(){return ag.Node.create(x);}},contentBox:{valueFn:function(){return ag.Node.create(ac);}},draggable:{validator:aA,value:true},expanded:{validator:aA,value:false},hitAreaEl:{setter:ag.one,valueFn:function(){return ag.Node.create(af);}},iconEl:{setter:ag.one,valueFn:function(){return ag.Node.create(s);}},id:{validator:aJ,valueFn:function(){return ag.guid();}},label:{validator:aJ,value:R},labelEl:{setter:ag.one,valueFn:function(){var A=this;var aW=A.get(al);return ag.Node.create(d).html(aW).unselectable();}},leaf:{setter:function(aW){var A=this;if(aW&&A.get(g).length){return false;}return aW;},validator:aA,value:true},nextSibling:{getter:"_getSibling",validator:aq,value:null},ownerTree:{value:null},parentNode:{validator:function(A){return aq(A)||aL(A);},value:null},prevSibling:{getter:"_getSibling",validator:aq,value:null},rendered:{validator:aA,value:false},tabIndex:{value:null}},AUGMENTS:[ag.TreeData],EXTENDS:ag.Base,prototype:{BOUNDING_TEMPLATE:x,CONTENT_TEMPLATE:ac,initializer:function(){var A=this;A.get(t).setData(L,A);A._syncTreeNodeBBId();A._uiSetDraggable(A.get(n));A._uiSetExpanded(A.get(j));A._uiSetLeaf(A.get(aE));A.initTreeData();},bindUI:function(){var A=this;A.after("childrenChange",ag.bind(A._afterSetChildren,A));A.after("draggableChange",ag.bind(A._afterDraggableChange,A));A.after("expandedChange",ag.bind(A._afterExpandedChange,A));A.after("idChange",A._afterSetId,A);A.after("leafChange",ag.bind(A._afterLeafChange,A));},render:function(aX){var aW=this;if(!aW.get(aP)){aW.renderUI();aW.bindUI();aW.syncUI();aW.set(aP,true);}if(aX){var aY=aW.get(t);var A=aW.get(e);aY.appendTo(aX);if(A){var aZ=A.get(ak);if(aZ){aY.insertBefore(aZ.element,null);}}}},renderUI:function(){var A=this;A._renderBoundingBox();A._renderContentBox();},syncUI:function(){var A=this;A._syncIconUI();},append:function(aW){var A=this;A.appendChild(aW);},appendChild:function(){var A=this;if(!A.isLeaf()){ag.TreeNode.superclass.appendChild.apply(A,arguments);}},collapse:function(){var A=this;A.set(j,false);},collapseAll:function(){var A=this;ag.TreeNode.superclass.collapseAll.apply(A,arguments);A.collapse();},contains:function(aW){var A=this;return aW.isAncestor(A);},expand:function(){var A=this;A.set(j,true);},expandAll:function(){var A=this;ag.TreeNode.superclass.expandAll.apply(A,arguments);A.expand();},getDepth:function(){var aW=this;var aX=0;var A=aW.get(e);while(A){++aX;A=A.get(e);}return aX;},hasChildNodes:function(){var A=this;return(!A.isLeaf()&&ag.TreeNode.superclass.hasChildNodes.apply(A,arguments));},hideHitArea:function(){var A=this;A.get(f).addClass(aw);},isAncestor:function(aX){var aW=this;var A=aW.get(e);while(A){if(A===aX){return true;}A=A.get(e);}return false;},isLeaf:function(){var A=this;return A.get(aE);},isSelected:function(){var A=this;return A.get(w).hasClass(M);},out:function(){var A=this;A.get(w).removeClass(aI);},over:function(){var A=this;A.get(w).addClass(aI);},select:function(){var A=this;var aW=A.get(ab);if(aW){aW.set(U,A);}A.get(w).addClass(M);A.fire("select");},showHitArea:function(){var A=this;A.get(f).removeClass(aw);},toggle:function(){var A=this;if(A.get(j)){A.collapse();}else{A.expand();}},unselect:function(){var A=this;A.get(w).removeClass(M);A.fire("unselect");},_afterDraggableChange:function(aW){var A=this;A._uiSetDraggable(aW.newVal);A._syncIconUI();},_afterExpandedChange:function(aW){var A=this;A._uiSetExpanded(aW.newVal);A._syncIconUI();},_afterLeafChange:function(aW){var A=this;A._uiSetLeaf(aW.newVal);A._syncIconUI();},_afterLoadingChange:function(aW){var A=this;A._syncIconUI();},_afterSetChildren:function(aW){var A=this;A._syncIconUI();},_createNodeContainer:function(){var A=this;var aW=A.get(a)||ag.Node.create(aQ);aW.addClass(b);A.set(a,aW);return aW;},_getSibling:function(aZ,aW){var A=this;var aY="_"+aW;var aX=A[aY];if(aX!==null&&!aq(aX)){aX=null;A[aY]=aX;}return aX;},_renderBoundingBox:function(){var A=this;var aX=A.get(t);var aW=A.get(w);aW.append(A.get(aR));aW.append(A.get(Z));aX.append(aW);var aY=A.get(a);if(aY){if(!A.get(j)){aY.addClass(v);}aX.append(aY);}return aX;},_renderContentBox:function(aY){var A=this;var aW=A.get(w);if(!A.isLeaf()){var aX=A.get(j);aW.addClass(aX?aT:C);if(aX){A.expand();}}return aW;},_syncHitArea:function(){var A=this;if(A.get(aS)||A.getChildrenLength()){A.showHitArea();}else{A.hideHitArea();A.collapse();}},_syncIconUI:function(){var A=this;A._syncHitArea();},_syncTreeNodeBBId:function(aW){var A=this;A.get(t).attr(au,A.get(au));},_uiSetDraggable:function(aX){var A=this;var aW=A.get(w);aW.toggleClass(D,!aX);},_uiSetExpanded:function(aY){var A=this;if(!A.isLeaf()){var aX=A.get(a);var aW=A.get(w);if(aY){aW.replaceClass(C,aT);if(aX){aX.removeClass(v);}}else{aW.replaceClass(aT,C);if(aX){aX.addClass(v);}}}},_uiSetLeaf:function(aX){var A=this;var aW=A.get(w);if(aX){A.get(a).remove();A.get(f).remove();}else{aW.prepend(A.get(f));A._createNodeContainer();A._uiSetExpanded(A.get(j));}aW.toggleClass(i,aX);}}});ag.TreeNode=P;var ax=V.isFunction,aK="cache",am="io",aO="loaded",aU="loading",ak="paginator",at="tree-node-io",B=J(h,r,am,aU);var O=ag.Component.create({NAME:at,ATTRS:{cache:{validator:aA,value:true},leaf:{validator:aA,value:false},loaded:{validator:aA,value:false},loading:{validator:aA,value:false}},AUGMENTS:[ag.TreeViewPaginator,ag.TreeViewIO],EXTENDS:ag.TreeNode,prototype:{bindUI:function(){var A=this;ag.TreeNodeIO.superclass.bindUI.apply(A,arguments);A.on("ioRequestSuccess",A._onIOSuccess,A);
},syncUI:function(){var A=this;ag.TreeNodeIO.superclass.syncUI.apply(A,arguments);},expand:function(){var A=this;var aW=A.get(aK);var aZ=A.get(am);var aX=A.get(aO);var aY=A.get(aU);if(!aW){A.set(aO,false);}if(aZ&&!aX&&!aY&&!A.hasChildNodes()){if(!aW){A.empty();}A.initIO();}else{ag.TreeNodeIO.superclass.expand.apply(A,arguments);}},_inheritOwnerTreeAttrs:function(){var A=this;var aW=A.get(ab);if(aW){if(!A.get(am)){var aZ=ag.clone(aW.get(am),true,function(a1,a0){if(ax(a1)&&(a1.defaultFn||a1.wrappedFn)){return false;}return true;});A.set(am,aZ);}if(!A.get(ak)){var aX=aW.get(ak);var aY=ag.clone(aX);if(aY&&aY.element){aY.element=aX.element.clone();}A.set(ak,aY);}}},_onIOSuccess:function(aW){var A=this;A.expand();}}});ag.TreeNodeIO=O;var l="checkbox",p="checked",ad="checkContainerEl",aG="checkEl",Q="checkName",aa=".",m="name",E="tree-node-check",aj=J(h,r,l),ap=J(h,r,l,a),ar=J(h,r,p),T='<div class="'+ap+'"></div>',ao='<input class="'+aj+'" type="checkbox" />';var aC=ag.Component.create({NAME:E,ATTRS:{checked:{validator:aA,value:false},checkContainerEl:{setter:ag.one,valueFn:function(){return ag.Node.create(T);}},checkEl:{setter:ag.one,valueFn:function(){var A=this;var aX=A.get(au)+"Checkbox";var aW={ID:aX,NAME:A.get(Q)};return ag.Node.create(ao).attr(aW);}},checkName:{value:E,validator:aJ}},EXTENDS:ag.TreeNodeIO,prototype:{initializer:function(){var A=this;A._uiSetChecked(A.get(p));},renderUI:function(){var aW=this;ag.TreeNodeCheck.superclass.renderUI.apply(aW,arguments);var A=aW.get(aG);var aX=aW.get(ad);A.hide();aX.append(A);aW.get(Z).placeBefore(aX);if(aW.isChecked()){aW.check();}},bindUI:function(){var A=this;var aW=A.get(w);ag.TreeNodeCheck.superclass.bindUI.apply(A,arguments);A.after("checkedChange",ag.bind(A._afterCheckedChange,A));aW.delegate("click",ag.bind(A.toggleCheck,A),aa+ap);aW.delegate("click",ag.bind(A.toggleCheck,A),aa+k);A.get(Z).swallowEvent("dblclick");},check:function(aW){var A=this;A.set(p,true,{originalTarget:aW});},isChecked:function(){var A=this;return A.get(p);},toggleCheck:function(){var aW=this;var A=aW.get(aG);var aX=A.attr(p);if(!aX){aW.check();}else{aW.uncheck();}},uncheck:function(aW){var A=this;A.set(p,false,{originalTarget:aW});},_afterCheckedChange:function(aW){var A=this;A._uiSetChecked(aW.newVal);},_uiSetChecked:function(aY){var aW=this;var A=aW.get(aG);var aX=aW.get(w);if(aY){aX.addClass(ar);A.attr(p,p);}else{aX.removeClass(ar);A.attr(p,R);}}}});ag.TreeNodeCheck=aC;var F="child",S="tree-node-task",N="unchecked",aH=function(A){return A instanceof ag.TreeNodeCheck;},ah=J(h,r,F,N);var aV=ag.Component.create({NAME:S,EXTENDS:ag.TreeNodeCheck,prototype:{check:function(aW){var A=this;aW=aW||A;if(!A.isLeaf()){A.eachChildren(function(aX){if(aH(aX)){aX.check(aW);}});}A.eachParent(function(aX){if(aH(aX)){var aY=false;aX.eachChildren(function(a0){if((a0!==A)&&!a0.isChecked()){aY=true;}else{var aZ=a0.get(w).hasClass(ah);if(aZ){aY=true;}}});if(!aY){aX.get(w).removeClass(ah);}}});A.get(w).removeClass(ah);ag.TreeNodeTask.superclass.check.call(A,aW);},uncheck:function(aW){var A=this;aW=aW||A;if(!A.isLeaf()){A.eachChildren(function(aX){if(aX instanceof ag.TreeNodeCheck){aX.uncheck(aW);}});}A.eachParent(function(aX){if(aH(aX)&&aX.isChecked()){aX.get(w).addClass(ah);}});A.get(w).removeClass(ah);ag.TreeNodeTask.superclass.uncheck.call(A,aW);}}});ag.TreeNodeTask=aV;var G="tree-node-radio",o=function(A){return A instanceof ag.TreeNodeRadio;},z=J(h,r,ay),X=J(h,r,ay,p);var aM=ag.Component.create({NAME:G,EXTENDS:ag.TreeNodeCheck,prototype:{renderUI:function(){var A=this;ag.TreeNodeRadio.superclass.renderUI.apply(A,arguments);A.get(w).addClass(z);},_uncheckNodesRadio:function(aY){var A=this;var aX;if(aY){aX=aY.get(g);}else{var aW=A.get(ab);if(aW){aX=aW.get(g);}else{return;}}ag.Array.each(aX,function(a0,aZ,a1){if(!a0.isLeaf()){A._uncheckNodesRadio(a0);}if(o(a0)){a0.uncheck();}});},_uiSetChecked:function(aW){var A=this;if(aW){A.get(w).addClass(X);A.get(aG).attr(p,p);}else{A.get(w).removeClass(X);A.get(aG).attr(p,R);}},check:function(){var A=this;A._uncheckNodesRadio();ag.TreeNodeRadio.superclass.check.apply(A,arguments);}}});ag.TreeNodeRadio=aM;ag.TreeNode.nodeTypes={check:ag.TreeNodeCheck,io:ag.TreeNodeIO,node:ag.TreeNode,radio:ag.TreeNodeRadio,task:ag.TreeNodeTask};},"@VERSION@",{requires:["aui-tree-data","aui-tree-io","aui-tree-paginator","json","querystring-stringify"],skinnable:false});AUI.add("aui-tree-paginator",function(m){var e=m.Lang,k=e.isObject,p=e.isValue,s=m.getClassName,g="children",n="container",f="end",c="io",j="limit",d="Load more results",u="node",b="ownerTree",a="paginator",o="start",r="tree",q="tree-node-io",i="paginatorClick",h=s(r,u,a),l='<a class="'+h+'" href="javascript:void(0);">{moreResultsLabel}</a>';function t(w){var v=this;m.after(v._bindPaginatorUI,this,"bindUI");m.after(v._syncPaginatorUI,this,"syncUI");}t.ATTRS={paginator:{setter:function(x){var w=this;var v=m.Node.create(e.sub(l,{moreResultsLabel:x.moreResultsLabel||d}));return m.merge({alwaysVisible:false,autoFocus:true,element:v,endParam:f,limitParam:j,start:0,startParam:o},x);},validator:k}};t.prototype={_bindPaginatorUI:function(){var v=this;var w=v.get(a);if(w){w.element.on("click",m.bind(v._handlePaginatorClickEvent,v));}v._createEvents();},_createEvents:function(){var v=this;v.publish(i,{defaultFn:v._defPaginatorClickFn,prefix:q});},_defPaginatorClickFn:function(w){var v=this;var x=v.get(a);if(p(x.limit)){x.start=v.getChildrenLength();}if(v.get(c)){v.initIO();}},_handlePaginatorClickEvent:function(x){var v=this;var w=v.getEventOutputMap(v);v.fire(i,w);x.halt();},_syncPaginatorIOData:function(y){var v=this;var x=v.get(a);if(x&&p(x.limit)){var w=y.cfg.data||{};w[x.limitParam]=x.limit;w[x.startParam]=x.start;w[x.endParam]=(x.start+x.limit);y.cfg.data=w;}},_syncPaginatorUI:function(x){var B=this;var C=B.get(a);if(C){var A=true;if(x){A=(x.length>0);}var w=B.getChildrenLength();var v=C.start;var z=C.total||w;var D=w&&A&&(z>w);if(C.alwaysVisible||D){B.get(n).append(C.element.show());if(C.autoFocus){try{C.element.focus();
}catch(y){}}}else{C.element.hide();}}}};m.TreeViewPaginator=t;},"@VERSION@",{requires:["aui-base"],skinnable:false});AUI.add("aui-tree-view",function(ad){var V=ad.Lang,at=V.isBoolean,ay=V.isString,au=ad.UA,r="boundingBox",e="children",a="container",aa="content",t="contentBox",T=".",aq="file",C="hitarea",R="icon",b="invalid",ah="label",P="lastSelected",aw="leaf",q="node",X="ownerTree",H="root",U="selectOnToggle",s=" ",g="tree",D="tree-node",N="tree-view",f="type",z="view",az=function(){return Array.prototype.slice.call(arguments).join(s);},am=function(A){return(A instanceof ad.TreeNode);},B=ad.getClassName,ap=B(g,C),y=B(g,R),j=B(g,ah),w=B(g,q,aa),u=B(g,q,aa,b),m=B(g,H,a),ai=B(g,z,aa);var Q=ad.Component.create({NAME:N,ATTRS:{type:{value:aq,validator:ay},lastSelected:{value:null,validator:am},lazyLoad:{validator:at,value:true},selectOnToggle:{validator:at,value:false}},AUGMENTS:[ad.TreeData,ad.TreeViewPaginator,ad.TreeViewIO],prototype:{CONTENT_TEMPLATE:"<ul></ul>",initializer:function(){var A=this;var L=A.get(r);L.setData(N,A);A.initTreeData();},bindUI:function(){var A=this;A.after("childrenChange",ad.bind(A._afterSetChildren,A));A._delegateDOM();},renderUI:function(){var A=this;A._renderElements();},_afterSetChildren:function(L){var A=this;A._syncPaginatorUI();},_createFromHTMLMarkup:function(L){var A=this;L.all("> li").each(function(aF){var aE=aF.one("> *").remove();var aD=aE.outerHTML();var aC=aF.one("> ul");var aG=new ad.TreeNode({boundingBox:aF,container:aC,label:aD,leaf:!aC,ownerTree:A});if(A.get("lazyLoad")){ad.setTimeout(function(){aG.render();},50);}else{aG.render();}var aB=aF.get(d).get(d);var aH=aB.getData(D);if(!ad.instanceOf(aH,ad.TreeNode)){aH=aB.getData(N);}aH.appendChild(aG);if(aC){A._createFromHTMLMarkup(aC);}});},_createNodeContainer:function(){var A=this;var L=A.get(t);A.set(a,L);return L;},_renderElements:function(){var A=this;var L=A.get(t);var aB=A.get(e);var aC=A.get(f);var aD=B(g,aC);L.addClass(ai);L.addClass(az(aD,m));if(!aB.length){A._createFromHTMLMarkup(L);}},_delegateDOM:function(){var A=this;var L=A.get(r);L.delegate("click",ad.bind(A._onClickNodeEl,A),T+w);L.delegate("dblclick",ad.bind(A._onClickHitArea,A),T+y);L.delegate("dblclick",ad.bind(A._onClickHitArea,A),T+j);L.delegate("mouseenter",ad.bind(A._onMouseEnterNodeEl,A),T+w);L.delegate("mouseleave",ad.bind(A._onMouseLeaveNodeEl,A),T+w);},_onClickNodeEl:function(L){var A=this;var aC=A.getNodeByChild(L.currentTarget);if(aC){if(L.target.test(T+ap)){aC.toggle();if(!A.get(U)){return;}}if(!aC.isSelected()){var aB=A.get(P);if(aB){aB.unselect();}aC.select();}}},_onMouseEnterNodeEl:function(L){var A=this;var aB=A.getNodeByChild(L.currentTarget);if(aB){aB.over();}},_onMouseLeaveNodeEl:function(L){var A=this;var aB=A.getNodeByChild(L.currentTarget);if(aB){aB.out();}},_onClickHitArea:function(L){var A=this;var aB=A.getNodeByChild(L.currentTarget);if(aB){aB.toggle();}}}});ad.TreeView=Q;var M=V.isNumber,ae="above",c="append",ag="below",ao="block",aj="body",ax="clearfix",ac="default",v="display",al="down",x="drag",n="draggable",Z="dragCursor",ar="dragNode",i="expanded",o="helper",av="insert",F="offsetHeight",d="parentNode",aA="scrollDelay",O="state",ak="tree-drag-drop",an="up",K=ad.DD.DDM,af=B(o,ax),k=B(R),ab=B(g,x,o),p=B(g,x,o,aa),J=B(g,x,o,ah),G=B(g,x,av,ae),Y=B(g,x,av,c),I=B(g,x,av,ag),l=B(g,x,O,c),S=B(g,x,O,av,ae),W=B(g,x,O,av,ag),E='<div class="'+ab+'">'+'<div class="'+[p,af].join(s)+'">'+'<span class="'+k+'"></span>'+'<span class="'+J+'"></span>'+"</div>"+"</div>";var h=ad.Component.create({NAME:ak,ATTRS:{helper:{value:null},scrollDelay:{value:100,validator:M}},EXTENDS:ad.TreeView,prototype:{direction:ag,dropAction:null,lastY:0,node:null,nodeContent:null,destructor:function(){var A=this;var L=A.get(o);if(L){L.remove(true);}if(A.ddDelegate){A.ddDelegate.destroy();}},bindUI:function(){var A=this;ad.TreeViewDD.superclass.bindUI.apply(this,arguments);A._bindDragDrop();},renderUI:function(){var A=this;ad.TreeViewDD.superclass.renderUI.apply(this,arguments);var L=ad.Node.create(E).hide();ad.one(aj).append(L);A.set(o,L);K.set(Z,ac);},_bindDragDrop:function(){var A=this;var aB=A.get(r);var L=null;A._createDragInitHandler=function(){A.ddDelegate=new ad.DD.Delegate({bubbleTargets:A,container:aB,invalid:T+u,nodes:T+w,target:true});var aC=A.ddDelegate.dd;aC.plug(ad.Plugin.DDProxy,{moveOnEnd:false,positionProxy:false,borderStyle:null}).plug(ad.Plugin.DDNodeScroll,{scrollDelay:A.get(aA),node:aB});aC.removeInvalid("a");if(L){L.detach();}};if(!au.touch){L=aB.on(["focus","mousedown","mousemove"],A._createDragInitHandler);}else{A._createDragInitHandler();}A.on("drag:align",A._onDragAlign);A.on("drag:start",A._onDragStart);A.on("drop:exit",A._onDropExit);A.after("drop:hit",A._afterDropHit);A.on("drop:hit",A._onDropHit);A.on("drop:over",A._onDropOver);},_appendState:function(L){var A=this;A.dropAction=c;A.get(o).addClass(l);L.addClass(Y);},_goingDownState:function(L){var A=this;A.dropAction=ag;A.get(o).addClass(W);L.addClass(I);},_goingUpState:function(L){var A=this;A.dropAction=ae;A.get(o).addClass(S);L.addClass(G);},_resetState:function(L){var A=this;var aB=A.get(o);aB.removeClass(l);aB.removeClass(S);aB.removeClass(W);if(L){L.removeClass(G);L.removeClass(Y);L.removeClass(I);}},_updateNodeState:function(A){var aK=this;var aG=A.drag;var aD=A.drop;var L=aD.get(q);var aJ=L.get(d);var aF=aG.get(q).get(d);var aC=aJ.getData(D);aK._resetState(aK.nodeContent);if(!!aC.get(n)&&!aF.contains(aJ)){var aL=L.get(F)/3;var aB=L.getY();var aI=aB+aL;var aH=aB+aL*2;var aE=aG.mouseXY[1];if((aE>aB)&&(aE<aI)){aK._goingUpState(L);}else{if(aE>aH){aK._goingDownState(L);}else{if((aE>aI)&&(aE<aH)){if(aC&&!aC.isLeaf()){aK._appendState(L);}else{if(aK.direction===an){aK._goingUpState(L);}else{aK._goingDownState(L);}}}}}}aK.nodeContent=L;},_afterDropHit:function(aD){var A=this;var aF=A.dropAction;var aE=aD.drag.get(q).get(d);var aB=aD.drop.get(q).get(d);var aG=aB.getData(D);var aC=aE.getData(D);var L=A.getEventOutputMap(A);L.tree.dropNode=aG;L.tree.dragNode=aC;if(aF===ae){aG.insertBefore(aC);
A.bubbleEvent("dropInsert",L);}else{if(aF===ag){aG.insertAfter(aC);A.bubbleEvent("dropInsert",L);}else{if(aF===c){if(aG&&!aG.isLeaf()){if(!aG.get(i)){aG.expand();}aG.appendChild(aC);A.bubbleEvent("dropAppend",L);}}}}A._resetState(A.nodeContent);A.bubbleEvent("drop",L);A.dropAction=null;},_onDragAlign:function(aB){var A=this;var L=A.lastY;var aC=aB.target.lastXY[1];if(aC!==L){A.direction=(aC<L)?an:al;}A.lastY=aC;},_onDragStart:function(aE){var A=this;var aC=aE.target;var aG=aC.get(q).get(d);var aB=aG.getData(D);var aF=A.get(P);if(aF){aF.unselect();}aB.select();var aD=A.get(o);var L=aD.one(T+J);aD.setStyle(v,ao).show();L.html(aB.get(ah));aC.set(ar,aD);},_onDropOver:function(L){var A=this;A._updateNodeState(L);},_onDropHit:function(L){var A=L.drop.get(q).get(d);var aB=A.getData(D);if(!am(aB)){L.preventDefault();}},_onDropExit:function(){var A=this;A.dropAction=null;A._resetState(A.nodeContent);}}});ad.TreeViewDD=h;},"@VERSION@",{requires:["aui-tree-node","aui-tree-paginator","aui-tree-io","dd-delegate","dd-proxy"],skinnable:true});AUI.add("aui-tree-io",function(e){var l=e.Lang,d=l.isFunction,b=l.isString,a="ioRequestSuccess",n="contentBox",f="io",i="ownerTree",j="loaded",m="loading",c="node",o="tree",h=e.getClassName,g=h(o,c,f,m);function k(q){var p=this;p.publish(a,{defaultFn:p._onIOSuccessDefault});}k.ATTRS={io:{lazyAdd:false,value:null,setter:function(p){return this._setIO(p);}}};k.prototype={initializer:function(){var p=this;p.publish();},createNodes:function(q){var p=this;var r=p.get("paginator");e.Array.each(e.Array(q),function(s){var t=p.getChildrenLength();if(r&&r.total<=t){return;}p.appendChild(p.createNode(s));});p._syncPaginatorUI(q);},initIO:function(){var q=this;var r=q.get(f);if(d(r.cfg.data)){r.cfg.data=r.cfg.data.call(q,q);}q._syncPaginatorIOData(r);if(d(r.loader)){var p=e.bind(r.loader,q);p(r.url,r.cfg,q);}else{e.io.request(r.url,r.cfg);}},ioStartHandler:function(){var p=this;var q=p.get(n);p.set(m,true);q.addClass(g);},ioCompleteHandler:function(){var p=this;var q=p.get(n);p.set(m,false);p.set(j,true);q.removeClass(g);},ioSuccessHandler:function(){var p=this;var w=p.get(f);var r=Array.prototype.slice.call(arguments);var t=r.length;var q=r[1];if(t>=3){var v=r[2];try{q=e.JSON.parse(v.responseText);}catch(u){}}var s=w.formatter;if(s){q=s(q);}p.createNodes(q);p.fire(a,q);},ioFailureHandler:function(){var p=this;p.fire("ioRequestFailure");p.set(m,false);p.set(j,false);},_onIOSuccessDefault:function(r){var p=this;var q=p.get(i);if(q&&q.ddDelegate){q.ddDelegate.syncTargets();}},_setIO:function(r){var p=this;if(!r){return null;}else{if(b(r)){r={url:r};}}r=r||{};r.cfg=r.cfg||{};r.cfg.on=r.cfg.on||{};var q={start:e.bind(p.ioStartHandler,p),complete:e.bind(p.ioCompleteHandler,p),success:e.bind(p.ioSuccessHandler,p),failure:e.bind(p.ioFailureHandler,p)};e.each(q,function(u,s){var v=r.cfg.on[s];u.defaultFn=true;if(d(v)){var t=e.bind(function(){u.apply(p,arguments);v.apply(p,arguments);},p);t.wrappedFn=true;r.cfg.on[s]=t;}else{r.cfg.on[s]=u;}});return r;}};e.TreeViewIO=k;},"@VERSION@",{requires:["aui-io","json"],skinnable:false});AUI.add("aui-tree",function(a){},"@VERSION@",{skinnable:true,use:["aui-tree-data","aui-tree-node","aui-tree-io","aui-tree-paginator","aui-tree-view"]});