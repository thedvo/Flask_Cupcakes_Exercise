const BASE_URL = 'http://127.0.0.1:5000';

// Generates the HTML for cupcakes
function generateCupcakes(cupcake) {
	return `<div data-id=${cupcake.id} class="cupcake mt-3">    
                <li>
                    ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
                    <button class="delete-cupcake btn btn-danger btn-sm"> X </button>
                </li>

                <img src="${cupcake.image}"
                class="cupcake-img"
                style="width:150px; height:150px">

            </div>`;
}

// Show list of cupcakes on page load
async function loadCupcakes() {
	const res = await axios.get(`${BASE_URL}/api/cupcakes`);

	for (let cupcake of res.data.cupcakes) {
		let newCupcake = $(generateCupcakes(cupcake));

		$('#cupcake-list').append(newCupcake);
	}
}

// on submit to create a cupcake
$('#cupcake-form').on('submit', createCupcake);

async function createCupcake(e) {
	e.preventDefault();

	// retrieve values from form
	let flavor = $('#flavor').val();
	let rating = $('#rating').val();
	let size = $('#size').val();
	let image = $('#image').val();

	// make POST request to JSON API with data
	let res = await axios.post(`${BASE_URL}/api/cupcakes`, {
		flavor,
		rating,
		size,
		image,
	});

	// Generate HTML for new cupcake and append it. Once finished, reset form.
	let newCupcake = $(generateCupcakes(res.data.cupcake));
	$('#cupcake-list').append(newCupcake);
	$('#cupcake-form').trigger('reset');
}

// handle delete cupcake
$('#cupcake-list').on('click', '.delete-cupcake', deleteCupcake);

async function deleteCupcake(e) {
	e.preventDefault();

	let $cupcake = $(e.target).closest('div');
	let id = $cupcake.attr('data-id');

	await axios.delete(`${BASE_URL}/api/cupcakes/${id}`);
	$cupcake.remove();
}

// Load list of cupcakes on page load.
$(loadCupcakes);
