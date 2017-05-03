!function(jQuery,window,document){
    function Box(JQelement){
        this.Position={'X':0,'Y':0,'Z':0};
        this.JQElement=JQelement;
    }
    Box.prototype.init=function(){
        var self=this;
        self.JQElement.on('selectstart select dragstart',function(){return false;});
        self.JQElement.children('*').on('selectstart select dragstart',function(){ return false;});
        self.JQElement.on("mousedown touchstart",function(e){
            if(e.touches){
                var startX=e.touches[0].clientX-self.Position.X;
                var startX=e.touches[0].clientY-self.Position.Y;
            }
            else{
                var startX=e.clientX-self.Position.X;
                var startY=e.clientY-self.Position.Y;
            }
            $(this).addClass("box-grabbing");
            $(document).on('mousemove touchmove',function(e){
                $(this).addClass("box-grabbing");
                self.Position.X=e.clientX-startX;
                self.Position.Y=e.clientY-startY;
                self.JQElement.css("transform",'translate(-50%,-50%) rotateX('+-Math.floor(self.Position.Y/2)+'deg) rotateY('+Math.floor(self.Position.X/2)+'deg)');
                
            });
        });
        $(document).on("mouseup mouseleave",function(e){
            self.JQElement.removeClass("box-grabbing");
            $(this).removeClass("box-grabbing");
            $(document).unbind("mousemove");
            $(document).unbind("touchmove");
        });
    }
    
    Box.prototype.rotate=function(p,vTime){
        var self=this;
        var speed=vTime/p.x;
        clearInterval(period1);
        clearInterval(period2);
        var period1=setInterval(function(){
            if(self.Position.X==p.x){
                clearInterval(period1);
            }
            else{
                if(self.Position.X>0)
                    self.Position.X-=1;
                else
                    self.Position.X+=1;
                self.JQElement.css("transform",'translate(-50%,-50%) rotateX('+-Math.floor(self.Position.Y/2)+'deg) rotateY('+Math.floor(self.Position.X/2)+'deg)');
            }
            console.log(self.Position);
        },speed);
        var period2=setInterval(function(){
            if(self.Position.Y==p.y){
                clearInterval(period2);
            }
            else{
                if(self.Position.Y>0)
                    self.Position.Y-=1;
                else
                    self.Position.Y+=1;
                self.JQElement.css("transform",'translate(-50%,-50%) rotateX('+-Math.floor(self.Position.Y/2)+'deg) rotateY('+Math.floor(self.Position.X/2)+'deg)');
            }
            console.log(self.Position);
        },speed);
    }
    
    
    var oBox=new Box($(".box"));
    oBox.init();
}(jQuery,window,document);