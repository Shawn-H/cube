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
            $(this).addClass("box-grabbing");
            if(e.touches){
                var startX=e.targetTouches[0].clientX-self.Position.X;
                var startY=e.targetTouches[0].clientY-self.Position.Y;
            }
            else{
                var startX=e.clientX-self.Position.X;
                var startY=e.clientY-self.Position.Y;
            }
            $(document).on('mousemove touchmove',function(e){
                var event;
                if(e.touches){
                    e.preventDefault();
                    event=e.targetTouches[0];
                }
                else{
                    event=e;
                }
                self.Position.X=event.clientX-startX;
                self.Position.Y=event.clientY-startY;
                self.JQElement.css("transform",'translate(-50%,-50%) rotateX('+-Math.floor(self.Position.Y/2)+'deg) rotateY('+Math.floor(self.Position.X/2)+'deg)');
            });
        });
        $(document).on("mouseup mouseleave",function(e){
            self.JQElement.removeClass("box-grabbing");
            $(document).unbind("mousemove");
            $(document).unbind("touchmove");
        });
    }
    window.onload=function(){
        var oBox=new Box($(".box"));
        oBox.init();
    }
}(jQuery,window,document);