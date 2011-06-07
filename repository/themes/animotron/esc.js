$(document).keypress(function(event){
	if (event.keyCode == 27) {
		$(".hide_menu").toggleClass("wrapper_hiden");
		$("#t_left").toggleClass("top_lenta");
		$(".m_left").toggleClass("m_left_lenta");
		$("#f_left").toggleClass("f_left_lenta");
		$("#t_repeat").toggleClass("removal_top");
		$("#t_right").toggleClass("wrapp_t_right");
		$("#conbox").toggleClass("removal_mid");
		$("#m_right").toggleClass("wrapp_m_right");
		$("#f_right").toggleClass("wrapp_f_right");
		$("#f_cent").toggleClass("wrapp_f_cent");
	}
	ddequalcolumns.resetHeights();
});