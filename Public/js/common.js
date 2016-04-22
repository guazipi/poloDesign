(function($){

    jQuery.fn.newSelect = function(options){

        return this.each(function(){

            var $this = $(this);

            var $otherParents = $this.siblings('.chooseAssembly');

            var $willChangeVal = $this.find('.willChangeVal');

            var $chooseBox = $this.find('.chooseBox');

            var tabName = $willChangeVal['0'].tagName;

            var $ul = $this.find('ul');

            var $el = $this.find('ul>li');

            if(tabName=='INPUT'){
                var data = [];
                $willChangeVal.siblings('ul').find('li').each(function(key){
                    data[key] = $(this).text();
                });
                $willChangeVal.on({
                    'focus':function(){
                        if($willChangeVal.val()=='输入货款号后回车查询'){
                            $willChangeVal.val('');
                        }
                    },
                    'blur':function(){
                        if($willChangeVal.val()==''){
                            $willChangeVal.val('输入货款号后回车查询');
                        }
                    },
                    'keyup':function(e){
                        var value = $willChangeVal.val();
                        $willChangeVal.css('color','#3a3a3a');
                        $willChangeVal.siblings('ul').empty();
                        var str = '';
                        for(x in data){
                            if(data[x].match(value)){
                                var html = '<li>'+data[x]+'</li>';
                                str += html;
                            }
                        }
                        $willChangeVal.siblings('ul').append(str);
                        $willChangeVal.siblings('ul').find('li').bind('click',function(){
                            var _this = $(this);
                            var text = _this.text();
                            if(tabName=='INPUT'){
                                if(text!='输入货款号后回车查询'){
                                    $willChangeVal.val(text);
                                    $willChangeVal.css('color','#3a3a3a');
                                }
                            }else if(tabName=='DIV'){
                                $willChangeVal.text(text);
                            }
                        });
                    }
                });

            }

            $this.on('click',function(e){
                $chooseBox.toggleClass('activeStyle');
                $ul.toggleClass('comeToShow');
                $otherParents.find('.chooseBox').removeClass('activeStyle');
                $otherParents.find('ul').removeClass('comeToShow');
                e.stopPropagation();
            });

            $el.on('click',function(){
                var _this = $(this);
                var text = _this.text();
                if(tabName=='INPUT'){
                    if(text!='输入货款号后回车查询'){
                        $willChangeVal.val(text);
                        $willChangeVal.css('color','#3a3a3a');
                    }
                }else if(tabName=='DIV'){
                    $willChangeVal.text(text);
                }
            });

            $('body').on('click',function(){
                $chooseBox.removeClass('activeStyle');
                $ul.removeClass('comeToShow');
            });

        });
    }

})(jQuery);


/*左栏hover*/
$('.memberFuncList').each(function(){
    $(this).find('li:last').css('border-bottom-color','#f5f5f5');
    $(this).find('li').not('.hisHead').each(function(){
        $(this).on({
            'mouseenter':function(){
                $(this).animate({'background-position-x':'0'},{queue:false,duration:300});
            },
            'mouseleave':function(){
                $(this).animate({'background-position-x':'-201px'},{queue:false,duration:300});
            }
        });
    });
});
$('.memberFuncList:last li:last').css('border-bottom','0');


function closeHint(obj){
    $(obj).parents('.alertContainer').css('display','none');
    var $theSHR = $('#theSHR');
    var $willChangeVal = $('.formRow .willChangeVal');
    var $theXXDZ = $('#theXXDZ');
    var $theSJHM = $('#theSJHM');
    $theSHR.siblings('.theWrongBox').removeClass('showWrongBox').text('');
    $willChangeVal.parents('.formRow').find('.theWrongBox').removeClass('showWrongBox').text('');
    $theXXDZ.siblings('.theWrongBox').removeClass('showWrongBox').text('');
    $theSJHM.parents('.formRow').siblings('.theWrongBox').removeClass('showWrongBox').text('');
}