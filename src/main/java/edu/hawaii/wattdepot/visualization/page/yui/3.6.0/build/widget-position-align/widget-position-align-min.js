/*
YUI 3.6.0 (build 5521)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("widget-position-align",function(a){var f=a.Lang,d="align",b="alignOn",g="visible",i="boundingBox",e="offsetWidth",j="offsetHeight",h="region",k="viewportRegion";function c(l){if(!this._posNode){a.error("WidgetPosition needs to be added to the Widget, "+"before WidgetPositionAlign is added");}a.after(this._bindUIPosAlign,this,"bindUI");a.after(this._syncUIPosAlign,this,"syncUI");}c.ATTRS={align:{value:null},centered:{setter:"_setAlignCenter",lazyAdd:false,value:false},alignOn:{value:[],validator:a.Lang.isArray}};c.TL="tl";c.TR="tr";c.BL="bl";c.BR="br";c.TC="tc";c.RC="rc";c.BC="bc";c.LC="lc";c.CC="cc";c.prototype={_posAlignUIHandles:null,destructor:function(){this._detachPosAlignUIHandles();},_bindUIPosAlign:function(){this.after("alignChange",this._afterAlignChange);this.after("alignOnChange",this._afterAlignOnChange);this.after("visibleChange",this._syncUIPosAlign);},_syncUIPosAlign:function(){var l=this.get(d);this._uiSetVisiblePosAlign(this.get(g));if(l){this._uiSetAlign(l.node,l.points);}},align:function(m,l){if(arguments.length){this.set(d,{node:m,points:l});}else{this._syncUIPosAlign();}return this;},centered:function(l){return this.align(l,[c.CC,c.CC]);},_setAlignCenter:function(l){if(l){this.set(d,{node:l===true?null:l,points:[c.CC,c.CC]});}return l;},_uiSetAlign:function(o,n){if(!f.isArray(n)||n.length!==2){a.error("align: Invalid Points Arguments");return;}var m=this._getRegion(o),l,p,q;if(!m){return;}l=n[0];p=n[1];switch(p){case c.TL:q=[m.left,m.top];break;case c.TR:q=[m.right,m.top];break;case c.BL:q=[m.left,m.bottom];break;case c.BR:q=[m.right,m.bottom];break;case c.TC:q=[m.left+Math.floor(m.width/2),m.top];break;case c.BC:q=[m.left+Math.floor(m.width/2),m.bottom];break;case c.LC:q=[m.left,m.top+Math.floor(m.height/2)];break;case c.RC:q=[m.right,m.top+Math.floor(m.height/2)];break;case c.CC:q=[m.left+Math.floor(m.width/2),m.top+Math.floor(m.height/2)];break;default:break;}if(q){this._doAlign(l,q[0],q[1]);}},_uiSetVisiblePosAlign:function(l){if(l){this._attachPosAlignUIHandles();}else{this._detachPosAlignUIHandles();}},_attachPosAlignUIHandles:function(){if(this._posAlignUIHandles){return;}var n=this.get(i),m=a.bind(this._syncUIPosAlign,this),l=[];a.Array.each(this.get(b),function(r){var q=r.eventName,p=a.one(r.node)||n;if(q){l.push(p.on(q,m));}});this._posAlignUIHandles=l;},_detachPosAlignUIHandles:function(){var l=this._posAlignUIHandles;if(l){new a.EventHandle(l).detach();this._posAlignUIHandles=null;}},_doAlign:function(m,l,p){var o=this._posNode,n;switch(m){case c.TL:n=[l,p];break;case c.TR:n=[l-o.get(e),p];break;case c.BL:n=[l,p-o.get(j)];break;case c.BR:n=[l-o.get(e),p-o.get(j)];break;case c.TC:n=[l-(o.get(e)/2),p];break;case c.BC:n=[l-(o.get(e)/2),p-o.get(j)];break;case c.LC:n=[l,p-(o.get(j)/2)];break;case c.RC:n=[l-o.get(e),p-(o.get(j)/2)];break;case c.CC:n=[l-(o.get(e)/2),p-(o.get(j)/2)];break;default:break;}if(n){this.move(n);}},_getRegion:function(m){var l;if(!m){l=this._posNode.get(k);}else{m=a.Node.one(m);if(m){l=m.get(h);}}return l;},_afterAlignChange:function(l){var m=l.newVal;if(m){this._uiSetAlign(m.node,m.points);}},_afterAlignOnChange:function(l){this._detachPosAlignUIHandles();if(this.get(g)){this._attachPosAlignUIHandles();}}};a.WidgetPositionAlign=c;},"3.6.0",{requires:["widget-position"]});