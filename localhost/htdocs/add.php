<?php
if(isset($_POST['url']))
	{
		$url = $_POST['url'];
		echo "Added : <b> $url </b>";
		include 'libs/general.php';
		$temp = Providers::get_or_create_url_by_url($url);
	}
?>
<form method="post" action="<?php echo htmlentities($_SERVER['PHP_SELF']); ?>">
   <input type="text" name="url" value="http://example.com/"><br>
   <input type="submit" name="submit" value="add url"><br>
</form>
