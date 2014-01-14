//TODO: Make js independant of Prototype.js 

nxj = window.nxj || {};

nxj.ui = {};


nxj.ui.sectionHead = (function() {
  var self = {};

  self.init = function() {
    return init();
  };

  function init() {

  }

  return self;
}());


nxj.ui.lightbox = (function() {
  var self = {};

  self.init = function() {
    return init();
  };

  function init() {

  }

  return self;
}());


nxj.ui.tabs = (function() {
  var self = {};

  self.init = function() {
    return init();
  }

  self.activateTabSet = function(tabSet) {
    return activateTabSet(tabSet);
  }

  function init() {
    $$('.nxj_tabs').each(function(tabSet){
      activateTabSet(tabSet);
    });
  }

  function activateTabSet(tabSet) {
    var root = $(tabSet);
    root.observe('click', function(event) {
      var tab = event.findElement('.tab');
      var tabs = event.findElement('.tabHolder');
      if(tab && !tab.hasClassName('selected')) {
        tabs.select('.selected').invoke('removeClassName', 'selected');
        tab.addClassName('selected');
        var show = tab.getAttribute('data-target');
        tabs.select('.nxj_tabBlock').invoke('addClassName', 'hide');
        tabs.select('.'+show).invoke('removeClassName', 'hide');
      }
    });
  }

  return self;
}());


nxj.ui.slider = (function() {
  var self = {};

  self.init = function() {
    return init();
  }

  self.activateSliders = function(id) {
    return activateSliders(id);
  }

  function init() {
    activateSliders();
  }

  function activateSliders(id) {
    if(id){
      activateOneSlider($(id));
    }else{
      $$('div.nxj_slider').each(activateOneSlider);
    }
  }

  function activateOneSlider(sld){
    if(sld.hasClassName('disabled')) return;
    var type = sld.getAttribute('data-type');
    var mode = sld.getAttribute('data-mode');
    var decimals = parseInt(sld.getAttribute('data-decimals'));
    var min = decimals ? parseFloat(sld.getAttribute('data-min')) : parseInt(sld.getAttribute('data-min'));
    var max = decimals ? parseFloat(sld.getAttribute('data-max')) : parseInt(sld.getAttribute('data-max'));
    var scale = parseFloat(sld.getAttribute('data-scale'));
    var marker = sld.getAttribute('data-marker');
    var increment = decimals ? parseFloat(sld.getAttribute('data-increment')) : parseInt(sld.getAttribute('data-increment'));
    var handleLeft = sld.select('.handleLeft')[0];
    var handleRight = sld.select('.handleRight')[0];
    var inputLeft = sld.select('.nxj_sliderInput_left')[0];
    var inputRight = sld.select('.nxj_sliderInput_right')[0];
    var segment = sld.select('.nxj_sliderSegment')[0];
    var markers = sld.select('.nxj_sliderMarker');
    var callback = sld.hasAttribute('data-callback') ? window[sld.getAttribute('data-callback')] : null;

    var dragStart = function(handle, evt){
      handle.addClassName('dragging');
      handle.setAttribute('data-start-x', evt.clientX);
      handle.setAttribute('data-start-left', parseFloat(handle.getStyle('left')));
      segment.setAttribute('data-start-left', parseFloat(segment.getStyle('left')));
      segment.setAttribute('data-start-width', parseFloat(segment.getStyle('width')));
      inputRight.setAttribute('data-start-val', $F(inputRight));
      if(inputLeft){
        inputLeft.setAttribute('data-start-val', $F(inputLeft));
      }
    };
    var dragEnd = function(handle){
      handle.removeClassName('dragging');
      if(callback){
        if(type=='range'){
          callback(parseFloat($F(inputLeft)), parseFloat($F(inputRight)), true);
        }else{
          callback(parseFloat($F(inputRight)), true);
        }
      }
    };
    var dragMove = function(handle, evt){
      if(!handle.hasClassName('dragging')) return;
      var startX = parseFloat(handle.getAttribute('data-start-x'));
      var startLeft = parseFloat(handle.getAttribute('data-start-left'));
      var startVal = handle.hasClassName('handleLeft')
        ? parseFloat(inputLeft.getAttribute('data-start-val'))
        : parseFloat(inputRight.getAttribute('data-start-val'));
      var move = evt.clientX-startX;
      var scaledMove = move/scale;
      if(mode=='discrete'){
        scaledMove = Math.round(scaledMove/increment) * increment;
      }
      var scaledUpper = handle.hasClassName('handleLeft')
        ? parseFloat($F(inputRight))
        : max;
      var scaledLower = handle.hasClassName('handleLeft')
        ? min
        : (type=='range' ? parseFloat($F(inputLeft)) : min);
      scaledUpper -= startVal; scaledLower -= startVal;
      scaledMove = Math.max(scaledLower, Math.min(scaledUpper, scaledMove));
      move = scaledMove*scale;
      handle.setStyle({'left' : ''+(startLeft+move)+'px'});
      if(handle.hasClassName('handleLeft')){
        var segLeft = parseFloat(segment.getAttribute('data-start-left'));
        segment.setStyle({'left' : ''+(segLeft+move)+'px'});

        var segWidth = parseFloat(segment.getAttribute('data-start-width'));
        segment.setStyle({'width' : ''+(segWidth-move)+'px'});

        inputLeft.value = (parseFloat(inputLeft.getAttribute('data-start-val'))+scaledMove).toFixed(decimals);
      }else{
        var segWidth = parseFloat(segment.getAttribute('data-start-width'));
        segment.setStyle({'width' : ''+(segWidth+move)+'px'});

        inputRight.value = (parseFloat(inputRight.getAttribute('data-start-val'))+scaledMove).toFixed(decimals);
      }
      if(callback && move){
        if(type=='range'){
          callback(parseFloat($F(inputLeft)), parseFloat($F(inputRight)), false);
        }else{
          callback(parseFloat($F(inputRight)), false);
        }
      }
    }

    if(handleLeft){
      handleLeft.observe('touchstart', function(evt){ dragStart(handleLeft, evt.changedTouches[0]); });
      handleLeft.observe('mousedown', function(evt){ dragStart(handleLeft, evt); });
    }
    handleRight.observe('touchstart', function(evt){ dragStart(handleRight, evt.changedTouches[0]); });
    handleRight.observe('mousedown', function(evt){ dragStart(handleRight, evt); });
    Event.observe(window, 'touchmove', function(evt){
      sld.select('.nxj_sliderHandle').each(function(oneHandle){ dragMove(oneHandle, evt.changedTouches[0]); });
    });
    Event.observe(window, 'mousemove', function(evt){
      sld.select('.nxj_sliderHandle').each(function(oneHandle){ dragMove(oneHandle, evt); });
    });
    Event.observe(window, 'touchend', function(evt){
      sld.select('.nxj_sliderHandle').each(function(oneHandle){ dragEnd(oneHandle); });
    });
    Event.observe(window, 'mouseup', function(evt){
      sld.select('.nxj_sliderHandle').each(function(oneHandle){ dragEnd(oneHandle); });
    });
  }

  return self;
}());



Event.observe(window, 'load', function(){
  nxj.ui.sectionHead.init();
  nxj.ui.lightbox.init();
  nxj.ui.tabs.init();
  nxj.ui.slider.init();
});
