<!DOCTYPE html>
<?php

$iPod    = stripos($_SERVER['HTTP_USER_AGENT'],"iPod");
$iPhone  = stripos($_SERVER['HTTP_USER_AGENT'],"iPhone");
$iPad    = stripos($_SERVER['HTTP_USER_AGENT'],"iPad");

// if ($iPod || $iPhone || $iPad ) :
//     echo '<html lang="en" manifest="'.esc_url( home_url( '/' ) ).'dev.appcache">'.PHP_EOL;
// else :
    echo '<html lang="en">'.PHP_EOL;
// endif;
?>
<head>
<?php
$url = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
$slug = str_replace('portfolio', '', $_SERVER[REQUEST_URI]);
$slug = str_replace('/', '', $slug);

$args = array(
  'name'        => $slug,
  'post_type'   => 'portfolios',
  'post_status' => 'publish',
  'numberposts' => 1
);
$my_posts = get_posts($args);

if( $my_posts) :

    $id = $my_posts[0]->ID;
    $slides = get_field('slides', $id);
    $firstImage = $slides[0]['image']['sizes']['full1536'];
    $imageWidth = $slides[0]['image']['sizes']['full1536-width'];
    $imageHeight = $slides[0]['image']['sizes']['full1536-height'];
    $title = ($slug ? get_the_title($id) : '');

endif;

?>
    <title>Leon Reindl</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta name="apple-mobile-web-app-title" content="dev.LR">
    <meta name="description" content="Portfolio of photographer Leon Reindl" />
    <meta name="author" content="Leon Reindl" />
    <meta property="og:type" content="website" />
    <meta property="fb:profile_id" content="1258334471" />
    <meta property="og:title" content="<?php echo ($title != '' ? $title.' / Leon Reindl' : 'Leon Reindl'); ?>" />
    <meta property="og:description" content="Portfolio of photographer Leon Reindl" />
    <meta property="og:image" content="<?php echo $firstImage; ?>" />
    <meta property="og:image:width" content="<?php echo $imageWidth; ?>" />
    <meta property="og:image:height" content="<?php echo $imageHeight; ?>" />
    <meta property="og:url" content="<?php echo $url; ?>" />
    <link rel="apple-touch-icon" href="<?php echo get_template_directory_uri(); ?>/img/touch-icon-iphone.png">
    <link rel="apple-touch-icon" sizes="180x180" href="<?php echo get_template_directory_uri(); ?>/img/touch-icon-iphone-retina.png">
    <link rel="stylesheet" href="/wp-content/themes/phototheme/font-awesome/css/font-awesome.min.css" />
    <link href="/wp-content/themes/phototheme/prod/css/app.css" rel="stylesheet"/>

<?php
    wp_head();
?>
</head>
<body>

