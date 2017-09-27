<?php

remove_action('template_redirect', 'redirect_canonical');
// add image sizes
$startsize = 256;
$steps = 256;
$maxsize = 2560; // minus 300. so set to 2400 it will go to 2100

if ( function_exists( 'add_image_size' ) ) {
    for ($i=0; $i < $maxsize; $i += $steps) {
        $name = 'full'.$i;
        add_image_size( $name, $i, $i);
    }
}

function display_custom_image_sizes( $sizes ) {
  global $_wp_additional_image_sizes;
  if ( empty($_wp_additional_image_sizes) )
    return $sizes;

  foreach ( $_wp_additional_image_sizes as $id => $data ) {
    if ( !isset($sizes[$id]) )
      $sizes[$id] = ucfirst( str_replace( '-', ' ', $id ) );
  }

  return $sizes;
}
add_filter( 'image_size_names_choose', 'display_custom_image_sizes' );


// hide admin bar and other stuff
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );
remove_action( 'wp_head', 'rsd_link');
remove_action( 'wp_head', 'wlwmanifest_link');
remove_action( 'wp_head', 'index_rel_link');
remove_action( 'wp_head', 'parent_post_rel_link');
remove_action( 'wp_head', 'start_post_rel_link');
remove_action( 'wp_head', 'adjacent_posts_rel_link');
remove_action( 'wp_head', 'wp_generator');
remove_action( 'wp_head', 'wp_oembed_add_host_js');
// remove_action( 'wp_head', 'rest_output_link_wp_head', 10 );
remove_action( 'wp_head', 'rel_canonical');
remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head');
remove_action( 'wp_head', 'wp_shortlink_wp_head');
remove_action( 'wp_head', 'feed_links', 2 );
remove_action( 'wp_head', 'feed_links_extra', 3 );
remove_action( 'wp_head', 'dns-prefetch' );
remove_action( 'wp_head', 'wp_resource_hints', 2 );
remove_action( 'wp_head','wp_oembed_add_discovery_links', 10 );
remove_action( 'wp_head','wp_oembed_add_host_js');

add_filter('show_admin_bar', '__return_false');

function create_post_type() {
    // register post type Events
    register_post_type( 'portfolios',
        array(
            'labels' => array(
                'name' => __( 'Portfolios' ),
                'singular_name' => __( 'Portfolio' ),
                'add_new' => __('add new'),
                'add_new_item' => __('add new Portfolio'),
                'edit_item' => __('edit Portfolio')
            ),
            'menu_position' => 20, // 20: below Pages
            'public' => true,
            'query_var' => true,
            '_builtin' =>  false,
            'posts_per_page' => 3,
            'capability_type' => 'post',
            'taxonomies' => array('tags'),
            'has_archive' => true,
            'show_ui' => true,
            'show_in_nav_menus' => true,
            'show_in_menu' => true,
            'show_in_rest'       => true,
            'rest_base'          => 'portfolios-api',
            'rest_controller_class' => 'WP_REST_Posts_Controller',
            'rewrite' => array( 'slug' => 'portfolio', 'with_front' => false, 'feeds' => true, 'pages' => true)
        )
    );
}
add_action( 'init', 'create_post_type' );

function projectTags() {
    // create a new taxonomy
    register_taxonomy(
        'tags',
        'portfolios',
        array(
            'show_in_rest' => true,
            'rest_base' => 'tagsapi',
            'label' => __( 'Tags' ),
            'rewrite' => array( 'slug' => 'tag' ),
        )
    );
}
add_action( 'init', 'projectTags' );



add_action( 'rest_api_init', 'slug_register_acf' );
function slug_register_acf() {
  $post_types = get_post_types(['public'=>true], 'names');
  foreach ($post_types as $type) {
    register_api_field( $type,
        'acf',
        array(
            'get_callback'    => 'slug_get_acf',
            'update_callback' => null,
            'schema'          => null,
        )
    );
  }
}
function slug_get_acf( $object, $field_name, $request ) {
    return get_fields($object[ 'id' ]);
}
?>
