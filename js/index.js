!function(jQuery,window,document){
    function Box(JQelement){
        this.Position={'X':0,'Y':0,'Z':0};
        this.offsetXY={oX:0,oY:0,oZ:0};
        this.JQElement=JQelement;
    }
    
    Box.prototype.init=function(){
        var self=this;
        self.JQElement.on('selectstart select',function(){return false;});
        self.JQElement.children('*').on('selectstart select',function(){ return false;});
        self.JQElement.on("mousedown",function(e){
            var startX=e.clientX;
            var startY=e.clientY;
            var currentRotate
            $(this).addClass("box-grabbing");
            $(document).on('mousemove',function(e){
                self.setNewPoistion(e,startX,startY);
            });
        });
        $(document).on("mouseup",function(){
            self.Position.X+=self.offsetXY.oX;
            self.Position.Y+=self.offsetXY.oY;
            self.JQElement.removeClass("box-grabbing");
            $(document).unbind('mousemove');
        });
        console.log(self.getTransform());
    }
//    新位置
    Box.prototype.setNewPoistion=function(e,startX,startY){
        this.offsetXY={
            oX:Math.floor((e.clientX-startX)/2),
            oY:Math.floor((e.clientY-startY)/2)
        };
        this.JQElement.css("transform",'translate(-50%,-50%) rotateY('+(this.Position.X+this.offsetXY.oX)+'deg) rotateX('+-(this.Position.Y+this.offsetXY.oY)+'deg)');
        
            
    }
    Box.prototype.getTransform=function(){
        var str=this.JQElement.css('transform');
        return str;
    }
    
    
    var oBox=new Box($(".box"));
    oBox.init();
    $(".buttonGroup>button").on("mousedown",function(){
        $(this).addClass("buttonOn");
        var str=$(this).html();
//        if(str=='前'){
//        }else if(str=='后'){
//            
//        }else if(str=='左'){
//            
//        }else if(str=='右'){
//            
//        }else if(str=='顶'){
//            
//        }else if(str=='底'){
//            
//        }
    });
    $(".buttonGroup>button").on("mouseup",function(){
        $(this).removeClass("buttonOn");
    });
}(jQuery,window,document);