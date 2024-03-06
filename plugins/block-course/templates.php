<?php

function blocks_course_plugin_register_template() {
	$post_type_obj           = get_post_type_object( 'post' );
	$post_type_obj->template = array(
		array( 'my-blocks/meta-box-block' )
	);
}

add_action( 'init', 'blocks_course_plugin_register_template' );
