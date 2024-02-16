<?php

/**
 * Plugin Name: Custom Plugin
 * Author: Rohit Mathur
 * Textdomain: custom
 */

function register_first_block() {
	register_block_type_from_metadata( __DIR__ );
}

add_action( 'init', 'register_first_block' );

