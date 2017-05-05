!function(jQuery,window,document){
    function Box(JQelement){
        this.Position={'X':0,'Y':0,'Z':0};
        this.oXY={'X':0,'Y':0,'Z':0};
        this.JQElement=JQelement;
        this.isdrap=false;
        this.autoR=0;
    }
    Box.prototype.init=function(){
        var self=this;
        self.JQElement.on('selectstart select dragstart',function(){return false;});
        self.JQElement.children('*').on('selectstart select dragstart',function(){ return false;});
//        鼠标\触屏
        self.JQElement.on("mousedown touchstart",function(e){
            self.oXY.X=self.Position.X;
            self.oXY.Y=self.Position.Y;
            self.isdrap=true;
            self.stopRotate();
            $(this).addClass("box-grabbing");
            if(e.touches){
                var startX=e.targetTouches[0].clientX-self.Position.X;
                var startY=e.targetTouches[0].clientY-self.Position.Y;
            }
            else{
                var startX=e.clientX-self.Position.X;
                var startY=e.clientY-self.Position.Y;
            }
//            鼠标移动/触屏移动
            $(document).on('mousemove touchmove',function(e){
                var event=0;
                if(e.touches){
                    e.preventDefault();
                    event=e.targetTouches[0];
                }
                else{
                    event=e;
                }
                self.Position.X=event.clientX-startX;
                self.Position.Y=event.clientY-startY;
                self.JQElement.css("transform",'translate(-50%,-50%) perspective(800px) rotateX('+-Math.floor(self.Position.Y/2)+'deg) rotateY('+Math.floor(self.Position.X/2)+'deg)');
            });
        });
        $(document).on("mouseup mouseleave touchend",function(e){
            if(self.isdrap==true){
                self.autoRotate();
                self.isdrap=false;
                self.JQElement.removeClass("box-grabbing");
                $(document).unbind("mousemove");
                $(document).unbind("touchmove");
            }
        });
    }
    Box.prototype.stopRotate=function(){
        var self=this;
        clearInterval(self.autoR);
    }
    Box.prototype.autoRotate=function(){
        var self=this;
        var Xrotate=0;
        var Yrotate=0;
        var obj={
            0:function(speed){self.Position.X-=speed;},
            1:function(speed){self.Position.X+=speed;},
            2:function(speed){self.Position.Y-=speed;},
            3:function(speed){self.Position.Y+=speed;},
        }
        if(self.Position.X<self.oXY.X){
            Xrotate=0;
        }
        else if(self.Position.X>self.oXY.X){
            Xrotate=1;
        }
        if(self.Position.Y<self.oXY.Y){
            Yrotate=2;
        }
        else if(self.Position.Y>self.oXY.Y){
            Yrotate=3;
        }
        var speed= Math.abs(Math.floor(((self.Position.X-self.oXY.X)+(self.Position.Y-self.oXY.Y))/4));
        if(speed>80)
            speed=80;
        
        self.autoR=setInterval(function(){
            obj[Xrotate](speed);
            obj[Yrotate](speed);
            if(speed<=0)
                clearInterval(self.autoR);
            speed-=0.1;
            self.JQElement.children('.side').css('box-shadow','0px 0px '+speed+'px 0px white');
            self.JQElement.css("transform",'translate(-50%,-50%) perspective(800px) rotateX('+-Math.floor(self.Position.Y/2)+'deg) rotateY('+Math.floor(self.Position.X/2)+'deg)');
            console.log(speed);
            
        },30);
    }
    window.onload=function(){
        var oBox=new Box($(".box"));
        oBox.init();
    }
}(jQuery,window,document);