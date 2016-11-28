define(function (require) {
	var graphic = require("../../fish-topo-core/src/graphic.js");
    var ExtensionAPI = require('./ExtensionAPI');
	var Eventful = require('../../zrender-3.0.4/src/mixin/Eventful');
    var zrender = require('../../zrender-3.0.4/src/zrender');
    var zrUtil = require('../../zrender-3.0.4/src/core/util');
    var group = require("../../fish-topo-flow/src/node/GroupNode.js");	
    var ConnectionManager = require("./node/ConnectionManager.js");
    function FishTopoFlow (dom, opts) {
        /**
         * @type {string}
         */
        this.id;
        /**
         * Group
         * @type {string}
         */
        this.Group = group;
        /**
         * @type {HTMLDomElement}
         * @private
         */
        this._dom = dom;
        /**
         * @type {module:zrender/ZRender}
         * @private
         */
        this._zr = zrender.init(dom, {
            renderer: opts.renderer || 'canvas',
            devicePixelRatio: opts.devicePixelRatio
        });    	

        this._api = new ExtensionAPI(this);
        this.Shape = graphic;
        Eventful.call(this);
        //BpmnUtil.registerBPMNNode();   
    }
   // FishTopoFlow.graphic = graphic;
    var fishTopoProto = FishTopoFlow.prototype;

    /**
     * @return {HTMLDomElement}
     */
    fishTopoProto.getDom = function () {
        return this._dom;
    };

    /**
     * @return {module:zrender~ZRender}
     */
    fishTopoProto.getZr = function () {
        return this._zr;
    };
    /**
     * @return {number}
     */
    fishTopoProto.getWidth = function () {
        return this._zr.getWidth();
    };

    /**
     * @return {number}
     */
    fishTopoProto.getHeight = function () {
        return this._zr.getHeight();
    };


    /**
     * @return {boolean}
     */
    fishTopoProto.isDisposed = function () {
        return this._disposed;
    };

    /**
     * Dispose instance
     */
    fishTopoProto.dispose = function () {
        this._disposed = true;

        this._zr.dispose();

        instances[this.id] = null;
    };  

    

    /**
     * 调整尺寸  在窗口大小发生改变时需要手工调用
     */
    fishTopoProto.resize = function () {
        this._zr.resize();

    };     

    fishTopoProto.init = function () {
        var that = this;

    };


    fishTopoProto.add = function(node) {
        if(node instanceof group){
            node.setProperties({
                shape:{
                    width:node.getBoundingRect().width,
                    height:node.getBoundingRect().height,
                }
            });
        }
        this._zr.add(node);
    }

    fishTopoProto.clear = function () {
        this._zr.clear();
    };    

    fishTopoProto.exportJson = function() {
        return BpmnUtil.exportJson(this.model, this.allNodes, ConnectionManager.connectors);
    };

    fishTopoProto.drawFromJson = function(json) {
        return BpmnUtil.fromJson(this, json);
    };    

    fishTopoProto.drag = function(node) {
        var that = this;
        node.on("mousedown",function(e){
            groupDragFunction(e);
            e.cancelBubble = true;
        });
        function groupDragFunction(e){
            var startX = e.event.clientX;
            var startY = e.event.clientY;
            var moveFunction = function(e){
                moveDrag(e);
            }
            var nowGroupPosition=node.position;
            var groupPositionX = node.position[0];
            var groupPositionY = node.position[1];
            function moveDrag(e){
                var sX = e.event.clientX-startX;
                var sY = e.event.clientY-startY;  
                nowGroupPosition[0] = groupPositionX+(sX);
                nowGroupPosition[1] = groupPositionY+(sY);
                node.attr("position",nowGroupPosition);
                ConnectionManager.refreshLineByNode(node);  
                if(node.parent){
                    //放入node现有数值，用于重绘group
                    var nodeMessage = {
                        width:node.shape.width,
                        height:node.shape.height,
                        position:node.position,
                        nodeXY:[node.shape.x,node.shape.y],
                        movePosition:[groupPositionX,groupPositionY],
                        moveX:sX,
                        moveY:sY
                    };
                    var groupNode = node.parent;
                    groupNode.reDraw(nodeMessage);
                }                
            }
            that._zr.on('mousemove', moveFunction);
            var upFunction = function(e){
                endDrag(e);
            }
            function endDrag(e){
                that._zr.off('mousemove', moveFunction);  
                that._zr.off('mouseup',upFunction);     
                that._zr.off("globalout",upFunction);           
            }
            that._zr.on('mouseup',upFunction);
            that._zr.on("globalout",upFunction);  
        }
    };  

    fishTopoProto.creatNode = function(dom,opt) {
        var that = this;
        //根据参数dom不同创建不同的节点
        switch (dom){
            case "Rect":
                var node = new this.Shape.Rect(opt); 
                break;
            case "Group":
                var node = new this.Group(opt);
                break;
            case "Image":
                var node = new this.Shape.Image(opt); 
                break;
            case "Text":
                var node = new this.Shape.Text(opt); 
                break;
            case "Circle":
                var node = new this.Shape.Circle(opt); 
                break;
            case "Sector":
                var node = new this.Shape.Sector(opt); 
                break;
            case "Ring":
                var node = new this.Shape.Ring(opt); 
                break;
            case "Polygon":
                var node = new this.Shape.Polygon(opt); 
                break;
            case "Polyline":
                var node = new this.Shape.Polyline(opt); 
                break;
            case "Line":
                var node = new this.Shape.Line(opt); 
                break;
            case "BezierCurve":
                var node = new this.Shape.BezierCurve(opt); 
                break;
            case "Arc":
                var node = new this.Shape.Arc(opt); 
                break;
            case "LinearGradient":
                var node = new this.Shape.LinearGradient(opt); 
                break;
            case "RadialGradient":
                var node = new this.Shape.RadialGradient(opt); 
                break;
            case "BoundingRect":
                var node = new this.Shape.BoundingRect(opt); 
                break;
        }
        this.drag(node);
        return node;
    };    

    fishTopoProto.setBackground = function(image) {
        var that = this;
        if(image.substr(0,1) == "#" || image.substr(0,4) == "rgba"){//如果是颜色创建rect为背景
            var imageShape = new this.Shape.Rect({
                shape:{
                    width: that._zr.getWidth(),
                    height: that._zr.getHeight()
                },
                style:{
                    fill:image,
                },
                cursor:'default',
                z:0,
            })
        }else{
            var imageShape = new this.Shape.Image({//如果是图片创建image为背景
                position:[0,0],
                scale: [1, 1],
                style: {
                    x: 0,
                    y: 0,
                    image: image,
                    width: that._zr.getWidth(),
                    height: that._zr.getHeight()
                },
                cursor:'default',
                z:0,
            });
        }
        that._zr.add(imageShape);
    };  

    fishTopoProto.creatLink = function(startNode,endNode,options) {
        var connector = ConnectionManager.connectorCreate(startNode, endNode, options, this._api);
        //this._zr.add(connector);
        //
        
        return connector;
    };  

    zrUtil.mixin(FishTopoFlow, Eventful); 	
	return FishTopoFlow;
});