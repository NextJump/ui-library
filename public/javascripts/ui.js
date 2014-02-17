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


nxj.ui.selectBox = (function() {
  var self = {};

  self.init = function() {
    return init();
  }

  self.activateSelectBoxes = function(id) {
    return activateSelectBoxes(id);
  }

  function init() {
    activateSelectBoxes();
    document.observe('click', function(){
      $$('div.nxj_select').each(function(sel){
        sel.removeClassName('nxj_selectOpen');
      });
    });
  }

  function activateSelectBoxes(id) {
    if(id){
      activateOneSelectBox($(id));
    }else{
      $$('div.nxj_select').each(activateOneSelectBox);
    }
  }

  function activateOneSelectBox(sel) {
    sel.observe('click', function(e){
        if(!sel.hasClassName('disabled')) sel.addClassName('nxj_selectOpen');
        $(e).stop();
    });
    sel.select('.nxj_selectOption').each(function(j){
      if(j.hasAttribute("data-default")){
        (sel.select('.nxj_selectValue'))[0].value = j.getAttribute('data-value');
        (sel.select('.nxj_selectDisplay'))[0].update(j.innerHTML);
        (sel.select('.nxj_selectDisplay'))[0].removeClassName('default');
      }
      j.observe('click', function(e){
        (sel.select('.nxj_selectValue'))[0].value = j.getAttribute('data-value');
        (sel.select('.nxj_selectDisplay'))[0].update(j.innerHTML);
        (sel.select('.nxj_selectDisplay'))[0].removeClassName('default');
        sel.removeClassName('nxj_selectOpen');
        $(e).stop();
      });
    });
  }

  return self;
}());


nxj.ui.datePicker = (function() {
  var self = {};

  self.init = function() {
    return init();
  }

  self.activateDatePickers = function(id) {
    return activateDatePickers(id);
  }

  function init() {
    activateDatePickers();
    document.observe('click', function(){
      $$('div.nxj_datePicker').each(function(dpk){
        dpk.removeClassName('open');
      });
    });
  }

  function activateDatePickers(id) {
    if(id){
      activateOneDatePicker($(id));
    }else{
      $$('div.nxj_datePicker').each(activateOneDatePicker);
    }
  }

  function activateOneDatePicker(dpk){
    var type = dpk.getAttribute('data-type');
    var displays = (dpk.select('.nxj_input'));
    var reals = (dpk.select('.nxj_datePickerReal'));
    var icons = (dpk.select('.calendar_icon'));
    var left = (dpk.select('.monthScroll.left'))[0];
    var right = (dpk.select('.monthScroll.right'))[0];
    var allowPast = parseInt(dpk.getAttribute('data-allowpast'));
    var callback = dpk.hasAttribute('data-callback') ? window[dpk.getAttribute('data-callback')] : null;
    dpk.observe('click', function(evt){
      Event.stop(evt);
      displays[dpk.getAttribute('data-period')=='end'?1:0].focus();
    });
    displays.each(function(oneDisplay){
      oneDisplay.observe('click', function(evt){
        Event.stop(evt);
        oneDisplay.focus();
      });
      oneDisplay.observe('focus', function(){
        $$('div.nxj_datePicker').each(function(onePicker){ onePicker.removeClassName('open'); });
        dpk.addClassName('open');
        dpk.setAttribute('data-period', oneDisplay.getAttribute('data-period'));
      });
    });
    displays.each(function(oneDisplay){
      oneDisplay.observe('keydown', function(evt){
        var key = evt.which || window.event.keyCode;
        if(key==9 || key==13){ // Tab out of the input
          dpk.removeClassName('open');
        }
      });
    });
    icons.each(function(oneIcon){
      oneIcon.observe('click', function(evt){
        Event.stop(evt);
        displays[oneIcon.getAttribute('data-period')=='end' ? 1 : 0].focus();
      });
    });
    left.observe('click', function(){
      var start = new Date(parseInt(dpk.getAttribute('data-firstshown'))*1000);
      start.setDate(1);
      start.setMonth(start.getMonth()-1);
      dpk.setAttribute('data-firstshown', Math.floor(start.getTime()/1000));
      populateOneDatePicker(dpk);
    });
    right.observe('click', function(){
      var start = new Date(parseInt(dpk.getAttribute('data-firstshown'))*1000);
      start.setDate(1);
      start.setMonth(start.getMonth()+1);
      dpk.setAttribute('data-firstshown', Math.floor(start.getTime()/1000));
      populateOneDatePicker(dpk);
    });
    populateOneDatePicker(dpk);

    displays.each(function(oneDisplay){
      oneDisplay.observe('change', function(){
        var userTime = Date.parse(oneDisplay.value);
        if(isNaN(userTime)){
          oneDisplay.addClassName('red');
        }else{
          var period = oneDisplay.getAttribute('data-period');
          dpk.setAttribute('data-'+period, Math.floor(userTime/1000));
          populateOneDatePicker(dpk);
          if(callback){
            if(type=='range'){
              callback(
                reals[0].value
                ,reals[1].value
                ,displays[0].value
                ,displays[1].value
                ,new Date(parseInt(dpk.getAttribute('data-start'))*1000)
                ,new Date(parseInt(dpk.getAttribute('data-end'))*1000)
              );
            }else{
              callback(
                reals[0].value
                ,displays[0].value
                ,new Date(parseInt(dpk.getAttribute('data-start'))*1000)
              );
            }
          }
        }
      });
    });
  }

  function populateOneDatePicker(dpk){
    var type = dpk.getAttribute('data-type');
    var displays = (dpk.select('.nxj_input'));
    var reals = (dpk.select('.nxj_datePickerReal'));
    var monthCount = parseInt(dpk.getAttribute('data-monthcount'));
    var currentDate = new Date(parseInt(dpk.getAttribute('data-firstshown'))*1000);
    var start = new Date(parseInt(dpk.getAttribute('data-start'))*1000); start.setHours(0,0,0,0);
    var end = type=='range'
      ? new Date(parseInt(dpk.getAttribute('data-end'))*1000)
      : start;
    end.setHours(0,0,0,0);
    var allowPast = parseInt(dpk.getAttribute('data-allowpast'));
    var today = new Date(); today.setHours(0,0,0,0);
    var tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate()+1);
    var callback = dpk.hasAttribute('data-callback') ? window[dpk.getAttribute('data-callback')] : null;
    var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    if(end < start){
      displays.each(function(oneDisplay){
        oneDisplay.removeClassName('red');
      });
      return false;
    }

    displays.each(function(oneDisplay){
      oneDisplay.removeClassName('red');
    });

    displays[0].value = "" + (start.getMonth()+1) + "/" + start.getDate() + "/" + start.getFullYear();
    reals[0].value = Math.floor(start.getTime()/1000);
    if(type=='range'){
      displays[1].value = "" + (end.getMonth()+1) + "/" + end.getDate() + "/" + end.getFullYear();
      reals[1].value = Math.floor(end.getTime()/1000);
    }

    dpk.select('.nxj_month').each(function(monthDiv){
      currentDate.setDate(1);
      currentDate.setHours(0,0,0,0);

      (monthDiv.select('.monthName'))[0].update(
        monthNames[currentDate.getMonth()] + ' ' + currentDate.getFullYear()
      );

      var monthBody = (monthDiv.select('.nxj_monthBody'))[0]
        ,col
        ,row
        ,printed = 0
        ,newDay
        ,daysInMonth = new Date(currentDate.getYear(), currentDate.getMonth()+1, 0).getDate();
      monthBody.update();
      for(row=0; row<6; ++row){
        for(col=0; col<7; ++col){
          newDay = document.createElement('div');
          newDay.addClassName('dayValue');
          if((!printed && col<currentDate.getDay()) || printed>=daysInMonth){
            newDay.addClassName('empty');
            newDay.update('&nbsp;');
          }else{
            currentDate.setDate(++printed);
            newDay.update(currentDate.getDate());
            newDay.setAttribute('data-date', Math.floor(currentDate.getTime()/1000));
            if(currentDate<today && !allowPast){
              newDay.addClassName('past');
            }else{
              if(currentDate>=today && currentDate<tomorrow){
                newDay.addClassName('today');
              }
              if(currentDate>=start && currentDate<=start || currentDate>=end && currentDate<=end){
                newDay.addClassName('selected');
              }else if(currentDate>=start && currentDate<=end){
                newDay.addClassName('spanned');
              }
              newDay.observe('click', function(){
                var dayDate = new Date(parseInt(this.getAttribute('data-date'))*1000);
                if(type=='range'){
                  var cmpName = dpk.getAttribute('data-period')=='start' ? 'end' : 'start';
                  var cmpDate = new Date(parseInt(dpk.getAttribute('data-'+cmpName))*1000);
                  if(cmpName=='end'&&dayDate>cmpDate || cmpName=='start'&&dayDate<cmpDate){
                    dpk.setAttribute('data-start', parseInt(this.getAttribute('data-date')));
                    dpk.setAttribute('data-end', parseInt(this.getAttribute('data-date')));
                  }else{
                    dpk.setAttribute('data-'+dpk.getAttribute('data-period'), parseInt(this.getAttribute('data-date')));
                  }
                }else{
                  dpk.setAttribute('data-start', parseInt(this.getAttribute('data-date')));
                }
                populateOneDatePicker(dpk);
                if(callback){
                  if(type=='range'){
                    callback(
                      reals[0].value
                      ,reals[1].value
                      ,displays[0].value
                      ,displays[1].value
                      ,new Date(parseInt(dpk.getAttribute('data-start'))*1000)
                      ,new Date(parseInt(dpk.getAttribute('data-end'))*1000)
                    );
                  }else{
                    callback(
                      reals[0].value
                      ,displays[0].value
                      ,new Date(parseInt(dpk.getAttribute('data-start'))*1000)
                    );
                  }
                }
              });
            }
          }
          monthBody.appendChild(newDay);
        }
      }

      currentDate.setDate(1);
      currentDate.setMonth(currentDate.getMonth()+1);
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
    var match = navigator.userAgent.match(/MSIE (\d*)/);
    var target, IEVersion = match ? parseInt(match[1]) : 0;
    if(IEVersion && IEVersion < 9){
      target = window.document.body;
    }else{
      target = window;
    }
    Event.observe(target, 'touchmove', function(evt){
      sld.select('.nxj_sliderHandle').each(function(oneHandle){ dragMove(oneHandle, evt.changedTouches[0]); });
    });
    Event.observe(target, 'mousemove', function(evt){
      sld.select('.nxj_sliderHandle').each(function(oneHandle){ dragMove(oneHandle, evt); });
    });
    Event.observe(target, 'touchend', function(evt){
      sld.select('.nxj_sliderHandle').each(function(oneHandle){ dragEnd(oneHandle); });
    });
    Event.observe(target, 'mouseup', function(evt){
      sld.select('.nxj_sliderHandle').each(function(oneHandle){ dragEnd(oneHandle); });
    });
  }

  return self;
}());

nxj.ui.carousel = (function() {
  var self = {};

  self.init = function() {
    return init();
  }

  self.activateCarousels = function(id) {
    return activateCarousels(id);
  }

  self.carouselForward = function(id) {
    return carouselForward(id);
  }

  self.carouselBackward = function(id) {
    return carouselBackward(id);
  }

  var locks = [];
  var timers = [];

  function init() {
    activateCarousels();
  }

  function activateCarousels(id) {
    if(id){
      activateOneCarousel($(id));
    }else{
      $$('div.nxj_carousel').each(activateOneCarousel);
    }
  }

  function activateOneCarousel(car){
    // Get carousel properties
    car = $(car);
    locks[car.id] = false;
    timers[car.id] = null;
    var inner = (car.select('.nxj_carouselInner'))[0];
    var autoScroll = car.getAttribute('data-autoscroll');
    var hoverPause = car.getAttribute('data-hoverpause');

    // Attach hover-pause observer
    if(autoScroll == 'yes' && hoverPause == 'yes'){
      inner.observe('mouseenter', function(){
        if(timers[car.id]) clearTimeout(timers[car.id]);
      });
      inner.observe('mouseleave', function(){
        timers[car.id] = setTimeout(function(){
          carouselForward(car);
        }, delayDuration*1000);
      });
    }

    // Initialize controls
    var controls = car.select('.nxj_carouselControls');
    if(controls.length){
      controls = controls[0];
      controls.select('.nxj_carouselControlsDot').each(function(oneDot){
        oneDot.observe('click', function(){
          carouselMove(car, parseInt(oneDot.getAttribute('data-index')));
        });
      });
      controls.select('.nxj_carouselControlsLeft').each(function(oneArrow){
        oneArrow.observe('click', function(){
          carouselBackward(car);
        });
      });
      controls.select('.nxj_carouselControlsRight').each(function(oneArrow){
        oneArrow.observe('click', function(){
          carouselForward(car);
        });
      });
    }

    // Start the carousel if autoscroll is enabled
    if(autoScroll == 'yes'){
      var delayDuration = parseFloat(car.getAttribute('data-delayduration'));
      timers[car.id] = setTimeout(function(){
        carouselForward(car);
      }, delayDuration*1000);
    }
  }

  function carouselForward(car){
    car = $(car);
    var currentIndex = parseInt(car.getAttribute('data-currentindex'));
    var numPanels = parseInt(car.getAttribute('data-numpanels'));
    return carouselMove(car, (currentIndex+1)%numPanels);
  }

  function carouselBackward(car) {
    car = $(car);
    var currentIndex = parseInt(car.getAttribute('data-currentindex'));
    var numPanels = parseInt(car.getAttribute('data-numpanels'));
    return carouselMove(car, (currentIndex+numPanels-1)%numPanels);
  }

  function carouselMove(car, index) {
    // Return if carousel is locked, else lock it
    car = $(car);
    if(locks[car.id]) return;
    locks[car.id] = true;
    clearTimeout(timers[car.id]);

    // Get animation parameters
    var width = parseInt(car.getAttribute('data-width'));
    var height = parseInt(car.getAttribute('data-height'));
    var animationType = car.getAttribute('data-animationtype');
    var animationDirs = car.getAttribute('data-animationdir').split(',');
    var animationReverseDir = car.getAttribute('data-animationreversedir');
    var animationDuration = parseFloat(car.getAttribute('data-animationduration'));
    var animationIndex = parseInt(car.getAttribute('data-animationindex'))%animationDirs.length;
    var transition = car.getAttribute('data-transition');
    var currentIndex = parseInt(car.getAttribute('data-currentindex'));
    var numPanels = parseInt(car.getAttribute('data-numpanels'));

    // Find out whether we're going forward or backward
    if(currentIndex == index) return locks[car.id]=false;
    var reverse = (currentIndex>index ? !((index==0)&&(currentIndex+1==numPanels)) : ((index+1==numPanels)&&(currentIndex==0)));
    if(reverse) animationIndex = (animationIndex+animationDirs.length-1)%animationDirs.length;
    var animationDir = animationDirs[animationIndex];

    // Get the entering and leaving panels
    var oldPanel = $(car.id+'_panel_'+currentIndex);
    var newPanel = $(car.id+'_panel_'+index);

    // Apply the appropriate animation
    oldPanel.setStyle({'zIndex':0});
    newPanel.setStyle({'zIndex':1});
    switch(animationType){
    case 'appear':
      newPanel.show();
      oldPanel.hide();
      locks[car.id]=false;
      break;

    case 'fade':
      oldPanel.fade({
        duration: animationDuration
        ,transition: Effect.Transitions[transition]
      });
      newPanel.appear({
        duration: animationDuration
        ,transition: Effect.Transitions[transition]
        ,afterFinish: function(){
          locks[car.id]=false;
        }
      });
      break;

    case 'cover':
      var newLeft = animationDir.indexOf('W')>-1 ? width*-1 : (animationDir.indexOf('E')>-1 ? width : 0);
      var newTop = animationDir.indexOf('N')>-1 ? height*-1 : (animationDir.indexOf('S')>-1 ? height : 0);
      if(reverse){
        oldPanel.setStyle({'zindex':1});
        newPanel.setStyle({'zindex':0, 'left':'0px', 'top':'0px', 'display':'block'});
        new Effect.Morph(oldPanel, {
          style: 'top:'+newTop+'px;left:'+newLeft+'px;'
          ,duration: animationDuration
          ,transition: Effect.Transitions[transition]
          ,afterFinish: function(){
            oldPanel.hide();
            locks[car.id]=false;
          }
        });
      }else{
        newPanel.setStyle({'left':newLeft+'px', 'top':newTop+'px', 'display':'block'});
        new Effect.Morph(newPanel, {
          style: 'top:0px;left:0px;'
          ,duration: animationDuration
          ,transition: Effect.Transitions[transition]
          ,afterFinish: function(){
            oldPanel.hide();
            locks[car.id]=false;
          }
        });
      }
      break;

    case 'slide':
    default:
      var newLeft = animationDir.indexOf('W')>-1 ? width*-1 : (animationDir.indexOf('E')>-1 ? width : 0);
      var newTop = animationDir.indexOf('N')>-1 ? height*-1 : (animationDir.indexOf('S')>-1 ? height : 0);
      if(reverse){
        newPanel.setStyle({'left':(newLeft*-1)+'px', 'top':(newTop*-1)+'px', 'display':'block'});
        new Effect.Morph(oldPanel, {
          style: 'top:'+newTop+'px;left:'+newLeft+'px;'
          ,duration: animationDuration
          ,transition: Effect.Transitions[transition]
          ,afterFinish: function(){
            oldPanel.hide();
            locks[car.id]=false;
          }
        });
        new Effect.Morph(newPanel, {
          style: 'top:0px;left:0px;'
          ,duration: animationDuration
          ,transition: Effect.Transitions[transition]
        });
      }else{
        newPanel.setStyle({'left':newLeft+'px', 'top':newTop+'px', 'display':'block'});
        new Effect.Morph(oldPanel, {
          style: 'top:'+(newTop*-1)+'px;left:'+(newLeft*-1)+'px;'
          ,duration: animationDuration
          ,transition: Effect.Transitions[transition]
          ,afterFinish: function(){
            oldPanel.hide();
            locks[car.id]=false;
          }
        });
        new Effect.Morph(newPanel, {
          style: 'top:0px;left:0px;'
          ,duration: animationDuration
          ,transition: Effect.Transitions[transition]
        });
      }
      break;
    }
    if(!reverse) animationIndex = (animationIndex+1)%animationDirs.length;
    car.setAttribute('data-animationindex', animationIndex);
    car.setAttribute('data-currentindex', index);

    // If controls are shown, highlight the correct dot
    var controls = car.select('.nxj_carouselControls');
    if(controls.length){
      controls = controls[0];
      controls.select('.nxj_carouselControlsDot').each(function(oneDot){
        if(oneDot.getAttribute('data-index') == currentIndex) oneDot.removeClassName('on');
        if(oneDot.getAttribute('data-index') == index) oneDot.addClassName('on');
      });
    }

    // Set a timeout for the next cycle
    var autoScroll = car.getAttribute('data-autoscroll');
    if(autoScroll == 'yes'){
      var delayDuration = parseFloat(car.getAttribute('data-delayduration'));
      timers[car.id] = setTimeout(function(){
        carouselForward(car);
      }, delayDuration*1000);
    }
  }

  return self;
}());


Event.observe(window, 'load', function(){
  nxj.ui.sectionHead.init();
  nxj.ui.lightbox.init();
  nxj.ui.tabs.init();
  nxj.ui.selectBox.init();
  nxj.ui.datePicker.init();
  nxj.ui.slider.init();
  nxj.ui.carousel.init();
});
