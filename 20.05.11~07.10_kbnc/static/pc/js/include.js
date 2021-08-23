$(function(){
    includeLoad();

    function includeLoad(){
        //default
        $('#header').load("/pc/html/include/header.html");
        $('#aside').load("/pc/html/include/aside.html");
        $('#footer').load("/pc/html/include/footer.html");
        $('#qnb').load("/pc/html/include/qnb.html");

        //error
        $('#header-error').load("/pc/html/include/header-error.html");
        $('#footer-error').load("/pc/html/include/footer-error.html");
    }
});