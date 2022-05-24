import { 
    createBunny, 
    getFamilies, 
    checkAuth, 
    logout 
} from '../fetch-utils.js';

const form = document.querySelector('.bunny-form');
const logoutButton = document.getElementById('logout');

form.addEventListener('submit', async (e) => {
    // prevent default
    e.preventDefault();
    // get the name and family id from the form
    const bunnyForm = new FormData(form);
    console.log(bunnyForm.get('bunny-name'));
    // use createBunny to create a bunny with this name and family id
    await createBunny({ name: bunnyForm.get('bunny-name'), family_id: bunnyForm.get('family-id') });
    window.location.href('/families');
    form.reset();
});

window.addEventListener('load', async () => {
    // let's dynamically fill in the families dropdown from supabase
    // grab the select HTML element from the DOM
    const familyId = document.getElementById('family-id');
    // go get the families from supabase
    const families = await getFamilies();
    // for each family
    for (let family of families) {
    // create an option tag
        const option = document.createElement('option');
    // set the option's value and text content
        option.value = family.id;
        option.textContent = family.name;
    // and append the option to the select
        familyId.append(option);
    }
});


checkAuth();

logoutButton.addEventListener('click', () => {
    logout();
});
