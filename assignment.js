

// variables for all of the templates 
var category_template, spieces_template, animal_template, slideshow_template;

// variables to store the current category and animal
var current_category = animals_data.category[0];
var current_animal = current_category.animals[0];

// a helper function that instantiates a template
// and displays the results in the content div
function showTemplate(template, data){
	var html    = template(data);
	$('#content').html(html);
}


$(document).ready(function(){


	var source   = $("#category-template").html();
	category_template = Handlebars.compile(source);
	
	source   = $("#spieces-template").html();
	spieces_template = Handlebars.compile(source);
	
	source   = $("#animal-template").html();
	animal_template = Handlebars.compile(source);
	
	source   = $("#slideshow-template").html();
	slideshow_template = Handlebars.compile(source);

	//  clicking on the Category tab shows the spieces

	$("#categories-tab").click(function () {

		// displays the category template
		showTemplate(category_template, animals_data);

		// make the category tab the active one
		// first make the currently active tab inactive
		$(".nav-tabs .active").removeClass("active");
		// then make category tab active
		$("#categories-tab").addClass("active");

		// a click callback to each category 
		// thumbnail which displays the spieces
		// template on that category

		$(".category-thumbnail").click(function (){
			
			// get the index of the category clicked on
			var index = $(this).data("id");

			// set the current category to this category
			current_category = animals_data.category[index];

			// displays the spieces template
			showTemplate(spieces_template, current_category);

			// add an onclick at all the spieces thumbnails
			// which displays the animals in a modal popup
			$(".spieces-thumbnail").click(function (){

				// get the index of the photo we clicked on
				var index = $(this).data("id");

				// set the current animal to this animal
				current_animal = current_category.animals[index];
				
				// displays the animal template
				showTemplate(animal_template, current_animal);
			});
		});
	});

	// 
	//  clicking on the spieces tab shows all of the 
	//  animals in the current spieces category
	//
	$("#species-tab").click(function () {
		
		// displays the spieces template
		showTemplate(spieces_template, current_category);

		// make the spieces tab the active one
		// first make the currently active tab inactive
		$(".nav-tabs .active").removeClass("active");
		// then make spieces tab active
		$("#species-tab").addClass("active");

		// add an onclick at all the spieces thumbnails
		// which displays the animal in a modal popup
		$(".spieces-thumbnail").click(function (){

			// get the index of the animal clicked on
			var index = $(this).data("id");

			// set the current animal to this animal
			current_animal = current_category.animals[index];
			
			// displays the single animal template
			showTemplate(animal_template, current_animal);
		});
	});

	// 
	//  clicking on the slideshow tab displays the
	//  current album as a slide show
	//
	$("#slideshow-tab").click(function () {
		// display the slideshow template using the 
		// current spieces category
		showTemplate(slideshow_template, current_category);
		
		// make the slideshow tab the active one
		// first make the currently active tab inactive
		$(".nav-tabs .active").removeClass("active");
		// then make slideshow tab active
		$("#slideshow-tab").addClass("active");
	});

	// start the page by showing the albums view
	$("#categories-tab").click();

});