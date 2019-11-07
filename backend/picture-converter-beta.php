<?
 function itm_optimizeImage($file, $copy_to, $compression = 70, $maxDimensions = ['width' => null, 'height' => null]) {
    $fi = new finfo(FILEINFO_MIME);
    $mime = explode(';', $fi->file($file));
    $iMagick = new Imagick($file);
    switch ($mime[0]) {
        // possible to optimize other image types in the future
        case 'image/jpeg':
            try { if ($iMagick->getImageCompressionQuality() > $compression) $file = !itm_compressJPEG($file, $compression, $maxDimensions, $iMagick); }
            catch (Exception $e) { error_log(__FUNCTION__ . " $path/$file failed: " . $e->getMessage()); return false; }
            break;
            case 'image/png':
            try { //if ($iMagick->getImageCompressionQuality() > $compression) 
                $iMagick = itm_compressPNG($file, $compression, $maxDimensions, $iMagick);
            }
            catch (Exception $e) { error_log(__FUNCTION__ . " $path/$file failed: " . $e->getMessage()); return false;}
            break;
            default: 
            // Compress image
            $iMagick->setImageCompression(Imagick::COMPRESSION_UNDEFINED);
            $iMagick->setImageCompressionQuality($compression);
            $iMagick->stripImage();
    }
    
    
    //$pathParts = pathinfo($file); echo $pathParts['dirname'] . '/' . $pathParts['filename'] . '.large.' . $pathParts['extension'];
    $iMagick->writeImage($copy_to);
    //var_dump($copy_to);die;
    //rename($file, $copy_to);
    $iMagick->clear();
    return $file;
}

function itm_compressJPEG($file, $compression = 70, $maxDimensions = ['width' => null, 'height' => null], &$iMagick = null) {
    try {
        $iMagickCreated = true;
        if ($iMagick) $iMagickCreated = false;
        else $iMagick = new Imagick($file);

        $iMagick->setImageResolution(72,72);
        $iMagick->resampleImage(72,72,imagick::FILTER_UNDEFINED,1);
        $geometry = $iMagick->getImageGeometry();
		if (($geometry['width'] / $maxDimensions['width']) > ($geometry['height'] / $maxDimensions['height'])) 
            $iMagick->scaleImage($maxDimensions['width'], 0);// scale by width
            
        else $iMagick->scaleImage(0, $maxDimensions['height']);// scale by height
        
        $iMagick->setImageCompression(Imagick::COMPRESSION_JPEG);
        $iMagick->setImageCompressionQuality($compression);
        $iMagick->stripImage();
        $iMagick->setImageFormat('jpg');
        

        /*if ($iMagickCreated) {
            $pathParts = pathinfo($file);
            rename($file, $pathParts['dirname'] . '/' . $pathParts['filename'] . '.large.' . $pathParts['extension']);
            $iMagick->writeImage($file);
            $iMagick->clear();
        }*/
        return $iMagick;
    }
    catch (Exception $e) {
        error_log(__FUNCTION__ . " $path/$file failed: " . $e->getMessage());
        return false;
    }
}



function itm_compressPNG($file, $compression = 70, $maxDimensions = ['width' => null, 'height' => null], &$iMagick = null) {
    try {
        $iMagickCreated = true;
        if ($iMagick) $iMagickCreated = false;
        else $iMagick = new Imagick($file);

        $iMagick->setImageResolution(72,72);
        $iMagick->resampleImage(72,72,imagick::FILTER_UNDEFINED,1);
        $geometry = $iMagick->getImageGeometry();
		if (($geometry['width'] / $maxDimensions['width']) > ($geometry['height'] / $maxDimensions['height'])) 
			$iMagick->scaleImage($maxDimensions['width'], 0);// scale by width
        else $iMagick->scaleImage(0, $maxDimensions['height']);// scale by height
        
        $iMagick->setImageColorspace(Imagick::COLORSPACE_GRAY);
        $iMagick->setImageCompression(Imagick::COMPRESSION_LZW);
        $iMagick->setImageCompressionQuality($compression);
        $iMagick->setImageCompression(Imagick::COMPRESSION_UNDEFINED);
        $iMagick->setImageCompressionQuality($compression);
        $iMagick->setImageCompression(Imagick::COMPRESSION_ZIP);
        $iMagick->stripImage();
        $iMagick->setImageFormat('png');

        /*if ($iMagickCreated) {
            $pathParts = pathinfo($file);
            rename($file, $pathParts['dirname'] . '/' . $pathParts['filename'] . '.large.' . $pathParts['extension']);
            $iMagick->writeImage($file);
            $iMagick->clear();
        }*/
        return $iMagick;
    }
    catch (Exception $e) {
        error_log(__FUNCTION__ . " $path/$file failed: " . $e->getMessage());
        return false;
    }
}



function resize($originalFile, $target, $newWidth ) {

    $info = getimagesize($originalFile);
    $mime = $info['mime'];

    switch ($mime) {
            case 'image/jpeg':
                    $image_create_func = 'imagecreatefromjpeg';
                    $image_save_func = 'imagejpeg';
                    $new_image_ext = 'jpg';
                    break;

            case 'image/png':
                    $image_create_func = 'imagecreatefrompng';
                    $image_save_func = 'imagepng';
                    $new_image_ext = 'png';
                    break;

            case 'image/gif':
                    $image_create_func = 'imagecreatefromgif';
                    $image_save_func = 'imagegif';
                    $new_image_ext = 'gif';
                    break;

            default: 
                    throw new Exception('Unknown image type.');
    }

    $img = $image_create_func($originalFile);
    list($width, $height) = getimagesize($originalFile);

    $newHeight = ($height / $width) * $newWidth;
    $tmp = imagecreatetruecolor($newWidth, $newHeight);
    imagecopyresampled($tmp, $img, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);
    $image_save_func($tmp, $target);
    $iMagick = new Imagick($target);
    return $iMagick;
}

?>