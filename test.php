<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<?php include_once('ui.php');?>
<html>

<head>
        <link rel="stylesheet" href="public/stylesheets/ui.css" type="text/css" />
        <style>
                hr {
                        margin:40px 0;
                }
                .nxj_carousel {
                        background:#FFFFFF;
                        border:none;
                        border-radius:75px;
                        overflow:hidden;
                }
                .nxj_carouselPanel {
                        background:transparent;
                }
        </style>
</head>

<body>
        <a href="javascript:void(0);" onclick="$('someLightbox').show();">Show the Lightbox</a>
        <?php echo Nxj_UI::lightbox(array(
                'id'                => 'someLightbox'
                ,'title'            => 'Title title yay!'
                ,'content'          => 'The quick brown fox jumps over the lazy dog.'
        ));?>
        <div class="clear"></div><hr/><br/>

        <?php echo  Nxj_UI::tabs(array(
                'id'                => 'testLargeTabs'
                ,'fixed'        => true
//              ,'callback'     => 'testLargeTabsFunction'
                ,'tabs'             => array(
                        (object) array( 'label' => 'First', 'content' => 'This is the first tab', 'selected' => true )
                        ,(object) array( 'label' => 'Second', 'content' => 'This is the second tab' )
                        ,(object) array( 'label' => 'Third', 'content' => 'This is the third tab' )
                )
        ));?>
        <div class="clear"></div><hr/><br/>

        <?php echo  Nxj_UI::button(array(
                'id'            => 'testButton1'
                ,'text'         => 'activate'
                ,'width'        => 150
                ,'float'        => 'left'
                ,'callback'     => 'buttonActivate'
        ));?>
        <div style="float:left;width:15px;height:1px;"></div>
        <?php echo  Nxj_UI::button(array(
                'id'            => 'testButton2'
                ,'text'         => 'save'
                ,'width'        => 150
                ,'float'        => 'left'
                ,'disabled'     => true
                ,'callback'     => 'buttonSave'
        ));?>
        <div class="clear"></div><hr/><br/>

        <?php echo  Nxj_UI::selectbox(array(
                'id'            => 'testSelect'
                ,'name'         => 'dressing'
                ,'width'        => 200
                ,'float'        => 'left'
                ,'zindex'       => 2
                ,'options'      => array(
                        (object) array('value' => 1, 'display'  => 'French')
                        ,(object) array('value' => 2, 'display'  => 'Blue Cheese')
                        ,(object) array('value' => 3, 'display'  => '1000 Islands')
                )
                ,'defaultValue' => '0'
                ,'defaultText'  => 'Choose your dressing'
//              ,'callback'     => 'testSelectFunction'
        ));?>
        <div class="clear"></div><hr/><br/>

        <?php echo  Nxj_UI::datepicker(array(
                'type'          => 'range'
                ,'date_start'   => 'today'
                ,'date_end'     => '+1 week'
                ,'float'        => 'left'
//              ,'callback'     => 'testRangeFunction'
                ,'zindex'               => 1
        ));?>
        <div class="clear"></div><hr/><br/>

        <?php echo  Nxj_UI::slider(array(
                'id'                    => 'testSlider'
                ,'type'                 => 'range'
                ,'marker'               => 'dot'
        ));?>
        <div class="clear"></div><hr/><br/>

        <?php echo  Nxj_UI::scrollbar(array(
                'innerClass'    => 'inner'
                ,'id'                   => 'xxx'
                ,'height'               => '100px'
//              ,'callback'             => 'callback'
        ));?>
        <div class="clear"></div><hr/><br/>

        <?php echo  Nxj_UI::pagination(array(
                'total'                 => 5
                ,'current'              => 1
//              ,'callback'             => 'testPaginationFunction'
                ,'showAll'              => true
                ,'callreset'    => true
        ));?>
        <div class="clear"></div><hr/><br/>

        <span style="position:relative;">[?]
        <?php echo  Nxj_UI::tooltip(array(
                'content'       => 'This sample tip goes up, yo!'
        ))?>
        </span>
        <span style="position:relative;left:200px;">[?]
        <?php echo  Nxj_UI::tooltip(array(
                'id'            => 'testTip2'
                ,'direction'    => 'down'
                ,'content'      => 'This sample tip goes down, and uses an offset.'
                ,'width'        => 235
                ,'xoffset'      => -100
        ))?>
        </span>
        <span style="position:relative;left:400px;">[?]
        <?php echo  Nxj_UI::tooltip(array(
                'id'            => 'testTip3'
                ,'direction'    => 'right'
                ,'zindex'       => 2
                ,'width'        => 345
                ,'content'      => 'This tip goes right, and uses z-index to place it over the next one.'
        ))?>
        </span>
        <span style="position:relative;left:600px;">[?]
        <?php echo  Nxj_UI::tooltip(array(
                'id'            => 'testTip4'
                ,'direction'    => 'left'
                ,'width'        => 90
                ,'height'       => 100
                ,'content'      => 'This sample tip goes left, has a fixed size, and is open by default.'
                ,'visible'      => true
        ))?>
        </span>
        <div class="clear"></div><hr/><br/>
        
        <?php $directions = array('N','NE','E','SE','S','SW','W','NW');?>
        <?php $panels = array(
                '<img src="//www.maas360.com/assets/Uploads/awesomeface.png" style="width:150px;height:150px;">'
                ,'<img src="//th04.deviantart.net/fs70/PRE/f/2010/260/0/a/awesome_face_european_by_jonasldg-d2ywus0.png" style="width:150px;height:150px;">'
                ,'<img src="//fc00.deviantart.net/fs71/f/2010/189/f/a/Matrix_Awesome_Face_full_view_by_Delere.gif" style="width:150px;height:150px;">'
                ,'<img src="//th04.deviantart.net/fs50/PRE/f/2009/286/9/0/Awesome_Face_Shades_by_RandomationArt.png" style="width:150px;height:150px;">'
                ,'<img src="//fc00.deviantart.net/fs70/i/2011/044/5/8/my___awesome___face_by_daemonofdecay-d39fhp5.png" style="width:150px;height:150px;">'
                ,'<img src="//fc05.deviantart.net/fs38/f/2008/356/a/6/Cylon_Awesome_Face___Animated_by_mseliga1138.gif" style="width:150px;height:150px;">'
                ,'<img src="//fc08.deviantart.net/fs70/f/2011/338/9/9/cute_awesome_face_by_vampireknight1001-d4i788c.png" style="width:150px;height:150px;">'
                ,'<img src="//static4.wikia.nocookie.net/__cb20120331191718/randomlyrandom/images/4/41/XXxmikexXx_rolls_71_A_personal_favorite_awesome_face_of_mine_bf722600d9c9c98b9564e49365c113c0.png" style="width:150px;height:150px;">'
        );?>
        <?php echo  Nxj_UI::carousel(array(
                'id'                    => 'testCarousel2'
                ,'width'                => 150
                ,'height'               => 150
                ,'float'                => 'left'
                ,'panels'               => $panels
                ,'hoverPause'           => true
                ,'delayDuration'        => 2.0
                ,'animationType'        => 'cover'
                ,'animationDir'         => implode(',', $directions)
                ,'animationDuration'    => 0.5
        ));?>

        <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/prototype/1.7.1.0/prototype.js"></script>
        <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/scriptaculous/1.9.0/scriptaculous.js"></script>
        <script type="text/javascript" src="public/javascripts/ui.js"></script>
        <script>
                function buttonActivate(){
                        if($('testButton2').hasClassName('disabled')){
                                $('testButton1').update('Deactivate');
                                $('testButton2').removeClassName('disabled');
                        }else{
                                $('testButton1').update('Activate');
                                $('testButton2').addClassName('disabled');
                        }
                }
                function buttonSave(){
                        alert('saved!');
                }
        </script>
</body>

</html>

