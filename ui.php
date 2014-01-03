<?
class Nxj_UI {

    public function __construct() {

    }


    /**
    * @param array $params {
    *
    *   Required arguments:
    *
    *   @type String 'iconURL' => '/Path/to/img/src'
    *       The iconURL is the url that will go into the src attribute of the <img /> icon on the left hand side of the section head.
    *
    *   @type String 'title' => 'Text to be displayed'
    *       Plain text to be displayed in the title section of the section head.
    *
    *   @type String 'subTitle' => 'Text to be displayed'
    *       Plain text containing the subtitle of the section head. The subtitle will appear on the left hand side of the section head.
    *
    *
    *   Optional arguments:
    *
    *   @type String 'actionLeft' => 'plain text or <a> Anchor Tag </a>'
    *       Left action item should be set as plain text or <a> Anchor Tag </a>. If is set the contents of the left action item will appear on the right hand side of the section head.
    *
    *   @type String 'actionRight' => 'plain text or <a> Anchor Tag </a>'
    *       Right action item should be set as plain text or <a> Anchor Tag </a>. If is set the contents of the right action item will appear on the right hand side of the section head.
    *
    *   @type String 'badge' => ''
    *       TODO. 
    *                 
    * }    
    * @return String
    */
    public static function sectionhead($params) {
        //Required Params
        $iconURL = $params['iconURL'];
        $title = $params['title'];
        $subTitle = $params['subTitle'];

        //Optional Params
        $actionLeft = isset($params['actionLeft']) ? $params['actionLeft'] : null;
        $actionRight = isset($params['actionRight']) ? $params['actionRight'] : null;
        $badge = isset($params['badge']) ? $params['badge'] : null;


    }

    /**
    * @param array $params {
    *
    *   Required arguments:
    *
    *   @type String 'id' => 'lightbox'
    *       The id attribute applied to the outer-most <div> of the widget.
    *
    *   @type String 'title' => 'Text to be displayed'
    *       The string to display in the title section of the lightbox.
    *
    *   @type String 'content' => 'Text to be displayed'
    *       A string containing the main body of the lightbox. This can be generated by another $this->part() call, if desired.
    *
    *
    *   Optional arguments:
    *
    *   @type Boolean 'showCloseButton' => true
    *       <Defualt> true
    *       If true, puts an 'X' in the upper-right corner of the lightbox that closes the whole lightbox. If false, the 'X' is omitted, and you will need to hide() the lightbox yourself.       
    *
    *   @type Boolean 'clickClose' => false
    *       <Defualt> false
    *       If true, clicking outside the lightbox (in the grey area) will close the lightbox.
    *
    *   @type Boolean 'visible' => false
    *       <Defualt> false
    *       If true, the lightbox will be visible on pageload. If false, it will be hidden, and should be activated by Javascript.
    *
    *   @type Integer 'width' => auto
    *       <Defualt> auto
    *       The width of the lightbox. Defaults to the width of the content, however there is a min-width of 400px.
    *
    *   @type Integer 'height' => auto
    *       <Defualt> auto
    *       The height of the lightbox. Defaults to the height of the content plus the height of the title.
    *
    *   @type Integer 'top' => 200
    *       <Defualt> 200
    *       The top margin of the lightbox in pixels. If the lightbox is tall, it may be helpful to reduce this margin so the whole lightbox fits on screen.
    *       
    * }    
    * @return String
    */
    public static function lightbox($params) {
        $clickClose = (isset($params['clickClose'])&&$params['clickClose'] ? true : false);
        $display = (isset($params['visible'])&&$params['visible']?'':'display:none;');
        $callback = (isset($params['callback'])&&$params['callback'] ? $params['callback'].'();' : '');
        $style = ''
            .(isset($params['top'])?'margin-top:'.$params['top'].'px;':'')
            .(isset($params['width'])?'width:'.$params['width'].'px;':'')
            .(isset($params['height'])?'height:'.$params['height'].'px;':'');

        $output = "
<div class=\"nxj_lightboxHolder\"
        style=\"".$display."\"
        id=\"".$params['id']."\"
        ".($clickClose ? " onclick=\"if(!Event.findElement(event,'.nxj_lightbox')){ $('".$params['id']."').hide(); $callback }\"" : "")."
    >
    <div class=\"nxj_lightbox\" style=\"".$style/"\">";

        if(!isset($params['showCloseButton']) || $params['showCloseButton']==true){
            $output .= "
        <div class=\"nxj_lightboxClose\" onclick=\"$('".$params['id']."').hide(); ".$callback."\"></div>";
        }

        $output .= "
        <div class=\"nxj_lightboxTitle\">".$params['title']."</div>
        <div class=\"nxj_lightboxContent\">".$params['content']."</div>
    </div>
</div>";

        return $output;
    }

    public static function tabs($params) {
    }

    public static function button($params) {
    }

    public static function selectbox($params) {
    }

    public static function datepicker($params) {
    }

    public static function slider($params) {
    }

    public static function scrollbar($params) {
    }

    public static function pagination($params) {
    }

    public static function tooltip($params) {
    }

    public static function carousel($params) {
    }

}
?>
