<?php
$pic_dir = __DIR__.'/../../../../pictures'; 
$pic_dir_real  = $pic_dir . DIRECTORY_SEPARATOR . 'real';
$pic_dir_small = $pic_dir . DIRECTORY_SEPARATOR . 'small';

switch ($_GET['action']) {
  /* SAVE PICTURE */
  case 'savepic': 
      if(isset($_POST['base64'])) { // edited photo !!
        $base64 = $_POST['base64'];

       /* function base64ToImage($imageData) {
         // $imageData = 'data:image/png;base64,AAAFBfj42Pj4';
          list($type, $imageData) = explode(';', $imageData);
          list(,$extension) = explode('/',$type);
          list(,$imageData)      = explode(',', $imageData);
          $fileName = uniqid().'.'.$extension;
          $imageData = base64_decode($imageData);
          file_put_contents($fileName, $imageData);
        }*/

        if (preg_match('/^data:image\/(\w+);base64,/', $base64, $type)) {
          $data = substr($base64, strpos($base64, ',') + 1);
          $type = strtolower($type[1]); // jpg, png, gif
          if (!in_array($type, [ 'jpg', 'jpeg', 'gif', 'png' ])) throw new \Exception('invalid image type');
          $binary = base64_decode($data);
          if ($binary === false) throw new \Exception('base64_decode failed');
          $file_path = tempnam(sys_get_temp_dir(), 'PHOTO-manager__base64__');
          file_put_contents($file_path, $binary) or echo_and_die(0, "Can't save the file");
        } else throw new \Exception('did not match data URI with image data');
       } elseif($_FILES['file']) $file_path = $_FILES['file']['tmp_name'];
       else echo_and_die(0,'File not found');
      
       $fi = new finfo(FILEINFO_MIME);
       $mime = explode(';', $fi->file($file_path)); 
        switch ($mime[0]) {
          case 'image/jpeg': $ext = '.jpg'; break;
          case 'image/gif': $ext = '.gif'; break;
          case 'image/png': $ext = '.png'; break;
          default: echo_and_die(0, 'Wrong filetype');
        }

        $uid = str_replace(["{", "}"], "", getGUID());
        $file_name = $uid . $ext;

        file_exists($file_path) or echo_and_die(0,'File not exists');  
        //STOP A STUPED RESIZING!!!:
        include_once(__DIR__."/picture-converter.php");
        $text = false; //'apcis.tmou.org';
        $copy_to = $pic_dir_real .DIRECTORY_SEPARATOR. $file_name;
        resizeFile($file_path, $copy_to, '640', 1, $text, '90', '');
        //resizeFile($file_path, $pic_dir_small .DIRECTORY_SEPARATOR. $file_name, '150', 1, 'apcis.tmou.org', '90', '');
       // file_exists($pic_dir_small .DIRECTORY_SEPARATOR. $file_name) or echo_and_die(0,'Small picture not exists');
        
        //NEW CONVERT:
        /*
        include_once(__DIR__."/picture-converter-beta.php");
        $maxDimensions = ['width' => 1028, 'height' => 720];
        $compression = 0;
        $optimized_file = itm_optimizeImage($file_path, $copy_to, $compression, $maxDimensions);
       */
        //if (!copy($optimized_file, $copy_to)) echo_and_die(0, 'Failed to copy the file');
        if(!file_exists($copy_to)) echo_and_die(0,'Picture copied but not exists on the server');
        unset($file_path); 
        function parsePostDate($n) {return isset($_POST[$n]) ? (' '.$n.'="' . $_POST[$n] . '"') : '';}
       // $GPSDateStamp = parsePostDate('GPSDateStamp');
       // $ClientDate = parsePostDate('ClientDate'); 
        if(isset($_POST['DatePhoto'])) $appendDate = parsePostDate('DatePhoto') . " DatePhotoFromBrowserYes='0' ";
        else if(isset($_POST['DatePhotoFromBrowser'])) $appendDate = ' DatePhoto="'.$_POST['DatePhotoFromBrowser'].'" DatePhotoFromBrowserYes="1" ';
        $isEdited = isset($_POST['base64']) ? 1 : 0 ;
        $request = 'DefUID="' . $_POST['def_uid'] . '"'
            . ' InspUID="' .$_POST['insp_uid'] . '"'
            . ' Comment="' .htmlspecialchars($_POST['comment']) . '"'
            . ' Filename="'.$file_name    .'"'
            . ' UID="'     .$uid          .'"' 
            . ' Edited="'  .$isEdited     .'"'
            . ' Info="'    .$_POST['info'].'"'
            . ' Hash="'    .$_POST['hash'].'"'
            //. $MetaDate . $GPSDateStamp . $ClientDate
            . $appendDate
            . ' FileExt="' . $ext . '"';
          //  $req = "<Image $request />";
            //echo "<Image $request />";die;
        $res = $soap_service->NewDefImage( ['Request' => "<Image $request />"] );
        $xml = $res->NewDefImageResult->any;
        $xml = simplexml_load_string($xml);
        $json = json_encode($xml);
        $array = json_decode($json,TRUE);
        if(isset($array['@attributes']['FileName'])) echo_and_die(1, 'Success');
        echo_and_die(0, 'An error occurred while write to data base');

    /* GET LIST OF PICTURES */
  case 'viewimage':
    if (isset($_GET['def_uid']) && isset($_GET['insp_uid'])) {
      $def_uid  = $_GET['def_uid'];
      $insp_uid = $_GET['insp_uid'];
      $request = "DefUID=\"$def_uid\" InspUID=\"$def_uid\" AddImg=\"0\"";
      $res = $soap_service->GetViewImages(array('Request' => "<Images $request />"));
      $xml = $res->GetViewImagesResult->any;
      $xml = simplexml_load_string($xml);
      $json = json_encode($xml);
   //   if(isset($array['@attributes']['FileName'])) echo_and_die(1, 'Success');
      echo $json;
      die;
    }
    echo_and_die(0, 'Bad request to VUE');
    

  /* GET PICTURE PREVIEW */
  case 'get-picture':
    if (!isset($_GET['size'])) echo_and_die(0, 'Size is not provided');
    if (!isset($_GET['filename'])) echo_and_die(0, 'Filename is not provided');
    $f_small = $pic_dir_small . DIRECTORY_SEPARATOR . $_GET['filename'];
    $f_real = $pic_dir_real . DIRECTORY_SEPARATOR . $_GET['filename'];
    /*if(preg_match('/(develop|test)/i', __DIR__)) $loc = 'https://apcis.tmou.org/develop/img/photo-unavailable.png';
      else  $loc = 'https://apcis.tmou.org/img/photo-unavailable.png';
    if (!file_exists($f_real)) exit(header("Location: $loc"));//exit(header_status(404));*/
    //if (!file_exists($f_real)) exit(header_status(404)); 
    $dt = date ('d.m.Y H:i', filemtime($f_real) ); 
    if($_GET['size'] == 'real') watermarkImage($f_real, $dt);
    elseif($_GET['size'] == 'small') {
      if(file_exists($f_small)) { //если превьюшки нет, генерим на лету.
        header('Content-Type: image/jpeg');
        readfile($f_small);
        die;
      }
      thumbnailImage($f_real);
    }
    else echo_and_die(0, 'Wrong type!');
    die;
    //oldWayReadImage($pic_dir_real, $pic_dir_small);

    default:
    echo_and_die(0, 'Unknown action');
  }
  
  
  function thumbnailImage($imagePath) {
    $imagick = new Imagick(realpath($imagePath));
  //$imagick->setbackgroundcolor('rgb(64, 64, 64)');
    $imagick->thumbnailImage(111, 111, true, true);
    header("Content-Type: image/jpg");
    echo $imagick->getImageBlob();
    die;
}
function watermarkImage($imagePath, $dt='') {
  $image = new Imagick(realpath($imagePath));    // Create objects  
 
  $text = $_SERVER['SERVER_NAME'];// We use the domain name of the server for the watermark text
  $pos_center = Imagick::GRAVITY_SOUTHEAST;
  
  $percent_fill = 0.9; // 0-1 (0-100%) watermark-text width fill!
  $transparency = .4;
  $color = 'grey';
  
  //$image = do_watermark($image, $text, $pos_center, $color, $percent_fill, $transparency); //копирайт - адрес сайта
  
  $pos_left_bottom = Imagick::GRAVITY_EAST;
  $percent_fill = 0.5;
  $text = $dt;
  $transparency = .5;
  $color = 'orange';

//  $image = do_watermark($image, $text, $pos_left_bottom, $color, $percent_fill, $transparency); //копирайт - дата - чуть ниже

  $image->setImageFormat('jpg');
  header('Content-type: image/jpeg');//Output the new image
  echo $image; //echo $image->getImageBlob();
  die;
}

function do_watermark ($image, $text, $pos, $color = 'grey', $percent_fill, $transparency) {
  /*
  Imagick::GRAVITY_NORTHWEST
  Imagick::GRAVITY_NORTH
  Imagick::GRAVITY_NORTHEAST
  Imagick::GRAVITY_WEST
  Imagick::GRAVITY_CENTER
  Imagick::GRAVITY_EAST
  Imagick::GRAVITY_SOUTHWEST
  Imagick::GRAVITY_SOUTH
  Imagick::GRAVITY_SOUTHEAST
*/
  $objText = new ImagickDraw();// Create a new drawing palette
  $imgSize   = $image->getImageGeometry();// Get the width and height of the image
  $imgWidth  = $imgSize['width'];
  $imgHeight = $imgSize['height'];
  $objText->setFont('Arial'); // Set font properties
  $objText->setFillColor( new ImagickPixel($color) );// Set te text color
  $objText->setFillAlpha(  $transparency );// Set the text transparency: 0 = transparent, 1 = opaque
  $objText->setGravity($pos);// Position text at the bottom-right of the image
  //$objText->setTextAlignment (Imagick::ALIGN_CENTER);
  $textProperties = ['textWidth' => 0 ];// Create an array for the textwidth and textheight
  $textDesiredWidth = intval( $imgWidth * $percent_fill );// Set the desired width of the watermark to 90% of the image width
  $fontSize = 0;// Set an initial value for the fontsize, will be increased in the loop below
  while ( $textProperties['textWidth'] <= $textDesiredWidth ) {// Increase the fontsize until we have reached our desired width
    $objText->setFontSize( $fontSize );
    $textProperties = $image->queryFontMetrics( $objText, $text );
    $fontSize++;
  }
  $watermarkPosX = intval( ($imgWidth - $textProperties['textWidth']) / 2 );// Calculate the horizontal starting position
  $watermarkPosY = floor( ($imgHeight - $textProperties['textHeight']) / 2 );// Calculate the vertical starting position
  $image->annotateImage( $objText, $watermarkPosX, $watermarkPosY, 0, $text );// Composite the text on the image
  // Draw text on the image $image->annotateImage($draw, 10, 12, 0, $text);
  // Draw text again slightly offset with a different color
  //$draw->setFillColor('white'); $image->annotateImage($objText, 11, 11, 0, $text);
  return $image;
}

 function oldWayReadImage ($pic_dir_real, $pic_dir_small) { 
    if($_GET['size'] == 'real') $p = $pic_dir_real;
    elseif($_GET['size'] == 'small') $p = $pic_dir_small;
    else echo_and_die(0, 'Wrong type!');
    $f = $p . DIRECTORY_SEPARATOR . $_GET['filename'];
    if (!file_exists($f)) exit(header_status(404));
    header('Content-Type: image/jpeg');
    readfile($f);
}
