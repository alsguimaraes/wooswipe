;(function(document, window, $) {
  'use strict';

  (function productThumbnails() {
    $('.thumbnail-nav').slick({
      variableWidth: false,
      dots: false,
      focusOnSelect: false,
      infinite: false,
      slidesToShow: 5,
      slidesToScroll: 1,
      respondTo: 'slider',
      responsive: [{
        breakpoint: 680,
        settings: {
          slidesToShow: 5
        }
      }, {
        breakpoint: 520,
        settings: {
          slidesToShow: 4
        }
      }, {
        breakpoint: 420,
        settings: {
          slidesToShow: 3
        }
      }]

    });
    var mainImage = $('.single-product-main-image img');
    if(!mainImage.length){
      mainImage = $('#wooswipe > img');
      mainImage.wrap( '<a class="woocommerce-main-image zoom" href="#"></a>' )
      $('.woocommerce-main-image').wrap('<div class="single-product-main-image"></div>')
    }
    $('.thumbnails .thumb').click(function(e) {
      e.preventDefault();
      var $this = $(this);
      var med = $this.attr('data-med');
      var srcset = $this.attr('data-med');
      var width = $this.attr('data-medw');
      var height = $this.attr('data-medh');
      var hq = $this.attr('data-hq');
      var hqw = $this.attr('data-w');
      var hqh = $this.attr('data-h');
      var ind = $this.parent().index();
      var parHeight = 0;
      mainImage
        .attr('data-ind', ind)
        .attr('src', med)
        .attr('srcset', med)
        .attr('width', width)
        .attr('height', height)
        .attr('data-hq', hq)
        .attr('data-w', hqw)
        .attr('data-h', hqh);
    });
  })();

  (function photoSwipe() {

    var pswpElement = document.querySelectorAll('.pswp')[0];
    var items = [];

    function openPswp(index) {
      var options = {
        index: index,
        shareEl: false
      };
      // Initializes and opens PhotoSwipe
      var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
      gallery.init();
    }

    // build items array
    function pushItem(image){
      var src = image.attributes['data-hq'].value;
      var w = image.attributes['data-w'].value;
      var h = image.attributes['data-h'].value;
      var t = image.attributes['data-title'].value;
      var item = {
        src: src,
        w: w,
        h: h,
        title: t
      };
      items.push(item);
    }
    // Adding items to image for lightbox
    if ($('.thumbnails .thumb').length > 0) {
      var $thumbs = $('.thumbnails .thumb');
      var thumbAlt = $thumbs.find("img").attr("alt");
      for (var i = 0; i < $thumbs.length; i++) {
        $thumbs.attr('data-title', thumbAlt);
        pushItem($thumbs[i]);
      }
    } else if ($('.single-product-main-image').length > 0) {
      var singleImg = $('.single-product-main-image img');
      var singleImgAlt = singleImg.attr('alt');
      singleImg.attr('data-title', singleImgAlt);

      var $this = $('.single-product-main-image img')[0];
      pushItem($this);
    }

    // click event
    if ($('.single-product-main-image').length > 0) {
      $('.single-product-main-image').click(function(e) {
        // Allow user to open image link in new tab or download it
        if (e.which == 2 || e.ctrlKey || e.altKey) {
          return;
        }
        var ind = $(this).find('img').attr('data-ind');
        e.preventDefault();
        var index = ind ? parseInt(ind) : 0;
        openPswp(index);
      });
    }

    $(document).on('change','.variations select',function(){
      var imgsrc = $('#wooswipe a').attr('href');
      var srcind = 0;
      $('.thumbnails .thumb').each(function() {
          if(imgsrc == $(this).attr('data-hq')){
            srcind = $(this).parent().attr('data-slick-index');
          }
      });
      $('#wooswipe img').attr('data-ind',srcind);
    });
     
  })();
})(document, window, jQuery);