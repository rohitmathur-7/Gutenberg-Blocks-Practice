<?php

$url = '';
// echo '<pre>';
// print_r( $block );
// echo '</pre>';



// Loop through each inner block
foreach ( $block->inner_blocks as $inner_block ) {
	if ( ! array_key_exists( "numberOfPosts", $inner_block->parsed_block["attrs"] ) ) {
		$url = $inner_block->parsed_block["attrs"]["url"] . '?_limit=10';

	} else {
		$url = $inner_block->parsed_block["attrs"]["url"] . '?_limit=' . $inner_block->parsed_block["attrs"]["numberOfPosts"];
	}
}

// echo $url;

// $faqData = wp_remote_get( $url );
// $faqData = wp_remote_retrieve_body( $faqData );
// echo '<pre>';
// print_r( $faqData );
// echo '</pre>';
