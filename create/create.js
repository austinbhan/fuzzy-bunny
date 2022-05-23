import { 
    createBunny, 
    getFamilies, 
    checkAuth, 
    logout 
} from '../fetch-utils.js';

import { renderOption } from '../render-utils.js';

const form = document.querySelector('.bunny-form');
const logoutButton = document.getElementById('logout');

form.addEventListener('submit', async (e) => {
    // prevent default
    e.preventDefault();
    // get the name and family id from the form
    const bunnyForm = new FormData('form');
    console.log(bunnyForm.get('bunny-name'));
    // use createBunny to create a bunny with this name and family id
    await createBunny({ name: bunnyForm.get('bunny-name'), family_id: bunnyForm.get('family-id') });
    form.reset();
});

window.addEventListener('load', async () => {
    // let's dynamically fill in the families dropdown from supabase
    // grab the select HTML element from the DOM
    const familySelect = document.getElementById('family-id');
    // go get the families from supabase
    await getFamilies();
    // for each family
    for (let family of familySelect) {
        const renderFamily = renderOption(family);
    }
    // create an option tag

    // set the option's value and text content

    // and append the option to the select
});


checkAuth();

logoutButton.addEventListener('click', () => {
    logout();
});
