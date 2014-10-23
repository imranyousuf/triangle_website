(function() {
  this.Animator = (function() {
    function Animator(el) {
      var _this = this;
      this.$el = $(el);
      this.animations = animations;
      this.pageAnimations = {};
      this.$el.each(function(index, element) {
        var ani, key;
        key = $(element).data('animation');
        if (_.has(_this.animations, key)) {
          ani = _this.animations[key];
          ani.el = $(el);
          ani.paper = Raphael($(element)[0], ani.width, ani.height);
          ani.pos = 0;
          ani.nFrames = ani.frames.length;
          ani.lastFrame = 0;
          ani.playing = false;
          ani.finished = false;
          ani.step_once = _.bind(_this.step_once, ani);
          ani.step = _.bind(_this.step, ani);
          ani.play = _.bind(_this.play, ani);
          return _this.pageAnimations[key] = ani;
        }
      });
    }

    Animator.prototype.step_once = function() {
      this.paper.clear();
      this.paper.add(this.frames[this.pos]);
      this.pos++;
      if (this.pos > (this.nFrames - 1)) {
        this.pos = 0;
        this.playing = false;
        this.finished = true;
        if (this.loop === true) {
          this.playing = true;
        }
      }
      return this.lastFrame = Date.now();
    };

    Animator.prototype.step = function() {
      var now;
      now = Date.now();
      if ((now - this.lastFrame) > (1000 / this.fps)) {
        this.step_once();
      }
      if (this.playing) {
        return requestAnimationFrame(this.step);
      }
    };

    Animator.prototype.play = function() {
      this.playing = true;
      return requestAnimationFrame(this.step);
    };

    return Animator;

  })();

}).call(this);
(function() {
  $(function() {
    var $pageLink, colors, mapLoaded, mapURL, rand;
    colors = ["#3EAEB3", "#347E91", "#F79653", "#F9B673", "#63A69F", "#E07758"];
    mapURL = 'http://a.tiles.mapbox.com/v3/linnea-seriousfox.gido9k0f.html#16/51.527/-0.07858335971832275';
    rand = Math.floor(Math.random() * colors.length);
    $('.logo').css({
      "background-color": colors[rand],
      "color": colors[rand]
    });
    $('.page-link').css("color", colors[rand]);
    $('.ul').css("color", colors[rand]);
    $('.tlogo').css("background-color", colors[rand]);
    $('.icon-angle-down').css("color", colors[rand]);
    $('h1').css("border-color", colors[rand]);
    $('.divider').css("border-color", colors[rand]);
    $('blockquote').css("border-color", colors[rand]);
    $('.colour').css("color", colors[rand]);
    $('.button-navigation').on("click", function(e) {
      e.preventDefault();
      return $('.dropdown-navigation').toggleClass('show');
    });
    $pageLink = $(".page-link");
    $pageLink.on('mouseover', function() {
      $(this).css("border-bottom", "2px solid " + colors[rand]);
      return $(this).css("color", "#414141");
    });
    $pageLink.on('mouseout', function() {
      $(this).css("border-bottom-width", "0px");
      return $(this).css("color", colors[rand]);
    });
    $pageLink.on('click', function(e) {
      if ($(this).data('scroll')) {
        e.preventDefault();
        return $.scrollTo($(this).data('scroll'), 700, {
          easing: 'easeInOutQuart'
        });
      }
    });
    $('.ethos').waypoint(function(direction) {
      if (direction === 'down') {
        return $('.ethos-item').addClass('grow-in');
      }
    }, {
      offset: '500'
    });
    $('.latest-work').waypoint(function(direction) {
      if (direction === 'down') {
        return $('.latest-work').addClass('grow-in');
      }
    }, {
      offset: '70%'
    });
    $('.jct').waypoint(function(direction) {
      if (direction === 'down') {
        return $('.jct').addClass('grow-in');
      }
    }, {
      offset: '70%'
    });
    $('.latest-product').waypoint(function(direction) {
      if (direction === 'down') {
        return $('.latest-product').addClass('grow-in');
      }
    }, {
      offset: '70%'
    });
    mapLoaded = false;
    $('.get-in-touch').waypoint(function(direction) {
      if (direction === 'down') {
        $('.get-in-touch').addClass('grow-in');
        if (!mapLoaded) {
          mapLoaded = true;
          return $('#mapbox').attr('src', mapURL);
        }
      }
    }, {
      offset: '70%'
    });
    $('.dropdown-navigation').next().waypoint(function(direction) {
      return $('.navbar.logo').toggleClass('shorten');
    }, {
      offset: '-10%'
    });
    if ($('.contact-us').length > 0) {
      $('#mapbox').attr('src', mapURL);
    }
    return $('#aa_video').mediaelementplayer({
      features: ['playpause', 'loop'],
      startVolume: 0,
      loop: true,
      autoRewind: true
    });
  });

}).call(this);
