<div>
	<h2 class="section-title">REVIEW CATEGORY</h2>
	<?php
	$gnav = array(
		'menu'            => 'g-nav',
		'menu_class'      => '',
		'menu_id'         => '',
		'container'       => 'li',
		'container_class' => '',
		'container_id'    => '',
		'fallback_cb'     => 'wp_page_menu',
		'before'          => '',
		'after'           => '',
		'link_before'     => '',
		'link_after'      => '',
		'echo'            => true,
		'depth'           => 0,
		'walker'          => '',
		'theme_location'  => '',
		'items_wrap'      => '<ul class="category-list">%3$s</ul>'
	);
	wp_nav_menu( $gnav );
	?>
</div>
<div>
	<h2 class="section-title">人気キーワード</h2>
	<?php
	$keywords = array(
		'menu'            => 'popular-keywords',
		'menu_class'      => '',
		'menu_id'         => '',
		'container'       => 'li',
		'container_class' => '',
		'container_id'    => '',
		'fallback_cb'     => 'wp_page_menu',
		'before'          => '',
		'after'           => '',
		'link_before'     => '#',
		'link_after'      => '',
		'echo'            => true,
		'depth'           => 0,
		'walker'          => '',
		'theme_location'  => '',
		'items_wrap'      => '<ul class="kwList">%3$s</ul>'
	);
	wp_nav_menu( $keywords );
	?>
</div>