$(function(){
    includeLoad();

    function includeLoad(){
        //default
        $('#header').load("../html/include/header.html");
        $('#aside').load("../html/include/aside.html");
        $('#footer').load("../html/include/footer.html");
        $('#qnb').load("../html/include/qnb.html");

        //error
        $('#header-error').load("../html/include/header-error.html");
        $('#footer-error').load("../html/include/footer-error.html");
		
		// login
		$('#header-login').load("../html/include/header-login.html");
    }
});