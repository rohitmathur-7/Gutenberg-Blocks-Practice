<?php
/**
 * Plugin Name:       My Blocks Latest Posts
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       latest-posts
 *
 * @package           latest-posts
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

function my_block_render_latest_posts_block( $attributes ) {
	$args = [ 
		'posts_per_page' => $attributes['numberOfPosts'],
		'post_status'    => 'publish'
	];

	$recent_posts = get_posts( $args );

	$posts = '<ul ' . get_block_wrapper_attributes() . '>';
	foreach ( $recent_posts as $post ) {
		$title     = get_the_title( $post );
		$title     = $title ? $title : __( "No Title", "latest-posts" );
		$permalink = get_permalink( $post );
		$excerpt   = get_the_excerpt( $post );
		$posts .= '<li>';
		if ( $attributes["displayFeaturedImage"] && has_post_thumbnail( $post ) ) {
			$posts .= get_the_post_thumbnail( $post, 'medium' );
		}
		$posts .= '<h5><a href="' . esc_url( $permalink ) . '">' . $title . '</a></h5>';
		$posts .= '<time datatime="' . esc_attr( get_the_date( 'c', $post ) ) . '">' . esc_html( get_the_date( '', $post ) ) . '</time>';
		if ( ! empty( $excerpt ) ) {
			$posts .= '<p>' . $excerpt . '</p>';
		}
		$posts .= '</li>';
	}
	$posts .= '</ul>';


	return $posts;
}


/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function my_blocks_latest_posts_block_init() {
	register_block_type( __DIR__ . '/build', array(
		'render_callback' => 'my_block_render_latest_posts_block'
	) );
}
add_action( 'init', 'my_blocks_latest_posts_block_init' );
