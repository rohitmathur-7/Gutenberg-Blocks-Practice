<?php

function blocks_course_plugin_register_pattern_cat() {
	register_block_pattern_category( 'blocks-course', array(
		'label' => __( 'Blocks Course', 'blocks-course' ),
	) );
}

add_action( 'init', 'blocks_course_plugin_register_pattern_cat' );

function blocks_course_plugin_register_pattern() {
	register_block_pattern( 'blocks-course/my-pattern', array(
		'title'       => __( 'My Pattern one', 'blocks-course' ),
		'description' => __( 'My Pattern description', 'blocks-course' ),
		'categories'  => array( 'blocks-course' ),
		'keywords'    => array( 'My Pattern' ),
		'content'     => '<!-- wp:columns --><div class="wp-block-columns"><!-- wp:column --><div class="wp-block-column"><!-- wp:my-blocks/team-members --><div class="wp-block-my-blocks-team-members has-2-columns"><!-- wp:my-blocks/team-member --><div class="wp-block-my-blocks-team-member"></div><!-- /wp:my-blocks/team-member --><!-- wp:my-blocks/team-member --><div class="wp-block-my-blocks-team-member"></div><!-- /wp:my-blocks/team-member --><!-- wp:my-blocks/team-member --><div class="wp-block-my-blocks-team-member"></div><!-- /wp:my-blocks/team-member --></div><!-- /wp:my-blocks/team-members --></div><!-- /wp:column --><!-- wp:column --><div class="wp-block-column"><!-- wp:my-blocks/latest-posts /--></div><!-- /wp:column --></div><!-- /wp:columns -->'
	) );
}

add_action( 'init', 'blocks_course_plugin_register_pattern' );
