(function () {
    $(document).ready(function() {
        var innerWidth; // 화면 width 값
        
        /* 메인 상단 spot 이미지 영역 컨트롤 */
        init();
        function init() {
            innerWidth = $(window).innerWidth();
            var wScrollTop = $(window).scrollTop();
            if(innerWidth < 570) {
                $(".spot-box-img").css("height","330px");
                $(".spot-img").addClass("m-spot");
            } else if(innerWidth < 769) {
                $(".spot-img").attr("src","img/img_main_m.jpg");
            } else if(innerWidth > 769) {
                $(".spot-img").attr("src","img/img_main.jpg");
            }
            
            if(wScrollTop > 20) {
                $(".sub-header").addClass("fixed-sub-header");
                $(".navbar").addClass("move-navbar").addClass("navbar-fixed-top");
            }
            
            if($('.sub-search-input').length !== 0) {
                quickSearch.getStart();
            };
            
        } 
        
        $(window).scroll(function() {
            var vScrollTop = $(window).scrollTop();
            /* 헤더 메뉴 컨트롤 */
            if(vScrollTop < 20) {
                $(".navbar").removeClass("transition");
                $(".sub-header").removeClass("fixed-sub-header");
                $(".navbar").removeClass("move-navbar").removeClass("navbar-fixed-top");
            } else {
                $(".sub-header").addClass("fixed-sub-header");
                $(".navbar").addClass("move-navbar").addClass("navbar-fixed-top");
            }
        });

        $(window).resize(function() {
            innerWidth = $(window).innerWidth();
            /* 메인 상단 spot 이미지 영역 컨트롤 */
            if(innerWidth < 570) {
                $(".spot-box-img").css("height","330px");
                $(".spot-img").addClass("m-spot");
            } else if(innerWidth > 570) {
                $(".spot-box-img").css("height","");
                $(".spot-img").removeClass("m-spot");
            } 
            if(innerWidth < 749) {
                $(".spot-img").attr("src","img/img_main_m.jpg");
            } else if(innerWidth > 749) {
                $(".spot-img").attr("src","img/img_main.jpg");
            }

            // 모바일 메뉴 노출 상태에서 화면이 커졌을 경우 헤더 메뉴 정상 노출을 위해 적용
            if(innerWidth > 768) {
                $(".navbar-nav").css("height","");
            }
        });

        // 모바일 메뉴 크기 체크 후 기본값 세팅
        // 모바일 메뉴 햄버거 버튼 클릭
        var menuHeight; // 메뉴 height 값
        var navFlag;    // 열림, 닫힘 체크 값
        $(".navbar-toggle").click(function() {
            menuHeight = $(".navbar-nav").css("height");
            navFlag = $(".navbar-nav").hasClass("open");
            if(navFlag) {
                $(".navbar-nav").animate({ 
                    height: "0px"
                }, 300, function() {
                    $(".navbar-nav").removeClass("open").css("height","");    
                });
            } else {
                $(".navbar-nav").css("height","0px").addClass("open");
                $(".navbar-nav").animate({ 
                    height: menuHeight
                }, 300);
            }
        });

        // 헤더 메뉴 노출
        $(".nav > li").on("mouseenter mouseleave focusin focusout", function(e) {
            if(e.type == "mouseenter" || e.type == "focusin") {
                $(this).find(".nav-depth").removeClass("off");
            } else {
                $(this).find(".nav-depth").addClass("off");
            }
        });
        
        /* LIBRARY 리스트 클릭 */
        $(".sub-category-list li > a").click(function (e) {
            e.preventDefault();
            var str = $(this).attr("href");
            var strId = str.substring(1, str.length);
            var positionTop = $("#"+strId).position().top;
            categoryScroll(positionTop);
        });
        
        /* 작은화면 selectbox 내용 클릭 시 */
        $("#select_category").change(function (e) {
            var str = "";
            str = $("select option:selected").val();
            var positionTop = $("#"+str).position().top;
            categoryScroll(positionTop);

        });

        function categoryScroll(pPositionTop) {
            $("html, body").animate({
                scrollTop: pPositionTop,
            }, 1);
        }
        
        // Scroll to top
        var scrollToTop = function() {
            var link = $('.btn_top');
            var windowW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    
            $(window).scroll(function() {
                if (($(this).scrollTop() > 150) && (windowW > 1000)) {
                    link.fadeIn(100);
                } else {
                    link.fadeOut(100);
                }
            });
    
            link.click(function() {
                $('html, body').animate({scrollTop: 0}, 400);
                return false;
            });
        };
        scrollToTop();
    });
})();

var quickSearch = (function(){
    var noneCnt = 0;    // 미노출 된 항목 개수
    var iconCnt = $(".fillter .glyph").length;
    function quickSearchStart() {
        $('.sub-search-input').quicksearch('.fillter .glyph', {
            'hide': function() {
                this.style.display = "none";
                noneCnt++;
            }
        });
        $('.sub-search-input').on("keyup", function(e) {
            var code = e.keyCode || e.which; 
            if (code  == 13) {               
                e.preventDefault();
                return false;
            }
            var searchValue = $('.sub-search-input').val();
            if(searchValue === "") {
                $(".fillter").hide();
                $(".no-search-result").hide();
                $(".sub-icon-wrap").show();
            } else {
                setTimeout(function() {
                    $(".sub-icon-wrap").hide();
                    $(".search-txt").html(searchValue);
                    $(".fillter").show();
                    
                    // quicksearch 검색결과 유/무 체크
                    if(noneCnt === iconCnt) {
                        $(".no-search-result").show();
                    } else {
                        $(".no-search-result").hide();
                    }
                    noneCnt = 0;
                }, 100);
            };            
        });
    }
    return {
        getStart : function() {
            return quickSearchStart();
        }
    }
})();

/* SNS 공유  */
var sCommonMessage = "XEIcon은 XpressEngine(CMS)에서 제공하는 아이콘 폰트 입니다. 무료로 제공되는 벡터 그래픽 아이콘으로 아름답고 직관적인 웹페이지를 만들어보세요!";
var sUrl = "http://xpressengine.github.io/XEIcon/";

var mkt = {};

mkt.URL = sUrl;
mkt.TITLE = "문자를 그리다, XEIcon";
mkt.COMMON_MESSAGE = sCommonMessage;
mkt.SHORT_URL = "http://xpressengine.github.io/XEIcon/";

$.mktShare.init( sCommonMessage , sUrl);
 
// 페이스북버튼 이벤트 핸들러
$("#facebook").click(function(event){
    event.preventDefault();
    $.mktShare.facebook();
});

// 트위터버튼 이벤트 핸들러
$("#twitter").click(function(event){
    event.preventDefault();
    $.mktShare.twitter();
});