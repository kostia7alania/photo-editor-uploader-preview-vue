<?
function resizeFile($file, $file_out, $w, $t, $str, $q, $url){
	list($width, $height, $type, $attr) = @getimagesize($file);
	
 	switch ($type) {
			case 1:
				$src = imagecreatefromgif($file) or std_die(); 
				break;
			case 2:
				$src = imagecreatefromjpeg($file) or std_die(); 
			 	break;
			case 3: 
				$src = imagecreatefrompng($file) or std_die();
				break;
			default: std_die('"Error. Not true type of a file. It is possible to load files png, gif, jpg."');
	 }  

	$w_src = imagesx($src);
	$h_src = imagesy($src);
	if ($t == 1){
        	$ratio = $w_src/$w;
		if ($ratio<1)$ratio=1;
 	        $w_dest = round($w_src/$ratio);
        	$h_dest = round($h_src/$ratio);
	        //  truecolor!,  8-
	        $dest = imagecreatetruecolor($w_dest,$h_dest) or std_die();
           	$white = imagecolorallocate($dest, 255, 255, 255);
           	imagefill($dest,1,1,$white);
           	imagecopyresampled($dest, $src, 0, 0, 0, 0, $w_dest, $h_dest, $w_src, $h_src);
	}
	if ($t == 2){   //truecolor!,  8-
           	$dest = @imagecreatetruecolor($w,$w) or std_die();
           	if ($w_src > $h_src)// x,
           	imagecopyresampled($dest, $src, 0, 0, round((max($w_src,$h_src)-min($w_src,$h_src))/2), 0, $w, $w, min($w_src,$h_src), min($w_src,$h_src));
           	if ($w_src < $h_src)//  y
           		imagecopyresampled($dest, $src, 0, 0, 0, 0, $w, $w, min($w_src,$h_src), min($w_src,$h_src));
           	if ($w_src == $h_src)
           		imagecopyresampled($dest, $src, 0, 0, 0, 0, $w, $w, $w_src, $w_src);
	}
	if ($str && strlen($str)) {
		$x_text = $w_dest-85;
		$y_text = $h_dest-15;
		$white = imagecolorallocate($dest, 255, 255, 255);
		$black = imagecolorallocate($dest, 0, 0, 0);
		imagestring($dest, 2, $x_text-1, $y_text-1, $str,$black);
		imagestring($dest, 2, $x_text+1, $y_text+1, $str,$black);
		imagestring($dest, 2, $x_text+1, $y_text-1, $str,$black);
		imagestring($dest, 2, $x_text-1, $y_text+1, $str,$black);
		imagestring($dest, 2, $x_text-1, $y_text,   $str,$black);
		imagestring($dest, 2, $x_text+1, $y_text,   $str,$black);
		imagestring($dest, 2, $x_text,   $y_text-1, $str,$black);
		imagestring($dest, 2, $x_text,   $y_text+1, $str,$black);
		imagestring($dest, 2, $x_text,   $y_text,   $str,$white);
	}
	@imagegammacorrect($dest, 1, 1.1);
	@imageinterlace($dest, 1);
		imagejpeg($dest,$file_out,$q);
	imagedestroy($dest);
	imagedestroy($src);
}



function std_die($msg='"Cannot Initialize new GD image stream"') {
	header_status(500);
	header('Content-Type: application/json');
	die ("{status: 0, msg: $msg}");
}
?>