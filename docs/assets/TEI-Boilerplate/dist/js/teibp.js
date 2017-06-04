//If W3C event model used, prefer that. Window events are fallbacks
if(document.addEventListener){
	//W3C event model used
	document.addEventListener("DOMContentLoaded", init, false);
	window.addEventListener("load", init, false);
} else if(document.attachEvent){
	//IE event model used
	document.attachEvent( "onreadystatechange", init);
	window.attachEvent( "onload", init);
}


/* jQuery Nxeed's Tree Menu v1 | (c) 2014 Nxeed | https://github.com/nxeed */

(function($) {
    var defaults = {
        autoParentDetection: true,
        autoActiveDetection: true,
        itemsUniqueClasses: true,
        parentClass: 'parent',
        activeClass: 'active',
        selectedClass: 'selected',
        expandClass: 'opened',
        collapseClass: 'closed',
        spoilerButtonClickMinX: 4,
        spoilerButtonClickMaxX: 20,
        spoilerButtonClickMinY: 8,
        spoilerButtonClickMaxY: 24,
        slideEffect: true
    };

    var methods = {
        init: function(params) {
            var options = $.extend({}, defaults, params);

            var items = this.find('li');

            $.each(items, function(num, item) {
                item = $(item);

                if (options.autoParentDetection) {
                    if (item.has('ul')[0]) {
                        item.addClass(options.parentClass);
                    }
                }

                if (options.itemsUniqueClasses) {
                    item.addClass('item-' + num);
                }

            });

            var parents = this.find('.' + options.parentClass);

            $.each(parents, function(num, parent) {
                parent = $(parent);

                parent.addClass(options.collapseClass);

                if (parent.has('.' + options.selectedClass)[0]) {
                    parent.removeClass(options.collapseClass).addClass(options.expandClass);

                    if (options.autoActiveDetection) {
                        parent.addClass(options.activeClass);
                    }
                }

                if (parent.hasClass(options.selectedClass)) {
                    parent.removeClass(options.activeClass).removeClass(options.collapseClass).addClass(options.expandClass);
                }
            });

            $('.' + options.collapseClass + ' > ul', this).hide();

            $('.' + options.parentClass + ' > a', this).click(function(e) {
                var posX = $(this).offset().left;
                var posY = $(this).offset().top;

                var clickX = e.pageX - posX;
                var clickY = e.pageY - posY;

                if (clickX <= options.spoilerButtonClickMaxX && clickX >= options.spoilerButtonClickMinX && clickY <= options.spoilerButtonClickMaxY && clickY >= options.spoilerButtonClickMinY) {
                    var item = $(this).parent('li');
                    var content = $(this).parent('li').children('ul');

                    item.toggleClass(options.expandClass).toggleClass(options.collapseClass);

                    if (options.slideEffect) {
                        content.slideToggle();
                    } else {
                        content.toggle();
                    }

                    e.preventDefault();
                }
            });
        }
    };

    $.fn.ntm = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Метод "' + method + '" не найден в плагине jQuery.ntm');
        }
    };
})(jQuery);

function clearPageBreaks(){
	var breaks = document.querySelectorAll("pb");
	for(var i = 0; i < breaks.length; i++)
		breaks[i].style.display="none";
	
	var breaks = document.querySelectorAll(".-teibp-pb");
	for(var i = 0; i < breaks.length; i++)
		breaks[i].style.display="none";
}

function addPageBreaks(){
	var breaks = document.querySelectorAll("pb");
	for(var i = 0; i < breaks.length; i++)
		breaks[i].style.display="block";

	var breaks = document.querySelectorAll(".-teibp-pb");
	for(var i = 0; i < breaks.length; i++)
		breaks[i].style.display="block";
}


function createNavigationTree() {
	var selectors = [
		{menulevel:1,
		selector:"div[type='edition']",
		menutitle:"titre"},
		{menulevel:2,
		selector:"div[type='textpart'][subtype='book']",
		menutitle:"titre2"},
		{menulevel:3,
		selector:"div[type='textpart'][subtype='chapter']",
		menutitle:"titre3"}];
	var maxlevel=3;
// build list of menu items
	var menuitems = [];
	for (let i=1;i<=maxlevel;i++){
		selectorsByLevel = selectors.filter (function (s){
			if (s["menulevel"]==i) {console.log (i);return i;} 
		})
	//	if (s["menulevel"]==1) {
	//		selectid = $(s["selector"]).attr("id");
	//		("<li><a id='link-"+selectid+"' href = '#"+selectid+"'>"+s["menutitle"]+"</a><li>");


	}




	var html="<div class='tree-menu menu' id='navigation_tree'><ul>";


// <div class='tree-menu menu' id='navigation_tree'><ul><li><a href='#'>Livre 1</a><ul><li><a href='#'>Chapitre 1</a></li><li><a href='#'>Chapitre 2</a></li></ul></li></ul></div>";
	// $("#navigation_tree").append(content);
	//	$('#navigation_tree').ntm();
//	};

	for (let s of selectors) {
		if (s["menulevel"]==1) {
			selectid = $(s["selector"]).attr("id");
			("<li><a id='link-"+selectid+"' href = '#"+selectid+"'>"+s["menutitle"]+"</a><li>");

		}
	}

	html += "</ul></div>";
	$("#navigation_tree").append(html);

//   	var toc = $("#navigation_tree").tocify({ selectors:"div[type='edition'],div[type='textpart'][subtype='book'],div[type='textpart'][subtype='chapter']"});
   	// 	var content ="<h2>Navigation Tree (pas encore au point):</h2>"; 
   	// content +="<div class='tree-menu menu' id='navigation_tree'><ul><li><a href='#'>Livre 1</a><ul><li><a href='#'>Chapitre 1</a></li><li><a href='#'>Chapitre 2</a></li></ul></li></ul></div>";
	// $("#navigation_tree").append(content);
	//	$('#navigation_tree').ntm();
	};
	
function show_annotations() {
	var para = $("p[n='1']");
	console.log(para.html());
	console.log(para.html().split("<milestone"));
	console.log(para.html().split("<milestone id='begin-com1'>"));
	console.log(para.html().split("<milestone id='begin-com1'>")[1]);
	console.log ("Nextsibling1")
	console.log($("milestone#begin-com1").next().text());
	console.log ("Nextsibling3")
	console.log($("milestone#begin-com3").next().text());
	console.log ("Nextsibling3until")
	console.log($("milestone#begin-com3").nextUntil("milestone#end-com3").text());
	$("milestone#begin-com3").nextUntil("milestone#end-com3").each(function( ) {console.log ("a")});
	$("milestone#begin-com3").nextUntil("milestone#end-com3").each(function( index ) {console.log (index)});
	$("milestone#begin-com3").nextUntil("milestone#end-com3").each(function( index ) {console.log (this)});
}
// $("#heading2")     .nextUntil("#heading3").andSelf()         .css("background", "red");
function init(){
	var pbt = document.getElementById('pbToggle');
	if(pbt != null){
		pbt.onclick = function(){
			if(this.checked)
				clearPageBreaks();
			else
				addPageBreaks();
		};
	
		addPageBreaks();
		document.getElementById('pbToggle').checked = false;
	}
	
	var htmlTitle = document.querySelector("html > head > title");
	var teiTitle = document.querySelector("tei-title");
	if(htmlTitle != null && teiTitle != null)
		htmlTitle.textContent = teiTitle.textContent;
	createNavigationTree();
	show_annotations();
}


function blockUI(){
	var body = document.querySelector("body");
	var blocker = document.createElement('div');
	blocker.setAttribute('class', 'blocker');
	body.appendChild(blocker);	
}

function unblockUI(){
	var blocker = document.querySelector(".blocker");
	if(blocker)
		blocker.parentNode.removeChild(blocker)
}

function switchThemes(theme) {
	document.getElementById('maincss').href=theme.options[theme.selectedIndex].value;
}

function showFacs(num, url, id) {
	var imgs = "";
	var thumbs = document.querySelectorAll(".-teibp-thumbnail");
	for(var i = 0; i < thumbs.length; i++){
		imgs+= "<img id='" + thumbs[i].parentNode.parentNode.parentNode.getAttribute("id") + "' src='" + thumbs[i].getAttribute("src") + "' alt='facsimile page image'/>";
	}	
	var html = [
		"<html>",
			"<head>",
				"<title></title>",
				document.querySelector('#maincss').outerHTML,
				document.querySelector('#customcss').outerHTML,
				document.querySelector('#teibp-tagusage-css') != null ? document.querySelector('#teibp-tagusage-css').outerHTML : "",
				document.querySelector('#teibp-rendition-css') != null ? document.querySelector('#teibp-rendition-css').outerHTML : "",
				"<script src='../js/teibp.js'></script>",
			"</head>",
			"<body>",
				"<script>blockUI();</script>",
				document.querySelector("teiHeader").outerHTML,
				"<div id='resizable'>",
					"<div class='facsImage'>",
						imgs,
					"</div>",
				"</div>",
				document.querySelector("footer").outerHTML,
				
				"<script>",
					"document.getElementById('" + id + "').scrollIntoView();",
					"unblockUI();",
				"</script>",
			"</body>",
		"</html>",	
	].join('\n');
	
	facsWindow = window.open ("about:blank");
	facsWindow.document.write(html);
	facsWindow.document.close();
}